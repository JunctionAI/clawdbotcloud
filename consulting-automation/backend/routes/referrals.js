const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');

router.get('/', (req, res) => {
  const { referrer_client_id } = req.query;
  const db = getDatabase();
  
  let query = `
    SELECT r.*, c.name as referrer_name, l.name as referred_name, l.status as lead_status
    FROM referrals r
    JOIN clients c ON r.referrer_client_id = c.id
    LEFT JOIN leads l ON r.referred_lead_id = l.id
    WHERE 1=1
  `;
  const params = [];
  
  if (referrer_client_id) {
    query += ' AND r.referrer_client_id = ?';
    params.push(referrer_client_id);
  }
  
  query += ' ORDER BY r.created_at DESC';
  
  const referrals = db.prepare(query).all(...params);
  res.json({ referrals });
});

module.exports = router;
