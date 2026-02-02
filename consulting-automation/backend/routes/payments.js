const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');

router.get('/', (req, res) => {
  const db = getDatabase();
  const payments = db.prepare('SELECT * FROM payments ORDER BY created_at DESC LIMIT 50').all();
  res.json({ payments });
});

router.post('/', (req, res) => {
  const { project_id, client_id, amount, type, method = 'stripe' } = req.body;
  const db = getDatabase();
  
  const stmt = db.prepare(`
    INSERT INTO payments (project_id, client_id, amount, type, method)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(project_id, client_id, amount, type, method);
  res.status(201).json({ success: true, payment_id: result.lastInsertRowid });
});

module.exports = router;
