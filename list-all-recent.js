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
      path: `/v1.0/users/${encodeURIComponent(account.email)}/messages?$top=50&$orderby=receivedDateTime%20desc`,
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
    // Filter for anything with "alon" or "web" in name/address/subject
    const matches = emails.filter(email => {
      const from = (email.from?.emailAddress?.name || '') + (email.from?.emailAddress?.address || '');
      const subject = email.subject || '';
      const search = (from + subject).toLowerCase();
      return search.includes('alon') || search.includes('webguys') || search.includes('web guys');
    });
    
    if (matches.length === 0) {
      console.log('No emails found with alon/webguys in sender or subject');
      console.log('\nShowing first 10 senders for reference:');
      emails.slice(0, 10).forEach((email, i) => {
        console.log(`${i+1}. ${email.from?.emailAddress?.name || 'Unknown'} <${email.from?.emailAddress?.address}> - ${email.subject}`);
      });
      return;
    }
    
    matches.forEach((email, i) => {
      console.log(`\n=== Email ${i + 1} ===`);
      console.log(`From: ${email.from?.emailAddress?.name || 'Unknown'} <${email.from?.emailAddress?.address || 'Unknown'}>`);
      console.log(`Subject: ${email.subject}`);
      console.log(`Received: ${email.receivedDateTime}`);
      console.log(`\n--- Full Body ---`);
      console.log(email.body?.content || email.bodyPreview);
    });
  })
  .catch(err => {
    console.error('Error:', err.message || err);
  });
