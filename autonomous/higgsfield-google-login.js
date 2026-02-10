const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

async function loginWithGoogle() {
  // Use existing Chrome profile to leverage Google login
  const userDataDir = path.join(os.homedir(), 'AppData', 'Local', 'Google', 'Chrome', 'User Data');
  
  console.log('Launching browser with Chrome profile...');
  console.log('User data dir:', userDataDir);
  
  // Launch with persistent context to use existing cookies
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false, // Need non-headless for first Google auth
    channel: 'chrome', // Use installed Chrome
    args: [
      '--profile-directory=Default',
      '--disable-blink-features=AutomationControlled'
    ],
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = context.pages()[0] || await context.newPage();
  
  try {
    console.log('Navigating to Higgsfield login...');
    await page.goto('https://higgsfield.ai/auth/sign-in');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: 'autonomous/output/hf-google-1-login.png' });
    console.log('Screenshot 1: Login page');
    
    // Click Continue with Google
    console.log('Clicking Continue with Google...');
    await page.click('text=Continue with Google');
    await page.waitForTimeout(5000);
    
    console.log('Current URL:', page.url());
    await page.screenshot({ path: 'autonomous/output/hf-google-2-after-click.png' });
    console.log('Screenshot 2: After Google click');
    
    // If we're redirected back to Higgsfield, we're logged in
    if (page.url().includes('higgsfield.ai') && !page.url().includes('auth')) {
      console.log('SUCCESS! Logged into Higgsfield');
      
      // Navigate to generation page
      await page.goto('https://higgsfield.ai/generate');
      await page.waitForTimeout(3000);
      
      await page.screenshot({ path: 'autonomous/output/hf-google-3-generate.png' });
      console.log('Screenshot 3: Generation page - READY FOR MARKETING');
    } else {
      console.log('May need manual Google account selection...');
      // Wait for user to complete Google auth if needed
      console.log('Waiting 30s for manual auth if needed...');
      await page.waitForTimeout(30000);
      
      await page.screenshot({ path: 'autonomous/output/hf-google-3-final.png' });
      console.log('Screenshot 3: Final state');
    }
    
    // Save cookies for future headless use
    const cookies = await context.cookies();
    const fs = require('fs');
    fs.writeFileSync('autonomous/higgsfield-cookies.json', JSON.stringify(cookies, null, 2));
    console.log('Cookies saved for future headless use!');
    
  } catch (err) {
    console.error('Error:', err.message);
    await page.screenshot({ path: 'autonomous/output/hf-google-error.png' }).catch(() => {});
  } finally {
    await context.close();
  }
}

loginWithGoogle();
