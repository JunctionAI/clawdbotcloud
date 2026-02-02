#!/usr/bin/env node

/**
 * Fetch user profile from Supermemory (static + dynamic facts)
 * Run at session start for instant context
 * Usage: node scripts/supermemory-get-profile.js [--json]
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

const jsonOutput = process.argv.includes('--json');

async function getProfile() {
  try {
    const profile = await client.profile();
    
    if (jsonOutput) {
      // JSON output for programmatic use
      console.log(JSON.stringify(profile, null, 2));
    } else {
      // Human-readable output
      console.log('👤 USER PROFILE (from Supermemory)\n');
      
      if (profile.static && profile.static.length > 0) {
        console.log('📌 STATIC FACTS (Long-term):');
        profile.static.forEach((fact, i) => {
          console.log(`   ${i + 1}. ${fact}`);
        });
        console.log('');
      }
      
      if (profile.dynamic && profile.dynamic.length > 0) {
        console.log('🔄 DYNAMIC FACTS (Recent context):');
        profile.dynamic.forEach((fact, i) => {
          console.log(`   ${i + 1}. ${fact}`);
        });
        console.log('');
      }
      
      if (!profile.static && !profile.dynamic) {
        console.log('⚠️  No profile data found. Run migration script first.');
      }
    }
    
  } catch (error) {
    console.error('❌ Profile fetch failed:', error.message);
    process.exit(1);
  }
}

getProfile();
