const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database(':memory:');

// Create tables for transactions and tasks
db.serialize(() => {
  db.run(`CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset TEXT,
    type TEXT,
    amount REAL,
    date TEXT
  )`);

  db.run(`CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    summary TEXT,
    status TEXT,
    priority TEXT,
    progress INTEGER,
    dueDate TEXT,
    active INTEGER,
    link TEXT,
    avatar TEXT,
    amount REAL
  )`);

  // Insert two default rows into tasks with non-null values
  db.run(`INSERT INTO tasks (summary, status, priority, progress, dueDate, active, link, avatar, amount) VALUES 
    ('Task 1', 'To Do', 'Low', 30, '2024-08-20T18:30:00.000Z', 1, 'https://www.example.com', 'https://via.placeholder.com/40', 1000),
    ('Task 2', 'In Progress', 'Medium', 60, '2024-08-21T18:30:00.000Z', 1, 'https://www.example.com', 'https://via.placeholder.com/40', 2500)
  `);
});

// Get all transactions
app.get('/transactions', (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Add a new transaction
app.post('/transactions', (req, res) => {
  const { asset, type, amount, date } = req.body;
  db.run(`INSERT INTO transactions (asset, type, amount, date) VALUES (?, ?, ?, ?)`,
    [asset, type, amount, date], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Update a transaction
app.put('/transactions/:id', (req, res) => {
  const { id } = req.params;
  const { asset, type, amount, date } = req.body;
  db.run(`UPDATE transactions SET asset = ?, type = ?, amount = ?, date = ? WHERE id = ?`,
    [asset, type, amount, date, id], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes });
    }
  );
});

// Delete a transaction
app.delete('/transactions/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM transactions WHERE id = ?`, id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { summary, status, priority, progress, dueDate, active, link, avatar, amount } = req.body;
  db.run(`INSERT INTO tasks (summary, status, priority, progress, dueDate, active, link, avatar, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [summary, status, priority, progress, dueDate, active, link, avatar, amount], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { summary, status, priority, progress, dueDate, active, link, avatar, amount } = req.body;
  
    // Convert dueDate to correct format if provided
    const parsedDueDate = dueDate ? new Date(dueDate).toISOString() : null;
  
    db.run(`UPDATE tasks SET summary = ?, status = ?, priority = ?, progress = ?, dueDate = ?, active = ?, link = ?, avatar = ?, amount = ? WHERE id = ?`,
      [summary, status, priority, progress, parsedDueDate, active, link, avatar, amount, id], function(err) {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({ updated: this.changes });
      }
    );
  });

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM tasks WHERE id = ?`, id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
