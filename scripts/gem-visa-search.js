#!/usr/bin/env node

/**
 * GEM VISA / Latitude Finance Email Search
 * Targeted search using Microsoft Graph API
 */

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

// Search terms to look for
const SEARCH_TERMS = [
  'GEM VISA',
  'Latitude',
  'Latitude Finance',
  'GenoaPay',
  'Gem Finance'
];

// Additional filter terms (case insensitive matches in results)
const FILTER_TERMS = [
  'gem visa',
  'latitude',
  'latitude finance',
  'genoapay',
  'credit card statement',
  'payment due',
  'overdue',
  'collection notice',
  'debt collection',
  'account statement',
  'minimum payment',
  'gem finance'
];

/**
 * Search using Microsoft Graph $search
 */
async function searchEmails(searchQuery) {
  const userEmail = creds.email;
  
  try {
    // Using $search which uses KQL (cannot use $orderby with $search)
    const response = await client
      .api(`/users/${userEmail}/messages`)
      .header('ConsistencyLevel', 'eventual')
      .search(`"${searchQuery}"`)
      .top(250)
      .select('id,subject,from,receivedDateTime,bodyPreview,hasAttachments')
      .get();
    
    return response.value || [];
  } catch (error) {
    console.error(`Search for "${searchQuery}" failed:`, error.message);
    return [];
  }
}

/**
 * Get full email body
 */
async function getEmailBody(messageId) {
  const userEmail = creds.email;
  
  try {
    const message = await client
      .api(`/users/${userEmail}/messages/${messageId}`)
      .select('body')
      .get();
    
    return message.body?.content || '';
  } catch (error) {
    return '';
  }
}

/**
 * Extract amounts from text
 */
function extractAmounts(text) {
  const amounts = [];
  const patterns = [
    /\$[\d,]+\.?\d*/g,
    /NZD\s*[\d,]+\.?\d*/gi,
    /[\d,]+\.?\d*\s*NZD/gi
  ];
  
  for (const pattern of patterns) {
    const matches = text.match(pattern);
    if (matches) {
      amounts.push(...matches);
    }
  }
  
  return [...new Set(amounts)];
}

/**
 * Extract deadlines from text
 */
function extractDeadlines(text) {
  const deadlines = [];
  const patterns = [
    /due\s+(?:by|on|date)?\s*:?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/gi,
    /payment\s+due\s*:?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/gi,
    /deadline\s*:?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/gi,
    /(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})/gi,
    /(?:overdue|past due)/gi
  ];
  
  for (const pattern of patterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      deadlines.push(match[1] || match[0]);
    }
  }
  
  return [...new Set(deadlines)];
}

/**
 * Categorize email type
 */
function categorizeEmail(subject, bodyPreview) {
  const text = (subject + ' ' + bodyPreview).toLowerCase();
  
  if (text.includes('statement')) return 'Statement';
  if (text.includes('payment due') || text.includes('payment reminder')) return 'Payment Reminder';
  if (text.includes('overdue') || text.includes('past due')) return 'Overdue Notice';
  if (text.includes('collection')) return 'Collection Notice';
  if (text.includes('account update') || text.includes('account notification')) return 'Account Update';
  if (text.includes('welcome') || text.includes('application')) return 'Account Setup';
  return 'General Correspondence';
}

/**
 * Main search function
 */
