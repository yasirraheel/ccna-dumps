import React, { useState } from "react";
import ExamSettingsModal from "./ExamSettingsModal";
import NavigationMenu from "./NavigationMenu";
import CustomConfirmModal from "./CustomConfirmModal";

function ExamDashboard({
  totalQuestionsCount,
  onStartExam,
  allQuestions,
  candidateName,
  setCandidateName,
  savedSession,
  savedSessions = [],
  onResumeExam,
  onDiscardSavedSession,
  onNavigate,
  pastExams = [],
  onReviewExam,
  onRetakeExam,
  onRetakeAll,
  onRetakeFlagged,
  onRetakeIncorrect,
  currentUser,
  onOpenAuth,
  onLogout,
}) {
  const [selectedBank, setSelectedBank] = useState("bank_a");
  const [examMode, setExamMode] = useState("study");
  const [customCount, setCustomCount] = useState(50);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Discard",
    cancelText: "Cancel",
    type: "danger",
    onConfirm: () => {},
  });

  const [settings, setSettings] = useState({
    randomizeQuestions: false,
    randomizeAnswers: false,
    showScoreLive: true,
    showRequiredAnswersCount: true,
    includeShowAnswerBtn: true,
    showAnswersInline: true,
    timerMode: "not_timed",
  });

  const getBankFilteredQuestions = () => {
    let filtered = [...allQuestions];
    let bankTitle = "Full Question Bank";

    switch (selectedBank) {
      case "bank_a":
        filtered = allQuestions.slice(0, 50);
        bankTitle = "Exam A (spoto-1-50)";
        break;
      case "bank_b":
        filtered = allQuestions.slice(50, 100);
        bankTitle = "Exam B (spoto-51-100)";
        break;
      case "bank_c":
        filtered = allQuestions.slice(100, 150);
        bankTitle = "Exam C (spoto-101-150)";
        break;
      case "bank_d":
        filtered = allQuestions.slice(150, 207);
        bankTitle = "Exam D (spoto-151-207)";
        break;
      case "bank_dragdrop":
        filtered = allQuestions.filter(
          (q) =>
            q.type === "drag_drop" ||
            q.questionType === "drag_drop" ||
            Boolean(q.dragDropData) ||
            q.isDragDrop
        );
        bankTitle = "Drag & Drop Special Bank";
        break;
      case "bank_custom":
        filtered = allQuestions.slice(
          0,
          Math.min(customCount, allQuestions.length)
        );
        bankTitle = `Custom Set (${filtered.length} Questions)`;
        break;
      case "bank_all":
      default:
        filtered = [...allQuestions];
        bankTitle = "All Available Questions";
        break;
    }

    if (settings.randomizeQuestions) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    return { filtered, bankTitle };
  };

  const handleBeginExam = () => {
    const { filtered, bankTitle } = getBankFilteredQuestions();
    onStartExam({
      questions: filtered,
      examMode,
      settings,
      bankName: bankTitle,
    });
  };

  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return "Just now";
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 60) return "Just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const activeSession =
    currentUser && (savedSession || (savedSessions.length > 0 ? savedSessions[0] : null));

  const lastCompletedExam =
    currentUser && pastExams.length > 0 ? pastExams[pastExams.length - 1] : null;

  return (
    <div className="boson-dashboard-wrapper">
      {/* TOP NAVIGATION WITH HAMBURGER & AVATAR */}
      <NavigationMenu
        currentView="dashboard"
        onNavigate={onNavigate}
        candidateName={candidateName}
        currentUser={currentUser}
        onOpenAuth={onOpenAuth}
        onLogout={onLogout}
        pageTitle="Cisco 200-301 CCNA"
      />

      <div className="dashboard-sections-container">
        {/* ===================================================================
            SECTION 1: PICK UP WHERE YOU LEFT OFF (Screenshot 2 Matching)
            =================================================================== */}
        {currentUser && activeSession && activeSession.questions && (
          <section className="dashboard-section pickup-block">
            <h2 className="section-green-heading">Pick up where you left off</h2>

            <div className="pickup-row-container">
              <div className="pickup-single-card">
                <div className="pickup-card-header">
                  <div className="pickup-header-left-group">
                    <h3 className="pickup-exam-title">
                      Cisco 200-301 CCNA
                    </h3>

                    <div className="pickup-badges">
                      <span
                        className={`pickup-badge ${
                          activeSession.examMode === "simulation"
                            ? "badge-sim"
                            : "badge-study"
                        }`}
                      >
                        {activeSession.examMode === "simulation"
                          ? "Simulation Mode"
                          : "Study Mode"}
                      </span>

                      <span className="pickup-badge badge-bank">
                        {activeSession.selectedBankName || "Exam A"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-discard-session"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Discard Saved Exam Session?",
                        message: `Are you sure you want to discard your saved session for "${activeSession.selectedBankName || "Exam A"}"? Your progress will be reset.`,
                        confirmText: "Discard Session",
                        cancelText: "Cancel",
                        type: "danger",
                        onConfirm: () => {
                          onDiscardSavedSession(activeSession.id);
                          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
                        },
                      });
                    }}
                    title="Discard saved progress"
                  >
                    ✕ Clear Session
                  </button>
                </div>

                <div className="pickup-meta-lines">
                  <div>
                    Started <strong>{formatRelativeTime(activeSession.startedAt)}</strong>
                  </div>
                  <div>
                    Last accessed <strong>{formatRelativeTime(activeSession.savedAt)}</strong>
                  </div>
                </div>

                <div className="pickup-progress-track">
                  <div
                    className="pickup-progress-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          3,
                          (((activeSession.index || 0) + 1) /
                            (activeSession.questions?.length || 1)) *
                            100
                        )
                      )}%`,
                    }}
                  ></div>
                </div>

                <div className="pickup-card-footer">
                  <span className="pickup-q-progress">
                    {(activeSession.index || 0) + 1}/{activeSession.questions?.length || 74}
                  </span>

                  <button
                    type="button"
                    className="btn-pickup-resume"
                    onClick={() => onResumeExam(activeSession)}
                  >
                    Resume ➜
                  </button>
                </div>
              </div>

              {savedSessions.length > 1 && (
                <button
                  type="button"
                  className="link-view-more"
                  onClick={() => onNavigate("resume-exams")}
                >
                  View More...
                </button>
              )}
            </div>
          </section>
        )}

        {/* ===================================================================
            SECTION 2: GET STARTED ON A NEW EXAM (Screenshot 2 Matching)
            =================================================================== */}
        <section className="dashboard-section new-exam-block">
          <div className="section-header-flex">
            <h2 className="section-green-heading">Get started on a new exam</h2>

            {currentUser ? (
              <div
                className="candidate-auth-status-card candidate-card-verified"
                title={`Signed in as ${currentUser.email}`}
              >
                <div className="candidate-auth-left">
                  <span className="candidate-auth-label">Candidate</span>
                  <span className="candidate-auth-name">{currentUser.name}</span>
                </div>
                <span className="candidate-verified-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Verified
                </span>
              </div>
            ) : (
              <button
                type="button"
                className="candidate-auth-status-card candidate-card-unauth"
                onClick={() => onOpenAuth && onOpenAuth("login")}
                title="Sign in or register to access exams"
              >
                <div className="candidate-auth-left">
                  <div className="candidate-auth-label-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className="candidate-auth-label warning-label">Access Required</span>
                  </div>
                  <span className="candidate-unauth-prompt">Sign In / Register to Start</span>
                </div>
                <span className="candidate-signin-btn-pill">
                  Sign In ➜
                </span>
              </button>
            )}
          </div>

          <div className="new-exam-launcher-card">
            <div className="dashboard-grid">
              {/* LEFT PANEL: Bank Selector */}
              <div className="dashboard-left-panel">
                <div className="panel-header">
                  <h3 className="panel-title">
                    Exam Bank <span className="info-circle">ⓘ</span>
                  </h3>
                </div>

                <div className="bank-options-list">
                  <label
                    className={`bank-radio-card ${
                      selectedBank === "bank_a" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="examBank"
                      value="bank_a"
                      checked={selectedBank === "bank_a"}
                      onChange={() => setSelectedBank("bank_a")}
                    />
                    <span className="radio-circle"></span>
                    <span className="bank-name">Exam A</span>
                    <span className="bank-meta">50 Qs (1–50)</span>
                  </label>

                  <label
                    className={`bank-radio-card ${
                      selectedBank === "bank_b" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="examBank"
                      value="bank_b"
                      checked={selectedBank === "bank_b"}
                      onChange={() => setSelectedBank("bank_b")}
                    />
                    <span className="radio-circle"></span>
                    <span className="bank-name">Exam B</span>
                    <span className="bank-meta">50 Qs (51–100)</span>
                  </label>

                  <label
                    className={`bank-radio-card ${
                      selectedBank === "bank_c" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="examBank"
                      value="bank_c"
                      checked={selectedBank === "bank_c"}
                      onChange={() => setSelectedBank("bank_c")}
                    />
                    <span className="radio-circle"></span>
                    <span className="bank-name">Exam C</span>
                    <span className="bank-meta">50 Qs (101–150)</span>
                  </label>

                  <label
                    className={`bank-radio-card ${
                      selectedBank === "bank_d" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="examBank"
                      value="bank_d"
                      checked={selectedBank === "bank_d"}
                      onChange={() => setSelectedBank("bank_d")}
                    />
                    <span className="radio-circle"></span>
                    <span className="bank-name">Exam D</span>
                    <span className="bank-meta">57 Qs (151–207)</span>
                  </label>

                  <label
                    className={`bank-radio-card ${
                      selectedBank === "bank_dragdrop" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="examBank"
                      value="bank_dragdrop"
                      checked={selectedBank === "bank_dragdrop"}
                      onChange={() => setSelectedBank("bank_dragdrop")}
                    />
                    <span className="radio-circle"></span>
                    <span className="bank-name">Drag & Drop Special</span>
                    <span className="bank-meta">{allQuestions.filter((q) => q.type === "drag_drop" || q.questionType === "drag_drop" || Boolean(q.dragDropData) || q.isDragDrop).length} Qs (D&D)</span>
                  </label>

                  <label
                    className={`bank-radio-card ${
                      selectedBank === "bank_all" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="examBank"
                      value="bank_all"
                      checked={selectedBank === "bank_all"}
                      onChange={() => setSelectedBank("bank_all")}
                    />
                    <span className="radio-circle"></span>
                    <span className="bank-name">All Questions</span>
                    <span className="bank-meta">{totalQuestionsCount} Qs</span>
                  </label>

                  <label
                    className={`bank-radio-card ${
                      selectedBank === "bank_custom" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="examBank"
                      value="bank_custom"
                      checked={selectedBank === "bank_custom"}
                      onChange={() => setSelectedBank("bank_custom")}
                    />
                    <span className="radio-circle"></span>
                    <span className="bank-name">Custom Count:</span>
                    <input
                      type="number"
                      min="5"
                      max={totalQuestionsCount}
                      value={customCount}
                      onChange={(e) =>
                        setCustomCount(
                          Math.max(
                            1,
                            Math.min(
                              parseInt(e.target.value) || 10,
                              totalQuestionsCount
                            )
                          )
                        )
                      }
                      className="custom-count-input"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBank("bank_custom");
                      }}
                    />
                  </label>
                </div>

                <div className="exam-mode-section">
                  <h4 className="mode-section-title">Exam Mode</h4>
                  <div className="mode-toggle-group">
                    <button
                      type="button"
                      className={`mode-toggle-btn ${
                        examMode === "study" ? "active-study" : ""
                      }`}
                      onClick={() => setExamMode("study")}
                    >
                      📖 Study Mode
                    </button>
                    <button
                      type="button"
                      className={`mode-toggle-btn ${
                        examMode === "simulation" ? "active-sim" : ""
                      }`}
                      onClick={() => setExamMode("simulation")}
                    >
                      ⏱️ Simulation Mode
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL: Settings & Start Action */}
              <div className="dashboard-right-panel">
                <div className="panel-header">
                  <h3 className="panel-title">
                    Current Exam Settings <span className="info-circle">ⓘ</span>
                  </h3>
                  <button
                    type="button"
                    className="btn-modify-settings"
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    Modify Settings
                  </button>
                </div>

                <div className="settings-summary-list">
                  <div className="summary-row">
                    Exam is in{" "}
                    <strong>
                      {examMode === "study" ? "Study mode" : "Simulation mode"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    Questions are{" "}
                    <strong>
                      {settings.randomizeQuestions
                        ? "randomized"
                        : "in original order"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    Answers are{" "}
                    <strong>
                      {settings.randomizeAnswers
                        ? "randomized"
                        : "in original order"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    Show Answer button is{" "}
                    <strong>
                      {settings.includeShowAnswerBtn ? "included" : "excluded"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    Live Score during exam is{" "}
                    <strong>
                      {settings.showScoreLive ? "visible" : "hidden"}
                    </strong>
                  </div>
                  <div className="summary-row highlight-count">
                    This exam has{" "}
                    <strong>
                      {getBankFilteredQuestions().filtered.length} questions
                    </strong>
                  </div>
                </div>

                <div className="dashboard-begin-wrapper">
                  <button
                    type="button"
                    className="btn-begin-exam"
                    onClick={handleBeginExam}
                  >
                    + Start a New Exam ➜
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: REVIEW YOUR PAST EXAMS (Screenshot 2 Matching)
            =================================================================== */}
        {lastCompletedExam && (
          <section className="dashboard-section past-exams-block">
            <div className="section-header-flex">
              <h2 className="section-green-heading">Review your past exams</h2>
              {pastExams.length > 1 && (
                <button
                  type="button"
                  className="link-view-more"
                  onClick={() => onNavigate("history")}
                >
                  View Full History...
                </button>
              )}
            </div>

            {/* Helper counts for past exam */}
            {(() => {
              const flaggedCount = lastCompletedExam.flaggedQuestions
                ? lastCompletedExam.flaggedQuestions.length
                : 0;

              let incorrectCount = 0;
              if (lastCompletedExam.questions && lastCompletedExam.answers) {
                lastCompletedExam.questions.forEach((q, idx) => {
                  const userAns = lastCompletedExam.answers[idx];
                  if (userAns === undefined || userAns === null) {
                    incorrectCount++;
                    return;
                  }
                  if (q.type === "drag_drop" || Boolean(q.dragDropData)) {
                    const correctPairs = q.dragDropData?.correctPairs || {};
                    const userPairs = typeof userAns === "object" ? userAns : {};
                    const allCorrect = Object.entries(correctPairs).every(
                      ([slotId, targetVal]) => userPairs[slotId] === targetVal
                    );
                    if (!allCorrect) incorrectCount++;
                  } else {
                    const correctArr = Array.isArray(q.correctOption)
                      ? q.correctOption
                      : [q.correctOption];
                    const userArr = Array.isArray(userAns) ? userAns : [userAns];
                    const isCorrect =
                      correctArr.length === userArr.length &&
                      correctArr.every((v) => userArr.includes(v));
                    if (!isCorrect) incorrectCount++;
                  }
                });
              }

              return (
                <div className="past-exam-preview-card">
                  <div className="past-exam-header">
                    <div>
                      <span className="past-exam-sub">Last Exam:</span>
                      <h3 className="past-exam-title">
                        Cisco 200-301 CCNA ({lastCompletedExam.bankName || "CCNA Exam"})
                      </h3>
                    </div>

                    <span
                      className={`history-status-badge ${
                        lastCompletedExam.passed ? "badge-pass" : "badge-fail"
                      }`}
                    >
                      {lastCompletedExam.passed ? "PASS ✓" : "FAIL ✕"}
                    </span>
                  </div>

                  <div className="past-exam-stats-row">
                    <div className="stat-item">
                      <span className="stat-label">Final Score:</span>
                      <strong className="stat-val">
                        {lastCompletedExam.score} / {lastCompletedExam.maxScore || 1000}
                      </strong>
                    </div>

                    <div className="stat-item">
                      <span className="stat-label">Accuracy:</span>
                      <strong
                        className={`stat-val ${
                          lastCompletedExam.passed ? "text-green" : "text-danger"
                        }`}
                      >
                        {lastCompletedExam.percentage}%
                      </strong>
                    </div>

                    <div className="stat-item">
                      <span className="stat-label">Date:</span>
                      <span className="stat-val text-muted">
                        {formatRelativeTime(lastCompletedExam.date)}
                      </span>
                    </div>
                  </div>

                  <div className="past-exam-footer-actions">
                    {onReviewExam && (
                      <button
                        type="button"
                        className="btn-history-action btn-history-review"
                        onClick={() => onReviewExam(lastCompletedExam)}
                      >
                        🔍 Review Exam (Read-Only)
                      </button>
                    )}

                    {(onRetakeAll || onRetakeExam) && (
                      <button
                        type="button"
                        className="btn-history-action btn-history-retake-all"
                        onClick={() => (onRetakeAll || onRetakeExam)(lastCompletedExam)}
                      >
                        ↺ Retake All Questions
                      </button>
                    )}

                    {flaggedCount > 0 && onRetakeFlagged && (
                      <button
                        type="button"
                        className="btn-history-action btn-history-retake-flagged"
                        onClick={() => onRetakeFlagged(lastCompletedExam)}
                      >
                        ⚑ Retake Flagged Only ({flaggedCount})
                      </button>
                    )}

                    {incorrectCount > 0 && onRetakeIncorrect && (
                      <button
                        type="button"
                        className="btn-history-action btn-history-retake-incorrect"
                        onClick={() => onRetakeIncorrect(lastCompletedExam)}
                      >
                        ✕ Retake Incorrect Only ({incorrectCount})
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn-history-action btn-history-view-all"
                      onClick={() => onNavigate("history")}
                    >
                      View All History ➜
                    </button>
                  </div>
                </div>
              );
            })()}
          </section>
        )}
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <ExamSettingsModal
          settings={settings}
          setSettings={setSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Confirmation Modal */}
      <CustomConfirmModal
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        type={confirmDialog.type}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

export default ExamDashboard;
