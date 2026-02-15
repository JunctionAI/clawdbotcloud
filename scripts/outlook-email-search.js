#!/usr/bin/env node

/**
 * Microsoft Graph Email Search
 * Search Outlook emails via Microsoft Graph API
 */

import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load credentials
const credsPath = path.join(__dirname, '..', 'outlook-credentials.json');
const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));

/**
 * Create Graph client for a specific account
 */
function createClient(account) {
  const credential = new ClientSecretCredential(
    account.tenantId,
    account.clientId,
    account.clientSecret
  );

  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => {
        const token = await credential.getToken('https://graph.microsoft.com/.default');
        return token.token;
      }
    }
  });
}

/**
 * Search emails with a query
 */
async function searchEmails(client, userEmail, searchQuery, options = {}) {
  const { limit = 100 } = options;
  
  try {
    // Use $search for full-text search (cannot use $orderBy with $search)
    const response = await client
      .api(`/users/${userEmail}/messages`)
      .search(`"${searchQuery}"`)
      .top(limit)
      .select('id,subject,from,receivedDateTime,bodyPreview,hasAttachments')
      .get();

    return response.value || [];
  } catch (error) {
    console.error(`Error searching emails for "${searchQuery}":`, error.message);
    return [];
  }
}

/**
 * Search emails with OData filter (for more specific queries)
 */
async function filterEmails(client, userEmail, filterQuery, options = {}) {
  const { limit = 100 } = options;
  
  try {
    const response = await client
      .api(`/users/${userEmail}/messages`)
      .filter(filterQuery)
      .top(limit)
      .select('id,subject,from,receivedDateTime,bodyPreview,body,hasAttachments')
      .orderby('receivedDateTime desc')
      .get();

    return response.value || [];
  } catch (error) {
    console.error(`Error filtering emails:`, error.message);
    return [];
  }
}

/**
 * Get all emails (paginated)
 */
async function getAllEmails(client, userEmail, options = {}) {
  const { limit = 500 } = options;
  let allEmails = [];
  let nextLink = null;
  
  try {
    let response = await client
      .api(`/users/${userEmail}/messages`)
      .top(Math.min(limit, 100))
      .select('id,subject,from,receivedDateTime,bodyPreview,hasAttachments')
      .orderby('receivedDateTime desc')
      .get();
    
    allEmails = response.value || [];
    nextLink = response['@odata.nextLink'];
    
    while (nextLink && allEmails.length < limit) {
      response = await client.api(nextLink).get();
      allEmails = allEmails.concat(response.value || []);
      nextLink = response['@odata.nextLink'];
    }
    
    return allEmails.slice(0, limit);
  } catch (error) {
    console.error(`Error getting all emails:`, error.message);
    return allEmails;
  }
}

/**
 * Get full email body
 */
async function getEmailBody(client, userEmail, messageId) {
  try {
    const email = await client
      .api(`/users/${userEmail}/messages/${messageId}`)
      .select('body')
      .get();
    return email.body;
  } catch (error) {
    console.error('Error getting email body:', error.message);
    return null;
  }
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-NZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Extract amounts from text
 */
function extractAmounts(text) {
  const amounts = [];
  // Match dollar amounts like $1,234.56 or NZD 1,234.56 or 1234.56
  const regex = /(?:\$|NZD\s*)?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const amount = parseFloat(match[1].replace(/,/g, ''));
    if (amount > 0 && amount < 1000000) { // Reasonable amount filter
      amounts.push(amount);
    }
  }
  return [...new Set(amounts)]; // Unique amounts
}

/**
 * Extract deadlines/dates from text
 */
function extractDeadlines(text) {
  const deadlines = [];
  const patterns = [
    /due\s*(?:by|on|date)?[:\s]+([^.\n]+)/gi,
    /(?:payment|pay)\s*(?:by|before)[:\s]+([^.\n]+)/gi,
    /deadline[:\s]+([^.\n]+)/gi,
    /(?:must|should)\s+(?:be\s+)?(?:paid|received)\s+(?:by|before)[:\s]+([^.\n]+)/gi
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      deadlines.push(match[1].trim().substring(0, 50));
    }
  }
  return [...new Set(deadlines)];
}

/**
 * Main search function
 */
