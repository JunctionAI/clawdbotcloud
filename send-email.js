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

const sendEmail = async () => {
  const token = await getToken();
  
  const email = {
    message: {
      subject: "Re: Ecom Klaviyo Client",
      body: {
        contentType: "Text",
        content: "Hi Andi,\n\nHope you're doing well. Please let me know what the next step is - excited to get started here.\n\nKind regards,\nTom"
      },
      toRecipients: [
        {
          emailAddress: {
            address: "andi@thewebguys.co.nz"
          }
        }
      ],
      ccRecipients: [
        {
          emailAddress: {
            address: "alon@thewebguys.co.nz"
          }
        }
      ]
    }
  };
  
  const postData = JSON.stringify(email);
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/users/${encodeURIComponent(account.email)}/sendMail`,
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
          resolve('Email sent successfully');
        } else {
          reject(new Error(`Failed to send: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
};

sendEmail()
  .then(result => {
    console.log('✅ SUCCESS:', result);
  })
  .catch(err => {
    console.error('❌ ERROR:', err.message || err);
  });
