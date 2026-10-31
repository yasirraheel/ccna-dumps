import React, { useEffect, useMemo, useState } from "react";
import QuestionPaletteModal from "./QuestionPaletteModal";

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

function LabSolution({ task, fallbackImage, fallbackWidth, fallbackHeight }) {
  const solutionImage = task?.solutionImage || fallbackImage;
  const solutionWidth = task?.solutionWidth || fallbackWidth;
  const solutionHeight = task?.solutionHeight || fallbackHeight;
  const hasWrittenCommands = Boolean(task?.commandText?.trim());

  if (!solutionImage && !hasWrittenCommands) return null;

  return (
    <div className="lab-solution-content">
      {hasWrittenCommands && (
        <pre className="lab-solution-command" aria-label="Written command solution">
          {task.commandText}
        </pre>
      )}
      {solutionImage && (
        task.solutionSlice ? (
          <LabSolutionSlice
            sourceImage={solutionImage}
            sourceWidth={solutionWidth}
            sourceHeight={solutionHeight}
            slice={task.solutionSlice}
          />
        ) : (
          <div className="lab-solution-image-wrap">
            <img src={solutionImage} alt="Revealed lab solution" />
          </div>
        )
      )}
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
  isPaused = false,
  onTogglePause,
  isFlagged = false,
  onToggleFlag,
  questions = [],
  answers = [],
  flaggedQuestions = [],
}) {
  const tasks = Array.isArray(question?.tasks) ? question.tasks : [];
  const [revealedTasks, setRevealedTasks] = useState([]);
  const [rating, setRating] = useState(null);
  const [labNote, setLabNote] = useState("");
  const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false);
  const [showReviewMatrix, setShowReviewMatrix] = useState(false);

  const progressStorageKey = useMemo(
    () => `${LAB_PROGRESS_PREFIX}${activeSessionId || "local"}_${question?.id || seqNumber}`,
    [activeSessionId, question?.id, seqNumber]
  );

  useEffect(() => {
    const saved = readSavedProgress(activeSessionId || "local", question?.id || seqNumber);
    setRevealedTasks(Array.isArray(saved?.revealedTasks) ? saved.revealedTasks : []);
    setRating(saved?.rating || null);
    setLabNote(saved?.note || "");
  }, [activeSessionId, question?.id, seqNumber]);

  const persistProgress = (nextRevealedTasks, nextRating, nextNote = labNote) => {
    try {
      localStorage.setItem(
        progressStorageKey,
        JSON.stringify({
          revealedTasks: nextRevealedTasks,
          rating: nextRating,
          note: nextNote,
          updatedAt: Date.now(),
        })
      );
    } catch {
      // Progress remains available for the current view even if storage is unavailable.
    }
  };

  const revealTask = (taskIndex) => {
    // Tasks must be opened in order so the lab behaves like a guided walkthrough.
    if (isPaused) return;
    if (taskIndex > revealedTasks.length) return;
    if (revealedTasks.includes(taskIndex)) return;
    const next = [...revealedTasks, taskIndex];
    setRevealedTasks(next);
    persistProgress(next, rating);
  };

  const chooseRating = (nextRating) => {
    if (isPaused) return;
    setRating(nextRating);
    persistProgress(revealedTasks, nextRating);
  };

  const saveLabNote = () => {
    persistProgress(revealedTasks, rating, labNote);
    setIsNoteEditorOpen(false);
  };

  const allSolutionsRevealed = tasks.length > 0 && revealedTasks.length >= tasks.length;
  const canGoNext = seqNumber < numQuestions;
  const canProceed = allSolutionsRevealed && Boolean(rating);
  const initials = getCandidateInitials(candidateName);
  const bankLabel = selectedBankName || "Labs";
  const sourceWidth = question?.sourceWidth || 1312;
  const sourceHeight = question?.sourceHeight || 1199;
  const sourceDisplayWidth = question?.sourceDisplayWidth || sourceWidth;
  const sourceDisplayHeight = question?.sourceDisplayHeight || question?.topologyCropHeight || sourceHeight;
  const sourceParts = Array.isArray(question?.sourceParts) ? question.sourceParts : [];
  const topologyParts = sourceParts.filter((part) => /topology/i.test(`${part.id || ""} ${part.alt || ""}`));
  const taskReferenceParts = sourceParts.filter((part) => !/topology/i.test(`${part.id || ""} ${part.alt || ""}`));

  const handleNext = async () => {
    if (!canProceed || isNavSaving) return;
    if (canGoNext && onGoToQuestion) {
      await onGoToQuestion(seqNumber);
      return;
    }
    if (onExitToDashboard) onExitToDashboard();
  };

  return (
    <div className={`boson-exsim-view lab-exsim-view ${isPaused ? "is-paused" : ""}`}>
      <div className="boson-slim-transition-track" aria-hidden="true">
        <div className="boson-slim-transition-bar" />
        <div className="boson-slim-transition-glow" />
      </div>

      <div className="boson-top-bar">
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

      <div className="boson-exam-info-card lab-exam-info-card">
        <div className="boson-exam-context-row">
          <div className="top-bar-bank-tag context-bank-tag" title={`Currently attempting: ${bankLabel}`}>
            <span className="bank-tag-name">{bankLabel}</span>
          </div>
          <div className="context-actions">
            {onTogglePause && (
              <button
                type="button"
                className={`btn-boson-pause ${isPaused ? "is-paused" : ""}`}
                onClick={onTogglePause}
                title={isPaused ? "Resume Lab" : "Pause Lab"}
              >
                {isPaused ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                    <span>Pause</span>
                  </>
                )}
              </button>
            )}
            <div className={`btn-top-notes-summary ${labNote ? "has-notes" : ""}`} aria-label={`Lab notes (${labNote ? 1 : 0})`}>
              <span>💬 Notes ({labNote ? 1 : 0})</span>
            </div>
          </div>
        </div>

        <div className="boson-main-header">
          <div className="boson-title-bank-row">
            <h1 className="boson-exam-title">Cisco 200-301 CCNA Exam Simulator</h1>
          </div>
          <div className="boson-sub-header">
            <div className="boson-sub-left">
              <div className="boson-mobile-summary-row">
                <span className="boson-q-count">Lab {seqNumber} of {numQuestions}</span>
                <span className="boson-dot-sep">•</span>
                <span className="boson-live-score">Guided practice</span>
              </div>
              <div className="boson-mobile-detail-row">
                <span className="boson-qno-pill">{question?.labItemLabel || `ITEM ${seqNumber}`}</span>
              </div>
            </div>
            <div className="boson-sub-right-actions">
              <button
                type="button"
                className="btn-boson-action lab-quick-review-button"
                onClick={() => setShowReviewMatrix(true)}
                title="Open quick question review"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
                <span>Question Review</span>
              </button>
              <button
                type="button"
                className="btn-boson-source-toggle"
                onClick={() => document.getElementById("lab-source-image")?.scrollIntoView({ behavior: "smooth", block: "center" })}
              >
                <svg className="source-svg-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span>Original Source</span>
              </button>
              <button
                type="button"
                className={`btn-boson-note-toggle ${labNote ? "has-active-note" : ""}`}
                onClick={() => setIsNoteEditorOpen((previous) => !previous)}
              >
                <svg className="note-svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>{labNote ? "Note Attached ✓" : "Add Note"}</span>
              </button>
              <button
                type="button"
                className={`btn-boson-flag ${isFlagged ? "is-flagged" : ""}`}
                onClick={() => onToggleFlag?.(seqNumber - 1)}
              >
                <svg className="flag-svg-icon flag-outline" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
                </svg>
                <span>{isFlagged ? "Marked for Review" : "Mark for Review"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="boson-question-body lab-main-content">
        <section className="lab-question-card" aria-label="Lab topology and tasks">
          <div className="lab-study-layout">
            <aside className="lab-topology-column" aria-label="Lab topology">
              <div className="lab-topology-heading">Topology</div>
              {sourceParts.length > 0 ? (
                <div id="lab-source-image" className="lab-source-parts">
                  {(topologyParts.length > 0 ? topologyParts : sourceParts).map((part) => (
                    <img key={part.id || part.src} src={part.src} alt={part.alt || "Original lab resource"} />
                  ))}
                </div>
              ) : (
                <div
                  id="lab-source-image"
                  className={`lab-source-frame ${question?.sourceDisplayHeight ? "lab-source-cropped" : "lab-source-complete"}`}
                  style={{ aspectRatio: `${sourceDisplayWidth} / ${sourceDisplayHeight}` }}
                >
                  <img
                    src={question?.sourceImage}
                    alt="Lab topology and tasks"
                    style={{ width: `${(sourceWidth / sourceDisplayWidth) * 100}%`, maxWidth: "none" }}
                  />
                </div>
              )}
            </aside>

            <div className="lab-tasks-column">

              {taskReferenceParts.length > 0 && (
                <div className="lab-task-reference" aria-label="Original task reference">
                  {taskReferenceParts.map((part) => (
                    <img key={part.id || part.src} src={part.src} alt={part.alt || "Original lab task reference"} />
                  ))}
                </div>
              )}

              {isNoteEditorOpen && (
            <div className="lab-note-editor">
              <textarea
                value={labNote}
                onChange={(event) => setLabNote(event.target.value)}
                placeholder="Add a note about this lab"
                aria-label="Lab note"
              />
              <div className="lab-note-editor-actions">
                <button type="button" className="btn-boson-nav" onClick={() => setIsNoteEditorOpen(false)}>Cancel</button>
                <button type="button" className="btn-boson-action" onClick={saveLabNote}>Save Note</button>
              </div>
            </div>
          )}

              <div className="lab-task-reveal-header">
            <div>
              <h2>Tasks</h2>
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
                    </span>
                    <span className="lab-task-chevron" aria-hidden="true">{isRevealed ? "✓" : isAvailable ? "→" : "•"}</span>
                  </button>

                  <div className="lab-task-prompt">{task.text}</div>

                  {isRevealed && (
                    <div className="lab-solution-panel">
                      <div className="lab-solution-heading">Solution</div>
                      <LabSolution
                        task={task}
                        fallbackImage={question.sourceImage}
                        fallbackWidth={sourceWidth}
                        fallbackHeight={sourceHeight}
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
            <div className="lab-footer-right-actions">
              <button type="button" className="btn-boson-action lab-footer-review-button" onClick={() => setShowReviewMatrix(true)}>
                Question Review
              </button>
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
              </div>
            </div>
          </div>
        </section>
      </main>

      {showReviewMatrix && (
        <QuestionPaletteModal
          numQuestions={numQuestions}
          currentIndex={seqNumber - 1}
          answers={answers}
          questions={questions}
          flaggedQuestions={flaggedQuestions}
          comments={{}}
          revealedQuestions={[]}
          committedQuestions={[]}
          isReviewMode={false}
          onSelectQuestion={onGoToQuestion}
          onClose={() => setShowReviewMatrix(false)}
        />
      )}
    </div>
  );
}

export default LabView;
