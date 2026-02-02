const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');

router.get('/', (req, res) => {
  const db = getDatabase();
  const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC LIMIT 50').all();
  res.json({ projects });
});

router.get('/:id', (req, res) => {
  const db = getDatabase();
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json({ project });
});

router.post('/', (req, res) => {
  const { client_id, service_type, title, description, price, pricing_model } = req.body;
  const db = getDatabase();
  
  const stmt = db.prepare(`
    INSERT INTO projects (client_id, service_type, title, description, price, pricing_model)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(client_id, service_type, title, description || null, price, pricing_model || 'fixed');
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
  
  res.status(201).json({ success: true, project });
});

module.exports = router;
