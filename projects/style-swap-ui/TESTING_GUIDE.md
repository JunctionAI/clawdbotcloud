# Testing Guide - Style Swap UI v2.0

## 🧪 Quick Testing Checklist

Use this guide to verify all new features are working correctly.

---

## 1. ⚡ Retry Logic with Exponential Backoff

### Test Steps:
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Enable "Offline" mode temporarily
4. Upload an image and select a style
5. Re-enable network
6. Observe automatic retries in console

### Expected Results:
- ✅ Error message appears initially
- ✅ Console shows retry attempts
- ✅ Delays increase exponentially (1s, 2s, 4s)
- ✅ Request succeeds on retry
- ✅ User sees success message

### Debug Console Output:
```
[Analytics] Event: style_swap_started
Attempt 1 failed. Retrying in 1024ms...
Attempt 2 failed. Retrying in 2157ms...
Attempt 3 succeeded
[Analytics] Event: style_swap_completed
```

---

## 2. 💀 Loading Skeleton States

### Test Steps:
1. Open DevTools → Network tab
2. Throttle to "Slow 3G"
3. Upload an image
4. Observe skeleton loaders

### Expected Results:
- ✅ Shimmer animation on image placeholder
- ✅ Gallery skeleton shows 5 animated items
- ✅ Processing skeleton with dual spinner
- ✅ Smooth transition to actual content
- ✅ No layout shift

### Visual Checks:
- [ ] Shimmer moves left to right
- [ ] Skeletons match final layout
- [ ] Animations are smooth
- [ ] Colors match theme

---

## 3. 🗜️ Image Compression

### Test Steps:
1. Prepare test images:
   - Small (< 500KB)
   - Medium (1-3MB)
   - Large (> 5MB)
2. Open console
3. Upload each image
4. Check compression logs

### Expected Console Output:
```
Image compressed: 67.3% reduction (5242880 → 1712640 bytes)
```

### Expected Results:
- ✅ All images resize to max 1024x1024
- ✅ Quality maintained (85%)
- ✅ Compression ratio logged
- ✅ Upload speed improved
- ✅ HEIC files convert to JPEG

### Performance Checks:
- [ ] Large images load faster
- [ ] Network payload reduced
- [ ] Visual quality acceptable
- [ ] No errors during compression

---

## 4. 🛡️ Error Boundary

### Test Steps:
1. Temporarily modify `App.jsx` to throw error:
   ```javascript
   // Add in any component:
   if (true) throw new Error('Test error');
   ```
2. Reload app
3. Observe error boundary UI

### Expected Results:
- ✅ App doesn't crash
- ✅ Error boundary UI appears
- ✅ Error message displayed (dev mode shows stack)
- ✅ "Try Again" button works
- ✅ "Reload Page" button works
- ✅ Error tracked in analytics

### Visual Checks:
- [ ] Error icon displayed
- [ ] Message is clear
- [ ] Buttons are clickable
- [ ] Styling matches theme

---

## 5. ♿ Accessibility

### Keyboard Navigation Test:
1. Close mouse/trackpad
2. Use only keyboard:
   - `Tab` to navigate
   - `Enter/Space` to activate
   - `Escape` to go back
3. Navigate entire app

### Expected Results:
- ✅ All elements focusable
- ✅ Focus indicator visible
- ✅ Logical tab order
- ✅ Escape key works
- ✅ No keyboard traps

### Screen Reader Test (NVDA/JAWS/VoiceOver):
1. Enable screen reader
2. Navigate through app
3. Listen to announcements

### Expected Results:
- ✅ All buttons have labels
- ✅ Images have alt text
- ✅ Status updates announced
- ✅ Navigation clear
- ✅ No unlabeled elements

### Lighthouse Accessibility Audit:
```bash
# Run in Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility"
4. Generate report
```

### Expected Score:
- ✅ Score: 100/100
- ✅ No errors
- ✅ WCAG 2.1 AA passed

### Quick Checks:
- [ ] Skip to content link works
- [ ] All buttons have aria-labels
- [ ] Focus rings visible
- [ ] High contrast mode works
- [ ] Reduced motion respected

---

## 6. 📊 Analytics Tracking

### Test Steps:
1. Open browser console
2. Interact with app:
   - Upload image
   - Select style
   - Download result
   - Toggle theme
3. Check console logs

### Expected Console Output (Debug Mode):
```
[Analytics] Initialized (debug mode)
[Analytics] Page View: { pageName: 'upload' }
[Analytics] Event: { eventName: 'photo_upload_started' }
[Analytics] Event: { eventName: 'style_swap_started' }
[Analytics] Event: { eventName: 'style_swap_completed', duration: 2340 }
[Analytics] Event: { eventName: 'download' }
```

### Tracked Events Checklist:
- [ ] Page views (screen changes)
- [ ] Photo upload start
- [ ] Photo upload complete
- [ ] Style swap start
- [ ] Style swap complete
- [ ] Download action
- [ ] Share action
- [ ] Checkout action
- [ ] Theme toggle
- [ ] View change
- [ ] Errors

### Production Test:
1. Set `VITE_DEBUG=false`
2. Build for production
3. Check GA4 Real-Time reports

---

## 7. 🚀 Performance Optimizations

### React DevTools Profiler:
1. Install React DevTools extension
2. Go to Profiler tab
3. Click record
4. Interact with app
5. Stop recording

