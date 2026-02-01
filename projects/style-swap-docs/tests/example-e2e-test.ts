/**
 * Example E2E Test - Try-On Flow with Playwright
 * 
 * This file demonstrates how to write end-to-end tests that test
 * the application in a real browser environment.
 * 
 * Location: e2e/try-on-flow.spec.ts
 */

import { test, expect, Page } from '@playwright/test';
import path from 'path';

// Test fixtures
const SELFIE_PATH = path.join(__dirname, 'fixtures', 'selfie.jpg');
const INVALID_FILE_PATH = path.join(__dirname, 'fixtures', 'invalid.txt');

// Helper function to upload file
async function uploadSelfie(page: Page, filePath: string) {
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(filePath);
}

// Helper function to wait for processing
async function waitForProcessing(page: Page) {
  await page.waitForSelector('[data-testid="loading-spinner"]', {
    state: 'visible',
  });
  await page.waitForSelector('[data-testid="loading-spinner"]', {
    state: 'hidden',
    timeout: 15000,
  });
}

test.describe('Style Swap E2E - Try-On Flow', () => {
  // Run before each test
  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });
  
  // Test 1: Page loads correctly
  test('homepage loads with all elements', async ({ page }) => {
    // Verify title
    await expect(page).toHaveTitle(/Style Swap/i);
    
    // Verify main sections
    await expect(page.getByText(/upload.*selfie/i)).toBeVisible();
    await expect(page.getByText(/browse.*catalog/i)).toBeVisible();
    
    // Verify upload zone
    await expect(page.getByText(/drag.*drop/i)).toBeVisible();
    
    // Verify catalog is initially disabled
    const catalogSection = page.locator('[data-testid="clothing-catalog"]');
    await expect(catalogSection).toHaveClass(/opacity-50/);
  });
  
  // Test 2: File upload works
  test('uploads selfie successfully', async ({ page }) => {
    // Upload file
    await uploadSelfie(page, SELFIE_PATH);
    
    // Verify preview appears
    const preview = page.locator('img[alt*="preview"]');
    await expect(preview).toBeVisible();
    
    // Verify catalog becomes active
    const catalogSection = page.locator('[data-testid="clothing-catalog"]');
    await expect(catalogSection).not.toHaveClass(/opacity-50/);
    
    // Verify clothing items are visible
    const items = page.locator('[data-testid="clothing-item"]');
    await expect(items.first()).toBeVisible();
  });
  
  // Test 3: Invalid file rejection
  test('rejects invalid file type', async ({ page }) => {
    // Listen for dialog (alert)
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('invalid');
      await dialog.accept();
    });
    
    // Try to upload invalid file
    await uploadSelfie(page, INVALID_FILE_PATH);
    
    // Verify preview does NOT appear
    const preview = page.locator('img[alt*="preview"]');
    await expect(preview).not.toBeVisible();
  });
  
  // Test 4: Complete try-on flow
  test('completes full try-on process', async ({ page }) => {
    // Step 1: Upload selfie
    await uploadSelfie(page, SELFIE_PATH);
    
    // Wait for preview
    await expect(page.locator('img[alt*="preview"]')).toBeVisible();
    
    // Step 2: Select clothing item
    const firstItem = page.locator('[data-testid="clothing-item"]').first();
    await firstItem.click();
    
    // Step 3: Wait for processing
    await waitForProcessing(page);
    
    // Step 4: Verify result
    const comparisonSlider = page.locator('[data-testid="comparison-slider"]');
    await expect(comparisonSlider).toBeVisible({ timeout: 15000 });
    
    // Verify analysis text appears
    await expect(page.getByText(/looks/i)).toBeVisible();
    
    // Take screenshot for visual regression
    await page.screenshot({ path: 'test-results/try-on-complete.png' });
  });
  
  // Test 5: Comparison slider interaction
  test('slider works with mouse drag', async ({ page }) => {
    // Complete try-on first
    await uploadSelfie(page, SELFIE_PATH);
    await page.locator('[data-testid="clothing-item"]').first().click();
    await waitForProcessing(page);
    
    // Find slider
    const slider = page.locator('[role="slider"]');
    await expect(slider).toBeVisible();
    
    // Get initial position
    const initialValue = await slider.getAttribute('aria-valuenow');
    
    // Drag slider to the right
    const sliderBox = await slider.boundingBox();
    if (sliderBox) {
      await page.mouse.move(sliderBox.x + sliderBox.width / 2, sliderBox.y + sliderBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(sliderBox.x + sliderBox.width * 0.75, sliderBox.y + sliderBox.height / 2);
      await page.mouse.up();
    }
    
    // Verify position changed
    const newValue = await slider.getAttribute('aria-valuenow');
    expect(parseInt(newValue || '50')).toBeGreaterThan(parseInt(initialValue || '50'));
  });
  
  // Test 6: Keyboard navigation
  test('slider works with keyboard', async ({ page }) => {
    // Complete try-on
    await uploadSelfie(page, SELFIE_PATH);
    await page.locator('[data-testid="clothing-item"]').first().click();
    await waitForProcessing(page);
    
    // Focus slider
    const slider = page.locator('[role="slider"]');
    await slider.focus();
    
    // Get initial position
    const initialValue = await slider.getAttribute('aria-valuenow');
    
    // Press arrow keys
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    
    // Verify position increased
    const newValue = await slider.getAttribute('aria-valuenow');
    expect(parseInt(newValue || '50')).toBeGreaterThan(parseInt(initialValue || '50'));
    
    // Press left arrows
    await page.keyboard.press('ArrowLeft');
    
    // Verify position decreased
    const finalValue = await slider.getAttribute('aria-valuenow');
    expect(parseInt(finalValue || '50')).toBeLessThan(parseInt(newValue || '50'));
  });
  
  // Test 7: Category filtering
  test('filters clothing by category', async ({ page }) => {
    // Upload selfie first
    await uploadSelfie(page, SELFIE_PATH);
    
    // Count all items initially
    const allItems = page.locator('[data-testid="clothing-item"]');
    const totalCount = await allItems.count();
    
    // Click "Tops" category
    await page.getByText(/^tops$/i).click();
    
    // Wait for filter to apply
    await page.waitForTimeout(500);
    
    // Count tops
    const topsItems = page.locator('[data-testid="clothing-item"][data-category="tops"]');
    const topsCount = await topsItems.count();
    
    // Verify filtered correctly
    expect(topsCount).toBeLessThanOrEqual(totalCount);
    
    // Verify all visible items are tops
    const visibleItems = await allItems.all();
    for (const item of visibleItems) {
      const category = await item.getAttribute('data-category');
      expect(category).toBe('tops');
    }
  });
  
  // Test 8: Try another outfit
  test('allows trying multiple outfits', async ({ page }) => {
    // First try-on
    await uploadSelfie(page, SELFIE_PATH);
    await page.locator('[data-testid="clothing-item"]').first().click();
    await waitForProcessing(page);
    
    // Verify result
    await expect(page.locator('[data-testid="comparison-slider"]')).toBeVisible();
    
    // Click "Try Another"
    await page.getByText(/try another/i).click();
    
    // Verify back to catalog
    await expect(page.locator('[data-testid="comparison-slider"]')).not.toBeVisible();
    await expect(page.getByText(/browse catalog/i)).toBeVisible();
    
    // Select different item
    await page.locator('[data-testid="clothing-item"]').nth(1).click();
    await waitForProcessing(page);
    
    // Verify new result
    await expect(page.locator('[data-testid="comparison-slider"]')).toBeVisible();
  });
  
  // Test 9: Mobile responsiveness
  test('works on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify elements are visible
    await expect(page.getByText(/upload.*selfie/i)).toBeVisible();
    
    // Upload file
    await uploadSelfie(page, SELFIE_PATH);
    
    // Verify preview
    await expect(page.locator('img[alt*="preview"]')).toBeVisible();
    
    // Verify catalog is scrollable
    const catalog = page.locator('[data-testid="clothing-catalog"]');
    await expect(catalog).toBeVisible();
    
    // Select item
    await page.locator('[data-testid="clothing-item"]').first().click();
    
    // Wait for result
    await waitForProcessing(page);
    
    // Verify slider works on mobile
    const slider = page.locator('[role="slider"]');
    await expect(slider).toBeVisible();
    
    // Test touch interaction
    const sliderBox = await slider.boundingBox();
    if (sliderBox) {
      await page.touchscreen.tap(sliderBox.x + sliderBox.width * 0.7, sliderBox.y + sliderBox.height / 2);
    }
  });
  
  // Test 10: Error handling
  test('handles API errors gracefully', async ({ page }) => {
    // Intercept API call and force error
    await page.route('**/api/try-on', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Processing failed',
          code: 'PROCESSING_FAILED',
        }),
      });
    });
    
    // Upload and select
    await uploadSelfie(page, SELFIE_PATH);
    await page.locator('[data-testid="clothing-item"]').first().click();
    
    // Wait for error message
    await expect(page.getByText(/processing failed/i)).toBeVisible();
    
    // Verify retry option appears
    await expect(page.getByText(/try again/i)).toBeVisible();
  });
  
  // Test 11: Performance
  test('loads quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const timing = performance.timing;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart,
      };
    });
    
    console.log('Performance Metrics:', performanceMetrics);
  });
  
  // Test 12: Accessibility
  test('meets accessibility standards', async ({ page }) => {
    // Upload and complete flow
    await uploadSelfie(page, SELFIE_PATH);
    await page.locator('[data-testid="clothing-item"]').first().click();
    await waitForProcessing(page);
    
    // Check for proper heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);
    
    // Check all images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});

/**
 * E2E Testing Best Practices Demonstrated:
 * 
 * 1. Test real user scenarios
 * 2. Use page object pattern (helpers)
 * 3. Wait for elements properly
 * 4. Test mobile responsiveness
 * 5. Test error scenarios
 * 6. Test accessibility
 * 7. Measure performance
 * 8. Take screenshots for debugging
 * 9. Use fixtures for test data
 * 10. Test keyboard and mouse interactions
 */

/**
 * Running E2E Tests:
 * 
 * # Install Playwright
 * npm install --save-dev @playwright/test
 * 
 * # Install browsers
 * npx playwright install
 * 
 * # Run tests
 * npx playwright test
 * 
 * # Run tests in UI mode
 * npx playwright test --ui
 * 
 * # Run specific test
 * npx playwright test try-on-flow.spec.ts
 * 
 * # Run in headed mode (see browser)
 * npx playwright test --headed
 * 
 * # Debug tests
 * npx playwright test --debug
 */
