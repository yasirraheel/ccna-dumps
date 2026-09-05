import React, { useState, useEffect } from "react";
import ExamSettingsModal from "./ExamSettingsModal";
import NavigationMenu from "./NavigationMenu";
import CustomConfirmModal from "./CustomConfirmModal";
import { randomizeQuestionOptions } from "./randomizeOptions";
import {
  isPlanAllowedForBank,
  isPlanAllowedForMode,
  getBankAllowedQuestionCount,
  getPlanDisplayInfo,
  EXAM_BANKS
} from "../utils/planPermissions";

const DEFAULT_STUDY_SETTINGS = {
  randomizeQuestions: false,
  randomizeAnswers: false,
  showScoreLive: true,
  showRequiredAnswersCount: true,
  includeShowAnswerBtn: true,
  showAnswersInline: true,
  timerMode: "not_timed",
};

const getSettingsKey = (user) =>
  user?.id ? `ccna_study_settings_${user.id}` : "ccna_study_settings_guest";

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
  onOpenUpgrade,
}) {
  const [selectedBank, setSelectedBank] = useState("bank_a");
  const [examMode, setExamMode] = useState("study");
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

  // Persistent settings state across all exam banks & user sessions
  const [settings, setSettings] = useState(() => {
    try {
      const key = getSettingsKey(currentUser);
      const stored = localStorage.getItem(key) || localStorage.getItem("ccna_study_settings_guest");
      return stored ? { ...DEFAULT_STUDY_SETTINGS, ...JSON.parse(stored) } : DEFAULT_STUDY_SETTINGS;
    } catch {
      return DEFAULT_STUDY_SETTINGS;
    }
  });

  const [availablePlans, setAvailablePlans] = useState([]);

  useEffect(() => {
    fetch('/api/plans')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.plans) {
          setAvailablePlans(data.plans);
        }
      })
      .catch((err) => console.warn('Could not load dynamic plans:', err));
  }, []);

  // Sync settings when user logs in or changes
  useEffect(() => {
    try {
      const key = getSettingsKey(currentUser);
      const stored = localStorage.getItem(key);
      if (stored) {
        setSettings({ ...DEFAULT_STUDY_SETTINGS, ...JSON.parse(stored) });
      }
    } catch (e) {
      console.warn("Load user settings error:", e);
    }
  }, [currentUser]);

  // Persist settings whenever modified
  const handleUpdateSettings = (updater) => {
    setSettings((prev) => {
      const updated = typeof updater === "function" ? updater(prev) : updater;
      try {
        const key = getSettingsKey(currentUser);
        localStorage.setItem(key, JSON.stringify(updated));
        localStorage.setItem("ccna_study_settings_guest", JSON.stringify(updated));
      } catch (e) {
        console.warn("Save user settings error:", e);
      }
      return updated;
    });
  };

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
      case "bank_all":
      default:
        filtered = [...allQuestions];
        bankTitle = "All Available Questions";
        break;
    }

    const totalInBank = filtered.length;
    const allowedLimit = getBankAllowedQuestionCount(currentUser, selectedBank, totalInBank, availablePlans);
    if (allowedLimit > 0 && allowedLimit < totalInBank) {
      filtered = filtered.slice(0, allowedLimit);
      bankTitle = `${bankTitle} (${filtered.length} Qs Allowed)`;
    }

    return { filtered, bankTitle };
  };

  const isSimulation = examMode === "simulation";

  const handleBankSelect = (bankKey, bankLabel) => {
    if (!isPlanAllowedForBank(currentUser, bankKey, availablePlans)) {
      if (onOpenUpgrade) {
        onOpenUpgrade({
          title: `🔒 ${bankLabel} is Locked`,
          reason: `${bankLabel} is not unlocked on your current ${getPlanDisplayInfo(currentUser).name}. Upgrade your plan to access this exam bank.`
        });
      }
      return;
    }
    setSelectedBank(bankKey);
  };

  const handleModeSelect = (mode) => {
    if (!isPlanAllowedForMode(currentUser, mode, availablePlans)) {
      if (onOpenUpgrade) {
        onOpenUpgrade({
          title: "🔒 Simulation Mode is Locked",
          reason: "Official 90-minute timed Simulation Mode with randomized questions is restricted on your current plan (" + getPlanDisplayInfo(currentUser).name + "). Upgrade to unlock full timed simulations."
        });
      }
      return;
    }
    setExamMode(mode);
  };

  const effectiveSettings = isSimulation
    ? {
        randomizeQuestions: true,
        randomizeAnswers: true,
        showScoreLive: true,
        showRequiredAnswersCount: true,
        includeShowAnswerBtn: false,
        showAnswersInline: false,
        timerMode: "timed_90",
      }
    : settings;

  const handleBeginExam = () => {
    if (!isPlanAllowedForBank(currentUser, selectedBank, availablePlans)) {
      if (onOpenUpgrade) {
        onOpenUpgrade({
          title: "🔒 Selected Exam Bank is Locked",
          reason: "Please upgrade your pass to access this exam bank, or select an allowed exam bank."
        });
      }
      return;
    }

    if (!isPlanAllowedForMode(currentUser, examMode, availablePlans)) {
      if (onOpenUpgrade) {
        onOpenUpgrade({
          title: "🔒 Simulation Mode is Locked",
          reason: "Simulation Mode is restricted on your current plan. Please switch to Study Mode or upgrade your pass."
        });
      }
      return;
    }

    let { filtered, bankTitle } = getBankFilteredQuestions();

    if (isSimulation) {
      // Simulation: enforce random 70-80 questions
      const simCount = Math.floor(Math.random() * (80 - 70 + 1)) + 70;
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      filtered = shuffled.slice(0, Math.min(simCount, shuffled.length));
      bankTitle = `${bankTitle} — Simulation (${filtered.length} Qs)`;
    } else if (effectiveSettings.randomizeQuestions) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    // When randomizeAnswers is enabled, randomize the display order of MCQ options
    if (effectiveSettings.randomizeAnswers) {
      filtered = filtered.map(randomizeQuestionOptions);
    }

    onStartExam({
      questions: filtered,
      examMode,
      settings: effectiveSettings,
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
        onOpenUpgrade={onOpenUpgrade}
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
                <div className="candidate-plan-capsule-group">
                  <span className={`candidate-plan-badge ${getPlanDisplayInfo(currentUser).badgeClass}`}>
                    {getPlanDisplayInfo(currentUser).name.toUpperCase()}
                  </span>
                  {!getPlanDisplayInfo(currentUser).isProOrAbove && (
                    <button
                      type="button"
                      className="btn-candidate-upgrade"
                      onClick={() => onOpenUpgrade && onOpenUpgrade()}
                      title="Upgrade to unlock all banks & simulations"
                    >
                      ⚡ Upgrade
                    </button>
                  )}
                </div>
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
                  {EXAM_BANKS.map((bank) => {
                    const isLocked = !isPlanAllowedForBank(currentUser, bank.key, availablePlans);
                    const totalInBank = bank.key === "bank_dragdrop"
                      ? allQuestions.filter((q) => q.type === "drag_drop" || q.questionType === "drag_drop" || Boolean(q.dragDropData) || q.isDragDrop).length
                      : (bank.key === "bank_all" ? totalQuestionsCount : bank.totalQuestions);
                    const allowedCount = getBankAllowedQuestionCount(currentUser, bank.key, totalInBank, availablePlans);

                    let metaText = `${totalInBank} Qs`;
                    if (isLocked) {
                      metaText = `${totalInBank} Qs (Locked)`;
                    } else if (allowedCount > 0 && allowedCount < totalInBank) {
                      metaText = `${allowedCount} of ${totalInBank} Qs Allowed`;
                    }

                    const displayName = bank.name
                      .replace("Exam Bank ", "Exam ")
                      .replace("Special Bank", "Special")
                      .replace("All Questions Bank", "All Questions");

                    return (
                      <label
                        key={bank.key}
                        className={`bank-radio-card ${selectedBank === bank.key ? "active" : ""} ${isLocked ? "bank-locked" : ""}`}
                        onClick={(e) => {
                          if (isLocked) {
                            e.preventDefault();
                            handleBankSelect(bank.key, bank.name);
                          }
                        }}
                      >
                        <input
                          type="radio"
                          name="examBank"
                          value={bank.key}
                          checked={selectedBank === bank.key}
                          onChange={() => handleBankSelect(bank.key, bank.name)}
                        />
                        <span className="radio-circle"></span>
                        <span className="bank-name">{displayName}</span>
                        <span className="bank-meta">{metaText}</span>
                        {isLocked && <span className="bank-lock-badge">🔒 LOCKED</span>}
                      </label>
                    );
                  })}
                </div>

                <div className="exam-mode-section">
                  <h4 className="mode-section-title">Exam Mode</h4>
                  <div className="mode-toggle-group">
                    <button
                      type="button"
                      className={`mode-toggle-btn ${examMode === "study" ? "active-study" : ""}`}
                      onClick={() => handleModeSelect("study")}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      </svg>
                      Study Mode
                    </button>
                    {(() => {
                      const isSimLocked = !isPlanAllowedForMode(currentUser, "simulation");
                      return (
                        <button
                          type="button"
                          className={`mode-toggle-btn ${examMode === "simulation" ? "active-sim" : ""} ${isSimLocked ? "mode-locked" : ""}`}
                          onClick={() => handleModeSelect("simulation")}
                          title={isSimLocked ? "CCNA Pro Pass required for Timed Simulation" : "Official 90-min simulation"}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                          </svg>
                          <span>Simulation</span>
                          {isSimLocked && <span className="mode-lock-pill">🔒 PRO</span>}
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL: Settings & Start Action */}
              <div className="dashboard-right-panel">
                <div className="panel-header">
                  <h3 className="panel-title">
                    Current Exam Settings <span className="info-circle" title="Summary of the active exam configuration">ⓘ</span>
                  </h3>
                  <button
                    type="button"
                    className="btn-modify-settings"
                    onClick={() => setIsSettingsOpen(true)}
                    disabled={isSimulation}
                    title={isSimulation ? "Settings are auto-enforced in Simulation Mode" : "Customize exam settings"}
                  >
                    {isSimulation ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Locked
                      </>
                    ) : (
                      "Modify"
                    )}
                  </button>
                </div>

                <div className="settings-summary-list">
                  <div className="summary-row">
                    Exam is in{" "}
                    <strong>
                      {isSimulation ? "Simulation mode" : "Study mode"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    Questions are{" "}
                    <strong>
                      {effectiveSettings.randomizeQuestions
                        ? "randomized"
                        : "in original order"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    Answers are{" "}
                    <strong>
                      {effectiveSettings.randomizeAnswers
                        ? "randomized"
                        : "in original order"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    Show Answer button is{" "}
                    <strong>
                      {effectiveSettings.includeShowAnswerBtn ? "included" : "excluded"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    Live Score during exam is{" "}
                    <strong>
                      {effectiveSettings.showScoreLive ? "visible" : "hidden"}
                    </strong>
                  </div>
                  <div className="summary-row highlight-count">
                    This exam has{" "}
                    <strong>
                      {isSimulation
                        ? "70–80 random questions"
                        : `${getBankFilteredQuestions().filtered.length} questions`}
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
          setSettings={handleUpdateSettings}
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
