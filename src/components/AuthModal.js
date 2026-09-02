import React, { useState, useEffect, useRef } from "react";

const API_AUTH_BASE = "http://localhost:5000/api/auth";

function AuthModal({ isOpen, onClose, currentUser, onAuthSuccess, onLogout, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // "login", "signup", "verify", "forgot", "reset"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // OTP Verification state
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [pendingEmail, setPendingEmail] = useState("");
  const [devOtpHint, setDevOtpHint] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Status & loading
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const otpInputsRef = useRef([]);

  useEffect(() => {
    setMode(initialMode);
    setErrorMsg("");
    setSuccessMsg("");
  }, [initialMode, isOpen]);

  // Resend countdown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  // Handle OTP digit entry
  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5 && otpInputsRef.current[index + 1]) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^[0-9]{6}$/.test(pasted)) {
      const digits = pasted.split("");
      setOtpCode(digits);
      if (otpInputsRef.current[5]) {
        otpInputsRef.current[5].focus();
      }
    }
  };

  // 1. Submit Registration (Signup)
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_AUTH_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account.");
      }

      setPendingEmail(data.email || email.trim());
      if (data.devOtp) setDevOtpHint(data.devOtp);
      setSuccessMsg(data.message || "Verification code sent to your email!");
      setResendCooldown(60);
      setOtpCode(["", "", "", "", "", ""]);
      setMode("verify");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit Email Verification (OTP)
  const handleVerifyEmail = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const code = otpCode.join("").trim();
    if (code.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_AUTH_BASE}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, code }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed.");
      }

      if (data.token && data.user) {
        localStorage.setItem("ccna_auth_token", data.token);
        localStorage.setItem("ccna_auth_user", JSON.stringify(data.user));
        onAuthSuccess(data.user, data.token);
      }
      setSuccessMsg(data.message || "Email verified successfully!");
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Resend OTP Code
  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${API_AUTH_BASE}/resend-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend code.");
      }

      if (data.devOtp) setDevOtpHint(data.devOtp);
      setSuccessMsg("A fresh 6-digit verification code has been dispatched to your email.");
      setResendCooldown(60);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Submit Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim() || !password) {
      setErrorMsg("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_AUTH_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.needsVerification) {
          setPendingEmail(data.email || email.trim());
          if (data.devOtp) setDevOtpHint(data.devOtp);
          setErrorMsg(data.error);
          setResendCooldown(60);
          setOtpCode(["", "", "", "", "", ""]);
          setMode("verify");
          return;
        }
        throw new Error(data.error || "Login failed.");
      }

      localStorage.setItem("ccna_auth_token", data.token);
      localStorage.setItem("ccna_auth_user", JSON.stringify(data.user));
      onAuthSuccess(data.user, data.token);
      setSuccessMsg("Welcome back! Login successful.");
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 5. Submit Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim()) {
      setErrorMsg("Please enter your account email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_AUTH_BASE}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to request password reset.");
      }

      setPendingEmail(email.trim());
      if (data.devOtp) setDevOtpHint(data.devOtp);
      setSuccessMsg(data.message || "Reset code sent to your email.");
      setOtpCode(["", "", "", "", "", ""]);
      setPassword("");
      setConfirmPassword("");
      setMode("reset");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 6. Submit Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const code = otpCode.join("").trim();
    if (code.length !== 6) {
      setErrorMsg("Please enter the 6-digit reset code.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("New password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_AUTH_BASE}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, code, newPassword: password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setSuccessMsg(data.message || "Password reset successful! Please log in.");
      setTimeout(() => {
        setMode("login");
        setPassword("");
        setConfirmPassword("");
        setErrorMsg("");
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header with Cisco Branding & Close */}
        <div className="auth-modal-header">
          <div className="auth-modal-brand">
            <span className="auth-brand-symbol">⫸</span>
            <div>
              <h3 className="auth-modal-title">
                {mode === "login" && "Candidate Sign In"}
                {mode === "signup" && "Create Candidate Account"}
                {mode === "verify" && "Verify Your Email"}
                {mode === "forgot" && "Recover Account Access"}
                {mode === "reset" && "Set New Password"}
              </h3>
              <span className="auth-modal-sub">Cisco 200-301 CCNA Simulator</span>
            </div>
          </div>
          <button type="button" className="auth-modal-close" onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        {/* Tab Switcher (Login vs Sign Up) */}
        {(mode === "login" || mode === "signup") && (
          <div className="auth-tab-group">
            <button
              type="button"
              className={`auth-tab-btn ${mode === "login" ? "active" : ""}`}
              onClick={() => {
                setMode("login");
                setErrorMsg("");
                setSuccessMsg("");
              }}
            >
              🔑 Log In
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${mode === "signup" ? "active" : ""}`}
              onClick={() => {
                setMode("signup");
                setErrorMsg("");
                setSuccessMsg("");
              }}
            >
              📝 Sign Up (New Candidate)
            </button>
          </div>
        )}

        {/* Error and Success Alerts */}
        {errorMsg && (
          <div className="auth-alert auth-alert-error">
            <span className="alert-icon">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-alert auth-alert-success">
            <span className="alert-icon">✓</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Dev OTP Helper Banner */}
        {devOtpHint && (mode === "verify" || mode === "reset") && (
          <div className="auth-dev-otp-card">
            <span className="otp-badge">✉️ Verification Code Dispatched</span>
            <p>
              Sent code to <strong>{pendingEmail}</strong>:
            </p>
            <div className="dev-code-display">
              <span className="code-highlight">{devOtpHint}</span>
              <button
                type="button"
                className="btn-auto-fill-otp"
                onClick={() => {
                  setOtpCode(devOtpHint.split(""));
                }}
              >
                ⚡ Auto Fill Code
              </button>
            </div>
          </div>
        )}

        {/* FORM BODY */}
        <div className="auth-modal-body">
          {/* 1. LOGIN FORM */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="auth-field-group">
                <label className="auth-label">Email Address</label>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="candidate@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="auth-field-group">
                <div className="auth-label-flex">
                  <label className="auth-label">Password</label>
                  <button
                    type="button"
                    className="link-forgot-pw"
                    onClick={() => {
                      setMode("forgot");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-auth-primary" disabled={loading}>
                {loading ? "Authenticating..." : "Sign In to CCNA Simulator ➜"}
              </button>

              <div className="auth-footer-prompt">
                <span>Don't have an account yet?</span>
                <button
                  type="button"
                  className="link-auth-switch"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                >
                  Create one now
                </button>
              </div>
            </form>
          )}

          {/* 2. SIGN UP FORM */}
          {mode === "signup" && (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="auth-field-group">
                <label className="auth-label">Candidate Full Name</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Email Address (For Verification)</label>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="candidate@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-grid-2col">
                <div className="auth-field-group">
                  <label className="auth-label">Password (6+ chars)</label>
                  <input
                    type="password"
                    className="auth-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-field-group">
                  <label className="auth-label">Confirm Password</label>
                  <input
                    type="password"
                    className="auth-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-security-notice">
                <span>🔒 Secure registration: An email verification code will be generated to activate your exam account.</span>
              </div>

              <button type="submit" className="btn-auth-primary" disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up & Verify Email ➜"}
              </button>

              <div className="auth-footer-prompt">
                <span>Already registered?</span>
                <button
                  type="button"
                  className="link-auth-switch"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* 3. EMAIL VERIFICATION FORM (6-DIGIT OTP) */}
          {mode === "verify" && (
            <div className="auth-verify-container">
              <div className="verify-icon-banner">
                <span className="verify-big-icon">✉️</span>
                <h4>Enter Verification Code</h4>
                <p>
                  We have sent a 6-digit verification code to{" "}
                  <strong>{pendingEmail}</strong>. Enter it below to activate your account.
                </p>
              </div>

              <div className="otp-boxes-wrapper" onPaste={handleOtpPaste}>
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputsRef.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    className={`otp-digit-input ${digit ? "filled" : ""}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              <button
                type="button"
                className="btn-auth-primary"
                onClick={handleVerifyEmail}
                disabled={loading || otpCode.some((d) => !d)}
              >
                {loading ? "Verifying Code..." : "Verify & Complete Login ✓"}
              </button>

              <div className="verify-resend-row">
                {resendCooldown > 0 ? (
                  <span className="resend-countdown">
                    Resend code in <strong>{resendCooldown}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    className="btn-resend-code"
                    onClick={handleResendCode}
                    disabled={loading}
                  >
                    ↺ Resend Verification Code
                  </button>
                )}
                <button
                  type="button"
                  className="btn-change-email"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                >
                  Change Email
                </button>
              </div>
            </div>
          )}

          {/* 4. FORGOT PASSWORD */}
          {mode === "forgot" && (
            <form onSubmit={handleForgotPassword} className="auth-form">
              <div className="verify-icon-banner">
                <span className="verify-big-icon">🔑</span>
                <h4>Reset Your Password</h4>
                <p>
                  Enter the email address associated with your CCNA candidate account. We will send you a verification code to set a new password.
                </p>
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Candidate Email Address</label>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="candidate@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <button type="submit" className="btn-auth-primary" disabled={loading}>
                {loading ? "Sending Reset Code..." : "Send Reset Code ➜"}
              </button>

              <div className="auth-footer-prompt">
                <button
                  type="button"
                  className="link-auth-switch"
                  onClick={() => {
                    setMode("login");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* 5. RESET PASSWORD */}
          {mode === "reset" && (
            <form onSubmit={handleResetPassword} className="auth-form">
              <div className="verify-icon-banner">
                <span className="verify-big-icon">🔒</span>
                <h4>Enter Reset Code & New Password</h4>
                <p>
                  Enter the 6-digit reset code sent to <strong>{pendingEmail}</strong>.
                </p>
              </div>

              <div className="otp-boxes-wrapper" onPaste={handleOtpPaste}>
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputsRef.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    className={`otp-digit-input ${digit ? "filled" : ""}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              <div className="auth-field-group">
                <label className="auth-label">New Password (6+ characters)</label>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="auth-field-group">
                <label className="auth-label">Confirm New Password</label>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-auth-primary" disabled={loading}>
                {loading ? "Updating Password..." : "Save New Password & Sign In ✓"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
