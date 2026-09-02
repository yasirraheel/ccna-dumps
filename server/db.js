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

    // 2. Drop and recreate questions table to ensure exact schema & fresh sequence
    await pool.query(`DROP TABLE IF EXISTS questions;`);

    await pool.query(`
      CREATE TABLE questions (
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

    // 2. Exam attempts / history table (Full exam history record)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS exam_attempts (
        id VARCHAR(100) PRIMARY KEY,
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Active / In-Progress Saved Sessions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS saved_sessions (
        id VARCHAR(100) PRIMARY KEY,
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 4. Candidate notes table (per question notes)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS candidate_notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        candidate_name VARCHAR(150) NOT NULL,
        question_id INT NOT NULL,
        question_no VARCHAR(30),
        note_text TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_cand_q (candidate_name, question_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

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
