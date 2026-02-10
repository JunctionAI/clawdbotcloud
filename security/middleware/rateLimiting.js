/**
 * Rate Limiting Middleware
 * Prevents brute force, DDoS, and API abuse
 */

const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

// Redis client for distributed rate limiting (optional)
let redisClient;
if (process.env.REDIS_URL) {
  redisClient = new Redis(process.env.REDIS_URL);
}

/**
 * Standard API rate limiter
 * 100 requests per 15 minutes per IP
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per windowMs
  message: {
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please try again later.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  
  // Use Redis if available for distributed rate limiting
  store: redisClient ? new RedisStore({
    client: redisClient,
    prefix: 'rl:api:',
  }) : undefined,
  
  // Skip rate limiting for health checks
  skip: (req) => req.path === '/health',
  
  // Custom key generator (IP + user ID if authenticated)
  keyGenerator: (req) => {
    if (req.user && req.user.id) {
      return `user:${req.user.id}`;
    }
    return req.ip;
  },
});

/**
 * Strict rate limiter for authentication endpoints
 * 5 attempts per 15 minutes to prevent brute force
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too Many Attempts',
    message: 'Too many authentication attempts. Account temporarily locked.',
    retryAfter: '15 minutes',
  },
  skipSuccessfulRequests: true, // Don't count successful logins
  
  store: redisClient ? new RedisStore({
    client: redisClient,
    prefix: 'rl:auth:',
  }) : undefined,
});

/**
 * Provisioning rate limiter
 * Prevents abuse of agent provisioning
 * 3 provisions per hour per IP
 */
const provisionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    error: 'Provisioning Limit Exceeded',
    message: 'Too many provisioning requests. Please contact support if you need to provision more agents.',
    retryAfter: '1 hour',
  },
  
  store: redisClient ? new RedisStore({
    client: redisClient,
    prefix: 'rl:provision:',
  }) : undefined,
  
  keyGenerator: (req) => {
    // Rate limit by API key if present, otherwise IP
    if (req.apiKey) {
      return `key:${req.apiKey}`;
    }
    return req.ip;
  },
});

/**
 * Webhook rate limiter
 * More lenient for webhooks but still protected
 * 1000 per hour per endpoint
 */
const webhookLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message: {
    error: 'Webhook Rate Limit Exceeded',
    message: 'Too many webhook calls',
  },
  
  store: redisClient ? new RedisStore({
    client: redisClient,
    prefix: 'rl:webhook:',
  }) : undefined,
});

/**
 * Contact form / Lead submission limiter
 * Prevents spam submissions
 * 3 per hour per IP
 */
const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    error: 'Submission Limit Exceeded',
    message: 'Too many form submissions. Please try again later.',
    retryAfter: '1 hour',
  },
  
  store: redisClient ? new RedisStore({
    client: redisClient,
    prefix: 'rl:lead:',
  }) : undefined,
});

/**
 * Slow down middleware
 * Progressively delay responses after threshold
 */
const slowDown = require('express-slow-down');

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50, // Allow 50 requests per 15 minutes at full speed
  delayMs: 100, // Add 100ms delay per request above delayAfter
  maxDelayMs: 5000, // Max 5 second delay
});

/**
 * Custom rate limiter with callback
 * Use for dynamic rate limiting based on tier
 */
function createTierBasedLimiter() {
  return rateLimit({
    windowMs: 60 * 60 * 1000,
    max: (req) => {
      // Dynamic limits based on customer tier
      if (req.user) {
        const tier = req.user.tier;
        const limits = {
          starter: 100,
          professional: 500,
          enterprise: 2000,
        };
        return limits[tier] || 100;
      }
      return 100; // Default for unauthenticated
    },
    
    store: redisClient ? new RedisStore({
      client: redisClient,
      prefix: 'rl:tier:',
    }) : undefined,
  });
}

/**
 * IP whitelist bypass
 * Skip rate limiting for whitelisted IPs (internal services)
 */
function skipForWhitelist(whitelist = []) {
  return (req) => {
    const ip = req.ip || req.connection.remoteAddress;
    return whitelist.includes(ip);
  };
}

/**
 * Rate limit response handler
 * Custom handler for rate limit exceeded
 */
function rateLimitHandler(req, res) {
  console.warn('⚠️ Rate limit exceeded:', {
    ip: req.ip,
    path: req.path,
    user: req.user?.id,
    timestamp: new Date().toISOString(),
  });
  
  res.status(429).json({
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please slow down.',
    retryAfter: req.rateLimit.resetTime,
  });
}

module.exports = {
  apiLimiter,
  authLimiter,
  provisionLimiter,
  webhookLimiter,
  leadLimiter,
  speedLimiter,
  createTierBasedLimiter,
  skipForWhitelist,
  rateLimitHandler,
};
