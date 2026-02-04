/**
 * Customer Database Operations
 * Simple PostgreSQL operations for customer management
 */

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Create new customer
 */
async function createCustomer({ email, name, stripeCustomerId, stripeSubscriptionId, tier, status }) {
  const query = `
    INSERT INTO customers (id, email, name, stripe_customer_id, stripe_subscription_id, tier, status)
    VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  
  const values = [email, name, stripeCustomerId, stripeSubscriptionId, tier, status];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

/**
 * Get customer by Stripe customer ID
 */
async function getCustomerByStripeId(stripeCustomerId) {
  const query = 'SELECT * FROM customers WHERE stripe_customer_id = $1';
  
  try {
    const result = await pool.query(query, [stripeCustomerId]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting customer:', error);
    throw error;
  }
}

/**
 * Update subscription
 */
async function updateSubscription(stripeCustomerId, updates) {
  const { tier, status, currentPeriodStart, currentPeriodEnd } = updates;
  
  const query = `
    UPDATE customers
    SET tier = COALESCE($1, tier),
        status = COALESCE($2, status),
        updated_at = NOW()
    WHERE stripe_customer_id = $3
    RETURNING *
  `;
  
  const values = [tier, status, stripeCustomerId];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

module.exports = {
  createCustomer,
  getCustomerByStripeId,
  updateSubscription,
};
