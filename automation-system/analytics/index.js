/**
 * Clawdbot Analytics Module
 * 
 * Privacy-first event tracking and business metrics.
 * 
 * @example
 * const analytics = require('./analytics');
 * 
 * // Track an event
 * analytics.track('skill_installed', { customerId: '...', skillId: '...' });
 * 
 * // Use convenience methods
 * analytics.trackSignup({ customerId: '...', tier: 'starter' });
 * 
 * // Use integrations
 * const wrappedHandler = analytics.integrations.wrapCheckoutCompleted(originalHandler);
 */

const tracker = require('./tracker');
const integrations = require('./integrations');
const aggregator = require('./aggregator');
const api = require('./api');

module.exports = {
  // Core tracking
  track: tracker.track,
  identify: tracker.identify,
  flush: tracker.flush,
  shutdown: tracker.shutdown,
  
  // Convenience methods
  trackSignup: tracker.trackSignup,
  trackSkillInstalled: tracker.trackSkillInstalled,
  trackSkillUsed: tracker.trackSkillUsed,
  trackMessage: tracker.trackMessage,
  trackResponse: tracker.trackResponse,
  trackUpgrade: tracker.trackUpgrade,
  trackDowngrade: tracker.trackDowngrade,
  trackCancellation: tracker.trackCancellation,
  trackPayment: tracker.trackPayment,
  trackPaymentFailed: tracker.trackPaymentFailed,
  trackDailyActive: tracker.trackDailyActive,
  trackAtRisk: tracker.trackAtRisk,
  
  // Utilities
  hashCustomerId: tracker.hashCustomerId,
  
  // Integrations (wrappers for existing code)
  integrations,
  
  // Aggregation worker (for cron jobs)
  aggregator,
  
  // API router (for Express)
  router: api,
};
