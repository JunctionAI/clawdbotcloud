# Setup Guide - Style Swap UI Backend Integration

Quick setup guide to get the integrated system running.

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Backend API running on port 3000
- [ ] Commerce API running on port 3001
- [ ] PostgreSQL database set up
- [ ] Google AI API key (for Gemini)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd ~/clawd/projects/style-swap-ui
npm install
```

This installs:
- React & React DOM
- TypeScript
- Axios (HTTP client)
- Lucide React (icons)
- Vite (build tool)
- Tailwind CSS

### 2. Configure Environment

```bash
# Copy example environment file
cp .env.example .env
```

Edit `.env`:

```env
# Backend API - Product catalog
VITE_BACKEND_URL=http://localhost:3000

# Commerce API - Cart & affiliate tracking
VITE_COMMERCE_URL=http://localhost:3001

# Google AI API Key for image transformation
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Enable analytics tracking
VITE_ENABLE_ANALYTICS=true

# Environment
VITE_ENV=development
```

### 3. Verify Backend APIs

**Test Backend API:**
```bash
# Should return health status
curl http://localhost:3000/health

# Should return products
curl http://localhost:3000/api/products
```

**Test Commerce API:**
```bash
# Should return empty cart or cart data
curl http://localhost:3001/api/cart
```

If either fails:
- Check the respective API is running
- Verify PostgreSQL database is running
- Check API logs for errors

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 5. Verify Integration

Open browser console and check:

**Products Loading:**
```javascript
// Should show products from backend
import { productService } from './services';
const products = await productService.getProducts({ limit: 5 });
console.log(products);
```

**Session Tracking:**
```javascript
// Should show session ID
console.log(localStorage.getItem('session_id'));
```

**Analytics Queue:**
```javascript
// Should be empty or have queued events
console.log(localStorage.getItem('analytics_queue'));
```

### 6. Test Features

**Product Catalog:**
- [ ] Products display on screen
- [ ] Search bar filters products
- [ ] Product images load
- [ ] Prices display correctly

**Shopping Cart:**
- [ ] "Add to Cart" button works
- [ ] Cart badge shows item count
- [ ] Cart persists on page refresh
- [ ] Can update quantities
- [ ] Can remove items

**Affiliate Links:**
- [ ] "Buy Now" opens new tab
- [ ] URL includes tracking parameters
- [ ] Click is logged in database

**Analytics:**
- [ ] Events queued in localStorage
- [ ] Events flush after 30 seconds
- [ ] Upload action tracked
- [ ] Product selection tracked

## Common Issues & Solutions

### Products Not Loading

**Symptoms:** Empty product list, loading forever

**Check:**
```bash
# 1. Backend API is running
curl http://localhost:3000/health

# 2. CORS is enabled
# Check browser console for CORS errors

# 3. Environment variable is correct
echo $VITE_BACKEND_URL
```

**Solution:**
- Start backend API: `cd ~/clawd/projects/style-swap-backend/api && npm start`
- Verify `.env` has `VITE_BACKEND_URL=http://localhost:3000`
- Check backend logs for errors

### Cart Not Working

**Symptoms:** Items don't add to cart, cart always empty

**Check:**
```bash
# 1. Commerce API is running
curl http://localhost:3001/api/cart

# 2. Cookies enabled in browser
# Check Application > Cookies in DevTools

# 3. withCredentials set in API client
# Check src/services/api.ts - should have withCredentials: true
```

**Solution:**
- Start commerce API: `cd ~/clawd/projects/style-swap-commerce && npm start`
- Enable cookies in browser
- Clear cookies and localStorage: `localStorage.clear()`

### TypeScript Errors

**Symptoms:** Build fails with type errors

**Check:**
```bash
# Run type checking
npm run type-check

# Check TypeScript version
npm list typescript
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Verify tsconfig.json exists
cat tsconfig.json
```

### Analytics Not Sending

**Symptoms:** Events queue but don't send to server

**Check:**
```javascript
// Manual flush
import { analyticsService } from './services';
await analyticsService.flush();

// Check queue
console.log(localStorage.getItem('analytics_queue'));
```

