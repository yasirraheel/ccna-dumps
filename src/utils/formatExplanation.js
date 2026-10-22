// Standardize presentation at render time, keeping stored question content intact.
export function formatExplanation(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const icons = {
    correct: '<path d="m6 12 4 4 8-8"/>',
    incorrect: '<path d="m8 8 8 8m0-8-8 8"/>',
    concept: '<path d="M12 7v14m0-14C9 5 6 4 3 5v14c3-1 6 0 9 2 3-2 6-3 9-2V5c-3-1-6 0-9 2Z"/>',
    tip: '<path d="M9 18h6m-5 3h4m-6-7a6 6 0 1 1 8 0c-1 1-1 2-1 2H9s0-1-1-2Z"/>',
  };
  Object.entries(icons).forEach(([type, paths]) => {
    doc.querySelectorAll(`.section-title-${type}`).forEach((heading) => {
      const text = heading.textContent.replace(/^[\s✓✔✗✘❌✅📌💡]+/u, "").replace(/:\s*$/, "");
      heading.textContent = "";
      heading.classList.add("explanation-section-heading");
      const icon = doc.createElement("span");
      icon.className = `explanation-section-icon icon-${type}`;
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
      const label = doc.createElement("span");
      label.textContent = text;
      heading.append(icon, label);
    });
  });
  return doc.body.innerHTML;
}
