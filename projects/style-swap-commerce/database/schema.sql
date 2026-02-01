-- Style Swap Commerce Database Schema

-- Brands/Merchants
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    website_url TEXT NOT NULL,
    logo_url TEXT,
    commission_rate DECIMAL(5,2) DEFAULT 10.00,
    affiliate_network VARCHAR(100), -- e.g., 'ShareASale', 'CJ', 'Impact'
    affiliate_id VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER REFERENCES brands(id),
    external_id VARCHAR(255), -- Brand's product ID
    name VARCHAR(500) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    image_url TEXT,
    product_url TEXT NOT NULL,
    category VARCHAR(100),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Affiliate Links
CREATE TABLE affiliate_links (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    brand_id INTEGER REFERENCES brands(id),
    original_url TEXT NOT NULL,
    short_code VARCHAR(20) UNIQUE NOT NULL,
    tracked_url TEXT NOT NULL, -- URL with UTM parameters
    click_count INTEGER DEFAULT 0,
    conversion_count INTEGER DEFAULT 0,
    revenue_generated DECIMAL(12,2) DEFAULT 0.00,
    commission_earned DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_clicked_at TIMESTAMP
);

-- Click Tracking
CREATE TABLE clicks (
    id SERIAL PRIMARY KEY,
    affiliate_link_id INTEGER REFERENCES affiliate_links(id),
    user_id INTEGER, -- Optional: if you have user tracking
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(255),
    utm_content VARCHAR(255),
    country VARCHAR(2),
    device_type VARCHAR(20), -- mobile, desktop, tablet
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversions
CREATE TABLE conversions (
    id SERIAL PRIMARY KEY,
    affiliate_link_id INTEGER REFERENCES affiliate_links(id),
    click_id INTEGER REFERENCES clicks(id),
    order_id VARCHAR(255), -- External order ID from brand
    order_value DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(5,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, paid, cancelled
    converted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP,
    paid_at TIMESTAMP
);

-- Shopping Cart (for multi-item purchases)
CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER, -- Optional
    status VARCHAR(20) DEFAULT 'active', -- active, abandoned, completed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    affiliate_link_id INTEGER REFERENCES affiliate_links(id),
    quantity INTEGER DEFAULT 1,
    price DECIMAL(10,2),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Webhook Events (for tracking conversion callbacks)
CREATE TABLE webhook_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL, -- click, conversion, refund
    source VARCHAR(100), -- affiliate network or brand name
    payload JSONB NOT NULL,
    processed BOOLEAN DEFAULT false,
    error_message TEXT,
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP
);

-- Analytics Aggregations (for performance)
CREATE TABLE daily_stats (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    brand_id INTEGER REFERENCES brands(id),
    total_clicks INTEGER DEFAULT 0,
    total_conversions INTEGER DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    total_commission DECIMAL(12,2) DEFAULT 0.00,
    conversion_rate DECIMAL(5,2) DEFAULT 0.00,
    average_order_value DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, brand_id)
);

-- Indexes for performance
CREATE INDEX idx_clicks_link_id ON clicks(affiliate_link_id);
CREATE INDEX idx_clicks_session ON clicks(session_id);
CREATE INDEX idx_clicks_date ON clicks(clicked_at);
CREATE INDEX idx_conversions_link_id ON conversions(affiliate_link_id);
CREATE INDEX idx_conversions_status ON conversions(status);
CREATE INDEX idx_conversions_date ON conversions(converted_at);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_affiliate_links_short_code ON affiliate_links(short_code);
CREATE INDEX idx_daily_stats_date ON daily_stats(date);
CREATE INDEX idx_webhook_events_processed ON webhook_events(processed);
