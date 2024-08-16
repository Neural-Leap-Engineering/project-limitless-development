// backend/server.js

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

// Create table for transactions
db.serialize(() => {
  db.run(`CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset TEXT,
    type TEXT,
    amount REAL,
    date TEXT
  )`);
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
