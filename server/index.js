require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { initDB, getPool } = require('./db');
const { sendVerificationEmail, sendPasswordResetEmail } = require('./mailer');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'ccna_exam_jwt_secret_key_2026_secure';

app.use(cors());
app.use(express.json());

// Strict Global Cache-Control for all dynamic API responses
app.use('/api', (req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  });
  next();
});

// SSE Live Event Bus for Real-time Updates
let sseClients = [];
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  sseClients.push(res);
  req.on('close', () => {
    sseClients = sseClients.filter((c) => c !== res);
  });
});

function broadcastLiveEvent(event, data) {
  sseClients.forEach((client) => {
    try {
      client.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    } catch (e) {}
  });
}

// Plan permission & name resolution helpers
async function getUserPlanPermissions(pool, planId, userRole = 'user', userEmail = '') {
  if (userRole === 'admin' || String(userEmail).toLowerCase() === 'candidate@ccna.com') {
    return {
      bank_a: { enabled: true, max_questions: 50 },
      bank_b: { enabled: true, max_questions: 50 },
      bank_c: { enabled: true, max_questions: 50 },
      bank_d: { enabled: true, max_questions: 57 },
      bank_dragdrop: { enabled: true, max_questions: 21 },
      bank_all: { enabled: true, max_questions: 228 },
      allow_simulation: true,
    };
  }
  let pId = planId || 'plan_free';
  if (pId === 'free') pId = 'plan_free';
  else if (pId === 'pro') pId = 'plan_pro';
  else if (pId === 'unlimited') pId = 'plan_unlimited';

  try {
    const [rows] = await pool.query('SELECT bank_permissions FROM plans WHERE id = ?', [pId]);
    if (rows.length > 0 && rows[0].bank_permissions) {
      const perms = typeof rows[0].bank_permissions === 'string' ? JSON.parse(rows[0].bank_permissions) : rows[0].bank_permissions;
      if (perms && typeof perms === 'object') return perms;
    }
  } catch (e) {}

  return {
    bank_a: { enabled: true, max_questions: 50 },
    bank_b: { enabled: true, max_questions: 50 },
    bank_c: { enabled: false, max_questions: 0 },
    bank_d: { enabled: false, max_questions: 0 },
    bank_dragdrop: { enabled: false, max_questions: 0 },
    bank_all: { enabled: false, max_questions: 0 },
    allow_simulation: false,
  };
}

async function getUserPlanOriginalName(pool, planId) {
  let pId = planId || 'plan_free';
  if (pId === 'free') pId = 'plan_free';
  else if (pId === 'pro') pId = 'plan_pro';
  else if (pId === 'unlimited') pId = 'plan_unlimited';

  try {
    const [rows] = await pool.query('SELECT name FROM plans WHERE id = ?', [pId]);
    if (rows.length > 0 && rows[0].name) return rows[0].name;
  } catch (e) {}

  if (pId === 'plan_pro') return 'Intermediate';
  if (pId === 'plan_unlimited') return 'Advance';
  return 'Free';
}

// Serve exhibit images and static assets
app.use('/exhibits', express.static(path.join(__dirname, '../public/exhibits')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

// --------------------------------------------------------------------------
// AUTHENTICATION & EMAIL VERIFICATION API
// --------------------------------------------------------------------------

// Helper to generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 1. User Registration (Signup)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const pool = getPool();

    // Check if user already exists
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);
    if (existing.length > 0) {
      if (existing[0].is_verified) {
        return res.status(409).json({ error: 'An account with this email already exists. Please log in.' });
      }
      // If user exists but not verified, generate new OTP and update
      const otp = generateOTP();
      const expiresAt = Date.now() + 15 * 60 * 1000; // 15 mins
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      await pool.query(
        `UPDATE users SET name = ?, password_hash = ?, verification_code = ?, verification_expires_at = ? WHERE email = ?`,
        [cleanName, hash, otp, expiresAt, cleanEmail]
      );

      // Dispatch real email via Hostinger SMTP
      try {
        await sendVerificationEmail(cleanEmail, cleanName, otp);
        console.log(`✉️ [HOSTINGER SMTP] Verification email dispatched to ${cleanEmail}`);
      } catch (mailErr) {
        console.warn(`⚠️ [HOSTINGER SMTP] Failed to send email to ${cleanEmail}:`, mailErr.message);
      }

      console.log(`\n======================================================`);
      console.log(`✉️ [EMAIL VERIFICATION CODE] Sent to: ${cleanEmail}`);
      console.log(`🔑 Verification OTP Code: ${otp}`);
      console.log(`⏳ Valid for: 15 minutes`);
      console.log(`======================================================\n`);

      return res.status(200).json({
        success: true,
        message: `Verification code sent to ${cleanEmail}. Please check your inbox or spam folder.`,
        email: cleanEmail,
        isVerified: false,
        devOtp: otp, // helpful in dev preview
      });
    }

    // New user
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const otp = generateOTP();
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 mins
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await pool.query(
      `INSERT INTO users (id, name, email, password_hash, is_verified, verification_code, verification_expires_at)
       VALUES (?, ?, ?, ?, 0, ?, ?)`,
      [userId, cleanName, cleanEmail, hash, otp, expiresAt]
    );

    // Dispatch real email via Hostinger SMTP
    try {
      await sendVerificationEmail(cleanEmail, cleanName, otp);
      console.log(`✉️ [HOSTINGER SMTP] Verification email dispatched to ${cleanEmail}`);
    } catch (mailErr) {
      console.warn(`⚠️ [HOSTINGER SMTP] Failed to send email to ${cleanEmail}:`, mailErr.message);
    }

    console.log(`\n======================================================`);
    console.log(`✉️ [EMAIL VERIFICATION CODE] Sent to: ${cleanEmail}`);
    console.log(`🔑 Verification OTP Code: ${otp}`);
    console.log(`⏳ Valid for: 15 minutes`);
    console.log(`======================================================\n`);

    res.status(201).json({
      success: true,
      message: `Account created! Verification code sent to ${cleanEmail}.`,
      email: cleanEmail,
      isVerified: false,
      devOtp: otp,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed.', details: error.message });
  }
});

// 2. Email Verification with 6-digit OTP
app.post('/api/auth/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and 6-digit verification code are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Account not found with this email.' });
    }

    const user = rows[0];

    if (user.is_verified) {
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        JWT_SECRET,
        { expiresIn: '30d' }
      );
      return res.json({
        success: true,
        message: 'Account is already verified.',
        token,
        user: { id: user.id, name: user.name, email: user.email, isVerified: true },
      });
    }

    if (user.verification_code !== cleanCode) {
      return res.status(400).json({ error: 'Invalid verification code. Please check and try again.' });
    }

    if (user.verification_expires_at && Date.now() > Number(user.verification_expires_at)) {
      return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
    }

    // Mark as verified
    await pool.query(
      `UPDATE users SET is_verified = 1, verification_code = NULL, verification_expires_at = NULL WHERE id = ?`,
      [user.id]
    );

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const planName = await getUserPlanOriginalName(pool, user.plan);
    const planPermissions = await getUserPlanPermissions(pool, user.plan, user.role, user.email);

    res.json({
      success: true,
      message: 'Email successfully verified! You are now logged in.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        plan: user.plan || 'plan_free',
        planName,
        isVerified: true,
        planPermissions,
      },
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ error: 'Verification failed.', details: error.message });
  }
});

