import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load credentials
const credsPath = path.join(__dirname, '..', 'microsoft-graph-credentials.json');
const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));

// Create credential
const credential = new ClientSecretCredential(
  creds.tenantId,
  creds.clientId,
  creds.clientSecret
);

// Create Graph client
const client = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const token = await credential.getToken('https://graph.microsoft.com/.default');
      return token.token;
    }
  }
});

async function search() {
  console.log('Checking emails for Centrix credit report...\n');
  
  // Get recent emails
  const messages = await client
    .api(`/users/${creds.email}/messages`)
    .top(30)
    .orderby('receivedDateTime desc')
    .select('subject,from,receivedDateTime,bodyPreview')
    .get();
  
  const centrixEmails = messages.value.filter(m => 
    m.subject?.toLowerCase().includes('centrix') ||
    m.subject?.toLowerCase().includes('credit report') ||
    m.subject?.toLowerCase().includes('credit file') ||
    m.from?.emailAddress?.address?.toLowerCase().includes('centrix')
  );
  
  if (centrixEmails.length === 0) {
    console.log('❌ No Centrix credit report email found yet.\n');
    console.log('Most recent 5 emails:');
    messages.value.slice(0, 5).forEach(m => {
      console.log('---');
      console.log('Date:', new Date(m.receivedDateTime).toLocaleString('en-NZ'));
      console.log('From:', m.from?.emailAddress?.address);
      console.log('Subject:', m.subject);
    });
  } else {
    console.log('✅ Found', centrixEmails.length, 'Centrix-related email(s):\n');
    centrixEmails.forEach(m => {
      console.log('---');
      console.log('Date:', new Date(m.receivedDateTime).toLocaleString('en-NZ'));
      console.log('From:', m.from?.emailAddress?.address);
      console.log('Subject:', m.subject);
      console.log('Preview:', m.bodyPreview?.substring(0, 300));
    });
  }
}

search().catch(e => console.error('Error:', e.message));
