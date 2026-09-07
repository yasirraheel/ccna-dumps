import { ccnaQuestions } from "../data/ccnaQuestions";

// Pre-build fast lookup caches
const sourceById = new Map();
const sourceByPrompt = new Map();

if (Array.isArray(ccnaQuestions)) {
  ccnaQuestions.forEach((q) => {
    if (q && q.originalSourceImage) {
      if (q.id) sourceById.set(q.id, q.originalSourceImage);
      if (q.question && typeof q.question === "string") {
        sourceByPrompt.set(q.question.trim().toLowerCase(), q.originalSourceImage);
      }
    }
  });
}

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
 * Enriches a single question object with its originalSourceImage if missing.
 */
export function enrichQuestion(q) {
  if (!q || typeof q !== "object") return q;
  const src = resolveOriginalSourceImage(q);
  if (src && q.originalSourceImage !== src) {
    return { ...q, originalSourceImage: src };
  }
  return q;
}

/**
 * Enriches an array of questions, ensuring every non-drag-drop question has originalSourceImage.
 */
export function enrichQuestionsList(list) {
  if (!Array.isArray(list)) return [];
  return list.map(enrichQuestion);
}
