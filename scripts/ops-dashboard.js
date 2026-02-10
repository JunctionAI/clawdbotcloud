#!/usr/bin/env node
/**
 * Clawdbot Operations Dashboard
 * Real-time monitoring for launch day and beyond
 * 
 * Run: node scripts/ops-dashboard.js
 * Access: http://localhost:3300
 */

const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Configuration
const PORT = process.env.OPS_PORT || 3300;
const HTML_PATH = path.join(__dirname, 'ops-dashboard', 'index.html');

// In-memory stores for real-time data
const store = {
  activeUsers: new Set(),
  messagesToday: 0,
  signupsToday: 0,
  signupsThisWeek: 0,
  revenueToday: 0,
  revenueThisWeek: 0,
  
  signupFeed: [],
  revenueFeed: [],
  errorFeed: [],
  
  apiLatencies: [],
  dbConnections: 0,
  
  funnel: {
    visitors: 0,
    signups: 0,
    activated: 0,
    subscribed: 0
  }
};

// WebSocket clients
const wsClients = new Set();

function broadcast(type, data) {
  const message = JSON.stringify({ type, data, timestamp: Date.now() });
  wsClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function getMetrics() {
  const now = Date.now();
  const hourAgo = now - 3600000;
  
  return {
    activeUsers: store.activeUsers.size,
    messagesToday: store.messagesToday,
    signupsToday: store.signupsToday,
    signupsThisWeek: store.signupsThisWeek,
    revenueToday: store.revenueToday,
    revenueThisWeek: store.revenueThisWeek,
    errorsLastHour: store.errorFeed.filter(e => e.timestamp > hourAgo).length,
    avgLatency: store.apiLatencies.length > 0 
      ? Math.round(store.apiLatencies.slice(-100).reduce((a,b) => a+b, 0) / Math.min(store.apiLatencies.length, 100))
      : 0,
    dbConnections: store.dbConnections,
    uptime: process.uptime()
  };
}

function getSystemHealth() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  
  return {
    memory: {
      total: totalMem,
      used: usedMem,
      free: freeMem,
      percent: Math.round((usedMem / totalMem) * 100)
    },
    cpu: {
      loadAvg: os.loadavg(),
      cores: os.cpus().length
    },
    process: {
      memory: process.memoryUsage(),
      uptime: process.uptime()
    },
    apiLatencies: store.apiLatencies.slice(-20),
    dbConnections: store.dbConnections
  };
}

// Load dashboard HTML
let dashboardHTML = '';
try {
  dashboardHTML = fs.readFileSync(HTML_PATH, 'utf8');
} catch (e) {
  console.error('Failed to load dashboard HTML:', e.message);
  dashboardHTML = '<h1>Dashboard HTML not found</h1><p>Run from the correct directory.</p>';
}

