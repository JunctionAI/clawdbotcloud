#!/usr/bin/env node
/**
 * Supermemory Session Start Hook
 * Called at the beginning of every Clawdbot session
 * Loads user profile + relevant context
 */

import SupermemoryClient from './supermemory-client.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sessionStart() {
  try {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🧠 SUPERMEMORY SESSION START');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Initialize client
    const sm = await new SupermemoryClient().init();

    // Get context (no specific query = general profile)
    const profile = await sm.sessionStart();

    if (!profile) {
      console.log('⚠️  Supermemory profile not loaded (disabled or error)');
      return;
    }

    // Display profile
    console.log('📊 USER PROFILE LOADED:\n');
    console.log('═══════════════════════════════════════════════\n');
    
    console.log('📌 STATIC FACTS (who the user is):\n');
    console.log(profile.static);
    console.log('\n');

    console.log('🔄 DYNAMIC FACTS (current context):\n');
    console.log(profile.dynamic);
    console.log('\n');

    if (profile.memories && profile.memories !== '(no memories yet)') {
      console.log('💡 RELEVANT MEMORIES:\n');
      console.log(profile.memories);
      console.log('\n');
    }

    console.log('═══════════════════════════════════════════════\n');

    // Write profile to cache for main agent to read
    const cachePath = path.join(__dirname, '..', 'cache', 'supermemory-session-profile.json');
    await fs.mkdir(path.dirname(cachePath), { recursive: true });
    await fs.writeFile(cachePath, JSON.stringify(profile, null, 2));

    console.log('✅ Profile cached for session at:', cachePath);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return profile;
  } catch (err) {
    console.error('❌ Session start failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

// Run
sessionStart();
