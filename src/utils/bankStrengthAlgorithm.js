/**
 * Bank Strength & Intervention Algorithm
 * 
 * Accurately analyzes a candidate's historical exam attempts per question bank,
 * applying recency-weighted scoring, pass-consistency blending, and trend detection
 * to determine bank mastery strength and flag which bank needs urgent intervention.
 */

import { EXAM_BANKS } from "./planPermissions.js";

const PASSING_PERCENTAGE = 82.5;

/**
 * Matches an exam attempt record to one of the canonical bank keys:
 * 'bank_a' | 'bank_b' | 'bank_c' | 'bank_d' | 'bank_dragdrop' | 'bank_all'
 */
export function matchExamToBankKey(exam) {
  if (!exam) return null;
  if (exam.bankKey && typeof exam.bankKey === "string") {
    return exam.bankKey;
  }
  if (exam.selectedBankKey && typeof exam.selectedBankKey === "string") {
    return exam.selectedBankKey;
  }

  const rawName = String(
    exam.bankName || exam.selectedBankName || exam.name || ""
  ).toLowerCase();

  // 1. Drag & Drop Special Bank
  if (
    rawName.includes("drag & drop") ||
    rawName.includes("drag and drop") ||
    rawName.includes("dragdrop")
  ) {
    return "bank_dragdrop";
  }

  // 2. Exam C (101-150) - Check before A to prevent 101-150 from triggering 1-50
  if (
    rawName.includes("exam c") ||
    rawName.includes("bank c") ||
    /\b101\s*[-–]\s*150\b/.test(rawName)
  ) {
    return "bank_c";
  }

  // 3. Exam D (151-207)
  if (
    rawName.includes("exam d") ||
    rawName.includes("bank d") ||
    /\b151\s*[-–]\s*207\b/.test(rawName)
  ) {
    return "bank_d";
  }

  // 4. Exam B (51-100)
  if (
    rawName.includes("exam b") ||
    rawName.includes("bank b") ||
    /\b51\s*[-–]\s*100\b/.test(rawName)
  ) {
    return "bank_b";
  }

  // 5. Exam A (1-50)
  if (
    rawName.includes("exam a") ||
    rawName.includes("bank a") ||
    (/\b1\s*[-–]\s*50\b/.test(rawName) &&
      !rawName.includes("101") &&
      !rawName.includes("151"))
  ) {
    return "bank_a";
  }

  // 6. All Questions / Full Pool
  if (
    rawName.includes("all questions") ||
    rawName.includes("all available") ||
    rawName.includes("full ccna") ||
    rawName.includes("full question") ||
    rawName.includes("228")
  ) {
    return "bank_all";
  }

  // Fallback: inspect question content if questions array is present
  if (Array.isArray(exam.questions) && exam.questions.length > 0) {
    const isAllDragDrop = exam.questions.every(
      (q) => q.type === "drag_drop" || q.dragDropData || q.isDragDrop
    );
    if (isAllDragDrop) return "bank_dragdrop";

    const ids = exam.questions.map((q) => Number(q.id)).filter((id) => !isNaN(id));
    if (ids.length > 0) {
      const minId = Math.min(...ids);
      const maxId = Math.max(...ids);
      if (minId >= 1 && maxId <= 50) return "bank_a";
      if (minId >= 51 && maxId <= 100) return "bank_b";
      if (minId >= 101 && maxId <= 150) return "bank_c";
      if (minId >= 151 && maxId <= 207) return "bank_d";
      if (exam.questions.length > 60 || (minId <= 50 && maxId >= 150)) {
        return "bank_all";
      }
    }
  }

  return null;
}

/**
 * Calculates user statistics and mastery strength for a single exam bank.
 */
