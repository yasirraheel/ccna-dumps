// Pre-build fast lookup caches (can be populated at runtime if needed)
const sourceById = new Map();
const sourceByPrompt = new Map();
const explanationById = new Map();
const explanationByQuestionNo = new Map();
const explanationByPrompt = new Map();

// Question-specific corrections take precedence over stale explanations that
// may still be attached to a question returned by the live API.
const explanationOverridesByQuestionNo = new Map([
  [
    "question #175",
    `<div class="explanation-rich-content">
  <div class="expl-card concept-card">
    <div class="section-title-concept">📌 Core Concept: Longest-prefix match decides the route</div>
    <p>Router Y compares every route that contains the destination IP address. It then chooses the matching route with the <strong>longest prefix length</strong> (the most specific network), before considering any route metric.</p>
  </div>

  <div class="expl-card correct-card">
    <h4 class="section-title-correct">✓ Why the Correct Answer (Option D) is Correct:</h4>
    <ul>
      <li><span class="opt-tag correct">Option D</span> <strong>router D</strong> is the next hop at <code>10.224.1.5</code>.</li>
      <li>The destination is <code>10.227.225.255</code>. The relevant entries in Router Y's table are:
        <ul>
          <li><code>10.0.0.0/8</code> via Router A — matches, but is broad.</li>
          <li><code>10.128.0.0/9</code> via Router B — matches, but is less specific.</li>
          <li><code>10.224.0.0/11</code> via <code>10.224.1.5</code> (Router D) — matches because the second octet <code>227</code> is in the <code>224–255</code> range.</li>
        </ul>
      </li>
      <li>The <code>10.224.0.0/15</code> route via Router C does <strong>not</strong> match: a /15 covers second-octet values <code>224–225</code>, while the destination uses <code>227</code>.</li>
      <li>Therefore, <code>/11</code> is the longest matching prefix, so Router Y forwards the traffic through <strong>Router D</strong>.</li>
    </ul>
  </div>

  <div class="expl-card incorrect-card">
    <h4 class="section-title-incorrect">✕ Why the Other Options are Incorrect:</h4>
    <ul>
      <li><span class="opt-tag wrong">Option A</span> <strong>router A</strong>: Its <code>/8</code> route matches, but it is less specific than <code>/9</code> and <code>/11</code>.</li>
      <li><span class="opt-tag wrong">Option B</span> <strong>router B</strong>: Its <code>/9</code> route matches, but <code>/11</code> is more specific.</li>
      <li><span class="opt-tag wrong">Option C</span> <strong>router C</strong>: Its <code>10.224.0.0/15</code> range ends at <code>10.225.255.255</code>, so it does not include <code>10.227.225.255</code>.</li>
    </ul>
  </div>

  <div class="expl-card tip-card">
    <h4 class="section-title-tip">💡 CCNA Exam Tip:</h4>
    <p>When several routes match, ignore the shorter matches and select the route with the largest prefix length: <code>/11</code> beats <code>/9</code>, which beats <code>/8</code>.</p>
  </div>
</div>`,
  ],
  [
    "drag & drop #12",
    `<div class="explanation-rich-content">
  <div class="expl-card concept-card">
    <div class="section-title-concept">📌 Core Concept: AAA separates identity, permissions, and activity tracking</div>
    <p><strong>Authentication</strong> verifies who the user is, <strong>Authorization</strong> determines what that user is allowed to do, and <strong>Accounting</strong> records what the user used or did. This question includes only Accounting and Authorization targets, so the Authentication statement is intentionally unused.</p>
  </div>

  <div class="expl-card correct-card">
    <h4 class="section-title-correct">✓ Why the Official Matches are Correct:</h4>
    <ul>
      <li><span class="opt-tag correct">Accounting 1</span> <strong>It records the amount of network resources consumed by the user.</strong> Accounting records usage such as bytes transferred, services used, and session activity.</li>
      <li><span class="opt-tag correct">Accounting 2</span> <strong>It tracks the services that a user is using.</strong> Accounting keeps an audit trail of the services and sessions associated with the user.</li>
      <li><span class="opt-tag correct">Authorization 1</span> <strong>It assigns per-user attributes.</strong> Authorization applies permissions and attributes such as privilege level, VLAN, ACL, or downloadable policy.</li>
      <li><span class="opt-tag correct">Authorization 2</span> <strong>It restricts the CLI commands that a user is able to perform.</strong> Command authorization decides which commands and privilege levels the authenticated user may use.</li>
    </ul>
  </div>

  <div class="expl-card incorrect-card">
    <h4 class="section-title-incorrect">✕ Why the Unused Option is Not a Match:</h4>
    <ul>
      <li><span class="opt-tag wrong">Unused</span> <strong>It permits and denies login attempts.</strong> This is <strong>Authentication</strong>, because it verifies credentials and decides whether the user may log in. There is no Authentication target in this drag-and-drop set.</li>
    </ul>
  </div>

  <div class="expl-card tip-card">
    <h4 class="section-title-tip">💡 CCNA Exam Tip:</h4>
    <p><strong>Authentication</strong> = Who are you? &nbsp; <strong>Authorization</strong> = What can you do? &nbsp; <strong>Accounting</strong> = What did you use or do?</p>
  </div>
</div>`,
  ],
]);

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

  // 2. Check Drag & Drop pattern: "Drag & Drop #X" -> "original_sources/dX.png"
  if (typeof q.questionNo === "string") {
    const dndMatch = q.questionNo.match(/drag\s*(?:&|and)?\s*drop\s*#?(\d+)/i);
    if (dndMatch && dndMatch[1]) {
      const dNum = parseInt(dndMatch[1], 10);
      if (dNum >= 1 && dNum <= 21) {
        return `original_sources/d${dNum}.png`;
      }
    }
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

  if (q.questionNo) {
    const override = explanationOverridesByQuestionNo.get(String(q.questionNo).trim().toLowerCase());
    if (override) return override;
  }

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

