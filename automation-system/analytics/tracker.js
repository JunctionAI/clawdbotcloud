/**
 * Clawdbot Analytics Tracker
 * 
 * Privacy-first event tracking with batching, retry, and anonymization.
 * 
 * @example
 * const { track, identify, flush } = require('./analytics/tracker');
 * 
 * // Track an event
 * track('skill_installed', { 
 *   customerId: 'uuid',  // Will be hashed automatically
 *   skillId: 'email',
 *   skillName: 'Email Manager'
 * });
 * 
 * // Identify a customer (for aggregation only)
 * identify('customer-uuid', { tier: 'professional' });
 */

const crypto = require('crypto');
const { Pool } = require('pg');

// Configuration
const CONFIG = {
  // Batching
  batchSize: 50,
  flushIntervalMs: 10000, // 10 seconds
  maxQueueSize: 1000,
  
  // Retry
  maxRetries: 3,
  retryDelayMs: 1000,
  
  // Privacy
  hashSalt: process.env.ANALYTICS_SALT || 'default-dev-salt-change-in-prod',
  
  // Database
  tableName: 'analytics_events',
  
  // Environment
  environment: process.env.NODE_ENV || 'development',
  appVersion: process.env.APP_VERSION || '1.0.0',
};

// Database connection (lazy initialization)
let pool = null;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.ANALYTICS_DATABASE_URL || process.env.DATABASE_URL,
      max: 5,
    });
  }
  return pool;
}

// Event queue for batching
let eventQueue = [];
let flushTimer = null;

/**
 * Hash customer ID for privacy
 * @param {string} customerId - Raw customer ID
 * @returns {string} - Hashed, anonymized ID
 */
function hashCustomerId(customerId) {
  if (!customerId) return null;
  
  return crypto
    .createHmac('sha256', CONFIG.hashSalt)
    .update(String(customerId))
    .digest('hex')
    .substring(0, 16);
}

/**
 * Generate unique event ID
 * @returns {string} - UUID v4
 */
function generateEventId() {
  return crypto.randomUUID();
}

/**
 * Sanitize event properties (remove PII)
 * @param {Object} properties - Raw properties
 * @returns {Object} - Sanitized properties
 */
function sanitizeProperties(properties) {
  const sanitized = { ...properties };
  
  // Remove known PII fields
  const piiFields = ['email', 'name', 'phone', 'address', 'ip', 'user_agent'];
  piiFields.forEach(field => delete sanitized[field]);
  
  // Hash customer ID if present
  if (sanitized.customerId) {
    sanitized.customer_id_hash = hashCustomerId(sanitized.customerId);
    delete sanitized.customerId;
  }
  
  // Hash any field ending in _id except skill_id, channel_id
  const preserveIds = ['skill_id', 'channel_id', 'event_id', 'deployment_id'];
  Object.keys(sanitized).forEach(key => {
    if (key.endsWith('_id') && !preserveIds.includes(key)) {
      sanitized[`${key}_hash`] = hashCustomerId(sanitized[key]);
      delete sanitized[key];
    }
  });
  
  return sanitized;
}

/**
 * Track an analytics event
 * @param {string} eventName - Event name (e.g., 'skill_installed')
 * @param {Object} properties - Event properties
 * @param {Object} options - Tracking options
 */
function track(eventName, properties = {}, options = {}) {
  // Validate event name
  if (!eventName || typeof eventName !== 'string') {
    console.warn('[Analytics] Invalid event name:', eventName);
    return;
  }
  
  // Build event object
  const event = {
    event_id: generateEventId(),
    event_name: eventName,
    properties: sanitizeProperties(properties),
    timestamp: new Date().toISOString(),
    environment: CONFIG.environment,
    app_version: CONFIG.appVersion,
    event_source: options.source || 'clawdbot-core',
  };
  
  // Add to queue
  eventQueue.push(event);
  
  // Log in development
  if (CONFIG.environment === 'development') {
    console.log('[Analytics]', eventName, event.properties);
  }
  
  // Check if we should flush
  if (eventQueue.length >= CONFIG.batchSize) {
    flush();
  } else if (!flushTimer) {
    // Start flush timer
    flushTimer = setTimeout(() => flush(), CONFIG.flushIntervalMs);
  }
  
  // Protect against memory overflow
  if (eventQueue.length > CONFIG.maxQueueSize) {
    console.warn('[Analytics] Queue overflow, dropping oldest events');
    eventQueue = eventQueue.slice(-CONFIG.batchSize);
  }
  
  return event.event_id;
}

