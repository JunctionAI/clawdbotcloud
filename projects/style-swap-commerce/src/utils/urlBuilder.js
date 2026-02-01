const { v4: uuidv4 } = require('uuid');

/**
 * Build tracked URL with UTM parameters
 */
function buildTrackedUrl(baseUrl, utmParams = {}) {
  const url = new URL(baseUrl);
  
  const defaultParams = {
    utm_source: process.env.DEFAULT_UTM_SOURCE || 'styleswap',
    utm_medium: process.env.DEFAULT_UTM_MEDIUM || 'referral',
  };
  
  const allParams = { ...defaultParams, ...utmParams };
  
  Object.keys(allParams).forEach(key => {
    if (allParams[key]) {
      url.searchParams.set(key, allParams[key]);
    }
  });
  
  return url.toString();
}

/**
 * Generate short code for affiliate link
 */
function generateShortCode() {
  return uuidv4().substring(0, 8);
}

/**
 * Parse device type from user agent
 */
function parseDeviceType(userAgent) {
  if (!userAgent) return 'unknown';
  
  const ua = userAgent.toLowerCase();
  if (ua.includes('mobile') || ua.includes('android')) return 'mobile';
  if (ua.includes('tablet') || ua.includes('ipad')) return 'tablet';
  return 'desktop';
}

module.exports = {
  buildTrackedUrl,
  generateShortCode,
  parseDeviceType
};
