// Plan Access & Permissions Helper
// Dynamic feature gating based on database configured plan bank_permissions

export const EXAM_BANKS = [
  { key: 'bank_a', name: 'Exam Bank A (1-50)', totalQuestions: 50, defaultMax: 50 },
  { key: 'bank_b', name: 'Exam Bank B (51-100)', totalQuestions: 50, defaultMax: 50 },
  { key: 'bank_c', name: 'Exam Bank C (101-150)', totalQuestions: 50, defaultMax: 50 },
  { key: 'bank_d', name: 'Exam Bank D (151-207)', totalQuestions: 57, defaultMax: 57 },
  { key: 'bank_dragdrop', name: 'Drag & Drop Special Bank', totalQuestions: 21, defaultMax: 21 },
  { key: 'bank_all', name: 'All Questions Bank', totalQuestions: 228, defaultMax: 228 },
  { key: 'bank_labs', name: 'Labs', totalQuestions: 27, defaultMax: 27 },
  // Anki Flashcards banks (separate from the original 228-question exam)
  { key: 'bank_anki_nf', name: 'Anki: Network Fundamentals', totalQuestions: 581, defaultMax: 581 },
  { key: 'bank_anki_na', name: 'Anki: Network Access', totalQuestions: 589, defaultMax: 589 },
  { key: 'bank_anki_ipc', name: 'Anki: IP Connectivity', totalQuestions: 280, defaultMax: 280 },
  { key: 'bank_anki_ips', name: 'Anki: IP Services', totalQuestions: 399, defaultMax: 399 },
  { key: 'bank_anki_sec', name: 'Anki: Security Fundamentals', totalQuestions: 126, defaultMax: 126 },
  { key: 'bank_anki_auto', name: 'Anki: Automation and Programmability', totalQuestions: 132, defaultMax: 132 },
  { key: 'bank_anki_all', name: 'Anki: All Domains Combined', totalQuestions: 2107, defaultMax: 2107 },
];

export const normalizePlan = (plan) => {
  if (!plan) return 'free';
  const p = String(plan).toLowerCase();
  if (p.includes('unlimited') || p.includes('advance')) return 'unlimited';
  if (p.includes('pro') || p.includes('intermediate')) return 'pro';
  return 'free';
};

export const isUserAdmin = (user) => {
  return Boolean(user && (user.role === 'admin' || user.email === 'candidate@ccna.com'));
};

const resolveUserPlanConfig = (user, plans = []) => {
  if (user?.planPermissions && typeof user.planPermissions === 'object') {
    return user.planPermissions;
  }
  if (Array.isArray(plans) && plans.length > 0 && user?.plan) {
    const userPlanId = String(user.plan).toLowerCase();
    const found = plans.find(
      (p) =>
        String(p.id).toLowerCase() === userPlanId ||
        String(p.id).toLowerCase() === `plan_${userPlanId}` ||
        String(p.name || '').toLowerCase() === userPlanId ||
        String(p.id || '').toLowerCase().replace(/^plan_/, '') === userPlanId.replace(/^plan_/, '')
    );
    if (found?.bank_permissions && typeof found.bank_permissions === 'object') {
      return found.bank_permissions;
    }
  }
  return null;
};

export const isPlanAllowedForBank = (user, bankKey, plans = []) => {
  if (isUserAdmin(user)) return true;

  const planConfig = resolveUserPlanConfig(user, plans);
  if (planConfig && typeof planConfig === 'object') {
    // A loaded plan configuration is authoritative. Missing bank entries are
    // locked instead of falling back to a broad plan-name rule.
    return Boolean(planConfig[bankKey]?.enabled);
  }

  // Fallback for offline / unseeded states:
  if (bankKey === 'bank_a' || bankKey === 'bank_b') {
    return true;
  }

  const plan = normalizePlan(user?.plan);
  return plan === 'pro' || plan === 'unlimited';
};

export const isPlanAllowedForCustomExam = (user, plans = []) => {
  if (isUserAdmin(user)) return true;
  const planConfig = resolveUserPlanConfig(user, plans);
  if (planConfig && typeof planConfig === 'object') {
    return planConfig.allow_custom_exam === true;
  }
  return normalizePlan(user?.plan) === 'pro' || normalizePlan(user?.plan) === 'unlimited';
};

