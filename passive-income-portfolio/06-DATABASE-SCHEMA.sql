-- Supabase Database Schema for Passive Income Portfolio
-- Run this in your Supabase SQL Editor to set up all tables

-- ============================================
-- MICRO-SAAS TABLES
-- ============================================

-- Licenses table (API keys for browser extension)
CREATE TABLE IF NOT EXISTS licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    api_key VARCHAR(255) UNIQUE NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    plan_type VARCHAR(50) NOT NULL, -- 'monthly' or 'yearly'
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'expired', 'revoked', 'cancelled'
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage logs (track extension usage for analytics)
CREATE TABLE IF NOT EXISTS usage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    api_key VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    action VARCHAR(100), -- Optional: track specific features used
    metadata JSONB -- Store additional context
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_licenses_api_key ON licenses(api_key);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);
CREATE INDEX IF NOT EXISTS idx_usage_logs_api_key ON usage_logs(api_key);
CREATE INDEX IF NOT EXISTS idx_usage_logs_timestamp ON usage_logs(timestamp);

-- ============================================
-- AFFILIATE MARKETING TABLES
-- ============================================

-- Affiliate commissions
CREATE TABLE IF NOT EXISTS affiliate_commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commission_date DATE NOT NULL,
    program_name VARCHAR(255) NOT NULL, -- 'Shopify', 'ClickFunnels', etc.
    program_id VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    sale_id VARCHAR(255), -- External sale reference
    customer_email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'paid'
    payout_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts (track SEO performance)
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    url VARCHAR(1000) NOT NULL,
    publish_date DATE NOT NULL,
    word_count INTEGER,
    target_keyword VARCHAR(255),
    status VARCHAR(50) DEFAULT 'published', -- 'draft', 'published', 'archived'
    monthly_visits INTEGER DEFAULT 0,
    affiliate_clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_commissions_date ON affiliate_commissions(commission_date);
CREATE INDEX IF NOT EXISTS idx_commissions_program ON affiliate_commissions(program_name);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- ============================================
-- DIGITAL PRODUCTS TABLES
-- ============================================

-- Sales (aggregate from all platforms)
CREATE TABLE IF NOT EXISTS sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL, -- 'gumroad', 'etsy', 'creative_market', 'direct'
    product_name VARCHAR(500) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    fees DECIMAL(10, 2) DEFAULT 0,
    net DECIMAL(10, 2) NOT NULL, -- amount - fees
    buyer_email VARCHAR(255),
    sale_date TIMESTAMP WITH TIME ZONE NOT NULL,
    transaction_id VARCHAR(255),
    refunded BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(platform, product_id, sale_date) -- Prevent duplicates
);

-- Products catalog
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(500) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- 'notion-template', 'spreadsheet', 'figma-template'
    price DECIMAL(10, 2) NOT NULL,
    platforms JSONB, -- Array of platforms it's listed on
    download_url VARCHAR(1000),
    demo_url VARCHAR(1000),
    total_sales INTEGER DEFAULT 0,
    total_revenue DECIMAL(10, 2) DEFAULT 0,
    rating DECIMAL(3, 2), -- Average rating (e.g., 4.8)
    reviews_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'archived', 'discontinued'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_sales_platform ON sales(platform);
CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(sale_date);
CREATE INDEX IF NOT EXISTS idx_sales_product_name ON sales(product_name);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- ============================================
-- SHARED TABLES (All Streams)
-- ============================================

-- Portfolio reports (aggregated metrics)
CREATE TABLE IF NOT EXISTS portfolio_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_date DATE NOT NULL UNIQUE,
    period VARCHAR(20) NOT NULL, -- 'day', 'week', 'month'
    total_revenue DECIMAL(10, 2) NOT NULL,
    total_expenses DECIMAL(10, 2) DEFAULT 0,
    net_profit DECIMAL(10, 2) NOT NULL,
    report_data JSONB NOT NULL, -- Store full report details
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email subscribers (across all streams)
CREATE TABLE IF NOT EXISTS email_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    source VARCHAR(100), -- 'micro-saas', 'affiliate-blog', 'gumroad', 'landing-page'
    tags JSONB, -- Array of tags for segmentation
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'unsubscribed', 'bounced'
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    last_emailed_at TIMESTAMP WITH TIME ZONE,
    open_rate DECIMAL(5, 2), -- Percentage
    click_rate DECIMAL(5, 2) -- Percentage
);

-- Expenses (track operating costs)
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_date DATE NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'hosting', 'tools', 'ads', 'freelancer'
    description TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    stream VARCHAR(50), -- Optional: which stream this expense belongs to
    recurring BOOLEAN DEFAULT FALSE, -- Is this a monthly cost?
    payment_method VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_reports_date ON portfolio_reports(report_date);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_status ON email_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_source ON email_subscribers(source);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);

-- ============================================
-- VIEWS (Useful Queries)
-- ============================================

-- Monthly revenue by stream
CREATE OR REPLACE VIEW monthly_revenue_by_stream AS
SELECT 
    DATE_TRUNC('month', sale_date) AS month,
    'digital-products' AS stream,
    SUM(net) AS revenue
