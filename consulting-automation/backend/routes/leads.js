const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');
const validator = require('validator');

// Calculate lead score
function calculateLeadScore(lead) {
  let score = 0;
  
  // Budget range (max 40 points)
  const budgetScores = {
    '10k+': 40,
    '5k-10k': 30,
    '1k-5k': 20,
    'under-1k': 10
  };
  score += budgetScores[lead.budget_range] || 0;
  
  // Urgency (max 30 points)
  const urgencyScores = {
    'immediate': 30,
    'this-month': 20,
    'exploring': 10
  };
  score += urgencyScores[lead.urgency] || 0;
  
  // Service type (max 20 points)
  const serviceScores = {
    'ai-automation': 20, // highest ticket
    'marketing': 15,
    'clawdbot': 10
  };
  score += serviceScores[lead.service_interest] || 0;
  
  // Has company name (10 points)
  if (lead.company && lead.company.trim()) score += 10;
  
  return Math.min(score, 100);
}

// POST /api/leads - Create new lead (from landing page form)
router.post('/', async (req, res) => {
  const { email, name, company, phone, source, service_interest, budget_range, urgency, notes } = req.body;
  
  // Validation
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const db = getDatabase();
  
  try {
    // Check for duplicate
    const existing = db.prepare('SELECT id FROM leads WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ error: 'Lead with this email already exists', lead_id: existing.id });
    }
    
    const score = calculateLeadScore({ budget_range, urgency, service_interest, company });
    
    const stmt = db.prepare(`
      INSERT INTO leads (email, name, company, phone, source, service_interest, budget_range, urgency, notes, score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(email, name, company || null, phone || null, source || 'direct', 
      service_interest || null, budget_range || null, urgency || null, notes || null, score);
    
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(result.lastInsertRowid);
    
    // TODO: Trigger email sequence
    // TODO: Notify Tom via Discord/Telegram if score > 70
    
    res.status(201).json({ 
      success: true, 
      lead,
      message: 'Lead created successfully. You\'ll hear from us within 24 hours!'
    });
    
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

// GET /api/leads - List all leads
router.get('/', (req, res) => {
  const { status, service_interest, min_score, limit = 50 } = req.query;
  
  const db = getDatabase();
  let query = 'SELECT * FROM leads WHERE 1=1';
  const params = [];
  
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  
  if (service_interest) {
    query += ' AND service_interest = ?';
    params.push(service_interest);
  }
  
  if (min_score) {
    query += ' AND score >= ?';
    params.push(parseInt(min_score));
  }
  
  query += ' ORDER BY score DESC, created_at DESC LIMIT ?';
  params.push(parseInt(limit));
  
  try {
    const leads = db.prepare(query).all(...params);
    res.json({ leads, count: leads.length });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// GET /api/leads/:id - Get single lead
router.get('/:id', (req, res) => {
  const db = getDatabase();
  
  try {
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    // Get proposals for this lead
    const proposals = db.prepare('SELECT * FROM proposals WHERE lead_id = ? ORDER BY created_at DESC').all(req.params.id);
    
    res.json({ lead, proposals });
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Failed to fetch lead' });
  }
});

// PATCH /api/leads/:id - Update lead
router.patch('/:id', (req, res) => {
  const { status, notes, score } = req.body;
  const db = getDatabase();
  
  try {
    const updates = [];
    const params = [];
    
    if (status) {
      updates.push('status = ?');
      params.push(status);
    }
    
    if (notes !== undefined) {
      updates.push('notes = ?');
      params.push(notes);
    }
    
    if (score !== undefined) {
      updates.push('score = ?');
      params.push(score);
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(req.params.id);
    
    const stmt = db.prepare(`UPDATE leads SET ${updates.join(', ')} WHERE id = ?`);
    stmt.run(...params);
    
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
    res.json({ success: true, lead });
    
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

// DELETE /api/leads/:id - Delete lead (soft delete - mark as closed-lost)
router.delete('/:id', (req, res) => {
  const db = getDatabase();
  
  try {
    const stmt = db.prepare('UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run('closed-lost', req.params.id);
    
    res.json({ success: true, message: 'Lead marked as closed-lost' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

module.exports = router;
