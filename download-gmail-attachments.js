#!/usr/bin/env node
/**
 * Download Gmail attachments using Google's Gmail API
 * For PG materials from Trent
 */

const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

const MESSAGE_ID = '19c1277964a0a6d5';
const OUTPUT_DIR = './attachments/pg-materials';

// OAuth credentials are handled by gog
async function downloadAttachments() {
  try {
    console.log('Creating output directory...');
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Use gog to get the message details
    const { execSync } = require('child_process');
    const rawOutput = execSync(`gog gmail get ${MESSAGE_ID} --account halltaylor.tom@gmail.com --format json`, {
      encoding: 'utf-8'
    });
    
    // Parse the message (gog might not return JSON, need to handle the text output)
    console.log('Fetching message details via gog...');
    
    // Since gog doesn't support attachment downloads, we need to use Gmail API directly
    // This would require OAuth tokens that gog already has
    
    console.log('⚠️  Note: gog CLI does not support attachment downloads');
    console.log('Manual steps required:');
    console.log('1. Open Gmail in browser');
    console.log('2. Search for: from:trent.walker@pginvestments.nz subject:"PG materials"');
    console.log('3. Download these attachments:');
    console.log('   - Day 1 Nov 11 Presentation.pdf (4.6 MB)');
    console.log('   - Day 2 12 Nov 2025 Presentation.pdf (6.3 MB)');
    console.log('   - 2025 08 PG Funds PDS.pdf (834.6 KB)');
    console.log(`4. Save to: ${path.resolve(OUTPUT_DIR)}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

downloadAttachments();
