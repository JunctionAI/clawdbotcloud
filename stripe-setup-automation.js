#!/usr/bin/env node

/**
 * Stripe Product & Payment Link Automation
 * One-command setup for all products and payment links
 * 
 * Usage: node stripe-setup-automation.js
 */

const readline = require('readline');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.blue}━━━ ${msg} ━━━${colors.reset}\n`)
};

async function promptForKey() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Enter your Stripe Secret Key (sk_test_... or sk_live_...): ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  log.header('Stripe Product & Payment Link Setup');
  
  // Get API key
  let apiKey = process.env.STRIPE_SECRET_KEY;
  
  if (!apiKey) {
    log.warn('STRIPE_SECRET_KEY not found in environment');
    apiKey = await promptForKey();
  }
  
  if (!apiKey || !apiKey.startsWith('sk_')) {
    log.error('Invalid Stripe secret key. Must start with sk_test_ or sk_live_');
    process.exit(1);
  }

  // Initialize Stripe
  let stripe;
  try {
    stripe = require('stripe')(apiKey);
    log.success('Stripe API initialized');
  } catch (error) {
    log.error('Failed to load Stripe SDK. Run: npm install stripe');
    process.exit(1);
  }

  // Product configurations
  const setupFees = [
    { name: 'Starter Setup Fee', amount: 29900, description: 'One-time setup fee for Starter plan' },
    { name: 'Professional Setup Fee', amount: 59900, description: 'One-time setup fee for Professional plan' },
    { name: 'Enterprise Setup Fee', amount: 99900, description: 'One-time setup fee for Enterprise plan' }
  ];

  const subscriptions = [
    { name: 'Starter Subscription', amount: 19900, description: 'Monthly subscription for Starter plan' },
    { name: 'Professional Subscription', amount: 49900, description: 'Monthly subscription for Professional plan' },
    { name: 'Enterprise Subscription', amount: 99900, description: 'Monthly subscription for Enterprise plan' }
  ];

  const results = {
    products: [],
    prices: [],
    paymentLinks: []
  };

  // Create one-time setup fee products
  log.header('Creating Setup Fee Products');
  
  for (const fee of setupFees) {
    try {
      // Create product
      const product = await stripe.products.create({
        name: fee.name,
        description: fee.description,
        type: 'service'
      });
      log.success(`Created product: ${product.name}`);

      // Create one-time price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: fee.amount,
        currency: 'usd',
        nickname: `${fee.name} - $${fee.amount / 100}`
      });
      log.success(`Created price: $${fee.amount / 100}`);

      // Create payment link
      const paymentLink = await stripe.paymentLinks.create({
        line_items: [{ price: price.id, quantity: 1 }]
      });
      log.success(`Created payment link: ${paymentLink.url}`);

      results.products.push(product);
      results.prices.push(price);
      results.paymentLinks.push({ type: 'setup', name: fee.name, url: paymentLink.url });
    } catch (error) {
      log.error(`Failed to create ${fee.name}: ${error.message}`);
    }
  }

  // Create subscription products
  log.header('Creating Subscription Products');
  
  for (const sub of subscriptions) {
    try {
      // Create product
      const product = await stripe.products.create({
        name: sub.name,
        description: sub.description,
        type: 'service'
      });
      log.success(`Created product: ${product.name}`);

      // Create recurring price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: sub.amount,
        currency: 'usd',
        recurring: { interval: 'month' },
        nickname: `${sub.name} - $${sub.amount / 100}/mo`
      });
      log.success(`Created price: $${sub.amount / 100}/month`);

      // Create payment link
      const paymentLink = await stripe.paymentLinks.create({
        line_items: [{ price: price.id, quantity: 1 }]
      });
      log.success(`Created payment link: ${paymentLink.url}`);

      results.products.push(product);
      results.prices.push(price);
      results.paymentLinks.push({ type: 'subscription', name: sub.name, url: paymentLink.url });
    } catch (error) {
      log.error(`Failed to create ${sub.name}: ${error.message}`);
    }
  }

  // Summary
  log.header('Setup Complete! 🎉');
  
  console.log('\n📋 PAYMENT LINKS:\n');
  
  console.log('Setup Fees (One-time):');
  results.paymentLinks.filter(l => l.type === 'setup').forEach(link => {
    console.log(`  • ${link.name}`);
    console.log(`    ${link.url}\n`);
  });

  console.log('Subscriptions (Monthly):');
  results.paymentLinks.filter(l => l.type === 'subscription').forEach(link => {
    console.log(`  • ${link.name}`);
    console.log(`    ${link.url}\n`);
  });

  log.info(`Total products created: ${results.products.length}`);
  log.info(`Total payment links created: ${results.paymentLinks.length}`);
  
  console.log('\n💡 Next steps:');
  console.log('   1. Save these payment links');
  console.log('   2. View all products: https://dashboard.stripe.com/products');
  console.log('   3. View payment links: https://dashboard.stripe.com/payment-links');
}

main().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  process.exit(1);
});
