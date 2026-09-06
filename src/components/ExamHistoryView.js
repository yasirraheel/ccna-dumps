import React, { useState, useEffect } from "react";
import NavigationMenu from "./NavigationMenu";
import CustomConfirmModal from "./CustomConfirmModal";
import FinishScreen from "./FinishScreen";
import { getExamQuestionStats } from "../utils/examScoring";

function ExamHistoryView({
  pastExams = [],
  onNavigate,
  candidateName,
  onClearHistory,
  onReviewExam,
  onRetakeAll,
  onRetakeFlagged,
  onRetakeIncorrect,
  onDeleteRecord,
  currentUser,
  onOpenAuth,
  onLogout,
}) {
  const [selectedReportExam, setSelectedReportExam] = useState(null);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  useEffect(() => {
    const handleDocClick = () => setOpenActionMenuId(null);
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Delete",
    cancelText: "Cancel",
    type: "danger",
    onConfirm: () => {},
  });

  const cleanBankTitle = (name) => {
    if (!name) return "";
    return String(name)
      .replace(/spoto-?/gi, "")
      .replace(/\(\s*\)/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  const handleDeleteItemClick = (exam) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Exam Record?",
      message: `Are you sure you want to delete the completed record for "${cleanBankTitle(exam.bankName || "CCNA Exam")}"? This action cannot be undone.`,
      confirmText: "Delete Record",
      cancelText: "Cancel",
      type: "danger",
      onConfirm: () => {
        onDeleteRecord(exam.id);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleClearAllClick = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Clear All Exam History?",
      message: "Are you sure you want to permanently delete all completed exam records? All past scores and review histories will be lost.",
      confirmText: "Clear All History",
      cancelText: "Cancel",
      type: "danger",
      onConfirm: () => {
        onClearHistory();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  return (
    <div className="exam-history-page">
      <NavigationMenu
        currentView="history"
        onNavigate={onNavigate}
        candidateName={candidateName}
        currentUser={currentUser}
        onOpenAuth={onOpenAuth}
        onLogout={onLogout}
        pageTitle="Exam History"
      />

      <div className="history-content history-content-fullwidth">
        <div className="history-header-row">
          <div>
            <h2 className="history-section-title">Completed Exam History</h2>
            <p className="history-section-subtitle">
              Review previous exam attempts, re-test missed or marked questions, and track score progress.
            </p>
          </div>
          {pastExams.length > 0 && (
            <button
              type="button"
              className="btn-clear-history"
              onClick={handleClearAllClick}
            >
              🗑️ Clear All History
            </button>
          )}
        </div>

        {pastExams.length === 0 ? (
          <div className="empty-history-card">
            <span className="empty-icon">📊</span>
            <h3>No past exam records found</h3>
            <p>Once you finish and grade an exam, your detailed score records, review options, and retake actions will appear here.</p>
            <button
              type="button"
              className="btn-start-new-exam-home"
              onClick={() => onNavigate("dashboard")}
            >
              + Start an Exam
            </button>
          </div>
        ) : (
          <div className="history-rows-list">
            {pastExams.map((exam, idx) => {
              const dateStr = exam.date
                ? new Date(exam.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Recent";

              const flaggedCount = exam.flaggedQuestions ? exam.flaggedQuestions.length : 0;
              const hasQuestions = exam.questions && exam.questions.length > 0;
              const pctNum = parseFloat(exam.percentage) || 0;
              const isPassed = exam.passed;
              const examStats = hasQuestions ? getExamQuestionStats(exam.questions, exam.answers) : null;
              const nonCorrectCount = examStats ? examStats.nonCorrectIndices.length : 0;
              const incorrectCount = examStats ? examStats.incorrect : 0;
              const unansweredCount = examStats ? examStats.unanswered : 0;

              const isOpen = openActionMenuId === (exam.id || idx);
              return (
                <div
                  key={exam.id || idx}
                  className={`history-full-card is-clickable ${isPassed ? "pass-border" : "fail-border"} ${isOpen ? "has-open-dropdown" : ""}`}
                  style={isOpen ? { zIndex: 1000, position: "relative" } : undefined}
                  onClick={() => setSelectedReportExam(exam)}
                  title="Click card to view detailed Score Report"
                >
                  {/* TOP HEADER BAR */}
                  <div className="history-card-top-bar">
                    <div className="history-title-group">
                      <span className="history-badge-cert">Cisco 200-301 CCNA</span>
                      <h3 className="history-card-bank-name">{cleanBankTitle(exam.bankName || "CCNA Exam")}</h3>
                      <span className="history-card-date">🕒 {dateStr}</span>
                    </div>

                    <div className="history-header-actions-right">
                      <span
                        className={`history-result-badge-large ${
                          isPassed ? "badge-pass-lg" : "badge-fail-lg"
                        }`}
                      >
                        {isPassed ? "PASS ✓" : "FAIL ✕"}
                      </span>

                      {onDeleteRecord && (
                        <button
                          type="button"
                          className="btn-history-delete-pill"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItemClick(exam);
                          }}
                          title="Delete this exam record"
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </div>

                  {/* METRICS ROW */}
                  <div className="history-metrics-grid">
                    <div className="history-metric-box">
                      <span className="metric-lbl">Raw Score</span>
                      <strong className="metric-val">{exam.score} / {exam.maxScore || 1000}</strong>
                      <span className="metric-sub">Points Earned</span>
                    </div>

                    <div className="history-metric-box">
                      <span className="metric-lbl">Percentage</span>
                      <strong className={`metric-val ${isPassed ? "text-green" : "text-danger"}`}>
                        {exam.percentage}%
                      </strong>
                      <span className="metric-sub">Overall Accuracy</span>
                    </div>

                    <div className="history-metric-box">
                      <span className="metric-lbl">Passing Score</span>
                      <strong className="metric-val">82.5%</strong>
                      <span className="metric-sub">Required Mark</span>
                    </div>

                    <div className="history-metric-box">
                      <span className="metric-lbl">Total Questions</span>
                      <strong className="metric-val">
                        {exam.totalQuestions || (exam.questions ? exam.questions.length : 0)} Qs
                      </strong>
                      <span className="metric-sub">
                        {flaggedCount > 0 ? `⚑ ${flaggedCount} marked` : "Completed"}
                      </span>
                    </div>
                  </div>

                  {/* BOSON SCORE PROGRESS BAR */}
                  <div className="history-score-bar-wrapper">
                    <div className="history-score-bar-bg">
                      <div
                        className={`history-score-bar-fill ${isPassed ? "fill-pass" : "fill-fail"}`}
                        style={{ width: `${Math.min(100, Math.max(0, pctNum))}%` }}
                      ></div>
                      {/* 82.5% passing marker */}
                      <div className="history-score-bar-marker" style={{ left: "82.5%" }}>
                        <div className="marker-tooltip">▲ 82.5% Passing</div>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS BAR */}
                  {hasQuestions && (
                    <div className="history-full-actions-bar" onClick={(e) => e.stopPropagation()}>
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

                            <button
                              type="button"
                              className="card-dropdown-item item-retake-all"
                              onClick={() => {
                                setOpenActionMenuId(null);
                                onRetakeAll(exam);
                              }}
                            >
                              <span className="dropdown-item-icon">↺</span>
                              <span className="dropdown-item-label">Retake All Questions</span>
                              <span className="dropdown-item-badge badge-all">
                                {exam.totalQuestions || (exam.questions ? exam.questions.length : 0)}&nbsp;Qs
                              </span>
                            </button>

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

                            <button
                              type="button"
                              className={`card-dropdown-item item-retake-incorrect ${nonCorrectCount === 0 ? "disabled" : ""}`}
                              disabled={nonCorrectCount === 0}
                              title={
                                nonCorrectCount > 0
                                  ? unansweredCount > 0
                                    ? `${incorrectCount} incorrect, ${unansweredCount} missed`
                                    : `${incorrectCount} answered incorrectly`
                                  : "All questions were correct!"
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
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

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
                  ? selectedReportExam.questions.reduce((a, b) => a + (b.points || 1), 0)
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
                onReviewExam(target);
              }}
              onRetakeAll={() => {
                const target = selectedReportExam;
                setSelectedReportExam(null);
                onRetakeAll(target);
              }}
              onRetakeFlagged={() => {
                const target = selectedReportExam;
                setSelectedReportExam(null);
                onRetakeFlagged(target);
              }}
              onRetakeIncorrect={() => {
                const target = selectedReportExam;
                setSelectedReportExam(null);
                onRetakeIncorrect(target);
              }}
              onClose={() => setSelectedReportExam(null)}
              backButtonLabel="← Back to Exam History"
            />
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
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

export default ExamHistoryView;
