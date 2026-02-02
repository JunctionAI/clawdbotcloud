#!/usr/bin/env node
/**
 * Email Intelligence System
 * Monitor, summarize, and prioritize emails with critical sender detection
 */

import { google } from 'googleapis';
import fs from 'fs';
import Anthropic from '@anthropic-ai/sdk';

// Configuration
const CREDENTIALS_PATH = 'google-credentials.json';
const TOKEN_PATH = 'gmail-token.json';
const STATE_PATH = 'email-intelligence-state.json';

// Critical senders (case-insensitive matching)
const CRITICAL_SENDERS = [
  { name: 'PG Investments', patterns: ['pg', 'pginvestments', 'property & growth'] },
  { name: 'Andi Garnett', patterns: ['andi', 'garnett', 'twg'] },
  { name: 'DBH', patterns: ['dbh', 'accounts@dbh.co.nz'] },
  { name: 'Jakob', patterns: ['jakob'] },
  { name: 'Ella', patterns: ['ella'] }
];

// Priority scoring matrix
const PRIORITY_MATRIX = {
  URGENT_IMPORTANT: { score: 10, label: '🔴 URGENT & IMPORTANT' },
  URGENT_NOT_IMPORTANT: { score: 7, label: '🟡 URGENT' },
  IMPORTANT_NOT_URGENT: { score: 8, label: '🟠 IMPORTANT' },
  NOT_URGENT_NOT_IMPORTANT: { score: 3, label: '⚪ NORMAL' }
};

// Gmail API setup
function getGmailClient() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error('google-credentials.json not found. Run: node scripts/gmail-setup.js');
  }
  
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('gmail-token.json not found. Run: node scripts/gmail-setup.js');
  }
  
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
  
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(token);
  
  return google.gmail({ version: 'v1', auth: oAuth2Client });
}

// Load/save state
function loadState() {
  if (fs.existsSync(STATE_PATH)) {
    return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  }
  return { lastChecked: null, processedIds: [] };
}

function saveState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

// Check if sender is critical
function isCriticalSender(from) {
  const fromLower = (from || '').toLowerCase();
  
  for (const critical of CRITICAL_SENDERS) {
    for (const pattern of critical.patterns) {
      if (fromLower.includes(pattern.toLowerCase())) {
        return critical.name;
      }
    }
  }
  
  return null;
}

// Detect urgency keywords
function detectUrgency(subject, snippet) {
  const text = ((subject || '') + ' ' + (snippet || '')).toLowerCase();
  const urgentKeywords = [
    'urgent', 'asap', 'immediately', 'emergency', 'critical',
    'deadline', 'today', 'tonight', 'tomorrow', 'this morning',
    'right now', 'time sensitive', 'action required', 'please respond'
  ];
  
  return urgentKeywords.some(keyword => text.includes(keyword));
}

// Detect importance keywords
function detectImportance(subject, snippet, from) {
  const text = ((subject || '') + ' ' + (snippet || '')).toLowerCase();
  const importantKeywords = [
    'meeting', 'call', 'invoice', 'payment', 'contract', 'agreement',
    'approval', 'decision', 'proposal', 'budget', 'review',
    'opportunity', 'chairman', 'board', 'client', 'project'
  ];
  
  // Critical senders are always important
  if (isCriticalSender(from)) {
    return true;
  }
  
  return importantKeywords.some(keyword => text.includes(keyword));
}

