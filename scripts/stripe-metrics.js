#!/usr/bin/env node
/**
 * Stripe Revenue Metrics API
 * 
 * Fetches real-time metrics from Stripe:
 * - MRR (Monthly Recurring Revenue)
 * - Active subscriptions by plan
 * - Today's/weekly/monthly revenue
 * - Churn rate
 * - New vs returning customers
 * 
 * Exposes REST API for dashboard consumption.
 * Caches results with 60s refresh.
 * 
 * Usage:
 *   node stripe-metrics.js [--port 3456]
 * 
 * Environment:
 *   STRIPE_SECRET_KEY - Stripe API secret key (required)
 *   STRIPE_WEBHOOK_SECRET - Webhook signing secret (optional)
 *   PORT - Server port (default: 3456)
 */

const http = require('http');
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  port: parseInt(process.env.PORT || '3456'),
  stripeKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  cacheRefreshMs: 60 * 1000, // 60 seconds
  logDir: path.join(__dirname, '..', 'logs'),
  eventLogFile: 'stripe-events.jsonl',
};

// Ensure log directory exists
if (!fs.existsSync(CONFIG.logDir)) {
  fs.mkdirSync(CONFIG.logDir, { recursive: true });
}

// Cache for metrics
const cache = {
  metrics: null,
  lastRefresh: 0,
  refreshing: false,
};

// ============================================================================
// Stripe API Helpers
// ============================================================================

/**
 * Make authenticated request to Stripe API
 */
