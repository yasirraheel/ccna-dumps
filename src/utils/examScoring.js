/**
 * Exam scoring and evaluation utilities.
 * Used across App, ExamDashboard, and FinishScreen to ensure 100% consistent grading.
 */

/**
 * Evaluates drag-and-drop answers, supporting multi-slot categories (e.g. TCP 1, 2, 3).
 * For categories with numbered slots, items assigned to ANY slot in the category are accepted
 * in any order (e.g. ABC, BAC, CAB are all 100% correct).
 * For ordered sequences ("Step 1", "Step 2", "First Command", etc.), the exact order is preserved.
 */
export function evaluateDragDrop(dragDropData, userMatches = {}) {
  if (!dragDropData) return { isAllCorrect: false, slotResults: {} };

  const targets = dragDropData.targets || [];
  const correctMatches = dragDropData.correctMatches || {};

  const getTargetGroup = (target) => {
    if (!target) return "";
    const trimmed = String(target).trim();
    if (/^step\b/i.test(trimmed) || /command\b/i.test(trimmed)) {
      return trimmed;
    }
    const match = trimmed.match(/^(.+?)\s+\d+$/);
    if (match) {
      return match[1].trim();
    }
    return trimmed;
  };

  const groupExpected = {};
  for (const t of targets) {
    const grp = getTargetGroup(t);
    if (!groupExpected[grp]) groupExpected[grp] = [];
    const expItem = correctMatches[t];
    if (expItem) {
      groupExpected[grp].push(expItem);
    }
  }

  const remainingPerGroup = {};
  for (const grp of Object.keys(groupExpected)) {
    remainingPerGroup[grp] = [...groupExpected[grp]];
  }

  const slotResults = {};
  for (const t of targets) {
    const grp = getTargetGroup(t);
    const assigned = userMatches ? userMatches[t] : null;
    if (!assigned) {
      slotResults[t] = { isCorrect: false, isMissing: true, isWrong: false };
      continue;
    }
    const availableIndex = remainingPerGroup[grp]?.indexOf(assigned);
    if (availableIndex !== undefined && availableIndex !== -1) {
      remainingPerGroup[grp].splice(availableIndex, 1);
      slotResults[t] = { isCorrect: true, isMissing: false, isWrong: false, item: assigned };
    } else {
      slotResults[t] = { isCorrect: false, isMissing: false, isWrong: true, item: assigned };
    }
  }

  const allAssigned = targets.length > 0 && targets.every((t) => Boolean(userMatches?.[t]));
  const isAllCorrect = allAssigned && targets.every((t) => slotResults[t]?.isCorrect === true);

  return { isAllCorrect, slotResults };
}

export function calculateTotalPoints(questions, answers) {
  if (!questions || !answers) return 0;
  let total = 0;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const ans = answers[i];
    if (ans === null || ans === undefined) continue;

    const pointValue = q.points || 10;
    const rawCorrect = q.correctOptions !== undefined ? q.correctOptions : q.correctOption;
    const correctArr = (Array.isArray(rawCorrect) ? rawCorrect : [rawCorrect])
      .filter((x) => x !== null && x !== undefined)
      .map(Number);

    if (q.type === "drag_drop" || q.dragDropData) {
      const dndEval = evaluateDragDrop(q.dragDropData, ans?.matches || {});
      if (ans?.confirmed && (ans?.isCorrect || dndEval.isAllCorrect)) {
        total += pointValue;
      }
    } else if (correctArr.length > 1) {
      const userSelections = (
        Array.isArray(ans)
          ? ans
          : Array.isArray(ans?.selections)
          ? ans.selections
          : typeof ans === "number" || typeof ans === "string"
          ? [ans]
          : []
      ).map(Number);
      const isMatch =
        userSelections.length === correctArr.length &&
        userSelections.every((idx) => correctArr.includes(idx));
      if (isMatch) {
        total += pointValue;
      }
    } else {
      const chosenOpt =
        typeof ans === "number" || typeof ans === "string"
          ? ans
          : Array.isArray(ans)
          ? ans[0]
          : ans?.selections?.[0];
      if (
        chosenOpt !== undefined &&
        chosenOpt !== null &&
        correctArr.includes(Number(chosenOpt))
      ) {
        total += pointValue;
      }
    }
  }
  return total;
}

