// ============================================================================
// Example Integration Component
// Demonstrates how to integrate all backend systems
// ============================================================================

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Filter, Loader } from 'lucide-react';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { commerceService, analyticsService } from './services';
import type { Product } from './types';

/**
 * Example 1: Product Catalog with Real Data
 * Replaces hardcoded shirt options with dynamic product catalog
 */
export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<'mens' | 'womens' | 'unisex'>('womens');
  
  const { products, loading, error, searchProducts, pagination } = useProducts({
    gender: selectedGender,
    limit: 20,
    featured: false
  });

  const { addToCart, itemCount } = useCart();

  const handleProductSelect = async (product: Product) => {
    // Track selection
    analyticsService.trackProductSelection(product.id, product.slug, product.name);
    
    // Your AI transformation logic here
    // performAITransformation(product);
  };

  const handleAddToCart = async (product: Product) => {
    try {
      const primaryLink = product.affiliate_links?.find(link => link.is_primary);
      
      if (!primaryLink) {
        alert('Product unavailable');
        return;
      }

      await addToCart(product.id, primaryLink.id, 1);
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  const handleBuyNow = async (product: Product) => {
    try {
      const primaryLink = product.affiliate_links?.find(link => link.is_primary);
      
      if (!primaryLink) {
        alert('Product unavailable');
        return;
      }

      // Track click
      analyticsService.trackBuyNowClick(product.id, primaryLink.id, product.price);
      
      // Open affiliate link
      await commerceService.openAffiliateLink(primaryLink.id);
    } catch (error) {
      alert('Failed to process purchase');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin" size={32} />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="product-catalog">
      {/* Header with cart */}
      <div className="header flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold">Style Swap</h2>
        <div className="cart-badge relative">
          <ShoppingBag size={24} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="filters flex gap-4 p-4 border-b">
        <select 
          value={selectedGender} 
          onChange={(e) => setSelectedGender(e.target.value as any)}
          className="border px-4 py-2 rounded"
        >
          <option value="womens">Women's</option>
          <option value="mens">Men's</option>
          <option value="unisex">Unisex</option>
        </select>

        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => searchProducts(e.target.value)}
          className="border px-4 py-2 rounded flex-1"
        />
      </div>

      {/* Product Grid */}
      <div className="products-grid grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div 
              className="product-image h-48 bg-gray-100 cursor-pointer"
              onClick={() => handleProductSelect(product)}
            >
              <img 
                src={product.primary_image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-3">
              <div className="text-xs text-gray-500 mb-1">
                {product.brand?.name}
              </div>
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                {product.sale_price ? (
                  <>
                    <span className="font-bold text-red-600">
                      ${product.sale_price}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span className="font-bold">${product.price}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleBuyNow(product)}
                  className="flex-1 bg-black text-white py-2 px-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 border rounded hover:bg-gray-50 transition-colors"
                  title="Add to cart"
                >
                  <ShoppingBag size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="pagination flex justify-center items-center gap-4 p-4">
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Example 2: Shopping Cart Component
 */
export function ShoppingCartPanel() {
  const { 
    cart, 
    loading, 
    itemCount, 
    totalPrice,
    updateQuantity,
    removeItem,
    checkout 
  } = useCart();

  const handleCheckout = async () => {
    try {
      await checkout();
      alert('Opening retailer sites...');
    } catch (error) {
      alert('Checkout failed');
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (!cart || itemCount === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <ShoppingBag size={48} className="mx-auto mb-2 opacity-30" />
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h3 className="text-xl font-bold mb-4">
        Shopping Cart ({itemCount} items)
      </h3>

      {/* Cart Items */}
      <div className="cart-items space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-4 border-b pb-4">
            <img 
              src={item.product?.primary_image_url} 
              alt={item.product?.name}
              className="w-20 h-20 object-cover rounded"
            />
            
            <div className="flex-1">
              <h4 className="font-semibold">{item.product?.name}</h4>
              <p className="text-sm text-gray-600">
                {item.product?.brand?.name}
              </p>
              <p className="font-bold mt-1">
                ${item.price_at_addition.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="border px-2 py-1 w-16 text-center rounded"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total */}
      <div className="cart-total mt-6 pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Checkout
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          You'll be redirected to each brand's website
        </p>
      </div>
    </div>
  );
}

/**
 * Example 3: Integration with Existing Swap Screen
 * Shows how to replace hardcoded shirts with real products
 */
export function EnhancedSwapScreen({ userPhoto }: { userPhoto: string }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load tops category products
  const { products, loading } = useProducts({
    // Filter by tops category - you'll need the category UUID from your database
    // category_id: 'tops-category-uuid',
    gender: 'womens',
    limit: 10
  });

  const handleProductSelect = async (product: Product) => {
    setSelectedProduct(product);
    setIsProcessing(true);

    // Track analytics
    analyticsService.trackProductSelection(product.id, product.slug, product.name);

    try {
      // Your AI transformation logic
      // Use product.description or product.name for the prompt
      const prompt = `Replace the clothing with ${product.name}. ${product.description}`;
      
      // await performAITransformation(userPhoto, prompt);
      
      console.log('Transforming with product:', product.name);
    } catch (error) {
      console.error('Transformation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="swap-screen">
      {/* User Photo */}
      <div className="user-photo-container">
        <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
      </div>

      {/* Product Selection */}
      <div className="products-carousel">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
          Select Garment
        </h3>
        
        {loading ? (
          <div className="text-white">Loading products...</div>
        ) : (
          <div className="flex gap-4 overflow-x-auto">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductSelect(product)}
                disabled={isProcessing}
                className={`
                  flex-shrink-0 w-24 h-32 rounded-3xl border transition-all
                  ${selectedProduct?.id === product.id 
                    ? 'bg-white/20 border-white/40 scale-110' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }
                `}
              >
                <img 
                  src={product.primary_image_url} 
                  alt={product.name}
                  className="w-full h-20 object-cover rounded-t-3xl"
                />
                <div className="p-2">
                  <span className="text-xs font-bold text-white uppercase block truncate">
                    {product.name}
                  </span>
                  <span className="text-xs text-white/60">
                    ${product.price}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="processing-overlay">
          <Loader className="animate-spin" size={48} />
          <p className="text-white mt-4">Generating Reality...</p>
        </div>
      )}
    </div>
  );
}

/**
 * Example 4: Analytics Dashboard (Read-only)
 */
export function AnalyticsDashboard() {
  const [overview, setOverview] = useState<any>(null);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [overviewData, productsData] = await Promise.all([
        analyticsService.getOverview(),
        analyticsService.getTopProducts('revenue', 10)
      ]);

      setOverview(overviewData);
      setTopProducts(productsData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="analytics-dashboard p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      {/* Overview Stats */}
      {overview && (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="stat-card p-4 border rounded-lg">
            <div className="text-sm text-gray-600">Total Clicks</div>
            <div className="text-3xl font-bold">{overview.totalClicks.toLocaleString()}</div>
          </div>
          
          <div className="stat-card p-4 border rounded-lg">
            <div className="text-sm text-gray-600">Conversions</div>
            <div className="text-3xl font-bold">{overview.totalConversions}</div>
          </div>
          
          <div className="stat-card p-4 border rounded-lg">
            <div className="text-sm text-gray-600">Conversion Rate</div>
            <div className="text-3xl font-bold">{overview.conversionRate.toFixed(1)}%</div>
          </div>
          
          <div className="stat-card p-4 border rounded-lg">
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-3xl font-bold">${overview.totalRevenue.toLocaleString()}</div>
          </div>
        </div>
      )}

      {/* Top Products */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Top Products</h3>
        <div className="space-y-2">
          {topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
              <img 
                src={product.primary_image_url} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.brand.name}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Revenue</div>
                <div className="font-bold">${product.stats.revenue.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Export all examples
export default {
  ProductCatalog,
  ShoppingCartPanel,
  EnhancedSwapScreen,
  AnalyticsDashboard
};
