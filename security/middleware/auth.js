/**
 * Authentication Middleware
 * JWT + API Key authentication for admin endpoints
 */

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');
const API_KEYS = new Set((process.env.ADMIN_API_KEYS || '').split(',').filter(Boolean));

// In production, API keys should be in database with metadata
// For now, env var is acceptable for initial security

/**
 * Verify API Key
 * Use for webhook endpoints and server-to-server communication
 */
function verifyApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  
  if (!apiKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'API key required',
    });
  }
  
  if (!API_KEYS.has(apiKey)) {
    // Log failed attempt for security monitoring
    console.warn('⚠️ Invalid API key attempt:', {
      ip: req.ip,
      path: req.path,
      timestamp: new Date().toISOString(),
    });
    
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid API key',
    });
  }
  
  // Attach key metadata to request for logging
  req.apiKey = apiKey;
  req.authenticated = true;
  
  next();
}

/**
 * Verify JWT Token
 * Use for user sessions and admin panel access
 */
function verifyJWT(req, res, next) {
  const token = extractToken(req);
  
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication token required',
    });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach user info to request
    req.user = decoded;
    req.authenticated = true;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token expired',
      });
    }
    
    console.warn('⚠️ Invalid JWT attempt:', {
      ip: req.ip,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
    
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid token',
    });
  }
}

/**
 * Extract token from request
 * Supports: Authorization header (Bearer token) and cookie
 */
function extractToken(req) {
  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Check cookie
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  
  return null;
}

/**
 * Generate JWT token
 */
function generateToken(payload, expiresIn = '24h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify admin role
 * Use after verifyJWT to check for admin permissions
 */
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Admin access required',
    });
  }
  
  next();
}

/**
 * Optional authentication
 * Verifies if token is present but doesn't block if missing
 */
function optionalAuth(req, res, next) {
  const token = extractToken(req);
  
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      req.authenticated = true;
    } catch (error) {
      // Token invalid but we don't block
      req.authenticated = false;
    }
  }
  
  next();
}

/**
 * Check if request is from localhost (dev mode)
 */
function isLocalhost(req) {
  const ip = req.ip || req.connection.remoteAddress;
  return ip === '127.0.0.1' || ip === '::1' || ip === 'localhost';
}

/**
 * Dev mode bypass (use ONLY in development!)
 */
function devBypass(req, res, next) {
  if (process.env.NODE_ENV === 'development' && isLocalhost(req)) {
    req.user = { id: 'dev', role: 'admin' };
    req.authenticated = true;
    return next();
  }
  
  next();
}

module.exports = {
  verifyApiKey,
  verifyJWT,
  generateToken,
  requireAdmin,
  optionalAuth,
  devBypass,
};
