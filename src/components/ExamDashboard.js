import React, { useState, useEffect } from "react";
import ExamSettingsModal from "./ExamSettingsModal";
import NavigationMenu from "./NavigationMenu";
import CustomConfirmModal from "./CustomConfirmModal";
import FinishScreen from "./FinishScreen";
import { randomizeQuestionOptions, aggressiveShuffle } from "./randomizeOptions";
import {
  isPlanAllowedForBank,
  isPlanAllowedForMode,
  getBankAllowedQuestionCount,
  getPlanDisplayInfo,
  EXAM_BANKS
} from "../utils/planPermissions";
import { getExamQuestionStats } from "../utils/examScoring";
import { getAllBanksAnalysis } from "../utils/bankStrengthAlgorithm";

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
  const [selectedReportExam, setSelectedReportExam] = useState(null);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const handleDocClick = () => setOpenActionMenuId(null);
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);
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
          try {
            localStorage.setItem('ccna_cached_plans', JSON.stringify(data.plans));
          } catch {}
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
    // Separate non-drag-drop questions (sorted 1..207) and drag-drop questions (sorted 1..21)
    const nonDD = (allQuestions || []).filter(
      (q) =>
        q &&
        q.type !== "drag_drop" &&
        q.questionType !== "drag_drop" &&
        !q.dragDropData &&
        !q.isDragDrop &&
        !(typeof q.questionNo === "string" && q.questionNo.toLowerCase().includes("drag"))
    );
    const dd = (allQuestions || []).filter(
      (q) =>
        q &&
        (q.type === "drag_drop" ||
          q.questionType === "drag_drop" ||
          Boolean(q.dragDropData) ||
          q.isDragDrop ||
          (typeof q.questionNo === "string" && q.questionNo.toLowerCase().includes("drag")))
    );

    const getNum = (q) => {
      const m = (q?.questionNo || "").match(/\d+/);
      return m ? parseInt(m[0], 10) : 999999;
    };

    nonDD.sort((a, b) => getNum(a) - getNum(b));
    dd.sort((a, b) => getNum(a) - getNum(b));

    const sortedAll = [...nonDD, ...dd];

    let filtered = sortedAll;
    let bankTitle = "Full Question Bank";

    switch (selectedBank) {
      case "bank_a":
        filtered = nonDD.slice(0, 50);
        bankTitle = "Exam A (1–50)";
        break;
      case "bank_b":
        filtered = nonDD.slice(50, 100);
        bankTitle = "Exam B (51–100)";
        break;
      case "bank_c":
        filtered = nonDD.slice(100, 150);
        bankTitle = "Exam C (101–150)";
        break;
      case "bank_d":
        filtered = nonDD.slice(150, 207);
        bankTitle = "Exam D (151–207)";
        break;
      case "bank_dragdrop":
        filtered = dd;
        bankTitle = "Drag & Drop Special Bank";
        break;
      case "bank_all":
      default:
        filtered = sortedAll;
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
        randomizeAnswers: false,
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
      if (selectedBank === "bank_all") {
        // When all 228 questions are selected: 70-80 random questions across all 228 questions
        const simCount = Math.floor(Math.random() * (80 - 70 + 1)) + 70;
        const shuffled = aggressiveShuffle(filtered);
        filtered = shuffled.slice(0, Math.min(simCount, shuffled.length));
        bankTitle = `All Questions — Simulation (${filtered.length} Qs)`;
      } else {
        // When any specific bank is selected: 70% to 80% random questions from that bank
        const randomPercent = Math.floor(Math.random() * (80 - 70 + 1)) + 70;
        const simCount = Math.max(1, Math.round(filtered.length * (randomPercent / 100)));
        const shuffled = aggressiveShuffle(filtered);
        filtered = shuffled.slice(0, Math.min(simCount, shuffled.length));
        bankTitle = `${bankTitle} — Simulation (${filtered.length} Qs - ${randomPercent}%)`;
      }
    } else if (effectiveSettings.randomizeQuestions) {
      filtered = aggressiveShuffle(filtered);
    }

    // Keep exact canonical dump options sequence (A, B, C, D) matching original source images
    // Do not scramble options to ensure 100% synchronization with master catalog and exhibits

    onStartExam({
      questions: filtered,
      examMode,
      settings: effectiveSettings,
      bankName: bankTitle,
      bankKey: selectedBank,
    });
  };

  const formatRelativeTime = (timestamp, fallbackSessionId) => {
    let effective = timestamp;
    if (!effective && typeof fallbackSessionId === "string" && fallbackSessionId.startsWith("session_")) {
      const parsed = parseInt(fallbackSessionId.replace("session_", ""), 10);
      if (!isNaN(parsed) && parsed > 1000000000000) {
        effective = parsed;
      }
    }
    if (!effective) return "Just now";
    const ts = typeof effective === "string" ? new Date(effective).getTime() : Number(effective);
    if (!ts || isNaN(ts)) return "Just now";
    const numTs = ts < 1e11 ? ts * 1000 : ts;
    const diffSec = Math.max(0, Math.floor((Date.now() - numTs) / 1000));
    if (diffSec < 60) return "Just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const cleanBankTitle = (name) => {
    if (!name) return "";
    return String(name)
      .replace(/spoto-?/gi, "")
      .replace(/\(\s*\)/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const isSessionActiveAndUnfinished = (s) => {
    if (!s || !s.questions || !Array.isArray(s.questions) || s.questions.length === 0) return false;
    if (s.status === "finished" || s.isFinished) return false;
    if (Array.isArray(pastExams) && pastExams.some((p) => p.id === s.id || p.sessionId === s.id || p.activeSessionId === s.id)) {
      return false;
    }
    try {
      const finishedIds = JSON.parse(localStorage.getItem("ccna_finished_session_ids") || "[]");
      if (Array.isArray(finishedIds) && finishedIds.includes(s.id)) return false;
    } catch {}
    const answersList = Array.isArray(s.answers) ? s.answers : [];
    const answeredCount = answersList.filter((a) => a !== null && a !== undefined && a !== "").length;
    if (answeredCount >= s.questions.length && s.questions.length > 0) {
      return false;
    }
    return true;
  };

  const validSessions = (savedSessions || []).filter(isSessionActiveAndUnfinished);
  const activeSession =
    currentUser && (
      (savedSession && isSessionActiveAndUnfinished(savedSession) ? savedSession : null) ||
      (validSessions.length > 0 ? validSessions[0] : null)
    );

  const sortedPastExams = (currentUser && Array.isArray(pastExams))
    ? [...pastExams].sort((a, b) => {
        const dateA = Number(a?.date || 0);
        const dateB = Number(b?.date || 0);
        return dateB - dateA;
      })
    : [];

  const latestThreeExams = sortedPastExams.slice(0, 3);

  const bankAnalysis = React.useMemo(() => {
    return getAllBanksAnalysis(pastExams, currentUser, EXAM_BANKS);
  }, [pastExams, currentUser]);

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
                        {cleanBankTitle(activeSession.selectedBankName || "Exam A")}
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
                        message: `Are you sure you want to discard your saved session for "${cleanBankTitle(activeSession.selectedBankName || "Exam A")}"? Your progress will be reset.`,
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
                    Started <strong>{formatRelativeTime(activeSession.startedAt || activeSession.started_at, activeSession.id)}</strong>
                  </div>
                  <div>
                    Last accessed <strong>{formatRelativeTime(activeSession.savedAt || activeSession.updatedAt || activeSession.updated_at)}</strong>
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
                    Question {(activeSession.index || 0) + 1} of {activeSession.questions?.length || 50}
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

              {validSessions.length > 1 && (
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

            {!currentUser && (
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
                  <div className="panel-header-title-row">
                    <h3 className="panel-title">
                      Exam Bank <span className="info-circle" title="Select a bank to practice. Performance stats and bank mastery strength are tracked per bank.">ⓘ</span>
                    </h3>
                    {currentUser && bankAnalysis?.weakestBank && bankAnalysis.weakestBank.needsIntervention && (
                      <span
                        className="bank-attention-alert-badge"
                        title={`Recommended focus: ${bankAnalysis.weakestBank.bankDisplayName} has ${bankAnalysis.weakestBank.strengthScore}% strength with ${bankAnalysis.weakestBank.failCount} failed attempt(s).`}
                      >
                        ⚠️ Focus: {bankAnalysis.weakestBank.bankDisplayName} ({bankAnalysis.weakestBank.strengthScore}%)
                      </span>
                    )}
                  </div>
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

                    const stats = bankAnalysis?.bankStatsMap?.[bank.key];
                    const isAttentionNeeded = Boolean(currentUser && stats?.needsIntervention);
                    const isStrong = Boolean(currentUser && !isAttentionNeeded && stats?.strengthTier === "strong" && stats?.attemptsCount > 0);
                    const isModerate = Boolean(currentUser && !isAttentionNeeded && stats?.strengthTier === "moderate" && stats?.attemptsCount > 0);

                    return (
                      <label
                        key={bank.key}
                        className={`bank-radio-card ${selectedBank === bank.key ? "active" : ""} ${isLocked ? "bank-locked" : ""} ${isAttentionNeeded ? "bank-attention-highlight" : ""} ${isStrong ? "bank-strong-highlight" : ""} ${isModerate ? "bank-moderate-highlight" : ""}`}
                        onClick={(e) => {
                          if (isLocked) {
                            e.preventDefault();
                            handleBankSelect(bank.key, bank.name);
                          }
                        }}
                      >
                        <div className="bank-card-left">
                          <input
                            type="radio"
                            name="examBank"
                            value={bank.key}
                            checked={selectedBank === bank.key}
                            onChange={() => handleBankSelect(bank.key, bank.name)}
                          />
                          <span className="radio-circle"></span>
                          <span className="bank-name">{displayName}</span>
                        </div>

                        {/* SINGLE UNIFIED BADGE IN ONE ROW */}
                        <div className="bank-unified-badge" title={stats?.interventionMessage || `${displayName} • ${metaText}`}>
                          {currentUser && stats && stats.attemptsCount > 0 ? (
                            <>
                              <span className="badge-item-attempts">
                                {stats.attemptsCount} {stats.attemptsCount === 1 ? "attempt" : "attempts"}
                              </span>
                              <span className="badge-item-sep">|</span>
                              <span className="badge-item-pass">
                                {stats.passCount} pass
                              </span>
                              <span className="badge-item-sep">|</span>
                              <span className={`badge-item-fail ${stats.failCount > 0 ? "has-fails" : ""}`}>
                                {stats.failCount} fail
                              </span>
                              <span className="badge-item-sep">|</span>
                              <span className={`badge-item-strength ${stats.strengthTierClass}`}>
                                {stats.strengthScore}% {stats.strengthLabel}
                              </span>
                              <span className="badge-item-sep">|</span>
                              <span className="badge-item-qs">
                                {metaText}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="badge-item-unattempted">
                                0 attempts
                              </span>
                              <span className="badge-item-sep">|</span>
                              <span className="badge-item-qs">
                                {metaText}
                              </span>
                            </>
                          )}
                          {isLocked && (
                            <>
                              <span className="badge-item-sep">|</span>
                              <span className="badge-item-locked">🔒 Locked</span>
                            </>
                          )}
                        </div>
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
                        ? selectedBank === "bank_all"
                          ? "70–80 random questions (All 228 pool)"
                          : `70%–80% random questions (~${Math.max(1, Math.round(getBankFilteredQuestions().filtered.length * 0.75))} Qs from this bank)`
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
        {latestThreeExams.length > 0 && (
          <section className="dashboard-section past-exams-block">
            <div className="section-header-flex">
              <h2 className="section-green-heading">Review your past exams</h2>
              <button
                type="button"
                className="link-view-more"
                onClick={() => onNavigate("history")}
              >
                View Full History ({pastExams.length}) ➜
              </button>
            </div>

            <div className="past-exams-list">
              {latestThreeExams.map((exam, idx) => {
                const flaggedCount = exam.flaggedQuestions
                  ? exam.flaggedQuestions.length
                  : 0;
                const hasQuestions = exam.questions && exam.questions.length > 0;
                const examStats = hasQuestions ? getExamQuestionStats(exam.questions, exam.answers) : null;
                const nonCorrectCount = examStats ? examStats.nonCorrectIndices.length : 0;
                const incorrectCount = examStats ? examStats.incorrect : 0;
                const unansweredCount = examStats ? examStats.unanswered : 0;

                const isOpen = openActionMenuId === (exam.id || idx);
                return (
                  <div
                    key={exam.id || `past_${idx}`}
                    className={`past-exam-preview-card is-clickable ${isOpen ? "has-open-dropdown" : ""}`}
                    style={isOpen ? { zIndex: 1000, position: "relative" } : undefined}
                    onClick={() => setSelectedReportExam(exam)}
                    title="Click card to view detailed Score Report"
                  >
                    <div className="past-exam-header">
                      <div>
                        <span className="past-exam-sub">
                          {idx === 0
                            ? "Last Exam:"
                            : idx === 1
                            ? "Previous Exam:"
                            : `Recent Exam #${idx + 1}:`}
                        </span>
                        <h3 className="past-exam-title">
                          Cisco 200-301 CCNA ({cleanBankTitle(exam.bankName || "CCNA Exam")})
                        </h3>
                      </div>

                      <span
                        className={`history-status-badge ${
                          exam.passed ? "badge-pass" : "badge-fail"
                        }`}
                      >
                        {exam.passed ? "PASS ✓" : "FAIL ✕"}
                      </span>
                    </div>

                    <div className="past-exam-stats-row">
                      <div className="stat-item">
                        <span className="stat-label">Final Score:</span>
                        <strong className="stat-val">
                          {Math.round(((exam.score || 0) / (exam.maxScore || 1)) * 1000)} / 1000
                        </strong>
                        <span className="stat-sub" style={{ fontSize: "11px", color: "#64748b", marginLeft: "4px" }}>
                          ({exam.score}/{exam.maxScore || 1000} pts)
                        </span>
                      </div>

                      <div className="stat-item">
                        <span className="stat-label">Accuracy:</span>
                        <strong
                          className={`stat-val ${
                            exam.passed ? "text-green" : "text-danger"
                          }`}
                        >
                          {exam.percentage}%
                        </strong>
                      </div>

                      <div className="stat-item">
                        <span className="stat-label">Date:</span>
                        <span className="stat-val text-muted">
                          {formatRelativeTime(exam.date)}
                        </span>
                      </div>
                    </div>

                    <div className="past-exam-footer-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="btn-history-action btn-history-score-report"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReportExam(exam);
                        }}
                      >
                        📊 Score Report
                      </button>

                      <div className="card-actions-dropdown-container">
                        <button
                          type="button"
                          className="btn-history-action btn-history-actions-toggle"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenActionMenuId(openActionMenuId === (exam.id || idx) ? null : (exam.id || idx));
                          }}
                        >
                          ⚡ Actions ▾
                        </button>

                        {openActionMenuId === (exam.id || idx) && (
                          <div className="card-actions-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              className="card-dropdown-item item-score-report"
                              onClick={() => {
                                setOpenActionMenuId(null);
                                setSelectedReportExam(exam);
                              }}
                            >
                              <span className="dropdown-item-icon">📊</span>
                              <span className="dropdown-item-label">View Score Report</span>
                            </button>

                            {onReviewExam && (
                              <button
                                type="button"
                                className="card-dropdown-item item-review"
                                onClick={() => {
                                  setOpenActionMenuId(null);
                                  onReviewExam(exam);
                                }}
                              >
                                <span className="dropdown-item-icon">🔍</span>
                                <span className="dropdown-item-label">Review Exam (Read-Only)</span>
                              </button>
                            )}

                            {(onRetakeAll || onRetakeExam) && (
                              <button
                                type="button"
                                className="card-dropdown-item item-retake-all"
                                onClick={() => {
                                  setOpenActionMenuId(null);
                                  (onRetakeAll || onRetakeExam)(exam);
                                }}
                              >
                                <span className="dropdown-item-icon">↺</span>
                                <span className="dropdown-item-label">Retake All Questions</span>
                                <span className="dropdown-item-badge badge-all">
                                  {exam.totalQuestions || (exam.questions ? exam.questions.length : 0)}&nbsp;Qs
                                </span>
                              </button>
                            )}

                            {onRetakeFlagged && (
                              <button
                                type="button"
                                className={`card-dropdown-item item-retake-flagged ${flaggedCount === 0 ? "disabled" : ""}`}
                                disabled={flaggedCount === 0}
                                onClick={() => {
                                  if (flaggedCount === 0) return;
                                  setOpenActionMenuId(null);
                                  onRetakeFlagged(exam);
                                }}
                              >
                                <span className="dropdown-item-icon">⚑</span>
                                <span className="dropdown-item-label">Retake Marked Only</span>
                                <span className="dropdown-item-badge badge-flagged">
                                  {flaggedCount}&nbsp;Qs
                                </span>
                              </button>
                            )}

                            {onRetakeIncorrect && (
                              <button
                                type="button"
                                className={`card-dropdown-item item-retake-incorrect ${nonCorrectCount === 0 ? "disabled" : ""}`}
                                disabled={nonCorrectCount === 0}
                                title={
                                  nonCorrectCount > 0
                                    ? unansweredCount > 0
                                      ? `${incorrectCount} incorrect, ${unansweredCount} missed`
                                      : `${incorrectCount} answered incorrectly`
                                    : "All answers correct!"
                                }
                                onClick={() => {
                                  if (nonCorrectCount === 0) return;
                                  setOpenActionMenuId(null);
                                  onRetakeIncorrect(exam);
                                }}
                              >
                                <span className="dropdown-item-icon">✕</span>
                                <span className="dropdown-item-label">
                                  {unansweredCount > 0 ? "Retake Incorrect & Missed" : "Retake Incorrect Only"}
                                </span>
                                <span className="dropdown-item-badge badge-incorrect">
                                  {nonCorrectCount}&nbsp;Qs
                                </span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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

      {/* DETAILED SCORE REPORT MODAL (SAME CARD AS END OF EXAM) */}
      {selectedReportExam && (
        <div
          className="score-report-modal-backdrop"
          onClick={() => setSelectedReportExam(null)}
        >
          <div
            className="score-report-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <FinishScreen
              points={selectedReportExam.score}
              maxPossiblePoints={
                selectedReportExam.maxScore ||
                (selectedReportExam.questions?.length
                  ? selectedReportExam.questions.reduce((a, b) => a + (b.points || 10), 0)
                  : 1000)
              }
              candidateName={selectedReportExam.candidateName || candidateName}
              numQuestions={
                selectedReportExam.totalQuestions ||
                (selectedReportExam.questions ? selectedReportExam.questions.length : 0)
              }
              answers={selectedReportExam.answers || []}
              questions={selectedReportExam.questions || []}
              flaggedQuestions={selectedReportExam.flaggedQuestions || []}
              incorrectQuestions={selectedReportExam.incorrectQuestions}
              examMode={selectedReportExam.examMode || "study"}
              selectedBankName={cleanBankTitle(selectedReportExam.bankName || "CCNA Exam")}
              onReviewExam={() => {
                const target = selectedReportExam;
                setSelectedReportExam(null);
                if (onReviewExam) onReviewExam(target);
              }}
              onRetakeAll={() => {
                const target = selectedReportExam;
                setSelectedReportExam(null);
                if (onRetakeAll || onRetakeExam) (onRetakeAll || onRetakeExam)(target);
              }}
              onRetakeFlagged={() => {
                const target = selectedReportExam;
                setSelectedReportExam(null);
                if (onRetakeFlagged) onRetakeFlagged(target);
              }}
              onRetakeIncorrect={() => {
                const target = selectedReportExam;
                setSelectedReportExam(null);
                if (onRetakeIncorrect) onRetakeIncorrect(target);
              }}
              onClose={() => setSelectedReportExam(null)}
              backButtonLabel="← Back to Dashboard"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamDashboard;