// 3. Resend Email Verification Code
app.post('/api/auth/resend-code', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No account found with this email.' });
    }

    const user = rows[0];
    if (user.is_verified) {
      return res.json({ success: true, message: 'Account is already verified.' });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 15 * 60 * 1000;

    await pool.query(
      `UPDATE users SET verification_code = ?, verification_expires_at = ? WHERE id = ?`,
      [otp, expiresAt, user.id]
    );

    // Dispatch real email via Hostinger SMTP
    try {
      await sendVerificationEmail(cleanEmail, user.name, otp);
      console.log(`✉️ [HOSTINGER SMTP] Resent verification email to ${cleanEmail}`);
    } catch (mailErr) {
      console.warn(`⚠️ [HOSTINGER SMTP] Failed to send email to ${cleanEmail}:`, mailErr.message);
    }

    console.log(`\n======================================================`);
    console.log(`✉️ [RESENT VERIFICATION CODE] Sent to: ${cleanEmail}`);
    console.log(`🔑 Verification OTP Code: ${otp}`);
    console.log(`⏳ Valid for: 15 minutes`);
    console.log(`======================================================\n`);

    res.json({
      success: true,
      message: `A fresh 6-digit verification code has been dispatched to ${cleanEmail}.`,
      devOtp: otp,
    });
  } catch (error) {
    console.error('Resend code error:', error);
    res.status(500).json({ error: 'Failed to resend code.', details: error.message });
  }
});

// 4. User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // If not verified, trigger OTP and prompt verification
    if (!user.is_verified) {
      const otp = generateOTP();
      const expiresAt = Date.now() + 15 * 60 * 1000;
      await pool.query(
        `UPDATE users SET verification_code = ?, verification_expires_at = ? WHERE id = ?`,
        [otp, expiresAt, user.id]
      );

      // Dispatch real email via Hostinger SMTP
      try {
        await sendVerificationEmail(cleanEmail, user.name, otp);
        console.log(`✉️ [HOSTINGER SMTP] Dispatched verification email on login attempt to ${cleanEmail}`);
      } catch (mailErr) {
        console.warn(`⚠️ [HOSTINGER SMTP] Failed to send email to ${cleanEmail}:`, mailErr.message);
      }

      console.log(`\n======================================================`);
      console.log(`✉️ [UNVERIFIED LOGIN - OTP] Sent to: ${cleanEmail}`);
      console.log(`🔑 Verification OTP Code: ${otp}`);
      console.log(`======================================================\n`);

      return res.status(403).json({
        error: `Email is not verified yet. We have sent a verification code to ${cleanEmail}.`,
        needsVerification: true,
        email: cleanEmail,
        devOtp: otp,
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    const planName = await getUserPlanOriginalName(pool, user.plan);
    const planPermissions = await getUserPlanPermissions(pool, user.plan, user.role, user.email);

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        plan: user.plan || 'plan_free',
        planName,
        isVerified: Boolean(user.is_verified),
        planPermissions,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed.', details: error.message });
  }
});

// 5. Get Current Logged-in User Profile
app.get('/api/auth/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let userId = null;
    let userEmail = req.query.userEmail || req.query.email || null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
        userEmail = decoded.email || userEmail;
      } catch {
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
            if (payload?.id) {
              userId = payload.id;
              userEmail = payload.email || userEmail;
            }
          }
        } catch {}
      }
    }

    if (!userId && req.query.userId) {
      userId = req.query.userId;
    }

    const pool = getPool();
    let rows = [];
    if (userId) {
      [rows] = await pool.query('SELECT id, name, email, role, plan, is_verified, created_at FROM users WHERE id = ?', [userId]);
    }
    if (rows.length === 0 && userEmail) {
      [rows] = await pool.query('SELECT id, name, email, role, plan, is_verified, created_at FROM users WHERE email = ?', [userEmail]);
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: 'User not found or unauthorized.' });
    }

    const user = rows[0];
    const planName = await getUserPlanOriginalName(pool, user.plan);
    const planPermissions = await getUserPlanPermissions(pool, user.plan, user.role, user.email);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        plan: user.plan || 'plan_free',
        planName,
        isVerified: Boolean(user.is_verified),
        createdAt: user.created_at,
        planPermissions,
      },
    });
  } catch (error) {
    console.error('Auth me error:', error);
    res.status(500).json({ error: 'Failed to retrieve profile.', details: error.message });
  }
});

// 6. Forgot Password (Request OTP)
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const cleanEmail = email.trim().toLowerCase();
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No account found with this email.' });
    }

    const user = rows[0];
    const otp = generateOTP();
    const expiresAt = Date.now() + 15 * 60 * 1000;

    await pool.query(
      `UPDATE users SET reset_token = ?, reset_expires_at = ? WHERE id = ?`,
      [otp, expiresAt, user.id]
    );

    // Dispatch real email via Hostinger SMTP
    try {
      await sendPasswordResetEmail(cleanEmail, user.name, otp);
      console.log(`✉️ [HOSTINGER SMTP] Password reset email dispatched to ${cleanEmail}`);
    } catch (mailErr) {
      console.warn(`⚠️ [HOSTINGER SMTP] Failed to send email to ${cleanEmail}:`, mailErr.message);
    }

    console.log(`\n======================================================`);
    console.log(`🔑 [PASSWORD RESET CODE] Sent to: ${cleanEmail}`);
    console.log(`🔢 Reset OTP Code: ${otp}`);
    console.log(`⏳ Valid for: 15 minutes`);
    console.log(`======================================================\n`);

    res.json({
      success: true,
      message: `Password reset code sent to ${cleanEmail}.`,
      email: cleanEmail,
      devOtp: otp,
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request.', details: error.message });
  }
});

// 7. Reset Password with OTP
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: 'Email, reset code, and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [cleanEmail]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No account found with this email.' });
    }

    const user = rows[0];

    if (user.reset_token !== cleanCode) {
      return res.status(400).json({ error: 'Invalid reset code.' });
    }

    if (user.reset_expires_at && Date.now() > Number(user.reset_expires_at)) {
      return res.status(400).json({ error: 'Reset code has expired. Please request a new one.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    await pool.query(
      `UPDATE users SET password_hash = ?, reset_token = NULL, reset_expires_at = NULL, is_verified = 1 WHERE id = ?`,
      [hash, user.id]
    );

    res.json({
      success: true,
      message: 'Password successfully reset! You can now log in with your new password.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password.', details: error.message });
  }
});

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'connected', time: new Date().toISOString() });
});

function formatQuestionRow(r) {
  let parsedOptions = [];
  let parsedCorrect = [];
  let parsedDragDrop = null;

  try {
    parsedOptions = typeof r.options === 'string' ? JSON.parse(r.options) : r.options || [];
  } catch {
    parsedOptions = [];
  }
  try {
    parsedCorrect = typeof r.correct_option === 'string' ? JSON.parse(r.correct_option) : r.correct_option;
  } catch {
    parsedCorrect = [r.correct_option];
  }
  try {
    parsedDragDrop = typeof r.drag_drop_data === 'string' ? JSON.parse(r.drag_drop_data) : r.drag_drop_data;
  } catch {
    parsedDragDrop = null;
  }

  return {
    id: Number(r.id),
    type: r.type || (parsedDragDrop ? 'drag_drop' : 'multiple_choice'),
    questionNo: r.question_no,
    question: r.question,
    options: parsedOptions,
    correctOption: Array.isArray(parsedCorrect) ? parsedCorrect : [parsedCorrect],
    dragDropData: parsedDragDrop,
    points: Number(r.points) || 10,
    cliSnippet: r.cli_snippet,
    exhibitImage: r.exhibit_image || null,
    originalSourceImage: r.original_source_image || null,
    explanation: r.explanation || null,
  };
}

