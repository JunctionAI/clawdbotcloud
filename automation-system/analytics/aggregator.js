/**
 * Analytics Aggregation Worker
 * 
 * Runs periodically to compute rollup metrics from raw events.
 * Designed to run as a cron job or scheduled task.
 * 
 * Usage:
 *   node aggregator.js daily     # Run daily aggregations
 *   node aggregator.js hourly    # Run hourly aggregations (real-time dashboards)
 *   node aggregator.js churn     # Calculate churn risk scores
 *   node aggregator.js cleanup   # Delete old events (90 day retention)
 */

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});

// ============================================================
// DAILY AGGREGATIONS
// ============================================================

/**
 * Run all daily aggregations
 */
async function runDailyAggregations() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const date = yesterday.toISOString().split('T')[0];
  
  console.log(`[Aggregator] Running daily aggregations for ${date}`);
  
  await Promise.all([
    aggregateDailyActiveUsers(date),
    aggregateSkillUsage(date),
    aggregateFunnelMetrics(date),
    aggregateMRR(date),
    aggregateSessionMetrics(date),
    calculateChurnRisk(),
  ]);
  
  console.log(`[Aggregator] Daily aggregations complete for ${date}`);
}

/**
 * Aggregate daily active users
 */
async function aggregateDailyActiveUsers(date) {
  const query = `
    INSERT INTO analytics_daily_metrics (date, metric_name, metric_value, dimensions)
    SELECT 
      $1::date as date,
      'daily_active_users' as metric_name,
      COUNT(DISTINCT properties->>'customer_id_hash') as metric_value,
      jsonb_build_object('tier', COALESCE(properties->>'tier', 'unknown')) as dimensions
    FROM analytics_events
    WHERE event_name = 'message_sent'
      AND DATE(timestamp) = $1::date
    GROUP BY COALESCE(properties->>'tier', 'unknown')
    ON CONFLICT (date, metric_name, dimensions) 
    DO UPDATE SET metric_value = EXCLUDED.metric_value
  `;
  
  await pool.query(query, [date]);
  console.log(`[Aggregator] DAU aggregated for ${date}`);
}

/**
 * Aggregate skill usage
 */
async function aggregateSkillUsage(date) {
  const query = `
    INSERT INTO analytics_skill_daily (date, skill_id, skill_name, unique_users, total_uses, success_count, error_count)
    SELECT 
      $1::date as date,
      properties->>'skill_id' as skill_id,
      properties->>'skill_name' as skill_name,
      COUNT(DISTINCT properties->>'customer_id_hash') as unique_users,
      COUNT(*) as total_uses,
      COUNT(*) FILTER (WHERE (properties->>'success')::boolean = true) as success_count,
      COUNT(*) FILTER (WHERE (properties->>'success')::boolean = false) as error_count
    FROM analytics_events
    WHERE event_name = 'skill_used'
      AND DATE(timestamp) = $1::date
      AND properties->>'skill_id' IS NOT NULL
    GROUP BY properties->>'skill_id', properties->>'skill_name'
    ON CONFLICT (date, skill_id) 
    DO UPDATE SET 
      unique_users = EXCLUDED.unique_users,
      total_uses = EXCLUDED.total_uses,
      success_count = EXCLUDED.success_count,
      error_count = EXCLUDED.error_count
  `;
  
  await pool.query(query, [date]);
  console.log(`[Aggregator] Skill usage aggregated for ${date}`);
}

/**
 * Aggregate funnel metrics
 */
async function aggregateFunnelMetrics(date) {
  const steps = [
    { name: 'page_viewed', order: 1 },
    { name: 'checkout_started', order: 2 },
    { name: 'user_signup', order: 3 },
    { name: 'onboarding_started', order: 4 },
    { name: 'onboarding_completed', order: 5 },
    { name: 'message_sent', order: 6 },
  ];
  
  for (const step of steps) {
    const countQuery = `
      SELECT COUNT(DISTINCT properties->>'customer_id_hash') as count
      FROM analytics_events
      WHERE event_name = $1
        AND DATE(timestamp) = $2::date
    `;
    
    const result = await pool.query(countQuery, [step.name, date]);
    const count = parseInt(result.rows[0]?.count || 0);
    
    const insertQuery = `
      INSERT INTO analytics_funnel_daily (date, funnel_name, step_name, step_order, visitor_count)
      VALUES ($1, 'signup', $2, $3, $4)
      ON CONFLICT (date, funnel_name, step_name)
      DO UPDATE SET visitor_count = EXCLUDED.visitor_count
    `;
    
    await pool.query(insertQuery, [date, step.name, step.order, count]);
  }
  
  // Calculate conversion rates
  const updateRatesQuery = `
    UPDATE analytics_funnel_daily f1
    SET 
      conversion_count = COALESCE(f2.visitor_count, 0),
      conversion_rate = CASE 
        WHEN f1.visitor_count > 0 
        THEN COALESCE(f2.visitor_count, 0)::decimal / f1.visitor_count 
        ELSE 0 
      END
    FROM analytics_funnel_daily f2
    WHERE f1.date = $1
      AND f1.funnel_name = 'signup'
      AND f2.date = f1.date
      AND f2.funnel_name = f1.funnel_name
      AND f2.step_order = f1.step_order + 1
  `;
  
  await pool.query(updateRatesQuery, [date]);
  console.log(`[Aggregator] Funnel metrics aggregated for ${date}`);
}

