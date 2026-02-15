const { Client } = require('@microsoft/microsoft-graph-client');
const fs = require('fs');
const creds = JSON.parse(fs.readFileSync('microsoft-graph-credentials.json'));

async function search() {
  const client = Client.init({
    authProvider: (done) => done(null, creds.accessToken)
  });
  
  // Get recent emails and filter for Centrix
  const messages = await client.api('/me/messages')
    .top(50)
    .orderby('receivedDateTime desc')
    .select('subject,from,receivedDateTime,bodyPreview')
    .get();
    
  console.log('Checking last 50 emails for Centrix...\n');
  
  const centrixEmails = messages.value.filter(m => 
    m.subject?.toLowerCase().includes('centrix') ||
    m.subject?.toLowerCase().includes('credit report') ||
    m.from?.emailAddress?.address?.toLowerCase().includes('centrix')
  );
  
  if (centrixEmails.length === 0) {
    console.log('No Centrix emails found in recent messages.');
    console.log('\nMost recent 5 emails:');
    messages.value.slice(0, 5).forEach(m => {
      console.log('---');
      console.log('Date:', m.receivedDateTime);
      console.log('From:', m.from?.emailAddress?.address);
      console.log('Subject:', m.subject);
    });
  } else {
    console.log('Found', centrixEmails.length, 'Centrix-related emails:\n');
    centrixEmails.forEach(m => {
      console.log('---');
      console.log('Date:', m.receivedDateTime);
      console.log('From:', m.from?.emailAddress?.address);
      console.log('Subject:', m.subject);
      console.log('Preview:', m.bodyPreview?.substring(0, 200));
    });
  }
}

search().catch(e => console.error('Error:', e.message));