// Score priority
function scorePriority(email) {
  const isUrgent = detectUrgency(email.subject, email.snippet);
  const isImportant = detectImportance(email.subject, email.snippet, email.from);
  const criticalSender = isCriticalSender(email.from);
  
  let priorityLevel;
  if (isUrgent && isImportant) {
    priorityLevel = PRIORITY_MATRIX.URGENT_IMPORTANT;
  } else if (isUrgent && !isImportant) {
    priorityLevel = PRIORITY_MATRIX.URGENT_NOT_IMPORTANT;
  } else if (!isUrgent && isImportant) {
    priorityLevel = PRIORITY_MATRIX.IMPORTANT_NOT_URGENT;
  } else {
    priorityLevel = PRIORITY_MATRIX.NOT_URGENT_NOT_IMPORTANT;
  }
  
  // Boost score for critical senders
  if (criticalSender) {
    priorityLevel = { ...priorityLevel, score: Math.min(10, priorityLevel.score + 2) };
  }
  
  return { ...priorityLevel, criticalSender };
}

// Parse email body
function parseEmailBody(payload) {
  let body = '';
  
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body.data) {
        body = Buffer.from(part.body.data, 'base64').toString('utf-8');
        break;
      } else if (part.mimeType === 'text/html' && part.body.data && !body) {
        body = Buffer.from(part.body.data, 'base64').toString('utf-8');
      } else if (part.parts) {
        // Nested parts
        for (const nestedPart of part.parts) {
          if (nestedPart.mimeType === 'text/plain' && nestedPart.body.data) {
            body = Buffer.from(nestedPart.body.data, 'base64').toString('utf-8');
            break;
          }
        }
      }
    }
  } else if (payload.body.data) {
    body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }
  
  // Strip HTML tags if needed
  body = body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  return body.substring(0, 5000); // Limit to 5000 chars
}

// Summarize email with Claude
async function summarizeEmail(email) {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
    
    const prompt = `Analyze this email and extract:
1. **Key Points** (2-3 bullet points)
2. **Action Items** (what needs to be done)
3. **Deadlines** (any dates or time-sensitive info)

Email:
From: ${email.from}
Subject: ${email.subject}
Body: ${email.body}

Provide a concise summary in this format:
KEY POINTS:
- [point 1]
- [point 2]

ACTION ITEMS:
- [action 1]

DEADLINES:
- [deadline 1]

Keep it brief and actionable.`;
    
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    });
    
    return message.content[0].text;
  } catch (err) {
    console.error('❌ Summarization failed:', err.message);
    return `**Key Points:** ${email.snippet}\n\n**Action Items:** Review email\n\n**Deadlines:** None detected`;
  }
}

// Fetch recent emails
async function fetchRecentEmails(gmail, maxResults = 10) {
  try {
    // Get unread emails from the last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const query = `is:unread after:${Math.floor(yesterday.getTime() / 1000)}`;
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults
    });
    
    if (!response.data.messages || response.data.messages.length === 0) {
      return [];
    }
    
    const emails = [];
    
    for (const message of response.data.messages) {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full'
      });
      
      const headers = email.data.payload.headers;
      const from = headers.find(h => h.name === 'From')?.value || '';
      const subject = headers.find(h => h.name === 'Subject')?.value || '';
      const date = headers.find(h => h.name === 'Date')?.value || '';
      
      const body = parseEmailBody(email.data.payload);
      
      emails.push({
        id: email.data.id,
        threadId: email.data.threadId,
        from,
        subject,
        date,
        snippet: email.data.snippet,
        body,
        labelIds: email.data.labelIds || []
      });
    }
    
    return emails;
  } catch (err) {
    console.error('❌ Error fetching emails:', err.message);
    return [];
  }
}

// Process emails
async function processEmails(emails) {
  const processed = [];
  
  for (const email of emails) {
    const priority = scorePriority(email);
    const summary = await summarizeEmail(email);
    
    processed.push({
      ...email,
      priority,
      summary,
      isCritical: !!priority.criticalSender
    });
  }
  
  // Sort by priority score (highest first)
  processed.sort((a, b) => b.priority.score - a.priority.score);
  
  return processed;
}

