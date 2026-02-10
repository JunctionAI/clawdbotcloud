/**
 * Extract cookies from Chrome for Higgsfield
 * Copies Chrome's cookie database and extracts relevant cookies
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

async function extractCookies() {
  const userDataDir = path.join(os.homedir(), 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default');
  const cookieDb = path.join(userDataDir, 'Network', 'Cookies');
  const tempCookieDb = path.join(os.tmpdir(), 'chrome_cookies_copy');
  
  console.log('Chrome cookie DB:', cookieDb);
  
  if (!fs.existsSync(cookieDb)) {
    console.error('Cookie database not found!');
    return;
  }
  
  // Copy cookie database (Chrome has it locked)
  console.log('Copying cookie database...');
  fs.copyFileSync(cookieDb, tempCookieDb);
  
  // Use sqlite3 to read cookies
  console.log('Reading cookies for higgsfield.ai and google.com...');
  
  try {
    // Check if sqlite3 is available
    const result = execSync(`sqlite3 "${tempCookieDb}" "SELECT host_key, name, path, encrypted_value FROM cookies WHERE host_key LIKE '%higgsfield%' OR host_key LIKE '%google%' LIMIT 50;"`, {
      encoding: 'utf8',
      timeout: 10000
    });
    console.log('Found cookies:', result.substring(0, 500));
  } catch (e) {
    console.log('sqlite3 not available or error:', e.message);
    console.log('Will use alternative approach...');
  }
  
  // Clean up
  fs.unlinkSync(tempCookieDb);
  
  console.log('Done!');
}

extractCookies().catch(console.error);
