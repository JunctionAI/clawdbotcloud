/**
 * Security Headers Middleware
 * Implements comprehensive security headers following OWASP recommendations
 */

const helmet = require('helmet');

/**
 * Standard security headers configuration
 * Covers most security requirements
 */
function standardSecurityHeaders() {
  return helmet({
    // Content Security Policy
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://js.stripe.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
        connectSrc: ["'self'", 'https://api.stripe.com'],
        frameSrc: ["'self'", 'https://js.stripe.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    
    // Strict Transport Security (HSTS)
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    
    // X-Frame-Options
    frameguard: {
      action: 'deny', // Prevent clickjacking
    },
    
    // X-Content-Type-Options
    noSniff: true, // Prevent MIME type sniffing
    
    // X-XSS-Protection (legacy but still useful)
    xssFilter: true,
    
    // Referrer-Policy
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin',
    },
    
    // X-DNS-Prefetch-Control
    dnsPrefetchControl: {
      allow: false,
    },
    
    // X-Download-Options
    ieNoOpen: true,
    
    // X-Permitted-Cross-Domain-Policies
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none',
    },
  });
}

/**
 * Strict CSP for API-only endpoints
 * No inline scripts, no external resources
 */
function apiSecurityHeaders() {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'none'"],
        styleSrc: ["'none'"],
        imgSrc: ["'none'"],
        connectSrc: ["'self'"],
        fontSrc: ["'none'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'none'"],
        frameSrc: ["'none'"],
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
  });
}

/**
 * Custom headers middleware
 * Adds additional security headers not covered by helmet
 */
function customSecurityHeaders(req, res, next) {
  // Permissions Policy (formerly Feature-Policy)
  res.setHeader('Permissions-Policy', [
    'geolocation=()',
    'microphone=()',
    'camera=()',
    'payment=(self)',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
  ].join(', '));
  
  // Cross-Origin policies
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  
  // Remove server fingerprint
  res.removeHeader('X-Powered-By');
  res.setHeader('Server', 'Clawdbot API'); // Generic identifier
  
  // Cache control for sensitive endpoints
  if (req.path.includes('/api/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  
  next();
}

/**
 * CORS configuration
 * Whitelist-based CORS for production
 */
function corsConfig() {
  const whitelist = (process.env.CORS_WHITELIST || '').split(',').filter(Boolean);
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      
      // Development: allow localhost
      if (isDevelopment && origin.includes('localhost')) {
        return callback(null, true);
      }
      
      // Production: check whitelist
      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        console.warn('⚠️ CORS blocked origin:', origin);
        callback(new Error('CORS policy: Origin not allowed'));
      }
    },
    credentials: true, // Allow cookies
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-API-Key',
      'X-Request-ID',
    ],
    exposedHeaders: [
      'X-Request-ID',
      'X-RateLimit-Limit',
      'X-RateLimit-Remaining',
      'X-RateLimit-Reset',
    ],
    maxAge: 86400, // 24 hours
  };
}

/**
 * Request ID middleware
 * Adds unique ID to each request for tracing
 */
function requestId(req, res, next) {
  const { v4: uuidv4 } = require('uuid');
  req.id = req.headers['x-request-id'] || uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
}

/**
 * Security.txt endpoint
 * Responsible disclosure information
 */
function securityTxt(req, res) {
  const contact = process.env.SECURITY_CONTACT || 'security@clawdbot.com';
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  
  const txt = `Contact: mailto:${contact}
Expires: ${expires.toISOString()}
Preferred-Languages: en
Policy: https://clawdbot.com/security-policy
Acknowledgments: https://clawdbot.com/security-hall-of-fame
Hiring: https://clawdbot.com/careers

# Encryption key
# ${process.env.PGP_KEY_URL || 'Available upon request'}
`;
  
  res.type('text/plain');
  res.send(txt);
}

module.exports = {
  standardSecurityHeaders,
  apiSecurityHeaders,
  customSecurityHeaders,
  corsConfig,
  requestId,
  securityTxt,
};