export const isPlanAllowedToModifyExam = (user, plans = []) => {
  if (isUserAdmin(user)) return true;
  const planConfig = resolveUserPlanConfig(user, plans);
  if (planConfig && typeof planConfig === 'object') {
    return planConfig.allow_modify_exam === true;
  }
  return normalizePlan(user?.plan) === 'pro' || normalizePlan(user?.plan) === 'unlimited';
};

export const getBankAllowedQuestionCount = (user, bankKey, totalQuestions, plans = []) => {
  if (isUserAdmin(user)) return totalQuestions;

  const planConfig = resolveUserPlanConfig(user, plans);
  if (planConfig && typeof planConfig === 'object') {
    const maxQ = parseInt(planConfig[bankKey]?.max_questions, 10);
    if (!isNaN(maxQ) && maxQ > 0) {
      return Math.min(maxQ, totalQuestions);
    }
    // An enabled bank with a blank/zero limit remains usable as an unlimited
    // bank; the blank value is kept only so admins can type a replacement.
    return totalQuestions;
  }

  return totalQuestions;
};

export const isPlanAllowedForMode = (user, mode, plans = []) => {
  if (isUserAdmin(user)) return true;

  // Study Mode is accessible on all tiers
  if (mode === 'study') {
    return true;
  }

  // Official 90-minute timed Simulation Mode
  if (mode === 'simulation') {
    const planConfig = resolveUserPlanConfig(user, plans);
    if (planConfig && typeof planConfig === 'object') {
      return planConfig.allow_simulation === true;
    }
    const plan = normalizePlan(user?.plan);
    return plan === 'pro' || plan === 'unlimited';
  }

  return true;
};

export const getBankRequiredPlanName = (bankKey) => {
  if (bankKey === 'bank_labs') return 'Free Study Pass';
  if (bankKey === 'bank_a' || bankKey === 'bank_b') return 'Free Study Pass';
  return 'CCNA Pro Pass';
};

export const getModeRequiredPlanName = (mode) => {
  if (mode === 'study') return 'Free Study Pass';
  return 'CCNA Pro Pass';
};

export const getPlanDisplayInfo = (user, plans = []) => {
  if (isUserAdmin(user)) {
    return { name: user?.planName || 'Admin', badgeClass: 'plan-badge-admin', isProOrAbove: true };
  }

  // 1. Check passed live plans
  let allPlans = Array.isArray(plans) && plans.length > 0 ? plans : [];

  const userPlanKey = user?.plan;
  if (userPlanKey && allPlans.length > 0) {
    const matched = allPlans.find(
      (p) =>
        p.id === userPlanKey ||
        p.id === `plan_${userPlanKey}` ||
        p.id?.replace(/^plan_/, '') === String(userPlanKey).replace(/^plan_/, '') ||
        p.name?.toLowerCase() === String(userPlanKey).toLowerCase()
    );
    if (matched && matched.name) {
      const norm = normalizePlan(matched.id);
      const isPaid = (matched.price && parseFloat(matched.price) > 0) || norm === 'pro' || norm === 'unlimited';
      const badgeClass =
        norm === 'unlimited'
          ? 'plan-badge-unlimited'
          : norm === 'free'
          ? 'plan-badge-free'
          : isPaid
          ? 'plan-badge-pro'
          : 'plan-badge-free';
      return {
        name: matched.name,
        badgeClass,
        isProOrAbove: isPaid,
      };
    }
  }

  // 2. Direct planName property on user object (from API / DB)
  if (user?.planName) {
    const rawName = user.planName;
    const norm = normalizePlan(user.plan || rawName);
    const badgeClass =
      norm === 'unlimited'
        ? 'plan-badge-unlimited'
        : norm === 'free'
        ? 'plan-badge-free'
        : 'plan-badge-pro';
    return {
      name: rawName,
      badgeClass,
      isProOrAbove: norm === 'pro' || norm === 'unlimited',
    };
  }

  // 3. Fallback to canonical original database plan names
  const plan = normalizePlan(user?.plan);
  switch (plan) {
    case 'unlimited':
      return { name: 'CCNA Unlimited Pass', badgeClass: 'plan-badge-unlimited', isProOrAbove: true };
    case 'pro':
      return { name: 'CCNA Pro Pass', badgeClass: 'plan-badge-pro', isProOrAbove: true };
    case 'free':
    default:
      return { name: 'Free Study Pass', badgeClass: 'plan-badge-free', isProOrAbove: false };
  }
};
