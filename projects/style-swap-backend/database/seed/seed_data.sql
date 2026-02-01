-- Style Swap Sample Seed Data
-- This provides example data for testing

-- ============================================================================
-- BRANDS
-- ============================================================================
INSERT INTO brands (name, slug, logo_url, description, website_url, partnership_status, partnership_tier, commission_rate, is_active)
VALUES 
    ('Nike', 'nike', 'https://example.com/logos/nike.png', 'Athletic footwear and apparel', 'https://www.nike.com', 'active', 'platinum', 8.00, true),
    ('Adidas', 'adidas', 'https://example.com/logos/adidas.png', 'Sports clothing and accessories', 'https://www.adidas.com', 'active', 'gold', 7.50, true),
    ('Zara', 'zara', 'https://example.com/logos/zara.png', 'Fast fashion retailer', 'https://www.zara.com', 'active', 'silver', 5.00, true),
    ('H&M', 'h-and-m', 'https://example.com/logos/hm.png', 'Affordable fashion', 'https://www.hm.com', 'pending', 'bronze', 4.00, true),
    ('Levi''s', 'levis', 'https://example.com/logos/levis.png', 'Denim and casual wear', 'https://www.levi.com', 'active', 'gold', 6.50, true),
    ('Uniqlo', 'uniqlo', 'https://example.com/logos/uniqlo.png', 'Japanese casual wear', 'https://www.uniqlo.com', 'active', 'silver', 5.50, true),
    ('Patagonia', 'patagonia', 'https://example.com/logos/patagonia.png', 'Outdoor clothing and gear', 'https://www.patagonia.com', 'active', 'gold', 7.00, true);

-- ============================================================================
-- CATEGORIES
-- ============================================================================

-- Top-level categories
INSERT INTO categories (name, slug, description, sort_order, is_active)
VALUES 
    ('Clothing', 'clothing', 'All clothing items', 1, true),
    ('Shoes', 'shoes', 'Footwear collection', 2, true),
    ('Accessories', 'accessories', 'Fashion accessories', 3, true),
    ('Activewear', 'activewear', 'Athletic and sportswear', 4, true);

-- Sub-categories for Clothing
INSERT INTO categories (name, slug, parent_id, description, sort_order, is_active)
SELECT 
    'Tops', 'tops', id, 'Shirts, blouses, t-shirts', 1, true
FROM categories WHERE slug = 'clothing'
UNION ALL
SELECT 
    'Bottoms', 'bottoms', id, 'Pants, jeans, skirts', 2, true
FROM categories WHERE slug = 'clothing'
UNION ALL
SELECT 
    'Dresses', 'dresses', id, 'Casual and formal dresses', 3, true
FROM categories WHERE slug = 'clothing'
UNION ALL
SELECT 
    'Outerwear', 'outerwear', id, 'Jackets, coats, blazers', 4, true
FROM categories WHERE slug = 'clothing';

-- Sub-categories for Shoes
INSERT INTO categories (name, slug, parent_id, description, sort_order, is_active)
SELECT 
    'Sneakers', 'sneakers', id, 'Athletic and casual sneakers', 1, true
FROM categories WHERE slug = 'shoes'
UNION ALL
SELECT 
    'Boots', 'boots', id, 'Ankle boots, knee-high boots', 2, true
FROM categories WHERE slug = 'shoes'
UNION ALL
SELECT 
    'Sandals', 'sandals', id, 'Summer sandals and slides', 3, true
FROM categories WHERE slug = 'shoes';

-- ============================================================================
-- TAGS
-- ============================================================================
INSERT INTO tags (name, slug)
VALUES 
    ('Trending', 'trending'),
    ('New Arrival', 'new-arrival'),
    ('Best Seller', 'best-seller'),
    ('Sustainable', 'sustainable'),
    ('Limited Edition', 'limited-edition'),
    ('Sale', 'sale'),
    ('Summer 2024', 'summer-2024'),
    ('Minimalist', 'minimalist'),
    ('Streetwear', 'streetwear'),
    ('Vintage', 'vintage');

-- ============================================================================
-- PRODUCTS
-- ============================================================================

-- Nike Products
INSERT INTO products (brand_id, name, slug, description, short_description, price, currency, color, gender, season, primary_image_url, stock_status, is_featured, is_active, published_at)
SELECT 
    b.id,
    'Air Max 270 React',
    'nike-air-max-270-react',
    'The Nike Air Max 270 React combines two of Nike''s most innovative technologies for maximum comfort and style.',
    'Innovative comfort meets street style',
    150.00,
    'USD',
    'Black/White',
    'unisex',
    'all-season',
    'https://example.com/products/nike-air-max-270.jpg',
    'in_stock',
    true,
    true,
    CURRENT_TIMESTAMP
FROM brands b WHERE b.slug = 'nike';

INSERT INTO products (brand_id, name, slug, description, short_description, price, sale_price, currency, color, gender, season, primary_image_url, stock_status, is_active, published_at)
SELECT 
    b.id,
    'Sportswear Tech Fleece Hoodie',
    'nike-tech-fleece-hoodie',
    'Premium fleece hoodie with modern design. Lightweight warmth for everyday wear.',
    'Premium fleece for everyday comfort',
    100.00,
    79.99,
    'USD',
    'Heather Grey',
    'mens',
    'fall',
    'https://example.com/products/nike-tech-fleece.jpg',
    'in_stock',
    true,
    true,
    CURRENT_TIMESTAMP
FROM brands b WHERE b.slug = 'nike';

