const pool = require('../config/database');
const commissionService = require('../src/services/commissionService');

class WebhookHandler {
  /**
   * Process incoming webhook
   */
  async processWebhook(source, eventType, payload) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Store webhook event
      const eventResult = await client.query(
        `INSERT INTO webhook_events (event_type, source, payload)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [eventType, source, JSON.stringify(payload)]
      );
      
      const eventId = eventResult.rows[0].id;
      
      try {
        // Process based on event type
        switch (eventType) {
          case 'conversion':
            await this.handleConversion(payload);
            break;
          case 'refund':
            await this.handleRefund(payload);
            break;
          case 'commission_update':
            await this.handleCommissionUpdate(payload);
            break;
          default:
            console.log(`Unknown event type: ${eventType}`);
        }
        
        // Mark as processed
        await client.query(
          'UPDATE webhook_events SET processed = true, processed_at = CURRENT_TIMESTAMP WHERE id = $1',
          [eventId]
        );
        
        await client.query('COMMIT');
        
        return { success: true, eventId };
      } catch (error) {
        // Store error but commit the webhook record
        await client.query(
          'UPDATE webhook_events SET processed = false, error_message = $1 WHERE id = $2',
          [error.message, eventId]
        );
        
        await client.query('COMMIT');
        throw error;
      }
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  /**
   * Handle conversion webhook
   */
  async handleConversion(payload) {
    // Expected payload structure (adjust based on affiliate network):
    // {
    //   order_id: 'ABC123',
    //   affiliate_link_code: 'abc12345',
    //   order_value: 99.99,
    //   currency: 'USD',
    //   customer_id: '...'
    // }
    
    const { order_id, affiliate_link_code, order_value, currency } = payload;
    
    // Find affiliate link
    const linkResult = await pool.query(
      'SELECT id, brand_id FROM affiliate_links WHERE short_code = $1',
      [affiliate_link_code]
    );
    
    if (linkResult.rows.length === 0) {
      throw new Error(`Affiliate link not found: ${affiliate_link_code}`);
    }
    
    const link = linkResult.rows[0];
    
    // Find most recent click for this link (within last 30 days)
    const clickResult = await pool.query(
      `SELECT id FROM clicks 
       WHERE affiliate_link_id = $1 
       AND clicked_at > CURRENT_TIMESTAMP - INTERVAL '30 days'
       ORDER BY clicked_at DESC 
       LIMIT 1`,
      [link.id]
    );
    
    const clickId = clickResult.rows.length > 0 ? clickResult.rows[0].id : null;
    
    // Record conversion
    await commissionService.recordConversion({
      affiliateLinkId: link.id,
      brandId: link.brand_id,
      clickId,
      orderId: order_id,
      orderValue: order_value,
      currency: currency || 'USD'
    });
    
    console.log(`Conversion recorded: ${order_id} - $${order_value}`);
  }
  
  /**
   * Handle refund webhook
   */
  async handleRefund(payload) {
    const { order_id } = payload;
    
    // Find and cancel conversion
    const result = await pool.query(
      `UPDATE conversions 
       SET status = 'cancelled'
       WHERE order_id = $1
       RETURNING *`,
      [order_id]
    );
    
    if (result.rows.length > 0) {
      const conversion = result.rows[0];
      
      // Reverse the affiliate link stats
      await pool.query(
        `UPDATE affiliate_links 
         SET conversion_count = GREATEST(0, conversion_count - 1),
             revenue_generated = GREATEST(0, revenue_generated - $1),
             commission_earned = GREATEST(0, commission_earned - $2)
         WHERE id = $3`,
        [conversion.order_value, conversion.commission_amount, conversion.affiliate_link_id]
      );
      
      console.log(`Refund processed: ${order_id}`);
    }
  }
  
  /**
   * Handle commission update (e.g., from confirmed to paid)
   */
  async handleCommissionUpdate(payload) {
    const { order_id, new_status } = payload;
    
    await commissionService.updateConversionStatus(order_id, new_status);
    console.log(`Commission status updated: ${order_id} -> ${new_status}`);
  }
  
  /**
   * Verify webhook signature (implement based on affiliate network)
   */
  verifySignature(payload, signature, secret) {
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');
    
    return signature === expectedSignature;
  }
}

module.exports = new WebhookHandler();
