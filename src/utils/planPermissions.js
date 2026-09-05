// Plan Access & Permissions Helper
// Dynamic feature gating based on database configured plan bank_permissions

export const EXAM_BANKS = [
  { key: 'bank_a', name: 'Exam Bank A (1-50)', totalQuestions: 50, defaultMax: 50 },
  { key: 'bank_b', name: 'Exam Bank B (51-100)', totalQuestions: 50, defaultMax: 50 },
  { key: 'bank_c', name: 'Exam Bank C (101-150)', totalQuestions: 50, defaultMax: 50 },
  { key: 'bank_d', name: 'Exam Bank D (151-207)', totalQuestions: 57, defaultMax: 57 },
  { key: 'bank_dragdrop', name: 'Drag & Drop Special Bank', totalQuestions: 21, defaultMax: 21 },
  { key: 'bank_all', name: 'All Questions Bank', totalQuestions: 228, defaultMax: 228 },
];

export const normalizePlan = (plan) => {
  if (!plan) return 'free';
  const p = String(plan).toLowerCase();
  if (p.includes('unlimited')) return 'unlimited';
  if (p.includes('pro')) return 'pro';
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
        String(p.id).toLowerCase() === `plan_${userPlanId}`
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
  if (planConfig && planConfig[bankKey]) {
    return Boolean(planConfig[bankKey].enabled);
  }

  // Fallback for offline / unseeded states:
  if (bankKey === 'bank_a' || bankKey === 'bank_b') {
    return true;
  }

  const plan = normalizePlan(user?.plan);
  return plan === 'pro' || plan === 'unlimited';
};

export const getBankAllowedQuestionCount = (user, bankKey, totalQuestions, plans = []) => {
  if (isUserAdmin(user)) return totalQuestions;

  const planConfig = resolveUserPlanConfig(user, plans);
  if (planConfig && planConfig[bankKey]) {
    const maxQ = parseInt(planConfig[bankKey].max_questions, 10);
    if (!isNaN(maxQ) && maxQ > 0) {
      return Math.min(maxQ, totalQuestions);
    }
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
    if (planConfig && typeof planConfig.allow_simulation !== 'undefined') {
      return Boolean(planConfig.allow_simulation);
    }
    const plan = normalizePlan(user?.plan);
    return plan === 'pro' || plan === 'unlimited';
  }

  return true;
};

export const getBankRequiredPlanName = (bankKey) => {
  if (bankKey === 'bank_a' || bankKey === 'bank_b') return 'Free Study Pass';
  return 'CCNA Pro Pass';
};

export const getModeRequiredPlanName = (mode) => {
  if (mode === 'study') return 'Free Study Pass';
  return 'CCNA Pro Pass';
};

export const getPlanDisplayInfo = (user) => {
  if (isUserAdmin(user)) {
    return { name: 'Admin', badgeClass: 'plan-badge-admin', isProOrAbove: true };
  }
  const plan = normalizePlan(user?.plan);
  switch (plan) {
    case 'unlimited':
      return { name: 'Unlimited', badgeClass: 'plan-badge-unlimited', isProOrAbove: true };
    case 'pro':
      return { name: 'Pro Pass', badgeClass: 'plan-badge-pro', isProOrAbove: true };
    case 'free':
    default:
      return { name: 'Free Pass', badgeClass: 'plan-badge-free', isProOrAbove: false };
  }
};
