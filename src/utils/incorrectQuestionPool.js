import { getExamQuestionStats } from "./examScoring";

export function getQuestionKey(question, fallbackIndex) {
  const prompt = String(question?.question || "").trim();
  const options = Array.isArray(question?.options) ? question.options.join("|") : "";

  // Content is the stable identity across banks. Some copies of the same
  // source question have different database IDs, so IDs alone cannot prevent
  // duplicates when filters are combined.
  if (prompt) {
    // Prompt identity remains stable even when answer randomization changes
    // option order between exam attempts.
    return `prompt:${prompt.toLowerCase().replace(/\s+/g, " ")}`;
  }

  if (options) {
    return `options:${options.toLowerCase().replace(/\s+/g, " ")}`;
  }

  if (question?.id !== undefined && question.id !== null) {
    return `id:${question.id}`;
  }

  return `index:${fallbackIndex}`;
}

function sortNewestFirst(records) {
  return [...(Array.isArray(records) ? records : [])].sort((a, b) => {
    const toTime = (record) => {
      const value = record?.date || record?.completedAt || record?.finishedAt || 0;
      const timestamp = typeof value === "string" ? new Date(value).getTime() : Number(value);
      return Number.isFinite(timestamp) ? timestamp : 0;
    };
    return toTime(b) - toTime(a);
  });
}

function getQuestionStatesFromHistory(pastExams = []) {
  const statesByQuestion = new Map();

  sortNewestFirst(pastExams).forEach((record) => {
    if (!Array.isArray(record?.questions) || record.questions.length === 0) return;

    const stats = getExamQuestionStats(record.questions, record.answers || []);
    const incorrectIndices = new Set(stats.incorrectIndices);
    const markedIndices = new Set(Array.isArray(record.flaggedQuestions) ? record.flaggedQuestions : []);

    record.questions.forEach((question, index) => {
      const key = getQuestionKey(question, index);
      const existing = statesByQuestion.get(key);
      if (!existing) {
        statesByQuestion.set(key, {
          question,
          isIncorrect: incorrectIndices.has(index),
          isMarked: markedIndices.has(index),
        });
      } else {
        existing.isIncorrect = existing.isIncorrect || incorrectIndices.has(index);
        existing.isMarked = existing.isMarked || markedIndices.has(index);
      }
    });
  });

  return [...statesByQuestion.values()];
}

/**
 * Returns every question answered incorrectly in the user's exam history.
 * Questions are deduplicated across banks and retakes.
 */
export function getAllBanksIncorrectQuestions(pastExams = []) {
  return getQuestionStatesFromHistory(pastExams)
    .filter(({ isIncorrect }) => isIncorrect)
    .map(({ question }) => question);
}

/** Returns every question marked for review anywhere in the user's history. */
export function getAllBanksMarkedQuestions(pastExams = []) {
  return getQuestionStatesFromHistory(pastExams)
    .filter(({ isMarked }) => isMarked)
    .map(({ question }) => question);
}

/** Matches every word in a keyword query against prompt, options, and metadata. */
export function getKeywordQuestions(allQuestions = [], query = "") {
  const terms = String(query || "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (terms.length === 0) return [];

  const seen = new Set();
  return (Array.isArray(allQuestions) ? allQuestions : []).filter((question, index) => {
    const haystack = [
      question?.questionNo,
      question?.question,
      ...(Array.isArray(question?.options) ? question.options : []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const key = getQuestionKey(question, index);
    if (!terms.every((term) => haystack.includes(term)) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Merges source lists in UI order and removes duplicate questions. */
export function mergeUniqueQuestions(...lists) {
  const seen = new Set();
  const merged = [];
  lists.flatMap((list) => (Array.isArray(list) ? list : [])).forEach((question, index) => {
    const key = getQuestionKey(question, index);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(question);
    }
  });
  return merged;
}
