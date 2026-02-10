/**
 * Encryption Utilities
 * AES-256-GCM encryption for customer data at rest
 */

const crypto = require('crypto');

// Encryption key from environment (must be 32 bytes for AES-256)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY 
  ? Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
  : crypto.randomBytes(32);

if (!process.env.ENCRYPTION_KEY) {
  console.warn('⚠️ WARNING: ENCRYPTION_KEY not set! Using random key (data will be lost on restart)');
  console.warn('Generate key with: node -e "console.log(crypto.randomBytes(32).toString(\'hex\'))"');
}

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 64;

/**
 * Encrypt string data
 * Returns: iv:authTag:encrypted (hex encoded, colon separated)
 */
function encrypt(plaintext) {
  if (!plaintext) return null;
  
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    // Format: iv:authTag:encrypted (all hex)
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Encryption failed');
  }
}

/**
 * Decrypt encrypted data
 * Expects format: iv:authTag:encrypted
 */
function decrypt(ciphertext) {
  if (!ciphertext) return null;
  
  try {
    const parts = ciphertext.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid ciphertext format');
    }
    
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Decryption failed');
  }
}

/**
 * Hash password using bcrypt
 */
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

/**
 * Generate secure random token
 */
function generateToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generate API key
 * Format: cb_live_<random> or cb_test_<random>
 */
function generateApiKey(prefix = 'live') {
  const random = crypto.randomBytes(24).toString('hex');
  return `cb_${prefix}_${random}`;
}

/**
 * Hash API key for storage
 * Store hash in DB, compare on verification
 */
function hashApiKey(apiKey) {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

/**
 * Encrypt sensitive fields in object
 * Used for database storage
 */
function encryptFields(obj, fields) {
  const encrypted = { ...obj };
  
  for (const field of fields) {
    if (encrypted[field]) {
      encrypted[field] = encrypt(encrypted[field]);
    }
  }
  
  return encrypted;
}

/**
 * Decrypt sensitive fields in object
 * Used when retrieving from database
 */
function decryptFields(obj, fields) {
  if (!obj) return null;
  
  const decrypted = { ...obj };
  
  for (const field of fields) {
    if (decrypted[field]) {
      try {
        decrypted[field] = decrypt(decrypted[field]);
      } catch (error) {
        console.error(`Failed to decrypt field ${field}:`, error);
        decrypted[field] = null;
      }
    }
  }
  
  return decrypted;
}

/**
 * Create HMAC signature for webhook verification
 */
function createHmacSignature(payload, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
}

/**
 * Verify HMAC signature
 */
function verifyHmacSignature(payload, signature, secret) {
  const expectedSignature = createHmacSignature(payload, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Mask sensitive data for logging
 * Shows first/last 4 chars only
 */
function maskSensitive(str, visibleChars = 4) {
  if (!str || str.length <= visibleChars * 2) return '****';
  
  const start = str.substring(0, visibleChars);
  const end = str.substring(str.length - visibleChars);
  const masked = '*'.repeat(Math.min(str.length - visibleChars * 2, 8));
  
  return `${start}${masked}${end}`;
}

/**
 * Redact sensitive fields from object for logging
 */
function redactForLogging(obj, sensitiveFields = ['password', 'apiKey', 'secret', 'token']) {
  const redacted = { ...obj };
  
  for (const field of sensitiveFields) {
    if (redacted[field]) {
      redacted[field] = maskSensitive(redacted[field]);
    }
  }
  
  return redacted;
}

module.exports = {
  encrypt,
  decrypt,
  hashPassword,
  verifyPassword,
  generateToken,
  generateApiKey,
  hashApiKey,
  encryptFields,
  decryptFields,
  createHmacSignature,
  verifyHmacSignature,
  maskSensitive,
  redactForLogging,
};
