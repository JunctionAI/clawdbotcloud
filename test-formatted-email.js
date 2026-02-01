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

const sendTestEmail = async () => {
  const token = await getToken();
  
  const email = {
    message: {
      subject: "TEST: Properly Formatted Email",
      body: {
        contentType: "Text",
        content: `Hi Andi,

Great to connect! Happy to outline the process and get moving on this.

To streamline the migration from Mailchimp, here's what we'll need:

Mailchimp admin access for me (tom@junctionmedia.ai or a TWG email if you prefer transparency)
Jon to create a Klaviyo account and add me as admin (same email address)

Once I have access, I'll handle the migration, list segmentation (engaged users, repeat buyers, etc.), and technical configuration (tracking snippets, sending domain, DMARC setup, etc.). Jon will need to add billing details to Klaviyo for email/SMS usage.

Regarding templates vs. custom design — I'm flexible based on what's working for Jon currently.

Our typical approach is building emails from scratch with our designer, which gives maximum flexibility and brand alignment. However, I also have experience working with templated newsletters when that makes more sense.

Once we align on strategy, I can typically turn around client previews within 3 business days for the first campaign.

To clarify the best path forward, it would helpful to jump on a discovery call to understand the client's current campaign schedule, email performance, designs etc.

Happy to jump on a call tomorrow or Monday to discuss - let me know what suits?

Thanks,
Tom`
      },
      toRecipients: [
        {
          emailAddress: {
            address: "tom@junctionmedia.ai"
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
          resolve('✅ Test email sent to tom@junctionmedia.ai');
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

sendTestEmail()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error('ERROR:', err.message || err);
  });
