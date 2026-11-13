import React, { useState } from "react";
import { isQuestionAnswerCorrect } from "../utils/examScoring";

function QuestionPaletteModal({
  numQuestions,
  currentIndex,
  answers,
  questions,
  flaggedQuestions = [],
  comments = {},
  revealedQuestions = [],
  committedQuestions = [],
  isReviewMode = false,
  isLabMode = false,
  labProgressByQuestion = {},
  onSelectQuestion,
  onClose,
}) {
  const [filter, setFilter] = useState("all"); // 'all' | 'incorrect' | 'correct' | 'flagged' | 'notes' | 'unanswered' | 'answered'

  const getStatus = (idx) => {
    const isFlagged = flaggedQuestions.includes(idx);
    const qObj = questions[idx];
    const qKey = qObj?.id || qObj?.questionNo || idx + 1;
    const labProgress = isLabMode
      ? (labProgressByQuestion[String(qKey)] || labProgressByQuestion[qKey] || {})
      : null;
    const hasNote = isLabMode
      ? Boolean((typeof labProgress.note === "string" && labProgress.note.trim()) || (Array.isArray(labProgress.notes) && labProgress.notes.length > 0))
      : Boolean(comments[qKey] || comments[qObj?.id] || comments[String(qObj?.id)]);
    const ans = answers[idx];

    if (isLabMode) {
      const isAgain = labProgress.rating === "again";
      const isSolved = labProgress.rating === "solved";
      const isRevealed = Array.isArray(labProgress.revealedTasks) && labProgress.revealedTasks.length > 0;
      return { isFlagged, isAnswered: isAgain || isSolved, hasNote, isCorrect: false, isIncorrect: false, isAgain, isSolved, isRevealed };
    }

    const hasResponse =
      ans !== null &&
      ans !== undefined &&
      ans !== "" &&
      (typeof ans === "number" ||
        typeof ans === "string" ||
        ans?.confirmed === true ||
        (Array.isArray(ans) && ans.length > 0) ||
        (Array.isArray(ans?.selections) && ans.selections.length > 0) ||
        (ans?.matches && Object.keys(ans.matches).length > 0));

    // A selected option remains in progress until the learner reveals it,
    // confirms a drag-and-drop answer, or moves on. This keeps the current
    // question blue until it has a final result to show.
    const isEvaluated =
      isReviewMode ||
      revealedQuestions.includes(idx) ||
      committedQuestions.includes(idx) ||
      ans?.confirmed === true;
    const isAnswered = isEvaluated;

    let isCorrect = false;
    let isIncorrect = false;

    if (isEvaluated) {
      isCorrect = hasResponse && isQuestionAnswerCorrect(qObj, ans);
      isIncorrect = !isCorrect;
    }

    return { isFlagged, isAnswered, hasNote, isCorrect, isIncorrect, isAgain: false, isSolved: false, isRevealed: false };
  };

  const allStatuses = Array.from({ length: numQuestions }, (_, i) => getStatus(i));

  const filteredIndices = Array.from({ length: numQuestions }, (_, i) => i).filter(
    (idx) => {
      const { isFlagged, isAnswered, hasNote, isCorrect, isIncorrect, isAgain, isSolved } = allStatuses[idx];
      if (isLabMode) {
        if (filter === "again") return isAgain;
        if (filter === "solved") return isSolved;
        if (filter === "unanswered") return !isAnswered;
        if (filter === "answered") return isAnswered;
        if (filter === "incorrect" || filter === "correct") return false;
      }
      if (filter === "incorrect") return isIncorrect;
      if (filter === "correct") return isCorrect;
      if (filter === "flagged") return isFlagged;
      if (filter === "notes") return hasNote;
      if (filter === "unanswered") return !isAnswered;
      if (filter === "answered") return isAnswered;
      return true;
    }
  );

  const flaggedCount = allStatuses.filter((s) => s.isFlagged).length;
  const notesCount = allStatuses.filter((s) => s.hasNote).length;
  const answeredCount = allStatuses.filter((s) => s.isAnswered).length;
  const unansweredCount = numQuestions - answeredCount;
  const correctCount = allStatuses.filter((s) => s.isCorrect).length;
  const incorrectCount = allStatuses.filter((s) => s.isIncorrect).length;
  const againCount = allStatuses.filter((s) => s.isAgain).length;
  const solvedCount = allStatuses.filter((s) => s.isSolved).length;

  return (
    <div className="palette-modal-backdrop" onClick={onClose}>
      <div className="palette-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="palette-modal-header">
          <h3 className="palette-modal-title">Question Review Matrix</h3>
          <button
            type="button"
            className="palette-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Filter Tabs */}
        <div
          className="palette-filter-tabs"
          onWheel={(e) => {
            if (e.deltaY !== 0) {
              e.currentTarget.scrollLeft += e.deltaY;
            }
          }}
        >
          {isLabMode ? (
            <>
              <button type="button" className={`tab-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All ({numQuestions})</button>
              <button type="button" className={`tab-btn tab-btn-incorrect ${filter === "again" ? "active active-incorrect" : ""}`} onClick={() => setFilter("again")}>↻ Again ({againCount})</button>
              <button type="button" className={`tab-btn tab-btn-correct ${filter === "solved" ? "active active-correct" : ""}`} onClick={() => setFilter("solved")}>✅ Solved ({solvedCount})</button>
              <button type="button" className={`tab-btn ${filter === "flagged" ? "active" : ""}`} onClick={() => setFilter("flagged")}>🚩 Marked ({flaggedCount})</button>
              <button type="button" className={`tab-btn ${filter === "notes" ? "active" : ""}`} onClick={() => setFilter("notes")}>💬 Notes ({notesCount})</button>
              <button type="button" className={`tab-btn ${filter === "unanswered" ? "active" : ""}`} onClick={() => setFilter("unanswered")}>Incomplete ({unansweredCount})</button>
            </>
          ) : (
            <>
              <button type="button" className={`tab-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All ({numQuestions})</button>
              <button type="button" className={`tab-btn tab-btn-incorrect ${filter === "incorrect" ? "active active-incorrect" : ""}`} onClick={() => setFilter("incorrect")}>❌ Incorrect ({incorrectCount})</button>
              <button type="button" className={`tab-btn tab-btn-correct ${filter === "correct" ? "active active-correct" : ""}`} onClick={() => setFilter("correct")}>✅ Correct ({correctCount})</button>
              <button type="button" className={`tab-btn ${filter === "flagged" ? "active" : ""}`} onClick={() => setFilter("flagged")}>🚩 Marked ({flaggedCount})</button>
              <button type="button" className={`tab-btn ${filter === "notes" ? "active" : ""}`} onClick={() => setFilter("notes")}>💬 Notes ({notesCount})</button>
              <button type="button" className={`tab-btn ${filter === "unanswered" ? "active" : ""}`} onClick={() => setFilter("unanswered")}>Incomplete ({unansweredCount})</button>
              <button type="button" className={`tab-btn ${filter === "answered" ? "active" : ""}`} onClick={() => setFilter("answered")}>Answered ({answeredCount})</button>
            </>
          )}
        </div>

        {/* Legend */}
        <div className="palette-legend">
          <span className="legend-item">
            <span className="legend-dot dot-active"></span> Current
          </span>
          {isLabMode ? (
            <>
              <span className="legend-item"><span className="legend-dot dot-incorrect"></span> Again</span>
              <span className="legend-item"><span className="legend-dot dot-correct"></span> Solved</span>
            </>
          ) : (<>
            <span className="legend-item"><span className="legend-dot dot-correct"></span> Correct</span>
            <span className="legend-item"><span className="legend-dot dot-incorrect"></span> Incorrect</span>
          </>)}
          <span className="legend-item">
            <span className="legend-dot dot-flagged">🚩</span> Marked
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-notes">💬</span> Has Note
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-unanswered"></span> Incomplete
          </span>
        </div>

        {/* Question Grid */}
        <div className="palette-grid">
          {filteredIndices.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
              No questions found for this filter.
            </div>
          ) : (
            filteredIndices.map((i) => {
              const isActive = i === currentIndex;
              const { isFlagged, isAnswered, hasNote, isCorrect, isIncorrect, isAgain, isSolved } = allStatuses[i];

              let statusClass = "palette-cell";
              if (isLabMode && isAgain) statusClass += " cell-incorrect";
              else if (isLabMode && isSolved) statusClass += " cell-correct cell-answered";
              else if (!isLabMode && isIncorrect) statusClass += " cell-incorrect";
              else if (!isLabMode && isCorrect) statusClass += " cell-correct cell-answered";
              else if (isActive) statusClass += " cell-active";
              else if (isAnswered) statusClass += " cell-answered";
              else statusClass += " cell-unanswered";

              if (isActive && (isCorrect || isIncorrect)) statusClass += " cell-current-result";
              if (isFlagged) statusClass += " cell-flagged";
              if (hasNote) statusClass += " cell-has-note";

              const qNo = questions[i]?.labNumber
                ? `Lab No ${questions[i].labNumber}`
                : questions[i]?.questionNo || `Q${i + 1}`;
              const cellLabel = questions[i]?.labNumber || i + 1;

              return (
                <button
                  key={i}
                  type="button"
                  className={statusClass}
                  onClick={() => {
                    onSelectQuestion(i);
                    onClose();
                  }}
                  title={`${qNo}${isLabMode && isAgain ? " (Again)" : isLabMode && isSolved ? " (Solved)" : !isLabMode && isIncorrect ? " (Incorrect)" : !isLabMode && isCorrect ? " (Correct)" : ""}${isActive ? " (Current)" : ""}`}
                >
                  {isFlagged && <span className="cell-flag-pin">🚩</span>}
                  {hasNote && <span className="cell-note-pin">💬</span>}
                  <span>{cellLabel}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionPaletteModal;
