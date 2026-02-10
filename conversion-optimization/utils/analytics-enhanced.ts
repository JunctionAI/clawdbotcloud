/**
 * Enhanced Analytics for Landing Pages
 * 
 * Privacy-first client-side tracking that integrates with the Clawdbot analytics system.
 * Sends events to the backend API which handles anonymization.
 */

// Configuration
const ANALYTICS_ENDPOINT = process.env.NEXT_PUBLIC_ANALYTICS_URL || '/api/analytics/track';
const BATCH_SIZE = 10;
const FLUSH_INTERVAL_MS = 5000;

// Event queue
let eventQueue: AnalyticsEvent[] = [];
let flushTimer: NodeJS.Timeout | null = null;

interface AnalyticsEvent {
  event_name: string;
  properties: Record<string, any>;
  timestamp: string;
  session_id: string;
  page_url: string;
}

// Session management
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// ============================================================
// CORE TRACKING
// ============================================================

/**
 * Track an analytics event
 */
export function trackEvent(eventName: string, properties: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return; // SSR guard
  
  const event: AnalyticsEvent = {
    event_name: eventName,
    properties: {
      ...properties,
      // Add standard context
      referrer: document.referrer || 'direct',
      user_agent_category: detectDeviceCategory(),
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
    },
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    page_url: window.location.pathname,
  };
  
  // Add UTM params if available
  const utmParams = getUTMParams();
  if (Object.keys(utmParams).length > 0) {
    event.properties.utm = utmParams;
  }
  
  // Add to queue
  eventQueue.push(event);
  
  // Dev logging
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics:', eventName, event.properties);
  }
  
  // Flush if batch is full
  if (eventQueue.length >= BATCH_SIZE) {
    flushEvents();
  } else if (!flushTimer) {
    flushTimer = setTimeout(flushEvents, FLUSH_INTERVAL_MS);
  }
}

/**
 * Flush events to backend
 */
async function flushEvents(): Promise<void> {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  
  if (eventQueue.length === 0) return;
  
  const eventsToSend = eventQueue.splice(0, BATCH_SIZE);
  
  try {
    // Use sendBeacon for reliability (works even on page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        ANALYTICS_ENDPOINT,
        JSON.stringify({ events: eventsToSend })
      );
    } else {
      // Fallback to fetch
      await fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: eventsToSend }),
        keepalive: true, // Allow request to outlive page
      });
    }
  } catch (error) {
    // Re-queue on failure (but don't overflow)
    if (eventQueue.length < 100) {
      eventQueue.unshift(...eventsToSend);
    }
    console.error('Analytics flush failed:', error);
  }
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
    const value = params.get(key);
    if (value) utm[key.replace('utm_', '')] = value;
  });
  
  return utm;
}

function detectDeviceCategory(): 'desktop' | 'tablet' | 'mobile' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function categorizeReferrer(referrer: string): string {
  if (!referrer) return 'direct';
  
  const url = referrer.toLowerCase();
  if (url.includes('google') || url.includes('bing') || url.includes('duckduckgo')) return 'organic';
  if (url.includes('facebook') || url.includes('twitter') || url.includes('linkedin')) return 'social';
  if (url.includes('gclid') || url.includes('utm_medium=cpc')) return 'paid';
  if (url.includes('email') || url.includes('newsletter')) return 'email';
  return 'referral';
}

// ============================================================
// CONVENIENCE METHODS
// ============================================================

/**
 * Track page view
 */
export function trackPageView(pageName?: string): void {
  trackEvent('page_viewed', {
    page: pageName || window.location.pathname,
    referrer_type: categorizeReferrer(document.referrer),
    device_type: detectDeviceCategory(),
  });
}

/**
 * Track CTA click
 */
export function trackCTAClick(
  location: 'hero' | 'pricing_card' | 'features' | 'footer' | 'nav',
  text: string,
  tierSelected?: string
): void {
  trackEvent('cta_clicked', {
    cta_location: location,
    cta_text: text,
    tier_selected: tierSelected,
  });
}