// HTTP Server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Dashboard
  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/dashboard') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(dashboardHTML);
    return;
  }
  
  // API endpoints
  if (parsedUrl.pathname === '/api/metrics') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getMetrics()));
    return;
  }
  
  if (parsedUrl.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getSystemHealth()));
    return;
  }
  
  // Webhook endpoints
  if (req.method === 'POST' && parsedUrl.pathname === '/webhook/signup') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        recordSignup(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }
  
  if (req.method === 'POST' && parsedUrl.pathname === '/webhook/stripe') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const event = JSON.parse(body);
        handleStripeEvent(event);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ received: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }
  
  if (req.method === 'POST' && parsedUrl.pathname === '/webhook/error') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        recordError(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }
  
  if (req.method === 'POST' && parsedUrl.pathname === '/api/track') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        handleTracking(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }
  
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// WebSocket Server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  wsClients.add(ws);
  
  // Send initial state
  ws.send(JSON.stringify({ type: 'metrics', data: getMetrics(), timestamp: Date.now() }));
  ws.send(JSON.stringify({ type: 'health', data: getSystemHealth(), timestamp: Date.now() }));
  ws.send(JSON.stringify({ type: 'funnel', data: store.funnel, timestamp: Date.now() }));
  
  // Send recent feed items
  store.signupFeed.slice(0, 20).forEach(item => {
    ws.send(JSON.stringify({ type: 'signup', data: item, timestamp: item.timestamp }));
  });
  
  store.revenueFeed.slice(0, 20).forEach(item => {
    ws.send(JSON.stringify({ type: 'revenue', data: item, timestamp: item.timestamp }));
  });
  
  store.errorFeed.slice(0, 20).forEach(item => {
    ws.send(JSON.stringify({ type: 'error', data: item, timestamp: item.timestamp }));
  });
  
  ws.on('message', (message) => {
    try {
      const { type, chart, period } = JSON.parse(message);
      
      if (type === 'request-metrics') {
        ws.send(JSON.stringify({ type: 'metrics', data: getMetrics(), timestamp: Date.now() }));
        ws.send(JSON.stringify({ type: 'health', data: getSystemHealth(), timestamp: Date.now() }));
      }
      
      if (type === 'request-timeseries') {
        const data = generateTimeSeriesData(chart, period);
        ws.send(JSON.stringify({ type: 'timeseries', data, timestamp: Date.now() }));
      }
    } catch (e) {
      console.error('Failed to parse client message:', e);
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
    wsClients.delete(ws);
  });
});

// Event handlers
function recordSignup(data) {
  const signup = {
    email: data.email,
    plan: data.plan || 'free',
    source: data.source || data.utm_source,
    timestamp: Date.now()
  };
  
  store.signupFeed.unshift(signup);
  if (store.signupFeed.length > 1000) store.signupFeed.pop();
  
  store.signupsToday++;
  store.signupsThisWeek++;
  store.funnel.signups++;
  
  broadcast('signup', signup);
  broadcast('metrics', getMetrics());
  broadcast('funnel', store.funnel);
  
  console.log('📝 New signup:', signup.email, '(' + signup.plan + ')');
}

function handleStripeEvent(event) {
  const timestamp = Date.now();
  
  switch (event.type) {
    case 'checkout.session.completed':
    case 'invoice.paid': {
      const amount = event.data.object.amount_total || event.data.object.amount_paid || 0;
      const customer = event.data.object.customer_email || event.data.object.customer;
      
      const payment = { type: 'payment', amount, email: customer, timestamp };
      
      store.revenueFeed.unshift(payment);
      if (store.revenueFeed.length > 1000) store.revenueFeed.pop();
      
      store.revenueToday += amount;
      store.revenueThisWeek += amount;
      store.funnel.subscribed++;
      
      broadcast('revenue', payment);
      broadcast('metrics', getMetrics());
      broadcast('funnel', store.funnel);
      
      console.log('💰 Payment: $' + (amount/100).toFixed(2) + ' from ' + customer);
      break;
    }
    
    case 'customer.subscription.updated': {
      const sub = event.data.object;
      if (sub.items?.data?.[0]?.price?.id !== sub.previous_attributes?.items?.data?.[0]?.price?.id) {
        const upgrade = {
          type: 'upgrade',
          amount: sub.items.data[0].price.unit_amount,
          customer: sub.customer,
          timestamp
        };
        
        store.revenueFeed.unshift(upgrade);
        broadcast('revenue', upgrade);
        console.log('⬆️ Upgrade:', sub.customer);
      }
      break;
    }
    
    case 'customer.subscription.deleted': {
      const cancellation = {
        type: 'cancellation',
        amount: 0,
        customer: event.data.object.customer,
        timestamp
      };
      
      store.revenueFeed.unshift(cancellation);
      broadcast('revenue', cancellation);
      console.log('❌ Cancellation:', event.data.object.customer);
      break;
    }
  }
}

