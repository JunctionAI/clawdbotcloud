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

const sendReply = async () => {
  const token = await getToken();
  
  // Get the message ID from Andi's email to reply to
  const getMessageOptions = {
    hostname: 'graph.microsoft.com',
    path: `/v1.0/users/${encodeURIComponent(account.email)}/messages?$top=50`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const getReq = https.request(getMessageOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', async () => {
        try {
          const result = JSON.parse(data);
          
          // Find Andi's email
          const andiEmail = result.value.find(email => 
            email.from && 
            email.from.emailAddress && 
            email.from.emailAddress.address &&
            email.from.emailAddress.address.toLowerCase() === 'andi@thewebguys.co.nz' &&
            email.subject.includes('Ecom Klaviyo Client')
          );
          
          if (!andiEmail) {
            reject(new Error('Could not find Andi email to reply to'));
            return;
          }

          console.log('Found message ID:', andiEmail.id);
          
          // Now send the reply
          const emailBody = `Hi Andi,

Great to connect! Happy to outline the process and get moving on this.

To streamline the migration from Mailchimp, here's what we'll need:

• Mailchimp admin access for me (tom@junctionmedia.ai or a TWG email if you prefer transparency)
• Jon to create a Klaviyo account and add me as admin (same email address)

Once I have access, I'll handle the migration, list segmentation (engaged users, repeat buyers, etc.), and technical configuration (tracking snippets, sending domain, DMARC setup, etc.). Jon will need to add billing details to Klaviyo for email/SMS usage.

Email Design Approach:

Regarding templates vs. custom design — I'm flexible based on what's working for Jon currently.

Our typical approach is building emails from scratch with our designer, which gives maximum flexibility and brand alignment. However, I also have experience working with templated newsletters when that makes more sense.

Once we align on strategy, I can typically turn around client previews within 3 business days for the first campaign.

To clarify the best path forward, it would helpful to jump on a discovery call to understand the client's current campaign schedule, email performance, designs etc.

Happy to jump on a call tomorrow or Monday to discuss - let me know what suits?

Thanks,
Tom`;

          const reply = {
            message: {
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
            },
            comment: emailBody
          };
          
          const postData = JSON.stringify(reply);
          
          const replyOptions = {
            hostname: 'graph.microsoft.com',
            path: `/v1.0/users/${encodeURIComponent(account.email)}/messages/${andiEmail.id}/reply`,
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData)
            }
          };

          const replyReq = https.request(replyOptions, (replyRes) => {
            let replyData = '';
            replyRes.on('data', (chunk) => replyData += chunk);
            replyRes.on('end', () => {
              if (replyRes.statusCode === 202 || replyRes.statusCode === 200) {
                resolve('✅ Email sent successfully to Andi (CC: Alon)');
              } else {
                reject(new Error(`Failed to send: ${replyRes.statusCode} ${replyData}`));
              }
            });
          });

          replyReq.on('error', reject);
          replyReq.write(postData);
          replyReq.end();
          
        } catch (e) {
          reject(e);
        }
      });
    });

    getReq.on('error', reject);
    getReq.end();
  });
};

sendReply()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error('ERROR:', err.message || err);
  });