async function main() {
  console.log('='.repeat(80));
  console.log('GEM VISA / LATITUDE FINANCE EMAIL SEARCH');
  console.log('Email: ' + creds.email);
  console.log('='.repeat(80));
  console.log('');
  
  // Collect all results
  const allResults = new Map(); // Use Map to dedupe by message ID
  
  // Search for each term
  for (const term of SEARCH_TERMS) {
    console.log(`Searching for: "${term}"...`);
    const results = await searchEmails(term);
    console.log(`  Found ${results.length} results`);
    
    for (const msg of results) {
      if (!allResults.has(msg.id)) {
        allResults.set(msg.id, msg);
      }
    }
  }
  
  console.log('');
  console.log(`Total unique messages found: ${allResults.size}`);
  console.log('');
  
  // Process and filter results
  const emails = [];
  
  for (const [id, msg] of allResults) {
    const subject = (msg.subject || '').toLowerCase();
    const bodyPreview = (msg.bodyPreview || '').toLowerCase();
    const fromAddress = (msg.from?.emailAddress?.address || '').toLowerCase();
    const fromName = (msg.from?.emailAddress?.name || '').toLowerCase();
    const combined = `${subject} ${bodyPreview} ${fromAddress} ${fromName}`;
    
    // Check if it matches our filter terms
    const matches = FILTER_TERMS.some(term => combined.includes(term));
    
    if (matches) {
      const date = new Date(msg.receivedDateTime);
      const dateStr = date.toLocaleDateString('en-NZ', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
      const amounts = extractAmounts(msg.bodyPreview || '');
      const deadlines = extractDeadlines(msg.bodyPreview || '');
      const category = categorizeEmail(msg.subject || '', msg.bodyPreview || '');
      
      emails.push({
        date: dateStr,
        rawDate: msg.receivedDateTime,
        subject: msg.subject,
        from: msg.from?.emailAddress?.name || msg.from?.emailAddress?.address || 'Unknown',
        fromEmail: msg.from?.emailAddress?.address || '',
        hasAttachments: msg.hasAttachments,
        bodyPreview: (msg.bodyPreview || '').substring(0, 400),
        amounts,
        deadlines,
        category,
        id: msg.id
      });
    }
  }
  
  // Sort by date (newest first)
  emails.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
  
  console.log('='.repeat(80));
  console.log(`MATCHED EMAILS: ${emails.length}`);
  console.log('='.repeat(80));
  console.log('');
  
  // Group by year
  const byYear = {};
  for (const email of emails) {
    const year = new Date(email.rawDate).getFullYear();
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(email);
  }
  
  // Print results
  for (const year of Object.keys(byYear).sort((a, b) => b - a)) {
    console.log(`\n## ${year} (${byYear[year].length} emails)\n`);
    
    for (const email of byYear[year]) {
      console.log(`📅 ${email.date}`);
      console.log(`📧 From: ${email.from} <${email.fromEmail}>`);
      console.log(`📌 Subject: ${email.subject}`);
      console.log(`📁 Category: ${email.category}`);
      if (email.hasAttachments) console.log('📎 Has attachments');
      if (email.amounts.length > 0) console.log(`💰 Amounts: ${email.amounts.join(', ')}`);
      if (email.deadlines.length > 0) console.log(`⏰ Deadlines: ${email.deadlines.join(', ')}`);
      console.log(`📝 Preview: ${email.bodyPreview}...`);
      console.log('-'.repeat(40));
    }
  }
  
  // Save to markdown file
  let markdown = `# GEM VISA / Latitude Finance - Outlook Email Findings\n\n`;
  markdown += `**Search Date:** ${new Date().toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}\n`;
  markdown += `**Email Account:** ${creds.email}\n`;
  markdown += `**Total Emails Found:** ${emails.length}\n\n`;
  
  markdown += `## Summary\n\n`;
  
  // Summary by category
  const categoryCount = {};
  for (const email of emails) {
    categoryCount[email.category] = (categoryCount[email.category] || 0) + 1;
  }
  
  markdown += `| Category | Count |\n|----------|-------|\n`;
  for (const [cat, count] of Object.entries(categoryCount).sort((a, b) => b[1] - a[1])) {
    markdown += `| ${cat} | ${count} |\n`;
  }
  markdown += `\n`;
  
  // All unique amounts found
  const allAmounts = [];
  for (const email of emails) {
    allAmounts.push(...email.amounts);
  }
  const uniqueAmounts = [...new Set(allAmounts)];
  
  if (uniqueAmounts.length > 0) {
    markdown += `### Key Amounts Mentioned\n`;
    markdown += uniqueAmounts.map(a => `- ${a}`).join('\n');
    markdown += `\n\n`;
  }
  
  // Emails by year
  for (const year of Object.keys(byYear).sort((a, b) => b - a)) {
    markdown += `## ${year}\n\n`;
    
    for (const email of byYear[year]) {
      markdown += `### ${email.date} - ${email.subject}\n\n`;
      markdown += `- **From:** ${email.from} <${email.fromEmail}>\n`;
      markdown += `- **Category:** ${email.category}\n`;
      if (email.hasAttachments) markdown += `- **Attachments:** Yes\n`;
      if (email.amounts.length > 0) markdown += `- **Amounts:** ${email.amounts.join(', ')}\n`;
      if (email.deadlines.length > 0) markdown += `- **Deadlines/Due:** ${email.deadlines.join(', ')}\n`;
      markdown += `- **Preview:** ${email.bodyPreview}\n\n`;
    }
  }
  
  // Action items section
  markdown += `## Action Items & Notes\n\n`;
  markdown += `*Review the above correspondence for:*\n`;
  markdown += `- Outstanding balances\n`;
  markdown += `- Payment due dates\n`;
  markdown += `- Collection notices requiring response\n`;
  markdown += `- Account status updates\n\n`;
  
  // Save markdown
  const outputPath = path.join(__dirname, '..', 'memory', 'gem-visa-outlook-findings.md');
  fs.writeFileSync(outputPath, markdown);
  console.log(`\n✅ Report saved to: ${outputPath}`);
  
  // Also output JSON
  console.log('\n\n--- JSON DATA ---\n');
  console.log(JSON.stringify(emails, null, 2));
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
