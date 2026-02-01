-- Helper functions for the Style Swap database
-- These should be run in your Supabase SQL editor

-- Function to increment click count
CREATE OR REPLACE FUNCTION increment_clicks(link_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE affiliate_links
  SET clicks = clicks + 1,
      last_clicked_at = CURRENT_TIMESTAMP
  WHERE id = link_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment conversions
CREATE OR REPLACE FUNCTION increment_conversions(
  link_id UUID,
  revenue_amount DECIMAL,
  commission_amount DECIMAL
)
RETURNS void AS $$
BEGIN
  UPDATE affiliate_links
  SET conversions = conversions + 1,
      revenue = revenue + revenue_amount,
      commission_earned = commission_earned + commission_amount,
      last_conversion_at = CURRENT_TIMESTAMP
  WHERE id = link_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get product stats
CREATE OR REPLACE FUNCTION get_product_stats(product_uuid UUID)
RETURNS TABLE (
  total_clicks BIGINT,
  total_conversions BIGINT,
  total_revenue DECIMAL,
  total_commission DECIMAL,
  conversion_rate DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(al.clicks), 0) as total_clicks,
    COALESCE(SUM(al.conversions), 0) as total_conversions,
    COALESCE(SUM(al.revenue), 0) as total_revenue,
    COALESCE(SUM(al.commission_earned), 0) as total_commission,
    CASE 
      WHEN SUM(al.clicks) > 0 
      THEN (SUM(al.conversions)::DECIMAL / SUM(al.clicks)::DECIMAL * 100)
      ELSE 0 
    END as conversion_rate
  FROM affiliate_links al
  WHERE al.product_id = product_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to search products
CREATE OR REPLACE FUNCTION search_products(search_query TEXT, result_limit INT DEFAULT 20)
RETURNS TABLE (
  id UUID,
  name VARCHAR,
  slug VARCHAR,
  description TEXT,
  price DECIMAL,
  primary_image_url TEXT,
  brand_name VARCHAR,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.slug,
    p.description,
    p.price,
    p.primary_image_url,
    b.name as brand_name,
    ts_rank(
      to_tsvector('english', p.name || ' ' || COALESCE(p.description, '') || ' ' || b.name),
      plainto_tsquery('english', search_query)
    ) as relevance
  FROM products p
  JOIN brands b ON p.brand_id = b.id
  WHERE 
    p.is_active = true 
    AND p.published_at IS NOT NULL
    AND (
      to_tsvector('english', p.name || ' ' || COALESCE(p.description, '') || ' ' || b.name) @@ plainto_tsquery('english', search_query)
    )
  ORDER BY relevance DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
