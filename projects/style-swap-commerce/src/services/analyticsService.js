const pool = require('../../config/database');

class AnalyticsService {
  /**
   * Get dashboard overview
   */
  async getDashboard(filters = {}) {
    const { startDate, endDate, brandId } = filters;
    
    let dateFilter = '';
    let params = [];
    let paramCount = 1;
    
    if (startDate) {
      dateFilter += ` AND c.clicked_at >= $${paramCount}`;
      params.push(startDate);
      paramCount++;
    }
    
    if (endDate) {
      dateFilter += ` AND c.clicked_at <= $${paramCount}`;
      params.push(endDate);
      paramCount++;
    }
    
    let brandFilter = '';
    if (brandId) {
      brandFilter = ` AND al.brand_id = $${paramCount}`;
      params.push(brandId);
      paramCount++;
    }
    
    // Get overview stats
    const overview = await pool.query(
      `SELECT 
         COUNT(DISTINCT c.id) as total_clicks,
         COUNT(DISTINCT conv.id) as total_conversions,
         COALESCE(SUM(conv.order_value), 0) as total_revenue,
         COALESCE(SUM(conv.commission_amount), 0) as total_commission,
         CASE 
           WHEN COUNT(DISTINCT c.id) > 0 
           THEN (COUNT(DISTINCT conv.id)::FLOAT / COUNT(DISTINCT c.id) * 100)
           ELSE 0 
         END as conversion_rate,
         CASE 
           WHEN COUNT(DISTINCT conv.id) > 0
           THEN COALESCE(SUM(conv.order_value), 0) / COUNT(DISTINCT conv.id)
           ELSE 0
         END as avg_order_value
       FROM clicks c
       LEFT JOIN affiliate_links al ON c.affiliate_link_id = al.id
       LEFT JOIN conversions conv ON al.id = conv.affiliate_link_id
       WHERE 1=1 ${dateFilter} ${brandFilter}`,
      params
    );
    
    return overview.rows[0];
  }
  
  /**
   * Get performance by brand
   */
  async getBrandPerformance(filters = {}) {
    const { startDate, endDate } = filters;
    
    let dateFilter = '';
    let params = [];
    let paramCount = 1;
    
    if (startDate) {
      dateFilter += ` AND c.clicked_at >= $${paramCount}`;
      params.push(startDate);
      paramCount++;
    }
    
    if (endDate) {
      dateFilter += ` AND c.clicked_at <= $${paramCount}`;
      params.push(endDate);
      paramCount++;
    }
    
    const result = await pool.query(
      `SELECT 
         b.id,
         b.name,
         b.commission_rate,
         COUNT(DISTINCT c.id) as clicks,
         COUNT(DISTINCT conv.id) as conversions,
         COALESCE(SUM(conv.order_value), 0) as revenue,
         COALESCE(SUM(conv.commission_amount), 0) as commission,
         CASE 
           WHEN COUNT(DISTINCT c.id) > 0 
           THEN (COUNT(DISTINCT conv.id)::FLOAT / COUNT(DISTINCT c.id) * 100)
           ELSE 0 
         END as conversion_rate,
         CASE 
           WHEN COUNT(DISTINCT conv.id) > 0
           THEN COALESCE(SUM(conv.order_value), 0) / COUNT(DISTINCT conv.id)
           ELSE 0
         END as avg_order_value
       FROM brands b
       LEFT JOIN affiliate_links al ON b.id = al.brand_id
       LEFT JOIN clicks c ON al.id = c.affiliate_link_id ${dateFilter}
       LEFT JOIN conversions conv ON al.id = conv.affiliate_link_id
       WHERE b.is_active = true
       GROUP BY b.id, b.name, b.commission_rate
       ORDER BY revenue DESC`,
      params
    );
    
    return result.rows;
  }
  
