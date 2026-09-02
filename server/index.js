const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB, getPool } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve exhibit images and static assets
app.use('/exhibits', express.static(path.join(__dirname, '../public/exhibits')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

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
app.post('/api/history', async (req, res) => {
  try {
    const {
      id,
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
       (id, candidate_name, bank_name, score, max_score, percentage, passed, total_questions, time_spent_seconds, exam_date, questions, answers, flagged_questions, revealed_questions, settings, exam_mode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       candidate_name=VALUES(candidate_name), bank_name=VALUES(bank_name), score=VALUES(score), max_score=VALUES(max_score),
       percentage=VALUES(percentage), passed=VALUES(passed), total_questions=VALUES(total_questions), time_spent_seconds=VALUES(time_spent_seconds),
       exam_date=VALUES(exam_date), questions=VALUES(questions), answers=VALUES(answers), flagged_questions=VALUES(flagged_questions),
       revealed_questions=VALUES(revealed_questions), settings=VALUES(settings), exam_mode=VALUES(exam_mode)`,
      [
        examId,
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

// Legacy progress endpoint
app.post('/api/progress', async (req, res) => {
  try {
    const {
      candidateName,
      score,
      maxPossiblePoints,
      percentage,
      passed,
      totalQuestions,
      timeSpentSeconds,
    } = req.body;

    const examId = `exam_${Date.now()}`;
    const pool = getPool();
    await pool.query(
      `INSERT INTO exam_attempts 
       (id, candidate_name, bank_name, score, max_score, percentage, passed, total_questions, time_spent_seconds, exam_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        examId,
        candidateName ? candidateName.trim() : 'Candidate',
        'CCNA Exam',
        score || 0,
        maxPossiblePoints || 1000,
        percentage || 0,
        passed ? 1 : 0,
        totalQuestions || 0,
        timeSpentSeconds || 0,
        Date.now(),
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Exam progress saved successfully to MySQL',
      attemptId: examId,
    });
  } catch (error) {
    console.error('Failed to save progress:', error);
    res.status(500).json({ error: 'Failed to save progress to database', details: error.message });
  }
});

// 4. Get all exam attempts / history from MySQL
app.get('/api/history', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT * FROM exam_attempts ORDER BY exam_date DESC LIMIT 50'
    );

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

// 6. Clear all exam history
app.delete('/api/history', async (req, res) => {
  try {
    const pool = getPool();
    await pool.query('DELETE FROM exam_attempts');
    res.json({ success: true, message: 'All exam records cleared from MySQL' });
  } catch (error) {
    console.error('Failed to clear history:', error);
    res.status(500).json({ error: 'Failed to clear history', details: error.message });
  }
});

// 7. Active Sessions CRUD (Sync in-progress sessions with MySQL)
app.get('/api/sessions', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM saved_sessions ORDER BY updated_at DESC');

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
       (id, candidate_name, bank_name, exam_mode, q_index, points, seconds_remaining, time_spent_seconds, questions, answers, flagged_questions, revealed_questions, question_notes, settings, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       candidate_name=VALUES(candidate_name), bank_name=VALUES(bank_name), exam_mode=VALUES(exam_mode), q_index=VALUES(q_index),
       points=VALUES(points), seconds_remaining=VALUES(seconds_remaining), time_spent_seconds=VALUES(time_spent_seconds),
       questions=VALUES(questions), answers=VALUES(answers), flagged_questions=VALUES(flagged_questions),
       revealed_questions=VALUES(revealed_questions), question_notes=VALUES(question_notes), settings=VALUES(settings),
       updated_at=VALUES(updated_at)`,
      [
        s.id,
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
    const { candidateName } = req.query;
    const pool = getPool();
    const [rows] = candidateName
      ? await pool.query('SELECT * FROM candidate_notes WHERE candidate_name = ?', [candidateName])
      : await pool.query('SELECT * FROM candidate_notes');

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
    const { candidateName, questionId, questionNo, noteText } = req.body;
    if (!questionId) {
      return res.status(400).json({ error: 'questionId is required' });
    }

    const pool = getPool();
    await pool.query(
      `INSERT INTO candidate_notes (candidate_name, question_id, question_no, note_text)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE note_text=VALUES(note_text), question_no=VALUES(question_no)`,
      [candidateName || 'Candidate', questionId, questionNo || `Question #${questionId}`, noteText || '']
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
