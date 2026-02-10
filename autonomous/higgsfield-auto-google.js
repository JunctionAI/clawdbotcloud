const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function autoGoogleLogin() {
  console.log('Launching browser (visible)...');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });
  
  const page = await context.newPage();
  
  try {
    // Go directly to auth page to avoid homepage modal
    console.log('Navigating directly to auth page...');
    await page.goto('https://higgsfield.ai/auth/sign-in', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Close any modal that appears with Escape
    console.log('Pressing Escape to close any modals...');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    await page.screenshot({ path: 'autonomous/output/auto-1-login.png' });
    console.log('Screenshot 1: Login page');
    
    // Force click the Google button
    console.log('Clicking Continue with Google...');
    await page.click('text=Continue with Google', { force: true });
    
    // Wait for navigation
    await page.waitForTimeout(5000);
    
    console.log('Current URL:', page.url());
    await page.screenshot({ path: 'autonomous/output/auto-2-google.png' });
    console.log('Screenshot 2: After Google click');
    
    // Check if we're on Google's auth page
    if (page.url().includes('accounts.google.com')) {
      console.log('On Google auth page!');
      
      // Look for account selector
      const accounts = await page.$$('div[data-identifier]');
      console.log(`Found ${accounts.length} saved accounts`);
      
      if (accounts.length > 0) {
        console.log('Clicking first account...');
        await accounts[0].click();
        await page.waitForTimeout(5000);
        console.log('After account click:', page.url());
      } else {
        console.log('No saved accounts - need manual email entry');
      }
      
      await page.screenshot({ path: 'autonomous/output/auto-3-google-state.png' });
    }
    
    // Final check
    await page.waitForTimeout(3000);
    console.log('Final URL:', page.url());
    
    if (page.url().includes('higgsfield.ai') && !page.url().includes('auth')) {
      console.log('SUCCESS! Logged into Higgsfield!');
      
      // Save session
      const cookies = await context.cookies();
      fs.writeFileSync('autonomous/higgsfield-cookies.json', JSON.stringify(cookies, null, 2));
      await context.storageState({ path: 'autonomous/higgsfield-state.json' });
      console.log('Session saved!');
      
      await page.goto('https://higgsfield.ai/generate');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'autonomous/output/auto-final-success.png' });
      console.log('Screenshot: Generate page ready!');
    } else {
      console.log('Not logged in yet - may need manual intervention');
    }
    
    // Keep browser open briefly
    console.log('Browser staying open for 15s...');
    await page.waitForTimeout(15000);
    
  } catch (err) {
    console.error('Error:', err.message);
    await page.screenshot({ path: 'autonomous/output/auto-error.png' }).catch(() => {});
  } finally {
    await browser.close();
  }
}

autoGoogleLogin();
