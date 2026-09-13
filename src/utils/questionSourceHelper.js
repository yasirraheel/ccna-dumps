// Pre-build fast lookup caches (can be populated at runtime if needed)
const sourceById = new Map();
const sourceByPrompt = new Map();
const explanationById = new Map();
const explanationByQuestionNo = new Map();
const explanationByPrompt = new Map();

/**
 * Resolves the originalSourceImage path (e.g. 'original_sources/22.webp')
 * for any question object, even if it comes from an older saved session,
 * retaken exam, or history record that lacked the property.
 */
export function resolveOriginalSourceImage(q) {
  if (!q) return null;

  // 1. If already present and valid
  if (q.originalSourceImage && typeof q.originalSourceImage === "string") {
    return q.originalSourceImage;
  }

  // Drag & drop questions are excluded (21 total drag & drop questions)
  if (
    q.type === "drag_drop" ||
    q.isDragDrop ||
    (typeof q.questionNo === "string" && q.questionNo.toLowerCase().includes("drag"))
  ) {
    return null;
  }

  // 2. Check questionNo pattern: "Question #X" -> "original_sources/X.webp"
  if (typeof q.questionNo === "string") {
    const match = q.questionNo.match(/Question\s*#(\d+)/i);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 207) {
        return `original_sources/${num}.webp`;
      }
    }
  }

  // 3. Lookup by question ID in master catalog
  if (q.id && sourceById.has(q.id)) {
    return sourceById.get(q.id);
  }

  // 4. Lookup by prompt text
  if (q.question && typeof q.question === "string") {
    const key = q.question.trim().toLowerCase();
    if (sourceByPrompt.has(key)) {
      return sourceByPrompt.get(key);
    }
  }

  return null;
}

/**
 * Resolves formatted explanation for any question object, lookup by ID, questionNo, or prompt text.
 */
export function resolveExplanation(q) {
  if (!q) return null;

  // 1. If already present and valid
  if (q.explanation && typeof q.explanation === "string" && q.explanation.trim()) {
    return q.explanation;
  }

  // 2. Lookup by question ID
  if (q.id && explanationById.has(Number(q.id))) {
    return explanationById.get(Number(q.id));
  }

  // 3. Lookup by questionNo
  if (q.questionNo) {
    const cleanQno = q.questionNo.trim().toLowerCase();
    if (explanationByQuestionNo.has(cleanQno)) {
      return explanationByQuestionNo.get(cleanQno);
    }
    const m = q.questionNo.match(/\d+/);
    if (m) {
      if (explanationByQuestionNo.has(`question #${m[0]}`)) {
        return explanationByQuestionNo.get(`question #${m[0]}`);
      }
      if (explanationByQuestionNo.has(m[0])) {
        return explanationByQuestionNo.get(m[0]);
      }
    }
  }

  // 4. Lookup by prompt text
  if (q.question && typeof q.question === "string") {
    const pKey = q.question.trim().toLowerCase();
    if (explanationByPrompt.has(pKey)) {
      return explanationByPrompt.get(pKey);
    }
  }

  return null;
}

/**
 * Enriches a single question object with its originalSourceImage and explanation if missing.
 */
export function enrichQuestion(q) {
  if (!q || typeof q !== "object") return q;
  const src = resolveOriginalSourceImage(q);
  const exp = resolveExplanation(q);
  let updated = q;
  if (src && q.originalSourceImage !== src) {
    updated = { ...updated, originalSourceImage: src };
  }
  if (exp && (!updated.explanation || updated.explanation.trim() === "")) {
    updated = { ...updated, explanation: exp };
  }
  return updated;
}

/**
 * Enriches an array of questions, ensuring every non-drag-drop question has originalSourceImage and explanation.
 */
export function enrichQuestionsList(list) {
  if (!Array.isArray(list)) return [];
  return list.map(enrichQuestion);
}

// Master questions cache by ID and questionNo
const masterQuestionsById = new Map();
const masterQuestionsByQno = new Map();

export function setMasterQuestionsCache(list) {
  if (!Array.isArray(list)) return;
  list.forEach((q) => {
    if (!q) return;
    if (q.id !== undefined) masterQuestionsById.set(Number(q.id), q);
    if (q.questionNo) masterQuestionsByQno.set(String(q.questionNo).trim().toLowerCase(), q);
  });
}

export function getMasterQuestion(q) {
  if (!q) return null;
  if (q.id !== undefined && masterQuestionsById.has(Number(q.id))) {
    return masterQuestionsById.get(Number(q.id));
  }
  if (q.questionNo && masterQuestionsByQno.has(String(q.questionNo).trim().toLowerCase())) {
    return masterQuestionsByQno.get(String(q.questionNo).trim().toLowerCase());
  }
  return null;
}