FROM sales
GROUP BY DATE_TRUNC('month', sale_date)
UNION ALL
SELECT 
    DATE_TRUNC('month', commission_date) AS month,
    'affiliate' AS stream,
    SUM(amount) AS revenue
FROM affiliate_commissions
WHERE status = 'approved'
GROUP BY DATE_TRUNC('month', commission_date)
ORDER BY month DESC, stream;

-- Top selling products
CREATE OR REPLACE VIEW top_products AS
SELECT 
    product_name,
    COUNT(*) AS sales_count,
    SUM(net) AS total_revenue,
    AVG(net) AS avg_price
FROM sales
WHERE NOT refunded
GROUP BY product_name
ORDER BY total_revenue DESC
LIMIT 10;

-- Active subscribers (Micro-SaaS)
CREATE OR REPLACE VIEW active_subscribers AS
SELECT 
    COUNT(*) AS total_subscribers,
    SUM(CASE WHEN plan_type = 'monthly' THEN 1 ELSE 0 END) AS monthly_subs,
    SUM(CASE WHEN plan_type = 'yearly' THEN 1 ELSE 0 END) AS yearly_subs
FROM licenses
WHERE status = 'active' AND expires_at > NOW();

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update product stats after new sale
CREATE OR REPLACE FUNCTION update_product_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products
    SET 
        total_sales = total_sales + 1,
        total_revenue = total_revenue + NEW.net,
        updated_at = NOW()
    WHERE name = NEW.product_name;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update product stats
CREATE TRIGGER sales_update_products
    AFTER INSERT ON sales
    FOR EACH ROW
    EXECUTE FUNCTION update_product_stats();

-- Function to calculate MRR (Monthly Recurring Revenue)
CREATE OR REPLACE FUNCTION calculate_mrr()
RETURNS DECIMAL AS $$
DECLARE
    mrr DECIMAL;
BEGIN
    SELECT 
        SUM(
            CASE 
                WHEN plan_type = 'monthly' THEN 15 -- Adjust to your pricing
                WHEN plan_type = 'yearly' THEN 15 * 0.85 -- Adjust for yearly discount
                ELSE 0
            END
        )
    INTO mrr
    FROM licenses
    WHERE status = 'active' AND expires_at > NOW();
    
    RETURN COALESCE(mrr, 0);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (Optional, for multi-user)
-- ============================================

-- Enable RLS on sensitive tables
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_commissions ENABLE ROW LEVEL SECURITY;

-- Create policies (example: only authenticated users can read)
CREATE POLICY "Allow authenticated users to read licenses"
    ON licenses FOR SELECT
    USING (auth.role() = 'authenticated');

-- Note: Adjust policies based on your access control needs

-- ============================================
-- SAMPLE DATA (For Testing)
-- ============================================

-- Insert sample license
INSERT INTO licenses (api_key, user_email, plan_type, stripe_subscription_id, status, expires_at)
VALUES 
    ('lic_sample123', 'test@example.com', 'monthly', 'sub_123', 'active', NOW() + INTERVAL '30 days')
ON CONFLICT DO NOTHING;

-- Insert sample sale
INSERT INTO sales (platform, product_name, product_id, amount, fees, net, buyer_email, sale_date)
VALUES 
    ('gumroad', 'Personal Finance Dashboard', 'prod_123', 25.00, 2.50, 22.50, 'buyer@example.com', NOW())
ON CONFLICT DO NOTHING;

-- Insert sample commission
INSERT INTO affiliate_commissions (commission_date, program_name, amount, status)
VALUES 
    (CURRENT_DATE, 'Shopify', 800.00, 'approved')
ON CONFLICT DO NOTHING;

-- ============================================
-- MAINTENANCE QUERIES
-- ============================================

-- Check database size
-- SELECT pg_size_pretty(pg_database_size(current_database()));

-- Delete old usage logs (keep last 90 days)
-- DELETE FROM usage_logs WHERE timestamp < NOW() - INTERVAL '90 days';

-- Vacuum tables (optimize storage)
-- VACUUM ANALYZE licenses;
-- VACUUM ANALYZE sales;
-- VACUUM ANALYZE affiliate_commissions;

-- ============================================
-- BACKUP RECOMMENDATIONS
-- ============================================

-- Supabase handles automatic backups, but consider:
-- 1. Daily exports via pg_dump (use GitHub Actions)
-- 2. Store in S3 or Google Cloud Storage
-- 3. Test restore procedure monthly

-- Example backup command (run from CLI):
-- pg_dump -h db.project.supabase.co -U postgres -d postgres > backup_$(date +%Y%m%d).sql

-- ============================================
-- NOTES
-- ============================================

-- 1. Replace placeholder values (pricing, email domains) with your actual data
-- 2. Test all triggers and functions after creating
-- 3. Monitor query performance with EXPLAIN ANALYZE
-- 4. Add more indexes if queries become slow
-- 5. Consider partitioning large tables (sales, usage_logs) by date
-- 6. Set up automated alerts for database health (Supabase dashboard)

-- Setup complete! 🎉
-- Your passive income database is ready.
