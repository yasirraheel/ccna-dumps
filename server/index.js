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

// 3. Save candidate exam progress / results
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

    if (!candidateName) {
      return res.status(400).json({ error: 'Candidate name is required' });
    }

    const pool = getPool();
    const [result] = await pool.query(
      `INSERT INTO exam_attempts 
       (candidate_name, score, max_possible_points, percentage, passed, total_questions, time_spent_seconds)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        candidateName.trim(),
        score || 0,
        maxPossiblePoints || 0,
        percentage || 0,
        passed ? 1 : 0,
        totalQuestions || 0,
        timeSpentSeconds || 0,
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Exam progress saved successfully to MySQL',
      attemptId: result.insertId,
    });
  } catch (error) {
    console.error('Failed to save exam progress:', error);
    res.status(500).json({ error: 'Failed to save progress to database', details: error.message });
  }
});

// 4. Get recent attempts / history
app.get('/api/history', async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT * FROM exam_attempts ORDER BY attempted_at DESC LIMIT 15'
    );
    res.json({ history: rows });
  } catch (error) {
    console.error('Failed to fetch history:', error);
    res.status(500).json({ error: 'Failed to fetch attempt history', details: error.message });
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
