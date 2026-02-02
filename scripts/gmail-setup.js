#!/usr/bin/env node
/**
 * Gmail API Setup Helper
 * Guides through OAuth2 setup for Gmail API access
 */

import { google } from 'googleapis';
import fs from 'fs';
import readline from 'readline';
import { promisify } from 'util';

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.modify'
];

const CREDENTIALS_PATH = 'google-credentials.json';
const TOKEN_PATH = 'gmail-token.json';

// Instructions
console.log('═'.repeat(80));
console.log('📧  GMAIL API SETUP');
console.log('═'.repeat(80));
console.log('');
console.log('STEP 1: Enable Gmail API');
console.log('1. Go to https://console.cloud.google.com/');
console.log('2. Create a new project or select existing one');
console.log('3. Enable Gmail API: https://console.cloud.google.com/apis/library/gmail.googleapis.com');
console.log('4. Create OAuth 2.0 credentials:');
console.log('   - Go to Credentials → Create Credentials → OAuth client ID');
console.log('   - Application type: Desktop app');
console.log('   - Name: Gmail Email Intelligence');
console.log('5. Download the JSON file');
console.log('6. Save it as: google-credentials.json');
console.log('');

// Check if credentials exist
if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.log('❌ google-credentials.json not found!');
  console.log('');
  console.log('Please:');
  console.log('1. Follow the steps above to create OAuth credentials');
  console.log('2. Download the JSON file');
  console.log('3. Save it as google-credentials.json in this directory');
  console.log('4. Run this script again');
  console.log('');
  process.exit(1);
}

console.log('✅ Found google-credentials.json');
console.log('');

// Load credentials
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Check if token already exists
if (fs.existsSync(TOKEN_PATH)) {
  console.log('✅ Gmail token already exists!');
  console.log('');
  
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  oAuth2Client.setCredentials(token);
  
  // Test the connection
  console.log('Testing Gmail connection...');
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  
  try {
    const res = await gmail.users.getProfile({ userId: 'me' });
    console.log('✅ Connection successful!');
    console.log(`📧 Email: ${res.data.emailAddress}`);
    console.log(`📊 Total messages: ${res.data.messagesTotal}`);
    console.log('');
    console.log('🎉 Gmail API is ready to use!');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    console.log('');
    console.log('Token may be expired. Delete gmail-token.json and run this script again.');
  }
  
  process.exit(0);
}

// Generate auth URL
console.log('STEP 2: Authorize Access');
console.log('─'.repeat(80));
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('');
console.log('Open this URL in your browser:');
console.log('');
console.log(authUrl);
console.log('');

// Wait for auth code
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Paste the authorization code here: ', async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    
    // Save token
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
    console.log('');
    console.log('✅ Token saved to gmail-token.json');
    
    // Test connection
    console.log('');
    console.log('Testing Gmail connection...');
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const res = await gmail.users.getProfile({ userId: 'me' });
    
    console.log('✅ Connection successful!');
    console.log(`📧 Email: ${res.data.emailAddress}`);
    console.log(`📊 Total messages: ${res.data.messagesTotal}`);
    console.log('');
    console.log('═'.repeat(80));
    console.log('🎉 SETUP COMPLETE! Gmail API is ready to use.');
    console.log('═'.repeat(80));
    console.log('');
    console.log('Next steps:');
    console.log('1. Run: node scripts/email-intelligence.js test');
    console.log('2. Add to heartbeat: node scripts/email-intelligence.js monitor');
    
  } catch (err) {
    console.error('❌ Error retrieving access token:', err.message);
  } finally {
    rl.close();
  }
});