/**
 * Dynamically remaps option letters (Option A, Option B, etc.) in an explanation
 * to strictly match the randomized or reordered options currently displayed on the user's screen.
 */
export function remapExplanationToDisplayedOptions(html, masterOpts, curOpts) {
  if (!html || typeof html !== "string") return html;
  if (!Array.isArray(masterOpts) || !Array.isArray(curOpts) || masterOpts.length === 0 || curOpts.length === 0) {
    return html;
  }

  const clean = (s) => (typeof s === "string" ? s.replace(/^[A-Z][.):-]\s*/i, "").trim().toLowerCase() : "");

  // Check if options are already in the exact same order
  const isSame = masterOpts.length === curOpts.length && masterOpts.every((m, i) => clean(m) === clean(curOpts[i]));
  if (isSame) return html;

  // Build mapping from Master Letter (A, B, C, D...) to Current Letter
  const letterMap = {};
  masterOpts.forEach((mOpt, mIdx) => {
    const mLetter = String.fromCharCode(65 + mIdx);
    const mText = clean(mOpt);
    const cIdx = curOpts.findIndex((cOpt) => clean(cOpt) === mText);
    if (cIdx !== -1) {
      letterMap[mLetter] = String.fromCharCode(65 + cIdx);
    }
  });

  let result = html;

  // 1. Remap compound groups first: e.g. "Options A and D", "Options B and E", "(Options A and E)"
  result = result.replace(/\bOptions?\s+([A-F])\s+and\s+([A-F])\b/gi, (match, l1, l2) => {
    const nl1 = letterMap[l1.toUpperCase()] || l1;
    const nl2 = letterMap[l2.toUpperCase()] || l2;
    const sorted = [nl1, nl2].sort();
    return `Options ${sorted[0]} and ${sorted[1]}`;
  });

  // 2. Remap single "Option X" references using temporary placeholders to prevent cross-replacement
  result = result.replace(/\bOption\s+([A-F])\b/gi, (match, letter) => {
    const target = letterMap[letter.toUpperCase()];
    return target ? `__OPTION_PLACEHOLDER_${target}__` : match;
  });

  // 3. Remap standalone "(Option X)" or "(Options X)"
  result = result.replace(/\(Option\s+([A-F])\)/gi, (match, letter) => {
    const target = letterMap[letter.toUpperCase()];
    return target ? `(__OPTION_PLACEHOLDER_${target}__)` : match;
  });

  // 4. Restore placeholders to final "Option X"
  result = result.replace(/__OPTION_PLACEHOLDER_([A-F])__/g, (match, letter) => `Option ${letter}`);

  // 5. Sort correct options list items if multiple correct answers exist
  const correctUlMatch = result.match(/(<h4 class="section-title-correct">[\s\S]*?<\/h4>\s*<ul>)([\s\S]*?)(<\/ul>)/i);
  if (correctUlMatch) {
    const prefix = correctUlMatch[1];
    const liContent = correctUlMatch[2];
    const suffix = correctUlMatch[3];
    const liItems = liContent.match(/<li[\s\S]*?<\/li>/gi) || [];
    if (liItems.length > 1) {
      liItems.sort((a, b) => {
        const matchA = a.match(/Option\s+([A-F])/i);
        const matchB = b.match(/Option\s+([A-F])/i);
        const lA = matchA ? matchA[1].toUpperCase() : "";
        const lB = matchB ? matchB[1].toUpperCase() : "";
        return lA.localeCompare(lB);
      });
      const sortedUl = prefix + "\n      " + liItems.join("\n      ") + "\n    " + suffix;
      result = result.replace(correctUlMatch[0], sortedUl);
    }
  }

  // 6. Sort incorrect options list items so they appear in clean alphabetical order
  const incorrectBlockMatch = result.match(/(<h4 class="section-title-incorrect">[\s\S]*?<\/h4>\s*<ul>)([\s\S]*?)(<\/ul>)/i);
  if (incorrectBlockMatch) {
    const prefix = incorrectBlockMatch[1];
    const liContent = incorrectBlockMatch[2];
    const suffix = incorrectBlockMatch[3];
    const liItems = liContent.match(/<li[\s\S]*?<\/li>/gi) || [];
    if (liItems.length > 0) {
      liItems.sort((a, b) => {
        const matchA = a.match(/Option\s+([A-F])/i);
        const matchB = b.match(/Option\s+([A-F])/i);
        const lA = matchA ? matchA[1].toUpperCase() : "";
        const lB = matchB ? matchB[1].toUpperCase() : "";
        return lA.localeCompare(lB);
      });
      const sortedUl = prefix + "\n      " + liItems.join("\n      ") + "\n    " + suffix;
      result = result.replace(incorrectBlockMatch[0], sortedUl);
    }
  }

  return result;
}

