/**
 * Onboarding API Server
 * Express server to handle provisioning requests
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { handleProvisionRequest } = require('./provision');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Provisioning endpoint
app.post('/api/onboarding/provision', handleProvisionRequest);

// Completion tracking
app.post('/api/onboarding/complete', (req, res) => {
  const { name, completionTime } = req.body;
  
  console.log(`✅ User ${name} completed onboarding in ${completionTime}s`);
  
  // In production, save to database
  // For now, just log
  
  res.json({ success: true });
});

// Serve onboarding page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Onboarding server running on http://localhost:${PORT}`);
  console.log(`📝 Onboarding page: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
