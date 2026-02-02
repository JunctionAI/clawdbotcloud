#!/usr/bin/env node
import https from 'https';
import fs from 'fs';
import { URLSearchParams } from 'url';

const credsPath = 'xero-credentials.json';
const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));

const postData = new URLSearchParams({
  grant_type: 'refresh_token',
  refresh_token: creds.refreshToken
}).toString();

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
      console.log(`Expires: ${new Date(creds.expiresAt).toLocaleString('en-NZ', {timeZone: 'Pacific/Auckland'})}`);
    } else {
      console.error('❌ Failed to refresh token:');
      console.error(response);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Request error:', e);
  process.exit(1);
});

req.write(postData);
req.end();
