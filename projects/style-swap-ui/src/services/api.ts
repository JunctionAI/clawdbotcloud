// ============================================================================
// API Client Configuration
// ============================================================================

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import type { ApiError } from '../types';

// API Configuration
const API_CONFIG = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
  COMMERCE_URL: import.meta.env.VITE_COMMERCE_URL || 'http://localhost:3001',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

// Create axios instances
const backendClient: AxiosInstance = axios.create({
  baseURL: `${API_CONFIG.BACKEND_URL}/api`,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

const commerceClient: AxiosInstance = axios.create({
  baseURL: `${API_CONFIG.COMMERCE_URL}/api`,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies for cart session
});

// Request interceptor - Add common headers, auth tokens
backendClient.interceptors.request.use(
  (config) => {
    // Add session ID if available
    const sessionId = getSessionId();
    if (sessionId && config.headers) {
      config.headers['X-Session-ID'] = sessionId;
    }
    
    // Add UTM parameters if available
    const utmParams = getUTMParams();
    if (utmParams && config.params) {
      config.params = { ...config.params, ...utmParams };
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

commerceClient.interceptors.request.use(
  (config) => {
    const sessionId = getSessionId();
    if (sessionId && config.headers) {
      config.headers['X-Session-ID'] = sessionId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
const handleResponseError = (error: AxiosError<ApiError>) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        console.error('Bad Request:', data.error || 'Invalid request');
        break;
      case 401:
        console.error('Unauthorized:', data.error);
        // Handle authentication error
        break;
      case 403:
        console.error('Forbidden:', data.error);
        break;
      case 404:
        console.error('Not Found:', data.error);
        break;
      case 429:
        console.error('Rate Limit Exceeded:', data.error);
        // Implement exponential backoff
        break;
      case 500:
        console.error('Server Error:', data.error);
        break;
      default:
        console.error('API Error:', data.error || 'Unknown error');
    }
    
    return Promise.reject(data);
  } else if (error.request) {
    // Request made but no response
    console.error('Network Error: No response from server');
    return Promise.reject({ error: 'Network error. Please check your connection.' });
  } else {
    // Error in request setup
    console.error('Request Error:', error.message);
    return Promise.reject({ error: 'Failed to make request' });
  }
};

backendClient.interceptors.response.use(
  (response) => response,
  handleResponseError
);

commerceClient.interceptors.response.use(
  (response) => response,
  handleResponseError
);

// Retry logic for failed requests
const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  attempts: number = API_CONFIG.RETRY_ATTEMPTS,
  delay: number = API_CONFIG.RETRY_DELAY
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    if (attempts <= 1) throw error;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryRequest(requestFn, attempts - 1, delay * 2);
  }
};

// Utility functions
function getSessionId(): string {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

function getUTMParams(): Record<string, string> | null {
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(param => {
    const value = params.get(param);
    if (value) utmParams[param] = value;
  });
  
  return Object.keys(utmParams).length > 0 ? utmParams : null;
}

// Export clients and utilities
export { backendClient, commerceClient, retryRequest, API_CONFIG, getSessionId };