export function isQuestionAnswerCorrect(q, ans) {
  if (!q || ans === null || ans === undefined || ans === "") return false;

  const rawCorrect = q.correctOptions !== undefined && q.correctOptions !== null
    ? q.correctOptions
    : q.correctOption;
  const correctArr = (Array.isArray(rawCorrect) ? rawCorrect : [rawCorrect])
    .filter((x) => x !== null && x !== undefined)
    .map(Number);

  if (q.type === "drag_drop" || q.dragDropData || q.isDragDrop) {
    const dndEval = evaluateDragDrop(q.dragDropData, ans?.matches || {});
    return Boolean(ans?.confirmed && (ans?.isCorrect || dndEval.isAllCorrect));
  }

  if (correctArr.length > 1) {
    const userSelections = (
      Array.isArray(ans)
        ? ans
        : Array.isArray(ans?.selections)
        ? ans.selections
        : typeof ans === "number" || typeof ans === "string"
        ? [ans]
        : []
    ).map(Number);
    return (
      userSelections.length === correctArr.length &&
      userSelections.every((idx) => correctArr.includes(idx))
    );
  }

  const chosenOpt =
    typeof ans === "number" || typeof ans === "string"
      ? ans
      : Array.isArray(ans)
      ? ans[0]
      : ans?.selections?.[0];

  return (
    chosenOpt !== undefined &&
    chosenOpt !== null &&
    correctArr.includes(Number(chosenOpt))
  );
}

export function getIncorrectQuestionIndices(questions, answers) {
  if (!questions || !Array.isArray(questions)) return [];
  const incorrectIndices = [];
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const ans = answers ? answers[i] : null;
    if (ans === null || ans === undefined) {
      incorrectIndices.push(i);
      continue;
    }
    const rawCorrect = q.correctOptions !== undefined ? q.correctOptions : q.correctOption;
    const correctArr = (Array.isArray(rawCorrect) ? rawCorrect : [rawCorrect])
      .filter((x) => x !== null && x !== undefined)
      .map(Number);

    if (q.type === "drag_drop" || q.dragDropData) {
      if (!ans?.confirmed || !ans?.isCorrect) {
        incorrectIndices.push(i);
      }
    } else if (correctArr.length > 1) {
      const userSelections = (
        Array.isArray(ans)
          ? ans
          : Array.isArray(ans?.selections)
          ? ans.selections
          : typeof ans === "number" || typeof ans === "string"
          ? [ans]
          : []
      ).map(Number);
      const isMatch =
        userSelections.length === correctArr.length &&
        userSelections.every((idx) => correctArr.includes(idx));
      if (!isMatch) incorrectIndices.push(i);
    } else {
      const chosenOpt =
        typeof ans === "number" || typeof ans === "string"
          ? ans
          : Array.isArray(ans)
          ? ans[0]
          : ans?.selections?.[0];
      if (
        chosenOpt === undefined ||
        chosenOpt === null ||
        !correctArr.includes(Number(chosenOpt))
      ) {
        incorrectIndices.push(i);
      }
    }
  }
  return incorrectIndices;
}

/**
 * Detailed breakdown separating:
 * - correct: Answered correctly
 * - incorrect: Answered, but wrong
 * - unanswered: Never answered (missed / skipped)
 */
export function getExamQuestionStats(questions, answers) {
  if (!questions || !Array.isArray(questions)) {
    return {
      total: 0,
      answered: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0,
      incorrectIndices: [],
      unansweredIndices: [],
      nonCorrectIndices: [],
    };
  }

  const incorrectIndices = [];
  const unansweredIndices = [];
  let correctCount = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const ans = answers ? answers[i] : null;

    if (ans === null || ans === undefined) {
      unansweredIndices.push(i);
      continue;
    }

    const rawCorrect = q.correctOptions !== undefined ? q.correctOptions : q.correctOption;
    const correctArr = (Array.isArray(rawCorrect) ? rawCorrect : [rawCorrect])
      .filter((x) => x !== null && x !== undefined)
      .map(Number);
    let isCorrect = false;

    if (q.type === "drag_drop" || q.dragDropData) {
      const dndEval = evaluateDragDrop(q.dragDropData, ans?.matches || {});
      isCorrect = Boolean(ans?.confirmed && (ans?.isCorrect || dndEval.isAllCorrect));
    } else if (correctArr.length > 1) {
      const userSelections = (
        Array.isArray(ans)
          ? ans
          : Array.isArray(ans?.selections)
          ? ans.selections
          : typeof ans === "number" || typeof ans === "string"
          ? [ans]
          : []
      ).map(Number);
      isCorrect =
        userSelections.length === correctArr.length &&
        userSelections.every((idx) => correctArr.includes(idx));
    } else {
      const chosenOpt =
        typeof ans === "number" || typeof ans === "string"
          ? ans
          : Array.isArray(ans)
          ? ans[0]
          : ans?.selections?.[0];
      isCorrect =
        chosenOpt !== undefined &&
        chosenOpt !== null &&
        correctArr.includes(Number(chosenOpt));
    }

    if (isCorrect) {
      correctCount++;
    } else {
      incorrectIndices.push(i);
    }
  }

  const nonCorrectIndices = [...incorrectIndices, ...unansweredIndices];
  const total = questions.length;
  const answered = total - unansweredIndices.length;

  return {
    total,
    answered,
    correct: correctCount,
    incorrect: incorrectIndices.length,
    unanswered: unansweredIndices.length,
    incorrectIndices,
    unansweredIndices,
    nonCorrectIndices,
  };
}
