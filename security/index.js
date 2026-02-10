/**
 * Security Module - Central Export
 * Import everything from here for clean usage
 */

const auth = require('./middleware/auth');
const rateLimiting = require('./middleware/rateLimiting');
const securityHeaders = require('./middleware/securityHeaders');
const validation = require('./middleware/validation');
const encryption = require('./utils/encryption');

/**
 * Apply all security middleware to an Express app
 * @param {Express} app - Express application instance
 * @param {Object} options - Configuration options
 */
function applySecurityMiddleware(app, options = {}) {
  const {
    enableCors = true,
    enableHeaders = true,
    enableRateLimit = true,
    enableValidation = true,
    corsWhitelist = [],
    isApi = false,
  } = options;

  // Security headers
  if (enableHeaders) {
    if (isApi) {
      app.use(securityHeaders.apiSecurityHeaders());
    } else {
      app.use(securityHeaders.standardSecurityHeaders());
    }
    app.use(securityHeaders.customSecurityHeaders);
    app.use(securityHeaders.requestId);
  }

  // CORS
  if (enableCors) {
    const cors = require('cors');
    app.use(cors(securityHeaders.corsConfig()));
  }

  // Rate limiting
  if (enableRateLimit) {
    app.use(rateLimiting.apiLimiter);
    app.use(rateLimiting.speedLimiter);
  }

  // Input validation/sanitization
  if (enableValidation) {
    app.use(validation.sanitizeStrings);
    app.use(validation.preventSQLInjection);
    app.use(validation.limitBodySize('2mb'));
  }

  // Security.txt endpoint
  app.get('/.well-known/security.txt', securityHeaders.securityTxt);

  return app;
}

/**
 * Get route-specific middleware configurations
 */
const routeMiddleware = {
  // For public endpoints - no auth, rate limited
  public: [rateLimiting.apiLimiter],

  // For authenticated endpoints
  authenticated: [auth.verifyJWT],

  // For admin endpoints
  admin: [auth.verifyJWT, auth.requireAdmin],

  // For API key endpoints (server-to-server)
  apiKey: [auth.verifyApiKey],

  // For webhooks (special rate limiting)
  webhook: [rateLimiting.webhookLimiter],

  // For provisioning endpoints
  provision: [auth.verifyApiKey, rateLimiting.provisionLimiter, validation.validateProvisionRequest],

  // For lead submission
  lead: [rateLimiting.leadLimiter, validation.validateLead],

  // For auth endpoints (strict rate limiting)
  auth: [rateLimiting.authLimiter],
};

module.exports = {
  // Middleware modules
  auth,
  rateLimiting,
  securityHeaders,
  validation,
  encryption,

  // Helper functions
  applySecurityMiddleware,
  routeMiddleware,

  // Common re-exports
  verifyApiKey: auth.verifyApiKey,
  verifyJWT: auth.verifyJWT,
  generateToken: auth.generateToken,
  apiLimiter: rateLimiting.apiLimiter,
  validateEmail: validation.validateEmail,
  encrypt: encryption.encrypt,
  decrypt: encryption.decrypt,
};
