import React, { useState, useEffect } from 'react';
import { adminFetch } from '../../utils/adminApi';
import { EXAM_BANKS } from '../../utils/planPermissions';

const DEFAULT_BANK_PERMS = {
  bank_a: { enabled: true, max_questions: 50 },
  bank_b: { enabled: true, max_questions: 50 },
  bank_c: { enabled: false, max_questions: 0 },
  bank_d: { enabled: false, max_questions: 0 },
  bank_dragdrop: { enabled: false, max_questions: 0 },
  bank_all: { enabled: false, max_questions: 0 },
  allow_simulation: false
};

const ALL_ALLOWED_PERMS = {
  bank_a: { enabled: true, max_questions: 50 },
  bank_b: { enabled: true, max_questions: 50 },
  bank_c: { enabled: true, max_questions: 50 },
  bank_d: { enabled: true, max_questions: 57 },
  bank_dragdrop: { enabled: true, max_questions: 21 },
  bank_all: { enabled: true, max_questions: 228 },
  allow_simulation: true
};

function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [actionFeedback, setActionFeedback] = useState(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await adminFetch('/api/admin/plans');
      const data = await res.json();
      if (data.plans) {
        setPlans(data.plans);
      }
    } catch (e) {
      console.error('Fetch plans error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSavePlan = async (e) => {
    e.preventDefault();
    const target = editingPlan;
    if (!target) return;

    try {
      const res = await adminFetch('/api/admin/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(target)
      });
      const data = await res.json();
      if (res.ok) {
        setActionFeedback({ type: 'success', message: 'Plan saved successfully with dynamic bank permissions!' });
        setEditingPlan(null);
        setIsCreateOpen(false);
        fetchPlans();
      } else {
        setActionFeedback({ type: 'error', message: data.error || 'Failed to save plan.' });
      }
    } catch (err) {
      setActionFeedback({ type: 'error', message: 'Network error saving plan.' });
    }
  };

  const handleDeletePlan = async (plan) => {
    if (plan.id === 'plan_free' || plan.id === 'plan_pro') {
      alert('Default core plans cannot be deleted.');
      return;
    }
    if (!window.confirm(`Delete plan "${plan.name}"?`)) return;

    try {
      const res = await adminFetch(`/api/admin/plans/${plan.id}`, { method: 'DELETE' });
      if (res.ok) {
        setActionFeedback({ type: 'success', message: 'Plan deleted.' });
        fetchPlans();
      }
    } catch (e) {
      alert('Failed to delete plan.');
    }
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setEditingPlan({
      ...editingPlan,
      features: [...(editingPlan.features || []), featureInput.trim()]
    });
    setFeatureInput('');
  };

  const handleRemoveFeature = (index) => {
    const updated = [...(editingPlan.features || [])];
    updated.splice(index, 1);
    setEditingPlan({ ...editingPlan, features: updated });
  };

  const handleBankToggle = (bankKey, enabled) => {
    const currentPerms = editingPlan.bankPermissions || {};
    const defaultBank = EXAM_BANKS.find(b => b.key === bankKey);
    const existingBank = currentPerms[bankKey] || { enabled: false, max_questions: 0 };

    setEditingPlan({
      ...editingPlan,
      bankPermissions: {
        ...currentPerms,
        [bankKey]: {
          ...existingBank,
          enabled,
          max_questions: enabled ? (existingBank.max_questions || defaultBank?.defaultMax || 50) : 0
        }
      }
    });
  };

  const handleBankLimitChange = (bankKey, limit) => {
    const currentPerms = editingPlan.bankPermissions || {};
    const existingBank = currentPerms[bankKey] || { enabled: true, max_questions: 50 };
    const num = parseInt(limit, 10);
    const val = isNaN(num) ? 0 : Math.max(0, num);

    setEditingPlan({
      ...editingPlan,
      bankPermissions: {
        ...currentPerms,
        [bankKey]: {
          ...existingBank,
          max_questions: val
        }
      }
    });
  };

  const handleSimulationToggle = (allow) => {
    const currentPerms = editingPlan.bankPermissions || {};
    setEditingPlan({
      ...editingPlan,
      bankPermissions: {
        ...currentPerms,
        allow_simulation: allow
      }
    });
  };

  const openCreateModal = () => {
    setEditingPlan({
      id: 'plan_' + Date.now(),
      name: '',
      price: 9.99,
      billingCycle: 'monthly',
      durationDays: 30,
      description: '',
      features: ['Access to practice exams'],
      bankPermissions: { ...ALL_ALLOWED_PERMS },
      isActive: true
    });
    setIsCreateOpen(true);
  };

  const openEditModal = (p) => {
    const existingPerms = p.bank_permissions && typeof p.bank_permissions === 'object' && Object.keys(p.bank_permissions).length > 0
      ? p.bank_permissions
      : (p.id === 'plan_free' ? { ...DEFAULT_BANK_PERMS } : { ...ALL_ALLOWED_PERMS });

    setEditingPlan({
      ...p,
      billingCycle: p.billing_cycle || 'monthly',
      durationDays: p.duration_days || 30,
      bankPermissions: { ...existingPerms }
    });
    setIsCreateOpen(true);
  };

  return (
    <div className="admin-plans-view">
      {actionFeedback && (
        <div
          style={{
            padding: '12px 18px',
            borderRadius: '8px',
            marginBottom: '20px',
            background: actionFeedback.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${actionFeedback.type === 'success' ? '#22c55e' : '#ef4444'}`,
            color: actionFeedback.type === 'success' ? '#4ade80' : '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>{actionFeedback.message}</span>
          <button
            type="button"
            onClick={() => setActionFeedback(null)}
            style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* HEADER BAR */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <span>💳</span> Access Plans & Subscriptions
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>
              Configure pricing tiers, dynamic exam bank access, and question count limits per plan.
            </p>
          </div>

          <button
            type="button"
            className="btn-admin-primary"
            onClick={openCreateModal}
          >
            + Create New Plan
          </button>
        </div>
      </div>

      {/* PLANS CARDS GRID */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
          Loading plans...
        </div>
      ) : (
        <div className="admin-plans-grid">
          {plans.map((p) => {
            const isFree = p.price === 0;
            const perms = p.bank_permissions || {};
            return (
              <div key={p.id} className={`admin-plan-card ${!isFree ? 'featured' : ''}`}>
                <div className="admin-plan-badge">
                  {p.subscribers_count} Candidates
                </div>

                <div className="admin-plan-name">{p.name}</div>
                <div className="admin-plan-price">
                  {isFree ? 'FREE' : `$${Number(p.price).toFixed(2)}`}
                  {!isFree && <span className="admin-plan-cycle"> / {p.billing_cycle || 'month'}</span>}
                </div>

                <div className="admin-plan-desc">{p.description}</div>

                {/* DYNAMIC BANK PERMISSIONS SUMMARY */}
                <div className="admin-plan-perms-summary">
                  {EXAM_BANKS.map((b) => {
                    const conf = perms[b.key];
                    const isAllowed = conf && conf.enabled;
                    if (!isAllowed) {
                      return (
                        <span key={b.key} className="admin-perm-tag tag-locked">
                          🔒 {b.name.replace(/Exam Bank |Bank /, '').replace(/ \(\d+-\d+\)/, '')} Locked
                        </span>
                      );
                    }
                    const maxQ = conf.max_questions;
                    const countLabel = maxQ && maxQ > 0 && maxQ < b.totalQuestions ? `${maxQ}/${b.totalQuestions} Qs` : `All ${b.totalQuestions} Qs`;
                    return (
                      <span key={b.key} className="admin-perm-tag tag-allowed">
                        ✓ {b.name.replace(/Exam Bank |Bank /, '').replace(/ \(\d+-\d+\)/, '')} ({countLabel})
                      </span>
                    );
                  })}
                  <span className={`admin-perm-tag ${perms.allow_simulation !== false ? 'tag-allowed' : 'tag-locked'}`}>
                    ⏱️ Simulation: {perms.allow_simulation !== false ? 'Allowed' : 'Locked'}
                  </span>
                </div>

                <ul className="admin-plan-features">
                  {p.features && p.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button
                    type="button"
                    className="btn-admin-secondary"
                    style={{ flex: 1 }}
                    onClick={() => openEditModal(p)}
                  >
                    ✏️ Edit Plan
                  </button>
                  {p.id !== 'plan_free' && p.id !== 'plan_pro' && (
                    <button
                      type="button"
                      className="btn-table-action btn-table-delete"
                      onClick={() => handleDeletePlan(p)}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT / CREATE PLAN MODAL */}
      {isCreateOpen && editingPlan && (
        <div className="admin-modal-backdrop" onClick={() => setIsCreateOpen(false)}>
          <div className="admin-modal-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h4 className="admin-modal-title">
                {editingPlan.id.startsWith('plan_') && !plans.find(p => p.id === editingPlan.id) ? 'Create Plan' : `Edit Plan: ${editingPlan.name}`}
              </h4>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setIsCreateOpen(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSavePlan}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Plan Title</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Price (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="admin-form-input"
                      value={editingPlan.price}
                      onChange={(e) => setEditingPlan({ ...editingPlan, price: parseFloat(e.target.value) || 0 })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Billing Cycle</label>
                    <select
                      className="admin-select"
                      value={editingPlan.billingCycle || 'monthly'}
                      onChange={(e) => setEditingPlan({ ...editingPlan, billingCycle: e.target.value })}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly (90 Days)</option>
                      <option value="lifetime">Lifetime Access</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Plan Description</label>
                  <textarea
                    rows={2}
                    className="admin-form-textarea"
                    value={editingPlan.description || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  />
                </div>

                {/* DYNAMIC EXAM BANK ACCESS & QUESTION LIMITS */}
                <div className="admin-form-group">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label className="admin-form-label" style={{ margin: 0, color: '#38bdf8' }}>
                      🎯 Exam Bank Access & Question Limits
                    </label>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                      Configure which banks and how many questions are accessible
                    </span>
                  </div>

                  <div className="admin-bank-perms-container">
                    {EXAM_BANKS.map((b) => {
                      const bankConf = (editingPlan.bankPermissions && editingPlan.bankPermissions[b.key]) || {
                        enabled: false,
                        max_questions: 0
                      };
                      const isEnabled = Boolean(bankConf.enabled);
                      const currentMax = bankConf.max_questions || 0;

                      return (
                        <div key={b.key} className={`admin-bank-perm-row ${!isEnabled ? 'disabled' : ''}`}>
                          <div className="admin-bank-perm-left">
                            <input
                              type="checkbox"
                              id={`perm_${b.key}`}
                              className="admin-bank-perm-checkbox"
                              checked={isEnabled}
                              onChange={(e) => handleBankToggle(b.key, e.target.checked)}
                            />
                            <label htmlFor={`perm_${b.key}`} style={{ cursor: 'pointer', margin: 0 }}>
                              <span className="admin-bank-perm-name">{b.name}</span>
                            </label>
                            <span className="admin-bank-perm-badge">{b.totalQuestions} Total Qs</span>
                          </div>

                          <div className="admin-bank-perm-right">
                            {isEnabled ? (
                              <>
                                <span className="admin-bank-limit-label">Questions Allowed:</span>
                                <input
                                  type="number"
                                  min="0"
                                  max={b.totalQuestions}
                                  className="admin-bank-limit-input"
                                  value={currentMax === 0 ? b.totalQuestions : currentMax}
                                  onChange={(e) => handleBankLimitChange(b.key, e.target.value)}
                                  title="Number of questions candidates can attempt from this bank (0 or total = all)"
                                />
                                <button
                                  type="button"
                                  className="admin-preset-btn"
                                  onClick={() => handleBankLimitChange(b.key, 10)}
                                >
                                  10 Qs
                                </button>
                                <button
                                  type="button"
                                  className="admin-preset-btn"
                                  onClick={() => handleBankLimitChange(b.key, 25)}
                                >
                                  25 Qs
                                </button>
                                <button
                                  type="button"
                                  className="admin-preset-btn"
                                  onClick={() => handleBankLimitChange(b.key, b.totalQuestions)}
                                >
                                  All ({b.totalQuestions})
                                </button>
                              </>
                            ) : (
                              <span style={{ fontSize: '12px', color: '#f87171', fontWeight: 600 }}>
                                🔒 Locked for this Plan
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Simulation Mode Permission */}
                    <div className="admin-sim-perm-box">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="checkbox"
                          id="perm_allow_sim"
                          className="admin-bank-perm-checkbox"
                          checked={editingPlan.bankPermissions?.allow_simulation !== false}
                          onChange={(e) => handleSimulationToggle(e.target.checked)}
                        />
                        <label htmlFor="perm_allow_sim" style={{ cursor: 'pointer', margin: 0, color: '#f8fafc', fontWeight: 700, fontSize: '13px' }}>
                          ⏱️ Allow 90-Minute Timed Simulation Mode
                        </label>
                      </div>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                        {editingPlan.bankPermissions?.allow_simulation !== false ? 'Enabled' : 'Restricted (Locked)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Marketing Features Checklist</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      className="admin-form-input"
                      placeholder="Add feature bullet e.g. Access to Exam Bank D"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="btn-admin-secondary"
                      onClick={handleAddFeature}
                    >
                      Add
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {editingPlan.features && editingPlan.features.map((feat, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#090d16',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '13px'
                        }}
                      >
                        <span>✓ {feat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', fontWeight: 800 }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn-admin-secondary"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPlans;
