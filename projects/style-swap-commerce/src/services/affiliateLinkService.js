const pool = require('../../config/database');
const { buildTrackedUrl, generateShortCode } = require('../utils/urlBuilder');

class AffiliateLinkService {
  /**
   * Create or get affiliate link for a product
   */
  async createAffiliateLink(productId, brandId, originalUrl, utmParams = {}) {
    const client = await pool.connect();
    
    try {
      // Check if link already exists
      const existing = await client.query(
        'SELECT * FROM affiliate_links WHERE product_id = $1 AND brand_id = $2',
        [productId, brandId]
      );
      
      if (existing.rows.length > 0) {
        return existing.rows[0];
      }
      
      // Create new link
      const shortCode = generateShortCode();
      const trackedUrl = buildTrackedUrl(originalUrl, utmParams);
      
      const result = await client.query(
        `INSERT INTO affiliate_links 
         (product_id, brand_id, original_url, short_code, tracked_url)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [productId, brandId, originalUrl, shortCode, trackedUrl]
      );
      
      return result.rows[0];
    } finally {
      client.release();
    }
  }
  
  /**
   * Get affiliate link by short code
   */
  async getByShortCode(shortCode) {
    const result = await pool.query(
      `SELECT al.*, p.name as product_name, b.name as brand_name
       FROM affiliate_links al
       LEFT JOIN products p ON al.product_id = p.id
       LEFT JOIN brands b ON al.brand_id = b.id
       WHERE al.short_code = $1`,
      [shortCode]
    );
    
    return result.rows[0];
  }
  
  /**
   * Track click on affiliate link
   */
  async trackClick(linkId, clickData) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert click record
      const clickResult = await client.query(
        `INSERT INTO clicks 
         (affiliate_link_id, session_id, ip_address, user_agent, referrer, 
          utm_source, utm_medium, utm_campaign, utm_content, device_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [
          linkId,
          clickData.sessionId,
          clickData.ipAddress,
          clickData.userAgent,
          clickData.referrer,
          clickData.utmSource,
          clickData.utmMedium,
          clickData.utmCampaign,
          clickData.utmContent,
          clickData.deviceType
        ]
      );
      
      // Update click count and last clicked timestamp
      await client.query(
        `UPDATE affiliate_links 
         SET click_count = click_count + 1, last_clicked_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [linkId]
      );
      
      await client.query('COMMIT');
      
      return clickResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  /**
   * Get link analytics
   */
  async getAnalytics(linkId) {
    const result = await pool.query(
      `SELECT 
         al.*,
         COUNT(DISTINCT c.id) as total_clicks,
         COUNT(DISTINCT conv.id) as total_conversions,
         COALESCE(SUM(conv.order_value), 0) as total_revenue,
         COALESCE(SUM(conv.commission_amount), 0) as total_commission,
         CASE 
           WHEN COUNT(DISTINCT c.id) > 0 
           THEN (COUNT(DISTINCT conv.id)::FLOAT / COUNT(DISTINCT c.id) * 100)
           ELSE 0 
         END as conversion_rate
       FROM affiliate_links al
       LEFT JOIN clicks c ON al.id = c.affiliate_link_id
       LEFT JOIN conversions conv ON al.id = conv.affiliate_link_id
       WHERE al.id = $1
       GROUP BY al.id`,
      [linkId]
    );
    
    return result.rows[0];
  }
}

module.exports = new AffiliateLinkService();
