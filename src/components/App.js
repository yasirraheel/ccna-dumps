import React, { useReducer, useEffect, useState, useRef, useCallback } from "react";
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
import { randomizeQuestionOptions, aggressiveShuffle } from "./randomizeOptions";
import { calculateTotalPoints, getIncorrectQuestionIndices, getExamQuestionStats } from "../utils/examScoring";
import { matchExamToBankKey } from "../utils/bankStrengthAlgorithm";
import { enrichQuestionsList } from "../utils/questionSourceHelper";
import { applyQuestionOverrides, getRealtimeChannel } from "../utils/questionSync";

const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

// In-memory set of finished session IDs - zero localStorage caching
const finishedSessionIdsSet = new Set();

export function markExamFinishedId(id) {
  if (id) finishedSessionIdsSet.add(String(id));
}

export function isExamFinishedId(targetId) {
  if (!targetId) return false;
  return finishedSessionIdsSet.has(String(targetId));
}

export async function syncActiveSessionToServer(sessionData) {
  if (!sessionData || !sessionData.id || sessionData.isReviewMode || isExamFinishedId(sessionData.id)) {
    return { success: true };
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${API_BASE_URL}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
      body: JSON.stringify(sessionData),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Server returned HTTP ${res.status}: ${errText || res.statusText}`);
    }

    const data = await res.json();
    if (data && typeof data.serverPoints === "number") {
      window.dispatchEvent(
        new CustomEvent("ccna_server_score_synced", {
          detail: { sessionId: sessionData.id, points: data.serverPoints },
        })
      );
    }
    if (window.__ccna_clear_connection_error) {
      window.__ccna_clear_connection_error();
    }
    return data;
  } catch (e) {
    clearTimeout(timeoutId);
    const msg = e.name === "AbortError"
      ? "Server connection timed out. Response could not be saved to server database."
      : `Server connection failed: ${e.message || "Network error"}`;
    if (window.__ccna_set_connection_error) {
      window.__ccna_set_connection_error(msg);
    }
    throw e;
  }
}

export const syncActiveSessionToLocalStorage = syncActiveSessionToServer;

function getInitialExamState() {
  return {
    allQuestions: [],
    questions: [],
    status: "loading",
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
    committedQuestions: [],
    isReviewMode: false,
    isPaused: false,
  };
}

const initialState = getInitialExamState();

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      const overriddenPayload = enrichQuestionsList(applyQuestionOverrides(action.payload));
      if (state.status === "active") {
        const isRandomized = Boolean(state.settings?.randomizeAnswers);
        const stripPrefix = (str) =>
          typeof str === "string"
            ? str.replace(/^[A-Z][.):-]\s*/i, "").trim()
            : String(str);

        const patchedRunning = (state.questions || []).map((q) => {
          const found = overriddenPayload.find(
            (item) =>
              (item.id !== undefined && (item.id === q.id || String(item.id) === String(q.id))) ||
              (item.questionNo && item.questionNo === q.questionNo)
          );
          if (!found) return q;

          if (isRandomized) {
            const foundTexts = (found.options || []).map(stripPrefix).sort();
            const qTexts = (q.options || []).map(stripPrefix).sort();
            const optionsChanged = JSON.stringify(foundTexts) !== JSON.stringify(qTexts);
            if (optionsChanged || !Array.isArray(q.options) || q.options.length === 0) {
              return randomizeQuestionOptions(found);
            }
            const masterCorr = Array.isArray(found.correctOption)
              ? found.correctOption
              : Array.isArray(found.correctOptions)
              ? found.correctOptions
              : typeof found.correctOption === "number"
              ? [found.correctOption]
              : [];
            const masterCorrectTexts = masterCorr
              .map((idx) => (found.options?.[idx] ? stripPrefix(found.options[idx]) : null))
              .filter(Boolean);

            const newCorrIndices = [];
            (q.options || []).forEach((opt, idx) => {
              if (masterCorrectTexts.includes(stripPrefix(opt))) {
                newCorrIndices.push(idx);
              }
            });

            return {
              ...q,
              question: found.question,
              correctOption: newCorrIndices.length === 1 ? newCorrIndices[0] : newCorrIndices,
              correctOptions: newCorrIndices,
              exhibitImage: found.exhibitImage || q.exhibitImage,
              originalSourceImage: found.originalSourceImage || q.originalSourceImage,
              cliSnippet: found.cliSnippet || q.cliSnippet,
              points: found.points || q.points || 10,
              dragDropData: found.dragDropData || q.dragDropData,
              explanation: found.explanation || q.explanation,
            };
          }

          // Standard mode: update running question directly with latest admin options and question prompt
          return {
            ...q,
            ...found,
            options: found.options,
            correctOption: found.correctOption,
            correctOptions: found.correctOptions,
            question: found.question,
            explanation: found.explanation || q.explanation,
          };
        });
        const updatedPoints = calculateTotalPoints(patchedRunning, state.answers);
        return {
          ...state,
          allQuestions: overriddenPayload,
          questions: patchedRunning,
          points: updatedPoints,
        };
      }

      if (state.status === "finished") {
        // Exam is finished and user is viewing the score report.
        // Never overwrite state.questions with allQuestions, preserving accurate score calculations!
        return {
          ...state,
          allQuestions: overriddenPayload,
        };
      }

      const isExamRoute =
        typeof window !== "undefined" &&
        (window.location.pathname.toLowerCase().includes("/exam") ||
          new URLSearchParams(window.location.search).get("view") === "exam");

      return {
        ...state,
        allQuestions: overriddenPayload,
        questions: overriddenPayload,
        status: isExamRoute && state.status === "loading" ? "loading" : (state.status === "loading" ? "ready" : state.status),
      };
    }

    case "syncServerScore": {
      if (typeof action.payload === "number" && action.payload >= 0) {
        return {
          ...state,
          points: action.payload,
        };
      }
      return state;
    }

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "startExam": {
      const { questions, examMode, settings, bankName, bankKey } = action.payload;
      const finalQuestions = applyQuestionOverrides(questions);
      const initialAnswers = new Array(finalQuestions.length).fill(null);

      let timerSeconds = null;
      if (settings?.timerMode === "ccna_120") timerSeconds = 120 * 60;
      else if (settings?.timerMode === "90_mins" || settings?.timerMode === "timed_90") timerSeconds = 90 * 60;
      else if (settings?.timerMode === "60_mins") timerSeconds = 60 * 60;
      else if (settings?.timerMode === "30s_per_q")
        timerSeconds = finalQuestions.length * 30;
      else if (settings?.timerMode === "60s_per_q")
        timerSeconds = finalQuestions.length * 60;

      const startTime = Date.now();
      const newSessionId = `session_${startTime}`;

      return {
        ...state,
        questions: finalQuestions,
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
        committedQuestions: [],
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
        committedQuestions,
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

      const finalQuestions = applyQuestionOverrides(questions);

      let resumedCommitted = [];
      if (Array.isArray(committedQuestions)) {
        resumedCommitted = committedQuestions;
      } else if (Array.isArray(answers)) {
        resumedCommitted = answers
          .map((a, i) => {
            const hasAns =
              a !== null &&
              a !== undefined &&
              (typeof a === "number" ||
                (Array.isArray(a) && a.length > 0) ||
                (Array.isArray(a?.selections) && a.selections.length > 0) ||
                (a?.matches && Object.keys(a.matches).length > 0));
            return hasAns ? i : null;
          })
          .filter((i) => i !== null);
      }

      return {
        ...state,
        questions: finalQuestions,
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
        committedQuestions: resumedCommitted,
        isReviewMode: Boolean(isReviewMode),
        isPaused: false,
      };
    }

    case "revealAnswer": {
      const qIdx = action.payload !== undefined ? action.payload : state.index;
      const newRevealed = state.revealedQuestions.includes(qIdx)
        ? state.revealedQuestions
        : [...state.revealedQuestions, qIdx];
      const newCommitted = !state.committedQuestions?.includes(qIdx)
        ? [...(state.committedQuestions || []), qIdx]
        : (state.committedQuestions || []);
      const updatedPoints = calculateTotalPoints(state.questions, state.answers);

      if (!state.isReviewMode && state.activeSessionId) {
        syncActiveSessionToLocalStorage({
          id: state.activeSessionId,
          questions: state.questions,
          index: state.index,
          answer: state.answer,
          answers: state.answers,
          points: updatedPoints,
          secondsRemaining: state.secondsRemaining,
          examMode: state.examMode,
          settings: state.settings,
          selectedBankName: state.selectedBankName,
          selectedBankKey: state.selectedBankKey,
          bankName: state.selectedBankName,
          flaggedQuestions: state.flaggedQuestions,
          revealedQuestions: newRevealed,
          committedQuestions: newCommitted,
          startedAt: state.startedAt,
          updatedAt: Date.now(),
          savedAt: Date.now(),
        });
      }

      return {
        ...state,
        revealedQuestions: newRevealed,
        committedQuestions: newCommitted,
        points: updatedPoints,
      };
    }

    case "revealAnswerWithServerData": {
      const qIdx = action.payload?.index !== undefined ? action.payload.index : state.index;
      const { correctOption, explanation } = action.payload || {};

      const newRevealed = state.revealedQuestions.includes(qIdx)
        ? state.revealedQuestions
        : [...state.revealedQuestions, qIdx];
      const newCommitted = !state.committedQuestions?.includes(qIdx)
        ? [...(state.committedQuestions || []), qIdx]
        : (state.committedQuestions || []);

      const updatedQuestions = [...state.questions];
      if (updatedQuestions[qIdx]) {
        const curQ = updatedQuestions[qIdx];
        // DO NOT overwrite existing correctOption if the running question already has a valid correctOption
        // (which is properly mapped to curQ.options when randomized)!
        const hasExistingCorrect =
          curQ.correctOption !== undefined &&
          curQ.correctOption !== null &&
          !(Array.isArray(curQ.correctOption) && curQ.correctOption.length === 0);

        updatedQuestions[qIdx] = {
          ...curQ,
          ...(!hasExistingCorrect && correctOption !== undefined ? { correctOption, correctOptions: correctOption } : {}),
          ...(explanation ? { explanation } : {}),
        };
      }

      const updatedPoints = calculateTotalPoints(updatedQuestions, state.answers);

      if (!state.isReviewMode && state.activeSessionId) {
        syncActiveSessionToLocalStorage({
          id: state.activeSessionId,
          questions: updatedQuestions,
          index: state.index,
          answer: state.answer,
          answers: state.answers,
          points: updatedPoints,
          secondsRemaining: state.secondsRemaining,
          examMode: state.examMode,
          settings: state.settings,
          selectedBankName: state.selectedBankName,
          selectedBankKey: state.selectedBankKey,
          bankName: state.selectedBankName,
          flaggedQuestions: state.flaggedQuestions,
          revealedQuestions: newRevealed,
          committedQuestions: newCommitted,
          startedAt: state.startedAt,
          updatedAt: Date.now(),
          savedAt: Date.now(),
        });
      }

      return {
        ...state,
        questions: updatedQuestions,
        revealedQuestions: newRevealed,
        committedQuestions: newCommitted,
        points: updatedPoints,
      };
    }

    case "newAnswer": {
      if (state.isReviewMode || state.isPaused) return state;
      if (state.secondsRemaining !== null && state.secondsRemaining <= 0) return state;
      if (state.committedQuestions?.includes(state.index)) return state;
      const optIdx =
        typeof action.payload === "number"
          ? action.payload
          : action.payload?.optionIndex;

      const newAnswersList = [...state.answers];
      newAnswersList[state.index] = optIdx;

      // Do NOT update points on mere selection to prevent leaking whether answer is correct.
      // Score updates strictly when "Show Answer" is clicked or when moving to "Next" question.
      if (!state.isReviewMode && state.activeSessionId) {
        syncActiveSessionToLocalStorage({
          id: state.activeSessionId,
          questions: state.questions,
          index: state.index,
          answer: optIdx,
          answers: newAnswersList,
          points: state.points,
          secondsRemaining: state.secondsRemaining,
          examMode: state.examMode,
          settings: state.settings,
          selectedBankName: state.selectedBankName,
          selectedBankKey: state.selectedBankKey,
          bankName: state.selectedBankName,
          flaggedQuestions: state.flaggedQuestions,
          revealedQuestions: state.revealedQuestions || [],
          committedQuestions: state.committedQuestions || [],
          startedAt: state.startedAt,
          updatedAt: Date.now(),
          savedAt: Date.now(),
        });
      }

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
      if (state.committedQuestions?.includes(state.index)) return state;
      const selections = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.selections || [];

      const newAnswersList = [...state.answers];
      newAnswersList[state.index] = { selections, confirmed: false };

      if (!state.isReviewMode && state.activeSessionId) {
        syncActiveSessionToLocalStorage({
          id: state.activeSessionId,
          questions: state.questions,
          index: state.index,
          answer: { selections, confirmed: false },
          answers: newAnswersList,
          points: state.points,
          secondsRemaining: state.secondsRemaining,
          examMode: state.examMode,
          settings: state.settings,
          selectedBankName: state.selectedBankName,
          selectedBankKey: state.selectedBankKey,
          bankName: state.selectedBankName,
          flaggedQuestions: state.flaggedQuestions,
          revealedQuestions: state.revealedQuestions || [],
          committedQuestions: state.committedQuestions || [],
          startedAt: state.startedAt,
          updatedAt: Date.now(),
          savedAt: Date.now(),
        });
      }

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
      if (state.committedQuestions?.includes(state.index)) return state;
      const { matches } = action.payload;
      const newAnswersList = [...state.answers];
      newAnswersList[state.index] = { matches, confirmed: false };

      if (!state.isReviewMode && state.activeSessionId) {
        syncActiveSessionToLocalStorage({
          id: state.activeSessionId,
          questions: state.questions,
          index: state.index,
          answer: { matches, confirmed: false },
          answers: newAnswersList,
          points: state.points,
          secondsRemaining: state.secondsRemaining,
          examMode: state.examMode,
          settings: state.settings,
          selectedBankName: state.selectedBankName,
          selectedBankKey: state.selectedBankKey,
          bankName: state.selectedBankName,
          flaggedQuestions: state.flaggedQuestions,
          revealedQuestions: state.revealedQuestions || [],
          committedQuestions: state.committedQuestions || [],
          startedAt: state.startedAt,
          updatedAt: Date.now(),
          savedAt: Date.now(),
        });
      }

      return {
        ...state,
        answer: { matches, confirmed: false },
        answers: newAnswersList,
        points: state.points,
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
      const updatedPoints = calculateTotalPoints(state.questions, newAnswersList);
      const newCommitted = !state.committedQuestions?.includes(state.index)
        ? [...(state.committedQuestions || []), state.index]
        : (state.committedQuestions || []);

      if (!state.isReviewMode && state.activeSessionId) {
        syncActiveSessionToLocalStorage({
          id: state.activeSessionId,
          questions: state.questions,
          index: state.index,
          answer: {
            matches: userMatches,
            confirmed: true,
            isCorrect: allCorrect,
          },
          answers: newAnswersList,
          points: updatedPoints,
          secondsRemaining: state.secondsRemaining,
          examMode: state.examMode,
          settings: state.settings,
          selectedBankName: state.selectedBankName,
          selectedBankKey: state.selectedBankKey,
          bankName: state.selectedBankName,
          flaggedQuestions: state.flaggedQuestions,
          revealedQuestions: state.revealedQuestions || [],
          committedQuestions: newCommitted,
          startedAt: state.startedAt,
          updatedAt: Date.now(),
          savedAt: Date.now(),
        });
      }

      return {
        ...state,
        answer: {
          matches: userMatches,
          confirmed: true,
          isCorrect: allCorrect,
        },
        answers: newAnswersList,
        points: updatedPoints,
        committedQuestions: newCommitted,
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

      const curAns = state.answers[state.index];
      const hasCurrentAnswer =
        curAns !== null &&
        curAns !== undefined &&
        (typeof curAns === "number" ||
          (Array.isArray(curAns) && curAns.length > 0) ||
          (Array.isArray(curAns?.selections) && curAns.selections.length > 0) ||
          (curAns?.matches && Object.keys(curAns.matches).length > 0));

      const newCommitted =
        hasCurrentAnswer && !state.committedQuestions?.includes(state.index)
          ? [...(state.committedQuestions || []), state.index]
          : (state.committedQuestions || []);

      const updatedPoints = calculateTotalPoints(state.questions, state.answers);

      if (!state.isReviewMode && state.activeSessionId) {
        syncActiveSessionToLocalStorage({
          id: state.activeSessionId,
          questions: state.questions,
          index: nextIdx,
          answer: state.answers[nextIdx] ?? null,
          answers: state.answers,
          points: updatedPoints,
          secondsRemaining: state.secondsRemaining,
          examMode: state.examMode,
          settings: state.settings,
          selectedBankName: state.selectedBankName,
          selectedBankKey: state.selectedBankKey,
          bankName: state.selectedBankName,
          flaggedQuestions: state.flaggedQuestions,
          revealedQuestions: state.revealedQuestions || [],
          committedQuestions: newCommitted,
          startedAt: state.startedAt,
          updatedAt: Date.now(),
          savedAt: Date.now(),
        });
      }

      return {
        ...state,
        status: "active",
        index: nextIdx,
        answer: state.answers[nextIdx] ?? null,
        points: updatedPoints,
        committedQuestions: newCommitted,
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

    case "updateQuestion": {
      const updatedQ = action.payload?.question || action.payload;
      if (!updatedQ) return state;
      const isMatch = (q) =>
        Boolean(
          q &&
          ((updatedQ.id !== undefined && (q.id === updatedQ.id || String(q.id) === String(updatedQ.id))) ||
           (updatedQ.questionNo && q.questionNo === updatedQ.questionNo))
        );
      const isRandomized = Boolean(state.settings?.randomizeAnswers);
      const updatedAll = (state.allQuestions || []).map((q) =>
        isMatch(q) ? { ...q, ...updatedQ } : q
      );
      const updatedCur = (state.questions || []).map((q) => {
        if (!isMatch(q)) return q;
        if (isRandomized) {
          return randomizeQuestionOptions(updatedQ);
        }
        return { ...q, ...updatedQ };
      });
      const updatedPoints = calculateTotalPoints(updatedCur, state.answers);

      if (!state.isReviewMode && state.activeSessionId) {
        syncActiveSessionToLocalStorage({
          id: state.activeSessionId,
          questions: updatedCur,
          index: state.index,
          answer: state.answer,
          answers: state.answers,
          points: updatedPoints,
          secondsRemaining: state.secondsRemaining,
          examMode: state.examMode,
          settings: state.settings,
          selectedBankName: state.selectedBankName,
          selectedBankKey: state.selectedBankKey,
          bankName: state.selectedBankName,
          flaggedQuestions: state.flaggedQuestions,
          revealedQuestions: state.revealedQuestions || [],
          committedQuestions: state.committedQuestions || [],
          startedAt: state.startedAt,
          updatedAt: Date.now(),
          savedAt: Date.now(),
        });
      }

      return {
        ...state,
        allQuestions: updatedAll,
        questions: updatedCur,
        points: updatedPoints,
      };
    }

    case "suspendToDashboard": {
      return {
        ...initialState,
        allQuestions: state.allQuestions,
        questions: state.allQuestions,
        status: "ready",
        isPaused: false,
      };
    }

    case "restart": {
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
      committedQuestions = [],
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

    // When navigating to homepage (dashboard), perform a genuine fresh reload as requested
    if (view === "dashboard") {
      if (status === "active" && !isReviewMode) {
        const now = Date.now();
        const sessionSnapshot = {
          id: activeSessionId || `session_${startedAt || now}`,
          userId: currentUser?.id || null,
          userEmail: currentUser?.email || null,
          candidateName: candidateNameVal,
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
          flaggedQuestions,
          revealedQuestions: revealedQuestions || [],
          committedQuestions: committedQuestions || [],
          startedAt: startedAt || now,
          savedAt: now,
          updatedAt: now,
          isPaused: false,
        };
        syncActiveSessionToLocalStorage(sessionSnapshot);
        try {
          fetch(`${API_BASE_URL}/sessions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sessionSnapshot),
            keepalive: true,
          }).catch(() => {});
        } catch (e) {}
      }

      const currentPath = window.location.pathname.toLowerCase().replace(/\/+$/, "");
      if (currentPath === "" || currentPath === "/") {
        window.location.reload();
      } else {
        window.location.href = "/";
      }
      return;
    }

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

  // Clear any stale local storage session/override cache to guarantee 100% server authority
  useEffect(() => {
    try {
      localStorage.removeItem("ccna_active_running_session");
      localStorage.removeItem("ccna_active_running_session_id");
      localStorage.removeItem("ccna_question_overrides");
      localStorage.removeItem("ccna_saved_sessions_list");
    } catch {}
  }, []);

  // Fetch questions from MySQL database so admin edits reflect on every page load and exam
  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.questions || [];
        if (list.length > 0) {
          dispatch({ type: "dataReceived", payload: list });
        }
      })
      .catch((err) => {
        console.warn("Could not load /api/questions, fallback to static bundle:", err);
      });
  }, []);

  // Listen to live question update events across the application and cross-tab storage
  useEffect(() => {
    const handleQuestionUpdated = (e) => {
      const updatedQ = e.detail;
      if (updatedQ) {
        dispatch({ type: "updateQuestion", payload: updatedQ });
      }
    };
    const handleStorageUpdate = (e) => {
      if (e.key === "ccna_question_updated_event" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed?.question) {
            dispatch({ type: "updateQuestion", payload: parsed.question });
          }
        } catch {}
      }
    };
    window.addEventListener("ccna_question_updated", handleQuestionUpdated);
    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      window.removeEventListener("ccna_question_updated", handleQuestionUpdated);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  // Listen to live server validated score updates
  useEffect(() => {
    const handleServerScore = (e) => {
      if (e.detail && typeof e.detail.points === "number") {
        dispatch({ type: "syncServerScore", payload: e.detail.points });
      }
    };
    window.addEventListener("ccna_server_score_synced", handleServerScore);
    return () => {
      window.removeEventListener("ccna_server_score_synced", handleServerScore);
    };
  }, []);

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

  // Real-time server connection & offline detection state
  const [serverConnectionError, setServerConnectionError] = useState(null);
  const [isRetryingConnection, setIsRetryingConnection] = useState(false);
  const [isNavTransitioning, setIsNavTransitioning] = useState(false);

  useEffect(() => {
    window.__ccna_set_connection_error = (msg) => setServerConnectionError(msg);
    window.__ccna_clear_connection_error = () => setServerConnectionError(null);
    return () => {
      delete window.__ccna_set_connection_error;
      delete window.__ccna_clear_connection_error;
    };
  }, []);

  const handleRetryConnection = useCallback(async () => {
    setIsRetryingConnection(true);
    try {
      const res = await fetch(`${API_BASE_URL}/health?_t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        setServerConnectionError(null);
        // If in active exam, re-sync the active session immediately!
        if (status === "active" && activeSessionId) {
          const snapshot = {
            id: activeSessionId,
            userId: currentUser?.id || null,
            userEmail: currentUser?.email || null,
            candidateName: currentUser?.name || candidateName,
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
            flaggedQuestions,
            revealedQuestions,
            committedQuestions,
            startedAt,
            savedAt: Date.now(),
            updatedAt: Date.now(),
            isPaused: false,
          };
          await syncActiveSessionToServer(snapshot);
        }
      } else {
        setServerConnectionError("Server is still unreachable. Please verify your connection.");
      }
    } catch (e) {
      setServerConnectionError("Server is still unreachable. Please verify your internet connection.");
    } finally {
      setIsRetryingConnection(false);
    }
  }, [status, activeSessionId, currentUser, candidateName, questions, index, answer, answers, points, secondsRemaining, examMode, settings, selectedBankName, selectedBankKey, flaggedQuestions, revealedQuestions, committedQuestions, startedAt]);

  useEffect(() => {
    const handleOnline = () => handleRetryConnection();
    const handleOffline = () => setServerConnectionError("Network disconnected: You are currently offline. Server synchronization is paused.");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleRetryConnection]);

  // Periodic heartbeat every 20 seconds during active exam
  useEffect(() => {
    if (status !== "active") return;
    const interval = setInterval(() => {
      fetch(`${API_BASE_URL}/health?_t=${Date.now()}`, { cache: "no-store" })
        .then((r) => {
          if (!r.ok) setServerConnectionError("Server health check failed. Reconnection required.");
          else if (serverConnectionError && serverConnectionError.includes("health")) setServerConnectionError(null);
        })
        .catch(() => {
          setServerConnectionError("Server connection lost. Actions and progression are locked until connection is restored.");
        });
    }, 20000);
    return () => clearInterval(interval);
  }, [status, serverConnectionError]);

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

  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const hasSavedRef = useRef(false);
  const lastFinishedRecordRef = useRef(null);
  const candidateNameVal = currentUser?.name || candidateName;

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
        const now = Date.now();
        const sessionSnapshot = {
          id: activeSessionId || `session_${startedAt || now}`,
          userId: currentUser?.id || null,
          userEmail: currentUser?.email || null,
          candidateName: candidateNameVal,
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
          flaggedQuestions,
          revealedQuestions: revealedQuestions || [],
          committedQuestions: committedQuestions || [],
          startedAt: startedAt || now,
          savedAt: now,
          updatedAt: now,
          isPaused: false,
        };
        syncActiveSessionToLocalStorage(sessionSnapshot);
        try {
          fetch(`${API_BASE_URL}/sessions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sessionSnapshot),
            keepalive: true,
          }).catch(() => {});
        } catch (e) {}
        dispatch({ type: "suspendToDashboard" });
      }
      setCurrentView(nextView);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [
    status,
    isReviewMode,
    activeSessionId,
    startedAt,
    currentUser,
    candidateNameVal,
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
    revealedQuestions,
    committedQuestions,
  ]);

  // Validate session on launch
  useEffect(() => {
    const token = localStorage.getItem("ccna_auth_token");
    const storedUser = (() => {
      try { return JSON.parse(localStorage.getItem("ccna_auth_user") || "{}"); } catch { return {}; }
    })();
    const userQuery = storedUser.id
      ? `?userId=${encodeURIComponent(storedUser.id)}&userEmail=${encodeURIComponent(storedUser.email || "")}&_t=${Date.now()}`
      : storedUser.email
      ? `?userEmail=${encodeURIComponent(storedUser.email)}&_t=${Date.now()}`
      : `?_t=${Date.now()}`;

    const headers = {
      "Accept": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    if (token || storedUser.email || storedUser.id) {
      fetch(`${API_BASE_URL}/auth/me${userQuery}`, { headers })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setCurrentUser(data.user);
            setCandidateName(data.user.name);
            try {
              localStorage.setItem("ccna_auth_user", JSON.stringify(data.user));
            } catch {}
          }
        })
        .catch(() => {});
    }

    fetch(`${API_BASE_URL}/plans`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    }).catch(() => {});
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

  // Multi-session state - pure server authority, zero localStorage caching
  const [savedSessions, setSavedSessions] = useState([]);

  // Past completed exams history state - pure in-memory, populated directly from MySQL
  const [pastExams, setPastExams] = useState([]);

  // 1. Fresh Dashboard Data Loader (always bypasses cache with timestamp)
  const [isDashboardLoading, setIsDashboardLoading] = useState(() => {
    const p = typeof window !== "undefined" ? window.location.pathname.toLowerCase().replace(/\/+$/, "") : "";
    return p === "" || p === "/" || p === "/index.html";
  });

  const loadFreshDashboardData = useCallback(() => {
    const cacheBuster = `_t=${Date.now()}`;
    const token = localStorage.getItem("ccna_auth_token");
    const headers = {
      "Accept": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const storedUser = (() => {
      try { return JSON.parse(localStorage.getItem("ccna_auth_user") || "{}"); } catch { return {}; }
    })();
    const targetUserId = currentUser?.id || storedUser.id || "";
    const targetUserEmail = currentUser?.email || storedUser.email || "";

    const userQuery = targetUserId && targetUserEmail
      ? `?userId=${encodeURIComponent(targetUserId)}&userEmail=${encodeURIComponent(targetUserEmail)}&${cacheBuster}`
      : targetUserId
      ? `?userId=${encodeURIComponent(targetUserId)}&${cacheBuster}`
      : targetUserEmail
      ? `?userEmail=${encodeURIComponent(targetUserEmail)}&${cacheBuster}`
      : `?${cacheBuster}`;

    setIsDashboardLoading(true);

    // 1.1 Fresh Questions from MySQL
    const pQuestions = fetch(`${API_BASE_URL}/questions?${cacheBuster}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        const qList = Array.isArray(data) ? data : data?.questions || [];
        if (qList.length > 0) {
          dispatch({ type: "dataReceived", payload: qList });
        }
      })
      .catch(() => {});

    // 1.2 Fresh History for logged-in user
    const pHistory = fetch(`${API_BASE_URL}/history${userQuery}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.history && Array.isArray(data.history)) {
          const enrichedHistory = data.history.map((item) => {
            if (item.id) markExamFinishedId(item.id);
            if (item.sessionId) markExamFinishedId(item.sessionId);
            if (item.activeSessionId) markExamFinishedId(item.activeSessionId);
            return {
              ...item,
              questions: enrichQuestionsList(item.questions),
            };
          });
          setPastExams(enrichedHistory);
        }
      })
      .catch(() => {});

    // 1.3 Fresh Sessions
    const pSessions = fetch(`${API_BASE_URL}/sessions${userQuery}`, { headers })
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
        }
      })
      .catch(() => {});

    // 1.4 Fresh Plans
    const pPlans = fetch(`${API_BASE_URL}/plans?${cacheBuster}`, { headers })
      .then((res) => res.json())
      .catch(() => {});

    // 1.5 Fresh user profile if token or user exists
    let pUser = Promise.resolve();
    if (token || currentUser?.email || currentUser?.id) {
      pUser = fetch(`${API_BASE_URL}/auth/me${userQuery}`, { headers })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setCurrentUser(data.user);
            setCandidateName(data.user.name);
            try {
              localStorage.setItem("ccna_auth_user", JSON.stringify(data.user));
            } catch {}
          }
        })
        .catch(() => {});
    }

    Promise.allSettled([pQuestions, pHistory, pSessions, pPlans, pUser]).finally(() => {
      setTimeout(() => {
        setIsDashboardLoading(false);
      }, 300);
    });
  }, [currentUser?.id, currentUser?.email]);

  // 1.1 Initial question load from server
  useEffect(() => {
    fetch(`${API_BASE_URL}/questions?_t=${Date.now()}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const qList = Array.isArray(data) ? data : data?.questions || [];
        if (qList.length > 0) {
          dispatch({ type: "dataReceived", payload: qList });
        }
      })
      .catch(() => {});
  }, []);

  // 1.15 Real-time updates: Listen to SSE, BroadcastChannel, and custom DOM events
  useEffect(() => {
    const handleLiveQuestionUpdate = (e) => {
      if (e?.detail) {
        dispatch({ type: "updateQuestion", payload: e.detail });
      }
    };
    window.addEventListener("ccna_question_updated", handleLiveQuestionUpdate);

    let evtSource = null;
    try {
      evtSource = new EventSource(`${API_BASE_URL}/events`);
      evtSource.addEventListener("question_updated", (e) => {
        try {
          const q = JSON.parse(e.data);
          if (q) {
            dispatch({ type: "updateQuestion", payload: q });
          }
        } catch (err) {}
      });
      evtSource.addEventListener("plan_updated", () => {
        loadFreshDashboardData();
      });
    } catch (e) {}

    const ch = getRealtimeChannel();
    const handleBroadcast = (e) => {
      if (e?.data?.type === "question_updated" && e.data.question) {
        dispatch({ type: "updateQuestion", payload: e.data.question });
      }
    };
    if (ch) ch.addEventListener("message", handleBroadcast);

    return () => {
      window.removeEventListener("ccna_question_updated", handleLiveQuestionUpdate);
      if (evtSource) evtSource.close();
      if (ch) ch.removeEventListener("message", handleBroadcast);
    };
  }, [loadFreshDashboardData]);

  // Question navigation ("Next", "Previous", question palette) verifies/fetches questions live from the server
  useEffect(() => {
    if (status !== "active") return;
    const currentQ = questions[index];
    if (!currentQ) return;
    const qId = currentQ.id || currentQ.questionNo;
    if (!qId) return;

    fetch(`${API_BASE_URL}/questions/${encodeURIComponent(qId)}?_t=${Date.now()}`, {
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate", Pragma: "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        const qObj = data?.question || data;
        if (qObj && (qObj.id || qObj.questionNo)) {
          dispatch({ type: "updateQuestion", payload: qObj });
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, index]);

  // 1.2 Trigger fresh dashboard load on mount and whenever viewing dashboard / history / resume-exams
  useEffect(() => {
    if (currentView === "dashboard" || currentView === "history" || currentView === "resume-exams") {
      loadFreshDashboardData();
    }
  }, [currentView, loadFreshDashboardData]);

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
        (prev, cur) => prev + (cur.points || 10),
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

      lastFinishedRecordRef.current = completedRecord;

      // Record this session ID as permanently finished
      if (activeSessionId) {
        markExamFinishedId(activeSessionId);
      }
      if (completedRecord.id) {
        markExamFinishedId(completedRecord.id);
      }

      setPastExams((prev) => [completedRecord, ...prev]);

      // Remove completed session from active sessions
      if (activeSessionId) {
        setSavedSessions((prev) => prev.filter((s) => s.id !== activeSessionId));
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
    const token = localStorage.getItem("ccna_auth_token");
    const storedUser = (() => {
      try { return JSON.parse(localStorage.getItem("ccna_auth_user") || "{}"); } catch { return {}; }
    })();
    const user = currentUser || (storedUser?.id ? storedUser : null);
    const isVerified = Boolean(
      user &&
      (user.isVerified === true ||
       user.isVerified === 1 ||
       user.is_verified === 1 ||
       user.is_verified === true ||
       user.is_verified === "1" ||
       user.role === "admin" ||
       token)
    );
    if (!user || !isVerified) {
      setCurrentView(user ? "auth-verify" : "auth-login");
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

    const baseList = enrichQuestionsList(session.questions);
    const isRandomized = Boolean(session.settings?.randomizeAnswers);
    const stripPrefix = (str) =>
      typeof str === "string" ? str.replace(/^[A-Z][.):-]\s*/i, "").trim() : String(str);

    const safeQuestions = applyQuestionOverrides(baseList).map((q) => {
      const found = (allQuestions || []).find(
        (item) =>
          (item.id !== undefined && (item.id === q.id || String(item.id) === String(q.id))) ||
          (item.questionNo && item.questionNo === q.questionNo)
      );
      if (!found) return q;
      if (isRandomized) {
        const foundTexts = (found.options || []).map(stripPrefix).sort();
        const qTexts = (q.options || []).map(stripPrefix).sort();
        const optionsChanged = JSON.stringify(foundTexts) !== JSON.stringify(qTexts);
        if (optionsChanged || !Array.isArray(q.options) || q.options.length === 0) {
          return randomizeQuestionOptions(found);
        }
        const masterCorr = Array.isArray(found.correctOption)
          ? found.correctOption
          : Array.isArray(found.correctOptions)
          ? found.correctOptions
          : typeof found.correctOption === "number"
          ? [found.correctOption]
          : [];
        const masterCorrectTexts = masterCorr
          .map((idx) => (found.options?.[idx] ? stripPrefix(found.options[idx]) : null))
          .filter(Boolean);

        const newCorrIndices = [];
        (q.options || []).forEach((opt, idx) => {
          if (masterCorrectTexts.includes(stripPrefix(opt))) {
            newCorrIndices.push(idx);
          }
        });

        return {
          ...q,
          question: found.question,
          correctOption: newCorrIndices.length === 1 ? newCorrIndices[0] : newCorrIndices,
          correctOptions: newCorrIndices,
          exhibitImage: found.exhibitImage || q.exhibitImage,
          originalSourceImage: found.originalSourceImage || q.originalSourceImage,
          cliSnippet: found.cliSnippet || q.cliSnippet,
          points: found.points || q.points || 10,
          dragDropData: found.dragDropData || q.dragDropData,
        };
      }
      return {
        ...q,
        ...found,
        options: found.options,
        correctOption: found.correctOption,
        correctOptions: found.correctOptions,
        question: found.question,
      };
    });

    const recalculatedPoints = calculateTotalPoints(safeQuestions, session.answers || []);

    const activeIdx = typeof session.index === "number" ? session.index : 0;
    const activeAnswer =
      session.answer !== undefined && session.answer !== null
        ? session.answer
        : (session.answers && session.answers[activeIdx] !== undefined
            ? session.answers[activeIdx]
            : null);

    dispatch({
      type: "resumeExam",
      payload: {
        questions: safeQuestions,
        index: activeIdx,
        answer: activeAnswer,
        answers: session.answers || [],
        points: typeof recalculatedPoints === "number" ? recalculatedPoints : (session.points || 0),
        secondsRemaining: session.secondsRemaining,
        examMode: session.examMode || "study",
        settings: session.settings || initialState.settings,
        selectedBankName: session.selectedBankName || session.bankName || "Resumed CCNA Exam",
        activeSessionId: session.id,
        revealedQuestions: session.revealedQuestions || [],
        startedAt: initialStartTime,
      },
    });
    setCurrentView("exam");
  };

  // STRICT REAL-TIME SERVER NAVIGATION & REVEAL HANDLERS
  const handleGoToQuestion = async (targetIdx) => {
    if (isPaused) return;
    if (serverConnectionError) {
      setAlertDialog({
        isOpen: true,
        title: "⚠️ Server Connection Failed",
        message: "You are currently disconnected from the server. Your exam progress and answers cannot be saved offline. Please check your internet connection and click Retry to continue.",
        confirmText: "Retry Connection Now",
        cancelText: "Dismiss",
        type: "danger",
        onConfirm: () => handleRetryConnection(),
      });
      return;
    }

    const curAns = answers[index];
    const hasCurrentAnswer =
      curAns !== null &&
      curAns !== undefined &&
      (typeof curAns === "number" ||
        (Array.isArray(curAns) && curAns.length > 0) ||
        (Array.isArray(curAns?.selections) && curAns.selections.length > 0) ||
        (curAns?.matches && Object.keys(curAns.matches).length > 0));

    const newCommitted =
      hasCurrentAnswer && !committedQuestions?.includes(index)
        ? [...(committedQuestions || []), index]
        : (committedQuestions || []);

    const updatedPoints = calculateTotalPoints(questions, answers);
    const now = Date.now();
    const sessionSnapshot = {
      id: activeSessionId || `session_${startedAt || now}`,
      userId: currentUser?.id || null,
      userEmail: currentUser?.email || null,
      candidateName: currentUser?.name || candidateName,
      status: "active",
      questions,
      index: targetIdx,
      answer: answers[targetIdx] ?? null,
      answers,
      points: updatedPoints,
      secondsRemaining,
      examMode,
      settings,
      selectedBankName,
      selectedBankKey: selectedBankKey || matchExamToBankKey({ bankName: selectedBankName }),
      bankName: selectedBankName,
      flaggedQuestions,
      revealedQuestions: revealedQuestions || [],
      committedQuestions: newCommitted,
      startedAt: startedAt || now,
      savedAt: now,
      updatedAt: now,
      isPaused: false,
    };

    try {
      setIsNavTransitioning(true);
      // STRICT REQUIREMENT: MUST AWAIT AND PERSIST TO SERVER DATABASE FIRST
      await syncActiveSessionToServer(sessionSnapshot);

      // ADVANCE TO NEXT QUESTION ONLY IF SERVER ACKNOWLEDGED!
      dispatch({ type: "goToQuestion", payload: targetIdx });
    } catch (err) {
      console.error("Navigation blocked due to server connection failure:", err);
      setServerConnectionError("Server connection failed: Unable to verify and save your response to the server. You cannot advance to the next question while disconnected.");
      setAlertDialog({
        isOpen: true,
        title: "⚠️ Server Connection Error",
        message: "Unable to reach the server. Your answer could not be recorded in the database. Advancing to the next question is blocked until your connection is restored.",
        confirmText: "Retry Connection",
        cancelText: "Stay on Question",
        type: "danger",
        onConfirm: () => handleRetryConnection(),
      });
      throw err;
    } finally {
      setIsNavTransitioning(false);
    }
  };

  const handleRevealAnswer = async (qIdx) => {
    if (serverConnectionError) {
      setAlertDialog({
        isOpen: true,
        title: "⚠️ Server Connection Failed",
        message: "Cannot check or reveal answers while offline. Please restore connection to verify your answer.",
        confirmText: "Retry Connection",
        cancelText: "Dismiss",
        type: "danger",
        onConfirm: () => handleRetryConnection(),
      });
      return;
    }

    const q = questions[qIdx];
    const userAns = answers[qIdx];
    const targetQNo = q?.questionNo || `Question #${qIdx + 1}`;
    const targetQId = q?.id;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const curAns = answers[index];
      const hasCurrentAnswer =
        curAns !== null &&
        curAns !== undefined &&
        (typeof curAns === "number" ||
          (Array.isArray(curAns) && curAns.length > 0) ||
          (Array.isArray(curAns?.selections) && curAns.selections.length > 0) ||
          (curAns?.matches && Object.keys(curAns.matches).length > 0));

      const newCommitted =
        hasCurrentAnswer && !committedQuestions?.includes(index)
          ? [...(committedQuestions || []), index]
          : (committedQuestions || []);

      const newRevealed = revealedQuestions?.includes(qIdx)
        ? revealedQuestions
        : [...(revealedQuestions || []), qIdx];

      const now = Date.now();
      const sessionData = {
        id: activeSessionId || `session_${startedAt || now}`,
        userId: currentUser?.id || null,
        userEmail: currentUser?.email || null,
        candidateName: currentUser?.name || candidateName,
        status: "active",
        questions,
        index: qIdx,
        answer: userAns ?? null,
        answers,
        points,
        secondsRemaining,
        examMode,
        settings,
        selectedBankName,
        selectedBankKey: selectedBankKey || matchExamToBankKey({ bankName: selectedBankName }),
        bankName: selectedBankName,
        flaggedQuestions,
        revealedQuestions: newRevealed,
        committedQuestions: newCommitted,
        startedAt: startedAt || now,
        savedAt: now,
        updatedAt: now,
        isPaused: false,
      };

      const res = await fetch(`${API_BASE_URL}/check-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        body: JSON.stringify({
          questionId: targetQId,
          questionNo: targetQNo,
          userAnswer: userAns,
          action: "reveal",
          sessionId: activeSessionId,
          questionOptions: q?.options || [],
          sessionData,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      if (!data || data.success === false) {
        throw new Error(data?.error || "Server validation failed");
      }

      setServerConnectionError(null);

      dispatch({
        type: "revealAnswerWithServerData",
        payload: {
          index: qIdx,
          correctOption: data.correctOption,
          explanation: data.explanation,
          isCorrect: data.isCorrect,
        },
      });

      return data;
    } catch (err) {
      clearTimeout(timeoutId);
      console.error("Reveal answer blocked due to server connection failure:", err);
      const msg = err.name === "AbortError"
        ? "Server connection timed out. Could not verify answer with server."
        : `Connection to server failed: ${err.message || "Network error"}`;
      setServerConnectionError(msg);
      setAlertDialog({
        isOpen: true,
        title: "⚠️ Server Connection Failed",
        message: "Could not retrieve and verify answer from the server database. Please restore your connection.",
        confirmText: "Retry Connection",
        cancelText: "Dismiss",
        type: "danger",
        onConfirm: () => handleRetryConnection(),
      });
      throw err;
    }
  };

  const handleFinishExam = async () => {
    if (serverConnectionError) {
      setAlertDialog({
        isOpen: true,
        title: "⚠️ Cannot Grade Exam While Disconnected",
        message: "You are currently disconnected from the server. Your exam results cannot be saved. Please click Retry Connection to submit your exam.",
        confirmText: "Retry Connection Now",
        cancelText: "Cancel",
        type: "danger",
        onConfirm: () => handleRetryConnection(),
      });
      return;
    }

    try {
      const finalPoints = calculateTotalPoints(questions, answers);
      const now = Date.now();
      const completedRecord = {
        id: activeSessionId || `exam_${now}`,
        userId: currentUser?.id || null,
        userEmail: currentUser?.email || null,
        candidateName: currentUser?.name || candidateName || "Candidate",
        bankName: selectedBankName || "CCNA Exam",
        score: finalPoints,
        maxScore: questions.length * 10,
        percentage: Math.round((finalPoints / (questions.length * 10)) * 100),
        passed: Math.round((finalPoints / (questions.length * 10)) * 100) >= 80,
        totalQuestions: questions.length,
        timeSpentSeconds: secondsRemaining !== null ? Math.max(0, 7200 - secondsRemaining) : 0,
        examDate: now,
        questions,
        answers,
        flaggedQuestions,
        revealedQuestions,
        settings,
        examMode,
      };

      const res = await fetch(`${API_BASE_URL}/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completedRecord),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      if (activeSessionId) {
        fetch(`${API_BASE_URL}/sessions/${encodeURIComponent(activeSessionId)}`, {
          method: "DELETE",
        }).catch(() => {});
      }

      dispatch({ type: "finish" });
    } catch (err) {
      console.error("Finish exam blocked due to server connection error:", err);
      setServerConnectionError("Server connection failed: Could not record completed exam to server history. Please retry.");
      setAlertDialog({
        isOpen: true,
        title: "⚠️ Submission Failed",
        message: "Could not submit your completed exam to the server database. Please verify your connection and retry.",
        confirmText: "Retry Submission",
        cancelText: "Stay on Exam",
        type: "danger",
        onConfirm: () => handleFinishExam(),
      });
    }
  };

  // On /exam mount: fetch fresh session from server (ZERO LOCALSTORAGE CACHING)
  useEffect(() => {
    const path = typeof window !== "undefined" ? window.location.pathname.toLowerCase().replace(/\/+$/, "") : "";
    const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const isExam = path === "/exam" || path.startsWith("/exam") || search?.get("view") === "exam";
    if (!isExam) return;

    const urlSessionId = search?.get("id") || search?.get("sessionId") || null;
    const isReview = search?.get("review") === "1" || search?.get("mode") === "review";

    const token = localStorage.getItem("ccna_auth_token") || "";
    const userObj = (() => {
      try { return JSON.parse(localStorage.getItem("ccna_auth_user") || "{}"); } catch { return {}; }
    })();
    const queryParams = new URLSearchParams();
    queryParams.set("_t", Date.now().toString());
    if (urlSessionId) queryParams.set("sessionId", urlSessionId);
    if (userObj.id) queryParams.set("userId", userObj.id);
    if (userObj.email) queryParams.set("userEmail", userObj.email);

    const headers = {
      "Accept": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    if (isReview) {
      if (urlSessionId) {
        fetch(`${API_BASE_URL}/history?${queryParams.toString()}`, { headers })
          .then((res) => res.json())
          .then((data) => {
            const list = data?.history || [];
            const cleanId = urlSessionId.replace(/^review_/, "");
            const record = list.find((r) => r.id === urlSessionId || r.id === cleanId || r.id?.includes(cleanId));
            if (record) {
              handleReviewCompletedExam(record);
            } else {
              handleNavigate("dashboard");
            }
          })
          .catch(() => {
            handleNavigate("dashboard");
          });
      } else {
        handleNavigate("dashboard");
      }
      return;
    }

    fetch(`${API_BASE_URL}/sessions?${queryParams.toString()}`, { headers })
      .then((res) => res.json())
      .then((data) => {
        const list = data?.sessions || [];
        const session = urlSessionId ? list.find((s) => s.id === urlSessionId) : list[0];
        if (session && !isExamFinishedId(session.id)) {
          handleResumeSession(session);
        } else if (!urlSessionId) {
          handleNavigate("dashboard");
        }
      })
      .catch((err) => {
        console.warn("Could not resume session from server:", err);
      });
  }, []);

  const handleDeleteSession = (sessionId) => {
    setSavedSessions((prev) => prev.filter((s, idx) => s.id !== sessionId && idx !== sessionId));

    if (sessionId) {
      fetch(`${API_BASE_URL}/sessions/${sessionId}`, { method: "DELETE" }).catch(() => {});
    }
  };

  const handleClearHistory = async () => {
    setPastExams([]);

    const queryParams = new URLSearchParams();
    if (currentUser?.id) queryParams.append("userId", currentUser.id);
    if (currentUser?.email) queryParams.append("userEmail", currentUser.email);
    queryParams.append("_t", Date.now().toString());

    const token = localStorage.getItem("ccna_auth_token");
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      await fetch(`${API_BASE_URL}/history?${queryParams.toString()}`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({
          userId: currentUser?.id || null,
          userEmail: currentUser?.email || null,
        }),
      });
    } catch (err) {
      console.warn("Failed to clear history on server:", err);
    }
  };

  const handleDeleteHistoryRecord = async (recordId) => {
    if (!recordId) return;
    setPastExams((prev) => prev.filter((r) => r.id !== recordId && r.sessionId !== recordId));

    const token = localStorage.getItem("ccna_auth_token");
    const headers = {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      await fetch(`${API_BASE_URL}/history/${encodeURIComponent(recordId)}?_t=${Date.now()}`, {
        method: "DELETE",
        headers,
      });
    } catch (e) {
      console.warn("History delete error:", e);
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
    (prev, cur) => prev + (cur.points || 10),
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

  const storedAuthUser = (() => {
    try { return JSON.parse(localStorage.getItem("ccna_auth_user") || "null"); } catch { return null; }
  })();
  const effectiveUser = currentUser || storedAuthUser;

  return (
    <div className="cisco-simulator-root">
      {serverConnectionError && (
        <div className="server-connection-error-banner" role="alert">
          <div className="connection-error-content">
            <div className="connection-error-left">
              <span className="connection-error-icon">⚠️</span>
              <div className="connection-error-text">
                <span className="connection-error-title">Server Connection Failed</span>
                <span className="connection-error-desc">{serverConnectionError}</span>
              </div>
            </div>
            <button
              type="button"
              className="btn-retry-connection"
              onClick={handleRetryConnection}
              disabled={isRetryingConnection}
            >
              {isRetryingConnection ? "Reconnecting..." : "🔄 Retry Connection"}
            </button>
          </div>
        </div>
      )}
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
          isDashboardLoading ? (
            <div className="loader-container" style={{ minHeight: "65vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className="loader"></div>
              <p style={{ marginTop: "1rem", color: "#64748b", fontWeight: 600, fontSize: "1.05rem" }}>Refreshing latest exam data from server...</p>
            </div>
          ) : (
            <ExamDashboard
              totalQuestionsCount={allQuestions.length}
              allQuestions={allQuestions}
              onStartExam={handleStartExam}
              candidateName={effectiveUser?.name || candidateName}
              setCandidateName={setCandidateName}
              savedSession={savedSessions.length > 0 ? savedSessions[0] : null}
              savedSessions={savedSessions}
              onResumeExam={handleResumeSession}
              onDiscardSavedSession={() => handleDeleteSession(savedSessions[0]?.id)}
              onNavigate={handleNavigate}
              pastExams={pastExams}
              onReviewExam={handleReviewCompletedExam}
              onRetakeExam={handleRetakeAllQuestions}
              onRetakeAll={handleRetakeAllQuestions}
              onRetakeFlagged={handleRetakeFlaggedOnly}
              onRetakeIncorrect={handleRetakeIncorrectOnly}
              currentUser={effectiveUser}
              onOpenAuth={handleOpenAuth}
              onLogout={handleLogout}
              onOpenUpgrade={handleOpenUpgrade}
            />
          )
        )}

        {status === "ready" && currentView === "resume-exams" && (
          <ResumeExamsView
            savedSessions={savedSessions}
            onResumeSession={handleResumeSession}
            onDeleteSession={handleDeleteSession}
            onNavigate={handleNavigate}
            candidateName={effectiveUser?.name || candidateName}
            currentUser={effectiveUser}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
          />
        )}

        {status === "ready" && currentView === "history" && (
          <ExamHistoryView
            pastExams={pastExams}
            onNavigate={handleNavigate}
            candidateName={candidateName}
            onClearHistory={handleClearHistory}
            onReviewExam={handleReviewCompletedExam}
            onRetakeAll={handleRetakeAllQuestions}
            onRetakeFlagged={handleRetakeFlaggedOnly}
            onRetakeIncorrect={handleRetakeIncorrectOnly}
            onDeleteRecord={handleDeleteHistoryRecord}
            currentUser={effectiveUser}
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
            selectedBankName={selectedBankName}
            selectedBankKey={selectedBankKey}
            flaggedQuestions={flaggedQuestions}
            revealedQuestions={revealedQuestions}
            committedQuestions={committedQuestions}
            isReviewMode={isReviewMode}
            isAdmin={isAdminUser}
            isPaused={isPaused}
            onTogglePause={() => dispatch({ type: "togglePauseExam" })}
            onToggleFlag={handleToggleFlag}
            onGoToQuestion={handleGoToQuestion}
            onRevealAnswer={handleRevealAnswer}
            onFinishExam={handleFinishExam}
            serverConnectionError={serverConnectionError}
            onRetryConnection={handleRetryConnection}
            isRetryingConnection={isRetryingConnection}
            isNavSaving={isNavTransitioning}
            onExitReview={() => {
              dispatch({ type: "exitReview" });
              handleNavigate("dashboard");
              loadFreshDashboardData();
            }}
            onExitToDashboard={() => {
              const now = Date.now();
              const sessionSnapshot = {
                id: activeSessionId || `session_${startedAt || now}`,
                userId: currentUser?.id || null,
                userEmail: currentUser?.email || null,
                candidateName: currentUser?.name || candidateName,
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
                flaggedQuestions,
                revealedQuestions: revealedQuestions || [],
                committedQuestions: committedQuestions || [],
                startedAt: startedAt || now,
                savedAt: now,
                updatedAt: now,
                isPaused: false,
              };

              syncActiveSessionToLocalStorage(sessionSnapshot);

              try {
                fetch(`${API_BASE_URL}/sessions`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(sessionSnapshot),
                  keepalive: true,
                }).catch(() => {});
              } catch (e) {}

              setSavedSessions((prev) => {
                const existingIdx = prev.findIndex((s) => s.id === sessionSnapshot.id);
                let updated;
                if (existingIdx >= 0) {
                  updated = [...prev];
                  updated[existingIdx] = sessionSnapshot;
                } else {
                  updated = [sessionSnapshot, ...prev];
                }
                return updated;
              });

              dispatch({ type: "suspendToDashboard" });
              handleNavigate("dashboard");
              loadFreshDashboardData();
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
            points={lastFinishedRecordRef.current?.score ?? points}
            maxPossiblePoints={lastFinishedRecordRef.current?.maxScore ?? maxPossiblePoints}
            highscore={highscore}
            candidateName={candidateName}
            dispatch={dispatch}
            numQuestions={lastFinishedRecordRef.current?.totalQuestions ?? numQuestions}
            answers={lastFinishedRecordRef.current?.answers ?? answers}
            questions={lastFinishedRecordRef.current?.questions ?? questions}
            flaggedQuestions={lastFinishedRecordRef.current?.flaggedQuestions ?? flaggedQuestions}
            examMode={lastFinishedRecordRef.current?.examMode ?? examMode}
            selectedBankName={lastFinishedRecordRef.current?.bankName ?? selectedBankName}
            onClose={() => {
              dispatch({ type: "restart" });
              handleNavigate("dashboard");
              loadFreshDashboardData();
            }}
            backButtonLabel="⌂ Back to Exam Selection"
            onReviewExam={() => handleReviewCompletedExam(lastFinishedRecordRef.current || null)}
            onRetakeAll={() => handleRetakeAllQuestions(lastFinishedRecordRef.current || null)}
            onRetakeFlagged={() => handleRetakeFlaggedOnly(lastFinishedRecordRef.current || null)}
            onRetakeIncorrect={() => handleRetakeIncorrectOnly(lastFinishedRecordRef.current || null)}
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
