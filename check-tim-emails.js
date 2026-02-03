#!/usr/bin/env node
import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import fs from 'fs';

const creds = JSON.parse(fs.readFileSync('microsoft-graph-credentials.json', 'utf8'));

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

// Search for emails from Tim
const messages = await client
  .api(`/users/${creds.email}/messages`)
  .top(20)
  .select('subject,from,receivedDateTime,bodyPreview,body')
  .orderby('receivedDateTime DESC')
  .get();

// Filter for Tim's emails (look for common Tim variations)
const timEmails = messages.value.filter(m => {
  const from = m.from?.emailAddress?.name || m.from?.emailAddress?.address || '';
  return from.toLowerCase().includes('tim') || from.toLowerCase().includes('trent');
});

console.log(`\n📧 Recent emails from Tim/Trent:\n`);

if (timEmails.length === 0) {
  console.log('No recent emails from Tim or Trent found.');
  console.log('\nShowing last 10 emails instead:\n');
  
  messages.value.slice(0, 10).forEach(m => {
    const from = m.from?.emailAddress?.name || m.from?.emailAddress?.address || 'Unknown';
    const date = new Date(m.receivedDateTime).toLocaleString('en-NZ', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    console.log(`${date} | ${from}`);
    console.log(`📨 ${m.subject}`);
    console.log(`   ${m.bodyPreview.substring(0, 150)}...`);
    console.log('');
  });
} else {
  timEmails.forEach(m => {
    const from = m.from?.emailAddress?.name || m.from?.emailAddress?.address || 'Unknown';
    const date = new Date(m.receivedDateTime).toLocaleString('en-NZ', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📅 ${date}`);
    console.log(`👤 From: ${from}`);
    console.log(`📨 Subject: ${m.subject}`);
    console.log(`${'='.repeat(80)}\n`);
    
    // Show full text body if available, otherwise preview
    if (m.body?.content) {
      const textBody = m.body.content
        .replace(/<[^>]*>/g, '') // Strip HTML
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .trim();
      console.log(textBody);
    } else {
      console.log(m.bodyPreview);
    }
    console.log('\n');
  });
}
