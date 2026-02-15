import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import fs from 'fs';

const creds = JSON.parse(fs.readFileSync('microsoft-graph-credentials.json', 'utf8'));
const credential = new ClientSecretCredential(creds.tenantId, creds.clientId, creds.clientSecret);
const client = Client.initWithMiddleware({
  authProvider: { getAccessToken: async () => (await credential.getToken('https://graph.microsoft.com/.default')).token }
});

const email = {
  message: {
    subject: 'Re: My Credit Report - ID Error - Name Correction',
    body: {
      contentType: 'Text',
      content: `Hi Centrix,

Thank you for your email regarding the ID verification issue.

The first name on my application should be "Thomas" (not "Tom") to match my driver licence exactly.

Corrected details:
- First Name: Thomas
- Surname: Hall-Taylor
- Driver Licence Number: DT157114
- Driver Licence Version: 680
- Date of Birth: 22/07/2000

Please re-verify with NZTA using these corrected details.

Kind regards,
Thomas Hall-Taylor`
    },
    toRecipients: [
      {
        emailAddress: {
          address: 'mycreditreport@centrix.co.nz'
        }
      }
    ]
  },
  saveToSentItems: true
};

try {
  await client.api(`/users/${creds.email}/sendMail`).post(email);
  console.log('✅ Email sent successfully to mycreditreport@centrix.co.nz');
} catch (error) {
  console.error('❌ Error sending email:', error.message);
}
