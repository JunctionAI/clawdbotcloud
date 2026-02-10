/**
 * Analytics API Endpoints
 * 
 * REST API for querying analytics data.
 * Mount this router at /api/analytics in your Express app.
 * 
 * @example
 * const analyticsRouter = require('./analytics/api');
 * app.use('/api/analytics', analyticsRouter);
 */

const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ============================================================
// EXECUTIVE DASHBOARD
// ============================================================

/**
 * GET /api/analytics/summary
 * Executive summary with key KPIs
 */
router.get('/summary', async (req, res) => {
  try {
    const [mrr, users, churn, engagement] = await Promise.all([
      // MRR
      pool.query(`
        SELECT 
          COALESCE(mrr_total_cents, 0) as mrr_cents,
          COALESCE(customer_count, 0) as customer_count
        FROM analytics_mrr_history
        ORDER BY date DESC
        LIMIT 1
      `),
      
      // Active users (30 days)
      pool.query(`
        SELECT COUNT(DISTINCT properties->>'customer_id_hash') as active_users
        FROM analytics_events
        WHERE event_name = 'message_sent'
          AND timestamp > NOW() - INTERVAL '30 days'
      `),
      
      // Churn rate (last 30 days)
      pool.query(`
        WITH churn_data AS (
          SELECT
            (SELECT COUNT(*) FROM analytics_events 
             WHERE event_name = 'subscription_cancelled'
               AND timestamp > NOW() - INTERVAL '30 days') as churned,
            (SELECT customer_count FROM analytics_mrr_history
             ORDER BY date ASC
             LIMIT 1) as starting_customers
        )
        SELECT 
          churned,
          starting_customers,
          CASE WHEN starting_customers > 0 
            THEN ROUND((churned::decimal / starting_customers) * 100, 2)
            ELSE 0 
          END as churn_rate
        FROM churn_data
      `),
      
      // Engagement (DAU/MAU)
      pool.query(`
        WITH dau AS (
          SELECT COUNT(DISTINCT properties->>'customer_id_hash') as count
          FROM analytics_events
          WHERE event_name = 'message_sent'
            AND DATE(timestamp) = CURRENT_DATE - 1
        ),
        mau AS (
          SELECT COUNT(DISTINCT properties->>'customer_id_hash') as count
          FROM analytics_events
          WHERE event_name = 'message_sent'
            AND timestamp > NOW() - INTERVAL '30 days'
        )
        SELECT 
          dau.count as dau,
          mau.count as mau,
          CASE WHEN mau.count > 0 
            THEN ROUND((dau.count::decimal / mau.count) * 100, 1)
            ELSE 0 
          END as dau_mau_ratio
        FROM dau, mau
      `),
    ]);
    
    res.json({
      mrr_cents: parseInt(mrr.rows[0]?.mrr_cents) || 0,
      mrr_formatted: `$${((parseInt(mrr.rows[0]?.mrr_cents) || 0) / 100).toLocaleString()}`,
      total_customers: parseInt(mrr.rows[0]?.customer_count) || 0,
      active_users_30d: parseInt(users.rows[0]?.active_users) || 0,
      churn_rate: parseFloat(churn.rows[0]?.churn_rate) || 0,
      dau: parseInt(engagement.rows[0]?.dau) || 0,
      mau: parseInt(engagement.rows[0]?.mau) || 0,
      dau_mau_ratio: parseFloat(engagement.rows[0]?.dau_mau_ratio) || 0,
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

// ============================================================
// REVENUE METRICS
// ============================================================

/**
 * GET /api/analytics/mrr
 * MRR breakdown and history
 */
router.get('/mrr', async (req, res) => {
  const { days = 30 } = req.query;
  
  try {
    const [history, breakdown] = await Promise.all([
      // MRR history
      pool.query(`
        SELECT date, mrr_total_cents, mrr_new_cents, mrr_churn_cents, customer_count
        FROM analytics_mrr_history
        WHERE date > NOW() - INTERVAL '${parseInt(days)} days'
        ORDER BY date ASC
      `),
      
      // Current breakdown by tier
      pool.query(`
        SELECT 
          tier,
          COUNT(*) as customer_count,
          SUM(CASE 
            WHEN tier = 'starter' THEN 1250
            WHEN tier = 'professional' THEN 4900
            WHEN tier = 'enterprise' THEN 14900
            ELSE 0
          END) as mrr_cents
        FROM customers
        WHERE status = 'active'
        GROUP BY tier
      `),
    ]);
    
    res.json({
      history: history.rows,
      breakdown: breakdown.rows,
      arpu_cents: history.rows.length > 0 && history.rows[history.rows.length - 1].customer_count > 0
        ? Math.round(history.rows[history.rows.length - 1].mrr_total_cents / history.rows[history.rows.length - 1].customer_count)
        : 0,
    });
  } catch (error) {
    console.error('Error fetching MRR:', error);
    res.status(500).json({ error: 'Failed to fetch MRR data' });
  }
});

// ============================================================
// CONVERSION FUNNEL
// ============================================================

/**
 * GET /api/analytics/funnel
 * Conversion funnel metrics
 */
router.get('/funnel', async (req, res) => {
  const { days = 30 } = req.query;
  
  try {
    const result = await pool.query(`
      WITH funnel_events AS (
        SELECT
          properties->>'customer_id_hash' as customer_hash,
          event_name,
          MIN(timestamp) as first_occurrence
        FROM analytics_events
        WHERE event_name IN (
          'page_viewed', 'checkout_started', 'user_signup',
          'onboarding_started', 'onboarding_completed', 'message_sent'
        )
          AND timestamp > NOW() - INTERVAL '${parseInt(days)} days'
        GROUP BY properties->>'customer_id_hash', event_name
      )
      SELECT
        event_name as step,
        COUNT(DISTINCT customer_hash) as users
      FROM funnel_events
      GROUP BY event_name
      ORDER BY 
        CASE event_name
          WHEN 'page_viewed' THEN 1
          WHEN 'checkout_started' THEN 2
          WHEN 'user_signup' THEN 3
          WHEN 'onboarding_started' THEN 4
          WHEN 'onboarding_completed' THEN 5
          WHEN 'message_sent' THEN 6
        END
    `);
    
    // Calculate conversion rates between steps
    const steps = result.rows;
    const funnelWithRates = steps.map((step, i) => ({
      ...step,
      conversion_rate: i === 0 ? 100 : 
        steps[i - 1].users > 0 
          ? Math.round((step.users / steps[i - 1].users) * 1000) / 10
          : 0,
      overall_rate: steps[0].users > 0
        ? Math.round((step.users / steps[0].users) * 1000) / 10
        : 0,
    }));
    
    res.json({
      funnel: funnelWithRates,
      period_days: parseInt(days),
    });
  } catch (error) {
    console.error('Error fetching funnel:', error);
    res.status(500).json({ error: 'Failed to fetch funnel data' });
  }
});

// ============================================================
// SKILL USAGE
// ============================================================

/**
 * GET /api/analytics/skills
 * Skill usage rankings and trends
 */
router.get('/skills', async (req, res) => {
  const { days = 30, limit = 20 } = req.query;
  
  try {
    const result = await pool.query(`
      SELECT 
        properties->>'skill_id' as skill_id,
        properties->>'skill_name' as skill_name,
        COUNT(*) as total_uses,
        COUNT(DISTINCT properties->>'customer_id_hash') as unique_users,
        ROUND(AVG(CASE WHEN (properties->>'success')::boolean THEN 1 ELSE 0 END) * 100, 1) as success_rate
      FROM analytics_events
      WHERE event_name = 'skill_used'
        AND timestamp > NOW() - INTERVAL '${parseInt(days)} days'
        AND properties->>'skill_id' IS NOT NULL
      GROUP BY properties->>'skill_id', properties->>'skill_name'
      ORDER BY total_uses DESC
      LIMIT ${parseInt(limit)}
    `);
    
    res.json({
      skills: result.rows,
      period_days: parseInt(days),
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skill data' });
  }
});

// ============================================================
// ENGAGEMENT METRICS
// ============================================================

/**
 * GET /api/analytics/engagement
 * User engagement metrics
 */
router.get('/engagement', async (req, res) => {
  const { days = 30 } = req.query;
  
  try {
    const [dau, sessions, channels] = await Promise.all([
      // Daily active users trend
      pool.query(`
        SELECT 
          DATE(timestamp) as date,
          COUNT(DISTINCT properties->>'customer_id_hash') as active_users
        FROM analytics_events
        WHERE event_name = 'message_sent'
          AND timestamp > NOW() - INTERVAL '${parseInt(days)} days'
        GROUP BY DATE(timestamp)
        ORDER BY date ASC
      `),
      
      // Session metrics
      pool.query(`
        SELECT 
          ROUND(AVG(message_count), 1) as avg_messages_per_session,
          ROUND(AVG(EXTRACT(EPOCH FROM (ended_at - started_at)) / 60), 1) as avg_session_minutes
        FROM analytics_sessions
        WHERE started_at > NOW() - INTERVAL '${parseInt(days)} days'
          AND ended_at IS NOT NULL
      `),
      
      // Channel distribution
      pool.query(`
        SELECT 
          properties->>'channel' as channel,
          COUNT(*) as message_count,
          COUNT(DISTINCT properties->>'customer_id_hash') as unique_users
        FROM analytics_events
        WHERE event_name = 'message_sent'
          AND timestamp > NOW() - INTERVAL '${parseInt(days)} days'
        GROUP BY properties->>'channel'
        ORDER BY message_count DESC
      `),
    ]);
    
    res.json({
      daily_active: dau.rows,
      avg_messages_per_session: parseFloat(sessions.rows[0]?.avg_messages_per_session) || 0,
      avg_session_minutes: parseFloat(sessions.rows[0]?.avg_session_minutes) || 0,
      channels: channels.rows,
      period_days: parseInt(days),
    });
  } catch (error) {
    console.error('Error fetching engagement:', error);
    res.status(500).json({ error: 'Failed to fetch engagement data' });
  }
});

// ============================================================
// CHURN RISK
// ============================================================

/**
 * GET /api/analytics/churn-risk
 * At-risk customers
 */
router.get('/churn-risk', async (req, res) => {
  const { level = 'all', limit = 50 } = req.query;
  
  try {
    let query = `
      SELECT 
        customer_id_hash,
        tier,
        risk_level,
        risk_score,
        risk_factors,
        days_since_active,
        weekly_message_avg,
        payment_failures,
        updated_at
      FROM analytics_churn_risk
    `;
    
    if (level !== 'all') {
      query += ` WHERE risk_level = '${level}'`;
    }
    
    query += ` ORDER BY risk_score DESC LIMIT ${parseInt(limit)}`;
    
    const result = await pool.query(query);
    
    // Get summary counts
    const summary = await pool.query(`
      SELECT 
        risk_level,
        COUNT(*) as count
      FROM analytics_churn_risk
      GROUP BY risk_level
    `);
    
    res.json({
      at_risk_customers: result.rows,
      summary: summary.rows.reduce((acc, row) => {
        acc[row.risk_level] = parseInt(row.count);
        return acc;
      }, {}),
    });
  } catch (error) {
    console.error('Error fetching churn risk:', error);
    res.status(500).json({ error: 'Failed to fetch churn risk data' });
  }
});

// ============================================================
// RAW EVENTS (Admin only)
// ============================================================

/**
 * GET /api/analytics/events
 * Query raw events (with pagination)
 */
router.get('/events', async (req, res) => {
  const { 
    event_name,
    customer_hash,
    limit = 100,
    offset = 0,
    start_date,
    end_date,
  } = req.query;
  
  try {
    let query = 'SELECT * FROM analytics_events WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    
    if (event_name) {
      query += ` AND event_name = $${paramIndex++}`;
      params.push(event_name);
    }
    
    if (customer_hash) {
      query += ` AND properties->>'customer_id_hash' = $${paramIndex++}`;
      params.push(customer_hash);
    }
    
    if (start_date) {
      query += ` AND timestamp >= $${paramIndex++}`;
      params.push(start_date);
    }
    
    if (end_date) {
      query += ` AND timestamp <= $${paramIndex++}`;
      params.push(end_date);
    }
    
    query += ` ORDER BY timestamp DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM analytics_events WHERE 1=1';
    const countParams = [];
    let countParamIndex = 1;
    
    if (event_name) {
      countQuery += ` AND event_name = $${countParamIndex++}`;
      countParams.push(event_name);
    }
    
    if (customer_hash) {
      countQuery += ` AND properties->>'customer_id_hash' = $${countParamIndex++}`;
      countParams.push(customer_hash);
    }
    
    const countResult = await pool.query(countQuery, countParams);
    
    res.json({
      events: result.rows,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// ============================================================
// HEALTH CHECK
// ============================================================

router.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

module.exports = router;