// Format email report
function formatEmailReport(emails) {
  if (emails.length === 0) {
    return '✅ No new emails requiring attention';
  }
  
  let report = `📧  EMAIL INTELLIGENCE REPORT\n`;
  report += `═`.repeat(80) + '\n';
  report += `Found ${emails.length} email(s) requiring attention\n\n`;
  
  for (let i = 0; i < emails.length; i++) {
    const email = emails[i];
    
    report += `${i + 1}. ${email.priority.label}`;
    if (email.isCritical) {
      report += ` 🚨 CRITICAL SENDER: ${email.priority.criticalSender}`;
    }
    report += '\n';
    report += `─`.repeat(80) + '\n';
    report += `📤 From: ${email.from}\n`;
    report += `📌 Subject: ${email.subject}\n`;
    report += `📅 Date: ${email.date}\n`;
    report += `\n${email.summary}\n`;
    report += `\n`;
  }
  
  return report;
}

// Save critical emails to briefing
function saveToBriefing(emails) {
  const criticalEmails = emails.filter(e => e.priority.score >= 7);
  
  if (criticalEmails.length === 0) {
    return;
  }
  
  const briefingPath = 'email-briefing-cache.json';
  fs.writeFileSync(briefingPath, JSON.stringify(criticalEmails, null, 2));
  
  console.log(`✅ Saved ${criticalEmails.length} critical email(s) to briefing cache`);
}

// Main commands
async function testConnection() {
  console.log('Testing Gmail connection...\n');
  
  try {
    const gmail = getGmailClient();
    const profile = await gmail.users.getProfile({ userId: 'me' });
    
    console.log('✅ Connection successful!');
    console.log(`📧 Email: ${profile.data.emailAddress}`);
    console.log(`📊 Total messages: ${profile.data.messagesTotal}`);
    console.log(`📬 Unread messages: ${profile.data.threadsUnread || 'N/A'}`);
    
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    console.log('\nRun: node scripts/gmail-setup.js');
    process.exit(1);
  }
}

async function monitorEmails() {
  console.log('📧 Email Intelligence Monitor\n');
  
  try {
    const gmail = getGmailClient();
    const state = loadState();
    
    console.log('Fetching recent unread emails...');
    const emails = await fetchRecentEmails(gmail, 20);
    
    if (emails.length === 0) {
      console.log('✅ No new emails');
      return;
    }
    
    // Filter out already processed emails
    const newEmails = emails.filter(e => !state.processedIds.includes(e.id));
    
    if (newEmails.length === 0) {
      console.log('✅ No new emails (all already processed)');
      return;
    }
    
    console.log(`Processing ${newEmails.length} new email(s)...\n`);
    
    const processed = await processEmails(newEmails);
    
    // Update state
    state.processedIds.push(...newEmails.map(e => e.id));
    state.lastChecked = new Date().toISOString();
    
    // Keep only last 1000 processed IDs
    if (state.processedIds.length > 1000) {
      state.processedIds = state.processedIds.slice(-1000);
    }
    
    saveState(state);
    
    // Generate report
    const report = formatEmailReport(processed);
    console.log(report);
    
    // Save critical emails to briefing
    saveToBriefing(processed);
    
  } catch (err) {
    console.error('❌ Monitor failed:', err.message);
    process.exit(1);
  }
}

async function getUnreadCount() {
  try {
    const gmail = getGmailClient();
    const profile = await gmail.users.getProfile({ userId: 'me' });
    return profile.data.messagesTotal;
  } catch (err) {
    return 0;
  }
}

// CLI
const command = process.argv[2];

switch (command) {
  case 'test':
    testConnection();
    break;
  case 'monitor':
    monitorEmails();
    break;
  case 'count':
    getUnreadCount().then(count => console.log(count));
    break;
  default:
    console.log('Usage:');
    console.log('  node scripts/email-intelligence.js test      - Test Gmail connection');
    console.log('  node scripts/email-intelligence.js monitor   - Monitor and process emails');
    console.log('  node scripts/email-intelligence.js count     - Get unread count');
}
