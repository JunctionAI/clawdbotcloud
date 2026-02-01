# Style Swap UI - Quick Reference

Fast reference for common integration tasks.

## 🚀 Quick Start

```bash
# Install
cd ~/clawd/projects/style-swap-ui
npm install

# Configure
cp .env.example .env
# Edit .env with backend URLs

# Run
npm run dev
```

## 📦 Import Services

```typescript
import { productService, commerceService, analyticsService } from './services';
import { useProducts, useProduct } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
```

## 🛍️ Common Tasks

### Fetch Products
```typescript
const { products, loading } = useProducts({ gender: 'womens', limit: 20 });
```

### Search Products
```typescript
const { searchProducts } = useProducts();
await searchProducts('leather jacket');
```

### Get Single Product
```typescript
const { product } = useProduct(productId);
```

### Add to Cart
```typescript
const { addToCart } = useCart();
await addToCart(productId, affiliateLinkId, 1);
```

### Buy Now
```typescript
await commerceService.openAffiliateLink(affiliateLinkId);
```

### Track Analytics
```typescript
analyticsService.trackProductSelection(productId, productSlug, productName);
analyticsService.trackBuyNowClick(productId, affiliateLinkId, price);
```

## 🔌 API Endpoints

### Backend (Port 3000)
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `GET /api/brands` - List brands
- `GET /api/categories` - List categories

### Commerce (Port 3001)
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/checkout` - Checkout
- `POST /api/affiliates/track-click` - Track click
- `POST /api/analytics/events` - Send analytics

## 🎯 Example: Replace Hardcoded Products

```tsx
// Before
const products = [
  { id: 1, name: 'Shirt', price: 89 }
];

// After
function ProductList() {
  const { products, loading } = useProducts({ limit: 10 });
  
  if (loading) return <Spinner />;
  
  return products.map(p => (
    <ProductCard key={p.id} product={p} />
  ));
}
```

## 🛒 Example: Complete Buy Flow

```tsx
function BuyButton({ product }) {
  const { addToCart } = useCart();
  
  const handleBuy = async () => {
    const link = product.affiliate_links?.[0];
    
    // Track click
    analyticsService.trackBuyNowClick(product.id, link.id, product.price);
    
    // Option 1: Direct purchase
    await commerceService.openAffiliateLink(link.id);
    
    // Option 2: Add to cart
    await addToCart(product.id, link.id, 1);
  };
  
  return <button onClick={handleBuy}>Buy Now</button>;
}
```

## 📊 Analytics Events

```typescript
// Upload
analyticsService.trackUpload(fileSize, fileType);

// Swap
analyticsService.trackSwap(productId, productSlug);

// Select
analyticsService.trackProductSelection(id, slug, name);

// Buy
analyticsService.trackBuyNowClick(productId, linkId, price);

// Cart
analyticsService.trackAddToCart(productId, linkId, qty);

// Share/Download
analyticsService.trackShare('twitter', productId);
analyticsService.trackDownload(productId);
```

## 🔧 Environment Variables

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_COMMERCE_URL=http://localhost:3001
VITE_GOOGLE_AI_API_KEY=your_key
VITE_ENABLE_ANALYTICS=true
```

## 🐛 Debug

```javascript
// Check services
console.log(await productService.getProducts({ limit: 5 }));
console.log(await commerceService.getCart());

// Check analytics queue
console.log(localStorage.getItem('analytics_queue'));

// Check session
console.log(localStorage.getItem('session_id'));
```

## 📝 TypeScript Types

```typescript
import type { 
  Product, 
  Cart, 
  CartItem, 
  Brand, 
  Category,
  ProductFilters 
} from './types';
```

## 🚨 Common Errors

**Products not loading:**
- Check backend running on port 3000
- Verify CORS enabled
- Check `.env` has correct URL

**Cart not working:**
- Check commerce API on port 3001
- Verify cookies enabled
- Check `withCredentials: true`

**TypeScript errors:**
- Run `npm install`
- Check `tsconfig.json`
- Verify import paths

## 📚 Full Documentation

See `INTEGRATION.md` for complete details.
