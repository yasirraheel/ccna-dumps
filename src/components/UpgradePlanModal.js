import React, { useState, useEffect } from "react";
import { normalizePlan } from "../utils/planPermissions";

function UpgradePlanModal({
  isOpen,
  onClose,
  currentUser,
  onOpenAuth,
  onPlanUpgraded,
  lockContext
}) {
  const [plans, setPlans] = useState([]);
  const [upgradingId, setUpgradingId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    setFeedback(null);
    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => {
        if (data.plans && data.plans.length > 0) {
          setPlans(data.plans);
        }
      })
      .catch((e) => console.warn("Fetch public plans error:", e));
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPlan = normalizePlan(currentUser?.plan);

  const handleSelectPlan = async (planId) => {
    if (!currentUser) {
      onClose();
      if (onOpenAuth) onOpenAuth("login");
      return;
    }

    const normalizedTarget = normalizePlan(planId);
    if (normalizedTarget === currentPlan) {
      setFeedback({ type: "info", message: "You are already on this plan." });
      return;
    }

    setUpgradingId(planId);
    setFeedback(null);
    try {
      const token = localStorage.getItem("ccna_auth_token");
      const res = await fetch("/api/user/upgrade-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ plan: planId })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setFeedback({ type: "success", message: data.message || "Plan updated successfully!" });
        if (onPlanUpgraded) {
          onPlanUpgraded(data.user, data.token);
        }
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setFeedback({ type: "error", message: data.error || "Failed to update plan." });
      }
    } catch (err) {
      setFeedback({ type: "error", message: "Network error upgrading plan." });
    } finally {
      setUpgradingId(null);
    }
  };

  const defaultPlans = [
    {
      id: "plan_free",
      name: "Free Study Pass",
      price: 0,
      billing_cycle: "lifetime",
      description: "Standard access to introductory exam banks.",
      features: [
        "Exam A (Questions 1–50)",
        "Exam B (Questions 51–100)",
        "Study Mode with Explanations",
        "Local Question Notes & History"
      ]
    },
    {
      id: "plan_pro",
      name: "CCNA Pro Pass",
      price: 19.99,
      billing_cycle: "monthly",
      description: "Full access to all 228 questions, simulations, and Drag & Drop.",
      featured: true,
      features: [
        "All Exam Banks (A, B, C, D, D&D)",
        "Full 228 Exam Questions",
        "Official 90-min Timed Simulations",
        "Drag & Drop Interactive Questions",
        "Cloud Notes & Progress Sync"
      ]
    },
    {
      id: "plan_unlimited",
      name: "CCNA Unlimited Pass",
      price: 49.99,
      billing_cycle: "lifetime",
      description: "Lifetime unrestricted access to all question banks & future updates.",
      features: [
        "Lifetime Access & All Updates",
        "All 228 CCNA Questions",
        "Unlimited Simulations & Retakes",
        "Real-time Instant Answers",
        "Priority Sync & Full Access"
      ]
    }
  ];

  const displayPlans = plans.length > 0 ? plans : defaultPlans;

  return (
    <div className="upgrade-modal-backdrop" onClick={onClose}>
      <div
        className="upgrade-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="upgrade-modal-close"
          onClick={onClose}
          title="Close dialog"
        >
          ✕
        </button>

        <div className="upgrade-modal-header">
          <div className="upgrade-header-pill">⚡ CCNA Exam Access Passes</div>
          <h2 className="upgrade-modal-title">
            {lockContext?.title || "Unlock Full CCNA Exam Access"}
          </h2>
          <p className="upgrade-modal-subtitle">
            {lockContext?.reason ||
              "Choose a pass to unlock Exam C, Exam D, Drag & Drop Special, and official 90-minute timed Simulation Mode."}
          </p>
        </div>

        {feedback && (
          <div className={`upgrade-feedback-box ${feedback.type}`}>
            {feedback.message}
          </div>
        )}

        <div className="upgrade-plans-grid">
          {displayPlans.map((p) => {
            const normalizedP = normalizePlan(p.id);
            const isCurrent = normalizedP === currentPlan;
            const isFeatured = p.id === "plan_pro" || p.featured;

            return (
              <div
                key={p.id}
                className={`upgrade-plan-card ${isFeatured ? "featured-tier" : ""} ${
                  isCurrent ? "current-tier" : ""
                }`}
              >
                {isFeatured && (
                  <div className="tier-popular-ribbon">MOST POPULAR</div>
                )}
                {isCurrent && (
                  <div className="tier-active-pill">CURRENT PLAN</div>
                )}

                <div className="tier-card-header">
                  <h3 className="tier-card-name">{p.name}</h3>
                  <div className="tier-card-price">
                    <span className="price-currency">$</span>
                    <span className="price-amount">{p.price}</span>
                    {p.price > 0 && (
                      <span className="price-cycle">
                        /{p.billing_cycle === "monthly" ? "mo" : "lifetime"}
                      </span>
                    )}
                  </div>
                  <p className="tier-card-desc">{p.description}</p>
                </div>

                <ul className="tier-features-list">
                  {(p.features || []).map((feat, idx) => (
                    <li key={idx} className="tier-feature-item">
                      <span className="tier-feat-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="tier-card-footer">
                  {isCurrent ? (
                    <button
                      type="button"
                      className="btn-tier-action current-btn"
                      disabled
                    >
                      Active Plan ✓
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`btn-tier-action ${
                        isFeatured ? "btn-tier-primary" : "btn-tier-secondary"
                      }`}
                      onClick={() => handleSelectPlan(p.id)}
                      disabled={upgradingId !== null}
                    >
                      {upgradingId === p.id
                        ? "Activating..."
                        : !currentUser
                        ? "Sign In to Select"
                        : p.price === 0
                        ? "Downgrade to Free"
                        : `Upgrade to ${p.name}`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="upgrade-modal-footer">
          <div className="upgrade-guarantee-note">
            🔒 Instant access upon activation. Cisco 200-301 updated question banks.
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradePlanModal;
