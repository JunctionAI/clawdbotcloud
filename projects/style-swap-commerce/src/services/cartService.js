const pool = require('../../config/database');
const { v4: uuidv4 } = require('uuid');

class CartService {
  /**
   * Create or get cart for session
   */
  async getOrCreateCart(sessionId, userId = null) {
    const client = await pool.connect();
    
    try {
      // Try to get existing cart
      let result = await client.query(
        `SELECT * FROM carts 
         WHERE session_id = $1 AND status = 'active'
         AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)`,
        [sessionId]
      );
      
      if (result.rows.length > 0) {
        return result.rows[0];
      }
      
      // Create new cart (expires in 7 days)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      
      result = await client.query(
        `INSERT INTO carts (session_id, user_id, expires_at)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [sessionId, userId, expiresAt]
      );
      
      return result.rows[0];
    } finally {
      client.release();
    }
  }
  
  /**
   * Add item to cart
   */
  async addItem(sessionId, productId, affiliateLinkId, quantity = 1) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const cart = await this.getOrCreateCart(sessionId);
      
      // Get product price
      const product = await client.query(
        'SELECT price FROM products WHERE id = $1',
        [productId]
      );
      
      if (product.rows.length === 0) {
        throw new Error('Product not found');
      }
      
      // Check if item already in cart
      const existing = await client.query(
        'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
        [cart.id, productId]
      );
      
      let result;
      if (existing.rows.length > 0) {
        // Update quantity
        result = await client.query(
          `UPDATE cart_items 
           SET quantity = quantity + $1
           WHERE id = $2
           RETURNING *`,
          [quantity, existing.rows[0].id]
        );
      } else {
        // Add new item
        result = await client.query(
          `INSERT INTO cart_items 
           (cart_id, product_id, affiliate_link_id, quantity, price)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *`,
          [cart.id, productId, affiliateLinkId, quantity, product.rows[0].price]
        );
      }
      
      // Update cart timestamp
      await client.query(
        'UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [cart.id]
      );
      
      await client.query('COMMIT');
      
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  
  /**
   * Get cart with items
   */
  async getCart(sessionId) {
    const result = await pool.query(
      `SELECT 
         c.*,
         json_agg(
           json_build_object(
             'id', ci.id,
             'product_id', ci.product_id,
             'product_name', p.name,
             'brand_name', b.name,
             'quantity', ci.quantity,
             'price', ci.price,
             'image_url', p.image_url,
             'affiliate_link_id', ci.affiliate_link_id
           )
         ) FILTER (WHERE ci.id IS NOT NULL) as items
       FROM carts c
       LEFT JOIN cart_items ci ON c.id = ci.cart_id
       LEFT JOIN products p ON ci.product_id = p.id
       LEFT JOIN brands b ON p.brand_id = b.id
       WHERE c.session_id = $1 AND c.status = 'active'
       GROUP BY c.id`,
      [sessionId]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const cart = result.rows[0];
    
    // Calculate totals
    if (cart.items) {
      cart.total = cart.items.reduce((sum, item) => {
        return sum + (parseFloat(item.price) * item.quantity);
      }, 0);
      cart.item_count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    } else {
      cart.items = [];
      cart.total = 0;
      cart.item_count = 0;
    }
    
    return cart;
  }
  
  /**
   * Remove item from cart
   */
  async removeItem(cartItemId) {
    await pool.query('DELETE FROM cart_items WHERE id = $1', [cartItemId]);
  }
  
  /**
   * Update item quantity
   */
  async updateQuantity(cartItemId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(cartItemId);
    }
    
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, cartItemId]
    );
    
    return result.rows[0];
  }
  
  /**
   * Checkout - generate affiliate links for all items
   */
  async checkout(sessionId) {
    const cart = await this.getCart(sessionId);
    
    if (!cart || !cart.items || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }
    
    // Group items by brand for multi-redirect or generate individual links
    const checkoutLinks = cart.items.map(item => ({
      product_id: item.product_id,
      product_name: item.product_name,
      brand: item.brand_name,
      quantity: item.quantity,
      affiliate_link_id: item.affiliate_link_id
    }));
    
    // Mark cart as completed
    await pool.query(
      'UPDATE carts SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      ['completed', cart.id]
    );
    
    return {
      cart_id: cart.id,
      total: cart.total,
      items: checkoutLinks
    };
  }
}

module.exports = new CartService();
