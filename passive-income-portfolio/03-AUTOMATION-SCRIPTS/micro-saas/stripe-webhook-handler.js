/**
 * Stripe Webhook Handler
 * Automatically handles subscription events
 * Deploy to Vercel/Netlify or run as Express server
 */

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createLicense, revokeLicense } = require('./license-validator');
const { sendWelcomeEmail, sendCancellationEmail } = require('../shared/email-automation');

const app = express();

// Stripe requires raw body for signature verification
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('Webhook handler failed');
  }
});

/**
 * Handle successful checkout
 */
async function handleCheckoutCompleted(session) {
  const customerEmail = session.customer_email;
  const subscriptionId = session.subscription;
  
  // Retrieve subscription to get plan details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const planType = subscription.items.data[0].price.recurring.interval; // 'month' or 'year'

  // Create license key
  const license = await createLicense(
    customerEmail,
    planType === 'year' ? 'yearly' : 'monthly',
    subscriptionId
  );

  // Send welcome email with license key
  await sendWelcomeEmail(customerEmail, license.api_key);

  // Notify admin (Discord webhook)
  await notifyRevenue('New subscription', customerEmail, planType, session.amount_total / 100);

  console.log(`✅ New subscription: ${customerEmail} - ${planType} plan`);
}

/**
 * Handle subscription creation (backup for checkout.completed)
 */
async function handleSubscriptionCreated(subscription) {
  console.log(`Subscription created: ${subscription.id}`);
}

/**
 * Handle subscription updates (plan changes, renewals)
 */
async function handleSubscriptionUpdated(subscription) {
  if (subscription.cancel_at_period_end) {
    console.log(`Subscription ${subscription.id} will cancel at period end`);
    // Optionally send cancellation feedback email
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription) {
  const customer = await stripe.customers.retrieve(subscription.customer);
  
  // Revoke license
  await revokeLicense(subscription.id);
  
  // Send cancellation email (optional feedback survey)
  await sendCancellationEmail(customer.email);

  console.log(`❌ Subscription cancelled: ${customer.email}`);
}

/**
 * Handle successful payment (renewals)
 */
async function handlePaymentSucceeded(invoice) {
  if (invoice.billing_reason === 'subscription_cycle') {
    const customer = await stripe.customers.retrieve(invoice.customer);
    console.log(`💰 Renewal payment: ${customer.email} - $${invoice.amount_paid / 100}`);
    
    // Extend license expiry
    // (Handled automatically if you check Stripe subscription status)
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice) {
  const customer = await stripe.customers.retrieve(invoice.customer);
  console.log(`⚠️ Payment failed: ${customer.email}`);
  
  // Send payment retry email (Stripe handles this automatically, but you can customize)
}

/**
 * Send revenue notification to Discord
 */
async function notifyRevenue(eventType, email, planType, amount) {
  if (!process.env.DISCORD_WEBHOOK_URL) return;

  const webhook = require('discord-webhook-node');
  const Hook = new webhook.Webhook(process.env.DISCORD_WEBHOOK_URL);

  Hook.send({
    username: 'Revenue Bot',
    embeds: [{
      title: `💰 ${eventType}`,
      fields: [
        { name: 'Email', value: email },
        { name: 'Plan', value: planType },
        { name: 'Amount', value: `$${amount}` },
      ],
      color: 0x00ff00,
      timestamp: new Date(),
    }],
  });
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Stripe webhook handler running on port ${PORT}`);
  console.log(`Webhook URL: http://your-domain.com/webhook`);
});

module.exports = app;
