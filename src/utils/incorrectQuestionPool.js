import { getExamQuestionStats } from "./examScoring";

function normalizeQuestionText(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/<[^>]*>/g, " ")
    .replace(/\bchoose\s+(one|two|all)\s+answers?\b/gi, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeOptionSet(options) {
  return (Array.isArray(options) ? options : [])
    .map((option) => normalizeQuestionText(option))
    .filter(Boolean)
    .sort()
    .join("|");
}

function containsWholeWord(text, word) {
  const normalizedText = normalizeQuestionText(text);
  const normalizedWord = normalizeQuestionText(word);
  if (!normalizedText || !normalizedWord) return false;

  const escapedWord = normalizedWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^| )${escapedWord}(?: |$)`).test(normalizedText);
}

export function getQuestionKey(question, fallbackIndex) {
  const prompt = normalizeQuestionText(question?.question);
  const options = normalizeOptionSet(question?.options);

  // Content is the stable identity across banks. Some copies of the same
  // source question have different database IDs, so IDs alone cannot prevent
  // duplicates when filters are combined.
  if (prompt) {
    // Prompt identity remains stable across harmless punctuation, HTML,
    // whitespace, and answer-instruction differences. This prevents the same
    // question from returning twice when multiple keywords match it.
    return `prompt:${prompt}`;
  }

  if (options) {
    // Sort normalized options so answer-order differences do not create a
    // second copy of the same question.
    return `options:${options}`;
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

function getBankIdentity(record) {
  const raw = record?.bankKey || record?.selectedBankKey || record?.bankName || "unknown";
  return String(raw)
    .replace(/\s*\((?:Incorrect|Missed|Retake|Flagged|Custom Review|Custom Practice)[^)]*\)/gi, "")
    .trim()
    .toLowerCase();
}

function getRecentAttemptsPerBank(pastExams = [], limit = 2) {
  const attemptsByBank = new Map();

  sortNewestFirst(pastExams).forEach((record) => {
    if (!Array.isArray(record?.questions) || record.questions.length === 0) return;
    const bank = getBankIdentity(record);
    const attempts = attemptsByBank.get(bank) || [];
    if (attempts.length < limit) {
      attempts.push(record);
      attemptsByBank.set(bank, attempts);
    }
  });

  return [...attemptsByBank.values()].flat();
}

function getQuestionStatesFromHistory(pastExams = []) {
  const statesByQuestion = new Map();

  getRecentAttemptsPerBank(pastExams, 2).forEach((record) => {

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
 * Returns every question answered incorrectly in each bank's two most recent
 * completed attempts. Questions are deduplicated across banks and retakes.
 */
export function getAllBanksIncorrectQuestions(pastExams = []) {
  return getQuestionStatesFromHistory(pastExams)
    .filter(({ isIncorrect }) => isIncorrect)
    .map(({ question }) => question);
}

/** Returns every question marked in each bank's two most recent attempts. */
export function getAllBanksMarkedQuestions(pastExams = []) {
  return getQuestionStatesFromHistory(pastExams)
    .filter(({ isMarked }) => isMarked)
    .map(({ question }) => question);
}

/**
 * Matches keyword groups against prompt, options, and metadata. Commas,
 * semicolons, and new lines separate groups; words inside one group must all
 * match, while separate groups are combined as an OR search.
 */
export function getKeywordQuestions(allQuestions = [], query = "") {
  const groups = String(query || "")
    .toLowerCase()
    .split(/[,;\n]+/)
    .map((group) => normalizeQuestionText(group))
    .filter(Boolean);
  if (groups.length === 0) return [];

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
    const matches = groups.some((group) =>
      group.split(" ").filter(Boolean).every((term) => containsWholeWord(haystack, term))
    );
    if (!matches || seen.has(key)) return false;
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
