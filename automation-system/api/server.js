/**
 * Clawdbot Automation API Server
 * Main Express server for provisioning API
 */

require('dotenv').config();
const express = require('express');
const { handleStripeWebhook } = require('./webhooks/stripe');

const app = express();
const PORT = process.env.PORT || 3001;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Stripe webhook endpoint (raw body required for signature verification)
app.post(
  '/api/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  handleStripeWebhook
);

// All other routes use JSON body parser
app.use(express.json());

// API routes
app.get('/api/status', (req, res) => {
  res.json({
    service: 'clawdbot-automation-api',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// Manual provisioning endpoint (admin only)
app.post('/api/provision', async (req, res) => {
  const { customerId, tier, email } = req.body;
  
  // TODO: Add admin authentication
  
  try {
    const { provisionAgent } = require('../provision/orchestrator');
    
    const deployment = await provisionAgent({
      customerId,
      tier,
      email,
    });
    
    res.json({
      success: true,
      deploymentId: deployment.id,
      status: deployment.status,
    });
    
  } catch (error) {
    console.error('Manual provisioning failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get deployment status
app.get('/api/provision/status/:deploymentId', async (req, res) => {
  const { deploymentId } = req.params;
  
  try {
    // TODO: Query database for deployment status
    res.json({
      deploymentId,
      status: 'in_progress',
      logs: 'Deployment in progress...',
      progress: 65,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Clawdbot Automation API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔔 Webhook endpoint: http://localhost:${PORT}/api/webhooks/stripe`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