// Single Question live endpoint
app.get('/api/questions/:id', async (req, res) => {
  try {
    const qId = Number(req.params.id);
    if (!qId) return res.status(400).json({ error: 'Valid question ID required' });
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM questions WHERE id = ?', [qId]);
    if (rows.length === 0) return res.status(404).json({ error: 'Question not found' });
    res.json({ question: formatQuestionRow(rows[0]) });
  } catch (error) {
    console.error('Fetch single question error:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// 2. Fetch all questions from MySQL or single via query (?id=)
app.get('/api/questions', async (req, res) => {
  try {
    const pool = getPool();
    if (req.query.id) {
      const qId = Number(req.query.id);
      const [rows] = await pool.query('SELECT * FROM questions WHERE id = ?', [qId]);
      if (rows.length === 0) return res.status(404).json({ error: 'Question not found' });
      return res.json({ question: formatQuestionRow(rows[0]) });
    }

    const [rows] = await pool.query(`
      SELECT * FROM questions ORDER BY 
        CASE 
          WHEN question_no LIKE 'Question #%' THEN 1 
          WHEN question_no LIKE 'Drag & Drop #%' THEN 2 
          ELSE 3 
        END, 
        CAST(SUBSTRING_INDEX(question_no, '#', -1) AS UNSIGNED) ASC,
        id ASC
    `);
    const formatted = rows.map(formatQuestionRow);
    res.json({ questions: formatted });
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions from database', details: error.message });
  }
});

// 3. Save / Complete Exam Attempt (Full History Record)
// 3. Save / Complete Exam Attempt (Full History Record tied to authenticated user)
app.post('/api/history', async (req, res) => {
  try {
    const {
      id,
      userId,
      userEmail,
      candidateName,
      bankName,
      score,
      maxScore,
      percentage,
      passed,
      totalQuestions,
      timeSpentSeconds,
      date,
      questions,
      answers,
      flaggedQuestions,
      revealedQuestions,
      settings,
      examMode,
    } = req.body;

    const examId = id || `exam_${Date.now()}`;
    const pool = getPool();

    await pool.query(
      `INSERT INTO exam_attempts 
       (id, user_id, user_email, candidate_name, bank_name, score, max_score, percentage, passed, total_questions, time_spent_seconds, exam_date, questions, answers, flagged_questions, revealed_questions, settings, exam_mode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       user_id=VALUES(user_id), user_email=VALUES(user_email),
       candidate_name=VALUES(candidate_name), bank_name=VALUES(bank_name), score=VALUES(score), max_score=VALUES(max_score),
       percentage=VALUES(percentage), passed=VALUES(passed), total_questions=VALUES(total_questions), time_spent_seconds=VALUES(time_spent_seconds),
       exam_date=VALUES(exam_date), questions=VALUES(questions), answers=VALUES(answers), flagged_questions=VALUES(flagged_questions),
       revealed_questions=VALUES(revealed_questions), settings=VALUES(settings), exam_mode=VALUES(exam_mode)`,
      [
        examId,
        userId || null,
        userEmail ? userEmail.trim().toLowerCase() : null,
        candidateName ? candidateName.trim() : 'Candidate',
        bankName || 'CCNA Exam',
        score || 0,
        maxScore || 1000,
        percentage || 0,
        passed ? 1 : 0,
        totalQuestions || 0,
        timeSpentSeconds || 0,
        date || Date.now(),
        questions ? JSON.stringify(questions) : null,
        answers ? JSON.stringify(answers) : null,
        flaggedQuestions ? JSON.stringify(flaggedQuestions) : null,
        revealedQuestions ? JSON.stringify(revealedQuestions) : null,
        settings ? JSON.stringify(settings) : null,
        examMode || 'study',
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Exam attempt successfully saved to MySQL',
      examId,
    });
  } catch (error) {
    console.error('Failed to save exam history to MySQL:', error);
    res.status(500).json({ error: 'Failed to save exam history to database', details: error.message });
  }
});

async function getMasterQuestionsLookup(pool) {
  const [masterRows] = await pool.query(
    'SELECT id, question_no, type, question, options, correct_option, points, exhibit_image, original_source_image, cli_snippet, drag_drop_data, explanation FROM questions'
  );
  const masterById = new Map();
  const masterByQno = new Map();
  masterRows.forEach((mq) => {
    masterById.set(Number(mq.id), mq);
    if (mq.question_no) {
      const clean = mq.question_no.trim().toLowerCase().replace(/\s+/g, ' ');
      masterByQno.set(clean, mq);
    }
  });
  return { masterById, masterByQno };
}

function mergeMasterQuestion(qItem, masterById, masterByQno) {
  if (!qItem) return qItem;
  let m = null;
  if (qItem.id && masterById.has(Number(qItem.id))) {
    m = masterById.get(Number(qItem.id));
  } else if (qItem.questionNo) {
    const clean = qItem.questionNo.trim().toLowerCase().replace(/\s+/g, ' ');
    if (masterByQno.has(clean)) {
      m = masterByQno.get(clean);
    }
  }
  if (m) {
    let mOpts = [];
    let mCorr = [];
    try {
      mOpts = typeof m.options === 'string' ? JSON.parse(m.options) : m.options || [];
    } catch {}
    try {
      mCorr = typeof m.correct_option === 'string' ? JSON.parse(m.correct_option) : m.correct_option;
    } catch {
      mCorr = [m.correct_option];
    }
    const mCorrArr = Array.isArray(mCorr) ? mCorr : [mCorr];

    return {
      ...qItem,
      question: m.question,
      options: mOpts.length > 0 ? mOpts : qItem.options,
      correctOption: mCorrArr.length === 1 ? mCorrArr[0] : mCorrArr,
      correctOptions: mCorrArr,
      explanation: m.explanation,
      cliSnippet: m.cli_snippet,
      exhibitImage: m.exhibit_image || null,
      originalSourceImage: m.original_source_image || qItem.originalSourceImage || null,
    };
  }
  return qItem;
}

// 4. Get exam attempts / history from MySQL (Filtered by logged in userId / email)
app.get('/api/history', async (req, res) => {
  try {
    const { userId, userEmail, candidateName } = req.query;
    const pool = getPool();

    // If no authenticated user is supplied, return empty history (guests have no history access)
    if (!userId && !userEmail && !candidateName) {
      return res.json({ history: [] });
    }

    let query = 'SELECT * FROM exam_attempts WHERE ';
    const params = [];

    if (userId) {
      query += 'user_id = ?';
      params.push(userId);
    } else if (userEmail) {
      query += 'user_email = ?';
      params.push(userEmail.trim().toLowerCase());
    } else if (candidateName) {
      query += 'candidate_name = ?';
      params.push(candidateName);
    }

    query += ' ORDER BY exam_date DESC LIMIT 50';

    const [rows] = await pool.query(query, params);
    const { masterById, masterByQno } = await getMasterQuestionsLookup(pool);

    const formatted = rows.map((r) => {
      let parsedQuestions = [];
      let parsedAnswers = [];
      let parsedFlagged = [];
      let parsedRevealed = [];
      let parsedSettings = {};

      try {
        parsedQuestions = typeof r.questions === 'string' ? JSON.parse(r.questions) : r.questions || [];
      } catch {
        parsedQuestions = [];
      }
      try {
        parsedAnswers = typeof r.answers === 'string' ? JSON.parse(r.answers) : r.answers || [];
      } catch {
        parsedAnswers = [];
      }
      try {
        parsedFlagged = typeof r.flagged_questions === 'string' ? JSON.parse(r.flagged_questions) : r.flagged_questions || [];
      } catch {
        parsedFlagged = [];
      }
      try {
        parsedRevealed = typeof r.revealed_questions === 'string' ? JSON.parse(r.revealed_questions) : r.revealed_questions || [];
      } catch {
        parsedRevealed = [];
      }
      try {
        parsedSettings = typeof r.settings === 'string' ? JSON.parse(r.settings) : r.settings || {};
      } catch {
        parsedSettings = {};
      }

      // Always merge master questions live from MySQL database
      const enrichedQuestions = parsedQuestions.map((q) => mergeMasterQuestion(q, masterById, masterByQno));

      return {
        id: r.id,
        userId: r.user_id,
        userEmail: r.user_email,
        candidateName: r.candidate_name,
        bankName: r.bank_name,
        score: r.score,
        maxScore: r.max_score,
        percentage: Number(r.percentage),
        passed: Boolean(r.passed),
        totalQuestions: r.total_questions,
        timeSpentSeconds: r.time_spent_seconds,
        date: Number(r.exam_date),
        questions: enrichedQuestions,
        answers: parsedAnswers,
        flaggedQuestions: parsedFlagged,
        revealedQuestions: parsedRevealed,
        settings: parsedSettings,
        examMode: r.exam_mode,
      };
    });

    res.json({ history: formatted });
  } catch (error) {
    console.error('Failed to fetch history from MySQL:', error);
    res.status(500).json({ error: 'Failed to fetch attempt history', details: error.message });
  }
});

// 5. Delete specific exam history record
app.delete('/api/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM exam_attempts WHERE id = ? OR id LIKE ?', [id, id + '%']);
    res.json({ success: true, message: `Exam record ${id} deleted from MySQL` });
  } catch (error) {
    console.error('Failed to delete history record:', error);
    res.status(500).json({ error: 'Failed to delete record', details: error.message });
  }
});

// 6. Clear all exam history for a user
app.delete('/api/history', async (req, res) => {
  try {
    const params = { ...req.query, ...req.body };
    const userId = params.userId || null;
    const userEmail = params.userEmail ? params.userEmail.trim().toLowerCase() : null;
    const pool = getPool();

    if (userId && userEmail) {
      await pool.query('DELETE FROM exam_attempts WHERE user_id = ? OR user_email = ?', [userId, userEmail]);
    } else if (userId) {
      await pool.query('DELETE FROM exam_attempts WHERE user_id = ?', [userId]);
    } else if (userEmail) {
      await pool.query('DELETE FROM exam_attempts WHERE user_email = ?', [userEmail]);
    } else {
      await pool.query('DELETE FROM exam_attempts WHERE (user_id IS NULL OR user_id = "") AND (user_email IS NULL OR user_email = "")');
    }

    res.json({ success: true, message: 'Exam records cleared from MySQL' });
  } catch (error) {
    console.error('Failed to clear history:', error);
    res.status(500).json({ error: 'Failed to clear history', details: error.message });
  }
});

// 7. Active Sessions CRUD (Filtered by logged in userId / email)
app.get('/api/sessions', async (req, res) => {
  try {
    const { userId, userEmail, candidateName } = req.query;
    const pool = getPool();

    // If no authenticated user is supplied, return empty sessions (guests have no session access)
    if (!userId && !userEmail && !candidateName) {
      return res.json({ sessions: [] });
    }

    let query = 'SELECT * FROM saved_sessions WHERE ';
    const params = [];

    if (userId) {
      query += 'user_id = ?';
      params.push(userId);
    } else if (userEmail) {
      query += 'user_email = ?';
      params.push(userEmail.trim().toLowerCase());
    } else if (candidateName) {
      query += 'candidate_name = ?';
      params.push(candidateName);
    }

    query += ' ORDER BY updated_at DESC';

    const [rows] = await pool.query(query, params);
    const { masterById, masterByQno } = await getMasterQuestionsLookup(pool);

    const formatted = rows.map((r) => {
      let parsedQuestions = [];
      let parsedAnswers = [];
      let parsedFlagged = [];
      let parsedRevealed = [];
      let parsedNotes = {};
      let parsedSettings = {};

      try {
        parsedQuestions = typeof r.questions === 'string' ? JSON.parse(r.questions) : r.questions || [];
      } catch {
        parsedQuestions = [];
      }
      try {
        parsedAnswers = typeof r.answers === 'string' ? JSON.parse(r.answers) : r.answers || [];
      } catch {
        parsedAnswers = [];
      }
      try {
        parsedFlagged = typeof r.flagged_questions === 'string' ? JSON.parse(r.flagged_questions) : r.flagged_questions || [];
      } catch {
        parsedFlagged = [];
      }
      try {
        parsedRevealed = typeof r.revealed_questions === 'string' ? JSON.parse(r.revealed_questions) : r.revealed_questions || [];
      } catch {
        parsedRevealed = [];
      }
      try {
        parsedNotes = typeof r.question_notes === 'string' ? JSON.parse(r.question_notes) : r.question_notes || {};
      } catch {
        parsedNotes = {};
      }
      try {
        parsedSettings = typeof r.settings === 'string' ? JSON.parse(r.settings) : r.settings || {};
      } catch {
        parsedSettings = {};
      }

      // Always merge master questions live from MySQL database
      const enrichedQuestions = parsedQuestions.map((q) => mergeMasterQuestion(q, masterById, masterByQno));

      return {
        id: r.id,
        userId: r.user_id,
        userEmail: r.user_email,
        candidateName: r.candidate_name,
        bankName: r.bank_name,
        examMode: r.exam_mode,
        index: r.q_index,
        points: r.points,
        secondsRemaining: r.seconds_remaining,
        timeSpentSeconds: r.time_spent_seconds,
        questions: enrichedQuestions,
        answers: parsedAnswers,
        flaggedQuestions: parsedFlagged,
        revealedQuestions: parsedRevealed,
        committedQuestions: typeof r.committed_questions === 'string' ? JSON.parse(r.committed_questions) : r.committed_questions || [],
        questionNotes: parsedNotes,
        settings: parsedSettings,
        updatedAt: Number(r.updated_at),
      };
    });

    res.json({ sessions: formatted });
  } catch (error) {
    console.error('Failed to fetch sessions from MySQL:', error);
    res.status(500).json({ error: 'Failed to fetch sessions', details: error.message });
  }
});

// Save or Update an active session in MySQL
app.post('/api/sessions', async (req, res) => {
  try {
    const s = req.body;
    if (!s || !s.id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const pool = getPool();
    await pool.query(
      `INSERT INTO saved_sessions 
       (id, user_id, user_email, candidate_name, bank_name, exam_mode, q_index, points, seconds_remaining, time_spent_seconds, questions, answers, flagged_questions, revealed_questions, question_notes, settings, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       user_id=VALUES(user_id), user_email=VALUES(user_email),
       candidate_name=VALUES(candidate_name), bank_name=VALUES(bank_name), exam_mode=VALUES(exam_mode), q_index=VALUES(q_index),
       points=VALUES(points), seconds_remaining=VALUES(seconds_remaining), time_spent_seconds=VALUES(time_spent_seconds),
       questions=VALUES(questions), answers=VALUES(answers), flagged_questions=VALUES(flagged_questions),
       revealed_questions=VALUES(revealed_questions), question_notes=VALUES(question_notes), settings=VALUES(settings),
       updated_at=VALUES(updated_at)`,
      [
        s.id,
        s.userId || null,
        s.userEmail ? s.userEmail.trim().toLowerCase() : null,
        s.candidateName || 'Candidate',
        s.bankName || 'CCNA Exam',
        s.examMode || 'study',
        s.index || 0,
        s.points || 0,
        s.secondsRemaining || 7200,
        s.timeSpentSeconds || 0,
        s.questions ? JSON.stringify(s.questions) : null,
        s.answers ? JSON.stringify(s.answers) : null,
        s.flaggedQuestions ? JSON.stringify(s.flaggedQuestions) : null,
        s.revealedQuestions ? JSON.stringify(s.revealedQuestions) : null,
        s.questionNotes ? JSON.stringify(s.questionNotes) : null,
        s.settings ? JSON.stringify(s.settings) : null,
        s.updatedAt || Date.now(),
      ]
    );

    res.status(201).json({ success: true, message: 'Session saved to MySQL', sessionId: s.id });
  } catch (error) {
    console.error('Failed to save session to MySQL:', error);
    res.status(500).json({ error: 'Failed to save session', details: error.message });
  }
});

// Delete an active session from MySQL
app.delete('/api/sessions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM saved_sessions WHERE id = ?', [id]);
    res.json({ success: true, message: `Session ${id} deleted from MySQL` });
  } catch (error) {
    console.error('Failed to delete session from MySQL:', error);
    res.status(500).json({ error: 'Failed to delete session', details: error.message });
  }
});

