-- Consulting Automation Database Schema
-- SQLite - lightweight, portable, zero-config

-- ============================================
-- LEADS & CONTACTS
-- ============================================

CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    company TEXT,
    phone TEXT,
    source TEXT, -- 'seo', 'meta-ads', 'referral', 'direct'
    service_interest TEXT, -- 'clawdbot', 'marketing', 'ai-automation'
    budget_range TEXT, -- '1k-5k', '5k-10k', '10k+'
    urgency TEXT, -- 'immediate', 'this-month', 'exploring'
    notes TEXT,
    score INTEGER DEFAULT 0, -- lead score 0-100
    status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'proposal-sent', 'negotiating', 'closed-won', 'closed-lost'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_score ON leads(score DESC);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

-- ============================================
-- CLIENTS
-- ============================================

CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    company TEXT,
    phone TEXT,
    billing_address TEXT,
    contract_signed BOOLEAN DEFAULT 0,
    contract_url TEXT,
    onboarding_complete BOOLEAN DEFAULT 0,
    lifetime_value REAL DEFAULT 0,
    status TEXT DEFAULT 'active', -- 'active', 'paused', 'churned'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id)
);

CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_ltv ON clients(lifetime_value DESC);

-- ============================================
-- PROJECTS
-- ============================================

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    service_type TEXT NOT NULL, -- 'clawdbot-setup', 'marketing-consulting', 'ai-automation'
    title TEXT NOT NULL,
    description TEXT,
    scope TEXT, -- JSON: detailed scope breakdown
    price REAL NOT NULL,
    pricing_model TEXT, -- 'fixed', 'hourly', 'retainer', 'value-based'
    estimated_hours REAL,
    status TEXT DEFAULT 'proposal', -- 'proposal', 'active', 'completed', 'cancelled'
    start_date DATE,
    end_date DATE,
    payment_status TEXT DEFAULT 'pending', -- 'pending', 'deposit-paid', 'paid', 'overdue'
    payment_schedule TEXT, -- JSON: milestone payments
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_client ON projects(client_id);

-- ============================================
-- PROPOSALS
-- ============================================

CREATE TABLE IF NOT EXISTS proposals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL,
    project_id INTEGER,
    service_type TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    scope_html TEXT, -- generated HTML proposal
    price REAL NOT NULL,
    pricing_breakdown TEXT, -- JSON
    terms TEXT,
    valid_until DATE,
    status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired'
    sent_at DATETIME,
    viewed_at DATETIME,
    accepted_at DATETIME,
    rejected_at DATETIME,
    rejection_reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_lead ON proposals(lead_id);

-- ============================================
-- PAYMENTS
-- ============================================

CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'NZD',
    type TEXT, -- 'deposit', 'milestone', 'final', 'retainer'
    method TEXT, -- 'stripe', 'bank-transfer', 'wise'
    stripe_payment_id TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed', 'refunded'
    due_date DATE,
    paid_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_client ON payments(client_id);

-- ============================================
-- TESTIMONIALS
-- ============================================

CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    project_id INTEGER,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    quote TEXT,
    video_url TEXT,
    permission_granted BOOLEAN DEFAULT 0,
    featured BOOLEAN DEFAULT 0,
    requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    received_at DATETIME,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE INDEX idx_testimonials_featured ON testimonials(featured, rating DESC);

-- ============================================
-- REFERRALS
-- ============================================

CREATE TABLE IF NOT EXISTS referrals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    referrer_client_id INTEGER NOT NULL,
    referred_lead_id INTEGER,
    referred_email TEXT NOT NULL,
    referred_name TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'converted', 'lost'
    reward_type TEXT, -- 'percentage', 'fixed', 'credit'
    reward_amount REAL,
    reward_paid BOOLEAN DEFAULT 0,
    converted_project_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    converted_at DATETIME,
    FOREIGN KEY (referrer_client_id) REFERENCES clients(id),
    FOREIGN KEY (referred_lead_id) REFERENCES leads(id),
    FOREIGN KEY (converted_project_id) REFERENCES projects(id)
);

CREATE INDEX idx_referrals_status ON referrals(status);
CREATE INDEX idx_referrals_referrer ON referrals(referrer_client_id);

-- ============================================
-- UPSELLS / CROSS-SELLS
-- ============================================

