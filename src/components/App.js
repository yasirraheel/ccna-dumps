import React, { useReducer, useEffect, useState, useRef } from "react";
import ExamDashboard from "./ExamDashboard";
import QuestionView from "./QuestionView";
import FinishScreen from "./FinishScreen";
import Loader from "./Loader";
import Error from "./Error";
import ResumeExamsView from "./ResumeExamsView";
import ExamHistoryView from "./ExamHistoryView";
import AuthModal from "./AuthModal";
import AuthView from "./AuthView";
import MobileBottomBar from "./MobileBottomBar";
import AdminLayout from "./Admin/AdminLayout";
import UpgradePlanModal from "./UpgradePlanModal";
import CustomConfirmModal from "./CustomConfirmModal";
import { ccnaQuestions } from "../data/ccnaQuestions";
import { randomizeQuestionOptions, aggressiveShuffle } from "./randomizeOptions";
import { calculateTotalPoints, getIncorrectQuestionIndices, getExamQuestionStats } from "../utils/examScoring";
import { matchExamToBankKey } from "../utils/bankStrengthAlgorithm";
import { enrichQuestionsList } from "../utils/questionSourceHelper";

const API_BASE_URL = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:5000/api" : "/api");
const SESSIONS_STORAGE_KEY = "ccna_saved_sessions_list";
const HISTORY_STORAGE_KEY = "ccna_past_exams_list";
const ACTIVE_RUNNING_SESSION_KEY = "ccna_active_running_session";
const ACTIVE_RUNNING_SESSION_ID_KEY = "ccna_active_running_session_id";
const FINISHED_SESSIONS_STORAGE_KEY = "ccna_finished_session_ids";

export function isExamFinishedId(targetId) {
  if (!targetId) return false;
  try {
    const finishedIds = JSON.parse(localStorage.getItem(FINISHED_SESSIONS_STORAGE_KEY) || "[]");
    if (Array.isArray(finishedIds) && finishedIds.includes(targetId)) return true;
    const past = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || "[]");
    if (Array.isArray(past) && past.some((p) => p.id === targetId || p.sessionId === targetId || p.activeSessionId === targetId)) {
      return true;
    }
  } catch {}
  return false;
}

function getInitialExamState() {
  const path = typeof window !== "undefined" ? window.location.pathname.toLowerCase().replace(/\/+$/, "") : "";
  const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const isExamUrl = path === "/exam" || path.startsWith("/exam") || search?.get("view") === "exam";
  const urlId = search?.get("id") || search?.get("sessionId") || null;
  const isReviewUrl = search?.get("review") === "1" || search?.get("mode") === "review";

  // If visiting an exam URL whose session/exam has already finished and NOT in review mode:
  if (isExamUrl && urlId && !isReviewUrl && isExamFinishedId(urlId)) {
    try {
      sessionStorage.setItem(
        "ccna_redirect_notice",
        JSON.stringify({
          title: "Exam Already Finished",
          message: "This exam session has already been completed and graded. Completed exams cannot be resumed. You can review your results, full explanations, and score report in Exam History.",
        })
      );
      localStorage.removeItem(ACTIVE_RUNNING_SESSION_ID_KEY);
      localStorage.removeItem(ACTIVE_RUNNING_SESSION_KEY);
    } catch {}
    return {
      allQuestions: ccnaQuestions || [],
      questions: ccnaQuestions || [],
      status: ccnaQuestions?.length > 0 ? "ready" : "loading",
      index: 0,
      answer: null,
      answers: [],
      points: 0,
      highscore: 0,
      secondsRemaining: null,
      examMode: "study",
      settings: {
        randomizeQuestions: false,
        randomizeAnswers: false,
        showScoreLive: true,
        showRequiredAnswersCount: true,
        includeShowAnswerBtn: true,
        showAnswersInline: true,
        timerMode: "not_timed",
      },
      selectedBankName: "Full CCNA Exam",
      selectedBankKey: "bank_all",
      activeSessionId: null,
      startedAt: null,
      revealedQuestions: [],
      isReviewMode: false,
      isPaused: false,
    };
  }

  let activeSession = null;
  try {
    const directStored = localStorage.getItem(ACTIVE_RUNNING_SESSION_KEY);
    if (directStored) {
      const parsed = JSON.parse(directStored);
      if (parsed && !isExamFinishedId(parsed.id)) {
        activeSession = parsed;
      }
    }
    if (!activeSession) {
      const activeId = urlId || localStorage.getItem(ACTIVE_RUNNING_SESSION_ID_KEY);
      const listStored = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (listStored) {
        const list = JSON.parse(listStored);
        if (Array.isArray(list) && list.length > 0) {
          const found = activeId ? list.find((s) => s.id === activeId) : null;
          if (found && !isExamFinishedId(found.id)) {
            const ansCount = (found.answers || []).filter((a) => a !== null && a !== undefined && a !== "").length;
            if (found.questions?.length > 0 && ansCount < found.questions.length) {
              activeSession = found;
            }
          }
        }
      }
    }
  } catch (e) {
    console.warn("Initial active session parse error:", e);
  }

  if (activeSession && (isExamUrl || localStorage.getItem(ACTIVE_RUNNING_SESSION_ID_KEY))) {
    if (activeSession.questions && Array.isArray(activeSession.questions) && activeSession.questions.length > 0) {
      const validIndex =
        typeof activeSession.index === "number" &&
        activeSession.index >= 0 &&
        activeSession.index < activeSession.questions.length
          ? activeSession.index
          : 0;

      return {
        allQuestions: ccnaQuestions || [],
        questions: enrichQuestionsList(activeSession.questions),
        status: "active",
        index: validIndex,
        answer:
          activeSession.answer !== undefined
            ? activeSession.answer
            : (activeSession.answers?.[validIndex] ?? null),
        answers:
          activeSession.answers ||
          new Array(activeSession.questions.length).fill(null),
        points: typeof activeSession.points === "number" ? activeSession.points : 0,
        highscore: 0,
        secondsRemaining:
          activeSession.secondsRemaining !== undefined
            ? activeSession.secondsRemaining
            : null,
        examMode: activeSession.examMode || "study",
        settings: activeSession.settings || {
          randomizeQuestions: false,
          randomizeAnswers: false,
          showScoreLive: true,
          showRequiredAnswersCount: true,
          includeShowAnswerBtn: true,
          showAnswersInline: true,
          timerMode: "not_timed",
        },
        selectedBankName:
          activeSession.selectedBankName || activeSession.bankName || "Exam",
        activeSessionId: activeSession.id || `session_${Date.now()}`,
        startedAt: activeSession.startedAt || Date.now(),
        revealedQuestions: activeSession.revealedQuestions || [],
        isReviewMode: Boolean(activeSession.isReviewMode),
        isPaused: Boolean(activeSession.isPaused),
      };
    }
  }

  return {
    allQuestions: ccnaQuestions || [],
    questions: ccnaQuestions || [],
    status: ccnaQuestions?.length > 0 ? "ready" : "loading",
    index: 0,
    answer: null,
    answers: [],
    points: 0,
    highscore: 0,
    secondsRemaining: null,
    examMode: "study",
    settings: {
      randomizeQuestions: false,
      randomizeAnswers: false,
      showScoreLive: true,
      showRequiredAnswersCount: true,
      includeShowAnswerBtn: true,
      showAnswersInline: true,
      timerMode: "not_timed",
    },
    selectedBankName: "Full CCNA Exam",
    selectedBankKey: "bank_all",
    activeSessionId: null,
    startedAt: null,
    revealedQuestions: [],
    isReviewMode: false,
    isPaused: false,
  };
}