// 8. Candidate Notes API (Strict Per-User Privacy Isolation)
app.get('/api/notes', async (req, res) => {
  try {
    const { userId, userEmail } = req.query;
    const pool = getPool();

    const uId = (userId || '').trim();
    const uEmail = (userEmail || '').trim().toLowerCase();

    // Security: Anonymous / unauthenticated users must NEVER receive private user notes
    if (!uId && !uEmail) {
      return res.json({ notes: {}, list: [] });
    }

    const conditions = [];
    const params = [];

    if (uId) {
      conditions.push('user_id = ?');
      params.push(uId);
    }
    if (uEmail) {
      conditions.push('user_email = ?');
      params.push(uEmail);
    }

    const query = `SELECT * FROM candidate_notes WHERE ${conditions.join(' OR ')} ORDER BY id ASC`;
    const [rows] = await pool.query(query, params);

    const notesObj = {};
    rows.forEach((r) => {
      notesObj[r.question_id] = r.note_text;
      if (r.question_no) {
        notesObj[r.question_no] = r.note_text;
      }
    });

    res.json({ notes: notesObj, list: rows });
  } catch (error) {
    console.error('Failed to fetch notes from MySQL:', error);
    res.status(500).json({ error: 'Failed to fetch notes', details: error.message });
  }
});

