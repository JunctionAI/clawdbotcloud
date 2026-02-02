const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');

// GET /api/clients - List all clients
router.get('/', (req, res) => {
  const { status = 'active', limit = 50 } = req.query;
  const db = getDatabase();
  
  try {
    const clients = db.prepare(`
      SELECT c.*, COUNT(p.id) as project_count, SUM(p.price) as total_revenue
      FROM clients c
      LEFT JOIN projects p ON c.id = p.client_id
      WHERE c.status = ?
      GROUP BY c.id
      ORDER BY c.created_at DESC
      LIMIT ?
    `).all(status, parseInt(limit));
    
    res.json({ clients, count: clients.length });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

// GET /api/clients/:id - Get single client with projects
router.get('/:id', (req, res) => {
  const db = getDatabase();
  
  try {
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id);
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    const projects = db.prepare('SELECT * FROM projects WHERE client_id = ? ORDER BY created_at DESC').all(req.params.id);
    const payments = db.prepare('SELECT * FROM payments WHERE client_id = ? ORDER BY created_at DESC').all(req.params.id);
    
    res.json({ client, projects, payments });
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ error: 'Failed to fetch client' });
  }
});

// POST /api/clients - Create client from lead
router.post('/', (req, res) => {
  const { lead_id, name, email, company, phone, billing_address } = req.body;
  const db = getDatabase();
  
  try {
    const stmt = db.prepare(`
      INSERT INTO clients (lead_id, name, email, company, phone, billing_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(lead_id || null, name, email, company || null, phone || null, billing_address || null);
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(result.lastInsertRowid);
    
    res.status(201).json({ success: true, client });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Failed to create client' });
  }
});

module.exports = router;
