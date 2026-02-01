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
  
  // Search for emails from January 21, 2026
  const filter = encodeURIComponent("from/emailAddress/address eq 'alon@thewebguys.co.nz'");
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/users/${encodeURIComponent(account.email)}/messages?$filter=${filter}&$top=10&$select=id,subject,from,toRecipients,ccRecipients,receivedDateTime,body,bodyPreview`,
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
          resolve(JSON.parse(data).value || []);
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
    if (emails.length === 0) {
      console.log('No emails found from alon@thewebguys.co.nz');
      return;
    }
    
    emails.forEach((email, i) => {
      console.log(`\n=== Email ${i + 1} ===`);
      console.log(`From: ${email.from?.emailAddress?.name || 'Unknown'} <${email.from?.emailAddress?.address || 'Unknown'}>`);
      console.log(`To: ${email.toRecipients?.map(r => `${r.emailAddress.name} <${r.emailAddress.address}>`).join(', ')}`);
      console.log(`CC: ${email.ccRecipients?.map(r => `${r.emailAddress.name || 'Unknown'} <${r.emailAddress.address}>`).join(', ') || 'None'}`);
      console.log(`Subject: ${email.subject}`);
      console.log(`Received: ${email.receivedDateTime}`);
      console.log(`ID: ${email.id}`);
      console.log(`\n--- Body ---`);
      const body = email.body?.content || email.bodyPreview;
      const cleanBody = body.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
      console.log(cleanBody);
    });
  })
  .catch(err => {
    console.error('Error:', err.message || err);
    if (err.response) console.error('Response:', err.response);
  });
