const https = require('https');
const fs = require('fs');
const os = require('os');
const querystring = require('querystring');

const credsPath = os.homedir() + '/clawd/xero-credentials.json';
const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));

const postData = querystring.stringify({
  grant_type: 'refresh_token',
  refresh_token: creds.refreshToken
});

const auth = Buffer.from(`${creds.clientId}:${creds.clientSecret}`).toString('base64');

const options = {
  hostname: 'identity.xero.com',
  path: '/connect/token',
  method: 'POST',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const response = JSON.parse(data);
    
    if (response.access_token) {
      creds.accessToken = response.access_token;
      creds.refreshToken = response.refresh_token;
      creds.expiresAt = Date.now() + (response.expires_in * 1000);
      
      fs.writeFileSync(credsPath, JSON.stringify(creds, null, 2));
      console.log('✅ Token refreshed successfully');
      console.log(`New token expires at: ${new Date(creds.expiresAt).toISOString()}`);
    } else {
      console.error('❌ Failed to refresh token:');
      console.error(response);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Request error:', e);
});

req.write(postData);
req.end();
