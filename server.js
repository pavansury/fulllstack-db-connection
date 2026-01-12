const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./backend/db');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    res.json({
      message: 'Database connected successfully!',
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD Operations for Users
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    const [result] = await db.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    res.json({
      message: 'User created successfully',
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve React frontend build (correct path from project root)
const buildPath = path.join(__dirname, 'frontend', 'build');

app.use(express.static(buildPath));

// Catch-all handler to serve React's index.html for non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
