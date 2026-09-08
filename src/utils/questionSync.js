const OVERRIDES_STORAGE_KEY = "ccna_question_overrides";
const ACTIVE_RUNNING_SESSION_KEY = "ccna_active_running_session";
const SESSIONS_STORAGE_KEY = "ccna_saved_sessions_list";

export function getQuestionOverrides() {
  try {
    localStorage.removeItem(OVERRIDES_STORAGE_KEY);
  } catch {}
  return {};
}

export function applyQuestionOverrides(questionsList) {
  if (!Array.isArray(questionsList)) {
    return questionsList || [];
  }
  return questionsList;
}

export function saveQuestionOverride(updatedQuestion) {
  if (!updatedQuestion) return;

  try {
    // 1. Store in ccna_question_overrides
    const current = getQuestionOverrides();
    if (updatedQuestion.id !== undefined && updatedQuestion.id !== null) {
      current[`id_${updatedQuestion.id}`] = updatedQuestion;
    }
    if (updatedQuestion.questionNo) {
      current[`qno_${updatedQuestion.questionNo}`] = updatedQuestion;
    }
    localStorage.setItem(OVERRIDES_STORAGE_KEY, JSON.stringify(current));

    // 2. Update active running session if present in localStorage
    const activeRaw = localStorage.getItem(ACTIVE_RUNNING_SESSION_KEY);
    if (activeRaw) {
      const activeSession = JSON.parse(activeRaw);
      if (Array.isArray(activeSession?.questions)) {
        activeSession.questions = activeSession.questions.map((q) => {
          if (
            (updatedQuestion.id && (q.id === updatedQuestion.id || String(q.id) === String(updatedQuestion.id))) ||
            (updatedQuestion.questionNo && q.questionNo === updatedQuestion.questionNo)
          ) {
            return { ...q, ...updatedQuestion };
          }
          return q;
        });
        localStorage.setItem(ACTIVE_RUNNING_SESSION_KEY, JSON.stringify(activeSession));
      }
    }

    // 3. Update saved sessions list if present in localStorage
    const listRaw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (listRaw) {
      const list = JSON.parse(listRaw);
      if (Array.isArray(list)) {
        const updatedList = list.map((sess) => {
          if (Array.isArray(sess.questions)) {
            sess.questions = sess.questions.map((q) => {
              if (
                (updatedQuestion.id && (q.id === updatedQuestion.id || String(q.id) === String(updatedQuestion.id))) ||
                (updatedQuestion.questionNo && q.questionNo === updatedQuestion.questionNo)
              ) {
                return { ...q, ...updatedQuestion };
              }
              return q;
            });
          }
          return sess;
        });
        localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(updatedList));
      }
    }

    // 4. Dispatch custom event for real-time reactivity
    window.dispatchEvent(
      new CustomEvent("ccna_question_updated", { detail: updatedQuestion })
    );
  } catch (e) {
    console.error("Error saving question override:", e);
  }
}
