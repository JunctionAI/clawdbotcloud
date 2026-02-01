# 🔧 Style Swap - Troubleshooting Guide

**Version**: 1.0.0  
**Last Updated**: January 28, 2026  
**For**: Users & Developers

---

## Table of Contents

1. [Quick Diagnostics](#quick-diagnostics)
2. [Common User Issues](#common-user-issues)
3. [Development Issues](#development-issues)
4. [Deployment Issues](#deployment-issues)
5. [Performance Issues](#performance-issues)
6. [API & Integration Issues](#api--integration-issues)
7. [Browser-Specific Issues](#browser-specific-issues)
8. [Mobile Issues](#mobile-issues)
9. [Advanced Debugging](#advanced-debugging)
10. [Getting Help](#getting-help)

---

## Quick Diagnostics

### Is the Problem on Your End?

**Quick Checklist:**

```
□ Browser is up to date (Chrome 90+, Firefox 88+, Safari 14+)
□ JavaScript is enabled
□ Internet connection is stable
□ No ad blockers interfering
□ Cookies/storage not blocked
□ Sufficient device storage
□ Not using VPN (can cause issues)
```

### System Status Check

1. **Visit Status Page:** https://status.styleswap.app
2. **Check Browser Console:**
   - Press `F12` (Windows/Linux) or `Cmd+Option+I` (Mac)
   - Look for red error messages
3. **Test Basic Connectivity:**
   ```bash
   ping style-swap.vercel.app
   ```

---

## Common User Issues

### 🚫 Issue: Can't Upload Image

**Symptoms:**
- File selection does nothing
- "Upload failed" error
- Upload button grayed out

**Causes & Solutions:**

#### 1. File Type Not Supported

**Error Message:** "Invalid file type"

**Solution:**
```
✅ Supported: JPEG (.jpg, .jpeg), PNG (.png), WebP (.webp)
❌ Not supported: GIF, BMP, TIFF, SVG, HEIC (convert first)

Fix: Convert image to JPEG/PNG
- Windows: Use Paint (Save As → JPEG)
- Mac: Use Preview (Export → JPEG)
- Online: Use convertio.co or cloudconvert.com
```

#### 2. File Too Large

**Error Message:** "File size exceeds 10 MB"

**Solution:**
```bash
# Reduce file size:

Option 1: Online compression
- Visit tinypng.com or compressor.io
- Upload and download compressed version

Option 2: Resize image
- Reduce dimensions to 1920x1080 or smaller
- Use Paint, Preview, or online tool

Option 3: Lower quality
- Save with 80-85% JPEG quality
```

**Quick Fix Script:**
```javascript
// Client-side compression (paste in browser console)
async function compressImage(file) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  img.src = URL.createObjectURL(file);
  await new Promise(resolve => img.onload = resolve);
  
  const maxDim = 1920;
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;
  
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  return new Promise(resolve => {
    canvas.toBlob(resolve, 'image/jpeg', 0.85);
  });
}
```

#### 3. Browser Permissions

**Error Message:** Silent failure, no file dialog

**Solution:**
```
Chrome:
1. Click lock icon in address bar
2. Site settings → Permissions
3. Ensure "Files" is set to "Allow"

Firefox:
1. about:preferences#privacy
2. Scroll to Permissions
3. Check "Access your files"

Safari:
1. Safari → Preferences → Privacy
2. Uncheck "Prevent cross-site tracking" for this site
```

---

### ⏳ Issue: Processing Takes Too Long

**Symptoms:**
- Loading spinner for > 30 seconds
- "Processing timeout" error
- Page becomes unresponsive

**Causes & Solutions:**

#### 1. Server Overload

**Check:** Visit status page

**Solution:**
```
1. Wait 2-3 minutes
2. Refresh page (don't close tab)
3. Try again
4. If persistent, try during off-peak hours (2-6 AM your timezone)
```

#### 2. Large Image Size

**Check:** File size > 5 MB?

**Solution:**
```
Compress image before uploading (see above)
Target size: 2-3 MB for best performance
```

#### 3. Slow Internet Connection

**Check:** 
```bash
# Test speed at fast.com
# Minimum required: 2 Mbps down
```

**Solution:**
```
1. Switch to WiFi (if on mobile data)
2. Move closer to router
3. Disconnect other devices
4. Retry during low-traffic times
```

---

### 🎨 Issue: Poor Try-On Quality

**Symptoms:**
- Blurry results
- Unrealistic rendering
- Clothing doesn't fit properly
- Colors look off

**Solutions:**

#### 1. Improve Input Photo Quality

**Checklist:**
```
✅ Good lighting (natural daylight preferred)
✅ Plain background (white/gray wall)
✅ Front-facing pose (not angled)
✅ High resolution (at least 1280x720)
✅ In-focus, not blurry
✅ Full upper body visible
✅ Arms slightly away from body

❌ Avoid:
- Dim lighting or harsh shadows
- Busy backgrounds
- Side/angled poses
- Low resolution (< 640x480)
- Blurry or motion-blurred
- Close-up face only
```

**Example Good vs. Bad:**
```
✅ GOOD:
- Standing straight
- Natural light from window
- Plain white wall behind
- Wearing solid-color base layer

❌ BAD:
- Sitting or leaning
- Overhead harsh lighting
- Patterned wallpaper behind
- Wearing busy patterned shirt
```

#### 2. Choose Compatible Clothing

**Best Results:**
```
✅ Solid colors
✅ Classic styles (t-shirts, button-ups, jeans)
✅ Clear product photos
✅ Simple designs

⚠️ May struggle:
- Complex patterns
- Oversized/avant-garde styles
- Low-quality product images
- Heavy textures (fur, sequins)
```

#### 3. Adjust Expectations

**Current AI Limitations:**
```
The AI provides a visualization/preview, not a photorealistic render.

It's great for:
✅ Color matching
✅ Style compatibility
✅ General fit preview

Not perfect for:
⚠️ Exact fabric texture
⚠️ Precise sizing
⚠️ Complex layering
```

---

### 🖼️ Issue: Comparison Slider Not Working

**Symptoms:**
- Can't drag slider
- Slider stuck at 50%
- Images not displaying

**Solutions:**

#### 1. Clear Browser Cache

```bash
Chrome:
Ctrl+Shift+Delete → Clear browsing data → Cached images and files

Firefox:
Ctrl+Shift+Delete → Cache → Clear Now

Safari:
Safari → Clear History → All History
```

#### 2. Disable Browser Extensions

```
1. Open in Incognito/Private mode
2. If it works, an extension is interfering
3. Common culprits: Ad blockers, privacy extensions
4. Whitelist style-swap.vercel.app
```

#### 3. Try Different Interaction

```
Mouse users:
- Click and drag (don't just click)
- Use arrow keys (← →)

Touch users:
- Tap and drag slowly
- Try single finger (not pinch)

Keyboard users:
- Tab to slider
- Use arrow keys to move
```

---

## Development Issues

### 🛠️ Issue: npm install Fails

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps

# Or use specific Node version
nvm use 18
npm install
```

---

### 🛠️ Issue: Build Fails

**Error:** `Type error: Cannot find module`

**Solution:**
```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix common issues:

# 1. Missing type definitions
npm install --save-dev @types/node @types/react

# 2. Path alias not working
# Verify tsconfig.json:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

# 3. Import errors
# Change:
import { Component } from 'components/Component'
# To:
import { Component } from '@/app/components/Component'
```

**Error:** `Module not found: Can't resolve 'framer-motion'`

**Solution:**
```bash
# Reinstall dependencies
npm install framer-motion

# If still failing, check version compatibility
npm list framer-motion
npm install framer-motion@latest
```

---

### 🛠️ Issue: Hot Reload Not Working

**Symptoms:**
- Changes don't reflect in browser
- Must manually refresh
- Development server slow

**Solutions:**

```bash
# 1. Restart dev server
# Press Ctrl+C, then:
npm run dev

# 2. Clear Next.js cache
rm -rf .next

# 3. Check file watchers limit (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# 4. Use polling mode (slower but reliable)
# Add to next.config.js:
module.exports = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}
```

---

## Deployment Issues

### 🚀 Issue: Vercel Build Fails

**Error:** `Build exceeded maximum duration`

**Solution:**
```bash
# Optimize build:

# 1. Remove unused dependencies
npm prune

# 2. Reduce bundle size
# Add to next.config.js:
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      };
    }
    return config;
  },
}

# 3. Upgrade Vercel plan (if necessary)
```

**Error:** `Environment variable not found`

**Solution:**
```bash
# 1. Add in Vercel Dashboard:
Project → Settings → Environment Variables

# 2. Ensure correct naming:
NEXT_PUBLIC_GEMINI_API_KEY  # Not GEMINI_API_KEY

# 3. Select all environments:
☑ Production
☑ Preview
☑ Development

# 4. Redeploy
vercel --prod
```

---

### 🚀 Issue: 404 on Deployed Site

**Error:** Page works locally but not on Vercel

**Solutions:**

```bash
# 1. Check routing
# File: app/page.tsx (not pages/index.tsx for App Router)

# 2. Verify build output
npm run build
# Check .next/server/app directory

# 3. Check vercel.json routing
{
  "rewrites": [
    { "source": "/:path*", "destination": "/" }
  ]
}

# 4. Force redeploy
vercel --force
```

---

## Performance Issues

### 🐌 Issue: Slow Page Load

**Diagnosis:**
```bash
# Test with Lighthouse
npx lighthouse https://style-swap.vercel.app --view

# Check Core Web Vitals
# Goal: LCP < 2.5s, FID < 100ms, CLS < 0.1
```

**Solutions:**

```javascript
// 1. Lazy load images
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  loading="lazy"
  quality={85}
/>

// 2. Code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

// 3. Reduce bundle size
// Remove unused imports
// Use tree-shakeable libraries
```

---

## API & Integration Issues

### 🔌 Issue: Gemini API Errors

**Error:** `401 Unauthorized`

**Solution:**
```bash
# 1. Verify API key
# Check .env.local or Vercel env vars

# 2. Test API key
curl -H "Authorization: Bearer YOUR_KEY" \
  https://generativelanguage.googleapis.com/v1beta/models

# 3. Check billing
# Visit Google Cloud Console
# Ensure billing is enabled

# 4. Regenerate key
# Google AI Studio → Get API key → Create new key
```

**Error:** `429 Rate Limited`

**Solution:**
```javascript
// Implement retry with exponential backoff
async function callWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}
```

---

## Browser-Specific Issues

### Chrome Issues

**Issue:** Upload dialog doesn't open

**Solution:**
```
1. Clear site data: chrome://settings/siteData
2. Reset permissions: Site settings → Reset permissions
3. Disable extensions in Incognito mode
```

### Firefox Issues

**Issue:** Images don't display

**Solution:**
```
1. about:config
2. Search: privacy.resistFingerprinting
3. Set to false
4. Restart browser
```

### Safari Issues

**Issue:** File upload fails on iOS

**Solution:**
```
1. Settings → Safari → Advanced → Experimental Features
2. Enable "NSURLSession WebSocket"
3. Clear website data
4. Allow camera/photo access in iOS Settings
```

---

## Mobile Issues

### iOS Issues

**Issue:** Camera access denied

**Solution:**
```
1. Settings → Privacy & Security → Photos
2. Find Safari / Your Browser
3. Enable "Read and Write"

Or:
Settings → Safari → Camera
Set to "Ask" or "Allow"
```

### Android Issues

**Issue:** Upload button not responding

**Solution:**
```
1. Clear Chrome cache
2. Settings → Apps → Chrome → Storage → Clear cache
3. Grant storage permission:
   Settings → Apps → Chrome → Permissions → Storage → Allow
```

---

## Advanced Debugging

### Enable Debug Mode

```javascript
// Add to browser console
localStorage.setItem('debug', 'true');
location.reload();

// View detailed logs
// Press F12 → Console tab
```

### Network Debugging

```bash
# 1. Open DevTools Network tab (F12)
# 2. Reproduce issue
# 3. Check failed requests (red)
# 4. Right-click → Copy → Copy as cURL
# 5. Share with support
```

### React DevTools

```bash
# Install extension
# Chrome: https://chrome.google.com/webstore/detail/react-developer-tools

# Use to inspect:
# - Component state
# - Props
# - Re-render causes
```

### Performance Profiling

```javascript
// Record performance
performance.mark('start-tryon');
await tryOnFunction();
performance.mark('end-tryon');
performance.measure('tryon-duration', 'start-tryon', 'end-tryon');

console.log(performance.getEntriesByType('measure'));
```

---

## Getting Help

### Before Asking for Help

**Gather Information:**

```
1. Browser & version: (Chrome 120, Firefox 121, etc.)
2. Operating system: (Windows 11, macOS 14, etc.)
3. Error message: (exact text or screenshot)
4. Steps to reproduce:
   a. Go to...
   b. Click on...
   c. Error appears
5. Console errors: (F12 → Console → screenshot)
6. Network errors: (F12 → Network → screenshot failed requests)
```

### Support Channels

**Priority Order:**

1. **Check Documentation**
   - User Guide
   - FAQ (in User Guide)
   - This troubleshooting guide

2. **Search Existing Issues**
   - GitHub Issues: https://github.com/styleswap/issues
   - Discord: Search message history

3. **Community Support**
   - Discord: https://discord.gg/styleswap
   - Reddit: r/StyleSwap

4. **Official Support**
   - Email: support@styleswap.app
   - Response time: 24-48 hours
   - Include all information from "Before Asking for Help"

### Bug Reports

**Template:**

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
[Attach screenshots/video]

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop
- Screen size: 1920x1080

## Console Errors
```
[Paste console output]
```

## Network Errors
[Screenshot of Network tab]

## Additional Context
Any other relevant information
```

---

## Known Issues

### Current Known Issues (Jan 2026)

| Issue | Severity | Workaround | ETA Fix |
|-------|----------|------------|---------|
| Slow 3G performance | Low | Use WiFi | Feb 2026 |
| Safari 14 border rendering | Low | Update Safari | N/A |
| IE11 compatibility | N/A | Use modern browser | N/A (unsupported) |

### Planned Improvements

- [ ] Offline mode (PWA)
- [ ] Better error messages
- [ ] Automatic retry on failure
- [ ] Progress percentage for uploads
- [ ] Client-side image compression

---

## Preventive Measures

### For Users

```
✅ Keep browser updated
✅ Use supported browsers
✅ Clear cache monthly
✅ Don't use VPN when using app
✅ Compress images before upload
✅ Test with simple images first
```

### For Developers

```
✅ Run tests before deploying
✅ Monitor error rates
✅ Set up alerts for API failures
✅ Keep dependencies updated
✅ Use TypeScript strict mode
✅ Implement proper error handling
```

---

## Quick Reference

### Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| `INVALID_IMAGE` | Wrong file type | Convert to JPEG/PNG |
| `FILE_TOO_LARGE` | File > 10 MB | Compress image |
| `PROCESSING_FAILED` | AI error | Retry or contact support |
| `RATE_LIMIT` | Too many requests | Wait 60 seconds |
| `NETWORK_ERROR` | Connection issue | Check internet |

### Support Contact

```
Email: support@styleswap.app
Discord: https://discord.gg/styleswap
GitHub: https://github.com/styleswap/issues
Status: https://status.styleswap.app
```

---

**Troubleshooting Guide v1.0.0**  
**Updated**: January 28, 2026  
*Can't find your issue? Contact support!*
