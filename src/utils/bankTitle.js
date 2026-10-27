/**
 * Return the user-facing bank label used throughout the dashboard, history,
 * resume view, and active exam header.
 *
 * Older saved sessions used labels such as "Custom Practice — 51 Questions"
 * or "Custom Practice (51 Qs) (51 Qs)". Normalize those legacy variants so
 * every view displays the compact, consistent label: "Custom Practice (51 Qs)".
 */
export function cleanBankTitle(name) {
  if (!name) return "";

  const cleaned = String(name)
    .replace(/spoto-?/gi, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (/^Custom Practice\b/i.test(cleaned)) {
    const countMatch = cleaned.match(/(?:—|-|\()\s*(\d+)\s*(?:Questions?|Qs)\b/i);
    return countMatch ? `Custom Practice (${countMatch[1]} Qs)` : "Custom Practice";
  }

  return cleaned;
}
