import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import fs from 'fs';

const creds = JSON.parse(fs.readFileSync('microsoft-graph-credentials.json', 'utf8'));
const credential = new ClientSecretCredential(creds.tenantId, creds.clientId, creds.clientSecret);
const client = Client.initWithMiddleware({
  authProvider: { getAccessToken: async () => (await credential.getToken('https://graph.microsoft.com/.default')).token }
});

// Get the Centrix email
const messages = await client.api(`/users/${creds.email}/messages`)
  .top(30)
  .orderby('receivedDateTime desc')
  .select('subject,body,hasAttachments,from')
  .get();

const centrixEmail = messages.value.find(m => 
  m.from?.emailAddress?.address?.toLowerCase().includes('centrix')
);

if (centrixEmail) {
  console.log('Subject:', centrixEmail.subject);
  console.log('Has attachments:', centrixEmail.hasAttachments);
  console.log('\n--- EMAIL BODY ---\n');
  // Strip HTML and clean up
  const text = centrixEmail.body.content
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  console.log(text);
} else {
  console.log('No Centrix email found');
}
