// Question synchronization utility - pure server authority, zero localStorage caching
let realtimeChannel = null;
try {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    realtimeChannel = new BroadcastChannel("ccna_realtime");
  }
} catch (e) {}

export function getQuestionOverrides() {
  return {};
}

export function applyQuestionOverrides(questionsList) {
  return Array.isArray(questionsList) ? questionsList : [];
}

export function saveQuestionOverride(updatedQuestion) {
  if (!updatedQuestion) return;

  try {
    // 1. Dispatch custom event for real-time reactivity in the current window
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("ccna_question_updated", { detail: updatedQuestion })
      );
    }

    // 2. Broadcast across tabs via in-memory BroadcastChannel (ZERO localStorage)
    if (realtimeChannel) {
      realtimeChannel.postMessage({
        type: "question_updated",
        question: updatedQuestion,
        timestamp: Date.now(),
      });
    }
  } catch (e) {
    console.error("Error broadcasting question update:", e);
  }
}

export function getRealtimeChannel() {
  return realtimeChannel;
}
