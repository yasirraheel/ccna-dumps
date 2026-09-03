import React from 'react';

function AdminDashboard({ stats, recentAttempts, recentUsers, onNavigate, onOpenCreateUser }) {
  const s = stats || {
    totalUsers: 0,
    verifiedUsers: 0,
    totalAttempts: 0,
    passedAttempts: 0,
    passRate: 0,
    totalQuestions: 228,
    activePlans: 3
  };

  const verifiedPercent = s.totalUsers > 0 
    ? Math.round((s.verifiedUsers / s.totalUsers) * 100) 
    : 100;

  return (
    <div className="admin-dashboard-view">
      {/* KPI METRIC CARDS */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <span className="admin-kpi-label">Registered Candidates</span>
            <span className="admin-kpi-val">{s.totalUsers}</span>
            <span className="admin-kpi-sub">
              {s.verifiedUsers} verified ({verifiedPercent}%)
            </span>
          </div>
          <div className="admin-kpi-icon icon-green">👥</div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <span className="admin-kpi-label">Exams Completed</span>
            <span className="admin-kpi-val">{s.totalAttempts}</span>
            <span className="admin-kpi-sub">
              {s.passedAttempts} passed candidate exams
            </span>
          </div>
          <div className="admin-kpi-icon icon-blue">📝</div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <span className="admin-kpi-label">Overall Pass Rate</span>
            <span className="admin-kpi-val">{s.passRate}%</span>
            <span className="admin-kpi-sub">Based on 825+ pass criteria</span>
          </div>
          <div className="admin-kpi-icon icon-amber">🎯</div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <span className="admin-kpi-label">Question Bank</span>
            <span className="admin-kpi-val">{s.totalQuestions}</span>
            <span className="admin-kpi-sub">Across 6 Exam Banks</span>
          </div>
          <div className="admin-kpi-icon icon-purple">📚</div>
        </div>
      </div>

      {/* QUICK ACTIONS BANNER */}
      <div className="admin-card" style={{ padding: '20px 24px', background: 'linear-gradient(135deg, #101726, #162032)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#f8fafc' }}>
              ⚡ Admin Quick Actions
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
              Manage candidates, configure exam plans, or test live email dispatching.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-admin-primary"
              onClick={onOpenCreateUser}
            >
              + Add Candidate
            </button>
            <button
              type="button"
              className="btn-admin-secondary"
              onClick={() => onNavigate('plans')}
            >
              💳 Manage Plans
            </button>
            <button
              type="button"
              className="btn-admin-secondary"
              onClick={() => onNavigate('settings')}
            >
              ✉️ Test SMTP Email
            </button>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY SPLIT GRIDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* RECENT EXAM ATTEMPTS */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <span>⏱️</span> Recent Exam Sessions
            </h3>
            <button
              type="button"
              className="btn-admin-secondary"
              style={{ padding: '4px 10px', fontSize: '12px' }}
              onClick={() => onNavigate('users')}
            >
              View Users →
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Exam Bank</th>
                  <th>Score</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {recentAttempts && recentAttempts.length > 0 ? (
                  recentAttempts.map((att, idx) => (
                    <tr key={att.id || idx}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#f8fafc' }}>
                          {att.candidate_name || 'Candidate'}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          {att.user_email || 'guest'}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', color: '#38bdf8' }}>
                          {att.bank_name}
                        </span>
                      </td>
                      <td>
                        <strong>{att.score}</strong> / {att.max_score} ({att.percentage}%)
                      </td>
                      <td>
                        <span className={`badge-pill ${att.passed ? 'badge-passed' : 'badge-failed'}`}>
                          {att.passed ? '✓ PASSED' : '✕ FAILED'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>
                      No exam attempts recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT REGISTERED USERS */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <span>👤</span> Recent Registrations
            </h3>
            <button
              type="button"
              className="btn-admin-secondary"
              style={{ padding: '4px 10px', fontSize: '12px' }}
              onClick={() => onNavigate('users')}
            >
              All Candidates →
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Plan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers && recentUsers.length > 0 ? (
                  recentUsers.map((u, idx) => (
                    <tr key={u.id || idx}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#f8fafc' }}>{u.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{u.email}</div>
                      </td>
                      <td>
                        <span className={`badge-pill ${u.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                          {u.role || 'user'}
                        </span>
                      </td>
                      <td>
                        <span className="badge-pill badge-pro">
                          {u.plan ? u.plan.toUpperCase() : 'FREE'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge-pill ${u.is_verified ? 'badge-verified' : 'badge-unverified'}`}>
                          {u.is_verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>
                      No candidate accounts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