export function calculateBankStats(bankKey, pastExams = [], currentUser = null) {
  if (!Array.isArray(pastExams) || pastExams.length === 0) {
    return getEmptyBankStats(bankKey);
  }

  // Filter exams that belong to this bank
  const bankExams = pastExams.filter((exam) => {
    if (!exam) return false;
    // If currentUser is specified, ensure exam belongs to this user (or guest local session)
    if (currentUser?.id && exam.userId && String(exam.userId) !== String(currentUser.id)) {
      return false;
    }
    return matchExamToBankKey(exam) === bankKey;
  });

  if (bankExams.length === 0) {
    return getEmptyBankStats(bankKey);
  }

  // Sort chronologically ascending (oldest first, newest last)
  const sorted = [...bankExams].sort((a, b) => {
    const dateA = Number(a?.date || 0);
    const dateB = Number(b?.date || 0);
    return dateA - dateB;
  });

  const totalAttempts = sorted.length;
  let passCount = 0;
  const scores = [];

  for (let i = 0; i < sorted.length; i++) {
    const exam = sorted[i];
    const pct = Math.max(0, Math.min(100, Number(exam.percentage || 0)));
    scores.push(pct);

    const isPassed = exam.passed === true || pct >= PASSING_PERCENTAGE;
    if (isPassed) {
      passCount++;
    }
  }

  const failCount = totalAttempts - passCount;
  const passRate = (passCount / totalAttempts) * 100;

  // Simple unweighted average
  const sumScores = scores.reduce((sum, s) => sum + s, 0);
  const averageScore = Math.round(sumScores / totalAttempts);

  // Latest attempt details
  const latestExam = sorted[sorted.length - 1];
  const latestScore = Math.round(Number(latestExam.percentage || 0));
  const latestPassed = latestExam.passed === true || latestScore >= PASSING_PERCENTAGE;

  // 1. Recency-weighted average score
  // Newer attempts carry progressive weight: w_i = 1.0 + (i * 0.6)
  let weightedScoreSum = 0;
  let totalWeight = 0;
  for (let i = 0; i < scores.length; i++) {
    const weight = 1.0 + i * 0.6;
    weightedScoreSum += scores[i] * weight;
    totalWeight += weight;
  }
  const recencyWeightedScore = totalWeight > 0 ? weightedScoreSum / totalWeight : averageScore;

  // 2. Base strength: 70% weighted score + 30% pass consistency
  let baseStrength = 0.70 * recencyWeightedScore + 0.30 * passRate;

  // 3. Trend bonus / penalty
  let trend = 0;
  let trendBonus = 0;
  if (totalAttempts >= 2) {
    const prevAvg = scores.slice(0, -1).reduce((a, b) => a + b, 0) / (totalAttempts - 1);
    trend = latestScore - prevAvg;
    if (trend > 10) {
      trendBonus = 3; // Recent significant improvement
    } else if (trend < -10) {
      trendBonus = -3; // Recent drop
    }
  }

  // 4. Final Strength Score (clamped 0 to 100)
  const strengthScore = Math.min(100, Math.max(0, Math.round(baseStrength + trendBonus)));

  // 5. Tier & Intervention Status
  // Conditions for needing intervention:
  // - Strength score < 70%
  // - OR latest attempt failed when user has 2+ attempts
  // - OR user has failed more times than passed
  const needsIntervention =
    strengthScore < 70 || (!latestPassed && totalAttempts >= 2) || failCount > passCount;

  let strengthTier = "moderate";
  let strengthTierClass = "tier-moderate";
  let strengthLabel = "Moderate";
  let interventionMessage = "Approaching passing standard (82.5%). Practice recommended.";

  if (strengthScore >= 85 && latestPassed) {
    strengthTier = "strong";
    strengthTierClass = "tier-strong";
    strengthLabel = "Strong";
    interventionMessage = "Exam ready. High mastery and consistency demonstrated.";
  } else if (needsIntervention) {
    strengthTier = "needs_attention";
    strengthTierClass = "tier-attention";
    strengthLabel = "Needs Focus";
    interventionMessage = "Below passing threshold. Needs priority study intervention.";
  }

  // Priority formula: higher value = more urgent intervention needed
  const interventionPriority = needsIntervention
    ? (85 - strengthScore) + failCount * 6 + (latestPassed ? 0 : 10)
    : 0;

  return {
    bankKey,
    attemptsCount: totalAttempts,
    passCount,
    failCount,
    passRate: Math.round(passRate),
    averageScore,
    latestScore,
    latestPassed,
    strengthScore,
    strengthTier,
    strengthTierClass,
    strengthLabel,
    needsIntervention,
    untested: false,
    interventionPriority,
    interventionMessage,
    trend: Math.round(trend),
  };
}

/**
 * Returns default empty stats for unattempted banks.
 */
function getEmptyBankStats(bankKey) {
  return {
    bankKey,
    attemptsCount: 0,
    passCount: 0,
    failCount: 0,
    passRate: 0,
    averageScore: 0,
    latestScore: null,
    latestPassed: null,
    strengthScore: 0,
    strengthTier: "unattempted",
    strengthTierClass: "tier-unattempted",
    strengthLabel: "Untested",
    needsIntervention: false,
    untested: true,
    interventionPriority: 0,
    interventionMessage: "Not attempted yet. Complete an exam to calculate mastery strength.",
    trend: 0,
  };
}

/**
 * Computes stats for all banks and produces an intervention summary.
 */
export function getAllBanksAnalysis(pastExams = [], currentUser = null, banks = EXAM_BANKS) {
  const bankStatsMap = {};
  let totalAttemptsAcrossAll = 0;
  let totalPassesAcrossAll = 0;
  let totalFailsAcrossAll = 0;

  const attemptedBanks = [];

  banks.forEach((bank) => {
    const stats = calculateBankStats(bank.key, pastExams, currentUser);
    stats.bankName = bank.name;
    stats.bankDisplayName = bank.name
      .replace("Exam Bank ", "Exam ")
      .replace("Special Bank", "Special")
      .replace("All Questions Bank", "All Questions");

    bankStatsMap[bank.key] = stats;

    totalAttemptsAcrossAll += stats.attemptsCount;
    totalPassesAcrossAll += stats.passCount;
    totalFailsAcrossAll += stats.failCount;

    if (stats.attemptsCount > 0) {
      attemptedBanks.push(stats);
    }
  });

  // Sort banks needing intervention by highest priority first
  const banksNeedingIntervention = attemptedBanks
    .filter((s) => s.needsIntervention)
    .sort((a, b) => b.interventionPriority - a.interventionPriority);

  const weakestBank = banksNeedingIntervention.length > 0 ? banksNeedingIntervention[0] : null;

  const strongestBank = attemptedBanks.length > 0
    ? [...attemptedBanks].sort((a, b) => b.strengthScore - a.strengthScore)[0]
    : null;

  // Overall candidate readiness across attempted banks
  const overallReadiness = attemptedBanks.length > 0
    ? Math.round(
        attemptedBanks.reduce((sum, s) => sum + s.strengthScore, 0) / attemptedBanks.length
      )
    : 0;

  return {
    bankStatsMap,
    totalAttemptsAcrossAll,
    totalPassesAcrossAll,
    totalFailsAcrossAll,
    attemptedBanksCount: attemptedBanks.length,
    unattemptedBanksCount: banks.length - attemptedBanks.length,
    banksNeedingIntervention,
    weakestBank,
    strongestBank,
    overallReadiness,
  };
}
