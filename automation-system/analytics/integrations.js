/**
 * Analytics Integration Hooks
 * 
 * Drop-in integrations for existing Clawdbot services.
 * Import and use these to add analytics to existing code with minimal changes.
 */

const analytics = require('./tracker');

// ============================================================
// STRIPE WEBHOOK INTEGRATIONS
// ============================================================

/**
 * Wrap Stripe checkout.session.completed handler
 * @param {Function} originalHandler - Original handler function
 * @returns {Function} - Wrapped handler with analytics
 */
function wrapCheckoutCompleted(originalHandler) {
  return async function(session) {
    const result = await originalHandler(session);
    
    // Track signup
    analytics.trackSignup({
      customerId: result?.customerId || session.customer,
      tier: session.metadata?.tier || 'starter',
      source: session.metadata?.utm_source || 'direct',
      trial: session.metadata?.trial === 'true',
      referralCode: session.metadata?.referral_code,
    });
    
    // Track payment
    if (session.amount_total) {
      analytics.trackPayment({
        customerId: result?.customerId || session.customer,
        amountCents: session.amount_total,
        currency: session.currency?.toUpperCase() || 'USD',
        type: 'subscription',
        billingPeriod: session.metadata?.billing_period || 'monthly',
      });
    }
    
    return result;
  };
}

/**
 * Wrap Stripe subscription.updated handler
 * @param {Function} originalHandler - Original handler function  
 * @returns {Function} - Wrapped handler with analytics
 */
function wrapSubscriptionUpdated(originalHandler) {
  return async function(subscription) {
    // Get previous tier from metadata or database
    const previousTier = subscription.metadata?.previous_tier;
    const newTier = detectTierFromSubscription(subscription);
    
    const result = await originalHandler(subscription);
    
    // Detect upgrade or downgrade
    const tierOrder = { starter: 1, professional: 2, enterprise: 3 };
    
    if (previousTier && tierOrder[newTier] > tierOrder[previousTier]) {
      analytics.trackUpgrade({
        customerId: subscription.customer,
        previousTier,
        newTier,
        mrrChangeCents: calculateMRRChange(previousTier, newTier),
        trigger: subscription.metadata?.upgrade_trigger || 'proactive',
        daysOnPrevious: parseInt(subscription.metadata?.days_on_tier) || 0,
      });
    } else if (previousTier && tierOrder[newTier] < tierOrder[previousTier]) {
      analytics.trackDowngrade({
        customerId: subscription.customer,
        previousTier,
        newTier,
        mrrChangeCents: calculateMRRChange(previousTier, newTier),
        reason: subscription.metadata?.downgrade_reason || 'unknown',
        daysOnPrevious: parseInt(subscription.metadata?.days_on_tier) || 0,
      });
    }
    
    return result;
  };
}

/**
 * Wrap Stripe subscription.deleted handler
 * @param {Function} originalHandler - Original handler function
 * @returns {Function} - Wrapped handler with analytics  
 */
function wrapSubscriptionDeleted(originalHandler) {
  return async function(subscription) {
    const result = await originalHandler(subscription);
    
    analytics.trackCancellation({
      customerId: subscription.customer,
      tier: detectTierFromSubscription(subscription),
      tenureDays: parseInt(subscription.metadata?.tenure_days) || 0,
      totalPaidCents: parseInt(subscription.metadata?.total_paid) || 0,
      reason: subscription.cancellation_details?.reason || 'unknown',
      source: subscription.canceled_at ? 'user' : 'payment_failure',
    });
    
    return result;
  };
}

/**
 * Wrap Stripe invoice.payment_failed handler
 * @param {Function} originalHandler - Original handler function
 * @returns {Function} - Wrapped handler with analytics
 */
function wrapPaymentFailed(originalHandler) {
  return async function(invoice) {
    const result = await originalHandler(invoice);
    
    analytics.trackPaymentFailed({
      customerId: invoice.customer,
      reason: mapStripeFailureReason(invoice.last_payment_error?.code),
      attemptNumber: invoice.attempt_count,
      amountCents: invoice.amount_due,
    });
    
    return result;
  };
}

// ============================================================
// PROVISIONING INTEGRATIONS
// ============================================================

