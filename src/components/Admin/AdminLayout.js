import React, { useState, useEffect } from 'react';
import './admin.css';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminPlans from './AdminPlans';
import AdminQuestions from './AdminQuestions';
import AdminSettings from './AdminSettings';

function AdminLayout({ currentUser, onExitAdmin }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statsData, setStatsData] = useState(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.stats) {
        setStatsData(data);
      }
    } catch (e) {
      console.error('Fetch admin stats error:', e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return '📊 Admin Dashboard';
      case 'users': return '👥 Candidates Management';
      case 'plans': return '💳 Access Plans & Subscriptions';
      case 'questions': return '❓ Exam Question Bank';
      case 'settings': return '⚙️ System Settings & SMTP';
      default: return 'Admin Portal';
    }
  };

  return (
    <div className="admin-portal-container">
      {/* SIDEBAR NAVIGATION */}
      <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-brand-block">
            <div className="admin-brand-icon">⚡</div>
            <div>
              <div className="admin-brand-title">CCNA Exam</div>
              <div className="admin-brand-subtitle">Admin Portal</div>
            </div>
          </div>
          {mobileOpen && (
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
          )}
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section-title">Overview</div>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setMobileOpen(false); }}
          >
            <span className="admin-nav-icon">📊</span>
            <span>Dashboard</span>
          </button>

          <div className="admin-nav-section-title">Management</div>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => { setActiveTab('users'); setMobileOpen(false); }}
          >
            <span className="admin-nav-icon">👥</span>
            <span>Candidates (Users)</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => { setActiveTab('plans'); setMobileOpen(false); }}
          >
            <span className="admin-nav-icon">💳</span>
            <span>Plans & Billing</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => { setActiveTab('questions'); setMobileOpen(false); }}
          >
            <span className="admin-nav-icon">❓</span>
            <span>Question Banks</span>
          </button>

          <div className="admin-nav-section-title">Configuration</div>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setMobileOpen(false); }}
          >
            <span className="admin-nav-icon">⚙️</span>
            <span>Settings & SMTP</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button
            type="button"
            className="btn-admin-back"
            onClick={onExitAdmin}
          >
            <span>⬅️</span>
            <span>Back to Exam App</span>
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="admin-viewport">
        {/* TOPBAR */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>
            <h1 className="admin-page-title">{getPageTitle()}</h1>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-server-badge">
              <span className="admin-pulse-dot"></span>
              <span>System Online</span>
            </div>

            <div className="admin-user-capsule">
              <div className="admin-user-avatar">
                {(currentUser?.name || 'A').charAt(0).toUpperCase()}
              </div>
              <span className="admin-user-name">
                {currentUser?.name || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="admin-content-area">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              stats={statsData?.stats}
              recentAttempts={statsData?.recentAttempts}
              recentUsers={statsData?.recentUsers}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenCreateUser={() => {
                setActiveTab('users');
                setIsCreateUserOpen(true);
              }}
            />
          )}

          {activeTab === 'users' && (
            <AdminUsers
              currentUser={currentUser}
              isCreateOpen={isCreateUserOpen}
              onCloseCreate={(val) => setIsCreateUserOpen(Boolean(val))}
            />
          )}

          {activeTab === 'plans' && <AdminPlans />}

          {activeTab === 'questions' && <AdminQuestions />}

          {activeTab === 'settings' && <AdminSettings currentUser={currentUser} />}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
