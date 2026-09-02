import React, { useState, useEffect, useRef } from "react";

function NavigationMenu({
  currentView,
  onNavigate,
  candidateName,
  pageTitle = "Cisco 200-301 CCNA",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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

      <div className="nav-header-right">
        <div
          className="nav-user-avatar"
          title={candidateName ? `Candidate: ${candidateName}` : "CCNA Candidate"}
        >
          <span>{getInitials(candidateName)}</span>
        </div>
      </div>
    </header>
  );
}

export default NavigationMenu;
