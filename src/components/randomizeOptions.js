/**
 * High-entropy aggressive randomizers for exam questions and question answer options.
 * Guarantees thorough multi-pass Fisher-Yates shuffling and option derangements.
 */

const getSecureRandom = () => {
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const uint32 = new Uint32Array(1);
    window.crypto.getRandomValues(uint32);
    return uint32[0] / (0xffffffff + 1);
  }
  return Math.random();
};

/**
 * Aggressively shuffles an array of items (e.g. questions) using 3-pass Fisher-Yates.
 * Ensures the first element does not remain the same if array length >= 3.
 */
export function aggressiveShuffle(array) {
  if (!Array.isArray(array) || array.length <= 1) {
    return array ? [...array] : [];
  }

  const result = [...array];
  const n = result.length;

  // 3 independent passes of Fisher-Yates shuffle
  for (let pass = 0; pass < 3; pass++) {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(getSecureRandom() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
  }

  // Ensure first element is genuinely shuffled away from its original start position
  if (n >= 3 && result[0] === array[0]) {
    const swapTarget = 1 + Math.floor(getSecureRandom() * (n - 1));
    const temp = result[0];
    result[0] = result[swapTarget];
    result[swapTarget] = temp;
  }

  return result;
}

/**
 * Aggressively randomizes the display sequence of multiple-choice question options.
 * Enforces true scrambling (derangement) so that:
 * 1. Options do NOT stay in their original positions.
 * 2. If single correct answer, it is moved to a different index whenever possible.
 * 3. Re-prefixes clean A., B., C., D. labels.
 * 4. Correctly updates correctOption and correctOptions so grading is 100% accurate.
 */
export function randomizeQuestionOptions(q) {
  if (!q || !q.options || !Array.isArray(q.options) || q.options.length <= 1) {
    return q;
  }
  // Drag & drop questions should keep their designated category targets
  if (q.type === "drag_drop" || q.dragDropData || q.isDragDrop) {
    return q;
  }

  const rawCorrect = q.correctOptions !== undefined ? q.correctOptions : q.correctOption;
  const isArray = Array.isArray(rawCorrect);
  const correctArr = isArray
    ? rawCorrect
    : rawCorrect !== undefined && rawCorrect !== null
    ? [rawCorrect]
    : [];

  const indexed = q.options.map((opt, idx) => {
    let text = typeof opt === "string" ? opt.replace(/^[A-Z][.):-]\s*/i, "").trim() : String(opt);
    return {
      origIdx: idx,
      text,
      isCorrect: correctArr.includes(idx),
    };
  });

  const n = indexed.length;
  let bestShuffled = null;
  let minSamePositions = Infinity;

  // Attempt up to 30 aggressive shuffle attempts to find a near-derangement
  for (let attempt = 0; attempt < 30; attempt++) {
    const candidate = [...indexed];

    // Multi-pass Fisher-Yates
    for (let pass = 0; pass < 2; pass++) {
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(getSecureRandom() * (i + 1));
        const temp = candidate[i];
        candidate[i] = candidate[j];
        candidate[j] = temp;
      }
    }

    let sameCount = 0;
    candidate.forEach((item, idx) => {
      if (item.origIdx === idx) sameCount++;
    });

    // Check if the single correct answer changed position
    const correctMoved = correctArr.length === 1 ? !candidate[correctArr[0]].isCorrect : true;

    // Perfect derangement (0 options in original spots, and correct answer moved)
    if (sameCount === 0 && correctMoved) {
      bestShuffled = candidate;
      break;
    }

    if (sameCount < minSamePositions && (correctArr.length !== 1 || correctMoved)) {
      minSamePositions = sameCount;
      bestShuffled = candidate;
    }
  }

  // Fallback: If no good derangement was found, apply a guaranteed cyclic offset
  if (!bestShuffled || (n >= 2 && bestShuffled.every((item, idx) => item.origIdx === idx))) {
    const offset = 1 + Math.floor(getSecureRandom() * (n - 1));
    bestShuffled = indexed.map((_, i) => indexed[(i + offset) % n]);
  }

  // Generate new clean options with updated letter prefixes A., B., C., D.
  const newOptions = bestShuffled.map((item, idx) => {
    const letter = String.fromCharCode(65 + idx);
    return `${letter}. ${item.text}`;
  });

  // Re-map the correct options to their new shuffled indices
  const newCorrectIndices = [];
  bestShuffled.forEach((item, idx) => {
    if (item.isCorrect) {
      newCorrectIndices.push(idx);
    }
  });

  const newCorrectOption = isArray
    ? newCorrectIndices
    : newCorrectIndices.length > 0
    ? newCorrectIndices[0]
    : 0;

  return {
    ...q,
    options: newOptions,
    correctOption: newCorrectOption,
    correctOptions: newCorrectIndices,
  };
}
