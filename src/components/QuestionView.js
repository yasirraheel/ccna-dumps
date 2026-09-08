import React, { useState, useEffect, useMemo, useRef } from "react";
import DragDropQuestion from "./DragDropQuestion";
import QuestionPaletteModal from "./QuestionPaletteModal";
import CustomConfirmModal from "./CustomConfirmModal";
import QuestionNotesModal from "./QuestionNotesModal";
import MobileBottomBar from "./MobileBottomBar";
import { resolveOriginalSourceImage } from "../utils/questionSourceHelper";

function renderFormattedPrompt(rawText) {
  if (!rawText) return null;

  // Convert inline asterisk/bullet points like "following requirements: * It must..." into newlines
  const preformatted = rawText
    .replace(/([^\n])\s+[*•]\s+/g, "$1\n* ")
    .replace(/([^\n])\s+(\(Choose\s+)/gi, "$1\n\n$2");

  const lines = preformatted.split(/\r?\n/);
  const elements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="prompt-bullet-list">
          {currentList.map((item, idx) => (
            <li key={idx} className="prompt-bullet-item">
              <span className="prompt-bullet-dot">▪</span>
              <span className="prompt-bullet-text">{item}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((rawLine, idx) => {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    const bulletMatch = trimmed.match(/^[*•-]\s*(.+)$/);
    if (bulletMatch) {
      currentList.push(bulletMatch[1]);
    } else {
      flushList();
      elements.push(
        <p key={`p-${idx}`} className="prompt-paragraph">
          {trimmed}
        </p>
      );
    }
  });

  flushList();

  return <div className="boson-question-prompt-content">{elements}</div>;
}

function QuestionView({
  question,
  seqNumber,
  numQuestions,
  answer,
  answers,
  questions,
  dispatch,
  examMode,
  settings,
  selectedBankName,
  selectedBankKey,
  flaggedQuestions,
  revealedQuestions = [],
  isReviewMode = false,
  onToggleFlag,
  onGoToQuestion,
  onFinishExam,
  onExitReview,
  onExitToDashboard,
  points,
  maxPossiblePoints,
  candidateName,
  currentUser,
  secondsRemaining,
  isPaused = false,
  onTogglePause,
}) {
  const cleanBankTitle = (name) => {
    if (!name) return "";
    return String(name)
      .replace(/spoto-?/gi, "")
      .replace(/\(\s*\)/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const activeBankTitle = cleanBankTitle(selectedBankName || question?.bankName || "CCNA Exam");

  const [exhibitZoom, setExhibitZoom] = useState(1);
  const [exhibitPan, setExhibitPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const [showOriginalSource, setShowOriginalSource] = useState(false);
  const [sourceZoom, setSourceZoom] = useState(1);
  const [sourcePan, setSourcePan] = useState({ x: 0, y: 0 });
  const [isPanningSource, setIsPanningSource] = useState(false);
  const panSourceStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const [sourceImgError, setSourceImgError] = useState(false);

  const [imgError, setImgError] = useState(false);
  const [isNavTransitioning, setIsNavTransitioning] = useState(false);

  useEffect(() => {
    setIsNavTransitioning(true);
    const timer = setTimeout(() => {
      setIsNavTransitioning(false);
    }, 360);
    return () => clearTimeout(timer);
  }, [seqNumber]);
  const [showPaletteModal, setShowPaletteModal] = useState(false);
  const [isNoteBoxOpen, setIsNoteBoxOpen] = useState(false);
  const [isAllNotesModalOpen, setIsAllNotesModalOpen] = useState(false);
  const [currentNoteText, setCurrentNoteText] = useState("");

  const [questionComments, setQuestionComments] = useState(() => {
    try {
      const stored = localStorage.getItem("ccna_question_comments");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Filter notes strictly to questions belonging to the currently active exam bank
  const currentBankNotes = useMemo(() => {
    if (!Array.isArray(questions) || questions.length === 0) return {};
    const bankNotes = {};
    const bankQIds = new Set(
      questions
        .map((q) => (q?.id !== undefined && q?.id !== null ? String(q.id) : null))
        .filter(Boolean)
    );
    const bankQNos = new Set(
      questions
        .map((q) => (q?.questionNo ? String(q.questionNo) : null))
        .filter(Boolean)
    );

    Object.entries(questionComments).forEach(([key, text]) => {
      if (!text || !text.trim()) return;
      const strKey = String(key);
      if (bankQIds.has(strKey) || bankQNos.has(strKey)) {
        bankNotes[key] = text;
      }
    });

    return bankNotes;
  }, [questions, questionComments]);

  const currentBankNotesCount = Object.keys(currentBankNotes).length;

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    type: "warning",
    onConfirm: () => {},
  });

  const questionKey = question?.id || question?.questionNo || seqNumber;
  const existingComment = questionComments[questionKey] || questionComments[String(question?.id)] || "";

  useEffect(() => {
    setImgError(false);
    setSourceImgError(false);
    setShowOriginalSource(false);
    setSourceZoom(1);
    setSourcePan({ x: 0, y: 0 });
    setIsPanningSource(false);
    setCurrentNoteText(existingComment);
    setIsNoteBoxOpen(false);
    setExhibitZoom(1);
    setExhibitPan({ x: 0, y: 0 });
    setIsPanning(false);
  }, [question?.id, seqNumber, existingComment]);

  useEffect(() => {
    if (isPaused) {
      setIsNoteBoxOpen(false);
      setShowPaletteModal(false);
      setIsAllNotesModalOpen(false);
      setIsPanning(false);
      setIsPanningSource(false);
    }
  }, [isPaused]);

  // Inline Zoom & Pan handlers for Exhibit
  const handleZoomIn = (e) => {
    e?.stopPropagation();
    setExhibitZoom((prev) => Math.min(3.5, +(prev + 0.3).toFixed(1)));
  };

  const handleZoomOut = (e) => {
    e?.stopPropagation();
    setExhibitZoom((prev) => {
      const next = Math.max(1, +(prev - 0.3).toFixed(1));
      if (next === 1) setExhibitPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = (e) => {
    e?.stopPropagation();
    setExhibitZoom(1);
    setExhibitPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (exhibitZoom <= 1) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: exhibitPan.x,
      panY: exhibitPan.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isPanning || exhibitZoom <= 1) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    setExhibitPan({
      x: panStartRef.current.panX + dx,
      y: panStartRef.current.panY + dy,
    });
  };

  const handleMouseUpOrLeave = () => {
    if (isPanning) {
      setIsPanning(false);
    }
  };

  const handleTouchStart = (e) => {
    if (exhibitZoom <= 1 || e.touches.length !== 1) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      panX: exhibitPan.x,
      panY: exhibitPan.y,
    };
  };

  const handleTouchMove = (e) => {
    if (!isPanning || exhibitZoom <= 1 || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - panStartRef.current.x;
    const dy = e.touches[0].clientY - panStartRef.current.y;
    setExhibitPan({
      x: panStartRef.current.panX + dx,
      y: panStartRef.current.panY + dy,
    });
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  // Inline Zoom & Pan handlers for Original Source Dump
  const handleSourceZoomIn = (e) => {
    e?.stopPropagation();
    setSourceZoom((prev) => Math.min(3.5, +(prev + 0.3).toFixed(1)));
  };

  const handleSourceZoomOut = (e) => {
    e?.stopPropagation();
    setSourceZoom((prev) => {
      const next = Math.max(1, +(prev - 0.3).toFixed(1));
      if (next === 1) setSourcePan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleSourceResetZoom = (e) => {
    e?.stopPropagation();
    setSourceZoom(1);
    setSourcePan({ x: 0, y: 0 });
  };

  const handleSourceMouseDown = (e) => {
    if (sourceZoom <= 1) return;
    setIsPanningSource(true);
    panSourceStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: sourcePan.x,
      panY: sourcePan.y,
    };
  };

  const handleSourceMouseMove = (e) => {
    if (!isPanningSource || sourceZoom <= 1) return;
    const dx = e.clientX - panSourceStartRef.current.x;
    const dy = e.clientY - panSourceStartRef.current.y;
    setSourcePan({
      x: panSourceStartRef.current.panX + dx,
      y: panSourceStartRef.current.panY + dy,
    });
  };

  const handleSourceMouseUpOrLeave = () => {
    if (isPanningSource) setIsPanningSource(false);
  };

  const handleSourceTouchStart = (e) => {
    if (sourceZoom <= 1 || !e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    setIsPanningSource(true);
    panSourceStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      panX: sourcePan.x,
      panY: sourcePan.y,
    };
  };

  const handleSourceTouchMove = (e) => {
    if (!isPanningSource || sourceZoom <= 1 || !e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dx = touch.clientX - panSourceStartRef.current.x;
    const dy = touch.clientY - panSourceStartRef.current.y;
    setSourcePan({
      x: panSourceStartRef.current.panX + dx,
      y: panSourceStartRef.current.panY + dy,
    });
  };

  const handleSourceTouchEnd = () => {
    if (isPanningSource) setIsPanningSource(false);
  };

  const handleSaveComment = (textToSave) => {
    const trimmed = textToSave ? textToSave.trim() : "";
    const updated = { ...questionComments };
    if (trimmed) {
      updated[questionKey] = trimmed;
    } else {
      delete updated[questionKey];
    }
    setQuestionComments(updated);
    try {
      localStorage.setItem("ccna_question_comments", JSON.stringify(updated));
    } catch (e) {
      console.warn("Save note error:", e);
    }

    // MySQL sync with userId / userEmail
    if (question?.id) {
      const notesApi = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:5000/api/notes" : "/api/notes";
      fetch(notesApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser?.id || null,
          userEmail: currentUser?.email || null,
          candidateName: currentUser?.name || candidateName || "Candidate",
          questionId: question.id,
          questionNo: question.questionNo || `Question #${question.id}`,
          noteText: trimmed,
        }),
      }).catch(() => {});
    }

    setIsNoteBoxOpen(false);
  };

  const handleDeleteComment = (qKey) => {
    const targetKey = qKey || questionKey;
    const updated = { ...questionComments };
    delete updated[targetKey];
    if (question?.id) delete updated[String(question.id)];
    setQuestionComments(updated);
    if (targetKey === questionKey || String(targetKey) === String(question?.id)) {
      setCurrentNoteText("");
      setIsNoteBoxOpen(false);
    }
    try {
      localStorage.setItem("ccna_question_comments", JSON.stringify(updated));
    } catch (e) {
      console.warn("Delete note error:", e);
    }

    // MySQL sync
    const qId = Number(targetKey) || question?.id;
    if (qId) {
      const notesApi = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:5000/api/notes" : "/api/notes";
      fetch(notesApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser?.id || null,
          userEmail: currentUser?.email || null,
          candidateName: currentUser?.name || candidateName || "Candidate",
          questionId: qId,
          questionNo: question?.questionNo || `Question #${qId}`,
          noteText: "",
        }),
      }).catch(() => {});
    }
  };

  const isDragDrop = question.type === "drag_drop" || Boolean(question.dragDropData);

  const correctOptions = Array.isArray(question.correctOption)
    ? question.correctOption
    : question.correctOption !== undefined && question.correctOption !== null
    ? [question.correctOption]
    : [];
  const isMulti = correctOptions.length > 1;

  const isFlagged = flaggedQuestions?.includes(seqNumber - 1);

  const selectedIndices = isMulti
    ? Array.isArray(answer)
      ? answer
      : answer?.selections || []
    : typeof answer === "number"
    ? [answer]
    : Array.isArray(answer)
    ? answer
    : answer?.selections || [];

  // Exhibit image source resolver
  const getExhibitUrl = (imgPath) => {
    if (!imgPath) return "";
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
      return imgPath;
    }
    const clean = imgPath.replace(/^\/+/, "");
    const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/+$/, "");
    return publicUrl ? `${publicUrl}/${clean}` : `/${clean}`;
  };

  const exhibitSrc = getExhibitUrl(question.exhibitImage);
  const resolvedOriginalSource =
    question.originalSourceImage || resolveOriginalSourceImage(question);
  const originalSourceSrc = getExhibitUrl(resolvedOriginalSource);

  const isRevealed = Boolean(revealedQuestions?.includes(seqNumber - 1));
  const maxAllowed = isMulti ? correctOptions.length : 1;
  const isTimeOver = secondsRemaining !== null && secondsRemaining <= 0;

  const handleOptionClick = (index) => {
    // Once answer is revealed, in review mode, or time has expired, user cannot modify their selection
    if (isRevealed || isReviewMode || isTimeOver) return;

    if (isMulti) {
      const current = selectedIndices;
      if (current.includes(index)) {
        // Deselect clicked item
        const newSelections = current.filter((i) => i !== index);
        dispatch({ type: "multiSelect", payload: newSelections });
      } else {
        if (current.length < maxAllowed) {
          const newSelections = [...current, index];
          dispatch({ type: "multiSelect", payload: newSelections });
        } else if (maxAllowed > 0) {
          // Replace oldest selection if already at capacity
          const newSelections = [...current.slice(1), index];
          dispatch({ type: "multiSelect", payload: newSelections });
        }
      }
    } else {
      // Single choice: select or change to chosen option freely
      dispatch({ type: "newAnswer", payload: index });
    }
  };

  // Calculate live score percentage
  const livePercentage =
    maxPossiblePoints > 0 ? ((points / maxPossiblePoints) * 100).toFixed(1) : "0.0";

  const canGoPrev = seqNumber > 1;
  const canGoNext = seqNumber < numQuestions;

  const handleExitClick = () => {
    if (isReviewMode) {
      onExitReview ? onExitReview() : onExitToDashboard();
      return;
    }

    setConfirmDialog({
      isOpen: true,
      title: "Save & Return to Dashboard",
      message:
        "Your current question, answers, and remaining time will be saved in real-time. You can resume right where you left off from the Dashboard.",
      confirmText: "Save & Exit",
      cancelText: "Continue Practicing",
      type: "info",
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        onExitToDashboard();
      },
    });
  };

  const handleGradeClick = () => {
    const answeredCount = answers.filter(
      (a) =>
        a !== null &&
        a !== undefined &&
        (typeof a === "number" || a?.confirmed || a?.selections?.length > 0)
    ).length;

    setConfirmDialog({
      isOpen: true,
      title: "Submit & Grade Exam",
      message: `You have answered ${answeredCount} of ${numQuestions} questions. Are you ready to submit and calculate your final score?`,
      confirmText: "Grade Exam Now",
      cancelText: "Return to Exam",
      type: "info",
      onConfirm: () => {
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        onFinishExam();
      },
    });
  };

  const getInitials = (name) => {
    if (!name || !name.trim()) return "CC";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const candidateInitials = getInitials(candidateName);

  const formatTime = (secs) => {
    if (secs === null || secs === undefined) return null;
    const m = Math.floor(Math.abs(secs) / 60);
    const s = Math.abs(secs) % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const timerDisplay = formatTime(secondsRemaining);
  const timerIsLow = secondsRemaining !== null && secondsRemaining < 300;

  return (
    <div className={`boson-exsim-view ${isPaused ? "is-paused" : ""}`}>
      {/* SLIM THEME TRANSITION ANIMATED LOADER */}
      <div
        className={`boson-slim-transition-track ${isNavTransitioning ? "is-active" : ""}`}
        aria-hidden="true"
      >
        <div className="boson-slim-transition-bar"></div>
        <div className="boson-slim-transition-glow"></div>
      </div>

      {/* TOP NAVIGATION BAR: Back to Exam, Notes Button, Timer & User Avatar */}
      <div className="boson-top-bar">
        <div className="top-bar-left-actions">
          <button
            type="button"
            className="btn-boson-back"
            onClick={handleExitClick}
            title="Return to Exam Bank"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Exam</span>
          </button>

          {activeBankTitle && (
            <div className="top-bar-bank-tag" title={`Currently attempting: ${activeBankTitle}`}>
              <span className="bank-tag-icon">🏷️</span>
              <span className="bank-tag-name">{activeBankTitle}</span>
            </div>
          )}

          <button
            type="button"
            className={`btn-top-notes-summary ${
              currentBankNotesCount > 0 ? "has-notes" : ""
            }`}
            onClick={() => setIsAllNotesModalOpen(true)}
            title="View question notes in this exam bank"
          >
            <span>💬 Notes ({currentBankNotesCount})</span>
          </button>
        </div>

        <div className="top-bar-right-group">
          {/* TIMER PILL */}
          {timerDisplay && (
            <div
              className={`exam-timer-pill ${timerIsLow ? "timer-low" : ""} ${isPaused ? "timer-paused" : ""}`}
              onClick={!isReviewMode && onTogglePause ? onTogglePause : undefined}
              title={
                !isReviewMode && onTogglePause
                  ? isPaused
                    ? "Exam Paused (Click to resume)"
                    : "Exam Running (Click to pause)"
                  : undefined
              }
              style={{ cursor: !isReviewMode && onTogglePause ? "pointer" : "default" }}
              role={!isReviewMode && onTogglePause ? "button" : undefined}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>{isPaused ? "⏸️ PAUSED" : timerDisplay}</span>
            </div>
          )}

          {/* PAUSE / RESUME BUTTON */}
          {!isReviewMode && onTogglePause && (
            <button
              type="button"
              className={`btn-boson-pause ${isPaused ? "is-paused" : ""}`}
              onClick={onTogglePause}
              title={isPaused ? "Resume Exam" : "Pause Exam (Freeze timer & blur question)"}
            >
              {isPaused ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                  <span>Pause</span>
                </>
              )}
            </button>
          )}

          <div
            className="boson-user-avatar"
            title={candidateName ? `Candidate: ${candidateName}` : "CCNA Candidate"}
          >
            <span>{candidateInitials}</span>
          </div>
        </div>
      </div>

      {/* MAIN TITLE HEADER */}
      <div className="boson-main-header">
        <div className="boson-title-bank-row">
          <h1 className="boson-exam-title">
            Cisco 200-301 CCNA Exam Simulator
          </h1>
        </div>

        <div className="boson-sub-header">
          <div className="boson-sub-left">
            <span className="boson-q-count">
              Question {seqNumber} of {numQuestions}
            </span>
            {settings?.showScoreLive !== false && (
              <>
                <span className="boson-dot-sep">•</span>
                <span className="boson-live-score">
                  {livePercentage}% correct
                </span>
              </>
            )}
            {question.questionNo && (
              <>
                <span className="boson-dot-sep">•</span>
                <span className="boson-qno-pill">{question.questionNo}</span>
              </>
            )}
            {isReviewMode && (
              <>
                <span className="boson-dot-sep">•</span>
                <span className="boson-review-badge">🔍 Review Mode (Read-Only)</span>
              </>
            )}
          </div>

          <div className="boson-sub-right-actions">
            {/* VIEW ORIGINAL SOURCE BUTTON */}
            {resolvedOriginalSource && (
              <button
                type="button"
                className={`btn-boson-source-toggle ${showOriginalSource ? "is-active" : ""}`}
                onClick={() => setShowOriginalSource((prev) => !prev)}
                title={showOriginalSource ? "Hide original exam dump source" : "View original question from exam dump PDF"}
              >
                <svg
                  className="source-svg-icon"
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>{showOriginalSource ? "Hide Source" : "Original Source"}</span>
              </button>
            )}

            {/* ADD / EDIT QUESTION NOTE BUTTON */}
            <button
              type="button"
              className={`btn-boson-note-toggle ${
                existingComment ? "has-active-note" : ""
              }`}
              onClick={() => setIsNoteBoxOpen((prev) => !prev)}
              title={
                existingComment
                  ? "Click to view or edit your note for this question"
                  : "Click to write a note/feedback for this question"
              }
            >
              {existingComment ? (
                <>
                  <svg
                    className="note-svg-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z" />
                  </svg>
                  <span>Note Attached ✓</span>
                </>
              ) : (
                <>
                  <svg
                    className="note-svg-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Add Note</span>
                </>
              )}
            </button>

            {/* MARK FOR REVIEW BUTTON */}
            <button
              type="button"
              className={`btn-boson-flag ${isFlagged ? "is-flagged" : ""}`}
              onClick={() => onToggleFlag(seqNumber - 1)}
              title={isFlagged ? "Click to unmark review" : "Click to mark for review"}
            >
              {isFlagged ? (
                <>
                  <svg
                    className="flag-svg-icon flag-filled"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                  >
                    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
                  </svg>
                  <span>Marked for Review</span>
                </>
              ) : (
                <>
                  <svg
                    className="flag-svg-icon flag-outline"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
                  </svg>
                  <span>Mark for Review</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FLOATING SIDE ARROWS (Green < and > on edges) */}
      {!isPaused && canGoPrev && (
        <button
          type="button"
          className="boson-side-arrow side-arrow-left"
          onClick={() => onGoToQuestion(seqNumber - 2)}
          title="Previous Question"
        >
          ‹
        </button>
      )}

      {!isPaused && canGoNext && (
        <button
          type="button"
          className="boson-side-arrow side-arrow-right"
          onClick={() => onGoToQuestion(seqNumber)}
          title="Next Question"
        >
          ›
        </button>
      )}

      {/* QUESTION BODY AREA */}
      <div className="boson-question-body" key={seqNumber}>
        {/* INLINE QUESTION NOTE COMPOSER */}
        {isNoteBoxOpen && (
          <div className="inline-note-composer-card">
            <div className="note-composer-header">
              <div className="note-composer-title">
                <span className="note-badge">💬 Question Note / Issue Report</span>
                <span className="note-composer-sub">
                  ({question.questionNo || `Question #${seqNumber}`})
                </span>
              </div>
              <button
                type="button"
                className="note-composer-close"
                onClick={() => setIsNoteBoxOpen(false)}
                title="Close note box"
              >
                ✕
              </button>
            </div>

            <textarea
              className="note-composer-textarea"
              rows="3"
              placeholder="Describe what needs fixing (e.g. 'Option B typo', 'missing exhibit diagram', 'wrong correct answer marked', 'explanation incomplete')..."
              value={currentNoteText}
              onChange={(e) => setCurrentNoteText(e.target.value)}
              autoFocus
            />

            <div className="note-composer-footer">
              {existingComment ? (
                <button
                  type="button"
                  className="btn-note-delete"
                  onClick={() => handleDeleteComment(questionKey)}
                >
                  🗑️ Delete Note
                </button>
              ) : (
                <div></div>
              )}

              <div className="note-composer-right-btns">
                <button
                  type="button"
                  className="btn-note-cancel"
                  onClick={() => {
                    setCurrentNoteText(existingComment);
                    setIsNoteBoxOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-note-save"
                  onClick={() => handleSaveComment(currentNoteText)}
                >
                  Save Note ✓
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE NOTE BANNER (when note exists and composer is closed) */}
        {!isNoteBoxOpen && existingComment && (
          <div
            className="active-note-banner"
            onClick={() => setIsNoteBoxOpen(true)}
            title="Click to edit this note"
          >
            <span className="note-banner-icon">💬</span>
            <div className="note-banner-content">
              <strong>Your Note on this question:</strong> {existingComment}
            </div>
            <span className="note-banner-edit-hint">✎ Edit</span>
          </div>
        )}

        {/* ORIGINAL SOURCE DUMP VIEWER WITH INLINE ZOOM & PAN */}
        {showOriginalSource && resolvedOriginalSource && (
          <div className="boson-original-source-card">
            <div className="original-source-header">
              <div className="original-source-header-left">
                <span className="original-source-tag">📄 Original Dump Source</span>
                <span className="original-source-qno">{question.questionNo || `Question #${seqNumber}`}</span>
                {sourceZoom > 1 && (
                  <span className="source-drag-hint">↔ Drag image to explore</span>
                )}
              </div>

              <div className="original-source-controls">
                <button
                  type="button"
                  className="source-ctrl-btn"
                  onClick={handleSourceZoomOut}
                  disabled={sourceZoom <= 1}
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  −
                </button>
                <span className="source-zoom-level">
                  {Math.round(sourceZoom * 100)}%
                </span>
                <button
                  type="button"
                  className="source-ctrl-btn"
                  onClick={handleSourceZoomIn}
                  disabled={sourceZoom >= 3.5}
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  +
                </button>
                <button
                  type="button"
                  className={`source-ctrl-btn reset ${sourceZoom > 1 ? "active" : ""}`}
                  onClick={handleSourceResetZoom}
                  title="Reset Zoom & Pan"
                  aria-label="Reset Zoom"
                >
                  ⟲ Reset
                </button>
                <button
                  type="button"
                  className="source-ctrl-btn close-btn"
                  onClick={() => setShowOriginalSource(false)}
                  title="Close Original Source"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div
              className={`original-source-img-frame ${sourceZoom > 1 ? "is-zoomed" : ""} ${isPanningSource ? "is-panning" : ""}`}
              onMouseDown={handleSourceMouseDown}
              onMouseMove={handleSourceMouseMove}
              onMouseUp={handleSourceMouseUpOrLeave}
              onMouseLeave={handleSourceMouseUpOrLeave}
              onTouchStart={handleSourceTouchStart}
              onTouchMove={handleSourceTouchMove}
              onTouchEnd={handleSourceTouchEnd}
              style={{
                cursor: sourceZoom > 1 ? (isPanningSource ? "grabbing" : "grab") : "default",
                touchAction: sourceZoom > 1 ? "none" : "auto",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {!sourceImgError ? (
                <img
                  src={originalSourceSrc}
                  alt={`Original Dump Question for ${question.questionNo || "question"}`}
                  className="boson-original-source-img"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  style={{
                    transform: `translate(${sourcePan.x}px, ${sourcePan.y}px) scale(${sourceZoom})`,
                    transformOrigin: "center center",
                    transition: isPanningSource ? "none" : "transform 0.15s ease-out",
                    userSelect: "none",
                    pointerEvents: "auto",
                  }}
                  onError={() => setSourceImgError(true)}
                />
              ) : (
                <div className="source-error-wrap">
                  <p>Original source image: {resolvedOriginalSource}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="boson-question-prompt">
          {renderFormattedPrompt(question.question)}
        </div>

        {isMulti && settings?.showRequiredAnswersCount !== false && (
          <div className="boson-multi-indicator">
            ✋ Please select exactly <strong>{correctOptions.length} answers</strong> ({selectedIndices.length} / {correctOptions.length} selected)
          </div>
        )}

        {/* EXHIBIT IMAGE WITH INLINE ZOOM & PAN */}
        {question.exhibitImage && (
          <div className="boson-exhibit-card">
            <div className="exhibit-header">
              <div className="exhibit-header-left">
                <span className="exhibit-tag">📸 Exhibit Diagram</span>
                {exhibitZoom > 1 && (
                  <span className="exhibit-drag-hint">
                    ↔ Drag image to explore
                  </span>
                )}
              </div>

              {/* + / - / RESET ZOOM CONTROLS */}
              <div className="exhibit-zoom-controls">
                <button
                  type="button"
                  className="exhibit-ctrl-btn"
                  onClick={handleZoomOut}
                  disabled={exhibitZoom <= 1}
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  −
                </button>
                <span className="exhibit-zoom-level">
                  {Math.round(exhibitZoom * 100)}%
                </span>
                <button
                  type="button"
                  className="exhibit-ctrl-btn"
                  onClick={handleZoomIn}
                  disabled={exhibitZoom >= 3.5}
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  +
                </button>
                <button
                  type="button"
                  className={`exhibit-ctrl-btn reset ${exhibitZoom > 1 ? "active" : ""}`}
                  onClick={handleResetZoom}
                  title="Reset Zoom & Pan"
                  aria-label="Reset Zoom"
                >
                  ⟲ Reset
                </button>
              </div>
            </div>

            <div
              className={`exhibit-img-frame ${exhibitZoom > 1 ? "is-zoomed" : ""} ${isPanning ? "is-panning" : ""}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                cursor: exhibitZoom > 1 ? (isPanning ? "grabbing" : "grab") : "default",
                touchAction: exhibitZoom > 1 ? "none" : "auto",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {!imgError ? (
                <img
                  src={exhibitSrc}
                  alt={`Exhibit for ${question.questionNo || "question"}`}
                  className="boson-exhibit-img"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  style={{
                    transform: `translate(${exhibitPan.x}px, ${exhibitPan.y}px) scale(${exhibitZoom})`,
                    transformOrigin: "center center",
                    transition: isPanning ? "none" : "transform 0.15s ease-out",
                    userSelect: "none",
                    pointerEvents: "auto",
                  }}
                  onError={(e) => {
                    const clean = (question.exhibitImage || "").replace(/^\/+/, "");
                    if (e.target.src.includes(clean)) {
                      if (!e.target.dataset.triedFallback1) {
                        e.target.dataset.triedFallback1 = "true";
                        e.target.src = `/${clean}`;
                      } else {
                        setImgError(true);
                      }
                    } else {
                      setImgError(true);
                    }
                  }}
                />
              ) : (
                <div className="exhibit-error-wrap">
                  <p>Exhibit diagram: {question.exhibitImage}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CLI SNIPPET / CONSOLE OUTPUT */}
        {question.cliSnippet && (
          <div className="boson-cli-box">
            <pre className="boson-cli-content">
              <code>{question.cliSnippet}</code>
            </pre>
          </div>
        )}

        {/* RENDER DRAG & DROP OR MULTIPLE CHOICE */}
        {isDragDrop ? (
          <DragDropQuestion
            question={question}
            dispatch={dispatch}
            answer={answer}
            isReviewMode={isReviewMode || isTimeOver}
          />
        ) : (
          <div className="boson-options-list">
            {question.options &&
              question.options.map((option, index) => {
                const match = option.match(/^([A-E])\.\s*([\s\S]*)/);
                const letter = match ? match[1] : "";
                const text = match ? match[2] : option;

                const isSelected = selectedIndices.includes(index);
                const isCorrectChoice = correctOptions.includes(index);

                let cardClass = "boson-option-item";
                if (isSelected) cardClass += " selected";
                if (isRevealed || isReviewMode || isTimeOver) {
                  cardClass += " locked";
                  if (settings?.showAnswersInline !== false || isReviewMode) {
                    if (isCorrectChoice) {
                      cardClass += " correct-answer";
                    } else if (isSelected) {
                      cardClass += " wrong-answer";
                    }
                  }
                }

                return (
                  <div
                    key={index}
                    className={cardClass}
                    onClick={() => handleOptionClick(index)}
                  >
                    <div className="boson-input-indicator">
                      {isMulti ? (
                        <div className={`boson-checkbox ${isSelected ? "checked" : ""}`}>
                          {isSelected && <span className="check-tick">✓</span>}
                        </div>
                      ) : (
                        <div className={`boson-radio ${isSelected ? "checked" : ""}`}>
                          {isSelected && <span className="radio-dot"></span>}
                        </div>
                      )}
                    </div>

                    {letter && <span className="boson-option-letter">{letter}.</span>}

                    <div className="boson-option-content">
                      {text.includes("\n") ? (
                        <pre className="boson-cli-opt">{text}</pre>
                      ) : (
                        <span className="boson-opt-text">{text}</span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* SHOW ANSWER INLINE BANNER */}
        {(isReviewMode || (isRevealed && settings?.showAnswersInline !== false)) && !isDragDrop && (
          <div className="boson-explanation-card">
            <div className="explanation-title">
              💡 <strong>Correct Answer & Explanation:</strong>
            </div>
            <div className="explanation-body">
              <div className="correct-options-full-list">
                {correctOptions.map((idx) => {
                  const opt = question.options[idx] || "";
                  return (
                    <div key={idx} className="correct-opt-row">
                      {opt.includes("\n") ? (
                        <pre className="boson-cli-opt">{opt}</pre>
                      ) : (
                        <span className="correct-opt-text">{opt}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM ACTION TOOLBAR (Screenshot bottom bar) */}
      <div className="boson-bottom-toolbar">
        <div className="toolbar-left">
          <button
            type="button"
            className={`btn-boson-nav ${!canGoPrev ? "disabled" : ""}`}
            onClick={() => canGoPrev && onGoToQuestion(seqNumber - 2)}
            disabled={!canGoPrev}
          >
            Previous
          </button>

          <button
            type="button"
            className={`btn-boson-nav ${!canGoNext ? "disabled" : ""} ${isNavTransitioning ? "is-nav-loading" : ""}`}
            onClick={() => canGoNext && onGoToQuestion(seqNumber)}
            disabled={!canGoNext}
          >
            <span>Next</span>
            {isNavTransitioning && <span className="btn-nav-pulse-dot"></span>}
          </button>
        </div>

        <div className="toolbar-right">
          {!isDragDrop && !isReviewMode && examMode !== "simulation" && settings?.includeShowAnswerBtn !== false && (
            <button
              type="button"
              className={`btn-boson-action ${isRevealed ? "disabled" : ""}`}
              onClick={() => {
                if (!isRevealed) {
                  dispatch({ type: "revealAnswer", payload: seqNumber - 1 });
                }
              }}
              disabled={isRevealed}
            >
              {isRevealed ? "✓ Answer Revealed" : "Show Answer"}
            </button>
          )}

          <button
            type="button"
            className="btn-boson-action"
            onClick={() => setShowPaletteModal(true)}
          >
            Question Review
          </button>

          {isReviewMode ? (
            <button
              type="button"
              className="btn-boson-action btn-grade btn-exit-review"
              onClick={onExitReview}
            >
              ⌂ Exit Review / Score Report
            </button>
          ) : (
            <button
              type="button"
              className="btn-boson-action btn-grade"
              onClick={handleGradeClick}
            >
              Grade Exam
            </button>
          )}
        </div>
      </div>

      {/* CUSTOM CONFIRMATION MODAL */}
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

      {/* QUESTION REVIEW / PALETTE MODAL */}
      {showPaletteModal && (
        <QuestionPaletteModal
          numQuestions={numQuestions}
          currentIndex={seqNumber - 1}
          answers={answers}
          questions={questions}
          flaggedQuestions={flaggedQuestions}
          comments={currentBankNotes}
          onSelectQuestion={onGoToQuestion}
          onClose={() => setShowPaletteModal(false)}
        />
      )}

      {/* QUESTION NOTES & EXPORT MODAL */}
      {isAllNotesModalOpen && (
        <QuestionNotesModal
          comments={currentBankNotes}
          allQuestions={questions}
          onSelectQuestion={(targetIdx) => onGoToQuestion(targetIdx)}
          onDeleteComment={(qId) => handleDeleteComment(qId)}
          onClose={() => setIsAllNotesModalOpen(false)}
        />
      )}



      {/* EXAM PAUSED BLUR OVERLAY & RESUME MODAL */}
      {isPaused && (
        <div
          className="exam-paused-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="paused-dialog-title"
        >
          <div className="exam-paused-modal">
            <div className="paused-icon-pulse-wrapper">
              <div className="paused-pulse-glow"></div>
              <div className="paused-icon-badge">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4.5" height="16" rx="1.5" />
                  <rect x="13.5" y="4" width="4.5" height="16" rx="1.5" />
                </svg>
              </div>
            </div>

            <h2 id="paused-dialog-title" className="paused-modal-title">
              Exam Paused
            </h2>

            <p className="paused-modal-subtitle">
              Your exam timer is stopped and question content is hidden.
              Take a break and resume whenever you are ready!
            </p>

            <div className="paused-modal-stats-grid">
              <div className="paused-stat-card">
                <span className="paused-stat-label">Current Question</span>
                <span className="paused-stat-value">#{seqNumber} of {numQuestions}</span>
              </div>
              {secondsRemaining !== null && (
                <div className="paused-stat-card highlight">
                  <span className="paused-stat-label">Timer Paused At</span>
                  <span className="paused-stat-value paused-timer-highlight">
                    ⏱️ {formatTime(secondsRemaining)}
                  </span>
                </div>
              )}
              <div className="paused-stat-card">
                <span className="paused-stat-label">Exam Mode</span>
                <span className="paused-stat-value">
                  {examMode === "sim" ? "⏱️ Simulation" : "📖 Study Mode"}
                </span>
              </div>
            </div>

            <div className="paused-modal-actions">
              <button
                type="button"
                className="btn-paused-resume-primary"
                onClick={onTogglePause}
                autoFocus
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Resume Exam</span>
              </button>

              <button
                type="button"
                className="btn-paused-exit-secondary"
                onClick={handleExitClick}
              >
                <span>Save & Return to Menu</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR FOR ACTIVE EXAMS */}
      <MobileBottomBar
        isExamActive={true}
        onOpenNotes={() => setIsNoteBoxOpen(true)}
        notesCount={currentBankNotesCount}
        onOpenReviewMatrix={() => setShowPaletteModal(true)}
        onGradeExam={handleGradeClick}
        isReviewMode={isReviewMode}
        onExitReview={onExitReview}
        onToggleFlag={() => onToggleFlag(seqNumber - 1)}
        isCurrentFlagged={isFlagged}
        isPaused={isPaused}
        onTogglePause={onTogglePause}
      />
    </div>
  );
}

export default QuestionView;