/**
 * Wrap provisionAgent function
 * @param {Function} originalProvisioner - Original provisionAgent function
 * @returns {Function} - Wrapped function with analytics
 */
function wrapProvisionAgent(originalProvisioner) {
  return async function({ customerId, tier, email }) {
    // Track onboarding start
    analytics.track('onboarding_started', {
      customerId,
      tier,
    });
    
    const startTime = Date.now();
    
    try {
      const result = await originalProvisioner({ customerId, tier, email });
      
      // Track onboarding completion
      analytics.track('onboarding_completed', {
        customerId,
        tier,
        total_onboarding_time_minutes: Math.round((Date.now() - startTime) / 60000),
        skills_installed_count: 0, // Will be updated later
      });
      
      return result;
    } catch (error) {
      // Track provisioning failure
      analytics.track('provisioning_failed', {
        customerId,
        tier,
        error_category: categorizeError(error),
        time_to_failure_seconds: Math.round((Date.now() - startTime) / 1000),
      });
      
      throw error;
    }
  };
}

// ============================================================
// MESSAGE HANDLING INTEGRATIONS
// ============================================================

/**
 * Create middleware for message tracking
 * @returns {Function} - Middleware function
 */
function createMessageMiddleware() {
  const sessionTracker = new Map(); // customerId -> sessionData
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
  
  return async function trackMessageMiddleware(context, next) {
    const { customerId, channel, message, isCommand } = context;
    const startTime = Date.now();
    
    // Get or create session
    let session = sessionTracker.get(customerId);
    const now = Date.now();
    
    if (!session || (now - session.lastActivity) > SESSION_TIMEOUT_MS) {
      // New session
      if (session) {
        // End previous session
        analytics.track('session_ended', {
          customerId,
          channel: session.channel,
          session_duration_seconds: Math.round((session.lastActivity - session.startTime) / 1000),
          message_count: session.messageCount,
          skills_used_count: session.skillsUsed.size,
        });
      }
      
      // Start new session
      session = {
        startTime: now,
        lastActivity: now,
        messageCount: 0,
        skillsUsed: new Set(),
        channel,
      };
      sessionTracker.set(customerId, session);
      
      analytics.track('session_started', {
        customerId,
        channel,
        tier: context.tier,
      });
    }
    
    // Track message
    analytics.trackMessage({
      customerId,
      channel,
      messageLength: message?.length || 0,
      isCommand,
      hasAttachment: context.hasAttachment || false,
    });
    
    session.messageCount++;
    session.lastActivity = now;
    
    // Execute handler
    const result = await next();
    
    // Track response
    const responseTime = Date.now() - startTime;
    
    analytics.trackResponse({
      customerId,
      channel,
      responseTimeMs: responseTime,
      tokenCount: result?.tokenCount || 0,
      skillsInvoked: result?.skillsUsed || [],
      model: result?.model || 'sonnet',
    });
    
    // Track skills used
    (result?.skillsUsed || []).forEach(skillId => {
      session.skillsUsed.add(skillId);
    });
    
    return result;
  };
}

/**
 * Track skill installation
 * @param {Object} params - Installation params
 */
function trackSkillInstallation({ customerId, skill, source = 'manual' }) {
  analytics.trackSkillInstalled({
    customerId,
    skillId: skill.id,
    skillName: skill.name,
    category: skill.category || 'other',
    isPremium: skill.premium || false,
    source,
  });
}

/**
 * Track skill execution
 * @param {Object} params - Execution params
 */
function trackSkillExecution({ customerId, skill, success, errorType = null, context = 'manual' }) {
  analytics.trackSkillUsed({
    customerId,
    skillId: skill.id,
    skillName: skill.name,
    context,
    success,
    errorType,
  });
}

// ============================================================
// DAILY ACTIVITY TRACKING
// ============================================================

/**
 * Track daily active users (call once per day per user)
 */
