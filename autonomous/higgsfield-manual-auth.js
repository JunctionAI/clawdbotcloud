/**
 * One-time manual auth for Higgsfield
 * Opens browser, you log in, cookies get saved for future headless use
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const COOKIE_FILE = path.join(__dirname, 'higgsfield-cookies.json');
const STATE_FILE = path.join(__dirname, 'higgsfield-state.json');

async function manualAuth() {
  console.log('=================================');
  console.log('HIGGSFIELD ONE-TIME LOGIN SETUP');
  console.log('=================================');
  console.log('');
  console.log('A browser window will open.');
  console.log('1. Click "Continue with Google"');
  console.log('2. Log into your Google account');
  console.log('3. Once you see the Higgsfield dashboard, wait 5 seconds');
  console.log('4. The browser will close and save your session');
  console.log('');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });
  
  const page = await context.newPage();
  
  try {
    // Navigate to Higgsfield login
    await page.goto('https://higgsfield.ai/auth/sign-in');
    console.log('');
    console.log('>>> Browser opened! Please log in with Google...');
    console.log('>>> Waiting for you to complete login...');
    
    // Wait for successful login (URL changes away from auth)
    await page.waitForURL(url => {
      const urlStr = url.toString();
      return urlStr.includes('higgsfield.ai') && !urlStr.includes('/auth/');
    }, { timeout: 120000 }); // 2 min timeout
    
    console.log('');
    console.log('Login detected! Saving session...');
    
    // Wait a bit for page to fully load
    await page.waitForTimeout(3000);
    
    // Save cookies
    const cookies = await context.cookies();
    fs.writeFileSync(COOKIE_FILE, JSON.stringify(cookies, null, 2));
    console.log(`Saved ${cookies.length} cookies to ${COOKIE_FILE}`);
    
    // Save storage state (includes localStorage)
    await context.storageState({ path: STATE_FILE });
    console.log(`Saved storage state to ${STATE_FILE}`);
    
    // Navigate to generate page and screenshot
    await page.goto('https://higgsfield.ai/generate');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'autonomous/output/higgsfield-logged-in.png' });
    console.log('Screenshot saved: higgsfield-logged-in.png');
    
    console.log('');
    console.log('=================================');
    console.log('SUCCESS! Session saved.');
    console.log('Future runs can use headless mode.');
    console.log('=================================');
    
  } catch (err) {
    if (err.name === 'TimeoutError') {
      console.error('Timeout waiting for login. Please try again.');
    } else {
      console.error('Error:', err.message);
    }
  } finally {
    await browser.close();
  }
}

manualAuth();
