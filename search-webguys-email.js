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

const searchEmails = async () => {
  const token = await getToken();
  const searchQuery = encodeURIComponent("webguys OR web guys");
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/users/${encodeURIComponent(account.email)}/messages?$search="${searchQuery}"&$top=10&$orderby=receivedDateTime%20desc`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ConsistencyLevel': 'eventual'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.value && parsed.value.length > 0) {
            resolve(parsed.value);
          } else {
            resolve([]);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
};

searchEmails()
  .then(emails => {
    if (emails.length === 0) {
      console.log('No emails found from/about webguys');
      return;
    }
    
    emails.forEach((email, i) => {
      console.log(`\n=== Email ${i + 1} ===`);
      console.log(`From: ${email.from?.emailAddress?.name || 'Unknown'} <${email.from?.emailAddress?.address || 'Unknown'}>`);
      console.log(`Subject: ${email.subject}`);
      console.log(`Received: ${email.receivedDateTime}`);
      console.log(`\n--- Body Preview ---`);
      console.log(email.bodyPreview);
      console.log(`\n--- Full Body (first 3000 chars) ---`);
      console.log((email.body?.content || '').substring(0, 3000));
    });
  })
  .catch(err => {
    console.error('Error:', err.message || err);
  });
