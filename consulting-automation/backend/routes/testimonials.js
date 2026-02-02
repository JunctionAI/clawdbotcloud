const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');

router.get('/', (req, res) => {
  const { featured } = req.query;
  const db = getDatabase();
  
  let query = 'SELECT t.*, c.name as client_name, c.company FROM testimonials t JOIN clients c ON t.client_id = c.id WHERE permission_granted = 1';
  
  if (featured === 'true') {
    query += ' AND featured = 1';
  }
  
  query += ' ORDER BY rating DESC, received_at DESC';
  
  const testimonials = db.prepare(query).all();
  res.json({ testimonials });
});

router.get('/:id', (req, res) => {
  const db = getDatabase();
  const testimonial = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(req.params.id);
  if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
  res.json({ testimonial });
});

module.exports = router;
