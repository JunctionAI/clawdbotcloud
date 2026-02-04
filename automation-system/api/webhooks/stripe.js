/**
 * Stripe Webhook Handler
 * Listens for checkout.session.completed events and triggers agent provisioning
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { provisionAgent } = require('../../provision/orchestrator');
const { createCustomer, updateSubscription } = require('../../db/customers');

// Webhook endpoint secret for signature verification
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Main webhook handler
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 */
async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  
  let event;
  
  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
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
  
  // Return 200 to acknowledge receipt
  res.json({ received: true });
}

/**
 * Handle successful checkout - provision new agent
 */
async function handleCheckoutCompleted(session) {
  console.log('✅ Checkout completed:', session.id);
  
  const {
    customer: stripeCustomerId,
    subscription: stripeSubscriptionId,
    customer_email,
    metadata,
  } = session;
  
  const tier = metadata.tier; // 'starter', 'professional', or 'enterprise'
  
  try {
    // 1. Create customer record in database
    const customer = await createCustomer({
      email: customer_email,
      name: session.customer_details?.name || customer_email,
      stripeCustomerId,
      stripeSubscriptionId,
      tier,
      status: 'provisioning',
    });
    
    console.log('📝 Customer created:', customer.id);
    
    // 2. Trigger agent provisioning (async)
    const deployment = await provisionAgent({
      customerId: customer.id,
      tier,
      email: customer_email,
    });
    
    console.log('🚀 Provisioning started:', deployment.id);
    
    // 3. Send welcome email (will be sent by provisioning orchestrator when complete)
    
    return { success: true, customerId: customer.id, deploymentId: deployment.id };
    
  } catch (error) {
    console.error('❌ Error handling checkout:', error);
    
    // TODO: Send alert to support team
    // TODO: Retry provisioning or manual intervention
    
    throw error;
  }
}

/**
 * Handle subscription update (tier change)
 */
async function handleSubscriptionUpdated(subscription) {
  console.log('🔄 Subscription updated:', subscription.id);
  
  const { customer: stripeCustomerId, items } = subscription;
  
  // Determine new tier from subscription items
  const newTier = detectTierFromSubscription(subscription);
  
  try {
    await updateSubscription(stripeCustomerId, {
      tier: newTier,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
    
    console.log('✅ Subscription updated to:', newTier);
    
    // TODO: Update agent configuration for new tier
    // - Enable/disable Mission Control
    // - Adjust Heartbeat schedule
    // - Update skills library
    
    return { success: true, tier: newTier };
    
  } catch (error) {
    console.error('❌ Error updating subscription:', error);
    throw error;
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription) {
  console.log('❌ Subscription cancelled:', subscription.id);
  
  const { customer: stripeCustomerId } = subscription;
  
  try {
    await updateSubscription(stripeCustomerId, {
      status: 'cancelled',
    });
    
    console.log('✅ Subscription marked as cancelled');
    
    // TODO: Suspend agent (don't delete immediately - grace period)
    // TODO: Send cancellation email with reactivation link
    // TODO: Schedule agent deletion after 30 days
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error handling cancellation:', error);
    throw error;
  }
}

/**
 * Handle payment failure
 */
async function handlePaymentFailed(invoice) {
  console.log('💳 Payment failed:', invoice.id);
  
  const { customer: stripeCustomerId, attempt_count } = invoice;
  
  // Stripe retries automatically, but we can send alerts
  if (attempt_count === 1) {
    // First failure - send friendly reminder
    console.log('📧 Sending payment reminder email...');
    // TODO: Send email via Resend
  } else if (attempt_count >= 3) {
    // Multiple failures - suspend agent
    console.log('⚠️ Suspending agent due to payment failure...');
    // TODO: Suspend agent
    // TODO: Send urgent email
  }
  
  return { success: true };
}

/**
 * Detect tier from Stripe subscription object
 */
function detectTierFromSubscription(subscription) {
  const priceId = subscription.items.data[0]?.price.id;
  
  // Map Stripe price IDs to tiers
  const tierMap = {
    [process.env.STRIPE_STARTER_PRICE_ID]: 'starter',
    [process.env.STRIPE_PRO_PRICE_ID]: 'professional',
    [process.env.STRIPE_ENTERPRISE_PRICE_ID]: 'enterprise',
  };
  
  return tierMap[priceId] || 'starter';
}

module.exports = {
  handleStripeWebhook,
};
