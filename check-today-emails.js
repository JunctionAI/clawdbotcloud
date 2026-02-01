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

const getRecentEmails = async () => {
  const token = await getToken();
  
  // Get last 30 emails from inbox
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/users/${encodeURIComponent(account.email)}/mailFolders/inbox/messages?$top=30&$orderby=receivedDateTime desc`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          console.log(`\nLAST 30 INBOX EMAILS:\n`);
          
          result.value.forEach((email, index) => {
            const from = email.from?.emailAddress?.address || 'Unknown';
            const name = email.from?.emailAddress?.name || '';
            
            // Highlight if it contains "kostka"
            const isKostka = (from + name + email.subject + email.bodyPreview).toLowerCase().includes('kostka');
            const marker = isKostka ? '>>> KOSTKA <<<' : '';
            
            console.log(`${index + 1}. ${marker}`);
            console.log(`From: ${name} <${from}>`);
            console.log(`Subject: ${email.subject}`);
            console.log(`Date: ${email.receivedDateTime}`);
            console.log(`Preview: ${email.bodyPreview.substring(0, 150)}...`);
            console.log('---\n');
          });
          
          resolve(result.value);
        } else {
          reject(new Error(`Failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
};

getRecentEmails()
  .then(() => console.log('\nDone.'))
  .catch(err => console.error('ERROR:', err.message || err));