async function main() {
  const searchTerms = [
    'GEM VISA',
    'Latitude',
    'Latitude Finance',
    'credit card statement',
    'payment due',
    'overdue',
    'collection',
    'debt collection',
    'minimum payment',
    'account overdue'
  ];

  console.log('🔍 Searching emails for GEM VISA / Latitude Finance correspondence...\n');
  
  const allResults = [];
  const seenIds = new Set();

  for (const account of creds.accounts) {
    console.log(`\n📧 Searching: ${account.email}`);
    console.log('─'.repeat(60));
    
    const client = createClient(account);
    
    for (const term of searchTerms) {
      console.log(`  Searching: "${term}"...`);
      
      try {
        const emails = await searchEmails(client, account.email, term, { limit: 50 });
        
        for (const email of emails) {
          if (!seenIds.has(email.id)) {
            seenIds.add(email.id);
            
            // Check if truly relevant (filter false positives)
            const fullText = `${email.subject || ''} ${email.bodyPreview || ''} ${email.from?.emailAddress?.address || ''}`.toLowerCase();
            const isRelevant = 
              fullText.includes('gem') ||
              fullText.includes('latitude') ||
              fullText.includes('visa') ||
              fullText.includes('credit card') ||
              fullText.includes('statement') ||
              fullText.includes('payment') ||
              fullText.includes('collection') ||
              fullText.includes('overdue');
            
            if (isRelevant) {
              allResults.push({
                account: account.email,
                id: email.id,
                date: email.receivedDateTime,
                subject: email.subject || '(No Subject)',
                from: email.from?.emailAddress?.address || 'Unknown',
                fromName: email.from?.emailAddress?.name || '',
                preview: email.bodyPreview || '',
                hasAttachments: email.hasAttachments
              });
            }
          }
        }
      } catch (err) {
        console.error(`  ⚠️ Error with term "${term}": ${err.message}`);
      }
    }
  }

  // Sort by date (newest first)
  allResults.sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log(`\n\n📊 Found ${allResults.length} relevant emails\n`);
  console.log('═'.repeat(80));

  // Output results
  for (const email of allResults) {
    console.log(`\n📅 ${formatDate(email.date)}`);
    console.log(`📤 From: ${email.fromName} <${email.from}>`);
    console.log(`📌 Subject: ${email.subject}`);
    console.log(`📧 Account: ${email.account}`);
    if (email.hasAttachments) console.log(`📎 Has attachments`);
    console.log(`📝 Preview: ${email.preview.substring(0, 200)}...`);
    
    // Extract amounts and deadlines
    const amounts = extractAmounts(email.preview);
    const deadlines = extractDeadlines(email.preview);
    if (amounts.length > 0) console.log(`💰 Amounts: $${amounts.join(', $')}`);
    if (deadlines.length > 0) console.log(`⏰ Deadlines: ${deadlines.join('; ')}`);
    
    console.log('─'.repeat(80));
  }

  // Export to markdown
  const outputPath = 'memory/gem-visa-gmail-findings.md';
  let markdown = `# GEM VISA / Latitude Finance Email Findings\n\n`;
  markdown += `**Search Date:** ${new Date().toLocaleDateString('en-NZ', { dateStyle: 'full' })}\n`;
  markdown += `**Total Emails Found:** ${allResults.length}\n\n`;
  markdown += `---\n\n`;

  if (allResults.length === 0) {
    markdown += `## No emails found\n\n`;
    markdown += `No correspondence found matching:\n`;
    for (const term of searchTerms) {
      markdown += `- "${term}"\n`;
    }
    markdown += `\nSearched accounts:\n`;
    for (const account of creds.accounts) {
      markdown += `- ${account.email}\n`;
    }
  } else {
    // Group by category
    const statements = allResults.filter(e => 
      e.subject.toLowerCase().includes('statement') ||
      e.preview.toLowerCase().includes('statement')
    );
    const payments = allResults.filter(e => 
      e.subject.toLowerCase().includes('payment') ||
      e.preview.toLowerCase().includes('payment due')
    );
    const collections = allResults.filter(e => 
      e.subject.toLowerCase().includes('collection') ||
      e.subject.toLowerCase().includes('overdue') ||
      e.preview.toLowerCase().includes('overdue')
    );
    const other = allResults.filter(e => 
      !statements.includes(e) && !payments.includes(e) && !collections.includes(e)
    );

    // Summary section
    markdown += `## Summary\n\n`;
    markdown += `- **Statements:** ${statements.length}\n`;
    markdown += `- **Payment Reminders:** ${payments.length}\n`;
    markdown += `- **Collection/Overdue Notices:** ${collections.length}\n`;
    markdown += `- **Other:** ${other.length}\n\n`;

    // Action items
    markdown += `## ⚠️ Action Items\n\n`;
    for (const email of collections) {
      markdown += `- **${formatDate(email.date)}** - ${email.subject}\n`;
      const deadlines = extractDeadlines(email.preview);
      if (deadlines.length > 0) {
        markdown += `  - Deadline: ${deadlines.join(', ')}\n`;
      }
      const amounts = extractAmounts(email.preview);
      if (amounts.length > 0) {
        markdown += `  - Amount: $${amounts.join(', $')}\n`;
      }
    }
    markdown += `\n`;

    // Detailed findings
    markdown += `## All Correspondence (Newest First)\n\n`;

    for (const email of allResults) {
      const amounts = extractAmounts(email.preview);
      const deadlines = extractDeadlines(email.preview);
      
      markdown += `### ${email.subject}\n\n`;
      markdown += `- **Date:** ${formatDate(email.date)}\n`;
      markdown += `- **From:** ${email.fromName} <${email.from}>\n`;
      markdown += `- **Account:** ${email.account}\n`;
      if (email.hasAttachments) markdown += `- **Attachments:** Yes 📎\n`;
      if (amounts.length > 0) markdown += `- **Amounts Mentioned:** $${amounts.join(', $')}\n`;
      if (deadlines.length > 0) markdown += `- **Deadlines/Due Dates:** ${deadlines.join('; ')}\n`;
      markdown += `\n**Preview:**\n> ${email.preview}\n\n`;
      markdown += `---\n\n`;
    }
  }

  // Ensure memory directory exists
  if (!fs.existsSync('memory')) {
    fs.mkdirSync('memory', { recursive: true });
  }

  fs.writeFileSync(outputPath, markdown);
  console.log(`\n✅ Report saved to: ${outputPath}`);
}

main().catch(console.error);
