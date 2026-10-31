import React, { useEffect, useMemo, useState } from "react";

const LAB_PROGRESS_PREFIX = "ccna_lab_progress_";

function getCandidateInitials(name) {
  if (!name || !name.trim()) return "CC";
  const parts = name.trim().split(/\s+/);
  return parts.length === 1
    ? parts[0].slice(0, 2).toUpperCase()
    : `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function readSavedProgress(sessionId, questionId) {
  if (!sessionId || !questionId) return null;
  try {
    const raw = localStorage.getItem(`${LAB_PROGRESS_PREFIX}${sessionId}_${questionId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function LabSolutionSlice({ sourceImage, sourceWidth, sourceHeight, slice }) {
  if (!slice) return null;

  const imageWidth = `${(sourceWidth / slice.width) * 100}%`;
  const translateX = `${(slice.x / sourceWidth) * -100}%`;
  const translateY = `${(slice.y / sourceHeight) * -100}%`;

  return (
    <div
      className="lab-solution-slice"
      style={{ aspectRatio: `${slice.width} / ${slice.height}` }}
    >
      <img
        src={sourceImage}
        alt="Revealed lab solution"
        style={{
          width: imageWidth,
          maxWidth: "none",
          transform: `translate(${translateX}, ${translateY})`,
        }}
      />
    </div>
  );
}

function LabView({
  question,
  seqNumber,
  numQuestions,
  selectedBankName,
  candidateName,
  activeSessionId,
  onGoToQuestion,
  onExitToDashboard,
  isNavSaving = false,
}) {
  const tasks = Array.isArray(question?.tasks) ? question.tasks : [];
  const [revealedTasks, setRevealedTasks] = useState([]);
  const [rating, setRating] = useState(null);

  const progressStorageKey = useMemo(
    () => `${LAB_PROGRESS_PREFIX}${activeSessionId || "local"}_${question?.id || seqNumber}`,
    [activeSessionId, question?.id, seqNumber]
  );

  useEffect(() => {
    const saved = readSavedProgress(activeSessionId || "local", question?.id || seqNumber);
    setRevealedTasks(Array.isArray(saved?.revealedTasks) ? saved.revealedTasks : []);
    setRating(saved?.rating || null);
  }, [activeSessionId, question?.id, seqNumber]);

  const persistProgress = (nextRevealedTasks, nextRating) => {
    try {
      localStorage.setItem(
        progressStorageKey,
        JSON.stringify({
          revealedTasks: nextRevealedTasks,
          rating: nextRating,
          updatedAt: Date.now(),
        })
      );
    } catch {
      // Progress remains available for the current view even if storage is unavailable.
    }
  };

  const revealTask = (taskIndex) => {
    // Tasks must be opened in order so the lab behaves like a guided walkthrough.
    if (taskIndex > revealedTasks.length) return;
    if (revealedTasks.includes(taskIndex)) return;
    const next = [...revealedTasks, taskIndex];
    setRevealedTasks(next);
    persistProgress(next, rating);
  };

  const chooseRating = (nextRating) => {
    setRating(nextRating);
    persistProgress(revealedTasks, nextRating);
  };

  const allSolutionsRevealed = tasks.length > 0 && revealedTasks.length >= tasks.length;
  const canGoNext = seqNumber < numQuestions;
  const canProceed = allSolutionsRevealed && Boolean(rating);
  const initials = getCandidateInitials(candidateName);
  const bankLabel = selectedBankName || "Labs";

  const handleNext = async () => {
    if (!canProceed || isNavSaving) return;
    if (canGoNext && onGoToQuestion) {
      await onGoToQuestion(seqNumber);
      return;
    }
    if (onExitToDashboard) onExitToDashboard();
  };

  return (
    <div className="boson-exsim-view lab-exsim-view">
      <div className="boson-top-bar lab-top-bar">
        <div className="top-bar-left-actions">
          <button
            type="button"
            className="btn-boson-back"
            onClick={onExitToDashboard}
            title="Return to Exam Bank"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Exam</span>
          </button>
        </div>
        <div className="top-bar-right-group">
          <div className="boson-user-avatar" title={candidateName ? `Candidate: ${candidateName}` : "CCNA Candidate"}>
            <span>{initials}</span>
          </div>
        </div>
      </div>

      <main className="lab-main-content">
        <div className="lab-context-card">
          <span className="lab-context-label">{bankLabel}</span>
          <span className="lab-context-progress">{question?.labItemLabel || `ITEM ${seqNumber}`}</span>
        </div>

        <section className="lab-question-card" aria-labelledby="lab-item-title">
          <div className="lab-item-heading-row">
            <div>
              <span className="lab-eyebrow">Guided configuration lab</span>
              <h1 id="lab-item-title">{question?.labItemLabel || `ITEM ${seqNumber}`}</h1>
            </div>
            <span className="lab-question-count">Lab {seqNumber} of {numQuestions}</span>
          </div>

          <div className="lab-source-frame" style={{ aspectRatio: `${question?.sourceWidth || 1312} / ${question?.topologyCropHeight || 545}` }}>
            <img
              src={question?.sourceImage}
              alt="Lab topology and tasks"
              style={{ width: "100%", maxWidth: "none" }}
            />
          </div>

          <div className="lab-task-reveal-header">
            <div>
              <h2>Tasks</h2>
              <p>Select each task in order to reveal its solution.</p>
            </div>
            <span className="lab-task-progress">{Math.min(revealedTasks.length, tasks.length)} / {tasks.length} revealed</span>
          </div>

          <div className="lab-task-list">
            {tasks.map((task, taskIndex) => {
              const isRevealed = revealedTasks.includes(taskIndex);
              const isAvailable = taskIndex <= revealedTasks.length;
              return (
                <article key={task.id || taskIndex} className={`lab-task-card ${isRevealed ? "is-revealed" : ""} ${!isAvailable ? "is-locked" : ""}`}>
                  <button
                    type="button"
                    className="lab-task-toggle"
                    onClick={() => revealTask(taskIndex)}
                    disabled={!isAvailable || isRevealed}
                    aria-expanded={isRevealed}
                  >
                    <span className="lab-task-number">{taskIndex + 1}</span>
                    <span className="lab-task-copy">
                      <strong>{task.label}</strong>
                      <span>{isRevealed ? "Solution revealed" : isAvailable ? "Click to reveal solution" : "Complete the previous task first"}</span>
                    </span>
                    <span className="lab-task-chevron" aria-hidden="true">{isRevealed ? "✓" : isAvailable ? "→" : "•"}</span>
                  </button>

                  <div className="lab-task-prompt">{task.text}</div>

                  {isRevealed && (
                    <div className="lab-solution-panel">
                      <div className="lab-solution-heading">Solution</div>
                      <LabSolutionSlice
                        sourceImage={question.sourceImage}
                        sourceWidth={question.sourceWidth || 1312}
                        sourceHeight={question.sourceHeight || 1199}
                        slice={task.solutionSlice}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {allSolutionsRevealed && (
            <section className="lab-rating-card" aria-labelledby="lab-rating-heading">
              <div>
                <span className="lab-rating-eyebrow">All solutions revealed</span>
                <h2 id="lab-rating-heading">How difficult was this lab?</h2>
                <p>Your rating is saved for your next Labs review.</p>
              </div>
              <div className="lab-rating-actions" role="group" aria-label="Rate this lab">
                {["again", "hard", "easy"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`lab-rating-button rating-${value} ${rating === value ? "selected" : ""}`}
                    onClick={() => chooseRating(value)}
                  >
                    {value === "again" ? "Again" : value[0].toUpperCase() + value.slice(1)}
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="lab-footer-actions">
            <button type="button" className="btn-boson-nav" onClick={onExitToDashboard}>Save & Exit</button>
            <button
              type="button"
              className={`btn-boson-action btn-lab-next ${!canProceed || isNavSaving ? "disabled" : ""}`}
              disabled={!canProceed || isNavSaving}
              onClick={handleNext}
            >
              {isNavSaving
                ? "Saving…"
                : !allSolutionsRevealed
                ? "Reveal all tasks"
                : !rating
                ? "Choose a rating"
                : canGoNext
                ? "Next Lab →"
                : "Finish Labs"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LabView;