async function stripeRequest(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const queryString = new URLSearchParams(params).toString();
    const fullPath = `/v1/${endpoint}${queryString ? '?' + queryString : ''}`;
    
    const options = {
      hostname: 'api.stripe.com',
      port: 443,
      path: fullPath,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CONFIG.stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(parsed.error.message));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data.slice(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Paginate through all results from a Stripe list endpoint
 */
async function stripeListAll(endpoint, params = {}, maxPages = 10) {
  const allData = [];
  let hasMore = true;
  let startingAfter = null;
  let pages = 0;

  while (hasMore && pages < maxPages) {
    const queryParams = { ...params, limit: 100 };
    if (startingAfter) queryParams.starting_after = startingAfter;
    
    const response = await stripeRequest(endpoint, queryParams);
    allData.push(...response.data);
    
    hasMore = response.has_more;
    if (response.data.length > 0) {
      startingAfter = response.data[response.data.length - 1].id;
    }
    pages++;
  }

  return allData;
}

// ============================================================================
// Metrics Calculation
// ============================================================================

/**
 * Get timestamp boundaries for time periods
 */
function getTimeBoundaries() {
  const now = new Date();
  
  // Start of today (midnight local time)
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Start of this week (Sunday)
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  
  // Start of this month
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  // 30 days ago for churn calculation
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  return {
    now: Math.floor(now.getTime() / 1000),
    todayStart: Math.floor(todayStart.getTime() / 1000),
    weekStart: Math.floor(weekStart.getTime() / 1000),
    monthStart: Math.floor(monthStart.getTime() / 1000),
    thirtyDaysAgo: Math.floor(thirtyDaysAgo.getTime() / 1000),
  };
}

/**
 * Calculate MRR from active subscriptions
 */
function calculateMRR(subscriptions) {
  let mrr = 0;
  
  for (const sub of subscriptions) {
    if (sub.status !== 'active' && sub.status !== 'trialing') continue;
    
    for (const item of sub.items.data) {
      const price = item.price;
      let amount = price.unit_amount || 0;
      
      // Normalize to monthly
      switch (price.recurring?.interval) {
        case 'day':
          amount = amount * 30;
          break;
        case 'week':
          amount = amount * 4;
          break;
        case 'month':
          // Already monthly
          break;
        case 'year':
          amount = amount / 12;
          break;
      }
      
      // Multiply by quantity
      mrr += amount * (item.quantity || 1);
    }
  }
  
  return mrr / 100; // Convert cents to dollars
}

/**
 * Group subscriptions by plan/product
 */
function groupSubscriptionsByPlan(subscriptions) {
  const planCounts = {};
  
  for (const sub of subscriptions) {
    if (sub.status !== 'active' && sub.status !== 'trialing') continue;
    
    for (const item of sub.items.data) {
      const planName = item.price.nickname || item.price.product || item.price.id;
      const key = String(planName);
      
      if (!planCounts[key]) {
        planCounts[key] = {
          name: key,
          priceId: item.price.id,
          count: 0,
          trialing: 0,
          active: 0,
          revenue: 0,
        };
      }
      
      planCounts[key].count++;
      if (sub.status === 'trialing') {
        planCounts[key].trialing++;
      } else {
        planCounts[key].active++;
      }
      
      // Monthly revenue for this plan
      let amount = item.price.unit_amount || 0;
      switch (item.price.recurring?.interval) {
        case 'year': amount = amount / 12; break;
        case 'week': amount = amount * 4; break;
        case 'day': amount = amount * 30; break;
      }
      planCounts[key].revenue += (amount / 100) * (item.quantity || 1);
    }
  }
  
  return Object.values(planCounts).sort((a, b) => b.count - a.count);
}

/**
 * Calculate churn rate (cancellations in last 30 days / active subs at start)
 */
async function calculateChurnRate(times) {
  try {
    // Get canceled subscriptions in last 30 days
    const canceledSubs = await stripeListAll('subscriptions', {
      status: 'canceled',
      created: { gte: times.thirtyDaysAgo },
    });
    
    // Get all subscriptions (to estimate active base)
    const allSubs = await stripeListAll('subscriptions', {
      status: 'all',
    });
    
    const activeSubs = allSubs.filter(s => 
      s.status === 'active' || s.status === 'trialing'
    ).length;
    
    const canceledCount = canceledSubs.length;
    const baseCount = activeSubs + canceledCount; // Approximate starting base
    
    if (baseCount === 0) return 0;
    
    return (canceledCount / baseCount) * 100; // Return as percentage
  } catch (e) {
    console.error('Error calculating churn:', e.message);
    return null;
  }
}

/**
 * Analyze customer segments (new vs returning)
 */
async function analyzeCustomers(times) {
  try {
    // Get charges for this month
    const charges = await stripeListAll('charges', {
      created: { gte: times.monthStart },
    });
    
    const customerCharges = {};
    const newCustomers = new Set();
    const returningCustomers = new Set();
    
    for (const charge of charges) {
      if (!charge.customer || charge.status !== 'succeeded') continue;
      
      const custId = charge.customer;
      if (!customerCharges[custId]) {
        customerCharges[custId] = [];
      }
      customerCharges[custId].push(charge);
    }
    
    // Check if customers are new (created this month)
    for (const custId of Object.keys(customerCharges)) {
      try {
        const customer = await stripeRequest(`customers/${custId}`);
        if (customer.created >= times.monthStart) {
          newCustomers.add(custId);
        } else {
          returningCustomers.add(custId);
        }
      } catch (e) {
        // Customer might be deleted
        returningCustomers.add(custId);
      }
    }
    
    return {
      new: newCustomers.size,
      returning: returningCustomers.size,
      total: newCustomers.size + returningCustomers.size,
    };
  } catch (e) {
    console.error('Error analyzing customers:', e.message);
    return { new: 0, returning: 0, total: 0 };
  }
}

/**
 * Calculate revenue for time periods
 */
async function calculateRevenue(times) {
  try {
    // Get all successful charges for this month
    const charges = await stripeListAll('charges', {
      created: { gte: times.monthStart },
    });
    
    let todayRevenue = 0;
    let weekRevenue = 0;
    let monthRevenue = 0;
    
    for (const charge of charges) {
      if (charge.status !== 'succeeded') continue;
      if (charge.refunded) continue;
      
      const amount = (charge.amount - (charge.amount_refunded || 0)) / 100;
      
      if (charge.created >= times.todayStart) {
        todayRevenue += amount;
      }
      if (charge.created >= times.weekStart) {
        weekRevenue += amount;
      }
      monthRevenue += amount;
    }
    
    return {
      today: Math.round(todayRevenue * 100) / 100,
      week: Math.round(weekRevenue * 100) / 100,
      month: Math.round(monthRevenue * 100) / 100,
    };
  } catch (e) {
    console.error('Error calculating revenue:', e.message);
    return { today: 0, week: 0, month: 0 };
  }
}

/**
 * Fetch all metrics from Stripe
 */
async function fetchAllMetrics() {
  if (!CONFIG.stripeKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable not set');
  }

  const times = getTimeBoundaries();
  
  console.log('[Stripe] Fetching metrics...');
  const startTime = Date.now();
  
  // Fetch active subscriptions
  const subscriptions = await stripeListAll('subscriptions', {
    status: 'active',
  });
  
  // Also fetch trialing subscriptions
  const trialingSubs = await stripeListAll('subscriptions', {
    status: 'trialing',
  });
  
  const allActiveSubs = [...subscriptions, ...trialingSubs];
  
  // Calculate metrics in parallel where possible
  const [revenue, customers, churnRate] = await Promise.all([
    calculateRevenue(times),
    analyzeCustomers(times),
    calculateChurnRate(times),
  ]);
  
  const mrr = calculateMRR(allActiveSubs);
  const planBreakdown = groupSubscriptionsByPlan(allActiveSubs);
  
  const metrics = {
    timestamp: new Date().toISOString(),
    mrr: {
      value: Math.round(mrr * 100) / 100,
      currency: 'USD',
      formatted: `$${mrr.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    arr: {
      value: Math.round(mrr * 12 * 100) / 100,
      formatted: `$${(mrr * 12).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    },
    subscriptions: {
      total: allActiveSubs.length,
      active: subscriptions.length,
      trialing: trialingSubs.length,
      byPlan: planBreakdown,
    },
    revenue: {
      today: revenue.today,
      thisWeek: revenue.week,
      thisMonth: revenue.month,
    },
    churn: {
      rate: churnRate !== null ? Math.round(churnRate * 100) / 100 : null,
      formatted: churnRate !== null ? `${churnRate.toFixed(2)}%` : 'N/A',
      period: '30 days',
    },
    customers: {
      newThisMonth: customers.new,
      returningThisMonth: customers.returning,
      totalActiveThisMonth: customers.total,
    },
  };
  
  const elapsed = Date.now() - startTime;
  console.log(`[Stripe] Metrics fetched in ${elapsed}ms`);
  
  return metrics;
}

/**
 * Get cached metrics or refresh if stale
 */
async function getMetrics() {
  const now = Date.now();
  
  // Return cached if fresh
  if (cache.metrics && (now - cache.lastRefresh) < CONFIG.cacheRefreshMs) {
    return { ...cache.metrics, cached: true };
  }
  
  // Prevent concurrent refreshes
  if (cache.refreshing) {
    // Wait for ongoing refresh
    while (cache.refreshing) {
      await new Promise(r => setTimeout(r, 100));
    }
    return { ...cache.metrics, cached: true };
  }
  
  cache.refreshing = true;
  try {
    cache.metrics = await fetchAllMetrics();
    cache.lastRefresh = now;
    return { ...cache.metrics, cached: false };
  } finally {
    cache.refreshing = false;
  }
}

// ============================================================================
// Webhook Handler
// ============================================================================

/**
 * Log subscription event to file
 */
function logEvent(eventType, data) {
  const logPath = path.join(CONFIG.logDir, CONFIG.eventLogFile);
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    type: eventType,
    data: data,
  };
  
  const line = JSON.stringify(logEntry) + '\n';
  
  try {
    fs.appendFileSync(logPath, line);
    console.log(`[Webhook] Logged: ${eventType}`);
  } catch (e) {
    console.error(`[Webhook] Failed to log event: ${e.message}`);
  }
}

/**
 * Verify Stripe webhook signature
 */
function verifyWebhookSignature(payload, signature) {
  if (!CONFIG.webhookSecret) {
    console.warn('[Webhook] No STRIPE_WEBHOOK_SECRET set, skipping verification');
    return true;
  }
  
  const elements = signature.split(',');
  let timestamp = null;
  let v1Signature = null;
  
  for (const element of elements) {
    const [key, value] = element.split('=');
    if (key === 't') timestamp = value;
    if (key === 'v1') v1Signature = value;
  }
  
  if (!timestamp || !v1Signature) {
    return false;
  }
  
  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = crypto
    .createHmac('sha256', CONFIG.webhookSecret)
    .update(signedPayload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(v1Signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Handle incoming webhook events
 */
function handleWebhook(event) {
  const { type, data } = event;
  const object = data.object;
  
  switch (type) {
    case 'customer.subscription.created':
      logEvent('new_subscription', {
        subscriptionId: object.id,
        customerId: object.customer,
        status: object.status,
        items: object.items?.data?.map(i => ({
          priceId: i.price.id,
          nickname: i.price.nickname,
          amount: i.price.unit_amount,
          interval: i.price.recurring?.interval,
        })),
        trialEnd: object.trial_end,
      });
      break;
      
    case 'customer.subscription.updated':
      // Check for upgrade/downgrade
      const previous = event.data.previous_attributes;
      if (previous?.items) {
        logEvent('subscription_change', {
          subscriptionId: object.id,
          customerId: object.customer,
          changeType: 'plan_change',
          oldItems: previous.items?.data?.map(i => ({
            priceId: i.price?.id,
            nickname: i.price?.nickname,
          })),
          newItems: object.items?.data?.map(i => ({
            priceId: i.price.id,
            nickname: i.price.nickname,
            amount: i.price.unit_amount,
          })),
        });
      }
      break;
      
    case 'customer.subscription.deleted':
      logEvent('cancellation', {
        subscriptionId: object.id,
        customerId: object.customer,
        canceledAt: object.canceled_at,
        endedAt: object.ended_at,
        cancellationReason: object.cancellation_details?.reason,
        feedback: object.cancellation_details?.feedback,
      });
      break;
      
    case 'invoice.payment_failed':
      logEvent('payment_failed', {
        invoiceId: object.id,
        subscriptionId: object.subscription,
        customerId: object.customer,
        amountDue: object.amount_due,
        attemptCount: object.attempt_count,
        nextPaymentAttempt: object.next_payment_attempt,
      });
      break;
      
    case 'invoice.payment_succeeded':
      logEvent('payment_succeeded', {
        invoiceId: object.id,
        subscriptionId: object.subscription,
        customerId: object.customer,
        amountPaid: object.amount_paid,
        currency: object.currency,
      });
      break;
      
    default:
      // Log other subscription-related events
      if (type.startsWith('customer.subscription.')) {
        logEvent(type, {
          subscriptionId: object.id,
          customerId: object.customer,
          status: object.status,
        });
      }
  }
  
  // Invalidate cache on subscription changes
  if (type.startsWith('customer.subscription.') || type.startsWith('invoice.')) {
    cache.lastRefresh = 0;
  }
}

/**
 * Read recent events from log
 */
function getRecentEvents(limit = 50) {
  const logPath = path.join(CONFIG.logDir, CONFIG.eventLogFile);
  
  if (!fs.existsSync(logPath)) {
    return [];
  }
  
  try {
    const content = fs.readFileSync(logPath, 'utf-8');
    const lines = content.trim().split('\n').filter(Boolean);
    const events = lines.map(line => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    }).filter(Boolean);
    
    return events.slice(-limit).reverse();
  } catch (e) {
    console.error(`[Events] Failed to read log: ${e.message}`);
    return [];
  }
}

// ============================================================================
// HTTP Server
// ============================================================================

/**
 * Parse JSON body from request
 */
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

/**
 * Send JSON response
 */
function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
  });
  res.end(JSON.stringify(data, null, 2));
}

/**
 * Handle HTTP requests
 */
async function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
    });
    res.end();
    return;
  }
  
  try {
    // Health check
    if (path === '/health' || path === '/') {
      sendJson(res, 200, {
        status: 'ok',
        service: 'stripe-metrics',
        uptime: process.uptime(),
        cacheAge: cache.lastRefresh ? Math.floor((Date.now() - cache.lastRefresh) / 1000) : null,
      });
      return;
    }
    
    // Get metrics
    if (path === '/metrics' && req.method === 'GET') {
      const forceRefresh = url.searchParams.get('refresh') === 'true';
      
      if (forceRefresh) {
        cache.lastRefresh = 0;
      }
      
      const metrics = await getMetrics();
      sendJson(res, 200, metrics);
      return;
    }
    
    // Get MRR only
    if (path === '/metrics/mrr' && req.method === 'GET') {
      const metrics = await getMetrics();
      sendJson(res, 200, {
        mrr: metrics.mrr,
        arr: metrics.arr,
        timestamp: metrics.timestamp,
      });
      return;
    }
    
    // Get subscriptions
    if (path === '/metrics/subscriptions' && req.method === 'GET') {
      const metrics = await getMetrics();
      sendJson(res, 200, {
        subscriptions: metrics.subscriptions,
        timestamp: metrics.timestamp,
      });
      return;
    }
    
    // Get revenue
    if (path === '/metrics/revenue' && req.method === 'GET') {
      const metrics = await getMetrics();
      sendJson(res, 200, {
        revenue: metrics.revenue,
        timestamp: metrics.timestamp,
      });
      return;
    }
    
    // Get recent events
    if (path === '/events' && req.method === 'GET') {
      const limit = parseInt(url.searchParams.get('limit') || '50');
      const events = getRecentEvents(limit);
      sendJson(res, 200, { events, count: events.length });
      return;
    }
    
    // Webhook endpoint
    if (path === '/webhook' && req.method === 'POST') {
      const body = await parseBody(req);
      const signature = req.headers['stripe-signature'];
      
      if (signature && !verifyWebhookSignature(body, signature)) {
        sendJson(res, 400, { error: 'Invalid signature' });
        return;
      }
      
      try {
        const event = JSON.parse(body);
        handleWebhook(event);
        sendJson(res, 200, { received: true });
      } catch (e) {
        sendJson(res, 400, { error: 'Invalid JSON' });
      }
      return;
    }
    
    // Not found
    sendJson(res, 404, { error: 'Not found' });
    
  } catch (e) {
    console.error(`[Server] Error handling ${path}:`, e);
    sendJson(res, 500, { error: e.message });
  }
}

