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
 * Generates all combinations of size `k` from an array.
 */
function getSlotCombinations(arr, k) {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const head = arr[0];
  const tail = arr.slice(1);
  const withHead = getSlotCombinations(tail, k - 1).map((combo) => [head, ...combo]);
  const withoutHead = getSlotCombinations(tail, k);
  return [...withHead, ...withoutHead];
}

/**
 * Aggressively randomizes the display sequence of multiple-choice question options.
 * Enforces true scrambling (derangement) so that:
 * 1. Options do NOT stay in their original positions.
 * 2. If multiple correct answers (e.g. 2 or 3 answers to choose from):
 *    - Correct answers are NEVER placed in contiguous sequence (e.g. NOT A & B, NOT B & C, NOT C & D)
 *      whenever the total number of options allows separating them.
 *    - Correct answers are separated/scattered by incorrect answers (e.g. A & C, A & D, B & D, etc.).
 *    - The relative order of the correct answers is thoroughly shuffled.
 * 3. If single correct answer, it is moved to a different index whenever possible.
 * 4. Re-prefixes clean A., B., C., D., E. labels.
 * 5. Correctly updates correctOption and correctOptions so grading is 100% accurate.
 */
export function randomizeQuestionOptions(q) {
  if (!q || !q.options || !Array.isArray(q.options) || q.options.length <= 1) {
    return q;
  }
  // Drag & drop questions should keep their designated category targets
  if (q.type === "drag_drop" || q.dragDropData || q.isDragDrop) {
    return q;
  }

  const rawCorrect =
    q.correctOptions !== undefined && q.correctOptions !== null
      ? q.correctOptions
      : q.correctOption;
  const isArray = Array.isArray(rawCorrect);

  let correctArr = [];
  if (isArray) {
    correctArr = rawCorrect
      .map(Number)
      .filter((v) => !isNaN(v) && v >= 0 && v < q.options.length);
  } else if (typeof rawCorrect === "number") {
    if (rawCorrect >= 0 && rawCorrect < q.options.length) {
      correctArr = [rawCorrect];
    }
  } else if (typeof rawCorrect === "string") {
    if (rawCorrect.includes(",")) {
      correctArr = rawCorrect
        .split(",")
        .map(Number)
        .filter((v) => !isNaN(v) && v >= 0 && v < q.options.length);
    } else if (!isNaN(Number(rawCorrect))) {
      const parsed = Number(rawCorrect);
      if (parsed >= 0 && parsed < q.options.length) {
        correctArr = [parsed];
      }
    }
  }

  // Fallback for letter characters in rawCorrect like ["A", "B"]
  if (correctArr.length === 0 && Array.isArray(rawCorrect)) {
    rawCorrect.forEach((item) => {
      if (typeof item === "string" && /^[A-E]$/i.test(item.trim())) {
        const idx = item.trim().toUpperCase().charCodeAt(0) - 65;
        if (idx >= 0 && idx < q.options.length && !correctArr.includes(idx)) {
          correctArr.push(idx);
        }
      }
    });
  }

  const indexed = q.options.map((opt, idx) => {
    let text =
      typeof opt === "string"
        ? opt.replace(/^[A-Z][.):-]\s*/i, "").trim()
        : String(opt || "");
    return {
      origIdx: idx,
      text,
      isCorrect: correctArr.includes(Number(idx)),
    };
  });

  const n = indexed.length;
  const correctItems = indexed.filter((item) => item.isCorrect);
  const incorrectItems = indexed.filter((item) => !item.isCorrect);
  const k = correctItems.length;

  let finalShuffled = null;

  // CASE 1: Multiple correct answers (k >= 2) and we have both correct and incorrect options
  if (k >= 2 && incorrectItems.length > 0) {
    // 1. Thoroughly shuffle correct items among themselves (scrambling their internal relative order)
    const shuffledCorrect = aggressiveShuffle(correctItems);
    // 2. Thoroughly shuffle incorrect items among themselves
    const shuffledIncorrect = aggressiveShuffle(incorrectItems);

    // 3. Generate all combinations of k destination slots from [0, 1, ..., n - 1]
    const allSlotIndices = Array.from({ length: n }, (_, i) => i);
    const allCombos = getSlotCombinations(allSlotIndices, k);

    const sortedOrig = [...correctArr].sort((a, b) => a - b);

    // Score and filter combinations
    const scoredCombos = allCombos.map((combo) => {
      let adjacentCount = 0;
      for (let i = 0; i < combo.length - 1; i++) {
        if (combo[i + 1] - combo[i] === 1) {
          adjacentCount++;
        }
      }
      const isOrigPositions =
        combo.length === sortedOrig.length &&
        combo.every((val, i) => val === sortedOrig[i]);

      return { combo, adjacentCount, isOrigPositions };
    });

    // We never want original positions if alternatives exist
    let candidates = scoredCombos.filter((sc) => !sc.isOrigPositions);
    if (candidates.length === 0) candidates = scoredCombos;

    // For k === 2 and n >= 3, non-adjacent combinations ALWAYS exist (e.g. [0, 2], [0, 3], [1, 3])!
    // Never allow them to be adjacent (NOT A&B, NOT B&C, NOT C&D)
    if (k === 2 && n >= 3) {
      const nonAdjacent = candidates.filter((sc) => sc.adjacentCount === 0);
      if (nonAdjacent.length > 0) {
        candidates = nonAdjacent;
      }
    } else if (k >= 3 && n > k) {
      // For k >= 3, find the minimum possible adjacent count to break up solid contiguous blocks
      const minAdjacent = Math.min(...candidates.map((sc) => sc.adjacentCount));
      const bestSeparated = candidates.filter((sc) => sc.adjacentCount === minAdjacent);
      if (bestSeparated.length > 0) {
        candidates = bestSeparated;
      }
    }

    // Randomly pick one of the separated slot combinations
    const chosenSlots =
      candidates[Math.floor(getSecureRandom() * candidates.length)].combo;

    finalShuffled = new Array(n);
    let cIdx = 0;
    let iIdx = 0;
    for (let i = 0; i < n; i++) {
      if (chosenSlots.includes(i)) {
        finalShuffled[i] = shuffledCorrect[cIdx++];
      } else {
        finalShuffled[i] = shuffledIncorrect[iIdx++];
      }
    }
  } else if (k === 1 && incorrectItems.length > 0) {
    // CASE 2: Single correct answer
    // Shuffle incorrect items
    const shuffledIncorrect = aggressiveShuffle(incorrectItems);
    const origPos = correctArr[0];

    // Pick a destination slot different from origPos whenever possible
    const availableSlots = Array.from({ length: n }, (_, i) => i).filter(
      (i) => i !== origPos
    );
    const chosenSlot =
      availableSlots.length > 0
        ? availableSlots[Math.floor(getSecureRandom() * availableSlots.length)]
        : 0;

    finalShuffled = new Array(n);
    let iIdx = 0;
    for (let i = 0; i < n; i++) {
      if (i === chosenSlot) {
        finalShuffled[i] = correctItems[0];
      } else {
        finalShuffled[i] = shuffledIncorrect[iIdx++];
      }
    }
  } else {
    // CASE 3: No marked correct options or all options correct: full derangement shuffle
    finalShuffled = aggressiveShuffle(indexed);
  }

  // Generate new clean options with updated letter prefixes A., B., C., D., E.
  const newOptions = finalShuffled.map((item, idx) => {
    const letter = String.fromCharCode(65 + idx);
    return `${letter}. ${item.text}`;
  });

  // Re-map the correct options to their new shuffled indices
  const newCorrectIndices = [];
  finalShuffled.forEach((item, idx) => {
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
