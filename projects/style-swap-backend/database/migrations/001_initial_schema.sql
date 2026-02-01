-- Style Swap Product Catalog Database Schema
-- Migration 001: Initial Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- BRANDS TABLE
-- ============================================================================
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logo_url TEXT,
    description TEXT,
    website_url TEXT,
    partnership_status VARCHAR(50) DEFAULT 'none' CHECK (partnership_status IN ('none', 'pending', 'active', 'inactive')),
    partnership_tier VARCHAR(50) CHECK (partnership_tier IN ('bronze', 'silver', 'gold', 'platinum')),
    commission_rate DECIMAL(5,2), -- e.g., 5.50 for 5.5%
    contact_email VARCHAR(255),
    contact_name VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_partnership_status ON brands(partnership_status);
CREATE INDEX idx_brands_is_active ON brands(is_active);

-- ============================================================================
-- CATEGORIES TABLE
-- ============================================================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    description TEXT,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_is_active ON categories(is_active);

-- ============================================================================
-- PRODUCTS TABLE
-- ============================================================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    name VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    sku VARCHAR(100),
    
    -- Pricing
    price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Product details
    color VARCHAR(100),
    size_range VARCHAR(100), -- e.g., "XS-XL", "6-12"
    material TEXT,
    care_instructions TEXT,
    
    -- Images
    primary_image_url TEXT NOT NULL,
    image_urls TEXT[], -- Array of additional image URLs
    
    -- Categories (many-to-many handled separately)
    
    -- Product attributes
    gender VARCHAR(50) CHECK (gender IN ('mens', 'womens', 'unisex', 'kids')),
    season VARCHAR(50) CHECK (season IN ('spring', 'summer', 'fall', 'winter', 'all-season')),
    
    -- Inventory & Status
    stock_status VARCHAR(50) DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'pre_order', 'discontinued')),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    
    -- Timestamps
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_gender ON products(gender);
CREATE INDEX idx_products_stock_status ON products(stock_status);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- ============================================================================
-- PRODUCT_CATEGORIES (Many-to-Many Junction Table)
-- ============================================================================
CREATE TABLE product_categories (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id, category_id)
);

CREATE INDEX idx_product_categories_product_id ON product_categories(product_id);
CREATE INDEX idx_product_categories_category_id ON product_categories(category_id);

-- ============================================================================
-- AFFILIATE_LINKS TABLE
-- ============================================================================
CREATE TABLE affiliate_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    retailer_name VARCHAR(255) NOT NULL,
    retailer_url TEXT NOT NULL,
    
    -- Affiliate tracking
    affiliate_url TEXT NOT NULL, -- The actual trackable URL
    affiliate_network VARCHAR(100), -- e.g., "ShareASale", "CJ", "Impact", "Rakuten"
    affiliate_id VARCHAR(255), -- Your affiliate ID for this retailer
    
    -- Performance
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0.00,
    commission_earned DECIMAL(10,2) DEFAULT 0.00,
    
    -- Availability
    is_primary BOOLEAN DEFAULT false, -- Primary buy button
    is_active BOOLEAN DEFAULT true,
    
    -- Timestamps
    last_clicked_at TIMESTAMP WITH TIME ZONE,
    last_conversion_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_affiliate_links_product_id ON affiliate_links(product_id);
CREATE INDEX idx_affiliate_links_is_primary ON affiliate_links(is_primary);
CREATE INDEX idx_affiliate_links_is_active ON affiliate_links(is_active);

-- ============================================================================
-- CLICK_TRACKING TABLE
-- ============================================================================
CREATE TABLE click_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    affiliate_link_id UUID NOT NULL REFERENCES affiliate_links(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    
    -- User tracking (anonymous)
    session_id VARCHAR(255),
    user_agent TEXT,
    ip_address INET,
    referrer_url TEXT,
    
    -- Location data (optional, from IP)
    country_code VARCHAR(2),
    region VARCHAR(100),
    city VARCHAR(100),
    
    -- Tracking
    click_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    converted BOOLEAN DEFAULT false,
    conversion_timestamp TIMESTAMP WITH TIME ZONE,
    conversion_value DECIMAL(10,2),
    commission_earned DECIMAL(10,2)
);

CREATE INDEX idx_click_tracking_affiliate_link_id ON click_tracking(affiliate_link_id);
CREATE INDEX idx_click_tracking_product_id ON click_tracking(product_id);
CREATE INDEX idx_click_tracking_session_id ON click_tracking(session_id);
CREATE INDEX idx_click_tracking_click_timestamp ON click_tracking(click_timestamp DESC);
CREATE INDEX idx_click_tracking_converted ON click_tracking(converted);

-- ============================================================================
-- CONVERSION_TRACKING TABLE
-- ============================================================================
CREATE TABLE conversion_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    click_id UUID REFERENCES click_tracking(id) ON DELETE SET NULL,
    affiliate_link_id UUID NOT NULL REFERENCES affiliate_links(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    
    -- Conversion details
    order_id VARCHAR(255), -- From affiliate network
    order_value DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(5,2),
    commission_earned DECIMAL(10,2) NOT NULL,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paid')),
    
    -- Timestamps
    conversion_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conversion_tracking_affiliate_link_id ON conversion_tracking(affiliate_link_id);
CREATE INDEX idx_conversion_tracking_product_id ON conversion_tracking(product_id);
CREATE INDEX idx_conversion_tracking_status ON conversion_tracking(status);
CREATE INDEX idx_conversion_tracking_conversion_timestamp ON conversion_tracking(conversion_timestamp DESC);

-- ============================================================================
-- PRODUCT_TAGS TABLE (Optional: for flexible tagging)
-- ============================================================================
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_tags (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id, tag_id)
);

CREATE INDEX idx_product_tags_product_id ON product_tags(product_id);
CREATE INDEX idx_product_tags_tag_id ON product_tags(tag_id);

-- ============================================================================
-- UPDATED_AT TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_links_updated_at BEFORE UPDATE ON affiliate_links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Optional but recommended
-- ============================================================================

-- Enable RLS on tables
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_tracking ENABLE ROW LEVEL SECURITY;

-- Public read access policies (adjust based on your needs)
CREATE POLICY "Public read access for active brands" ON brands
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for active categories" ON categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for active products" ON products
    FOR SELECT USING (is_active = true AND published_at IS NOT NULL);

CREATE POLICY "Public read access for active affiliate links" ON affiliate_links
    FOR SELECT USING (is_active = true);

-- Admin access policies (you'll need to create admin users/roles)
-- These are examples - adjust based on your auth setup
CREATE POLICY "Admin full access brands" ON brands
    FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Admin full access categories" ON categories
    FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Admin full access products" ON products
    FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Admin full access affiliate_links" ON affiliate_links
    FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Admin full access click_tracking" ON click_tracking
    FOR ALL USING (auth.role() = 'admin');

CREATE POLICY "Admin full access conversion_tracking" ON conversion_tracking
    FOR ALL USING (auth.role() = 'admin');
