-- Clawdbot Automation System Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  stripe_customer_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_subscription_id VARCHAR(255),
  tier VARCHAR(50) NOT NULL, -- starter, professional, enterprise
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, suspended, cancelled
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Agents table
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  deployment_id VARCHAR(255), -- Railway project ID
  deployment_url VARCHAR(255), -- Agent API endpoint
  status VARCHAR(50) NOT NULL DEFAULT 'provisioning', -- provisioning, ready, error, stopped
  tier VARCHAR(50) NOT NULL,
  config JSONB, -- Agent configuration
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Deployments table
CREATE TABLE deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, in_progress, completed, failed
  logs TEXT, -- Deployment logs
  error TEXT, -- Error message if failed
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  tier VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL, -- active, past_due, cancelled
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Usage analytics table
CREATE TABLE usage_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  messages_sent INT DEFAULT 0,
  messages_received INT DEFAULT 0,
  tasks_completed INT DEFAULT 0,
  time_saved_minutes INT DEFAULT 0,
  skills_used JSONB, -- {"email": 15, "research": 8}
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_customers_stripe_id ON customers(stripe_customer_id);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_agents_customer_id ON agents(customer_id);
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_deployments_agent_id ON deployments(agent_id);
CREATE INDEX idx_deployments_status ON deployments(status);
CREATE INDEX idx_usage_agent_date ON usage_analytics(agent_id, date);

-- Sample data (for testing)
-- INSERT INTO customers (email, name, stripe_customer_id, tier, status)
-- VALUES ('test@example.com', 'Test User', 'cus_test123', 'starter', 'active');