/**
 * Aggregate MRR
 */
async function aggregateMRR(date) {
  // Get current MRR from customers table
  const mrrQuery = `
    WITH current_mrr AS (
      SELECT
        SUM(CASE 
          WHEN tier = 'starter' THEN 1250
          WHEN tier = 'professional' THEN 4900
          WHEN tier = 'enterprise' THEN 14900
          ELSE 0
        END) as total_cents,
        COUNT(*) as total_customers
      FROM customers
      WHERE status = 'active'
    ),
    new_customers AS (
      SELECT COUNT(*) as count,
        SUM(CASE 
          WHEN tier = 'starter' THEN 1250
          WHEN tier = 'professional' THEN 4900
          WHEN tier = 'enterprise' THEN 14900
          ELSE 0
        END) as mrr_cents
      FROM customers
      WHERE DATE(created_at) = $1::date
        AND status = 'active'
    ),
    churned AS (
      SELECT COUNT(*) as count
      FROM analytics_events
      WHERE event_name = 'subscription_cancelled'
        AND DATE(timestamp) = $1::date
    )
    INSERT INTO analytics_mrr_history (date, mrr_total_cents, mrr_new_cents, customer_count, customer_new, customer_churned)
    SELECT 
      $1::date,
      COALESCE(cm.total_cents, 0),
      COALESCE(nc.mrr_cents, 0),
      COALESCE(cm.total_customers, 0),
      COALESCE(nc.count, 0),
      COALESCE(ch.count, 0)
    FROM current_mrr cm, new_customers nc, churned ch
    ON CONFLICT (date) 
    DO UPDATE SET 
      mrr_total_cents = EXCLUDED.mrr_total_cents,
      mrr_new_cents = EXCLUDED.mrr_new_cents,
      customer_count = EXCLUDED.customer_count,
      customer_new = EXCLUDED.customer_new,
      customer_churned = EXCLUDED.customer_churned
  `;
  
  await pool.query(mrrQuery, [date]);
  console.log(`[Aggregator] MRR aggregated for ${date}`);
}

/**
 * Aggregate session metrics
 */
async function aggregateSessionMetrics(date) {
  const query = `
    INSERT INTO analytics_daily_metrics (date, metric_name, metric_value, dimensions)
    SELECT 
      $1::date as date,
      'avg_messages_per_session' as metric_name,
      AVG(message_count) as metric_value,
      jsonb_build_object('channel', channel) as dimensions
    FROM analytics_sessions
    WHERE DATE(started_at) = $1::date
    GROUP BY channel
    ON CONFLICT (date, metric_name, dimensions) 
    DO UPDATE SET metric_value = EXCLUDED.metric_value
  `;
  
  await pool.query(query, [date]);
  console.log(`[Aggregator] Session metrics aggregated for ${date}`);
}

// ============================================================
// CHURN RISK CALCULATION
// ============================================================

/**
 * Calculate churn risk scores for all customers
 */
