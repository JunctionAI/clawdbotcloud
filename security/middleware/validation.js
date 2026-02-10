/**
 * Input Validation Middleware
 * Sanitizes and validates all user input
 */

const { body, param, query, validationResult } = require('express-validator');
const validator = require('validator');
const xss = require('xss');

/**
 * Validation error handler
 * Returns formatted validation errors
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value,
      })),
    });
  }
  
  next();
}

/**
 * Sanitize all string inputs to prevent XSS
 */
function sanitizeStrings(req, res, next) {
  function sanitize(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        // Remove potentially dangerous HTML/JS
        obj[key] = xss(obj[key], {
          whiteList: {}, // No HTML allowed by default
          stripIgnoreTag: true,
          stripIgnoreTagBody: ['script', 'style'],
        });
        
        // Trim whitespace
        obj[key] = obj[key].trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  }
  
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  
  next();
}

/**
 * Validate email
 */
const validateEmail = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
    .isLength({ max: 255 }).withMessage('Email too long')
    .custom((value) => {
      // Additional check: reject disposable email domains
      const disposableDomains = ['tempmail.com', 'guerrillamail.com', '10minutemail.com'];
      const domain = value.split('@')[1];
      if (disposableDomains.includes(domain)) {
        throw new Error('Disposable email addresses not allowed');
      }
      return true;
    }),
  handleValidationErrors,
];

/**
 * Validate customer provisioning request
 */
const validateProvisionRequest = [
  body('customerId')
    .optional()
    .isUUID().withMessage('Invalid customer ID format'),
  
  body('tier')
    .notEmpty().withMessage('Tier is required')
    .isIn(['starter', 'professional', 'enterprise'])
    .withMessage('Invalid tier (must be: starter, professional, or enterprise)'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  handleValidationErrors,
];

/**
 * Validate lead creation
 */
const validateLead = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters')
    .matches(/^[a-zA-Z\s\-']+$/).withMessage('Name contains invalid characters'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Company name too long'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9\s\-\+\(\)]+$/).withMessage('Invalid phone number format'),
  
  body('budget_range')
    .optional()
    .isIn(['under-1k', '1k-5k', '5k-10k', '10k+']).withMessage('Invalid budget range'),
  
  body('urgency')
    .optional()
    .isIn(['immediate', 'this-month', 'exploring']).withMessage('Invalid urgency value'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Notes too long (max 1000 characters)'),
  
  handleValidationErrors,
];

/**
 * Validate UUID parameter
 */
const validateUUID = [
  param('id')
    .isUUID().withMessage('Invalid ID format'),
  handleValidationErrors,
];

/**
 * Validate deployment ID parameter
 */
const validateDeploymentId = [
  param('deploymentId')
    .notEmpty().withMessage('Deployment ID is required')
    .isLength({ min: 8, max: 100 }).withMessage('Invalid deployment ID'),
  handleValidationErrors,
];

/**
 * Validate pagination parameters
 */
const validatePagination = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be 1-100')
    .toInt(),
  
  query('offset')
    .optional()
    .isInt({ min: 0 }).withMessage('Offset must be >= 0')
    .toInt(),
  
  handleValidationErrors,
];

/**
 * SQL injection prevention
 * Validates that input doesn't contain SQL keywords
 */
function preventSQLInjection(req, res, next) {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(--|;|\/\*|\*\/|xp_|sp_)/i,
    /(\bUNION\b.*\bSELECT\b)/i,
  ];
  
  function checkForSQL(obj, path = '') {
    for (const key in obj) {
      const value = obj[key];
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string') {
        for (const pattern of sqlPatterns) {
          if (pattern.test(value)) {
            console.warn('⚠️ SQL injection attempt detected:', {
              field: currentPath,
              value: value.substring(0, 100),
              ip: req.ip,
              timestamp: new Date().toISOString(),
            });
            
            return res.status(400).json({
              error: 'Invalid Input',
              message: 'Input contains potentially dangerous content',
            });
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        const result = checkForSQL(value, currentPath);
        if (result) return result;
      }
    }
  }
  
  if (req.body) checkForSQL(req.body, 'body');
  if (req.query) checkForSQL(req.query, 'query');
  if (req.params) checkForSQL(req.params, 'params');
  
  next();
}

/**
 * Limit request body size
 */
function limitBodySize(maxSize = '1mb') {
  return (req, res, next) => {
    const contentLength = req.headers['content-length'];
    
    if (contentLength) {
      const maxBytes = parseSize(maxSize);
      if (parseInt(contentLength) > maxBytes) {
        return res.status(413).json({
          error: 'Payload Too Large',
          message: `Request body exceeds ${maxSize}`,
        });
      }
    }
    
    next();
  };
}

function parseSize(size) {
  const units = { b: 1, kb: 1024, mb: 1024 * 1024, gb: 1024 * 1024 * 1024 };
  const match = size.match(/^(\d+)(b|kb|mb|gb)$/i);
  if (!match) return 1024 * 1024; // Default 1MB
  return parseInt(match[1]) * units[match[2].toLowerCase()];
}

module.exports = {
  handleValidationErrors,
  sanitizeStrings,
  validateEmail,
  validateProvisionRequest,
  validateLead,
  validateUUID,
  validateDeploymentId,
  validatePagination,
  preventSQLInjection,
  limitBodySize,
};