async function trackDailyActiveIfNeeded(customerId, tier) {
  // Use a simple in-memory set to avoid duplicate tracking
  // In production, use Redis or database
  const today = new Date().toISOString().split('T')[0];
  const key = `${customerId}:${today}`;
  
  if (!trackDailyActiveIfNeeded.tracked) {
    trackDailyActiveIfNeeded.tracked = new Set();
  }
  
  if (trackDailyActiveIfNeeded.tracked.has(key)) {
    return; // Already tracked today
  }
  
  trackDailyActiveIfNeeded.tracked.add(key);
  
  // Get customer stats from database or cache
  const stats = await getCustomerStats(customerId);
  
  analytics.trackDailyActive({
    customerId,
    tier,
    daysSinceSignup: stats?.daysSinceSignup || 0,
    consecutiveActiveDays: stats?.consecutiveActiveDays || 1,
  });
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function detectTierFromSubscription(subscription) {
  const priceId = subscription.items?.data[0]?.price.id;
  
  const tierMap = {
    [process.env.STRIPE_STARTER_PRICE_ID]: 'starter',
    [process.env.STRIPE_PRO_PRICE_ID]: 'professional',
    [process.env.STRIPE_ENTERPRISE_PRICE_ID]: 'enterprise',
  };
  
  return tierMap[priceId] || 'starter';
}

function calculateMRRChange(fromTier, toTier) {
  const prices = {
    starter: 1250,
    professional: 4900,
    enterprise: 14900,
  };
  
  return (prices[toTier] || 0) - (prices[fromTier] || 0);
}

function mapStripeFailureReason(stripeCode) {
  const mapping = {
    'card_declined': 'card_declined',
    'insufficient_funds': 'insufficient_funds',
    'expired_card': 'expired',
    'incorrect_cvc': 'card_declined',
    'processing_error': 'other',
  };
  
  return mapping[stripeCode] || 'other';
}

function categorizeError(error) {
  const message = error.message?.toLowerCase() || '';
  
  if (message.includes('timeout')) return 'timeout';
  if (message.includes('rate limit')) return 'rate_limit';
  if (message.includes('authentication')) return 'auth';
  if (message.includes('network')) return 'network';
  
  return 'unknown';
}

async function getCustomerStats(customerId) {
  // Placeholder - implement with actual database query
  return {
    daysSinceSignup: 0,
    consecutiveActiveDays: 1,
  };
}

// ============================================================
// PAGE VIEW TRACKING (For landing pages)
// ============================================================

/**
 * Track page view (for landing page integration)
 */
function trackPageView({ page, referrer, utmParams = {}, deviceType = 'desktop' }) {
  analytics.track('page_viewed', {
    page,
    referrer_type: categorizeReferrer(referrer),
    utm_source: utmParams.source,
    utm_medium: utmParams.medium,
    utm_campaign: utmParams.campaign,
    device_type: deviceType,
  });
}

/**
 * Track CTA click
 */
function trackCTAClick({ location, text, tierSelected }) {
  analytics.track('cta_clicked', {
    cta_location: location,
    cta_text: text,
    tier_selected: tierSelected,
  });
}

/**
 * Track checkout start
 */
function trackCheckoutStart({ tier, priceCents, currency = 'USD', billingPeriod = 'monthly' }) {
  analytics.track('checkout_started', {
    tier,
    price_cents: priceCents,
    currency,
    billing_period: billingPeriod,
  });
}

function categorizeReferrer(referrer) {
  if (!referrer) return 'direct';
  
  const url = referrer.toLowerCase();
  
  if (url.includes('google') || url.includes('bing') || url.includes('duckduckgo')) {
    return 'organic';
  }
  if (url.includes('facebook') || url.includes('twitter') || url.includes('linkedin')) {
    return 'social';
  }
  if (url.includes('gclid') || url.includes('utm_medium=cpc')) {
    return 'paid';
  }
  if (url.includes('email') || url.includes('newsletter')) {
    return 'email';
  }
  
  return 'referral';
}

module.exports = {
  // Stripe wrappers
  wrapCheckoutCompleted,
  wrapSubscriptionUpdated,
  wrapSubscriptionDeleted,
  wrapPaymentFailed,
  
  // Provisioning wrappers
  wrapProvisionAgent,
  
  // Message tracking
  createMessageMiddleware,
  trackSkillInstallation,
  trackSkillExecution,
  trackDailyActiveIfNeeded,
  
  // Page tracking (landing page)
  trackPageView,
  trackCTAClick,
  trackCheckoutStart,
  
  // Re-export core tracker
  analytics,
};
