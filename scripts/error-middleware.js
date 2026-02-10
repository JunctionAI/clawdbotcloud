/**
 * Error Logging Middleware for Clawdbot API
 * 
 * Captures errors and sends them to the Ops Dashboard
 * 
 * Usage:
 *   const { errorMiddleware, trackRequest, captureError } = require('./error-middleware');
 *   
 *   // Add request tracking (measures latency)
 *   app.use(trackRequest);
 *   
 *   // Add error middleware (MUST be last middleware)
 *   app.use(errorMiddleware);
 *   
 *   // Manual error capture
 *   try { ... } catch (err) { captureError(err, { userId, endpoint }); }
 */

const http = require('http');

// Configuration
const OPS_DASHBOARD_URL = process.env.OPS_DASHBOARD_URL || 'http://localhost:3300';
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Error buffer for batching (reduces HTTP overhead)
let errorBuffer = [];
let flushTimer = null;
const FLUSH_INTERVAL = 1000; // Flush every second
const MAX_BUFFER_SIZE = 100;

/**
 * Send error to ops dashboard
 */
async function sendToOpsDashboard(endpoint, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, OPS_DASHBOARD_URL);
    const postData = JSON.stringify(data);
    
    const req = http.request({
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 5000
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    
    req.on('error', (err) => {
      // Silent fail - don't crash the app if ops dashboard is down
      if (ENVIRONMENT !== 'production') {
        console.warn('[OpsMiddleware] Failed to send to dashboard:', err.message);
      }
      resolve(null);
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });
    
    req.write(postData);
    req.end();
  });
}

/**
 * Flush error buffer to ops dashboard
 */
async function flushErrors() {
  if (errorBuffer.length === 0) return;
  
  const errors = errorBuffer.splice(0, MAX_BUFFER_SIZE);
  
  // Send errors in parallel (but don't await all)
  errors.forEach(error => {
    sendToOpsDashboard('/webhook/error', error);
  });
}

/**
 * Schedule buffer flush
 */
function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushErrors();
  }, FLUSH_INTERVAL);
}

/**
 * Capture an error and send to ops dashboard
 * @param {Error} error - The error object
 * @param {Object} context - Additional context (userId, endpoint, etc.)
 */
function captureError(error, context = {}) {
  const errorData = {
    type: error.name || 'Error',
    message: error.message,
    stack: error.stack,
    code: error.code,
    statusCode: error.statusCode || error.status,
    endpoint: context.endpoint || context.path,
    method: context.method,
    userId: context.userId || context.user?.id,
    requestId: context.requestId,
    environment: ENVIRONMENT,
    timestamp: Date.now(),
    ...context.extra
  };
  
  errorBuffer.push(errorData);
  
  // Flush immediately if buffer is full, otherwise schedule
  if (errorBuffer.length >= MAX_BUFFER_SIZE) {
    flushErrors();
  } else {
    scheduleFlush();
  }
  
  // Also log to console in development
  if (ENVIRONMENT !== 'production') {
    console.error('[Error]', error.message);
    if (error.stack) console.error(error.stack);
  }
  
  return errorData;
}

/**
 * Express/Koa error middleware
 * Place AFTER all routes
 */
function errorMiddleware(err, req, res, next) {
  // Capture the error
  captureError(err, {
    endpoint: req.path || req.url,
    method: req.method,
    userId: req.user?.id || req.userId,
    requestId: req.id || req.requestId,
    extra: {
      query: req.query,
      body: req.body ? '[redacted]' : undefined,
      headers: {
        'user-agent': req.headers?.['user-agent'],
        'x-forwarded-for': req.headers?.['x-forwarded-for']
      }
    }
  });
  
  // Determine status code
  const statusCode = err.statusCode || err.status || 500;
  
  // Send error response
  if (!res.headersSent) {
    res.status(statusCode).json({
      error: {
        message: ENVIRONMENT === 'production' && statusCode === 500 
          ? 'Internal server error' 
          : err.message,
        code: err.code,
        ...(ENVIRONMENT !== 'production' && { stack: err.stack })
      }
    });
  }
  
  // Call next if provided (for some frameworks)
  if (typeof next === 'function') {
    next(err);
  }
}

/**
 * Async error wrapper for route handlers
 * Usage: app.get('/route', asyncHandler(async (req, res) => { ... }))
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Request tracking middleware
 * Measures latency and sends to ops dashboard
 * Place BEFORE routes
 */
function trackRequest(req, res, next) {
  const start = Date.now();
  
  // Generate request ID if not present
  req.requestId = req.requestId || req.id || generateRequestId();
  
  // Track response
  const originalEnd = res.end;
  res.end = function(...args) {
    const latency = Date.now() - start;
    
    // Send tracking data
    sendToOpsDashboard('/api/track', {
      event: 'request',
      properties: {
        latency,
        endpoint: req.path || req.url,
        method: req.method,
        statusCode: res.statusCode,
        userId: req.user?.id
      }
    });
    
    // Call original end
    return originalEnd.apply(this, args);
  };
  
  next();
}

/**
 * Track user activity
 * Call when user performs an action
 */
function trackUserActive(userId) {
  sendToOpsDashboard('/api/track', {
    event: 'user_active',
    userId
  });
}

/**
 * Track user inactive
 * Call when user disconnects/logs out
 */
function trackUserInactive(userId) {
  sendToOpsDashboard('/api/track', {
    event: 'user_inactive',
    userId
  });
}

/**
 * Track message sent
 */
function trackMessage(userId) {
  sendToOpsDashboard('/api/track', {
    event: 'message_sent',
    userId
  });
}

/**
 * Track user signup
 */
function trackSignup(email, plan = 'free', source = null) {
  sendToOpsDashboard('/webhook/signup', {
    email,
    plan,
    source
  });
}

/**
 * Track user activation (completed onboarding, sent first message, etc.)
 */
function trackActivation(userId) {
  sendToOpsDashboard('/api/track', {
    event: 'user_activated',
    userId
  });
}

/**
 * Generate a simple request ID
 */
function generateRequestId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Create custom error classes
 */
class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, field = null) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    this.field = field;
  }
}

class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

class AuthorizationError extends AppError {
  constructor(message = 'Permission denied') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

class RateLimitError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_ERROR');
    this.name = 'RateLimitError';
  }
}

// Flush on process exit
process.on('beforeExit', flushErrors);
process.on('SIGINT', () => { flushErrors(); process.exit(0); });
process.on('SIGTERM', () => { flushErrors(); process.exit(0); });

module.exports = {
  // Core
  captureError,
  errorMiddleware,
  asyncHandler,
  trackRequest,
  
  // Tracking helpers
  trackUserActive,
  trackUserInactive,
  trackMessage,
  trackSignup,
  trackActivation,
  
  // Custom errors
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  RateLimitError,
  
  // Utilities
  sendToOpsDashboard,
  generateRequestId
};
