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
      path: `/v1.0/users/${encodeURIComponent(account.email)}/messages?$top=50`,
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
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
};

getEmails()
  .then(result => {
    // Find ALL of Alon's emails
    const alonEmails = result.value.filter(email => 
      email.from && 
      email.from.emailAddress && 
      email.from.emailAddress.address &&
      email.from.emailAddress.address.toLowerCase() === 'alon@thewebguys.co.nz'
    );
    
    if (alonEmails.length > 0) {
      console.log(`FOUND ${alonEmails.length} EMAIL(S) FROM ALON:\n`);
      alonEmails.forEach((email, index) => {
        console.log(`\n========== EMAIL ${index + 1} ==========`);
        console.log('Subject:', email.subject);
        console.log('Date:', email.receivedDateTime);
        console.log('Body preview:', email.bodyPreview);
        console.log('\nFull body:');
        console.log(email.body.content);
        console.log('\n');
      });
    } else {
      console.log('No email from Alon found in last 50 messages');
    }
  })
  .catch(err => {
    console.error('ERROR:', err.message || err);
  });
