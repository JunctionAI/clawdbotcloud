-- Clawdbot Analytics Database Schema
-- Privacy-first event tracking with time-series optimization

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- RAW EVENTS TABLE (Time-series optimized)
-- ============================================================

CREATE TABLE IF NOT EXISTS analytics_events (
    event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name VARCHAR(100) NOT NULL,
    properties JSONB NOT NULL DEFAULT '{}',
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    environment VARCHAR(20) NOT NULL DEFAULT 'production',
    event_source VARCHAR(50) NOT NULL DEFAULT 'clawdbot-core',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON analytics_events (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_events_name ON analytics_events (event_name);
CREATE INDEX IF NOT EXISTS idx_events_customer ON analytics_events ((properties->>'customer_id_hash'));
CREATE INDEX IF NOT EXISTS idx_events_name_timestamp ON analytics_events (event_name, timestamp DESC);

-- Composite index for funnel queries
CREATE INDEX IF NOT EXISTS idx_events_funnel ON analytics_events (
    event_name,
    (properties->>'customer_id_hash'),
    timestamp
);

-- ============================================================
-- AGGREGATED METRICS TABLES
-- ============================================================

-- Daily metrics rollup
CREATE TABLE IF NOT EXISTS analytics_daily_metrics (
    date DATE NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15, 2) NOT NULL,
    dimensions JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (date, metric_name, dimensions)
);

CREATE INDEX IF NOT EXISTS idx_daily_metrics_date ON analytics_daily_metrics (date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_name ON analytics_daily_metrics (metric_name);

-- Customer-level aggregates
CREATE TABLE IF NOT EXISTS analytics_customer_metrics (
    customer_id_hash VARCHAR(16) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15, 2) NOT NULL,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (customer_id_hash, metric_name)
);

CREATE INDEX IF NOT EXISTS idx_customer_metrics_hash ON analytics_customer_metrics (customer_id_hash);

-- ============================================================
-- MRR TRACKING
-- ============================================================

CREATE TABLE IF NOT EXISTS analytics_mrr_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    mrr_total_cents BIGINT NOT NULL,
    mrr_new_cents BIGINT NOT NULL DEFAULT 0,
    mrr_expansion_cents BIGINT NOT NULL DEFAULT 0,
    mrr_contraction_cents BIGINT NOT NULL DEFAULT 0,
    mrr_churn_cents BIGINT NOT NULL DEFAULT 0,
    customer_count INTEGER NOT NULL,
    customer_new INTEGER NOT NULL DEFAULT 0,
    customer_churned INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_mrr_history_date ON analytics_mrr_history (date);

-- ============================================================
-- FUNNEL TRACKING
-- ============================================================

CREATE TABLE IF NOT EXISTS analytics_funnel_daily (
    date DATE NOT NULL,
    funnel_name VARCHAR(50) NOT NULL,
    step_name VARCHAR(50) NOT NULL,
    step_order INTEGER NOT NULL,
    visitor_count INTEGER NOT NULL DEFAULT 0,
    conversion_count INTEGER NOT NULL DEFAULT 0,
    conversion_rate DECIMAL(5, 4) NOT NULL DEFAULT 0,
    PRIMARY KEY (date, funnel_name, step_name)
);

CREATE INDEX IF NOT EXISTS idx_funnel_date ON analytics_funnel_daily (date DESC, funnel_name);

-- ============================================================
-- SKILL USAGE TRACKING
-- ============================================================

CREATE TABLE IF NOT EXISTS analytics_skill_daily (
    date DATE NOT NULL,
    skill_id VARCHAR(50) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    unique_users INTEGER NOT NULL DEFAULT 0,
    total_uses INTEGER NOT NULL DEFAULT 0,
    success_count INTEGER NOT NULL DEFAULT 0,
    error_count INTEGER NOT NULL DEFAULT 0,
    avg_response_time_ms INTEGER,
    PRIMARY KEY (date, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_skill_daily_date ON analytics_skill_daily (date DESC);
CREATE INDEX IF NOT EXISTS idx_skill_daily_skill ON analytics_skill_daily (skill_id);

-- ============================================================
-- CHURN RISK TRACKING
-- ============================================================

CREATE TABLE IF NOT EXISTS analytics_churn_risk (
    customer_id_hash VARCHAR(16) PRIMARY KEY,
    tier VARCHAR(20) NOT NULL,
    risk_level VARCHAR(10) NOT NULL,
    risk_score DECIMAL(5, 2) NOT NULL,
    risk_factors JSONB NOT NULL DEFAULT '[]',
    last_active TIMESTAMPTZ,
    days_since_active INTEGER,
    weekly_message_avg DECIMAL(10, 2),
    weekly_message_trend DECIMAL(5, 2),
    payment_failures INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_churn_risk_level ON analytics_churn_risk (risk_level, risk_score DESC);

-- ============================================================
-- SESSION TRACKING
-- ============================================================

CREATE TABLE IF NOT EXISTS analytics_sessions (
    session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id_hash VARCHAR(16) NOT NULL,
    channel VARCHAR(20) NOT NULL,
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    message_count INTEGER NOT NULL DEFAULT 0,
    skills_used JSONB NOT NULL DEFAULT '[]',
    avg_response_time_ms INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_customer ON analytics_sessions (customer_id_hash, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_started ON analytics_sessions (started_at DESC);

-- ============================================================
-- DATA RETENTION POLICIES
-- ============================================================

-- Function to delete old raw events (keep 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_events()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM analytics_events
    WHERE timestamp < NOW() - INTERVAL '90 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- USEFUL VIEWS
-- ============================================================

-- Real-time MRR view
CREATE OR REPLACE VIEW v_current_mrr AS
SELECT
    SUM(CASE WHEN tier = 'starter' THEN 1250 ELSE 0 END) as starter_mrr_cents,
    SUM(CASE WHEN tier = 'professional' THEN 4900 ELSE 0 END) as professional_mrr_cents,
    SUM(CASE WHEN tier = 'enterprise' THEN 14900 ELSE 0 END) as enterprise_mrr_cents,
    SUM(CASE 
        WHEN tier = 'starter' THEN 1250
        WHEN tier = 'professional' THEN 4900
        WHEN tier = 'enterprise' THEN 14900
        ELSE 0
    END) as total_mrr_cents,
    COUNT(*) as total_customers,
    COUNT(CASE WHEN tier = 'starter' THEN 1 END) as starter_count,
    COUNT(CASE WHEN tier = 'professional' THEN 1 END) as professional_count,
    COUNT(CASE WHEN tier = 'enterprise' THEN 1 END) as enterprise_count
FROM customers
WHERE status = 'active';

-- Daily active users view
CREATE OR REPLACE VIEW v_daily_active AS
SELECT
    DATE(timestamp) as date,
    COUNT(DISTINCT properties->>'customer_id_hash') as dau
FROM analytics_events
WHERE event_name = 'message_sent'
  AND timestamp > NOW() - INTERVAL '30 days'
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- Skill popularity view
CREATE OR REPLACE VIEW v_skill_popularity AS
SELECT
    properties->>'skill_id' as skill_id,
    properties->>'skill_name' as skill_name,
    COUNT(*) as total_uses,
    COUNT(DISTINCT properties->>'customer_id_hash') as unique_users,
    AVG(CASE WHEN (properties->>'success')::boolean THEN 1 ELSE 0 END) as success_rate
FROM analytics_events
WHERE event_name = 'skill_used'
  AND timestamp > NOW() - INTERVAL '30 days'
GROUP BY properties->>'skill_id', properties->>'skill_name'
ORDER BY total_uses DESC;

-- Conversion funnel view
CREATE OR REPLACE VIEW v_conversion_funnel AS
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
      AND timestamp > NOW() - INTERVAL '30 days'
    GROUP BY properties->>'customer_id_hash', event_name
)
SELECT
    'Signup Funnel' as funnel_name,
    event_name as step,
    COUNT(DISTINCT customer_hash) as users,
    LAG(COUNT(DISTINCT customer_hash)) OVER (ORDER BY 
        CASE event_name
            WHEN 'page_viewed' THEN 1
            WHEN 'checkout_started' THEN 2
            WHEN 'user_signup' THEN 3
            WHEN 'onboarding_started' THEN 4
            WHEN 'onboarding_completed' THEN 5
            WHEN 'message_sent' THEN 6
        END
    ) as previous_step_users
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
    END;

-- ============================================================
-- SAMPLE DATA FOR TESTING
-- ============================================================

-- Uncomment to insert test events:
/*
INSERT INTO analytics_events (event_name, properties, timestamp) VALUES
('user_signup', '{"customer_id_hash": "abc123", "tier": "starter", "signup_source": "organic"}', NOW() - INTERVAL '7 days'),
('skill_installed', '{"customer_id_hash": "abc123", "skill_id": "email", "skill_name": "Email Manager"}', NOW() - INTERVAL '6 days'),
('message_sent', '{"customer_id_hash": "abc123", "channel": "discord", "message_length_bucket": "medium"}', NOW() - INTERVAL '5 days'),
('daily_active', '{"customer_id_hash": "abc123", "tier": "starter", "consecutive_active_days": 1}', NOW() - INTERVAL '5 days');
*/
