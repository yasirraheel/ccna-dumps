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
import { ccnaQuestions } from "../data/ccnaQuestions";

const API_BASE_URL = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:5000/api" : "/api");
const SESSIONS_STORAGE_KEY = "ccna_saved_sessions_list";
const HISTORY_STORAGE_KEY = "ccna_past_exams_list";

const initialState = {
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
  activeSessionId: null,
  revealedQuestions: [],
  isReviewMode: false,
};

function calculateTotalPoints(questions, answers) {
  if (!questions || !answers) return 0;
  let total = 0;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const ans = answers[i];
    if (ans === null || ans === undefined) continue;

    const pointValue = q.points || 10;
    const rawCorrect = q.correctOptions || q.correctOption;
    const correctArr = Array.isArray(rawCorrect) ? rawCorrect : [rawCorrect];

    if (q.type === "drag_drop" || q.dragDropData) {
      if (ans?.confirmed && ans?.isCorrect) {
        total += pointValue;
      }
    } else if (correctArr.length > 1) {
      const userSelections = Array.isArray(ans)
        ? ans
        : Array.isArray(ans?.selections)
        ? ans.selections
        : typeof ans === "number"
        ? [ans]
        : [];
      const isMatch =
        userSelections.length === correctArr.length &&
        userSelections.every((idx) => correctArr.includes(idx));
      if (isMatch) {
        total += pointValue;
      }
    } else {
      const chosenOpt =
        typeof ans === "number"
          ? ans
          : Array.isArray(ans)
          ? ans[0]
          : ans?.selections?.[0];
      if (chosenOpt !== undefined && correctArr.includes(chosenOpt)) {
        total += pointValue;
      }
    }
  }
  return total;
}