/**
 * Track pricing page interaction
 */
export function trackPricingViewed(tierFocused?: string): void {
  trackEvent('pricing_viewed', {
    tier_focused: tierFocused,
  });
}

/**
 * Track checkout start
 */
export function trackCheckoutStart(
  tier: 'starter' | 'professional' | 'enterprise',
  priceCents: number,
  billingPeriod: 'monthly' | 'yearly' = 'monthly'
): void {
  trackEvent('checkout_started', {
    tier,
    price_cents: priceCents,
    billing_period: billingPeriod,
  });
}

/**
 * Track checkout abandonment
 */
export function trackCheckoutAbandoned(
  tier: string,
  stepAbandoned: 'email' | 'payment' | 'review'
): void {
  trackEvent('checkout_abandoned', {
    tier,
    step_abandoned: stepAbandoned,
  });
}

/**
 * Track feature section view
 */
export function trackFeatureView(featureName: string): void {
  trackEvent('feature_viewed', {
    feature_name: featureName,
  });
}

/**
 * Track testimonial interaction
 */
export function trackTestimonialView(testimonialId: string): void {
  trackEvent('testimonial_viewed', {
    testimonial_id: testimonialId,
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number): void {
  trackEvent('scroll_depth', {
    depth_percentage: percentage,
  });
}

/**
 * Track exit intent
 */
export function trackExitIntent(action: 'shown' | 'dismissed' | 'converted'): void {
  trackEvent('exit_intent', { action });
}

/**
 * Track timer/urgency element
 */
export function trackTimerExpired(timerType: string): void {
  trackEvent('timer_expired', { timer_type: timerType });
}

/**
 * Track video engagement
 */
export function trackVideoEngagement(
  action: 'play' | 'pause' | 'complete' | 'progress',
  videoId: string,
  progressPercent?: number
): void {
  trackEvent('video_engagement', {
    action,
    video_id: videoId,
    progress_percent: progressPercent,
  });
}

/**
 * Track form field interaction
 */
export function trackFormField(fieldName: string, action: 'focus' | 'blur' | 'error'): void {
  trackEvent('form_field', {
    field_name: fieldName,
    action,
  });
}

// ============================================================
// AUTO-TRACKING SETUP
// ============================================================

/**
 * Initialize auto-tracking for common events
 */
export function initAutoTracking(): void {
  if (typeof window === 'undefined') return;
  
  // Track page view on load
  trackPageView();
  
  // Track page views on navigation (for SPAs)
  if (typeof window !== 'undefined') {
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      trackPageView();
    };
    
    window.addEventListener('popstate', () => trackPageView());
  }
  
  // Track scroll depth
  let maxScrollDepth = 0;
  const scrollMilestones = [25, 50, 75, 100];
  
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    scrollMilestones.forEach(milestone => {
      if (scrollPercent >= milestone && maxScrollDepth < milestone) {
        maxScrollDepth = milestone;
        trackScrollDepth(milestone);
      }
    });
  }, { passive: true });
  
  // Flush events on page unload
  window.addEventListener('beforeunload', () => {
    flushEvents();
  });
  
  // Flush events on visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushEvents();
    }
  });
}

// ============================================================
// REACT HOOKS
// ============================================================

/**
 * Hook to track component visibility
 */
export function useTrackVisibility(elementRef: React.RefObject<HTMLElement>, eventName: string, properties: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;
  
  const hasTracked = { current: false };
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          trackEvent(eventName, properties);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  if (elementRef.current) {
    observer.observe(elementRef.current);
  }
  
  return () => observer.disconnect();
}

// Export everything
export default {
  trackEvent,
  trackPageView,
  trackCTAClick,
  trackPricingViewed,
  trackCheckoutStart,
  trackCheckoutAbandoned,
  trackFeatureView,
  trackTestimonialView,
  trackScrollDepth,
  trackExitIntent,
  trackTimerExpired,
  trackVideoEngagement,
  trackFormField,
  initAutoTracking,
  useTrackVisibility,
};