CREATE TABLE IF NOT EXISTS upsell_triggers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    trigger_type TEXT NOT NULL, -- 'project-completion', 'milestone-reached', 'time-based', 'usage-threshold'
    trigger_condition TEXT, -- JSON: conditions
    suggested_service TEXT, -- 'clawdbot-advanced', 'marketing-retainer', 'ai-expansion'
    status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'accepted', 'declined', 'snoozed'
    sent_at DATETIME,
    responded_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE INDEX idx_upsells_status ON upsell_triggers(status);
CREATE INDEX idx_upsells_client ON upsell_triggers(client_id);

-- ============================================
-- EMAIL SEQUENCES
-- ============================================

CREATE TABLE IF NOT EXISTS email_sequences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, -- 'lead-nurture', 'onboarding', 'testimonial-request', 'referral-ask'
    description TEXT,
    active BOOLEAN DEFAULT 1
);

CREATE TABLE IF NOT EXISTS email_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sequence_id INTEGER NOT NULL,
    step_number INTEGER NOT NULL,
    delay_days INTEGER DEFAULT 0, -- days after previous email (or trigger)
    subject TEXT NOT NULL,
    body_html TEXT NOT NULL,
    body_text TEXT,
    active BOOLEAN DEFAULT 1,
    FOREIGN KEY (sequence_id) REFERENCES email_sequences(id)
);

CREATE TABLE IF NOT EXISTS email_sends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_id INTEGER NOT NULL,
    recipient_email TEXT NOT NULL,
    lead_id INTEGER,
    client_id INTEGER,
    status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'
    sent_at DATETIME,
    opened_at DATETIME,
    clicked_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES email_templates(id),
    FOREIGN KEY (lead_id) REFERENCES leads(id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE INDEX idx_email_sends_status ON email_sends(status);
CREATE INDEX idx_email_sends_recipient ON email_sends(recipient_email);

-- ============================================
-- ANALYTICS & TRACKING
-- ============================================

CREATE TABLE IF NOT EXISTS revenue_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL,
    source TEXT NOT NULL, -- 'clawdbot', 'marketing', 'ai-automation'
    amount REAL NOT NULL,
    project_id INTEGER,
    client_id INTEGER,
    notes TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE INDEX idx_revenue_date ON revenue_tracking(date DESC);
CREATE INDEX idx_revenue_source ON revenue_tracking(source);

CREATE TABLE IF NOT EXISTS marketing_spend (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL,
    channel TEXT NOT NULL, -- 'meta-ads', 'google-ads', 'seo', 'content'
    campaign_name TEXT,
    spend REAL NOT NULL,
    impressions INTEGER,
    clicks INTEGER,
    leads_generated INTEGER,
    conversions INTEGER
);

CREATE INDEX idx_marketing_date ON marketing_spend(date DESC);
CREATE INDEX idx_marketing_channel ON marketing_spend(channel);

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- Pipeline view
CREATE VIEW IF NOT EXISTS pipeline_view AS
SELECT 
    l.id,
    l.name,
    l.email,
    l.company,
    l.service_interest,
    l.budget_range,
    l.status,
    l.score,
    COUNT(p.id) as proposal_count,
    MAX(p.created_at) as last_proposal_date
FROM leads l
LEFT JOIN proposals p ON l.id = p.lead_id
GROUP BY l.id;

-- Revenue summary
CREATE VIEW IF NOT EXISTS revenue_summary AS
SELECT 
    strftime('%Y-%m', date) as month,
    source,
    SUM(amount) as total_revenue,
    COUNT(DISTINCT client_id) as unique_clients
FROM revenue_tracking
GROUP BY month, source
ORDER BY month DESC;

-- Client LTV
CREATE VIEW IF NOT EXISTS client_ltv_view AS
SELECT 
    c.id,
    c.name,
    c.email,
    c.company,
    COUNT(DISTINCT pr.id) as project_count,
    SUM(pr.price) as total_revenue,
    AVG(pr.price) as avg_project_value,
    MIN(pr.created_at) as first_project,
    MAX(pr.created_at) as last_project
FROM clients c
LEFT JOIN projects pr ON c.id = pr.client_id
GROUP BY c.id;

-- ============================================
-- SEED DATA (Email Sequences)
-- ============================================

INSERT OR IGNORE INTO email_sequences (id, name, description) VALUES
(1, 'lead-nurture', 'Nurture new leads from inquiry to proposal'),
(2, 'onboarding', 'Welcome new clients and set expectations'),
(3, 'testimonial-request', 'Request testimonials after project completion'),
(4, 'referral-ask', 'Ask happy clients for referrals');
