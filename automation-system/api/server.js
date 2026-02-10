/**
 * Clawdbot Automation API Server
 * HARDENED with security middleware
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { handleStripeWebhook } = require('./webhooks/stripe');

// Import security middleware
const security = require('../../security');
const {
  verifyApiKey,
  verifyJWT,
  routeMiddleware,
  applySecurityMiddleware,
  rateLimiting,
  validation,
} = security;

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// =======================
// SECURITY MIDDLEWARE
// =======================

// Apply comprehensive security middleware
applySecurityMiddleware(app, {
  enableCors: true,
  enableHeaders: true,
  enableRateLimit: true,
  enableValidation: true,
  isApi: true,
});

// Health check endpoint (no auth required)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: NODE_ENV,
  });
});

// Stripe webhook endpoint (raw body required for signature verification)
// Must be before express.json() middleware
app.post(
  '/api/webhooks/stripe',
  rateLimiting.webhookLimiter,
  express.raw({ type: 'application/json' }),
  handleStripeWebhook
);

// All other routes use JSON body parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// =======================
// API ROUTES
// =======================

// Public status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    service: 'clawdbot-automation-api',
    status: 'running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Manual provisioning endpoint (ADMIN ONLY - requires API key)
app.post(
  '/api/provision',
  verifyApiKey,
  rateLimiting.provisionLimiter,
  validation.validateProvisionRequest,
  async (req, res) => {
    const { customerId, tier, email } = req.body;

    try {
      const { provisionAgent } = require('../provision/orchestrator');

      // Log provisioning request
      console.log(`📦 Provisioning request received:`, {
        customerId,
        tier,
        email: security.encryption.maskSensitive(email),
        requestId: req.id,
        apiKey: security.encryption.maskSensitive(req.apiKey),
      });

      const deployment = await provisionAgent({
        customerId,
        tier,
        email,
      });

      res.json({
        success: true,
        deploymentId: deployment.id,
        status: deployment.status,
        requestId: req.id,
      });
    } catch (error) {
      console.error('❌ Manual provisioning failed:', {
        error: error.message,
        requestId: req.id,
      });

      res.status(500).json({
        success: false,
        error: NODE_ENV === 'development' ? error.message : 'Provisioning failed',
        requestId: req.id,
      });
    }
  }
);

// Get deployment status (requires API key)
app.get(
  '/api/provision/status/:deploymentId',
  verifyApiKey,
  validation.validateDeploymentId,
  async (req, res) => {
    const { deploymentId } = req.params;

    try {
      // TODO: Query database for deployment status
      res.json({
        deploymentId,
        status: 'in_progress',
        logs: 'Deployment in progress...',
        progress: 65,
        requestId: req.id,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: NODE_ENV === 'development' ? error.message : 'Failed to get status',
        requestId: req.id,
      });
    }
  }
);

// List deployments (requires API key)
app.get('/api/provision/list', verifyApiKey, async (req, res) => {
  try {
    // TODO: Query database for deployments
    res.json({
      deployments: [],
      count: 0,
      requestId: req.id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to list deployments',
      requestId: req.id,
    });
  }
});

// =======================
// ERROR HANDLING
// =======================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method,
    requestId: req.id,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  // Log error securely (no stack traces in production)
  console.error('🚨 Server error:', {
    message: err.message,
    requestId: req.id,
    path: req.path,
    method: req.method,
    ip: req.ip,
    stack: NODE_ENV === 'development' ? err.stack : undefined,
  });

  // Handle CORS errors
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'CORS policy violation',
      requestId: req.id,
    });
  }

  // Handle rate limit errors
  if (err.status === 429) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.',
      requestId: req.id,
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
    requestId: req.id,
  });
});

// =======================
// SERVER STARTUP
// =======================

app.listen(PORT, () => {
  console.log(`
🚀 Clawdbot Automation API running on port ${PORT}
📍 Health check: http://localhost:${PORT}/health
🔔 Webhook endpoint: http://localhost:${PORT}/api/webhooks/stripe
🌍 Environment: ${NODE_ENV}
🔒 Security: ENABLED (CORS, Rate Limiting, Headers, Validation)
  `);
});

module.exports = app;