/**
 * Identify a customer (stores traits for later aggregation)
 * @param {string} customerId - Customer ID
 * @param {Object} traits - Customer traits (tier, signup_date, etc.)
 */
function identify(customerId, traits = {}) {
  track('customer_identified', {
    customerId,
    ...traits,
  }, { source: 'identify' });
}

/**
 * Flush events to database
 * @param {boolean} sync - Wait for completion (for shutdown)
 */
async function flush(sync = false) {
  // Clear timer
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  
  // Get events to flush
  const eventsToFlush = eventQueue.splice(0, CONFIG.batchSize);
  
  if (eventsToFlush.length === 0) {
    return;
  }
  
  const flushPromise = flushEvents(eventsToFlush);
  
  if (sync) {
    await flushPromise;
  }
}

/**
 * Actually flush events to database with retry
 * @param {Array} events - Events to flush
 */
async function flushEvents(events, attempt = 1) {
  try {
    const pool = getPool();
    
    // Build bulk insert
    const values = events.map((event, i) => {
      const offset = i * 6;
      return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6})`;
    }).join(', ');
    
    const params = events.flatMap(event => [
      event.event_id,
      event.event_name,
      JSON.stringify(event.properties),
      event.timestamp,
      event.environment,
      event.event_source,
    ]);
    
    const query = `
      INSERT INTO ${CONFIG.tableName} 
        (event_id, event_name, properties, timestamp, environment, event_source)
      VALUES ${values}
      ON CONFLICT (event_id) DO NOTHING
    `;
    
    await pool.query(query, params);
    
    if (CONFIG.environment === 'development') {
      console.log(`[Analytics] Flushed ${events.length} events`);
    }
    
  } catch (error) {
    console.error(`[Analytics] Flush failed (attempt ${attempt}):`, error.message);
    
    // Retry with exponential backoff
    if (attempt < CONFIG.maxRetries) {
      await sleep(CONFIG.retryDelayMs * Math.pow(2, attempt - 1));
      return flushEvents(events, attempt + 1);
    }
    
    // Final failure - log events for recovery
    console.error('[Analytics] Events lost:', events.map(e => e.event_name));
  }
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Shutdown analytics (flush remaining events)
 */
async function shutdown() {
  console.log('[Analytics] Shutting down, flushing remaining events...');
  await flush(true);
  
  // Flush any remaining
  while (eventQueue.length > 0) {
    await flush(true);
  }
  
  if (pool) {
    await pool.end();
  }
  
  console.log('[Analytics] Shutdown complete');
}

// Handle process shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// ============================================================
// Convenience tracking methods for common events
// ============================================================

/**
 * Track user signup
 */
function trackSignup({ customerId, tier, source = 'organic', trial = false, referralCode = null }) {
  track('user_signup', {
    customerId,
    tier,
    signup_source: source,
    trial,
    referral_code: referralCode,
  });
}

/**
 * Track skill installation
 */
function trackSkillInstalled({ customerId, skillId, skillName, category, isPremium = false, source = 'manual' }) {
  track('skill_installed', {
    customerId,
    skill_id: skillId,
    skill_name: skillName,
    skill_category: category,
    is_premium: isPremium,
    install_source: source,
  });
}

/**
 * Track skill usage
 */
function trackSkillUsed({ customerId, skillId, skillName, context = 'manual', success = true, errorType = null }) {
  track('skill_used', {
    customerId,
    skill_id: skillId,
    skill_name: skillName,
    usage_context: context,
    success,
    error_type: errorType,
  });
}

/**
 * Track message sent
 */
function trackMessage({ customerId, channel, messageLength, isCommand = false, hasAttachment = false }) {
  const lengthBucket = messageLength < 50 ? 'short' : messageLength < 200 ? 'medium' : 'long';
  
  track('message_sent', {
    customerId,
    channel,
    message_length_bucket: lengthBucket,
    is_command: isCommand,
    has_attachment: hasAttachment,
  });
}

/**
 * Track response generated
 */
function trackResponse({ customerId, channel, responseTimeMs, tokenCount, skillsInvoked = [], model = 'sonnet' }) {
  const tokenBucket = tokenCount < 500 ? 'small' : tokenCount < 2000 ? 'medium' : 'large';
  
  track('response_generated', {
    customerId,
    channel,
    response_time_ms: responseTimeMs,
    token_count_bucket: tokenBucket,
    skills_invoked: skillsInvoked,
    model_used: model,
  });
}

/**
 * Track plan upgrade
 */
function trackUpgrade({ customerId, previousTier, newTier, mrrChangeCents, trigger = 'proactive', daysOnPrevious }) {
  track('plan_upgraded', {
    customerId,
    previous_tier: previousTier,
    new_tier: newTier,
    mrr_change_cents: mrrChangeCents,
    upgrade_trigger: trigger,
    days_on_previous_tier: daysOnPrevious,
  });
}

/**
 * Track plan downgrade
 */
function trackDowngrade({ customerId, previousTier, newTier, mrrChangeCents, reason = 'unknown', daysOnPrevious }) {
  track('plan_downgraded', {
    customerId,
    previous_tier: previousTier,
    new_tier: newTier,
    mrr_change_cents: mrrChangeCents,
    downgrade_reason: reason,
    days_on_previous_tier: daysOnPrevious,
  });
}

/**
 * Track subscription cancellation
 */
function trackCancellation({ customerId, tier, tenureDays, totalPaidCents, reason = 'unknown', source = 'user' }) {
  track('subscription_cancelled', {
    customerId,
    tier,
    tenure_days: tenureDays,
    total_paid_cents: totalPaidCents,
    cancellation_reason: reason,
    cancellation_source: source,
  });
}

/**
 * Track payment event
 */
function trackPayment({ customerId, amountCents, currency = 'USD', type = 'subscription', billingPeriod = 'monthly' }) {
  track('payment_succeeded', {
    customerId,
    amount_cents: amountCents,
    currency,
    payment_type: type,
    billing_period: billingPeriod,
  });
}

/**
 * Track payment failure
 */
function trackPaymentFailed({ customerId, reason, attemptNumber, amountCents }) {
  track('payment_failed', {
    customerId,
    failure_reason: reason,
    attempt_number: attemptNumber,
    amount_cents: amountCents,
  });
}

/**
 * Track daily active signal
 */
function trackDailyActive({ customerId, tier, daysSinceSignup, consecutiveActiveDays }) {
  track('daily_active', {
    customerId,
    tier,
    days_since_signup: daysSinceSignup,
    consecutive_active_days: consecutiveActiveDays,
  });
}

/**
 * Track at-risk user identification
 */
function trackAtRisk({ customerId, tier, riskLevel, riskFactors, daysSinceLastActive }) {
  track('at_risk_identified', {
    customerId,
    tier,
    risk_level: riskLevel,
    risk_factors: riskFactors,
    days_since_last_active: daysSinceLastActive,
  });
}

module.exports = {
  // Core
  track,
  identify,
  flush,
  shutdown,
  
  // Utilities
  hashCustomerId,
  
  // Convenience methods
  trackSignup,
  trackSkillInstalled,
  trackSkillUsed,
  trackMessage,
  trackResponse,
  trackUpgrade,
  trackDowngrade,
  trackCancellation,
  trackPayment,
  trackPaymentFailed,
  trackDailyActive,
  trackAtRisk,
};
