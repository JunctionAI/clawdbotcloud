const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');

// GET /api/analytics/dashboard - Main dashboard stats
router.get('/dashboard', (req, res) => {
  const db = getDatabase();
  
  try {
    // Revenue summary
    const revenue = db.prepare(`
      SELECT 
        SUM(CASE WHEN strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now') THEN price ELSE 0 END) as this_month,
        SUM(price) as total,
        AVG(price) as avg_project_value
      FROM projects
      WHERE status IN ('completed', 'active')
    `).get();
    
    // Pipeline stats
    const pipeline = db.prepare(`
      SELECT 
        COUNT(CASE WHEN status = 'new' THEN 1 END) as new_leads,
        COUNT(CASE WHEN status = 'qualified' THEN 1 END) as qualified,
        COUNT(CASE WHEN status = 'proposal-sent' THEN 1 END) as proposals_sent,
        COUNT(CASE WHEN status = 'negotiating' THEN 1 END) as negotiating
      FROM leads
    `).get();
    
    // Client stats
    const clients = db.prepare(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active,
        COUNT(CASE WHEN onboarding_complete = 0 THEN 1 END) as onboarding
      FROM clients
    `).get();
    
    // Conversion rate
    const conversions = db.prepare(`
      SELECT 
        COUNT(*) as total_leads,
        COUNT(CASE WHEN status = 'closed-won' THEN 1 END) as won,
        COUNT(CASE WHEN status = 'closed-lost' THEN 1 END) as lost
      FROM leads
    `).get();
    
    const conversion_rate = conversions.total_leads > 0 
      ? (conversions.won / conversions.total_leads * 100).toFixed(1)
      : 0;
    
    res.json({
      revenue,
      pipeline,
      clients,
      conversion_rate: parseFloat(conversion_rate),
      conversions
    });
    
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// GET /api/analytics/revenue - Revenue breakdown
router.get('/revenue', (req, res) => {
  const { period = 'month' } = req.query;
  const db = getDatabase();
  
  try {
    const revenue_by_service = db.prepare(`
      SELECT 
        service_type,
        COUNT(*) as project_count,
        SUM(price) as total_revenue,
        AVG(price) as avg_price
      FROM projects
      WHERE status IN ('completed', 'active')
      GROUP BY service_type
    `).all();
    
    res.json({ revenue_by_service });
  } catch (error) {
    console.error('Error fetching revenue analytics:', error);
    res.status(500).json({ error: 'Failed to fetch revenue analytics' });
  }
});

module.exports = router;
