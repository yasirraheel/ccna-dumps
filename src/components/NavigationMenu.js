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
                  📊 My Exam Records
                </button>
                <button
                  type="button"
                  className="user-dropdown-item user-dropdown-logout"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    if (onLogout) onLogout();
                  }}
                >
                  🚪 Sign Out
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
              🔑 Log In
            </button>
            <button
              type="button"
              className="btn-nav-signup"
              onClick={() => onOpenAuth && onOpenAuth("signup")}
            >
              📝 Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavigationMenu;
