import React, { useState, useEffect } from 'react';
import './admin.css';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminPlans from './AdminPlans';
import AdminQuestions from './AdminQuestions';
import AdminSettings from './AdminSettings';

function AdminLayout({ currentUser, onExitAdmin }) {
  const getInitialAdminTab = () => {
    const path = window.location.pathname.toLowerCase().replace(/\/+$/, "");
    const search = new URLSearchParams(window.location.search);
    const tabParam = search.get("tab");
    if (tabParam) return tabParam;
    if (path.includes("/admin/users")) return "users";
    if (path.includes("/admin/plans")) return "plans";
    if (path.includes("/admin/questions")) return "questions";
    if (path.includes("/admin/settings")) return "settings";
    return "dashboard";
  };

  const [activeTab, setActiveTab] = useState(getInitialAdminTab);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statsData, setStatsData] = useState(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const switchTab = (tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
    const targetUrl = tab === "dashboard" ? "/admin" : `/admin/${tab}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ adminTab: tab }, "", targetUrl);
    }
  };

  useEffect(() => {
    const handlePop = () => {
      setActiveTab(getInitialAdminTab());
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase().replace(/\/+$/, "");
    const expected = activeTab === "dashboard" ? "/admin" : `/admin/${activeTab}`;
    if (currentPath !== expected && (currentPath === "/admin" || currentPath === "" || currentPath === "/")) {
      window.history.replaceState({ adminTab: activeTab }, "", expected);
    }
  }, [activeTab]);

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
            onClick={() => switchTab('dashboard')}
          >
            <span className="admin-nav-icon">📊</span>
            <span>Dashboard</span>
          </button>

          <div className="admin-nav-section-title">Management</div>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => switchTab('users')}
          >
            <span className="admin-nav-icon">👥</span>
            <span>Candidates (Users)</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => switchTab('plans')}
          >
            <span className="admin-nav-icon">💳</span>
            <span>Plans & Billing</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => switchTab('questions')}
          >
            <span className="admin-nav-icon">❓</span>
            <span>Question Banks</span>
          </button>

          <div className="admin-nav-section-title">Configuration</div>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => switchTab('settings')}
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
              onNavigate={(tab) => switchTab(tab)}
              onOpenCreateUser={() => {
                switchTab('users');
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
