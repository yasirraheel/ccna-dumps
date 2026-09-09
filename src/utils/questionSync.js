// Question synchronization utility - pure server authority, zero localStorage caching

export function getQuestionOverrides() {
  return {};
}

export function applyQuestionOverrides(questionsList) {
  return Array.isArray(questionsList) ? questionsList : [];
}

export function saveQuestionOverride(updatedQuestion) {
  if (!updatedQuestion) return;

  try {
    // Purge any legacy overrides from localStorage to guarantee pure server data
    localStorage.removeItem("ccna_question_overrides");
    localStorage.removeItem("ccna_active_running_session");
    localStorage.removeItem("ccna_saved_sessions_list");

    // 1. Dispatch custom event for real-time reactivity in the current window
    window.dispatchEvent(
      new CustomEvent("ccna_question_updated", { detail: updatedQuestion })
    );

    // 2. Trigger cross-tab event for active exams open in other tabs
    try {
      localStorage.setItem(
        "ccna_question_updated_event",
        JSON.stringify({ question: updatedQuestion, _t: Date.now() })
      );
      // Clean up after firing event
      setTimeout(() => {
        try { localStorage.removeItem("ccna_question_updated_event"); } catch {}
      }, 500);
    } catch {}
  } catch (e) {
    console.error("Error broadcasting question update:", e);
  }
}
