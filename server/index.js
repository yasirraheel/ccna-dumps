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

    res.json({
      success: true,
      message: 'Email successfully verified! You are now logged in.',
      token,
      user: { id: user.id, name: user.name, email: user.email, isVerified: true },
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

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: Boolean(user.is_verified),
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
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided.' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ error: 'Invalid or expired session token.' });
    }

    const pool = getPool();
    const [rows] = await pool.query('SELECT id, name, email, is_verified, created_at FROM users WHERE id = ?', [decoded.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    const user = rows[0];
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: Boolean(user.is_verified),
        createdAt: user.created_at,
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

// 2. Fetch all questions from MySQL
app.get('/api/questions', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM questions ORDER BY id ASC');
    
    const formatted = rows.map((r) => {
      let parsedOptions = [];
      let parsedCorrect = [];
      let parsedDragDrop = null;

      try {
        parsedOptions = typeof r.options === 'string' ? JSON.parse(r.options) : r.options;
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
        id: r.id,
        type: r.type || (parsedDragDrop ? 'drag_drop' : 'multiple_choice'),
        questionNo: r.question_no,
        question: r.question,
        options: parsedOptions,
        correctOption: Array.isArray(parsedCorrect) ? parsedCorrect : [parsedCorrect],
        dragDropData: parsedDragDrop,
        points: r.points || 10,
        cliSnippet: r.cli_snippet,
        exhibitImage: r.exhibit_image || null,
      };
    });

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

// 4. Get exam attempts / history from MySQL (Filtered by logged in userId / email)
app.get('/api/history', async (req, res) => {
  try {
    const { userId, userEmail, candidateName } = req.query;
    const pool = getPool();

    let query = 'SELECT * FROM exam_attempts';
    const params = [];

    if (userId) {
      query += ' WHERE user_id = ?';
      params.push(userId);
    } else if (userEmail) {
      query += ' WHERE user_email = ?';
      params.push(userEmail.trim().toLowerCase());
    } else if (candidateName) {
      query += ' WHERE candidate_name = ?';
      params.push(candidateName);
    }

    query += ' ORDER BY exam_date DESC LIMIT 50';

    const [rows] = await pool.query(query, params);

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
        questions: parsedQuestions,
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
    await pool.query('DELETE FROM exam_attempts WHERE id = ?', [id]);
    res.json({ success: true, message: `Exam record ${id} deleted from MySQL` });
  } catch (error) {
    console.error('Failed to delete history record:', error);
    res.status(500).json({ error: 'Failed to delete record', details: error.message });
  }
});

// 6. Clear all exam history for a user
app.delete('/api/history', async (req, res) => {
  try {
    const { userId, userEmail } = req.query;
    const pool = getPool();

    if (userId) {
      await pool.query('DELETE FROM exam_attempts WHERE user_id = ?', [userId]);
    } else if (userEmail) {
      await pool.query('DELETE FROM exam_attempts WHERE user_email = ?', [userEmail.trim().toLowerCase()]);
    } else {
      await pool.query('DELETE FROM exam_attempts');
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

    let query = 'SELECT * FROM saved_sessions';
    const params = [];

    if (userId) {
      query += ' WHERE user_id = ?';
      params.push(userId);
    } else if (userEmail) {
      query += ' WHERE user_email = ?';
      params.push(userEmail.trim().toLowerCase());
    } else if (candidateName) {
      query += ' WHERE candidate_name = ?';
      params.push(candidateName);
    }

    query += ' ORDER BY updated_at DESC';

    const [rows] = await pool.query(query, params);

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
        questions: parsedQuestions,
        answers: parsedAnswers,
        flaggedQuestions: parsedFlagged,
        revealedQuestions: parsedRevealed,
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

// 8. Candidate Notes API (Sync question notes with MySQL)
app.get('/api/notes', async (req, res) => {
  try {
    const { userId, userEmail, candidateName } = req.query;
    const pool = getPool();

    let query = 'SELECT * FROM candidate_notes';
    const params = [];

    if (userId) {
      query += ' WHERE user_id = ?';
      params.push(userId);
    } else if (userEmail) {
      query += ' WHERE user_email = ?';
      params.push(userEmail.trim().toLowerCase());
    } else if (candidateName) {
      query += ' WHERE candidate_name = ?';
      params.push(candidateName);
    }

    const [rows] = await pool.query(query, params);

    const notesObj = {};
    rows.forEach((r) => {
      notesObj[r.question_id] = r.note_text;
    });

    res.json({ notes: notesObj, list: rows });
  } catch (error) {
    console.error('Failed to fetch notes from MySQL:', error);
    res.status(500).json({ error: 'Failed to fetch notes', details: error.message });
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const { userId, userEmail, candidateName, questionId, questionNo, noteText } = req.body;
    if (!questionId) {
      return res.status(400).json({ error: 'questionId is required' });
    }

    const pool = getPool();
    await pool.query(
      `INSERT INTO candidate_notes (user_id, user_email, candidate_name, question_id, question_no, note_text)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE note_text=VALUES(note_text), question_no=VALUES(question_no), candidate_name=VALUES(candidate_name)`,
      [
        userId || null,
        userEmail ? userEmail.trim().toLowerCase() : null,
        candidateName || 'Candidate',
        questionId,
        questionNo || `Question #${questionId}`,
        noteText || ''
      ]
    );

    res.json({ success: true, message: 'Note saved to MySQL' });
  } catch (error) {
    console.error('Failed to save note to MySQL:', error);
    res.status(500).json({ error: 'Failed to save note', details: error.message });
  }
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