### Expected Results:
- ✅ Minimal re-renders
- ✅ Fast render times (<16ms)
- ✅ No unnecessary updates
- ✅ Memoized components highlighted

### Lighthouse Performance Audit:
```bash
# Steps:
1. Open DevTools (F12)
2. Go to Lighthouse
3. Select "Performance"
4. Generate report
```

### Target Scores:
- ✅ Performance: 95+
- ✅ First Contentful Paint: < 1.8s
- ✅ Largest Contentful Paint: < 2.5s
- ✅ Time to Interactive: < 3.8s
- ✅ Cumulative Layout Shift: < 0.1

### Memory Test:
1. Open DevTools → Performance Monitor
2. Interact with app for 5 minutes
3. Check memory usage

### Expected Results:
- ✅ Memory stable (no leaks)
- ✅ CPU usage reasonable
- ✅ No performance warnings

---

## 8. 📱 PWA Functionality

### Installation Test (Desktop):
1. Open in Chrome/Edge
2. Look for install icon in address bar
3. Click to install
4. Launch installed app

### Expected Results:
- ✅ Install prompt appears
- ✅ App installs successfully
- ✅ Opens in standalone mode
- ✅ No browser chrome
- ✅ Icon in app drawer

### Installation Test (Mobile - iOS):
1. Open in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Tap "Add"

### Installation Test (Mobile - Android):
1. Open in Chrome
2. Tap menu (⋮)
3. Select "Add to Home Screen"
4. Tap "Add"

### Offline Test:
1. Install app
2. Open DevTools → Network
3. Enable "Offline" mode
4. Reload app

### Expected Results:
- ✅ App loads from cache
- ✅ Static assets available
- ✅ Graceful offline message

### Manifest Validation:
```bash
# Chrome DevTools
1. Go to Application tab
2. Click "Manifest" in sidebar
3. Check for errors
```

### Expected:
- ✅ All fields populated
- ✅ Icons loaded
- ✅ No warnings
- ✅ Installability criteria met

---

## 9. 💬 Error Messages

### Network Error Test:
1. Disconnect internet
2. Upload image
3. Select style

### Expected:
- ✅ WifiOff icon (orange)
- ✅ "Network Error" title
- ✅ Clear description
- ✅ Retry button appears

### Server Error Test:
1. Temporarily modify API endpoint to invalid URL
2. Upload and process image

### Expected:
- ✅ ServerCrash icon (red)
- ✅ "Server Congested" title
- ✅ Retry progress bar
- ✅ Auto-retry message

### Timeout Error Test:
1. DevTools → Network → Add request delay
2. Process image

### Expected:
- ✅ Clock icon (yellow)
- ✅ "Request Timeout" title
- ✅ Helpful description

### Image Error Test:
1. Upload corrupted image file
2. Observe error

### Expected:
- ✅ ImageOff icon (purple)
- ✅ "Image Processing Error" title
- ✅ Actionable guidance

### Error Types Checklist:
- [ ] Network error displays correctly
- [ ] Server error shows retry progress
- [ ] Timeout error has clear message
- [ ] Image error is helpful
- [ ] Unknown error has fallback
- [ ] All errors dismissible
- [ ] Analytics tracks errors

---

## 🔍 Visual Regression Testing

### Manual Checks:
- [ ] Upload screen looks correct
- [ ] Swap screen layout intact
- [ ] Results screen displays properly
- [ ] Navigation dock positioned correctly
- [ ] Modals center properly
- [ ] Animations smooth
- [ ] Colors match design
- [ ] Typography consistent
- [ ] Icons render correctly
- [ ] Buttons styled properly

### Responsive Testing:
- [ ] Mobile view (375x812)
- [ ] Tablet view (900x1100)
- [ ] Desktop view
- [ ] Landscape orientation
- [ ] Portrait orientation

---

## 🐛 Common Issues & Solutions

### Issue: Retry not working
**Solution**: Check network tab, ensure API endpoint is correct

### Issue: Skeletons not showing
**Solution**: Throttle network speed in DevTools

### Issue: Analytics not logging
**Solution**: Check console for initialization message

### Issue: PWA not installable
**Solution**: Ensure HTTPS, manifest.json accessible, icons present

### Issue: Accessibility score low
**Solution**: Run audit again, check for missing aria-labels

### Issue: Images not compressing
**Solution**: Check console for compression logs, verify function called

---

## ✅ Final Acceptance Criteria

### Before Deployment:
- [ ] All tests passed
- [ ] Lighthouse scores meet targets
- [ ] No console errors
- [ ] Analytics configured
- [ ] API key in environment variable
- [ ] PWA icons added
- [ ] README updated
- [ ] CHANGELOG complete

### Production Checklist:
- [ ] HTTPS enabled
- [ ] Service worker active
- [ ] Analytics tracking
- [ ] Error monitoring setup
- [ ] Performance monitoring
- [ ] Security headers configured

---

## 📞 Support

If you encounter issues during testing:

1. Check console for error messages
2. Review IMPLEMENTATION_SUMMARY.md
3. Check CHANGELOG.md for known issues
4. Search GitHub issues
5. Create new issue with:
   - Browser/OS version
   - Steps to reproduce
   - Screenshots
   - Console logs

---

**Happy Testing! 🎉**
