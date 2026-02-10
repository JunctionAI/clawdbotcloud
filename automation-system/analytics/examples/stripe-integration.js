/**
 * Example: Integrating Analytics with Stripe Webhooks
 * 
 * This shows how to add analytics to the existing Stripe webhook handler
 * with minimal code changes.
 */

const { integrations, track } = require('../index');

// ============================================================
// OPTION 1: Use wrappers (recommended - minimal changes)
// ============================================================

// Original handler from automation-system/api/webhooks/stripe.js
const originalHandlers = require('../../api/webhooks/stripe');

// Wrap with analytics
const handleCheckoutCompleted = integrations.wrapCheckoutCompleted(
  originalHandlers.handleCheckoutCompleted
);

const handleSubscriptionUpdated = integrations.wrapSubscriptionUpdated(
  originalHandlers.handleSubscriptionUpdated
);

const handleSubscriptionDeleted = integrations.wrapSubscriptionDeleted(
  originalHandlers.handleSubscriptionDeleted
);

const handlePaymentFailed = integrations.wrapPaymentFailed(
  originalHandlers.handlePaymentFailed
);

// Export wrapped handlers
module.exports = {
  handleCheckoutCompleted,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handlePaymentFailed,
};


// ============================================================
// OPTION 2: Direct integration (if you prefer explicit tracking)
// ============================================================

/**
 * Example of explicit analytics tracking in webhook handler
 */
async function handleCheckoutCompletedWithExplicitTracking(session) {
  const {
    customer: stripeCustomerId,
    subscription: stripeSubscriptionId,
    customer_email,
    metadata,
  } = session;
  
  const tier = metadata.tier || 'starter';
  
  // Track signup FIRST (before any database operations)
  track('user_signup', {
    customerId: stripeCustomerId, // Will be auto-hashed
    tier,
    signup_source: metadata.utm_source || 'direct',
    trial: metadata.trial === 'true',
    referral_code: metadata.referral_code || null,
  });
  
  // Track the payment
  if (session.amount_total) {
    track('payment_succeeded', {
      customerId: stripeCustomerId,
      amount_cents: session.amount_total,
      currency: (session.currency || 'usd').toUpperCase(),
      payment_type: 'subscription',
      billing_period: metadata.billing_period || 'monthly',
    });
  }
  
  try {
    // Original business logic here...
    // const customer = await createCustomer({...});
    // const deployment = await provisionAgent({...});
    
    // Track successful provisioning
    track('provisioning_started', {
      customerId: stripeCustomerId,
      tier,
    });
    
    return { success: true };
    
  } catch (error) {
    // Track failure
    track('provisioning_failed', {
      customerId: stripeCustomerId,
      tier,
      error_category: categorizeError(error),
    });
    
    throw error;
  }
}

function categorizeError(error) {
  const msg = error.message?.toLowerCase() || '';
  if (msg.includes('timeout')) return 'timeout';
  if (msg.includes('database')) return 'database';
  if (msg.includes('docker')) return 'deployment';
  return 'unknown';
}


// ============================================================
// USAGE IN WEBHOOK ROUTER
// ============================================================

/**
 * Example webhook router setup
 */
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function createWebhookRouter() {
  const router = express.Router();
  
  // Raw body parser for Stripe signature verification
  router.post('/webhook', 
    express.raw({ type: 'application/json' }),
    async (req, res) => {
      const sig = req.headers['stripe-signature'];
      const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
      
      let event;
      
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
      
      // Route to analytics-wrapped handlers
      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutCompleted(event.data.object);
          break;
          
        case 'customer.subscription.updated':
          await handleSubscriptionUpdated(event.data.object);
          break;
          
        case 'customer.subscription.deleted':
          await handleSubscriptionDeleted(event.data.object);
          break;
          
        case 'invoice.payment_failed':
          await handlePaymentFailed(event.data.object);
          break;
          
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      
      res.json({ received: true });
    }
  );
  
  return router;
}

module.exports = {
  createWebhookRouter,
  // Individual handlers for testing
  handleCheckoutCompleted,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handlePaymentFailed,
};
