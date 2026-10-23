/**
 * Keep long answer choices readable while preserving the wording from the
 * source question. Cisco routing-table choices are commonly stored as a
 * single line even though the original shows each route on its own line.
 */
export function formatOptionText(rawText) {
  const text = String(rawText ?? "");

  if (/gateway of last resort/i.test(text) && /\bO E2\b/.test(text)) {
    return text.replace(/,\s+(?=O E2\b)/g, "\n  ");
  }

  return text;
}

