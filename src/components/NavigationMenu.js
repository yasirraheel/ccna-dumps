import React, { useState, useEffect, useRef } from "react";

function NavigationMenu({
  currentView,
  onNavigate,
  candidateName,
  currentUser,
  onOpenAuth,
  onLogout,
  pageTitle = "Cisco 200-301 CCNA",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayName = currentUser?.name || candidateName || "Candidate";

  const getInitials = (name) => {
    if (!name || !name.trim()) return "MS";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="cisco-nav-header">
      <div className="nav-header-left" ref={menuRef}>
        <button
          type="button"
          className={`btn-hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          title="Menu"
          aria-label="Navigation Menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <h1
          className="nav-page-title"
          onClick={() => onNavigate("dashboard")}
          style={{ cursor: "pointer" }}
        >
          {pageTitle}
        </h1>

        {isOpen && (
          <div className="nav-dropdown-menu">
            <button
              type="button"
              className={`nav-menu-item ${
                currentView === "dashboard" ? "active" : ""
              }`}
              onClick={() => {
                onNavigate("dashboard");
                setIsOpen(false);
              }}
            >
              <span className="nav-menu-icon">🏠</span>
              <span>Home</span>
            </button>

            <button
              type="button"
              className={`nav-menu-item ${
                currentView === "resume-exams" ? "active" : ""
              }`}
              onClick={() => {
                onNavigate("resume-exams");
                setIsOpen(false);
              }}
            >
              <span className="nav-menu-icon">📑</span>
              <span>My Exams</span>
            </button>

            <button
              type="button"
              className={`nav-menu-item ${
                currentView === "history" ? "active" : ""
              }`}
              onClick={() => {
                onNavigate("history");
                setIsOpen(false);
              }}
            >
              <span className="nav-menu-icon">🕒</span>
              <span>Exam History</span>
            </button>
          </div>
        )}
      </div>

      <div className="nav-header-right" ref={userMenuRef}>
        {currentUser ? (
          <div className="user-profile-wrapper">
            <button
              type="button"
              className="user-profile-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <div
                className="nav-user-avatar"
                title={`Logged in as: ${displayName} (${currentUser.email})`}
              >
                <span>{getInitials(displayName)}</span>
              </div>
              <div className="user-profile-meta">
                <span className="user-profile-name">{displayName}</span>
                <span className="user-badge-verified">Verified ✓</span>
              </div>
              <span className="user-dropdown-caret">▾</span>
            </button>

            {isUserMenuOpen && (
              <div className="nav-user-dropdown-menu">
                <div className="user-dropdown-info">
                  <strong>{displayName}</strong>
                  <span className="user-dropdown-email">{currentUser.email}</span>
                </div>
                <div className="user-dropdown-divider"></div>
                <button
                  type="button"
                  className="user-dropdown-item"
                  onClick={() => {
                    onNavigate("history");
                    setIsUserMenuOpen(false);
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  My Exam Records
                </button>
                <button
                  type="button"
                  className="user-dropdown-item user-dropdown-logout"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav-auth-buttons">
            <button
              type="button"
              className="btn-nav-login"
              onClick={() => onOpenAuth && onOpenAuth("login")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Log In
            </button>
            <button
              type="button"
              className="btn-nav-signup"
              onClick={() => onOpenAuth && onOpenAuth("signup")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavigationMenu;