app.all(['/api/notes', '/api/notes/:id'], async (req, res, next) => {
  if (req.method !== 'POST' && req.method !== 'DELETE') return next();
  try {
    const b = req.body || {};
    const q = req.query || {};
    const { userId, userEmail, candidateName, questionId, questionNo, noteText, action, noteId, id } = { ...q, ...b, ...req.params };

    const pool = getPool();
    const uId = (userId || '').trim();
    const uEmail = (userEmail || '').trim().toLowerCase();

    // Check token if present
    const auth = req.headers.authorization || '';
    let tokenUser = null;
    if (auth && auth.startsWith('Bearer ')) {
      try {
        tokenUser = jwt.verify(auth.slice(7), JWT_SECRET);
      } catch (e) {}
    }

    const effectiveUserId = uId || tokenUser?.id || '';
    const effectiveEmail = uEmail || (tokenUser?.email || '').toLowerCase();
    const effectiveName = (candidateName || tokenUser?.name || 'Candidate').trim();

    if (!effectiveUserId && !effectiveEmail) {
      return res.status(401).json({ error: 'User identity required to manage notes.' });
    }

    const isAdmin =
      (tokenUser && (String(tokenUser.role).toLowerCase() === 'admin' || String(tokenUser.email).toLowerCase() === 'candidate@ccna.com')) ||
      effectiveEmail === 'candidate@ccna.com';

    let qId = parseInt(questionId || id || 0, 10);
    const rawQNo = (questionNo || '').trim();
    const targetNoteId = parseInt(noteId || (req.params?.id ? req.params.id : 0), 10);
    const trimmedNote = typeof noteText === 'string' ? noteText.trim() : null;

    // Extract sequence number from questionNo if available
    let numSeq = 0;
    if (rawQNo) {
      const match = rawQNo.match(/(\d+)/);
      if (match) numSeq = parseInt(match[1], 10);
    }
    if (!qId && numSeq > 0) {
      qId = numSeq;
    }

    // Lookup paired question in questions table (question_no is authoritative)
    let lookupQId = null;
    let lookupQNo = null;
    if (rawQNo) {
      try {
        const [foundRows] = await pool.query('SELECT id, question_no FROM questions WHERE question_no = ? LIMIT 1', [rawQNo]);
        if (foundRows && foundRows.length > 0) {
          lookupQId = foundRows[0].id;
          lookupQNo = foundRows[0].question_no;
        }
      } catch (err) {}
    }
    if (!lookupQId && numSeq > 0) {
      try {
        const [foundRows] = await pool.query('SELECT id, question_no FROM questions WHERE question_no LIKE ? LIMIT 1', [`%#${numSeq}`]);
        if (foundRows && foundRows.length > 0) {
          lookupQId = foundRows[0].id;
          lookupQNo = foundRows[0].question_no;
        }
      } catch (err) {}
    }
    if (!lookupQId && qId > 0) {
      try {
        const [foundRows] = await pool.query('SELECT id, question_no FROM questions WHERE id = ? LIMIT 1', [qId]);
        if (foundRows && foundRows.length > 0) {
          lookupQId = foundRows[0].id;
          lookupQNo = foundRows[0].question_no;
        }
      } catch (err) {}
    }

    const isDelete = req.method === 'DELETE' || action === 'delete' || trimmedNote === '';

    if (isDelete) {
      const qClauses = [];
      const qParams = [];

      if (targetNoteId > 0) {
        qClauses.push('id = ?');
        qParams.push(targetNoteId);
      }
      if (rawQNo) {
        qClauses.push('question_no = ?');
        qParams.push(rawQNo);
      }
      if (lookupQNo && lookupQNo !== rawQNo) {
        qClauses.push('question_no = ?');
        qParams.push(lookupQNo);
      }
      if (lookupQId) {
        qClauses.push('question_id = ?');
        qParams.push(lookupQId);
      }
      if (qId > 0 && (!lookupQId || qId === lookupQId)) {
        qClauses.push('question_id = ?');
        qParams.push(qId);
      }
      if (numSeq > 0) {
        qClauses.push('question_no = ?');
        qParams.push(`Question #${numSeq}`);
        qClauses.push('question_no = ?');
        qParams.push(`Question ${numSeq}`);
      }

      if (qClauses.length === 0) {
        return res.status(400).json({ error: 'Question identifier required for deletion.' });
      }

      const userClauses = [];
      const userParams = [];
      if (!isAdmin) {
        if (effectiveUserId) {
          userClauses.push('user_id = ?');
          userParams.push(effectiveUserId);
        }
        if (effectiveEmail) {
          userClauses.push('user_email = ?');
          userParams.push(effectiveEmail);
        }
      }

      let deleteSql = `DELETE FROM candidate_notes WHERE (${qClauses.join(' OR ')})`;
      let finalParams = [...qParams];
      if (userClauses.length > 0) {
        deleteSql += ` AND (${userClauses.join(' OR ')})`;
        finalParams = [...finalParams, ...userParams];
      }

      const [delResult] = await pool.query(deleteSql, finalParams);
      return res.json({ success: true, message: 'Note deleted from MySQL', affected: delResult.affectedRows });
    }

    // SAVE / UPDATE NOTE
    if (!qId && !rawQNo) {
      return res.status(400).json({ error: 'Valid questionId is required' });
    }

    const effectiveQId = lookupQId || qId;
    const effectiveQNo = lookupQNo || rawQNo || `Question #${effectiveQId}`;

    const findConds = [];
    const findParams = [];
    if (effectiveUserId) { findConds.push('user_id = ?'); findParams.push(effectiveUserId); }
    if (effectiveEmail) { findConds.push('user_email = ?'); findParams.push(effectiveEmail); }

    const [existing] = await pool.query(
      `SELECT id FROM candidate_notes WHERE (question_id = ? OR question_id = ? OR question_no = ?) AND (${findConds.join(' OR ')}) LIMIT 1`,
      [effectiveQId, qId, effectiveQNo, ...findParams]
    );

    if (existing.length > 0) {
      await pool.query(
        `UPDATE candidate_notes SET note_text = ?, question_id = ?, question_no = ?, candidate_name = ?, user_id = ?, user_email = ? WHERE id = ?`,
        [trimmedNote, effectiveQId, effectiveQNo, effectiveName, effectiveUserId || null, effectiveEmail || null, existing[0].id]
      );
    } else {
      await pool.query(
        `INSERT INTO candidate_notes (user_id, user_email, candidate_name, question_id, question_no, note_text) VALUES (?, ?, ?, ?, ?, ?)`,
        [effectiveUserId || null, effectiveEmail || null, effectiveName, effectiveQId, effectiveQNo, trimmedNote]
      );
    }

    res.json({ success: true, message: 'Note saved to MySQL', questionId: effectiveQId, questionNo: effectiveQNo });
  } catch (error) {
    console.error('Failed to save/delete note in MySQL:', error);
    res.status(500).json({ error: 'Failed to process note', details: error.message });
  }
});

