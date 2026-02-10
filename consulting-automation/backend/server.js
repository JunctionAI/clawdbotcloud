const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// =======================
// SECURITY MIDDLEWARE
// =======================

// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const whitelist = (process.env.CORS_WHITELIST || '').split(',').filter(Boolean);
    
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Development: allow localhost
    if (NODE_ENV === 'development' && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    // Production: check whitelist
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Request-ID'],
};

app.use(cors(corsOptions));

// Body parsing with limits
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Rate limiting configurations
const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please try again later.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health',
});

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Strict limit for sensitive endpoints
  message: {
    error: 'Too Many Requests',
    message: 'Too many attempts. Please try again later.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour
  message: {
    error: 'Submission Limit Exceeded',
    message: 'Too many form submissions. Please try again later.',
    retryAfter: '1 hour',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply standard rate limiting to all API routes
app.use('/api/', standardLimiter);

// Request ID middleware
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || require('crypto').randomUUID();
  res.setHeader('X-Request-ID', req.id);
  next();
});

// =======================
// ROUTES
// =======================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    requestId: req.id,
  });
});

// Routes with appropriate rate limiting
const leadsRouter = require('./routes/leads');
const clientsRouter = require('./routes/clients');
const proposalsRouter = require('./routes/proposals');
const projectsRouter = require('./routes/projects');
const paymentsRouter = require('./routes/payments');
const testimonialsRouter = require('./routes/testimonials');
const referralsRouter = require('./routes/referrals');
const pricingRouter = require('./routes/pricing');
const analyticsRouter = require('./routes/analytics');
const automationRouter = require('./routes/automation');

// Apply stricter rate limiting to lead submissions
app.use('/api/leads', leadLimiter, leadsRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/proposals', proposalsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/payments', strictLimiter, paymentsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/referrals', referralsRouter);
app.use('/api/pricing', pricingRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/automation', strictLimiter, automationRouter);

// =======================
// ERROR HANDLING
// =======================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    requestId: req.id,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  // Log error securely
  console.error('Server error:', {
    message: err.message,
    requestId: req.id,
    path: req.path,
    method: req.method,
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

  // Default error response
  res.status(err.status || 500).json({ 
    error: 'Something went wrong!',
    message: NODE_ENV === 'development' ? err.message : undefined,
    requestId: req.id,
  });
});

// =======================
// SERVER STARTUP
// =======================

app.listen(PORT, () => {
  console.log(`
🚀 Consulting Automation API running on port ${PORT}
📊 Dashboard: ${process.env.FRONTEND_URL || 'http://localhost:3000'}
🌍 Environment: ${NODE_ENV}
🔒 Security: ENABLED (CORS, Rate Limiting, Headers)
  `);
});

module.exports = app;