  /**
   * Get top products
   */
  async getTopProducts(limit = 10, filters = {}) {
    const { brandId, startDate, endDate } = filters;
    
    let whereClause = 'WHERE p.is_available = true';
    let params = [limit];
    let paramCount = 2;
    
    if (brandId) {
      whereClause += ` AND p.brand_id = $${paramCount}`;
      params.push(brandId);
      paramCount++;
    }
    
    let dateFilter = '';
    if (startDate) {
      dateFilter += ` AND c.clicked_at >= $${paramCount}`;
      params.push(startDate);
      paramCount++;
    }
    
    if (endDate) {
      dateFilter += ` AND c.clicked_at <= $${paramCount}`;
      params.push(endDate);
      paramCount++;
    }
    
    const result = await pool.query(
      `SELECT 
         p.id,
         p.name,
         p.price,
         b.name as brand_name,
         COUNT(DISTINCT c.id) as clicks,
         COUNT(DISTINCT conv.id) as conversions,
         COALESCE(SUM(conv.order_value), 0) as revenue,
         COALESCE(SUM(conv.commission_amount), 0) as commission
       FROM products p
       JOIN brands b ON p.brand_id = b.id
       LEFT JOIN affiliate_links al ON p.id = al.product_id
       LEFT JOIN clicks c ON al.id = c.affiliate_link_id ${dateFilter}
       LEFT JOIN conversions conv ON al.id = conv.affiliate_link_id
       ${whereClause}
       GROUP BY p.id, p.name, p.price, b.name
       ORDER BY revenue DESC
       LIMIT $1`,
      params
    );
    
    return result.rows;
  }
  
  /**
   * Get time series data for charts
   */
  async getTimeSeries(filters = {}) {
    const { startDate, endDate, brandId, granularity = 'day' } = filters;
    
    const dateFormat = granularity === 'hour' ? 'YYYY-MM-DD HH24:00' : 'YYYY-MM-DD';
    
    let params = [];
    let paramCount = 1;
    let brandFilter = '';
    
    if (brandId) {
      brandFilter = ` AND al.brand_id = $${paramCount}`;
      params.push(brandId);
      paramCount++;
    }
    
    let dateFilter = '';
    if (startDate) {
      dateFilter += ` AND c.clicked_at >= $${paramCount}`;
      params.push(startDate);
      paramCount++;
    }
    
    if (endDate) {
      dateFilter += ` AND c.clicked_at <= $${paramCount}`;
      params.push(endDate);
      paramCount++;
    }
    
    const result = await pool.query(
      `SELECT 
         TO_CHAR(c.clicked_at, '${dateFormat}') as date,
         COUNT(DISTINCT c.id) as clicks,
         COUNT(DISTINCT conv.id) as conversions,
         COALESCE(SUM(conv.order_value), 0) as revenue
       FROM clicks c
       LEFT JOIN affiliate_links al ON c.affiliate_link_id = al.id
       LEFT JOIN conversions conv ON al.id = conv.affiliate_link_id
       WHERE 1=1 ${dateFilter} ${brandFilter}
       GROUP BY TO_CHAR(c.clicked_at, '${dateFormat}')
       ORDER BY date`,
      params
    );
    
    return result.rows;
  }
  
  /**
   * Generate and cache daily stats (run as cron job)
   */
  async generateDailyStats(date) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      await client.query(
        `INSERT INTO daily_stats 
         (date, brand_id, total_clicks, total_conversions, total_revenue, 
          total_commission, conversion_rate, average_order_value)
         SELECT 
           $1::date as date,
           b.id as brand_id,
           COUNT(DISTINCT c.id) as total_clicks,
           COUNT(DISTINCT conv.id) as total_conversions,
           COALESCE(SUM(conv.order_value), 0) as total_revenue,
           COALESCE(SUM(conv.commission_amount), 0) as total_commission,
           CASE 
             WHEN COUNT(DISTINCT c.id) > 0 
             THEN (COUNT(DISTINCT conv.id)::FLOAT / COUNT(DISTINCT c.id) * 100)
             ELSE 0 
           END as conversion_rate,
           CASE 
             WHEN COUNT(DISTINCT conv.id) > 0
             THEN COALESCE(SUM(conv.order_value), 0) / COUNT(DISTINCT conv.id)
             ELSE 0
           END as average_order_value
         FROM brands b
         LEFT JOIN affiliate_links al ON b.id = al.brand_id
         LEFT JOIN clicks c ON al.id = c.affiliate_link_id 
           AND DATE(c.clicked_at) = $1::date
         LEFT JOIN conversions conv ON al.id = conv.affiliate_link_id
           AND DATE(conv.converted_at) = $1::date
         WHERE b.is_active = true
         GROUP BY b.id
         ON CONFLICT (date, brand_id) 
         DO UPDATE SET
           total_clicks = EXCLUDED.total_clicks,
           total_conversions = EXCLUDED.total_conversions,
           total_revenue = EXCLUDED.total_revenue,
           total_commission = EXCLUDED.total_commission,
           conversion_rate = EXCLUDED.conversion_rate,
           average_order_value = EXCLUDED.average_order_value`,
        [date]
      );
      
      await client.query('COMMIT');
      console.log(`Daily stats generated for ${date}`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new AnalyticsService();
