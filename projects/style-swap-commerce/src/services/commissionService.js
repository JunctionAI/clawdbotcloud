const pool = require('../../config/database');

class CommissionService {
  /**
   * Calculate commission for an order
   */
  async calculateCommission(brandId, orderValue) {
    const brand = await pool.query(
      'SELECT commission_rate FROM brands WHERE id = $1',
      [brandId]
    );
    
    if (brand.rows.length === 0) {
      throw new Error(`Brand not found: ${brandId}`);
    }
    
    const commissionRate = brand.rows[0].commission_rate;
    const commissionAmount = (orderValue * commissionRate) / 100;
    
    return {
      rate: commissionRate,
      amount: commissionAmount
    };
  }
  
  /**
   * Record a conversion
   */
  async recordConversion(data) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const commission = await this.calculateCommission(
        data.brandId, 
        data.orderValue
      );
      
      // Insert conversion
      const conversionResult = await client.query(
        `INSERT INTO conversions 
         (affiliate_link_id, click_id, order_id, order_value, 
          commission_rate, commission_amount, currency, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [
          data.affiliateLinkId,
          data.clickId,
          data.orderId,
          data.orderValue,
          commission.rate,
          commission.amount,
          data.currency || 'USD',
          'pending'
        ]
      );
      
      // Update affiliate link stats
      await client.query(
        `UPDATE affiliate_links 
         SET conversion_count = conversion_count + 1,
             revenue_generated = revenue_generated + $1,
             commission_earned = commission_earned + $2
         WHERE id = $3`,
        [data.orderValue, commission.amount, data.affiliateLinkId]
      );
      
      await client.query('COMMIT');
      
      return conversionResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  /**
   * Update conversion status
   */
  async updateConversionStatus(conversionId, status) {
    const validStatuses = ['pending', 'confirmed', 'paid', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }
    
    const timestampField = status === 'confirmed' ? 'confirmed_at' : 
                          status === 'paid' ? 'paid_at' : null;
    
    let query = 'UPDATE conversions SET status = $1';
    const params = [status, conversionId];
    
    if (timestampField) {
      query += `, ${timestampField} = CURRENT_TIMESTAMP`;
    }
    
    query += ' WHERE id = $2 RETURNING *';
    
    const result = await pool.query(query, params);
    return result.rows[0];
  }
  
  /**
   * Get commission report
   */
  async getCommissionReport(filters = {}) {
    const { brandId, startDate, endDate, status } = filters;
    
    let query = `
      SELECT 
        b.name as brand_name,
        COUNT(c.id) as total_conversions,
        SUM(c.order_value) as total_revenue,
        SUM(c.commission_amount) as total_commission,
        AVG(c.commission_rate) as avg_commission_rate,
        c.status
      FROM conversions c
      JOIN affiliate_links al ON c.affiliate_link_id = al.id
      JOIN brands b ON al.brand_id = b.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 1;
    
    if (brandId) {
      query += ` AND al.brand_id = $${paramCount}`;
      params.push(brandId);
      paramCount++;
    }
    
    if (startDate) {
      query += ` AND c.converted_at >= $${paramCount}`;
      params.push(startDate);
      paramCount++;
    }
    
    if (endDate) {
      query += ` AND c.converted_at <= $${paramCount}`;
      params.push(endDate);
      paramCount++;
    }
    
    if (status) {
      query += ` AND c.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }
    
    query += ' GROUP BY b.name, c.status ORDER BY total_commission DESC';
    
    const result = await pool.query(query, params);
    return result.rows;
  }
}

module.exports = new CommissionService();
