/**
 * Retry a function with exponential backoff
 * @param {Function} fn - The async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} baseDelay - Base delay in milliseconds (default: 1000ms)
 * @returns {Promise} - The result of the function
 */
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Calculate exponential backoff: baseDelay * 2^attempt + random jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      
      console.warn(`Attempt ${attempt + 1} failed. Retrying in ${Math.round(delay)}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

/**
 * Check if error is retryable (e.g., network error, server congestion)
 * @param {Error} error - The error to check
 * @returns {boolean} - Whether the error is retryable
 */
export const isRetryableError = (error) => {
  const retryableStatuses = [408, 429, 500, 502, 503, 504];
  const retryableMessages = ['timeout', 'congested', 'network', 'fetch'];
  
  if (error.status && retryableStatuses.includes(error.status)) {
    return true;
  }
  
  if (error.message) {
    return retryableMessages.some(msg => 
      error.message.toLowerCase().includes(msg)
    );
  }
  
  return false;
};
