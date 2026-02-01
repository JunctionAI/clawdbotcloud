// ============================================================================
// Commerce Service - Handles cart, checkout, and affiliate tracking
// ============================================================================

import { commerceClient, retryRequest } from './api';
import type { 
  Cart, 
  CartItem, 
  AddToCartRequest, 
  UpdateCartItemRequest,
  TrackClickRequest,
  TrackClickResponse,
  CheckoutSession 
} from '../types';

class CommerceService {
  // ============================================================================
  // Shopping Cart Methods
  // ============================================================================

  /**
   * Get current shopping cart
   */
  async getCart(): Promise<Cart> {
    try {
      const response = await retryRequest(() =>
        commerceClient.get<Cart>('/cart')
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      throw error;
    }
  }

  /**
   * Add item to cart
   */
  async addToCart(request: AddToCartRequest): Promise<Cart> {
    try {
      const response = await commerceClient.post<Cart>('/cart/add', request);
      return response.data;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(itemId: string, request: UpdateCartItemRequest): Promise<Cart> {
    try {
      const response = await commerceClient.put<Cart>(`/cart/item/${itemId}`, request);
      return response.data;
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    }
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(itemId: string): Promise<Cart> {
    try {
      const response = await commerceClient.delete<Cart>(`/cart/item/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  }

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<void> {
    try {
      await commerceClient.delete('/cart');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  }

  /**
   * Checkout cart - generates affiliate links for multi-brand purchases
   */
  async checkout(): Promise<CheckoutSession> {
    try {
      const response = await commerceClient.post<CheckoutSession>('/cart/checkout');
      return response.data;
    } catch (error) {
      console.error('Failed to checkout:', error);
      throw error;
    }
  }

  // ============================================================================
  // Affiliate Tracking Methods
  // ============================================================================

  /**
   * Track affiliate link click and get redirect URL
   */
  async trackClick(request: TrackClickRequest): Promise<TrackClickResponse> {
    try {
      const response = await commerceClient.post<TrackClickResponse>(
        '/affiliates/track-click',
        request
      );
      return response.data;
    } catch (error) {
      console.error('Failed to track click:', error);
      throw error;
    }
  }

  /**
   * Track affiliate link click by short code (for direct redirects)
   */
  async trackClickByShortCode(shortCode: string): Promise<TrackClickResponse> {
    try {
      const response = await retryRequest(() =>
        commerceClient.get<TrackClickResponse>(`/link/${shortCode}/redirect`)
      );
      return response.data;
    } catch (error) {
      console.error('Failed to track click:', error);
      throw error;
    }
  }

  /**
   * Get affiliate link analytics
   */
  async getAffiliateLinkAnalytics(linkId: string): Promise<any> {
    try {
      const response = await retryRequest(() =>
        commerceClient.get(`/link/${linkId}/analytics`)
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch link analytics:', error);
      throw error;
    }
  }

  // ============================================================================
  // Buy Now Flow - Direct purchase without cart
  // ============================================================================

  /**
   * Handle "Buy Now" button click - tracks and redirects
   */
  async buyNow(affiliateLinkId: string): Promise<string> {
    try {
      const result = await this.trackClick({ affiliate_link_id: affiliateLinkId });
      return result.redirect_url;
    } catch (error) {
      console.error('Failed to process buy now:', error);
      throw error;
    }
  }

  /**
   * Open affiliate link in new window with tracking
   */
  async openAffiliateLink(affiliateLinkId: string): Promise<void> {
    try {
      const redirectUrl = await this.buyNow(affiliateLinkId);
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to open affiliate link:', error);
      throw error;
    }
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Get cart item count
   */
  async getCartItemCount(): Promise<number> {
    try {
      const cart = await this.getCart();
      return cart.items.reduce((total, item) => total + item.quantity, 0);
    } catch (error) {
      return 0;
    }
  }

  /**
   * Get cart total value
   */
  async getCartTotal(): Promise<number> {
    try {
      const cart = await this.getCart();
      return cart.items.reduce((total, item) => 
        total + (item.price_at_addition * item.quantity), 0
      );
    } catch (error) {
      return 0;
    }
  }

  /**
   * Check if product is in cart
   */
  async isProductInCart(productId: string): Promise<boolean> {
    try {
      const cart = await this.getCart();
      return cart.items.some(item => item.product_id === productId);
    } catch (error) {
      return false;
    }
  }
}

export default new CommerceService();