async function calculateChurnRisk() {
  console.log('[Aggregator] Calculating churn risk scores...');
  
  // Get customer activity data
  const activityQuery = `
    WITH customer_activity AS (
      SELECT 
        properties->>'customer_id_hash' as customer_hash,
        MAX(timestamp) as last_active,
        COUNT(*) as message_count_30d,
        COUNT(DISTINCT DATE(timestamp)) as active_days_30d
      FROM analytics_events
      WHERE event_name = 'message_sent'
        AND timestamp > NOW() - INTERVAL '30 days'
      GROUP BY properties->>'customer_id_hash'
    ),
    payment_failures AS (
      SELECT 
        properties->>'customer_id_hash' as customer_hash,
        COUNT(*) as failure_count
      FROM analytics_events
      WHERE event_name = 'payment_failed'
        AND timestamp > NOW() - INTERVAL '30 days'
      GROUP BY properties->>'customer_id_hash'
    ),
    customer_info AS (
      SELECT DISTINCT ON (properties->>'customer_id_hash')
        properties->>'customer_id_hash' as customer_hash,
        properties->>'tier' as tier
      FROM analytics_events
      WHERE properties->>'tier' IS NOT NULL
      ORDER BY properties->>'customer_id_hash', timestamp DESC
    )
    SELECT 
      ci.customer_hash,
      ci.tier,
      ca.last_active,
      EXTRACT(days FROM NOW() - ca.last_active) as days_since_active,
      COALESCE(ca.message_count_30d, 0) as message_count_30d,
      COALESCE(ca.active_days_30d, 0) as active_days_30d,
      COALESCE(pf.failure_count, 0) as payment_failures
    FROM customer_info ci
    LEFT JOIN customer_activity ca ON ci.customer_hash = ca.customer_hash
    LEFT JOIN payment_failures pf ON ci.customer_hash = pf.customer_hash
  `;
  
  const { rows } = await pool.query(activityQuery);
  
  for (const customer of rows) {
    const riskFactors = [];
    let riskScore = 0;
    
    // Factor 1: Days since last active
    const daysSinceActive = customer.days_since_active || 999;
    if (daysSinceActive > 14) {
      riskFactors.push('no_login_14d');
      riskScore += 40;
    } else if (daysSinceActive > 7) {
      riskFactors.push('no_login_7d');
      riskScore += 20;
    } else if (daysSinceActive > 3) {
      riskScore += 5;
    }
    
    // Factor 2: Low activity
    if (customer.message_count_30d < 10) {
      riskFactors.push('low_usage');
      riskScore += 20;
    }
    
    // Factor 3: Low engagement days
    if (customer.active_days_30d < 5) {
      riskFactors.push('infrequent_use');
      riskScore += 15;
    }
    
    // Factor 4: Payment failures
    if (customer.payment_failures > 0) {
      riskFactors.push('payment_failed');
      riskScore += 25 * customer.payment_failures;
    }
    
    // Determine risk level
    let riskLevel = 'low';
    if (riskScore >= 60) riskLevel = 'high';
    else if (riskScore >= 30) riskLevel = 'medium';
    
    // Upsert risk record
    const upsertQuery = `
      INSERT INTO analytics_churn_risk (
        customer_id_hash, tier, risk_level, risk_score, risk_factors,
        last_active, days_since_active, weekly_message_avg, payment_failures, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
      ON CONFLICT (customer_id_hash)
      DO UPDATE SET
        tier = EXCLUDED.tier,
        risk_level = EXCLUDED.risk_level,
        risk_score = EXCLUDED.risk_score,
        risk_factors = EXCLUDED.risk_factors,
        last_active = EXCLUDED.last_active,
        days_since_active = EXCLUDED.days_since_active,
        weekly_message_avg = EXCLUDED.weekly_message_avg,
        payment_failures = EXCLUDED.payment_failures,
        updated_at = NOW()
    `;
    
    await pool.query(upsertQuery, [
      customer.customer_hash,
      customer.tier || 'unknown',
      riskLevel,
      Math.min(riskScore, 100),
      JSON.stringify(riskFactors),
      customer.last_active,
      daysSinceActive,
      customer.message_count_30d / 4, // Weekly average
      customer.payment_failures,
    ]);
  }
  
  console.log(`[Aggregator] Calculated risk for ${rows.length} customers`);
}

// ============================================================
// CLEANUP
// ============================================================

/**
 * Delete old events (90 day retention)
 */
async function cleanupOldEvents() {
  const query = `
    DELETE FROM analytics_events
    WHERE timestamp < NOW() - INTERVAL '90 days'
  `;
  
  const result = await pool.query(query);
  console.log(`[Aggregator] Deleted ${result.rowCount} old events`);
  return result.rowCount;
}

// ============================================================
// CLI INTERFACE
// ============================================================

const command = process.argv[2];

async function main() {
  try {
    switch (command) {
      case 'daily':
        await runDailyAggregations();
        break;
      case 'hourly':
        // Lightweight hourly aggregations for real-time dashboards
        const today = new Date().toISOString().split('T')[0];
        await aggregateDailyActiveUsers(today);
        break;
      case 'churn':
        await calculateChurnRisk();
        break;
      case 'cleanup':
        await cleanupOldEvents();
        break;
      default:
        console.log('Usage: node aggregator.js [daily|hourly|churn|cleanup]');
        process.exit(1);
    }
  } catch (error) {
    console.error('[Aggregator] Error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  runDailyAggregations,
  calculateChurnRisk,
  cleanupOldEvents,
};
