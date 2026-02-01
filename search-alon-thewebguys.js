const https = require('https');
const fs = require('fs');

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

const getEmails = async () => {
  const token = await getToken();
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/users/${encodeURIComponent(account.email)}/messages?$top=100&$orderby=receivedDateTime%20desc`,
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
          resolve(JSON.parse(data).value);
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
    // Look for emails from alon@thewebguys.co.nz or with Klaviyo/Ecom in subject
    const matches = emails.filter(email => {
      const address = (email.from?.emailAddress?.address || '').toLowerCase();
      const subject = (email.subject || '').toLowerCase();
      return address.includes('alon@thewebguys.co.nz') || 
             address.includes('thewebguys') ||
             (subject.includes('klaviyo') && subject.includes('ecom'));
    });
    
    if (matches.length === 0) {
      console.log('No emails found from alon@thewebguys.co.nz or with Ecom/Klaviyo subject');
      return;
    }
    
    matches.forEach((email, i) => {
      console.log(`\n=== Email ${i + 1} ===`);
      console.log(`From: ${email.from?.emailAddress?.name || 'Unknown'} <${email.from?.emailAddress?.address || 'Unknown'}>`);
      console.log(`Subject: ${email.subject}`);
      console.log(`Received: ${email.receivedDateTime}`);
      console.log(`\n--- Full Body ---`);
      const body = email.body?.content || email.bodyPreview;
      // Strip HTML tags for cleaner output
      const cleanBody = body.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
      console.log(cleanBody);
    });
  })
  .catch(err => {
    console.error('Error:', err.message || err);
  });
