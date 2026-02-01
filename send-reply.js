const https = require('https');
const fs = require('fs');

const credsPath = 'outlook-credentials.json';
const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
const account = creds.accounts.find(a => a.email === 'tom@junctionmedia.ai');

const messageId = 'AQMkADhkMDc2MDNlLTI2YzQtNDJkOS1iNzJjLWM1YjI0NjFhMjYxZQBGAAAD3H8ZvjjA4k6zBU8QrEu1LAcAcUTYKOyCU0Ob0Twv-ErCrQAAAgEMAAAAcUTYKOyCU0Ob0Twv-ErCrQACFTrjpwAAAA==';

const replyMessage = `Hi Sam,

Monday 12pm works great for me if that suits? Happy to discuss automations and lock in the email marketing plan.

Let me know what suits.

Thanks,
Tom`;

async function getToken() {
  const postData = new URLSearchParams({
    client_id: account.clientId,
    scope: 'https://graph.microsoft.com/.default',
    client_secret: account.clientSecret,
    grant_type: 'client_credentials'
  }).toString();

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'login.microsoftonline.com',
      path: `/${account.tenantId}/oauth2/v2.0/token`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const result = JSON.parse(data);
        resolve(result.access_token);
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function sendReply() {
  const token = await getToken();
  
  const replyData = JSON.stringify({
    comment: replyMessage
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.microsoft.com',
      path: '/v1.0/users/' + encodeURIComponent(account.email) + '/messages/' + encodeURIComponent(messageId) + '/replyAll',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(replyData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 202 || res.statusCode === 200) {
          console.log('✅ Reply sent successfully!');
        } else {
          console.log('Status:', res.statusCode);
          console.log('Response:', data);
        }
      });
    });
    req.on('error', reject);
    req.write(replyData);
    req.end();
  });
}

sendReply().catch(console.error);