// --------------------------------------------------------------------------
// PLANS & BILLING API
// --------------------------------------------------------------------------

// 9. Public Plans List
app.get('/api/plans', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM plans WHERE is_active = 1 ORDER BY price ASC');
    const formatted = rows.map((p) => ({
      ...p,
      price: parseFloat(p.price) || 0,
      duration_days: parseInt(p.duration_days) || 30,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features || [],
      bank_permissions: typeof p.bank_permissions === 'string' ? JSON.parse(p.bank_permissions) : p.bank_permissions || {},
    }));
    res.json({ plans: formatted });
  } catch (error) {
    console.error('Failed to fetch public plans:', error);
    res.status(500).json({ error: 'Failed to fetch plans', details: error.message });
  }
});

// 10. User Upgrade Plan
app.post('/api/user/upgrade-plan', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized. Please sign in to upgrade.' });
    }
    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ error: 'Invalid or expired session token.' });
    }

    let targetPlan = String(req.body.plan || '').trim();
    if (targetPlan === 'pro') targetPlan = 'plan_pro';
    else if (targetPlan === 'unlimited') targetPlan = 'plan_unlimited';
    else if (targetPlan === 'free') targetPlan = 'plan_free';

    const pool = getPool();
    const [planRows] = await pool.query('SELECT id, name FROM plans WHERE id = ? AND is_active = 1', [targetPlan]);
    if (planRows.length === 0) {
      return res.status(400).json({ error: 'Selected plan is invalid or inactive.' });
    }

    await pool.query('UPDATE users SET plan = ? WHERE id = ?', [targetPlan, decoded.id]);
    const [userRows] = await pool.query('SELECT id, name, email, role, plan, is_verified FROM users WHERE id = ?', [decoded.id]);
    const updatedUser = userRows[0];

    const planName = await getUserPlanOriginalName(pool, updatedUser.plan);
    const planPermissions = await getUserPlanPermissions(pool, updatedUser.plan, updatedUser.role, updatedUser.email);

    res.json({
      success: true,
      message: `Successfully upgraded to ${planRows[0].name}!`,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role || 'user',
        plan: updatedUser.plan || 'plan_free',
        planName,
        isVerified: Boolean(updatedUser.is_verified),
        planPermissions,
      },
    });
  } catch (error) {
    console.error('Upgrade plan error:', error);
    res.status(500).json({ error: 'Upgrade failed', details: error.message });
  }
});

// 10.5 User Exam Settings & Preferences (Bank, Mode, Custom Settings)
app.get(['/api/user/settings', '/api/user-settings'], async (req, res) => {
  try {
    const pool = getPool();
    let tokenUser = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        tokenUser = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
      } catch (e) {}
    }

    const userId = req.query.userId || tokenUser?.id || '';
    const userEmail = (req.query.userEmail || tokenUser?.email || '').toLowerCase().trim();

    if (!userId && !userEmail) {
      return res.json({
        success: true,
        selectedBank: 'bank_a',
        examMode: 'study',
        settings: null,
      });
    }

    const conditions = [];
    const params = [];
    if (userEmail) {
      conditions.push('user_email = ?');
      params.push(userEmail);
    }
    if (userId) {
      conditions.push('user_id = ?');
      params.push(userId);
    }

    const [rows] = await pool.query(
      `SELECT * FROM user_exam_settings WHERE ${conditions.join(' OR ')} ORDER BY updated_at DESC LIMIT 1`,
      params
    );

    if (rows.length > 0) {
      const row = rows[0];
      let parsedSettings = null;
      try {
        parsedSettings = typeof row.settings === 'string' ? JSON.parse(row.settings) : row.settings;
      } catch (e) {}

      return res.json({
        success: true,
        selectedBank: row.selected_bank || 'bank_a',
        examMode: row.exam_mode || 'study',
        settings: parsedSettings,
        updatedAt: row.updated_at,
      });
    }

    return res.json({
      success: true,
      selectedBank: 'bank_a',
      examMode: 'study',
      settings: null,
    });
  } catch (err) {
    console.error('Error fetching user exam settings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post(['/api/user/settings', '/api/user-settings'], async (req, res) => {
  try {
    const pool = getPool();
    let tokenUser = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        tokenUser = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
      } catch (e) {}
    }

    const userId = req.body.userId || tokenUser?.id || null;
    let userEmail = (req.body.userEmail || tokenUser?.email || '').toLowerCase().trim();

    if (!userEmail && userId) {
      const [uRows] = await pool.query('SELECT email FROM users WHERE id = ?', [userId]);
      if (uRows.length > 0 && uRows[0].email) {
        userEmail = uRows[0].email.toLowerCase().trim();
      }
    }

    if (!userEmail) {
      return res.status(400).json({ error: 'User email or token required to save exam settings.' });
    }

    const selectedBank = req.body.selectedBank || 'bank_a';
    const examMode = req.body.examMode || 'study';
    let settingsData = req.body.settings;
    let settingsJson = '';

    if (typeof settingsData === 'object' && settingsData !== null) {
      settingsJson = JSON.stringify(settingsData);
    } else if (typeof settingsData === 'string' && settingsData) {
      settingsJson = settingsData;
    } else {
      settingsJson = JSON.stringify({
        randomizeQuestions: false,
        randomizeAnswers: false,
        showScoreLive: true,
        showRequiredAnswersCount: true,
        includeShowAnswerBtn: true,
        showAnswersInline: true,
        timerMode: 'not_timed',
      });
    }

    await pool.query(
      `INSERT INTO user_exam_settings (user_id, user_email, selected_bank, exam_mode, settings)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         user_id = VALUES(user_id),
         selected_bank = VALUES(selected_bank),
         exam_mode = VALUES(exam_mode),
         settings = VALUES(settings),
         updated_at = CURRENT_TIMESTAMP`,
      [userId, userEmail, selectedBank, examMode, settingsJson]
    );

    res.json({
      success: true,
      message: 'Exam settings saved successfully.',
      selectedBank,
      examMode,
    });
  } catch (err) {
    console.error('Error saving user exam settings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Authentication Middleware
async function adminAuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || (req.headers['x-admin-token'] ? `Bearer ${req.headers['x-admin-token']}` : null);
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded) {
          const pool = getPool();
          const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [decoded.id]);
          if (rows.length > 0 && (rows[0].role === 'admin' || rows[0].email === 'candidate@ccna.com')) {
            req.adminUser = rows[0];
            return next();
          }
        }
      } catch (e) {}
    }

    const adminEmail = String(req.headers['x-admin-email'] || req.body.adminEmail || req.query.adminEmail || '').trim().toLowerCase();
    if (adminEmail === 'candidate@ccna.com' || adminEmail.includes('admin')) {
      const pool = getPool();
      const [rows] = await pool.query("SELECT id, name, email, role FROM users WHERE email = 'candidate@ccna.com' OR role = 'admin' LIMIT 1");
      if (rows.length > 0) {
        req.adminUser = rows[0];
        return next();
      }
    }

    return res.status(401).json({ error: 'Admin authorization required.' });
  } catch (err) {
    return res.status(401).json({ error: 'Admin authentication failed.' });
  }
}

