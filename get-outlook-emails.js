const https = require('https');
const fs = require('fs');

const creds = JSON.parse(fs.readFileSync('C:\\Users\\Nightgalem\\clawd\\outlook-credentials.json', 'utf8'));
const account = creds.accounts[0]; // tom@junctionmedia.ai

// Get access token
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
          const parsed = JSON.parse(data);
          resolve(parsed.access_token);
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

// Get emails
const getEmails = async () => {
  const token = await getToken();
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/users/${encodeURIComponent(account.email)}/messages?$top=20&$orderby=receivedDateTime%20desc`,
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
          const parsed = JSON.parse(data);
          resolve(parsed.value);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
};

getEmails()
  .then(emails => {
    emails.forEach((email, i) => {
      console.log(`\n--- Email ${i + 1} ---`);
      console.log(`From: ${email.from?.emailAddress?.name || 'Unknown'} <${email.from?.emailAddress?.address || 'Unknown'}>`);
      console.log(`Subject: ${email.subject}`);
      console.log(`Received: ${email.receivedDateTime}`);
      console.log(`Preview: ${email.bodyPreview.substring(0, 200)}...`);
    });
  })
  .catch(err => {
    console.error('Error:', err.message || err);
  });
