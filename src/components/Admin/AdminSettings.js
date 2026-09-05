import React, { useState } from 'react';
import { adminFetch } from '../../utils/adminApi';

function AdminSettings({ currentUser }) {
  const [testEmailTo, setTestEmailTo] = useState(currentUser?.email || 'saadmaqbool7861@gmail.com');
  const [testSubject, setTestSubject] = useState('CCNA Exam Prep - SMTP Test Email');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState(null);

  const handleSendTestEmail = async (e) => {
    e.preventDefault();
    try {
      setSendingEmail(true);
      setEmailResult(null);

      const res = await adminFetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testEmailTo,
          subject: testSubject
        })
      });

      const data = await res.json();
      if (res.ok) {
        setEmailResult({
          type: 'success',
          message: data.message || `Test email sent to ${testEmailTo} via Hostinger SSL SMTP!`
        });
      } else {
        setEmailResult({
          type: 'error',
          message: data.error || 'Failed to dispatch test email.'
        });
      }
    } catch (err) {
      setEmailResult({
        type: 'error',
        message: 'Network error communicating with mail dispatcher API.'
      });
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="admin-settings-view">
      {/* SYSTEM ARCHITECTURE & HEALTH CARDS */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <span className="admin-kpi-label">Database Status</span>
            <span className="admin-kpi-val" style={{ color: '#22c55e', fontSize: '22px' }}>
              ● Operational
            </span>
            <span className="admin-kpi-sub">MySQL • 145.79.25.128</span>
          </div>
          <div className="admin-kpi-icon icon-green">🗄️</div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <span className="admin-kpi-label">Hostinger SMTP</span>
            <span className="admin-kpi-val" style={{ color: '#38bdf8', fontSize: '22px' }}>
              ● Active (SSL)
            </span>
            <span className="admin-kpi-sub">smtp.hostinger.com:465</span>
          </div>
          <div className="admin-kpi-icon icon-blue">✉️</div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-info">
            <span className="admin-kpi-label">Active Questions</span>
            <span className="admin-kpi-val" style={{ color: '#c084fc', fontSize: '22px' }}>
              228 CCNA
            </span>
            <span className="admin-kpi-sub">All Banks Verified</span>
          </div>
          <div className="admin-kpi-icon icon-purple">✅</div>
        </div>
      </div>

      {/* SMTP LIVE DISPATCH TESTER TOOL */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <span>🚀</span> Hostinger SMTP Live Mail Tester
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>
              Send an authenticated test email using Hostinger SSL SMTP on port 465 to verify OTP delivery anytime.
            </p>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          {emailResult && (
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '8px',
                marginBottom: '20px',
                background: emailResult.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: `1px solid ${emailResult.type === 'success' ? '#22c55e' : '#ef4444'}`,
                color: emailResult.type === 'success' ? '#4ade80' : '#fca5a5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <strong>{emailResult.type === 'success' ? '✅ Dispatch Confirmed:' : '⚠️ Dispatch Error:'}</strong>{' '}
                {emailResult.message}
              </div>
              <button
                type="button"
                onClick={() => setEmailResult(null)}
                style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSendTestEmail} style={{ maxWidth: '600px' }}>
            <div className="admin-form-group" style={{ marginBottom: '16px' }}>
              <label className="admin-form-label">Recipient Email Address</label>
              <input
                type="email"
                className="admin-form-input"
                placeholder="e.g. yourname@gmail.com"
                value={testEmailTo}
                onChange={(e) => setTestEmailTo(e.target.value)}
                required
              />
            </div>

            <div className="admin-form-group" style={{ marginBottom: '20px' }}>
              <label className="admin-form-label">Email Subject</label>
              <input
                type="text"
                className="admin-form-input"
                value={testSubject}
                onChange={(e) => setTestSubject(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-admin-primary"
              disabled={sendingEmail}
            >
              {sendingEmail ? '⏳ Connecting to Hostinger SMTP...' : '✉️ Send Test Email Now'}
            </button>
          </form>
        </div>
      </div>

      {/* PLATFORM CONFIGURATION SUMMARY */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <span>⚙️</span> Environment & Server Configuration
          </h3>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <tbody>
              <tr>
                <td style={{ width: '220px', fontWeight: 600, color: '#94a3b8' }}>Application Name</td>
                <td style={{ color: '#f8fafc' }}>Cisco 200-301 CCNA Exam Simulator</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#94a3b8' }}>Production URL</td>
                <td><a href="https://ccna-dumps.hassanagro.com" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>https://ccna-dumps.hassanagro.com</a></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#94a3b8' }}>SMTP Sender Email</td>
                <td style={{ color: '#22c55e' }}>ccna-dumps@hassanagro.com</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#94a3b8' }}>Authentication Security</td>
                <td style={{ color: '#f8fafc' }}>Bcrypt Hashing (10 rounds) + HMAC-SHA256 JWT Tokens</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, color: '#94a3b8' }}>Default Exam Duration</td>
                <td style={{ color: '#f8fafc' }}>120 Minutes (Official CCNA) / 90 Minutes (Speed Simulation)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