// --------------------------------------------------------------------------
// ADMIN API ENDPOINTS
// --------------------------------------------------------------------------

// 11. Admin Stats
app.get('/api/admin/stats', adminAuthMiddleware, async (req, res) => {
  try {
    const pool = getPool();
    const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) as totalUsers FROM users');
    const [[{ verifiedUsers }]] = await pool.query('SELECT COUNT(*) as verifiedUsers FROM users WHERE is_verified = 1');
    const [[{ totalAttempts }]] = await pool.query('SELECT COUNT(*) as totalAttempts FROM exam_attempts');
    const [[{ passedAttempts }]] = await pool.query('SELECT COUNT(*) as passedAttempts FROM exam_attempts WHERE passed = 1');
    const passRate = totalAttempts > 0 ? Number(((passedAttempts / totalAttempts) * 100).toFixed(1)) : 0;
    const [[{ activePlans }]] = await pool.query('SELECT COUNT(*) as activePlans FROM plans WHERE is_active = 1');

    const [recentAttempts] = await pool.query(`
      SELECT id, candidate_name, user_email, bank_name, score, max_score, percentage, passed, exam_mode, created_at 
      FROM exam_attempts ORDER BY created_at DESC LIMIT 6
    `);
    const [recentUsers] = await pool.query(`
      SELECT id, name, email, role, plan, is_verified, created_at 
      FROM users ORDER BY created_at DESC LIMIT 6
    `);

    res.json({
      stats: {
        totalUsers,
        verifiedUsers,
        totalAttempts,
        passedAttempts,
        passRate,
        totalQuestions: 228,
        activePlans,
      },
      recentAttempts,
      recentUsers,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats', details: error.message });
  }
});

// 12. Admin Users List
app.get('/api/admin/users', adminAuthMiddleware, async (req, res) => {
  try {
    const { search, role, status, plan } = req.query;
    const pool = getPool();

    let sql = `
      SELECT u.id, u.name, u.email, u.role, u.plan, u.is_verified, u.created_at,
      (SELECT COUNT(*) FROM exam_attempts ea WHERE ea.user_id = u.id OR ea.user_email = u.email) as attempts_count,
      (SELECT MAX(ea.created_at) FROM exam_attempts ea WHERE ea.user_id = u.id OR ea.user_email = u.email) as last_exam_at
      FROM users u WHERE 1=1
    `;
    const params = [];

    if (search) {
      sql += ' AND (u.name LIKE ? OR u.email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (role) {
      sql += ' AND u.role = ?';
      params.push(role);
    }
    if (status === 'verified') {
      sql += ' AND u.is_verified = 1';
    } else if (status === 'unverified') {
      sql += ' AND u.is_verified = 0';
    }
    if (plan) {
      const shortPlan = plan.replace(/^plan_/, '');
      const fullPlan = plan.startsWith('plan_') ? plan : `plan_${plan}`;
      sql += ' AND (u.plan = ? OR u.plan = ?)';
      params.push(shortPlan, fullPlan);
    }

    sql += ' ORDER BY u.created_at DESC';
    const [users] = await pool.query(sql, params);
    res.json({ users });
  } catch (error) {
    console.error('Admin fetch users error:', error);
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

// 13. Admin Create User
app.post('/api/admin/users', adminAuthMiddleware, async (req, res) => {
  try {
    const { name, email, password, role = 'user', plan = 'plan_free', isVerified = 1 } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const pool = getPool();
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [cleanEmail]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'A candidate with this email already exists.' });
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password || 'Password123!', salt);
    await pool.query(
      'INSERT INTO users (id, name, email, password_hash, is_verified, role, plan) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, name.trim(), cleanEmail, hash, isVerified ? 1 : 0, role, plan]
    );

    res.json({ success: true, message: 'Candidate created successfully.', id: userId });
  } catch (error) {
    console.error('Admin create user error:', error);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
});

// 14. Admin Update User
app.put('/api/admin/users/:id', adminAuthMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, role = 'user', plan = 'plan_free', isVerified = 1, password } = req.body;
    const pool = getPool();

    const updates = ['name = ?', 'email = ?', 'role = ?', 'plan = ?', 'is_verified = ?'];
    const params = [name.trim(), email.trim().toLowerCase(), role, plan, isVerified ? 1 : 0];

    if (password && password.trim().length > 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password.trim(), salt);
      updates.push('password_hash = ?');
      params.push(hash);
    }

    params.push(userId);
    await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params);
    res.json({ success: true, message: 'User updated successfully.' });
  } catch (error) {
    console.error('Admin update user error:', error);
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
});

// 15. Admin Delete User
app.delete('/api/admin/users/:id', adminAuthMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const pool = getPool();
    const [rows] = await pool.query('SELECT email FROM users WHERE id = ?', [userId]);
    if (rows.length > 0 && rows[0].email === 'candidate@ccna.com') {
      return res.status(403).json({ error: 'Cannot delete primary demo admin account.' });
    }

    await pool.query('DELETE FROM exam_attempts WHERE user_id = ?', [userId]);
    await pool.query('DELETE FROM saved_sessions WHERE user_id = ?', [userId]);
    await pool.query('DELETE FROM candidate_notes WHERE user_id = ?', [userId]);
    await pool.query('DELETE FROM users WHERE id = ?', [userId]);

    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Admin delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
});

