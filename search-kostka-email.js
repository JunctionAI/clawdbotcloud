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
  
  // Search for emails from or mentioning John Kostka today
  const filter = `receivedDateTime ge ${new Date(new Date().setHours(0,0,0,0)).toISOString()}`;
  const search = 'John Kostka OR kostka';
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/users/${encodeURIComponent(account.email)}/messages?$filter=${encodeURIComponent(filter)}&$search="${encodeURIComponent(search)}"&$top=20&$orderby=receivedDateTime desc`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'ConsistencyLevel': 'eventual'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          console.log(`\nFOUND ${result.value.length} EMAIL(S) TODAY:\n`);
          
          result.value.forEach((email, index) => {
            console.log(`========== EMAIL ${index + 1} ==========`);
            console.log(`From: ${email.from?.emailAddress?.address || 'Unknown'}`);
            console.log(`Subject: ${email.subject}`);
            console.log(`Date: ${email.receivedDateTime}`);
            console.log(`Preview: ${email.bodyPreview}\n`);
          });
          
          resolve(result.value);
        } else {
          reject(new Error(`Search failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
};

searchEmails()
  .then(() => console.log('\nSearch complete.'))
  .catch(err => console.error('ERROR:', err.message || err));