function recordError(data) {
  const error = {
    type: data.type || data.name || 'Error',
    message: data.message,
    stack: data.stack,
    endpoint: data.endpoint,
    userId: data.userId,
    timestamp: Date.now()
  };
  
  store.errorFeed.unshift(error);
  if (store.errorFeed.length > 1000) store.errorFeed.pop();
  
  broadcast('error', error);
  
  // Check for error spike
  const hourAgo = Date.now() - 3600000;
  const recentErrors = store.errorFeed.filter(e => e.timestamp > hourAgo);
  if (recentErrors.length > 50) {
    broadcast('alert', {
      title: 'Error Spike Alert',
      message: recentErrors.length + ' errors in the last hour!'
    });
  }
  
  console.log('🚨 Error:', error.type, '-', error.message);
}

function handleTracking(data) {
  const { event, userId, properties } = data;
  
  switch (event) {
    case 'page_view':
      store.funnel.visitors++;
      break;
    case 'user_active':
      if (userId) store.activeUsers.add(userId);
      break;
    case 'user_inactive':
      if (userId) store.activeUsers.delete(userId);
      break;
    case 'message_sent':
      store.messagesToday++;
      break;
    case 'user_activated':
      store.funnel.activated++;
      break;
  }
  
  if (properties?.latency) {
    store.apiLatencies.push(properties.latency);
    if (store.apiLatencies.length > 1000) store.apiLatencies.shift();
  }
  
  broadcast('metrics', getMetrics());
  broadcast('funnel', store.funnel);
}

function generateTimeSeriesData(chart, period) {
  const now = Date.now();
  let labels = [];
  let values = [];
  
  // TODO: Replace with real data from database
  if (period === '24h') {
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(now - i * 3600000);
      labels.push(hour.getHours() + ':00');
      values.push(Math.floor(Math.random() * 10));
    }
  } else if (period === '7d') {
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now - i * 86400000);
      labels.push(day.toLocaleDateString('en', { weekday: 'short' }));
      values.push(Math.floor(Math.random() * 50));
    }
  } else if (period === '30d') {
    for (let i = 29; i >= 0; i--) {
      const day = new Date(now - i * 86400000);
      labels.push(day.getDate() + '/' + (day.getMonth() + 1));
      values.push(Math.floor(Math.random() * 100));
    }
  }
  
  const result = {};
  result[chart] = { labels, values };
  return result;
}

// Reset counters
function scheduleDailyReset() {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const msUntilMidnight = tomorrow - now;
  
  setTimeout(() => {
    store.messagesToday = 0;
    store.signupsToday = 0;
    store.revenueToday = 0;
    console.log('📅 Daily counters reset');
    scheduleDailyReset();
  }, msUntilMidnight);
}

function scheduleWeeklyReset() {
  const now = new Date();
  const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
  const nextSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilSunday);
  const msUntilSunday = nextSunday - now;
  
  setTimeout(() => {
    store.signupsThisWeek = 0;
    store.revenueThisWeek = 0;
    console.log('📅 Weekly counters reset');
    scheduleWeeklyReset();
  }, msUntilSunday);
}

// Start server
server.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                                                              ║');
  console.log('║   🤖 Clawdbot Operations Dashboard                          ║');
  console.log('║                                                              ║');
  console.log('║   Dashboard:  http://localhost:' + PORT + '                        ║');
  console.log('║   API:        http://localhost:' + PORT + '/api/metrics            ║');
  console.log('║   Health:     http://localhost:' + PORT + '/api/health             ║');
  console.log('║                                                              ║');
  console.log('║   Webhooks:                                                  ║');
  console.log('║   • POST /webhook/signup  - Record new signups              ║');
  console.log('║   • POST /webhook/stripe  - Stripe webhook events           ║');
  console.log('║   • POST /webhook/error   - Error logging                   ║');
  console.log('║   • POST /api/track       - Event tracking                  ║');
  console.log('║                                                              ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  
  scheduleDailyReset();
  scheduleWeeklyReset();
});

process.on('SIGINT', () => {
  console.log('\nShutting down...');
  wss.clients.forEach(client => client.close());
  server.close(() => process.exit(0));
});

module.exports = { recordSignup, recordError, handleStripeEvent, handleTracking };