**Solution:**
- Verify `VITE_ENABLE_ANALYTICS=true` in `.env`
- Check commerce API has `/api/analytics/events` endpoint
- Manually flush: `analyticsService.flush()`

## Development Workflow

### Daily Development

```bash
# 1. Start backend APIs (in separate terminals)
cd ~/clawd/projects/style-swap-backend/api
npm start

cd ~/clawd/projects/style-swap-commerce
npm start

# 2. Start UI
cd ~/clawd/projects/style-swap-ui
npm run dev
```

### Code Changes

**Modify API Service:**
1. Edit `src/services/productService.ts` or `commerceService.ts`
2. No rebuild needed (Vite hot reload)
3. Check browser console for errors

**Add New Types:**
1. Edit `src/types/index.ts`
2. Run `npm run type-check` to verify
3. Rebuild: `npm run build`

**Create New Component:**
1. Create `.tsx` file in `src/`
2. Import services: `import { productService } from './services'`
3. Use hooks: `const { products } = useProducts()`

### Testing

**Manual Testing:**
```bash
# 1. Test products
curl "http://localhost:3000/api/products?limit=5"

# 2. Test search
curl "http://localhost:3000/api/products?search=nike"

# 3. Test cart
curl http://localhost:3001/api/cart

# 4. Test add to cart
curl -X POST http://localhost:3001/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"product_id":"uuid","affiliate_link_id":"uuid","quantity":1}'
```

## Production Build

### Build for Production

```bash
# Type check + build
npm run build

# Output: dist/ directory
ls dist/
```

### Environment for Production

Create `.env.production`:

```env
VITE_BACKEND_URL=https://api.styleswap.com
VITE_COMMERCE_URL=https://commerce.styleswap.com
VITE_GOOGLE_AI_API_KEY=production_key_here
VITE_ENABLE_ANALYTICS=true
VITE_ENV=production
```

### Deploy

**Netlify:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
npm run build
vercel --prod
```

**Manual Deploy:**
```bash
npm run build
# Upload dist/ to your web server
scp -r dist/* user@server:/var/www/styleswap/
```

## Quick Reference Commands

```bash
# Install
npm install

# Development
npm run dev

# Type check
npm run type-check

# Build
npm run build

# Preview production build
npm run preview

# Clean install
rm -rf node_modules package-lock.json && npm install

# Clear cache
rm -rf node_modules/.vite
```

## Environment Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_BACKEND_URL` | Yes | `http://localhost:3000` | Backend API URL |
| `VITE_COMMERCE_URL` | Yes | `http://localhost:3001` | Commerce API URL |
| `VITE_GOOGLE_AI_API_KEY` | Yes | - | Google AI API key |
| `VITE_ENABLE_ANALYTICS` | No | `true` | Enable analytics tracking |
| `VITE_ENV` | No | `development` | Environment name |

## Next Steps

After setup is complete:

1. **Populate Database**
   - Add products to backend database
   - Set up brands and categories
   - Configure affiliate links

2. **Customize UI**
   - Update branding/colors in Tailwind config
   - Modify product card layouts
   - Add custom filters

3. **Test User Journey**
   - Upload photo
   - Select product
   - View transformation
   - Add to cart / Buy now
   - Verify analytics tracked

4. **Monitor Performance**
   - Check API response times
   - Monitor analytics events
   - Track conversion rates

## Support

**Documentation:**
- Full guide: `INTEGRATION.md`
- Quick reference: `QUICK_REFERENCE.md`
- Examples: `src/example-integration.tsx`

**Backend APIs:**
- Backend: `~/clawd/projects/style-swap-backend/docs/API_DOCUMENTATION.md`
- Commerce: `~/clawd/projects/style-swap-commerce/README.md`

**Troubleshooting:**
- See "Troubleshooting" section in `INTEGRATION.md`
- Check browser console for errors
- Review API logs

---

**Setup Complete!** 🎉

Your Style Swap UI is now integrated with all backend systems and ready for development.