-- Adidas Products
INSERT INTO products (brand_id, name, slug, description, short_description, price, currency, color, gender, season, primary_image_url, stock_status, is_featured, is_active, published_at)
SELECT 
    b.id,
    'Ultraboost 22',
    'adidas-ultraboost-22',
    'Energy-returning running shoes with Boost technology for ultimate comfort.',
    'Premium running performance',
    180.00,
    'USD',
    'Core Black',
    'unisex',
    'all-season',
    'https://example.com/products/adidas-ultraboost.jpg',
    'in_stock',
    true,
    true,
    CURRENT_TIMESTAMP
FROM brands b WHERE b.slug = 'adidas';

-- Levi's Products
INSERT INTO products (brand_id, name, slug, description, short_description, price, currency, color, size_range, gender, season, primary_image_url, stock_status, is_active, published_at)
SELECT 
    b.id,
    '501 Original Fit Jeans',
    'levis-501-original-fit',
    'The original jean. Iconic straight fit with button fly. A style that has stayed the same since 1873.',
    'The original jean since 1873',
    98.00,
    'USD',
    'Medium Stonewash',
    '28-40',
    'unisex',
    'all-season',
    'https://example.com/products/levis-501.jpg',
    'in_stock',
    true,
    true,
    CURRENT_TIMESTAMP
FROM brands b WHERE b.slug = 'levis';

-- Zara Products
INSERT INTO products (brand_id, name, slug, description, short_description, price, currency, color, gender, season, primary_image_url, stock_status, is_active, published_at)
SELECT 
    b.id,
    'Linen Blend Midi Dress',
    'zara-linen-midi-dress',
    'Flowing midi dress in linen blend. V-neckline and adjustable straps. Perfect for summer.',
    'Breezy summer midi dress',
    59.99,
    'USD',
    'Beige',
    'womens',
    'summer',
    'https://example.com/products/zara-linen-dress.jpg',
    'in_stock',
    false,
    true,
    CURRENT_TIMESTAMP
FROM brands b WHERE b.slug = 'zara';

-- Patagonia Products
INSERT INTO products (brand_id, name, slug, description, short_description, price, currency, color, gender, season, primary_image_url, stock_status, is_featured, is_active, published_at)
SELECT 
    b.id,
    'Better Sweater Fleece Jacket',
    'patagonia-better-sweater',
    'Made from 100% recycled polyester fleece. Warm, comfortable, and sustainable.',
    'Sustainable warmth for any adventure',
    139.00,
    'USD',
    'Navy Blue',
    'unisex',
    'fall',
    'https://example.com/products/patagonia-sweater.jpg',
    'in_stock',
    true,
    true,
    CURRENT_TIMESTAMP
FROM brands b WHERE b.slug = 'patagonia';

-- ============================================================================
-- PRODUCT CATEGORIES (Associate products with categories)
-- ============================================================================

-- Nike Air Max -> Sneakers
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'nike-air-max-270-react' AND c.slug = 'sneakers';

-- Nike Hoodie -> Tops, Activewear
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'nike-tech-fleece-hoodie' AND c.slug IN ('tops', 'activewear');

-- Adidas Ultraboost -> Sneakers, Activewear
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'adidas-ultraboost-22' AND c.slug IN ('sneakers', 'activewear');

-- Levi's 501 -> Bottoms
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'levis-501-original-fit' AND c.slug = 'bottoms';

-- Zara Dress -> Dresses
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'zara-linen-midi-dress' AND c.slug = 'dresses';

-- Patagonia Jacket -> Outerwear, Activewear
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p, categories c
WHERE p.slug = 'patagonia-better-sweater' AND c.slug IN ('outerwear', 'activewear');

-- ============================================================================
-- PRODUCT TAGS
-- ============================================================================

-- Nike Air Max -> Trending, Best Seller
INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id
FROM products p, tags t
WHERE p.slug = 'nike-air-max-270-react' AND t.slug IN ('trending', 'best-seller');

-- Nike Hoodie -> Sale
INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id
FROM products p, tags t
WHERE p.slug = 'nike-tech-fleece-hoodie' AND t.slug = 'sale';

-- Patagonia -> Sustainable
INSERT INTO product_tags (product_id, tag_id)
SELECT p.id, t.id
FROM products p, tags t
WHERE p.slug = 'patagonia-better-sweater' AND t.slug = 'sustainable';

-- ============================================================================
-- AFFILIATE LINKS
-- ============================================================================

-- Nike Air Max affiliate links
INSERT INTO affiliate_links (product_id, retailer_name, retailer_url, affiliate_url, affiliate_network, is_primary, is_active)
SELECT 
    p.id,
    'Nike.com',
    'https://www.nike.com/t/air-max-270-react',
    'https://www.nike.com/t/air-max-270-react?aff=12345',
    'CJ Affiliate',
    true,
    true
FROM products p WHERE p.slug = 'nike-air-max-270-react';

INSERT INTO affiliate_links (product_id, retailer_name, retailer_url, affiliate_url, affiliate_network, is_primary, is_active)
SELECT 
    p.id,
    'Foot Locker',
    'https://www.footlocker.com/product/nike-air-max-270',
    'https://www.footlocker.com/product/nike-air-max-270?aff=67890',
    'Rakuten',
    false,
    true
FROM products p WHERE p.slug = 'nike-air-max-270-react';

-- Levi's 501 affiliate links
INSERT INTO affiliate_links (product_id, retailer_name, retailer_url, affiliate_url, affiliate_network, is_primary, is_active)
SELECT 
    p.id,
    'Levi.com',
    'https://www.levi.com/US/en_US/clothing/men/jeans/501-original-fit-mens-jeans/p/005010000',
    'https://www.levi.com/US/en_US/clothing/men/jeans/501-original-fit-mens-jeans/p/005010000?aff=abc123',
    'Impact',
    true,
    true
FROM products p WHERE p.slug = 'levis-501-original-fit';

-- Add more affiliate links as needed...
