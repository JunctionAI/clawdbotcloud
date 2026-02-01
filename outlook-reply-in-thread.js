const https = require('https');
const fs = require('fs');

// CORRECT WAY TO REPLY IN EMAIL THREADS
// Use this script template for all email replies going forward

const creds = JSON.parse(fs.readFileSync('C:\\Users\\Nightgalem\\clawd\\outlook-credentials.json', 'utf8'));
const account = creds.accounts[0];

const getToken = () => {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      client_id: account.clientId,
      scope: 'https://graph.microsoft.com/.default',
      client_secret: account.clientSecret,
      grant_type: 'client_credentials'
    }).toString();

    const options = {
      hostname: 'login.microsoftonline.com',
      path: `/${account.tenantId}/oauth2/v2.0/token`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).access_token);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
};

// Step 1: Find the thread to reply to
const findThread = async (fromEmail, subject) => {
  const token = await getToken();
  const filter = encodeURIComponent(`from/emailAddress/address eq '${fromEmail}'`);
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/users/${encodeURIComponent(account.email)}/messages?$filter=${filter}&$top=10&$select=id,subject,conversationId,toRecipients,ccRecipients&$orderby=receivedDateTime desc`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const messages = JSON.parse(data).value || [];
          // Find the most recent message matching the subject
          const match = messages.find(m => m.subject && m.subject.includes(subject));
          resolve(match);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
};

// Step 2: Reply in thread using the message ID
const replyInThread = async (messageId, replyText) => {
  const token = await getToken();
  
  const reply = {
    comment: replyText
  };
  
  const postData = JSON.stringify(reply);
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/users/${encodeURIComponent(account.email)}/messages/${messageId}/reply`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 202 || res.statusCode === 200) {
          resolve('Reply sent in thread successfully');
        } else {
          reject(new Error(`Failed to reply: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
};

// Usage example:
const main = async () => {
  try {
    // Find the thread
    const message = await findThread('alon@thewebguys.co.nz', 'Ecom Klaviyo Client');
    
    if (!message) {
      console.error('Thread not found');
      return;
    }
    
    console.log(`Found thread: ${message.subject}`);
    console.log(`Message ID: ${message.id}`);
    
    // Reply in thread
    const reply = "Hi Andi,\n\nHope you're doing well. Please let me know what the next step is - excited to get started here.\n\nKind regards,\nTom";
    
    await replyInThread(message.id, reply);
    console.log('✅ Reply sent in thread');
    
  } catch (err) {
    console.error('❌ ERROR:', err.message || err);
  }
};

// Uncomment to test:
// main();

module.exports = { findThread, replyInThread };
