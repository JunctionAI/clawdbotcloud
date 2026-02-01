// ============================================================================
// useCart Hook - React hook for shopping cart management
// ============================================================================

import { useState, useEffect, useCallback } from 'react';
import { commerceService, analyticsService } from '../services';
import type { Cart, CartItem } from '../types';

interface UseCartReturn {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  itemCount: number;
  totalPrice: number;
  addToCart: (productId: string, affiliateLinkId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await commerceService.getCart();
      setCart(cartData);
    } catch (err: any) {
      setError(err.error || 'Failed to fetch cart');
      console.error('Cart fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (
    productId: string, 
    affiliateLinkId: string, 
    quantity: number = 1
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedCart = await commerceService.addToCart({
        product_id: productId,
        affiliate_link_id: affiliateLinkId,
        quantity,
      });
      
      setCart(updatedCart);
      analyticsService.trackAddToCart(productId, affiliateLinkId, quantity);
    } catch (err: any) {
      setError(err.error || 'Failed to add to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedCart = await commerceService.updateCartItem(itemId, { quantity });
      setCart(updatedCart);
    } catch (err: any) {
      setError(err.error || 'Failed to update cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedCart = await commerceService.removeFromCart(itemId);
      setCart(updatedCart);
    } catch (err: any) {
      setError(err.error || 'Failed to remove item');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await commerceService.clearCart();
      setCart(null);
    } catch (err: any) {
      setError(err.error || 'Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const checkoutSession = await commerceService.checkout();
      
      // Open all affiliate links in new tabs
      checkoutSession.affiliateLinks.forEach(link => {
        window.open(link.url, '_blank', 'noopener,noreferrer');
      });
      
      // Clear cart after checkout
      await clearCart();
    } catch (err: any) {
      setError(err.error || 'Failed to checkout');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearCart]);

  // Computed values
  const itemCount = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;
  const totalPrice = cart?.items.reduce(
    (total, item) => total + (item.price_at_addition * item.quantity), 
    0
  ) || 0;

  return {
    cart,
    loading,
    error,
    itemCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    checkout,
    refreshCart: fetchCart,
  };
}
