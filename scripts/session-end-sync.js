#!/usr/bin/env node

/**
 * Session-end sync: Send key facts from session to Supermemory
 * Usage: node scripts/session-end-sync.js "Fact 1. Fact 2. Fact 3."
 *        node scripts/session-end-sync.js --file path/to/session-summary.txt
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

async function syncSession(content) {
  if (!content || content.trim().length === 0) {
    console.error('❌ No content provided. Usage:');
    console.error('   node scripts/session-end-sync.js "Your session summary"');
    console.error('   node scripts/session-end-sync.js --file path/to/file.txt');
    process.exit(1);
  }
  
  try {
    console.log('📤 Sending session summary to Supermemory...');
    
    await client.add({
      content: content,
      metadata: {
        source: 'session-end',
        date: new Date().toISOString()
      }
    });
    
    console.log('✅ Session synced successfully');
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Parse arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ No content provided');
  process.exit(1);
}

if (args[0] === '--file') {
  const filePath = args[1];
  if (!filePath) {
    console.error('❌ File path required: --file path/to/file.txt');
    process.exit(1);
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  syncSession(content);
  
} else {
  const content = args.join(' ');
  syncSession(content);
}
