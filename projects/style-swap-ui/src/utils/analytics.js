/**
 * Analytics tracking utilities
 * Placeholder implementation for Google Analytics 4 (GA4)
 */

class Analytics {
  constructor() {
    this.isInitialized = false;
    this.debugMode = process.env.NODE_ENV === 'development';
  }

  /**
   * Initialize analytics
   * @param {string} measurementId - GA4 Measurement ID
   */
  init(measurementId) {
    if (this.isInitialized) return;

    // In production, initialize GA4 here
    if (this.debugMode) {
      console.log('[Analytics] Initialized (debug mode)', { measurementId });
    } else {
      // Load GA4 script
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', measurementId);
    }

    this.isInitialized = true;
  }

  /**
   * Track page view
   * @param {string} pageName - Name of the page
   * @param {Object} properties - Additional properties
   */
  trackPageView(pageName, properties = {}) {
    if (this.debugMode) {
      console.log('[Analytics] Page View:', { pageName, ...properties });
      return;
    }

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageName,
        ...properties
      });
    }
  }

  /**
   * Track custom event
   * @param {string} eventName - Name of the event
   * @param {Object} properties - Event properties
   */
  trackEvent(eventName, properties = {}) {
    if (this.debugMode) {
      console.log('[Analytics] Event:', { eventName, ...properties });
      return;
    }

    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }
  }

  /**
   * Track user action
   * @param {string} action - Action type
   * @param {string} category - Category of the action
   * @param {string} label - Label for the action
   * @param {number} value - Optional numeric value
   */
  trackAction(action, category, label, value = null) {
    const eventData = {
      event_category: category,
      event_label: label
    };

    if (value !== null) {
      eventData.value = value;
    }

    this.trackEvent(action, eventData);
  }

  /**
   * Track error
   * @param {string} errorMessage - Error message
   * @param {Object} errorInfo - Additional error information
   */
  trackError(errorMessage, errorInfo = {}) {
    this.trackEvent('error', {
      error_message: errorMessage,
      ...errorInfo
    });
  }

  /**
   * Track timing
   * @param {string} category - Timing category
   * @param {string} variable - Timing variable
   * @param {number} time - Time in milliseconds
   */
  trackTiming(category, variable, time) {
    this.trackEvent('timing_complete', {
      name: variable,
      value: time,
      event_category: category
    });
  }
}

export const analytics = new Analytics();

// Convenience hooks for React components
export const useAnalytics = () => {
  const trackPageView = (pageName, properties) => 
    analytics.trackPageView(pageName, properties);
  
  const trackEvent = (eventName, properties) => 
    analytics.trackEvent(eventName, properties);
  
  const trackAction = (action, category, label, value) => 
    analytics.trackAction(action, category, label, value);
  
  const trackError = (errorMessage, errorInfo) => 
    analytics.trackError(errorMessage, errorInfo);

  return { trackPageView, trackEvent, trackAction, trackError };
};