// ============================================================================
// Main
// ============================================================================

function main() {
  // Parse CLI arguments
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' && args[i + 1]) {
      CONFIG.port = parseInt(args[i + 1]);
    }
  }
  
  if (!CONFIG.stripeKey) {
    console.error('Error: STRIPE_SECRET_KEY environment variable required');
    console.error('Set it with: export STRIPE_SECRET_KEY=sk_...');
    process.exit(1);
  }
  
  const server = http.createServer(handleRequest);
  
  server.listen(CONFIG.port, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                  Stripe Metrics Server                     ║
╠════════════════════════════════════════════════════════════╣
║  Port: ${CONFIG.port.toString().padEnd(50)}║
║  Cache: ${(CONFIG.cacheRefreshMs / 1000 + 's refresh').padEnd(49)}║
║  Log:   ${CONFIG.eventLogFile.padEnd(49)}║
╠════════════════════════════════════════════════════════════╣
║  Endpoints:                                                ║
║    GET  /health           - Server health                  ║
║    GET  /metrics          - All metrics (cached)           ║
║    GET  /metrics?refresh  - Force refresh                  ║
║    GET  /metrics/mrr      - MRR only                       ║
║    GET  /metrics/revenue  - Revenue breakdown              ║
║    GET  /metrics/subs     - Subscriptions                  ║
║    GET  /events           - Recent webhook events          ║
║    POST /webhook          - Stripe webhook receiver        ║
╚════════════════════════════════════════════════════════════╝
`);
    
    // Pre-warm cache
    getMetrics().catch(e => {
      console.error('[Startup] Failed to pre-warm cache:', e.message);
    });
  });
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n[Server] Shutting down...');
    server.close(() => process.exit(0));
  });
}

// Export for programmatic use
module.exports = {
  getMetrics,
  fetchAllMetrics,
  handleWebhook,
  getRecentEvents,
  CONFIG,
};

// Run if called directly
if (require.main === module) {
  main();
}
