#!/usr/bin/env node

import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credsPath = path.join(__dirname, '..', 'microsoft-graph-credentials.json');
const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));

const credential = new ClientSecretCredential(
  creds.tenantId,
  creds.clientId,
  creds.clientSecret
);

const client = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const token = await credential.getToken('https://graph.microsoft.com/.default');
      return token.token;
    }
  }
});

async function deleteEventsByPattern(pattern) {
  try {
    const endDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    const events = await client
      .api(`/users/${creds.email}/calendar/events`)
      .filter(`start/dateTime le '${endDate.toISOString()}'`)
      .top(100)
      .select('id,subject')
      .get();

    let deleted = 0;
    for (const event of events.value) {
      if (pattern.test(event.subject)) {
        try {
          await client.api(`/users/${creds.email}/calendar/events/${event.id}`).delete();
          console.log(`✅ Deleted: ${event.subject}`);
          deleted++;
        } catch (err) {
          console.log(`❌ Failed to delete ${event.subject}: ${err.message}`);
        }
      }
    }
    
    console.log(`\n📊 Total deleted: ${deleted}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Delete all TEST events, Haircut (except CORRECT), DBH Work, PG Prep, wrong PG Chairman, wrong Meet Sian
const patterns = [
  /^TEST/i,
  /^Haircut$/i,  // Delete "Haircut" but not "Haircut CORRECT"
  /^DBH Work$/i,
  /^PG Chairman Meeting Prep$/i,
  /^PG Chairman Meeting$/i,
  /^Meet Sian$/i
];

(async () => {
  for (const pattern of patterns) {
    console.log(`\n🗑️  Deleting events matching: ${pattern}\n`);
    await deleteEventsByPattern(pattern);
  }
  console.log('\n✅ Cleanup complete!');
})();