function getIncorrectQuestionIndices(questions, answers) {
  if (!questions) return [];
  const incorrectIndices = [];
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const ans = answers ? answers[i] : null;
    if (ans === null || ans === undefined) {
      incorrectIndices.push(i);
      continue;
    }
    const rawCorrect = q.correctOptions || q.correctOption;
    const correctArr = Array.isArray(rawCorrect) ? rawCorrect : [rawCorrect];
    if (q.type === "drag_drop" || q.dragDropData) {
      if (!ans?.confirmed || !ans?.isCorrect) {
        incorrectIndices.push(i);
      }
    } else if (correctArr.length > 1) {
      const userSelections = Array.isArray(ans)
        ? ans
        : Array.isArray(ans?.selections)
        ? ans.selections
        : typeof ans === "number"
        ? [ans]
        : [];
      const isMatch =
        userSelections.length === correctArr.length &&
        userSelections.every((idx) => correctArr.includes(idx));
      if (!isMatch) incorrectIndices.push(i);
    } else {
      const chosenOpt =
        typeof ans === "number"
          ? ans
          : Array.isArray(ans)
          ? ans[0]
          : ans?.selections?.[0];
      if (chosenOpt === undefined || !correctArr.includes(chosenOpt)) {
        incorrectIndices.push(i);
      }
    }
  }
  return incorrectIndices;
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        allQuestions: action.payload,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "startExam": {
      const { questions, examMode, settings, bankName } = action.payload;
      const initialAnswers = new Array(questions.length).fill(null);

      let timerSeconds = null;
      if (settings?.timerMode === "ccna_120") timerSeconds = 120 * 60;
      else if (settings?.timerMode === "90_mins") timerSeconds = 90 * 60;
      else if (settings?.timerMode === "60_mins") timerSeconds = 60 * 60;
      else if (settings?.timerMode === "30s_per_q")
        timerSeconds = questions.length * 30;
      else if (settings?.timerMode === "60s_per_q")
        timerSeconds = questions.length * 60;

      return {
        ...state,
        questions,
        status: "active",
        examMode,
        settings,
        selectedBankName: bankName,
        index: 0,
        answer: null,
        answers: initialAnswers,
        points: 0,
        secondsRemaining: timerSeconds,
        activeSessionId: `session_${Date.now()}`,
        revealedQuestions: [],
        isReviewMode: false,
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
      } = action.payload;
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
        activeSessionId: activeSessionId || `session_${Date.now()}`,
        revealedQuestions: revealedQuestions || [],
        isReviewMode: Boolean(isReviewMode),
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
      if (state.isReviewMode) return state;
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
      if (state.isReviewMode) return state;
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
      if (state.isReviewMode) return state;
      const updatedPoints = calculateTotalPoints(state.questions, state.answers);
      return {
        ...state,
        points: updatedPoints,
      };
    }

    case "dragDropAnswer": {
      if (state.isReviewMode) return state;
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
      if (state.isReviewMode) return state;
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
      };
    }

    case "finish": {
      const finalPoints = calculateTotalPoints(state.questions, state.answers);
      return {
        ...state,
        status: "finished",
        points: finalPoints,
        highscore:
          finalPoints > state.highscore ? finalPoints : state.highscore,
      };
    }

    case "restart":
      return {
        ...initialState,
        allQuestions: state.allQuestions,
        questions: state.allQuestions,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        highscore:
          state.secondsRemaining === 0
            ? state.points > state.highscore
              ? state.points
              : state.highscore
            : state.highscore,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

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
      activeSessionId,
      revealedQuestions,
      isReviewMode,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [currentView, setCurrentView] = useState("dashboard"); // 'dashboard', 'resume-exams', 'history', 'auth-login', 'auth-signup', 'auth-verify', 'auth-forgot', 'auth-reset'
  
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

  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [saveStatus, setSaveStatus] = useState("");
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
  }, []);

  const handleOpenAuth = (mode = "login") => {
    // Navigate to full-page auth view instead of modal
    setCurrentView(`auth-${mode}`);
  };

  const handleAuthSuccess = (user, token) => {
    setCurrentUser(user);
    if (user?.name) {
      setCandidateName(user.name);
      localStorage.setItem("ccna_candidate_name", user.name);
    }
    // After successful auth, return to dashboard
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("ccna_auth_token");
    localStorage.removeItem("ccna_auth_user");
    setCurrentUser(null);
  };

  // Multi-session state
  const [savedSessions, setSavedSessions] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Past completed exams history state
  const [pastExams, setPastExams] = useState(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
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
          setPastExams(data.history);
          try {
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(data.history));
          } catch {}
        }
      })
      .catch(() => {});

    // Fetch user specific active sessions
    fetch(`${API_BASE_URL}/sessions${userQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.sessions && Array.isArray(data.sessions)) {
          setSavedSessions(data.sessions);
          try {
            localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(data.sessions));
          } catch {}
        }
      })
      .catch(() => {});
  }, [currentUser]);

  // *** EXAM TIMER COUNTDOWN ***
  useEffect(() => {
    if (status !== "active" || secondsRemaining === null || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(interval);
  }, [status, secondsRemaining]);

  // 2. Keep active exam session saved in savedSessions list on every change (tied to user)
  useEffect(() => {
    if (
      status === "active" &&
      questions.length > 0 &&
      !isReviewMode &&
      !activeSessionId?.startsWith("review_")
    ) {
      const currentSessionObj = {
        id: activeSessionId || `session_${Date.now()}`,
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
        flaggedQuestions,
        candidateName: currentUser?.name || candidateName,
        revealedQuestions: revealedQuestions || [],
        startedAt: Date.now(),
        savedAt: Date.now(),
      };

      setSavedSessions((prev) => {
        const existingIdx = prev.findIndex((s) => s.id === currentSessionObj.id);
        let updated;
        if (existingIdx >= 0) {
          updated = [...prev];
          currentSessionObj.startedAt = prev[existingIdx].startedAt || currentSessionObj.startedAt;
          updated[existingIdx] = currentSessionObj;
        } else {
          updated = [currentSessionObj, ...prev];
        }
        try {
          localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn("Sessions save error:", e);
        }
        return updated;
      });

      // MySQL backend sync for active session tied to user
      fetch(`${API_BASE_URL}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSessionObj),
      }).catch(() => {});
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
    flaggedQuestions,
    candidateName,
    currentUser,
    activeSessionId,
    revealedQuestions,
    isReviewMode,
  ]);

  // 3. When exam finishes: record into pastExams history and remove from active savedSessions
  useEffect(() => {
    if (status === "active") {
      hasSavedRef.current = false;
      setSaveStatus("");
    }

    if (status === "finished" && !hasSavedRef.current) {
      hasSavedRef.current = true;

      // DO NOT save reviewing existing exam as a duplicate exam entry in history
      if (isReviewMode || activeSessionId?.startsWith("review_")) {
        setSaveStatus("Review completed");
        return;
      }

      setSaveStatus("Saving to History...");

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
        userId: currentUser?.id || null,
        userEmail: currentUser?.email || null,
        candidateName: currentUser?.name || candidateName || "Candidate",
        bankName: selectedBankName,
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
        revealedQuestions: [...revealedQuestions],
        settings: { ...settings },
        examMode,
      };

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
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSaveStatus("Saved to MySQL Database ✓");
          } else {
            setSaveStatus("Saved locally");
          }
        })
        .catch(() => {
          setSaveStatus("Saved locally");
        });

      // Also clean active session from MySQL if present
      if (activeSessionId) {
        fetch(`${API_BASE_URL}/sessions/${activeSessionId}`, {
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
    dispatch({ type: "startExam", payload: config });
  };

  const handleResumeSession = (session) => {
    if (!requireAuth()) return;
    setFlaggedQuestions(session.flaggedQuestions || []);
    dispatch({
      type: "resumeExam",
      payload: {
        questions: session.questions,
        index: session.index || 0,
        answer: session.answer || null,
        answers: session.answers || [],
        points: session.points || 0,
        secondsRemaining: session.secondsRemaining,
        examMode: session.examMode || "study",
        settings: session.settings || initialState.settings,
        selectedBankName: session.selectedBankName || "Resumed CCNA Exam",
        activeSessionId: session.id,
        revealedQuestions: session.revealedQuestions || [],
      },
    });
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
    const qList = examRecord?.questions?.length ? examRecord.questions : questions;
    const ansList = examRecord?.answers?.length ? examRecord.answers : answers;
    const flags = examRecord?.flaggedQuestions || flaggedQuestions;
    const allRevealed = qList.map((_, i) => i);

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
        activeSessionId: `review_${Date.now()}`,
        revealedQuestions: allRevealed,
        isReviewMode: true,
      },
    });
  };

  const handleRetakeAllQuestions = (examRecord) => {
    if (!requireAuth()) return;
    const qList = examRecord?.questions?.length ? examRecord.questions : questions;
    const bank = examRecord?.bankName || selectedBankName;
    const mode = examRecord?.examMode || examMode;
    const stngs = examRecord?.settings || settings;

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
  };

  const handleRetakeFlaggedOnly = (examRecord) => {
    if (!requireAuth()) return;
    const qList = examRecord?.questions?.length ? examRecord.questions : questions;
    const flags = examRecord?.flaggedQuestions || flaggedQuestions || [];
    const flaggedList = qList.filter((_, idx) => flags.includes(idx));

    if (flaggedList.length === 0) {
      alert("No questions were marked for review in this exam session.");
      return;
    }

    const bank = examRecord?.bankName || selectedBankName;
    const mode = examRecord?.examMode || examMode;
    const stngs = examRecord?.settings || settings;

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
  };

  const handleRetakeIncorrectOnly = (examRecord) => {
    if (!requireAuth()) return;
    const qList = examRecord?.questions?.length ? examRecord.questions : questions;
    const ansList = examRecord?.answers?.length ? examRecord.answers : answers;
    const incorrectIdxs = getIncorrectQuestionIndices(qList, ansList);
    const incorrectList = qList.filter((_, idx) => incorrectIdxs.includes(idx));

    if (incorrectList.length === 0) {
      alert("Congratulations! All questions were answered correctly in this exam.");
      return;
    }

    const bank = examRecord?.bankName || selectedBankName;
    const mode = examRecord?.examMode || examMode;
    const stngs = examRecord?.settings || settings;

    setFlaggedQuestions([]);
    dispatch({
      type: "startExam",
      payload: {
        questions: incorrectList,
        examMode: mode,
        settings: stngs,
        bankName: `${bank} (Incorrect Only - ${incorrectList.length} Qs)`,
      },
    });
  };

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + (cur.points || 1),
    0
  );

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
            onClose={() => setCurrentView("dashboard")}
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
            onNavigate={setCurrentView}
            pastExams={currentUser ? pastExams : []}
            onReviewExam={handleReviewCompletedExam}
            onRetakeExam={handleRetakeAllQuestions}
            onRetakeAll={handleRetakeAllQuestions}
            onRetakeFlagged={handleRetakeFlaggedOnly}
            onRetakeIncorrect={handleRetakeIncorrectOnly}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
          />
        )}

        {status === "ready" && currentView === "resume-exams" && (
          <ResumeExamsView
            savedSessions={currentUser ? savedSessions : []}
            onResumeSession={handleResumeSession}
            onDeleteSession={handleDeleteSession}
            onNavigate={setCurrentView}
            candidateName={currentUser?.name || candidateName}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
          />
        )}

        {status === "ready" && currentView === "history" && (
          <ExamHistoryView
            pastExams={currentUser ? pastExams : []}
            onNavigate={setCurrentView}
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
            onToggleFlag={handleToggleFlag}
            onGoToQuestion={(targetIdx) =>
              dispatch({ type: "goToQuestion", payload: targetIdx })
            }
            onFinishExam={() => dispatch({ type: "finish" })}
            onExitReview={() => dispatch({ type: "exitReview" })}
            onExitToDashboard={() => {
              dispatch({ type: "restart" });
              setCurrentView("dashboard");
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
            saveStatus={saveStatus}
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

        {/* 5. MOBILE NATIVE NAVIGATION BOTTOM BAR (Visible when not in active exam and not in full-page auth) */}
        {status === "ready" && !currentView.startsWith("auth-") && (
          <MobileBottomBar
            currentView={currentView}
            onNavigate={setCurrentView}
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
