#!/usr/bin/env node

/**
 * Heartbeat sync: Send daily summary to Supermemory (run at 9pm)
 * Reads today's daily log and sends top 3-5 events
 * Usage: node scripts/heartbeat-sync.js [--date YYYY-MM-DD]
 */

import { Supermemory } from 'supermemory';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load credentials
const credsPath = path.join(__dirname, '..', 'supermemory-credentials.json');
const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));

const client = new Supermemory({
  apiKey: creds.apiKey,
  containerTag: creds.containerTag
});

function getDateString(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

async function syncDailySummary(dateStr) {
  const dailyLogPath = path.join(__dirname, '..', 'memory', `${dateStr}.md`);
  
  if (!fs.existsSync(dailyLogPath)) {
    console.log(`⚠️  No daily log found for ${dateStr}`);
    console.log(`   Expected: ${dailyLogPath}`);
    return;
  }
  
  const dailyLog = fs.readFileSync(dailyLogPath, 'utf8');
  
  // Extract meaningful content (skip headers, focus on events)
  const lines = dailyLog.split('\n').filter(line => {
    const trimmed = line.trim();
    return trimmed.length > 0 && !trimmed.startsWith('#') && !trimmed.startsWith('---');
  });
  
  if (lines.length === 0) {
    console.log(`⚠️  Daily log for ${dateStr} is empty or contains only headers`);
    return;
  }
  
  const summary = `Daily summary for ${dateStr}:\n\n${lines.join('\n')}`;
  
  try {
    console.log(`📤 Sending daily summary for ${dateStr} to Supermemory...`);
    
    await client.add({
      content: summary,
      metadata: {
        source: 'heartbeat',
        date: dateStr
      }
    });
    
    console.log('✅ Daily summary synced successfully');
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Parse arguments
const args = process.argv.slice(2);
let dateStr = getDateString(); // Default: today

if (args[0] === '--date') {
  dateStr = args[1];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    console.error('❌ Invalid date format. Use: YYYY-MM-DD');
    process.exit(1);
  }
}

console.log(`🕐 Running heartbeat sync for ${dateStr}`);
syncDailySummary(dateStr);