const initialState = getInitialExamState();

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      if (state.status === "active") {
        return {
          ...state,
          allQuestions: action.payload,
        };
      }
      return {
        ...state,
        allQuestions: action.payload,
        questions: action.payload,
        status: state.status === "loading" ? "ready" : state.status,
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "startExam": {
      const { questions, examMode, settings, bankName, bankKey } = action.payload;
      const initialAnswers = new Array(questions.length).fill(null);

      let timerSeconds = null;
      if (settings?.timerMode === "ccna_120") timerSeconds = 120 * 60;
      else if (settings?.timerMode === "90_mins" || settings?.timerMode === "timed_90") timerSeconds = 90 * 60;
      else if (settings?.timerMode === "60_mins") timerSeconds = 60 * 60;
      else if (settings?.timerMode === "30s_per_q")
        timerSeconds = questions.length * 30;
      else if (settings?.timerMode === "60s_per_q")
        timerSeconds = questions.length * 60;

      const startTime = Date.now();
      const newSessionId = `session_${startTime}`;
      try {
        localStorage.setItem(ACTIVE_RUNNING_SESSION_ID_KEY, newSessionId);
      } catch {}

      return {
        ...state,
        questions,
        status: "active",
        examMode,
        settings,
        selectedBankName: bankName,
        selectedBankKey: bankKey || matchExamToBankKey({ bankName }),
        index: 0,
        answer: null,
        answers: initialAnswers,
        points: 0,
        secondsRemaining: timerSeconds,
        activeSessionId: newSessionId,
        startedAt: startTime,
        revealedQuestions: [],
        isReviewMode: false,
        isPaused: false,
      };
    }

    case "resumeExam": {
      const {
        questions,
        index,
        answer,
        answers,
        points,
        secondsRemaining,
        examMode,
        settings,
        selectedBankName,
        activeSessionId,
        revealedQuestions,
        isReviewMode,
        startedAt,
      } = action.payload;

      let initialStartTime = startedAt;
      if (!initialStartTime && typeof activeSessionId === "string" && activeSessionId.startsWith("session_")) {
        const parsed = parseInt(activeSessionId.replace("session_", ""), 10);
        if (!isNaN(parsed) && parsed > 1000000000000) {
          initialStartTime = parsed;
        }
      }
      if (!initialStartTime) {
        initialStartTime = state.startedAt || Date.now();
      }

      const finalSessionId = activeSessionId || `session_${initialStartTime}`;
      try {
        localStorage.setItem(ACTIVE_RUNNING_SESSION_ID_KEY, finalSessionId);
      } catch {}

      return {
        ...state,
        questions,
        index,
        answer,
        answers: answers || new Array(questions.length).fill(null),
        points: points || 0,
        secondsRemaining:
          secondsRemaining !== undefined ? secondsRemaining : null,
        examMode: examMode || "study",
        settings: settings || initialState.settings,
        selectedBankName: selectedBankName || "Resumed CCNA Exam",
        status: "active",
        activeSessionId: finalSessionId,
        startedAt: initialStartTime,
        revealedQuestions: revealedQuestions || [],
        isReviewMode: Boolean(isReviewMode),
        isPaused: false,
      };
    }

    case "revealAnswer": {
      const qIdx = action.payload !== undefined ? action.payload : state.index;
      const newRevealed = state.revealedQuestions.includes(qIdx)
        ? state.revealedQuestions
        : [...state.revealedQuestions, qIdx];
      const updatedPoints = calculateTotalPoints(state.questions, state.answers);
      return {
        ...state,
        revealedQuestions: newRevealed,
        points: updatedPoints,
      };
    }

    case "newAnswer": {
      if (state.isReviewMode || state.isPaused) return state;
      if (state.secondsRemaining !== null && state.secondsRemaining <= 0) return state;
      const optIdx =
        typeof action.payload === "number"
          ? action.payload
          : action.payload?.optionIndex;

      const newAnswersList = [...state.answers];
      newAnswersList[state.index] = optIdx;

      return {
        ...state,
        answer: optIdx,
        answers: newAnswersList,
        points: state.points,
      };
    }

    case "multiSelect": {
      if (state.isReviewMode || state.isPaused) return state;
      if (state.secondsRemaining !== null && state.secondsRemaining <= 0) return state;
      const selections = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.selections || [];

      const newAnswersList = [...state.answers];
      newAnswersList[state.index] = { selections, confirmed: false };

      return {
        ...state,
        answer: { selections, confirmed: false },
        answers: newAnswersList,
        points: state.points,
      };
    }

    case "commitCurrentAnswer": {
      if (state.isReviewMode || state.isPaused) return state;
      const updatedPoints = calculateTotalPoints(state.questions, state.answers);
      return {
        ...state,
        points: updatedPoints,
      };
    }

    case "dragDropAnswer": {
      if (state.isReviewMode || state.isPaused) return state;
      if (state.secondsRemaining !== null && state.secondsRemaining <= 0) return state;
      const { matches } = action.payload;
      const newAnswersList = [...state.answers];
      newAnswersList[state.index] = { matches, confirmed: false };

      return {
        ...state,
        answer: { matches, confirmed: false },
        answers: newAnswersList,
      };
    }

    case "confirmDragDrop": {
      if (state.isReviewMode || state.isPaused) return state;
      const currentQuestion = state.questions[state.index];
      const correctMatches =
        currentQuestion.dragDropData?.correctMatches || {};
      const userMatches = state.answer?.matches || {};

      let allCorrect = true;
      const targetKeys = Object.keys(correctMatches);
      if (targetKeys.length === 0) allCorrect = false;

      for (let key of targetKeys) {
        if (userMatches[key] !== correctMatches[key]) {
          allCorrect = false;
          break;
        }
      }

      const newAnswersList = [...state.answers];
      newAnswersList[state.index] = {
        matches: userMatches,
        confirmed: true,
        isCorrect: allCorrect,
      };

      return {
        ...state,
        answer: {
          matches: userMatches,
          confirmed: true,
          isCorrect: allCorrect,
        },
        answers: newAnswersList,
      };
    }

    case "nextQuestion":
    case "prevQuestion":
    case "goToQuestion": {
      if (state.isPaused) return state;
      const nextIdx =
        action.type === "nextQuestion"
          ? state.index + 1
          : action.type === "prevQuestion"
          ? Math.max(0, state.index - 1)
          : action.payload !== undefined
          ? action.payload
          : 0;

      const updatedPoints = calculateTotalPoints(state.questions, state.answers);

      return {
        ...state,
        status: "active",
        index: nextIdx,
        answer: state.answers[nextIdx] ?? null,
        points: updatedPoints,
      };
    }

    case "reviewExam": {
      const targetIdx = action.payload !== undefined ? action.payload : 0;
      const allRevealed = state.questions.map((_, i) => i);
      return {
        ...state,
        status: "active",
        isReviewMode: true,
        isPaused: false,
        index: targetIdx,
        answer: state.answers[targetIdx] ?? null,
        revealedQuestions: allRevealed,
      };
    }

    case "exitReview": {
      return {
        ...state,
        status: "finished",
        isReviewMode: false,
        isPaused: false,
      };
    }

    case "pauseExam": {
      return {
        ...state,
        isPaused: true,
      };
    }

    case "unpauseExam": {
      return {
        ...state,
        isPaused: false,
      };
    }

    case "togglePauseExam": {
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    }

    case "finish": {
      try {
        localStorage.removeItem(ACTIVE_RUNNING_SESSION_ID_KEY);
        localStorage.removeItem(ACTIVE_RUNNING_SESSION_KEY);
      } catch {}
      const finalPoints = calculateTotalPoints(state.questions, state.answers);
      return {
        ...state,
        status: "finished",
        isPaused: false,
        points: finalPoints,
        highscore:
          finalPoints > state.highscore ? finalPoints : state.highscore,
      };
    }

    case "restart": {
      try {
        localStorage.removeItem(ACTIVE_RUNNING_SESSION_ID_KEY);
        localStorage.removeItem(ACTIVE_RUNNING_SESSION_KEY);
      } catch {}
      return {
        ...initialState,
        allQuestions: state.allQuestions,
        questions: state.allQuestions,
        status: "ready",
        isPaused: false,
      };
    }

    case "tick": {
      if (state.isPaused) return state;
      const nextSeconds = state.secondsRemaining - 1;
      const isTimeUp = nextSeconds <= 0;
      if (isTimeUp) {
        try {
          localStorage.removeItem(ACTIVE_RUNNING_SESSION_ID_KEY);
          localStorage.removeItem(ACTIVE_RUNNING_SESSION_KEY);
        } catch {}
      }
      return {
        ...state,
        secondsRemaining: isTimeUp ? 0 : nextSeconds,
        highscore: isTimeUp
          ? Math.max(state.highscore, state.points)
          : state.highscore,
        status: isTimeUp ? "finished" : state.status,
      };
    }

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    {
      allQuestions,
      questions,
      status,
      index,
      answer,
      answers,
      points,
      highscore,
      secondsRemaining,
      examMode,
      settings,
      selectedBankName,
      selectedBankKey,
      activeSessionId,
      startedAt,
      revealedQuestions,
      isReviewMode,
      isPaused,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const getViewFromUrl = () => {
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, "");
    const search = new URLSearchParams(window.location.search);
    const viewParam = search.get("view");
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, "");
    const urlId = search.get("id") || search.get("sessionId");
    const isReview = search.get("review") === "1" || search.get("mode") === "review";

    if (path === "/admin" || path.startsWith("/admin/") || viewParam === "admin" || hash.startsWith("admin")) {
      return "admin";
    }
    if (path === "/exam" || path === "/exam/" || viewParam === "exam" || hash === "exam") {
      if (urlId && !isReview && isExamFinishedId(urlId)) {
        return "dashboard";
      }
      return "exam";
    }
    if (path === "/history" || viewParam === "history" || hash === "history") {
      return "history";
    }
    if (path === "/my-exams" || path === "/resume-exams" || viewParam === "resume-exams" || hash === "my-exams" || hash === "resume-exams") {
      return "resume-exams";
    }
    if (path === "/login" || viewParam === "login" || hash === "login") {
      return "auth-login";
    }
    if (path === "/signup" || viewParam === "signup" || hash === "signup") {
      return "auth-signup";
    }
    if (path === "/verify" || viewParam === "verify" || hash === "verify") {
      return "auth-verify";
    }
    if (path === "/forgot-password" || path === "/forgot" || viewParam === "forgot" || hash === "forgot") {
      return "auth-forgot";
    }
    if (path === "/reset-password" || path === "/reset" || viewParam === "reset" || hash === "reset") {
      return "auth-reset";
    }
    return "dashboard";
  };

  const [currentView, setCurrentView] = useState(getViewFromUrl);

  const handleNavigate = (view) => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setCurrentView(view);
    let targetUrl = "/";
    if (view === "admin") {
      targetUrl = "/admin";
    } else if (view === "exam") {
      if (isReviewMode && activeSessionId) {
        targetUrl = `/exam?id=${encodeURIComponent(activeSessionId)}&review=1`;
      } else if (activeSessionId) {
        targetUrl = `/exam?id=${encodeURIComponent(activeSessionId)}`;
      } else {
        targetUrl = "/exam";
      }
    } else if (view === "history") {
      targetUrl = "/history";
    } else if (view === "resume-exams") {
      targetUrl = "/my-exams";
    } else if (view === "auth-login") {
      targetUrl = "/login";
    } else if (view === "auth-signup") {
      targetUrl = "/signup";
    } else if (view === "auth-verify") {
      targetUrl = "/verify";
    } else if (view === "auth-forgot") {
      targetUrl = "/forgot-password";
    } else if (view === "auth-reset") {
      targetUrl = "/reset-password";
    } else {
      targetUrl = "/";
    }

    if (view === "admin") {
      if (!window.location.pathname.toLowerCase().startsWith("/admin")) {
        window.history.pushState({ view }, "", targetUrl);
      }
    } else {
      if (window.location.pathname + window.location.search !== targetUrl) {
        window.history.pushState({ view }, "", targetUrl);
      }
    }
  };

  // Always reset scroll position to top whenever currentView switches
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const rootEl = document.querySelector(".cisco-simulator-root");
    if (rootEl) rootEl.scrollTop = 0;
    const appContainer = document.querySelector(".simulator-app-container");
    if (appContainer) appContainer.scrollTop = 0;
  }, [currentView]);

  useEffect(() => {
    const handlePopState = () => {
      const search = new URLSearchParams(window.location.search);
      const urlId = search.get("id") || search.get("sessionId");
      const isReview = search.get("review") === "1" || search.get("mode") === "review";
      if (urlId && !isReview && isExamFinishedId(urlId)) {
        window.history.replaceState({ view: "dashboard" }, "", "/");
        setCurrentView("dashboard");
        setAlertDialog({
          isOpen: true,
          title: "Exam Already Finished",
          message: "This exam session has already been completed and graded. Completed exams cannot be resumed. You can review your past attempts and detailed performance in Exam History.",
          confirmText: "Go to Exam History",
          cancelText: "Return to Home",
          type: "info",
          onConfirm: () => handleNavigate("history"),
        });
        return;
      }

      const nextView = getViewFromUrl();
      if (nextView !== "exam" && status === "active" && !isReviewMode) {
        try {
          localStorage.removeItem(ACTIVE_RUNNING_SESSION_ID_KEY);
          localStorage.removeItem(ACTIVE_RUNNING_SESSION_KEY);
        } catch {}
        dispatch({ type: "restart" });
      }
      setCurrentView(nextView);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [status, isReviewMode]);

  // Sync browser URL with active exam route (/exam?id=...)
  useEffect(() => {
    if (status === "active" && !isReviewMode && activeSessionId) {
      const examUrl = `/exam?id=${encodeURIComponent(activeSessionId)}`;
      if (window.location.pathname + window.location.search !== examUrl) {
        window.history.pushState({ view: "exam", id: activeSessionId }, "", examUrl);
      }
      if (currentView !== "exam") {
        setCurrentView("exam");
      }
    } else if (status === "active" && isReviewMode && activeSessionId) {
      const reviewUrl = `/exam?id=${encodeURIComponent(activeSessionId)}&review=1`;
      if (window.location.pathname + window.location.search !== reviewUrl) {
        window.history.pushState({ view: "exam", id: activeSessionId, review: true }, "", reviewUrl);
      }
      if (currentView !== "exam") {
        setCurrentView("exam");
      }
    } else if (status === "finished") {
      if (window.location.pathname === "/exam") {
        window.history.replaceState({ view: "dashboard" }, "", "/");
      }
      if (currentView === "exam") {
        setCurrentView("dashboard");
      }
    }
  }, [status, isReviewMode, activeSessionId, currentView]);

  // If user opens /exam directly but there is no active session running, smoothly redirect to dashboard
  useEffect(() => {
    if (currentView === "exam" && status !== "active") {
      handleNavigate("dashboard");
    }
  }, [currentView, status]);
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("ccna_auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: "login", // 'login' | 'signup' | 'verify'
  });

  const [upgradeModal, setUpgradeModal] = useState({
    isOpen: false,
    lockContext: null,
  });

  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "OK",
    cancelText: null,
    type: "info",
    onConfirm: null,
  });

  const closeAlert = () => {
    setAlertDialog((prev) => ({ ...prev, isOpen: false }));
  };

  // Handle redirect notice if user visited an already finished exam
  useEffect(() => {
    try {
      const noticeStr = sessionStorage.getItem("ccna_redirect_notice");
      if (noticeStr) {
        sessionStorage.removeItem("ccna_redirect_notice");
        const notice = JSON.parse(noticeStr);
        if (window.location.pathname === "/exam") {
          window.history.replaceState({ view: "dashboard" }, "", "/");
        }
        setAlertDialog({
          isOpen: true,
          title: notice.title || "Exam Already Finished",
          message: notice.message || "This exam session has already been completed and graded. Results are saved in Exam History.",
          confirmText: "Go to Exam History",
          cancelText: "Return to Home",
          type: "info",
          onConfirm: () => handleNavigate("history"),
        });
      }
    } catch {}
  }, []);

  const handleOpenUpgrade = (lockContext = null) => {
    setUpgradeModal({ isOpen: true, lockContext });
  };

  const handleCloseUpgrade = () => {
    setUpgradeModal({ isOpen: false, lockContext: null });
  };

  const handlePlanUpgraded = (updatedUser, token) => {
    if (updatedUser) {
      setCurrentUser(updatedUser);
      localStorage.setItem("ccna_auth_user", JSON.stringify(updatedUser));
      if (updatedUser.name) {
        setCandidateName(updatedUser.name);
      }
    }
    if (token) {
      localStorage.setItem("ccna_auth_token", token);
    }
  };

  const [candidateName, setCandidateName] = useState(() => {
    try {
      const storedUser = localStorage.getItem("ccna_auth_user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u?.name) return u.name;
      }
    } catch {}
    return localStorage.getItem("ccna_candidate_name") || "Candidate";
  });

  const [flaggedQuestions, setFlaggedQuestions] = useState(() => {
    try {
      const direct = localStorage.getItem(ACTIVE_RUNNING_SESSION_KEY);
      if (direct) {
        const s = JSON.parse(direct);
        if (Array.isArray(s?.flaggedQuestions)) return s.flaggedQuestions;
      }
    } catch {}
    return [];
  });
  const hasSavedRef = useRef(false);

  // Validate session on launch
  useEffect(() => {
    const token = localStorage.getItem("ccna_auth_token");
    if (token) {
      fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setCurrentUser(data.user);
            setCandidateName(data.user.name);
            localStorage.setItem("ccna_auth_user", JSON.stringify(data.user));
          }
        })
        .catch(() => {});
    }

    fetch(`${API_BASE_URL}/plans`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.plans) {
          try {
            localStorage.setItem("ccna_cached_plans", JSON.stringify(data.plans));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const handleOpenAuth = (mode = "login") => {
    handleNavigate(`auth-${mode}`);
  };

  const handleAuthSuccess = (user, token) => {
    setCurrentUser(user);
    if (user?.name) {
      setCandidateName(user.name);
      localStorage.setItem("ccna_candidate_name", user.name);
    }
    handleNavigate("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("ccna_auth_token");
    localStorage.removeItem("ccna_auth_user");
    setCurrentUser(null);
  };

  const normalizeSessionData = (s) => {
    if (!s) return s;
    let startedAt = s.startedAt || s.started_at;
    if (!startedAt && typeof s.id === "string" && s.id.startsWith("session_")) {
      const parsed = parseInt(s.id.replace("session_", ""), 10);
      if (!isNaN(parsed) && parsed > 1000000000000) {
        startedAt = parsed;
      }
    }
    if (!startedAt) {
      startedAt = s.savedAt || s.updatedAt || s.updated_at || Date.now();
    }
    return {
      ...s,
      questions: enrichQuestionsList(s.questions),
      startedAt,
      savedAt: s.savedAt || s.updatedAt || s.updated_at || Date.now(),
      selectedBankName: s.selectedBankName || s.bankName || "Exam A",
    };
  };

  // Multi-session state
  const [savedSessions, setSavedSessions] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map(normalizeSessionData)
        .filter((s) => {
          if (isExamFinishedId(s.id)) return false;
          const ansCount = (s.answers || []).filter((a) => a !== null && a !== undefined && a !== "").length;
          if (s.questions?.length > 0 && ansCount >= s.questions.length) return false;
          return true;
        });
    } catch {
      return [];
    }
  });

  // Past completed exams history state
  const [pastExams, setPastExams] = useState(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed)
        ? parsed.map((item) => ({
            ...item,
            questions: enrichQuestionsList(item.questions),
          }))
        : [];
    } catch {
      return [];
    }
  });

  // 1. Initial Load: Local Dataset guaranteed + MySQL API hydration (Filtered by logged-in user)
  useEffect(() => {
    // 1.1 Load bundled questions immediately, then refresh from MySQL
    if (ccnaQuestions && ccnaQuestions.length > 0) {
      dispatch({ type: "dataReceived", payload: ccnaQuestions });
    }

    fetch(`${API_BASE_URL}/questions`)
      .then((res) => res.json())
      .then((data) => {
        const qList = Array.isArray(data) ? data : data?.questions || [];
        if (qList.length > 0) {
          dispatch({ type: "dataReceived", payload: qList });
        }
      })
      .catch(() => {});
  }, []);

  // 1.2 Hydrate History & Sessions whenever currentUser changes
  useEffect(() => {
    const userQuery = currentUser?.id
      ? `?userId=${encodeURIComponent(currentUser.id)}`
      : currentUser?.email
      ? `?userEmail=${encodeURIComponent(currentUser.email)}`
      : "";

    // Fetch user specific history
    fetch(`${API_BASE_URL}/history${userQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.history && Array.isArray(data.history)) {
          const enrichedHistory = data.history.map((item) => ({
            ...item,
            questions: enrichQuestionsList(item.questions),
          }));
          setPastExams(enrichedHistory);
          try {
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(enrichedHistory));
          } catch {}
        }
      })
      .catch(() => {});

    // Fetch user specific active sessions
    fetch(`${API_BASE_URL}/sessions${userQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.sessions && Array.isArray(data.sessions)) {
          const normalized = data.sessions.map(normalizeSessionData);
          const cleanSessions = normalized.filter((s) => {
            if (isExamFinishedId(s.id)) return false;
            const ansCount = (s.answers || []).filter((a) => a !== null && a !== undefined && a !== "").length;
            if (s.questions?.length > 0 && ansCount >= s.questions.length) return false;
            return true;
          });
          setSavedSessions(cleanSessions);
          try {
            localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(cleanSessions));
          } catch {}
        }
      })
      .catch(() => {});
  }, [currentUser]);

  // *** EXAM TIMER COUNTDOWN ***
  useEffect(() => {
    if (status !== "active" || secondsRemaining === null || isPaused) return;
    if (secondsRemaining <= 0) {
      dispatch({ type: "finish" });
      return;
    }
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(interval);
  }, [status, secondsRemaining, isPaused]);

  // 2. Keep active exam session saved in savedSessions list on every change (tied to user)
  useEffect(() => {
    if (
      status === "active" &&
      questions.length > 0 &&
      !isReviewMode &&
      !activeSessionId?.startsWith("review_")
    ) {
      const sessionKey = activeSessionId || "";
      let initialStartTime = startedAt;
      if (!initialStartTime && sessionKey.startsWith("session_")) {
        const parsed = parseInt(sessionKey.replace("session_", ""), 10);
        if (!isNaN(parsed) && parsed > 1000000000000) {
          initialStartTime = parsed;
        }
      }
      if (!initialStartTime) {
        initialStartTime = Date.now();
      }

      const currentSessionObj = {
        id: activeSessionId || `session_${initialStartTime}`,
        userId: currentUser?.id || null,
        userEmail: currentUser?.email || null,
        status: "active",
        questions,
        index,
        answer,
        answers,
        points,
        secondsRemaining,
        examMode,
        settings,
        selectedBankName,
        selectedBankKey: selectedBankKey || matchExamToBankKey({ bankName: selectedBankName }),
        bankName: selectedBankName,
        bankKey: selectedBankKey || matchExamToBankKey({ bankName: selectedBankName }),
        flaggedQuestions,
        candidateName: currentUser?.name || candidateName,
        revealedQuestions: revealedQuestions || [],
        startedAt: initialStartTime,
        savedAt: Date.now(),
        updatedAt: Date.now(),
        isPaused: Boolean(isPaused),
      };

      setSavedSessions((prev) => {
        const existingIdx = prev.findIndex((s) => s.id === currentSessionObj.id);
        const finalSession = { ...currentSessionObj };
        let updated;
        if (existingIdx >= 0) {
          const prevStart = prev[existingIdx].startedAt || prev[existingIdx].started_at;
          if (prevStart) {
            finalSession.startedAt = prevStart;
          }
          updated = [...prev];
          updated[existingIdx] = finalSession;
        } else {
          updated = [finalSession, ...prev];
        }
        try {
          localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updated));
          localStorage.setItem(ACTIVE_RUNNING_SESSION_KEY, JSON.stringify(finalSession));
          localStorage.setItem(ACTIVE_RUNNING_SESSION_ID_KEY, finalSession.id);
        } catch (e) {
          console.warn("Sessions save error:", e);
        }

        // MySQL backend sync for active session tied to user
        fetch(`${API_BASE_URL}/sessions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalSession),
        }).catch(() => {});

        return updated;
      });
    }
  }, [
    status,
    questions,
    index,
    answer,
    answers,
    points,
    secondsRemaining,
    examMode,
    settings,
    selectedBankName,
    selectedBankKey,
    flaggedQuestions,
    candidateName,
    currentUser,
    activeSessionId,
    startedAt,
    revealedQuestions,
    isReviewMode,
    isPaused,
  ]);

  // 3. When exam finishes: record into pastExams history and remove from active savedSessions
  useEffect(() => {
    if (status === "active") {
      hasSavedRef.current = false;
    }

    if (status === "finished" && !hasSavedRef.current) {
      hasSavedRef.current = true;

      // DO NOT save reviewing existing exam as a duplicate exam entry in history
      if (isReviewMode || activeSessionId?.startsWith("review_")) {
        return;
      }

      const numQuestions = questions.length;
      const maxPossiblePoints = questions.reduce(
        (prev, cur) => prev + (cur.points || 1),
        0
      );
      const percentage = Number(
        ((points / (maxPossiblePoints || 1)) * 100).toFixed(2)
      );
      const passed = percentage >= 82.5;
      const timeSpent =
        secondsRemaining !== null
          ? Math.max(0, numQuestions * 30 - secondsRemaining)
          : 0;

      const completedRecord = {
        id: `exam_${Date.now()}`,
        sessionId: activeSessionId,
        activeSessionId: activeSessionId,
        userId: currentUser?.id || null,
        userEmail: currentUser?.email || null,
        candidateName: currentUser?.name || candidateName || "Candidate",
        bankName: selectedBankName,
        bankKey: selectedBankKey || matchExamToBankKey({ bankName: selectedBankName }),
        score: points,
        maxScore: maxPossiblePoints,
        percentage,
        passed,
        totalQuestions: numQuestions,
        date: Date.now(),
        timeSpentSeconds: timeSpent,
        questions: [...questions],
        answers: [...answers],
        flaggedQuestions: [...flaggedQuestions],
        incorrectQuestions: getIncorrectQuestionIndices(questions, answers),
        revealedQuestions: [...revealedQuestions],
        settings: { ...settings },
        examMode,
      };

      // Record this session ID as permanently finished
      try {
        const finishedList = JSON.parse(localStorage.getItem(FINISHED_SESSIONS_STORAGE_KEY) || "[]");
        const arr = Array.isArray(finishedList) ? finishedList : [];
        if (activeSessionId && !arr.includes(activeSessionId)) {
          arr.push(activeSessionId);
          localStorage.setItem(FINISHED_SESSIONS_STORAGE_KEY, JSON.stringify(arr.slice(-200)));
        }
      } catch {}

      setPastExams((prev) => {
        const updated = [completedRecord, ...prev];
        try {
          localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn("History save error:", e);
        }
        return updated;
      });

      // Remove completed session from active sessions
      try {
        localStorage.removeItem(ACTIVE_RUNNING_SESSION_KEY);
        localStorage.removeItem(ACTIVE_RUNNING_SESSION_ID_KEY);
      } catch (e) {}
      if (activeSessionId) {
        setSavedSessions((prev) => {
          const updated = prev.filter((s) => s.id !== activeSessionId);
          try {
            localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updated));
          } catch (e) {
            console.warn("Sessions clean error:", e);
          }
          return updated;
        });
      }

      // MySQL backend sync: Save full attempt record linked to user
      fetch(`${API_BASE_URL}/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completedRecord),
      }).catch(() => {});

      // Also clean active session from MySQL if present
      if (activeSessionId) {
        fetch(`${API_BASE_URL}/sessions/${encodeURIComponent(activeSessionId)}`, {
          method: "DELETE",
        }).catch(() => {});
      }
    }
  }, [
    status,
    points,
    questions,
    secondsRemaining,
    candidateName,
    currentUser,
    selectedBankName,
    selectedBankKey,
    activeSessionId,
    answers,
    flaggedQuestions,
    revealedQuestions,
    settings,
    examMode,
    isReviewMode,
  ]);

  // 4. Candidate name persistence
  useEffect(() => {
    if (candidateName) {
      localStorage.setItem("ccna_candidate_name", candidateName);
    }
  }, [candidateName]);

  const handleToggleFlag = (qIdx) => {
    setFlaggedQuestions((prev) =>
      prev.includes(qIdx) ? prev.filter((i) => i !== qIdx) : [...prev, qIdx]
    );
  };

  const requireAuth = (callbackAction) => {
    if (!currentUser || !currentUser.isVerified) {
      setCurrentView(currentUser ? "auth-verify" : "auth-login");
      return false;
    }
    if (callbackAction) callbackAction();
    return true;
  };

  const handleStartExam = (config) => {
    if (!requireAuth()) return;
    const safeConfig = {
      ...config,
      questions: enrichQuestionsList(config?.questions),
    };
    dispatch({ type: "startExam", payload: safeConfig });
    handleNavigate("exam");
  };

  const handleResumeSession = (session) => {
    if (!requireAuth()) return;
    if (!session) return;

    if (isExamFinishedId(session.id)) {
      setAlertDialog({
        isOpen: true,
        title: "Exam Already Finished",
        message: "This exam session has already been completed and graded. Completed exams cannot be resumed. You can review your past attempts and detailed performance in Exam History.",
        confirmText: "Go to Exam History",
        cancelText: "Return to Home",
        type: "info",
        onConfirm: () => handleNavigate("history"),
      });
      return;
    }

    const answersList = Array.isArray(session.answers) ? session.answers : [];
    const answeredCount = answersList.filter((a) => a !== null && a !== undefined && a !== "").length;
    if (session.questions?.length > 0 && answeredCount >= session.questions.length) {
      setAlertDialog({
        isOpen: true,
        title: "Exam Already Completed",
        message: "All questions in this exam session were already answered. You can review your past attempts in Exam History.",
        confirmText: "Go to Exam History",
        cancelText: "Return to Home",
        type: "info",
        onConfirm: () => handleNavigate("history"),
      });
      return;
    }

    setFlaggedQuestions(session.flaggedQuestions || []);

    let initialStartTime = session.startedAt || session.started_at;
    if (!initialStartTime && typeof session.id === "string" && session.id.startsWith("session_")) {
      const parsed = parseInt(session.id.replace("session_", ""), 10);
      if (!isNaN(parsed) && parsed > 1000000000000) {
        initialStartTime = parsed;
      }
    }
    if (!initialStartTime) {
      initialStartTime = session.savedAt || session.updatedAt || session.updated_at || Date.now();
    }

    const safeQuestions = enrichQuestionsList(session.questions);

    dispatch({
      type: "resumeExam",
      payload: {
        questions: safeQuestions,
        index: session.index || 0,
        answer: session.answer || null,
        answers: session.answers || [],
        points: session.points || 0,
        secondsRemaining: session.secondsRemaining,
        examMode: session.examMode || "study",
        settings: session.settings || initialState.settings,
        selectedBankName: session.selectedBankName || session.bankName || "Resumed CCNA Exam",
        activeSessionId: session.id,
        revealedQuestions: session.revealedQuestions || [],
        startedAt: initialStartTime,
      },
    });
    handleNavigate("exam");
  };

  const handleDeleteSession = (sessionId) => {
    setSavedSessions((prev) => {
      const updated = prev.filter((s, idx) => s.id !== sessionId && idx !== sessionId);
      try {
        localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Delete error:", e);
      }
      return updated;
    });

    if (sessionId) {
      fetch(`${API_BASE_URL}/sessions/${sessionId}`, { method: "DELETE" }).catch(() => {});
    }
  };

  const handleClearHistory = () => {
    setPastExams([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    fetch(`${API_BASE_URL}/history`, { method: "DELETE" }).catch(() => {});
  };

  const handleDeleteHistoryRecord = (recordId) => {
    setPastExams((prev) => {
      const updated = prev.filter((r) => r.id !== recordId);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("History delete error:", e);
      }
      return updated;
    });

    if (recordId) {
      fetch(`${API_BASE_URL}/history/${recordId}`, { method: "DELETE" }).catch(() => {});
    }
  };

  const handleReviewCompletedExam = (examRecord) => {
    if (!requireAuth()) return;
    const rawList = examRecord?.questions?.length ? examRecord.questions : questions;
    const qList = enrichQuestionsList(rawList);
    const ansList = examRecord?.answers?.length ? examRecord.answers : answers;
    const flags = examRecord?.flaggedQuestions || flaggedQuestions;
    const allRevealed = qList.map((_, i) => i);
    const reviewId = examRecord?.id || examRecord?.sessionId || `review_${Date.now()}`;

    setFlaggedQuestions(flags || []);
    dispatch({
      type: "resumeExam",
      payload: {
        questions: qList,
        index: 0,
        answer: ansList[0] ?? null,
        answers: ansList,
        points: examRecord?.score ?? points,
        secondsRemaining: null,
        examMode: "study",
        settings: examRecord?.settings || settings,
        selectedBankName: `Review: ${examRecord?.bankName || selectedBankName}`,
        activeSessionId: reviewId,
        revealedQuestions: allRevealed,
        isReviewMode: true,
      },
    });
    handleNavigate("exam");
  };

  const handleRetakeAllQuestions = (examRecord) => {
    if (!requireAuth()) return;
    const rawList = examRecord?.questions?.length ? examRecord.questions : questions;
    let qList = enrichQuestionsList(rawList);
    const bank = examRecord?.bankName || selectedBankName;
    const mode = examRecord?.examMode || examMode;
    const stngs = examRecord?.settings || settings;

    if (stngs?.randomizeQuestions) {
      qList = aggressiveShuffle(qList);
    }
    if (stngs?.randomizeAnswers) {
      qList = qList.map(randomizeQuestionOptions);
    }

    setFlaggedQuestions([]);
    dispatch({
      type: "startExam",
      payload: {
        questions: qList,
        examMode: mode,
        settings: stngs,
        bankName: `${bank} (Retake)`,
      },
    });
    handleNavigate("exam");
  };

  const handleRetakeFlaggedOnly = (examRecord) => {
    if (!requireAuth()) return;
    const rawList = examRecord?.questions?.length ? examRecord.questions : questions;
    const baseList = enrichQuestionsList(rawList);
    const flags = examRecord?.flaggedQuestions || flaggedQuestions || [];
    let flaggedList = baseList.filter((_, idx) => flags.includes(idx));

    if (flaggedList.length === 0) {
      setAlertDialog({
        isOpen: true,
        title: "No Flagged Questions",
        message: "No questions were marked for review in this exam session.",
        confirmText: "OK",
        cancelText: null,
        type: "info",
      });
      return;
    }

    const bank = examRecord?.bankName || selectedBankName;
    const mode = examRecord?.examMode || examMode;
    const stngs = examRecord?.settings || settings;

    if (stngs?.randomizeQuestions) {
      flaggedList = aggressiveShuffle(flaggedList);
    }
    if (stngs?.randomizeAnswers) {
      flaggedList = flaggedList.map(randomizeQuestionOptions);
    }

    setFlaggedQuestions([]);
    dispatch({
      type: "startExam",
      payload: {
        questions: flaggedList,
        examMode: mode,
        settings: stngs,
        bankName: `${bank} (Flagged Only - ${flaggedList.length} Qs)`,
      },
    });
    handleNavigate("exam");
  };

  const handleRetakeIncorrectOnly = (examRecord) => {
    if (!requireAuth()) return;
    const rawList = examRecord?.questions?.length ? examRecord.questions : questions;
    const baseList = enrichQuestionsList(rawList);
    const ansList = examRecord?.answers?.length ? examRecord.answers : answers;
    const stats = getExamQuestionStats(baseList, ansList);
    let incorrectList = baseList.filter((_, idx) => stats.nonCorrectIndices.includes(idx));

    if (incorrectList.length === 0) {
      setAlertDialog({
        isOpen: true,
        title: "Perfect Score! 🌟",
        message: "Congratulations! All questions were answered correctly in this exam session. There are no incorrect questions to retake.",
        confirmText: "Awesome!",
        cancelText: null,
        type: "success",
      });
      return;
    }

    const bank = examRecord?.bankName || selectedBankName;
    const mode = examRecord?.examMode || examMode;
    const stngs = examRecord?.settings || settings;

    if (stngs?.randomizeQuestions) {
      incorrectList = aggressiveShuffle(incorrectList);
    }
    if (stngs?.randomizeAnswers) {
      incorrectList = incorrectList.map(randomizeQuestionOptions);
    }

    setFlaggedQuestions([]);
    const titleLabel = stats.unanswered > 0 ? "Incorrect & Missed" : "Incorrect Only";
    dispatch({
      type: "startExam",
      payload: {
        questions: incorrectList,
        examMode: mode,
        settings: stngs,
        bankName: `${bank} (${titleLabel} - ${incorrectList.length} Qs)`,
      },
    });
    handleNavigate("exam");
  };

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + (cur.points || 1),
    0
  );

  const isAdminUser = Boolean(
    currentUser &&
    (currentUser.role === "admin" || currentUser.email === "candidate@ccna.com")
  );

  // Full-width root-level render for Admin Portal (STRICT SECURITY CHECK)
  if (status === "ready" && currentView === "admin") {
    if (!currentUser) {
      return (
        <div className="admin-auth-guard-container">
          <div className="admin-auth-guard-card">
            <div className="guard-icon-lock">🔒</div>
            <div className="guard-pill-tag">Administrator Portal</div>
            <h2 className="guard-card-title">Authentication Required</h2>
            <p className="guard-card-desc">
              Access to the CCNA Simulator Administrator Portal requires verified administrator credentials. You are currently not signed in.
            </p>
            <div className="guard-card-actions">
              <button
                type="button"
                className="btn-guard-primary"
                onClick={() => handleNavigate("auth-login")}
              >
                Sign In as Admin ➜
              </button>
              <button
                type="button"
                className="btn-guard-secondary"
                onClick={() => handleNavigate("dashboard")}
              >
                Return to Candidate Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (!isAdminUser) {
      return (
        <div className="admin-auth-guard-container">
          <div className="admin-auth-guard-card denied-card">
            <div className="guard-icon-denied">⛔</div>
            <div className="guard-pill-tag denied-pill">Access Denied (403)</div>
            <h2 className="guard-card-title">Administrator Privileges Required</h2>
            <p className="guard-card-desc">
              Your account (<strong>{currentUser.email}</strong>) does not have administrator privileges. Only system administrators are authorized to access this portal.
            </p>
            <div className="guard-card-actions">
              <button
                type="button"
                className="btn-guard-primary"
                onClick={() => handleNavigate("dashboard")}
              >
                Return to Candidate Dashboard ➜
              </button>
              <button
                type="button"
                className="btn-guard-secondary"
                onClick={() => {
                  handleLogout();
                  handleNavigate("auth-login");
                }}
              >
                Sign In with Different Account
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <AdminLayout
        currentUser={currentUser}
        onExitAdmin={() => handleNavigate("dashboard")}
      />
    );
  }

  return (
    <div className="cisco-simulator-root">
      <div className="simulator-app-container">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}

        {/* ===== FULL-PAGE AUTH VIEWS (login / signup / verify / forgot / reset) ===== */}
        {status === "ready" && currentView.startsWith("auth-") && (
          <AuthView
            initialMode={currentView.replace("auth-", "")}
            onAuthSuccess={handleAuthSuccess}
            onClose={() => handleNavigate("dashboard")}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        )}

        {/* 1. DASHBOARD & NAVIGATION VIEWS (When not inside an active test) */}
        {status === "ready" && currentView === "dashboard" && (
          <ExamDashboard
            totalQuestionsCount={allQuestions.length}
            allQuestions={allQuestions}
            onStartExam={handleStartExam}
            candidateName={currentUser?.name || candidateName}
            setCandidateName={setCandidateName}
            savedSession={currentUser && savedSessions.length > 0 ? savedSessions[0] : null}
            savedSessions={currentUser ? savedSessions : []}
            onResumeExam={handleResumeSession}
            onDiscardSavedSession={() => handleDeleteSession(savedSessions[0]?.id)}
            onNavigate={handleNavigate}
            pastExams={currentUser ? pastExams : []}
            onReviewExam={handleReviewCompletedExam}
            onRetakeExam={handleRetakeAllQuestions}
            onRetakeAll={handleRetakeAllQuestions}
            onRetakeFlagged={handleRetakeFlaggedOnly}
            onRetakeIncorrect={handleRetakeIncorrectOnly}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
            onOpenUpgrade={handleOpenUpgrade}
          />
        )}

        {status === "ready" && currentView === "resume-exams" && (
          <ResumeExamsView
            savedSessions={currentUser ? savedSessions : []}
            onResumeSession={handleResumeSession}
            onDeleteSession={handleDeleteSession}
            onNavigate={handleNavigate}
            candidateName={currentUser?.name || candidateName}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
          />
        )}

        {status === "ready" && currentView === "history" && (
          <ExamHistoryView
            pastExams={currentUser ? pastExams : []}
            onNavigate={handleNavigate}
            candidateName={candidateName}
            onClearHistory={handleClearHistory}
            onReviewExam={handleReviewCompletedExam}
            onRetakeAll={handleRetakeAllQuestions}
            onRetakeFlagged={handleRetakeFlaggedOnly}
            onRetakeIncorrect={handleRetakeIncorrectOnly}
            onDeleteRecord={handleDeleteHistoryRecord}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
          />
        )}

        {/* 2. ACTIVE EXAM VIEW */}
        {status === "active" && questions[index] && (
          <QuestionView
            question={questions[index]}
            seqNumber={index + 1}
            numQuestions={numQuestions}
            answer={answer}
            answers={answers}
            questions={questions}
            dispatch={dispatch}
            examMode={examMode}
            settings={settings}
            flaggedQuestions={flaggedQuestions}
            revealedQuestions={revealedQuestions}
            isReviewMode={isReviewMode}
            isPaused={isPaused}
            onTogglePause={() => dispatch({ type: "togglePauseExam" })}
            onToggleFlag={handleToggleFlag}
            onGoToQuestion={(targetIdx) =>
              dispatch({ type: "goToQuestion", payload: targetIdx })
            }
            onFinishExam={() => dispatch({ type: "finish" })}
            onExitReview={() => dispatch({ type: "exitReview" })}
            onExitToDashboard={() => {
              try {
                localStorage.removeItem(ACTIVE_RUNNING_SESSION_ID_KEY);
                localStorage.removeItem(ACTIVE_RUNNING_SESSION_KEY);
              } catch (e) {}
              dispatch({ type: "restart" });
              handleNavigate("dashboard");
            }}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            candidateName={currentUser?.name || candidateName}
            currentUser={currentUser}
            secondsRemaining={secondsRemaining}
          />
        )}

        {/* 3. FINISH / SCORE REPORT */}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            candidateName={candidateName}
            dispatch={dispatch}
            numQuestions={numQuestions}
            answers={answers}
            questions={questions}
            flaggedQuestions={flaggedQuestions}
            examMode={examMode}
            selectedBankName={selectedBankName}
            onReviewExam={() => handleReviewCompletedExam(null)}
            onRetakeAll={() => handleRetakeAllQuestions(null)}
            onRetakeFlagged={() => handleRetakeFlaggedOnly(null)}
            onRetakeIncorrect={() => handleRetakeIncorrectOnly(null)}
          />
        )}

        {/* 4. AUTHENTICATION & EMAIL VERIFICATION MODAL */}
        <AuthModal
          isOpen={authModal.isOpen}
          initialMode={authModal.mode}
          onClose={() => setAuthModal({ isOpen: false, mode: "login" })}
          currentUser={currentUser}
          onAuthSuccess={handleAuthSuccess}
          onLogout={handleLogout}
        />

        {/* 4.5 UPGRADE PLAN / PASS SELECTION MODAL */}
        <UpgradePlanModal
          isOpen={upgradeModal.isOpen}
          onClose={handleCloseUpgrade}
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onPlanUpgraded={handlePlanUpgraded}
          lockContext={upgradeModal.lockContext}
        />

        {/* 4.6 CUSTOM ALERT / CONFIRMATION MODAL */}
        <CustomConfirmModal
          isOpen={alertDialog.isOpen}
          title={alertDialog.title}
          message={alertDialog.message}
          confirmText={alertDialog.confirmText || "OK"}
          cancelText={alertDialog.cancelText || null}
          type={alertDialog.type || "info"}
          onConfirm={() => {
            if (typeof alertDialog.onConfirm === "function") {
              alertDialog.onConfirm();
            }
            closeAlert();
          }}
          onCancel={closeAlert}
        />

        {/* 5. MOBILE NATIVE NAVIGATION BOTTOM BAR (Visible when not in active exam, auth, or admin) */}
        {status === "ready" && !currentView.startsWith("auth-") && currentView !== "admin" && (
          <MobileBottomBar
            currentView={currentView}
            onNavigate={handleNavigate}
            savedCount={currentUser ? savedSessions.length : 0}
            historyCount={currentUser ? pastExams.length : 0}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
          />
        )}
      </div>
    </div>
  );
}
