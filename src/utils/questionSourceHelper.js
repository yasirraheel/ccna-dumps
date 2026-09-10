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

