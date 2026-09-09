import React, { useState } from "react";
import { isQuestionAnswerCorrect } from "../utils/examScoring";

function QuestionPaletteModal({
  numQuestions,
  currentIndex,
  answers,
  questions,
  flaggedQuestions = [],
  comments = {},
  onSelectQuestion,
  onClose,
}) {
  const [filter, setFilter] = useState("all"); // 'all' | 'incorrect' | 'correct' | 'flagged' | 'notes' | 'unanswered' | 'answered'

  const getStatus = (idx) => {
    const isFlagged = flaggedQuestions.includes(idx);
    const qObj = questions[idx];
    const qKey = qObj?.id || qObj?.questionNo || idx + 1;
    const hasNote = Boolean(comments[qKey] || comments[qObj?.id] || comments[String(qObj?.id)]);
    const ans = answers[idx];

    const isAnswered =
      ans !== null &&
      ans !== undefined &&
      ans !== "" &&
      (typeof ans === "number" ||
        typeof ans === "string" ||
        ans?.confirmed === true ||
        (Array.isArray(ans) && ans.length > 0) ||
        (Array.isArray(ans?.selections) && ans.selections.length > 0) ||
        (ans?.matches && Object.keys(ans.matches).length > 0));

    let isCorrect = false;
    let isIncorrect = false;

    if (isAnswered) {
      isCorrect = isQuestionAnswerCorrect(qObj, ans);
      isIncorrect = !isCorrect;
    }

    return { isFlagged, isAnswered, hasNote, isCorrect, isIncorrect };
  };

  const allStatuses = Array.from({ length: numQuestions }, (_, i) => getStatus(i));

  const filteredIndices = Array.from({ length: numQuestions }, (_, i) => i).filter(
    (idx) => {
      const { isFlagged, isAnswered, hasNote, isCorrect, isIncorrect } = allStatuses[idx];
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
          <button
            type="button"
            className={`tab-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({numQuestions})
          </button>
          <button
            type="button"
            className={`tab-btn tab-btn-incorrect ${filter === "incorrect" ? "active active-incorrect" : ""}`}
            onClick={() => setFilter("incorrect")}
          >
            ❌ Incorrect ({incorrectCount})
          </button>
          <button
            type="button"
            className={`tab-btn tab-btn-correct ${filter === "correct" ? "active active-correct" : ""}`}
            onClick={() => setFilter("correct")}
          >
            ✅ Correct ({correctCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${filter === "flagged" ? "active" : ""}`}
            onClick={() => setFilter("flagged")}
          >
            🚩 Marked ({flaggedCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${filter === "notes" ? "active" : ""}`}
            onClick={() => setFilter("notes")}
          >
            💬 Notes ({notesCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${filter === "unanswered" ? "active" : ""}`}
            onClick={() => setFilter("unanswered")}
          >
            Incomplete ({unansweredCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${filter === "answered" ? "active" : ""}`}
            onClick={() => setFilter("answered")}
          >
            Answered ({answeredCount})
          </button>
        </div>

        {/* Legend */}
        <div className="palette-legend">
          <span className="legend-item">
            <span className="legend-dot dot-active"></span> Current
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-correct"></span> Correct
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-incorrect"></span> Incorrect
          </span>
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
              const { isFlagged, isAnswered, hasNote, isCorrect, isIncorrect } = allStatuses[i];

              let statusClass = "palette-cell";
              if (isActive) statusClass += " cell-active";
              else if (isIncorrect) statusClass += " cell-incorrect";
              else if (isCorrect) statusClass += " cell-correct cell-answered";
              else if (isAnswered) statusClass += " cell-answered";
              else statusClass += " cell-unanswered";

              if (isFlagged) statusClass += " cell-flagged";
              if (hasNote) statusClass += " cell-has-note";

              const qNo = questions[i]?.questionNo || `Q${i + 1}`;

              return (
                <button
                  key={i}
                  type="button"
                  className={statusClass}
                  onClick={() => {
                    onSelectQuestion(i);
                    onClose();
                  }}
                  title={`${qNo}${isIncorrect ? " (Incorrect)" : isCorrect ? " (Correct)" : ""}`}
                >
                  {isFlagged && <span className="cell-flag-pin">🚩</span>}
                  {hasNote && <span className="cell-note-pin">💬</span>}
                  <span>{i + 1}</span>
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
