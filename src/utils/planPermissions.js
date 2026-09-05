// Plan Access & Permissions Helper
// Standardizes feature gating between Free, Pro, Unlimited, and Admin

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

export const isPlanAllowedForBank = (user, bankKey) => {
  if (isUserAdmin(user)) return true;
  
  // Exam A and Exam B are free for all study candidates
  if (bankKey === 'bank_a' || bankKey === 'bank_b') {
    return true;
  }

  // Exam C, Exam D, Drag & Drop Special, and All Questions require Pro or Unlimited
  const plan = normalizePlan(user?.plan);
  return plan === 'pro' || plan === 'unlimited';
};

export const isPlanAllowedForMode = (user, mode) => {
  if (isUserAdmin(user)) return true;

  // Study Mode is accessible on all tiers
  if (mode === 'study') {
    return true;
  }

  // Official 90-minute timed Simulation Mode requires Pro or Unlimited
  if (mode === 'simulation') {
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
