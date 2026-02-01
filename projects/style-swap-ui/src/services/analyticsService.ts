// ============================================================================
// Analytics Service - Tracks user actions and behavior
// ============================================================================

import { commerceClient, getSessionId } from './api';
import type { UserAction, AnalyticsOverview, ProductStats } from '../types';

class AnalyticsService {
  private readonly ANALYTICS_QUEUE_KEY = 'analytics_queue';
  private readonly BATCH_SIZE = 10;
  private readonly FLUSH_INTERVAL = 30000; // 30 seconds
  private flushTimer: number | null = null;

  constructor() {
    // Start periodic flush
    this.startPeriodicFlush();
    
    // Flush on page unload
    window.addEventListener('beforeunload', () => this.flush());
  }

  // ============================================================================
  // User Action Tracking
  // ============================================================================

  /**
   * Track user action - queues events for batch processing
   */
  track(action: UserAction['action'], metadata?: Record<string, any>): void {
    const event: UserAction = {
      action,
      metadata: {
        ...metadata,
        sessionId: getSessionId(),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
      },
      timestamp: new Date().toISOString(),
    };

    this.queueEvent(event);
    
    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics:', event);
    }
  }

  /**
   * Track page view
   */
  trackPageView(pageName: string): void {
    this.track('upload', { page: pageName });
  }

  /**
   * Track photo upload
   */
  trackUpload(fileSize: number, fileType: string): void {
    this.track('upload', { fileSize, fileType });
  }

  /**
   * Track style swap action
   */
  trackSwap(productId?: string, productSlug?: string): void {
    this.track('swap', { productId, productSlug });
  }

  /**
   * Track product selection
   */
  trackProductSelection(productId: string, productSlug: string, productName: string): void {
    this.track('select_product', { 
      productId, 
      productSlug, 
      productName 
    });
  }

  /**
   * Track viewing results
   */
  trackViewResults(productId?: string, transformationTime?: number): void {
    this.track('view_results', { 
      productId, 
      transformationTime 
    });
  }

  /**
   * Track "Buy Now" click
   */
  trackBuyNowClick(productId: string, affiliateLinkId: string, price: number): void {
    this.track('click_buy', { 
      productId, 
      affiliateLinkId, 
      price 
    });
  }

  /**
   * Track "Add to Cart" action
   */
  trackAddToCart(productId: string, affiliateLinkId: string, quantity: number): void {
    this.track('add_to_cart', { 
      productId, 
      affiliateLinkId, 
      quantity 
    });
  }

  /**
   * Track share action
   */
  trackShare(method: string, productId?: string): void {
    this.track('share', { method, productId });
  }

  /**
   * Track download action
   */
  trackDownload(productId?: string): void {
    this.track('download', { productId });
  }

  // ============================================================================
  // Event Queue Management
  // ============================================================================

  /**
   * Queue event for batch sending
   */
  private queueEvent(event: UserAction): void {
    try {
      const queue = this.getQueue();
      queue.push(event);
      localStorage.setItem(this.ANALYTICS_QUEUE_KEY, JSON.stringify(queue));

      // Flush if queue is full
      if (queue.length >= this.BATCH_SIZE) {
        this.flush();
      }
    } catch (error) {
      console.error('Failed to queue analytics event:', error);
    }
  }

  /**
   * Get current event queue
   */
  private getQueue(): UserAction[] {
    try {
      const queueData = localStorage.getItem(this.ANALYTICS_QUEUE_KEY);
      return queueData ? JSON.parse(queueData) : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Flush queued events to server
   */
  async flush(): Promise<void> {
    const queue = this.getQueue();
    if (queue.length === 0) return;

    try {
      // Send batch to analytics endpoint
      await commerceClient.post('/analytics/events', { events: queue });
      
      // Clear queue on success
      localStorage.removeItem(this.ANALYTICS_QUEUE_KEY);
      
      if (import.meta.env.DEV) {
        console.log(`📊 Flushed ${queue.length} analytics events`);
      }
    } catch (error) {
      console.error('Failed to flush analytics:', error);
      // Keep events in queue for retry
    }
  }

  /**
   * Start periodic flush
   */
  private startPeriodicFlush(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    
    this.flushTimer = window.setInterval(() => {
      this.flush();
    }, this.FLUSH_INTERVAL);
  }

  /**
   * Stop periodic flush
   */
  stopPeriodicFlush(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
  }

  // ============================================================================
  // Analytics Dashboard Data
  // ============================================================================

  /**
   * Get analytics overview
   */
  async getOverview(startDate?: string, endDate?: string): Promise<AnalyticsOverview> {
    try {
      const response = await commerceClient.get<AnalyticsOverview>('/analytics/overview', {
        params: { start_date: startDate, end_date: endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch analytics overview:', error);
      throw error;
    }
  }

  /**
   * Get top products by metric
   */
  async getTopProducts(
    metric: 'clicks' | 'conversions' | 'revenue' = 'clicks',
    limit: number = 10
  ): Promise<ProductStats[]> {
    try {
      const response = await commerceClient.get<ProductStats[]>('/analytics/top-products', {
        params: { metric, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch top products:', error);
      throw error;
    }
  }

  /**
   * Get product-specific analytics
   */
  async getProductAnalytics(productId: string): Promise<any> {
    try {
      const response = await commerceClient.get(`/analytics/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product analytics:', error);
      throw error;
    }
  }

  /**
   * Get brand analytics
   */
  async getBrandAnalytics(brandId: string): Promise<any> {
    try {
      const response = await commerceClient.get(`/analytics/brand/${brandId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch brand analytics:', error);
      throw error;
    }
  }
}

export default new AnalyticsService();