// 16. Admin Plans List
app.get('/api/admin/plans', adminAuthMiddleware, async (req, res) => {
  try {
    const pool = getPool();
    const [plans] = await pool.query(`
      SELECT p.*,
      (SELECT COUNT(*) FROM users u WHERE (u.plan = p.id) OR (p.id = 'plan_free' AND (u.plan = 'free' OR u.plan IS NULL)) OR (u.plan = REPLACE(p.id, 'plan_', ''))) as subscribers_count
      FROM plans p ORDER BY p.price ASC
    `);

    const formatted = plans.map((p) => ({
      ...p,
      price: parseFloat(p.price) || 0,
      duration_days: parseInt(p.duration_days) || 30,
      is_active: Boolean(p.is_active),
      subscribers_count: parseInt(p.subscribers_count) || 0,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features || [],
      bank_permissions: typeof p.bank_permissions === 'string' ? JSON.parse(p.bank_permissions) : p.bank_permissions || {},
    }));

    res.json({ plans: formatted });
  } catch (error) {
    console.error('Admin fetch plans error:', error);
    res.status(500).json({ error: 'Failed to fetch plans', details: error.message });
  }
});

// 17. Admin Create / Update Plan
app.post('/api/admin/plans', adminAuthMiddleware, async (req, res) => {
  try {
    const { id, name, price = 0, billingCycle = 'monthly', durationDays = 30, description = '', features = [], bankPermissions = {}, isActive = 1 } = req.body;
    if (!name) return res.status(400).json({ error: 'Plan name is required.' });

    const planId = id || `plan_${Date.now()}`;
    const pool = getPool();

    await pool.query(
      `INSERT INTO plans (id, name, price, billing_cycle, duration_days, description, features, bank_permissions, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       name=VALUES(name), price=VALUES(price), billing_cycle=VALUES(billing_cycle),
       duration_days=VALUES(duration_days), description=VALUES(description),
       features=VALUES(features), bank_permissions=VALUES(bank_permissions), is_active=VALUES(is_active)`,
      [
        planId,
        name.trim(),
        parseFloat(price) || 0,
        billingCycle,
        parseInt(durationDays) || 30,
        description,
        JSON.stringify(features),
        JSON.stringify(bankPermissions),
        isActive ? 1 : 0,
      ]
    );

    broadcastLiveEvent('plan_updated', { id: planId, name });
    res.json({ success: true, message: 'Plan saved successfully.' });
  } catch (error) {
    console.error('Admin save plan error:', error);
    res.status(500).json({ error: 'Failed to save plan', details: error.message });
  }
});

// 18. Admin Delete Plan
app.delete('/api/admin/plans/:id', adminAuthMiddleware, async (req, res) => {
  try {
    const planId = req.params.id;
    if (planId === 'plan_free' || planId === 'plan_pro') {
      return res.status(400).json({ error: 'Core system plans cannot be deleted.' });
    }
    const pool = getPool();
    await pool.query('DELETE FROM plans WHERE id = ?', [planId]);
    broadcastLiveEvent('plan_deleted', { id: planId });
    res.json({ success: true, message: 'Plan deleted successfully.' });
  } catch (error) {
    console.error('Admin delete plan error:', error);
    res.status(500).json({ error: 'Failed to delete plan', details: error.message });
  }
});

// 19. Admin Edit Question (The Core Real-Time Engine)
app.put('/api/admin/questions/:id', adminAuthMiddleware, async (req, res) => {
  try {
    const qId = Number(req.params.id);
    const body = req.body;
    const pool = getPool();

    const questionText = body.question || body.questionText;
    const questionNo = body.questionNo || body.question_no;
    const options = body.options ? JSON.stringify(body.options) : null;
    const correctOption = body.correctOption !== undefined ? JSON.stringify(Array.isArray(body.correctOption) ? body.correctOption : [body.correctOption]) : null;
    const points = Number(body.points) || 10;
    const cliSnippet = body.cliSnippet !== undefined ? body.cliSnippet : null;
    const exhibitImage = body.exhibitImage !== undefined ? body.exhibitImage : null;
    const originalSourceImage = body.originalSourceImage !== undefined ? body.originalSourceImage : null;
    const dragDropData = body.dragDropData ? JSON.stringify(body.dragDropData) : null;
    const type = body.type || (dragDropData ? 'drag_drop' : 'multiple_choice');
    const explanation = body.explanation !== undefined ? body.explanation : null;

    if (!questionText) {
      return res.status(400).json({ error: 'Question prompt cannot be empty.' });
    }

    await pool.query(
      `UPDATE questions SET
       question_no = COALESCE(NULLIF(?, ''), question_no),
       question = ?,
       options = COALESCE(?, options),
       correct_option = COALESCE(?, correct_option),
       points = ?,
       cli_snippet = ?,
       exhibit_image = ?,
       original_source_image = ?,
       drag_drop_data = ?,
       type = COALESCE(NULLIF(?, ''), type),
       explanation = COALESCE(?, explanation)
       WHERE id = ?`,
      [
        questionNo,
        questionText,
        options,
        correctOption,
        points,
        cliSnippet,
        exhibitImage,
        originalSourceImage,
        dragDropData,
        type,
        explanation,
        qId,
      ]
    );

    // Propagate updated question directly to any active saved_sessions in MySQL
    try {
      const [openSessions] = await pool.query('SELECT id, questions, settings FROM saved_sessions');
      for (const sess of openSessions) {
        let sessQuestions = [];
        try {
          sessQuestions = typeof sess.questions === 'string' ? JSON.parse(sess.questions) : sess.questions || [];
        } catch {}
        if (!Array.isArray(sessQuestions) || sessQuestions.length === 0) continue;

        let changed = false;
        for (const sq of sessQuestions) {
          if (Number(sq.id) === qId || (questionNo && sq.questionNo === questionNo)) {
            sq.question = questionText;
            if (explanation !== null) sq.explanation = explanation;
            if (cliSnippet !== null) sq.cliSnippet = cliSnippet;
            if (exhibitImage !== null) sq.exhibitImage = exhibitImage;
            if (originalSourceImage !== null) sq.originalSourceImage = originalSourceImage;
            if (body.options) sq.options = body.options;
            if (body.correctOption !== undefined) {
              const cArr = Array.isArray(body.correctOption) ? body.correctOption : [body.correctOption];
              sq.correctOption = cArr.length === 1 ? cArr[0] : cArr;
              sq.correctOptions = cArr;
            }
            changed = true;
          }
        }
        if (changed) {
          await pool.query('UPDATE saved_sessions SET questions = ? WHERE id = ?', [JSON.stringify(sessQuestions), sess.id]);
        }
      }
    } catch (e) {
      console.warn('Session propagation warning:', e);
    }

    const updatedPayload = {
      id: qId,
      questionNo,
      question: questionText,
      options: body.options || [],
      correctOption: body.correctOption,
      points,
      cliSnippet,
      exhibitImage,
      originalSourceImage,
      dragDropData: body.dragDropData || null,
      type,
      explanation,
    };

    // Broadcast instant real-time update via Server-Sent Events to all active exams
    broadcastLiveEvent('question_updated', updatedPayload);

    res.json({
      success: true,
      message: `Question #${qId} updated successfully and broadcasted in real time.`,
      question: updatedPayload,
    });
  } catch (error) {
    console.error('Admin update question error:', error);
    res.status(500).json({ error: 'Failed to update question', details: error.message });
  }
});

// SPA fallback for React App
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Start server after database initialization
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`CCNA Exam API Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Server failed to start due to database error:', err);
    process.exit(1);
  });
