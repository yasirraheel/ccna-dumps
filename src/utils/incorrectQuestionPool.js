import { getExamQuestionStats } from "./examScoring";

function getQuestionKey(question, fallbackIndex) {
  if (question?.id !== undefined && question.id !== null) {
    return `id:${question.id}`;
  }

  const prompt = String(question?.question || "").trim();
  const options = Array.isArray(question?.options) ? question.options.join("|") : "";
  return `content:${question?.questionNo || fallbackIndex}:${prompt}:${options}`;
}

/**
 * Returns each question whose latest completed attempt was incorrect.
 * Questions are deduplicated across banks and retakes, so learners see a
 * focused practice set instead of repeated copies of the same question.
 */
export function getAllBanksIncorrectQuestions(pastExams = []) {
  const latestOutcomeByQuestion = new Map();
  const records = [...(Array.isArray(pastExams) ? pastExams : [])].sort((a, b) => {
    const toTime = (record) => {
      const value = record?.date || record?.completedAt || record?.finishedAt || 0;
      const timestamp = typeof value === "string" ? new Date(value).getTime() : Number(value);
      return Number.isFinite(timestamp) ? timestamp : 0;
    };
    return toTime(b) - toTime(a);
  });

  records.forEach((record) => {
    if (!Array.isArray(record?.questions) || record.questions.length === 0) return;

    const stats = getExamQuestionStats(record.questions, record.answers || []);
    const incorrectIndices = new Set(stats.incorrectIndices);

    record.questions.forEach((question, index) => {
      const key = getQuestionKey(question, index);
      if (!latestOutcomeByQuestion.has(key)) {
        latestOutcomeByQuestion.set(key, {
          question,
          isIncorrect: incorrectIndices.has(index),
        });
      }
    });
  });

  return [...latestOutcomeByQuestion.values()]
    .filter(({ isIncorrect }) => isIncorrect)
    .map(({ question }) => question);
}
