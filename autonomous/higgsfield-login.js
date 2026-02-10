const { chromium } = require('playwright');

async function loginToHiggsfield() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  try {
    console.log('Navigating to Higgsfield...');
    await page.goto('https://higgsfield.ai');
    await page.waitForTimeout(3000);
    
    await page.screenshot({ path: 'autonomous/output/higgsfield-1-initial.png' });
    console.log('Screenshot 1: Initial page with modal');
    
    // Close the promo modal - click the X button (top right of modal)
    console.log('Closing promo modal...');
    try {
      // The X is an SVG button, click by position relative to modal or use keyboard
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log('Escape didnt work, trying click...');
    }
    
    // Try clicking outside the modal to close it
    try {
      await page.click('div[aria-hidden="true"]', { force: true, position: { x: 50, y: 50 } });
      await page.waitForTimeout(1000);
    } catch (e) {}
    
    // Or click the X button directly
    try {
      await page.click('button:has(svg[class*="lucide"]), button:near(:text("LIMITED OFFER"))', { timeout: 3000 });
      await page.waitForTimeout(1000);
    } catch (e) {}
    
    await page.screenshot({ path: 'autonomous/output/higgsfield-2-after-close.png' });
    console.log('Screenshot 2: After trying to close modal');
    
    // Navigate directly to auth page
    console.log('Navigating directly to login page...');
    await page.goto('https://higgsfield.ai/auth/sign-in');
    await page.waitForTimeout(3000);
    
    console.log('Current URL:', page.url());
    await page.screenshot({ path: 'autonomous/output/higgsfield-3-login-page.png' });
    console.log('Screenshot 3: Login/auth page');
    
    // See what auth options exist
    const hasGoogle = await page.$('text=Google') !== null;
    const hasDiscord = await page.$('text=Discord') !== null;
    const hasEmail = await page.$('input[type="email"]') !== null;
    
    console.log('Auth options - Google:', hasGoogle, 'Discord:', hasDiscord, 'Email:', hasEmail);
    
    console.log('Done! Check autonomous/output/ for screenshots');
    
  } catch (err) {
    console.error('Error:', err.message);
    await page.screenshot({ path: 'autonomous/output/higgsfield-error.png' }).catch(() => {});
  } finally {
    await browser.close();
  }
}

loginToHiggsfield();
