require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: Number(process.env.DB_PORT) || 3306,
};

const DB_NAME = process.env.DB_NAME || 'ccna_exam_db';

let pool;

async function initDB() {
  try {
    if (dbConfig.user !== 'root') {
      // Connect directly to existing user database
      pool = mysql.createPool({
        ...dbConfig,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    } else {
      const initConnection = await mysql.createConnection(dbConfig);
      await initConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
      await initConnection.end();

      pool = mysql.createPool({
        ...dbConfig,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }

    // 1. Users table (Registration, Login, Email Verification)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT 0,
        verification_code VARCHAR(10),
        verification_expires_at BIGINT,
        reset_token VARCHAR(100),
        reset_expires_at BIGINT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Questions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(30) DEFAULT 'multiple_choice',
        question_no VARCHAR(30) NOT NULL,
        question TEXT NOT NULL,
        options JSON,
        correct_option JSON,
        drag_drop_data JSON,
        points INT DEFAULT 10,
        cli_snippet TEXT,
        exhibit_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Exam attempts / history table (Full exam history record tied to authenticated user)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS exam_attempts (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(100),
        user_email VARCHAR(191),
        candidate_name VARCHAR(150) NOT NULL,
        bank_name VARCHAR(200) NOT NULL,
        score INT NOT NULL,
        max_score INT NOT NULL,
        percentage DECIMAL(5, 2) NOT NULL,
        passed BOOLEAN NOT NULL,
        total_questions INT NOT NULL,
        time_spent_seconds INT DEFAULT 0,
        exam_date BIGINT NOT NULL,
        questions JSON,
        answers JSON,
        flagged_questions JSON,
        revealed_questions JSON,
        settings JSON,
        exam_mode VARCHAR(50) DEFAULT 'study',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_user_email (user_email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Ensure columns exist if table was already created
    try {
      await pool.query(`ALTER TABLE exam_attempts ADD COLUMN user_id VARCHAR(100) AFTER id;`);
    } catch {}
    try {
      await pool.query(`ALTER TABLE exam_attempts ADD COLUMN user_email VARCHAR(191) AFTER user_id;`);
    } catch {}
    try {
      await pool.query(`ALTER TABLE exam_attempts ADD COLUMN exam_date BIGINT NOT NULL DEFAULT 0 AFTER time_spent_seconds;`);
    } catch {}
    try {
      await pool.query(`ALTER TABLE questions ADD COLUMN explanation LONGTEXT;`);
    } catch {}
    try {
      await pool.query(`ALTER TABLE questions ADD COLUMN original_source_image VARCHAR(255);`);
    } catch {}

    // 4. Active / In-Progress Saved Sessions table (tied to user_id/email)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS saved_sessions (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(100),
        user_email VARCHAR(191),
        candidate_name VARCHAR(150) NOT NULL,
        bank_name VARCHAR(200) NOT NULL,
        exam_mode VARCHAR(50) DEFAULT 'study',
        q_index INT DEFAULT 0,
        points INT DEFAULT 0,
        seconds_remaining INT DEFAULT 7200,
        time_spent_seconds INT DEFAULT 0,
        questions JSON,
        answers JSON,
        flagged_questions JSON,
        revealed_questions JSON,
        question_notes JSON,
        settings JSON,
        updated_at BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_session_user_id (user_id),
        INDEX idx_session_user_email (user_email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Ensure columns exist if table was already created
    try {
      await pool.query(`ALTER TABLE saved_sessions ADD COLUMN user_id VARCHAR(100) AFTER id;`);
    } catch {}
    try {
      await pool.query(`ALTER TABLE saved_sessions ADD COLUMN user_email VARCHAR(191) AFTER user_id;`);
    } catch {}

    // 5. Candidate notes table (per question notes tied to user)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS candidate_notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(100),
        user_email VARCHAR(191),
        candidate_name VARCHAR(150) NOT NULL,
        question_id INT NOT NULL,
        question_no VARCHAR(30),
        note_text TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_q (user_id, question_id),
        INDEX idx_notes_user_email (user_email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Ensure columns exist if table was already created
    try {
      await pool.query(`ALTER TABLE candidate_notes ADD COLUMN user_id VARCHAR(100) AFTER id;`);
    } catch {}
    try {
      await pool.query(`ALTER TABLE candidate_notes ADD COLUMN user_email VARCHAR(191) AFTER user_id;`);
    } catch {}

    // 6. User exam settings table (Dashboard exam bank, mode, and customize settings)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_exam_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(100) NULL,
        user_email VARCHAR(191) NOT NULL,
        selected_bank VARCHAR(50) DEFAULT 'bank_a',
        exam_mode VARCHAR(50) DEFAULT 'study',
        settings LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_user_settings (user_email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    const [qRows] = await pool.query('SELECT COUNT(*) as count FROM questions');
    if (qRows[0].count === 0) {
      console.log('Seeding CCNA questions into MySQL...');
      const { ccnaQuestions } = require('../src/data/ccnaQuestions');

      for (const q of ccnaQuestions) {
        await pool.query(
          `INSERT INTO questions (id, type, question_no, question, options, correct_option, drag_drop_data, points, cli_snippet, exhibit_image)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            q.id,
            q.type || (q.dragDropData ? 'drag_drop' : 'multiple_choice'),
            q.questionNo,
            q.question,
            q.options ? JSON.stringify(q.options) : null,
            q.correctOption !== undefined && q.correctOption !== null ? JSON.stringify(q.correctOption) : null,
            q.dragDropData ? JSON.stringify(q.dragDropData) : null,
            q.points || 10,
            q.cliSnippet || null,
            q.exhibitImage || null,
          ]
        );
      }
      console.log(`Successfully populated all ${ccnaQuestions.length} questions in MySQL database.`);
    } else {
      console.log(`Questions table already populated (${qRows[0].count} questions found in MySQL).`);
    }

    // Ensure default verified test candidate exists and map orphan records
    try {
      const bcrypt = require('bcryptjs');
      const testEmail = 'candidate@ccna.com';
      const testName = 'Yasir Raheel';
      const testPassword = 'Password123!';
      const passwordHash = await bcrypt.hash(testPassword, 10);

      const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [testEmail]);
      let testUserId;
      if (existingUsers.length > 0) {
        testUserId = existingUsers[0].id;
        await pool.query(
          'UPDATE users SET name = ?, password_hash = ?, is_verified = 1 WHERE id = ?',
          [testName, passwordHash, testUserId]
        );
      } else {
        testUserId = `usr_${Date.now()}`;
        await pool.query(
          'INSERT INTO users (id, name, email, password_hash, is_verified, created_at) VALUES (?, ?, ?, ?, 1, NOW())',
          [testUserId, testName, testEmail, passwordHash]
        );
        console.log(`✅ Default Verified Test Account Ready: ${testEmail} (Password: ${testPassword})`);
      }

      // Safely link any orphaned attempts/sessions to their respective user by matching email
      await pool.query(`
        UPDATE exam_attempts ea 
        JOIN users u ON LOWER(ea.user_email) = LOWER(u.email) 
        SET ea.user_id = u.id 
        WHERE ea.user_id IS NULL OR ea.user_id = ""
      `);
      await pool.query(`
        UPDATE saved_sessions ss 
        JOIN users u ON LOWER(ss.user_email) = LOWER(u.email) 
        SET ss.user_id = u.id 
        WHERE ss.user_id IS NULL OR ss.user_id = ""
      `);
      await pool.query(`
        UPDATE candidate_notes cn 
        JOIN users u ON LOWER(cn.user_email) = LOWER(u.email) 
        SET cn.user_id = u.id 
        WHERE cn.user_id IS NULL OR cn.user_id = ""
      `);
      await pool.query(`
        UPDATE user_exam_settings ues 
        JOIN users u ON LOWER(ues.user_email) = LOWER(u.email) 
        SET ues.user_id = u.id 
        WHERE ues.user_id IS NULL OR ues.user_id = ""
      `);
    } catch (e) {
      console.warn('Test user check/map:', e.message);
    }

    return pool;
  } catch (error) {
    console.error('Error initializing MySQL database:', error.message);
    throw error;
  }
}

function getPool() {
  if (!pool) {
    throw new Error('Database pool not initialized. Call initDB() first.');
  }
  return pool;
}

module.exports = { initDB, getPool };
