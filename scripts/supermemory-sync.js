#!/usr/bin/env node
/**
 * Supermemory Integration for Clawdbot
 * Syncs conversations and retrieves personalized context
 */

import Supermemory from 'supermemory';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CREDS_PATH = path.join(__dirname, '..', 'supermemory-credentials.json');

class SupermemoryClient {
  constructor() {
    this.client = null;
    this.containerTag = null;
  }

  async init() {
    try {
      const creds = JSON.parse(await fs.readFile(CREDS_PATH, 'utf8'));
      process.env.SUPERMEMORY_API_KEY = creds.apiKey;
      this.containerTag = creds.containerTag;
      this.client = new Supermemory();
      return this;
    } catch (err) {
      console.error('❌ Failed to initialize Supermemory:', err.message);
      throw err;
    }
  }

  /**
   * Add content to Supermemory
   * @param {string} content - Text content to store
   * @param {object} metadata - Optional metadata
   */
  async add(content, metadata = {}) {
    try {
      return await this.client.add({
        content,
        containerTag: this.containerTag,
        ...metadata
      });
    } catch (err) {
      console.error('❌ Add failed:', err.message);
      throw err;
    }
  }

  /**
   * Get user profile + relevant memories
   * @param {string} query - Current query/context
   */
  async getProfile(query = '') {
    try {
      const profile = await this.client.profile({
        containerTag: this.containerTag,
        q: query
      });

      // Handle empty/new profiles gracefully
      const static_facts = (profile?.profile?.static || []).join('\n') || '(no static facts yet)';
      const dynamic_facts = (profile?.profile?.dynamic || []).join('\n') || '(no dynamic facts yet)';
      const memories = (profile?.searchResults?.results || [])
        .map(r => r.memory)
        .filter(Boolean)
        .join('\n') || '(no memories yet)';

      return {
        raw: profile,
        static: static_facts,
        dynamic: dynamic_facts,
        memories,
        context: `Static profile:\n${static_facts}\n\nDynamic profile:\n${dynamic_facts}\n\nRelevant memories:\n${memories}`
      };
    } catch (err) {
      console.error('❌ Profile fetch failed:', err.message);
      throw err;
    }
  }

  /**
   * Search memories
   * @param {string} query - Search query
   */
  async search(query, limit = 10) {
    try {
      return await this.client.search({
        containerTag: this.containerTag,
        q: query,
        limit
      });
    } catch (err) {
      console.error('❌ Search failed:', err.message);
      throw err;
    }
  }
}

// CLI interface
async function main() {
  try {
    const [action, ...args] = process.argv.slice(2);
    
    if (!action) {
      console.log(`
Supermemory CLI for Clawdbot

Usage:
  node scripts/supermemory-sync.js add <content>      Add content to memory
  node scripts/supermemory-sync.js profile [query]    Get user profile
  node scripts/supermemory-sync.js search <query>     Search memories
      `);
      return;
    }

    console.log('🔄 Initializing Supermemory client...');
    const sm = await new SupermemoryClient().init();
    console.log('✅ Connected to Supermemory');

    switch (action) {
      case 'add':
        const content = args.join(' ');
        if (!content) {
          console.error('❌ No content provided');
          process.exit(1);
        }
        console.log(`📝 Adding content: "${content.substring(0, 50)}..."`);
        const result = await sm.add(content);
        console.log('✅ Content added:', JSON.stringify(result, null, 2));
        break;

      case 'profile':
        const query = args.join(' ');
        console.log(`📊 Fetching profile${query ? ` with query: "${query}"` : ''}...`);
        const profile = await sm.getProfile(query);
        console.log('\n📊 User Profile:\n');
        console.log(profile.context);
        console.log('\n🔍 Raw response:\n');
        console.log(JSON.stringify(profile.raw, null, 2));
        break;

      case 'search':
        const searchQuery = args.join(' ');
        if (!searchQuery) {
          console.error('❌ No search query provided');
          process.exit(1);
        }
        console.log(`🔍 Searching for: "${searchQuery}"...`);
        const results = await sm.search(searchQuery);
        console.log('\n🔍 Search Results:\n');
        console.log(JSON.stringify(results, null, 2));
        break;

      default:
        console.error(`❌ Unknown action: ${action}`);
        process.exit(1);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    if (err.stack) {
      console.error(err.stack);
    }
    process.exit(1);
  }
}

// Run if called directly
main();

export default SupermemoryClient;
