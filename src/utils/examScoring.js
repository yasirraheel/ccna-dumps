/**
 * Exam scoring and evaluation utilities.
 * Used across App, ExamDashboard, and FinishScreen to ensure 100% consistent grading.
 */

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
      if (ans?.confirmed && ans?.isCorrect) {
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
      isCorrect = Boolean(ans?.confirmed && ans?.isCorrect);
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
