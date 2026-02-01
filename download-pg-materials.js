#!/usr/bin/env node
/**
 * Download PG materials attachments from Trent's email
 */

const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const messageId = '19c1277964a0a6d5';
const account = 'halltaylor.tom@gmail.com';
const outputDir = './attachments/pg-materials';

async function downloadAttachments() {
  try {
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });
    
    // Get message with attachments
    const cmd = `gog gmail get ${messageId} --account ${account} --format json`;
    
    exec(cmd, async (error, stdout, stderr) => {
      if (error) {
        console.error('Error fetching email:', error);
        return;
      }
      
      const data = JSON.parse(stdout);
      
      // Extract attachments
      if (data.attachments && data.attachments.length > 0) {
        console.log(`Found ${data.attachments.length} attachments:`);
        
        for (const att of data.attachments) {
          console.log(`  - ${att.filename} (${att.mimeType}, ${(att.size / 1024).toFixed(1)} KB)`);
          
          // Download each attachment
          const downloadCmd = `gog gmail attachment ${messageId} "${att.filename}" --account ${account} --output "${path.join(outputDir, att.filename)}"`;
          
          exec(downloadCmd, (err, out, errOut) => {
            if (err) {
              console.error(`  ❌ Failed to download ${att.filename}:`, err.message);
            } else {
              console.log(`  ✅ Downloaded: ${att.filename}`);
            }
          });
        }
      } else {
        console.log('No attachments found');
      }
    });
    
  } catch (err) {
    console.error('Error:', err);
  }
}

downloadAttachments();
