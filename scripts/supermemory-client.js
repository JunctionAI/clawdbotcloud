#!/usr/bin/env node
/**
 * Enhanced Supermemory Client for Clawdbot
 * Handles session integration, privacy filtering, caching, error handling
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SupermemoryClient {
  constructor(configPath = null) {
    this.configPath = configPath || path.join(__dirname, '..', 'config', 'supermemory-config.json');
    this.credsPath = path.join(__dirname, '..', 'supermemory-credentials.json');
    this.client = null;
    this.containerTag = null;
    this.config = null;
    this.profileCache = null;
    this.cacheTimestamp = null;
  }

  /**
   * Initialize client (async)
   */
  async init() {
    try {
      // Load config
      const configData = await fs.readFile(this.configPath, 'utf8');
      this.config = JSON.parse(configData);

      if (!this.config.enabled) {
        console.log('ℹ️  Supermemory is disabled in config');
        return this;
      }

      // Load credentials
      const credsData = await fs.readFile(this.credsPath, 'utf8');
      const creds = JSON.parse(credsData);

      // Set API key
      process.env.SUPERMEMORY_API_KEY = creds.apiKey;
      this.containerTag = creds.containerTag;

      // Dynamically import Supermemory SDK
      const { default: Supermemory } = await import('supermemory');
      this.client = new Supermemory();

      return this;
    } catch (err) {
      console.error('❌ Failed to initialize Supermemory:', err.message);
      throw err;
    }
  }

  /**
   * Privacy filter - never send sensitive data
   */
  _filterSensitiveData(content) {
    if (!this.config.features.privacy.filterSensitiveData) {
      return { content, blocked: false };
    }

    const neverSend = this.config.features.privacy.neverSendPatterns;
    const blockedPatterns = [];

    for (const pattern of neverSend) {
      const regex = new RegExp(pattern, 'i');
      if (regex.test(content)) {
        blockedPatterns.push(pattern);
      }
    }

    if (blockedPatterns.length > 0) {
      console.warn(`⚠️  Blocked sensitive content (patterns: ${blockedPatterns.join(', ')})`);
      return { content: null, blocked: true, patterns: blockedPatterns };
    }

    return { content, blocked: false };
  }

  /**
   * Add content to Supermemory with privacy filtering
   */
  async add(content, metadata = {}) {
    try {
      if (!this.client) {
        throw new Error('Client not initialized. Call init() first.');
      }

      // Privacy filter
      const filtered = this._filterSensitiveData(content);
      if (filtered.blocked) {
        return { success: false, blocked: true, patterns: filtered.patterns };
      }

      const result = await this.client.add({
        content: filtered.content,
        containerTag: this.containerTag,
        ...metadata
      });

      return { success: true, result };
    } catch (err) {
      console.error('❌ Add failed:', err.message);
      return { success: false, error: err.message };
    }
  }

  /**
   * Batch add multiple items
   */
  async addBatch(items) {
    const results = [];
    for (const item of items) {
      const content = typeof item === 'string' ? item : item.content;
      const metadata = typeof item === 'object' ? item.metadata : {};
      const result = await this.add(content, metadata);
      results.push(result);
    }
    return results;
  }

  /**
   * Get user profile with caching
   */
  async getProfile(query = '', forceRefresh = false) {
    try {
      if (!this.client) {
        throw new Error('Client not initialized. Call init() first.');
      }

      // Check cache
      const now = Date.now();
      const cacheMaxAge = this.config.performance.cacheMaxAge || 300000; // 5 min default

      if (
        !forceRefresh &&
        this.config.performance.cacheProfile &&
        this.profileCache &&
        this.cacheTimestamp &&
        (now - this.cacheTimestamp) < cacheMaxAge
      ) {
        console.log('📦 Using cached profile');
        return this.profileCache;
      }

      // Fetch fresh profile
      console.log('🔄 Fetching profile from Supermemory...');
      const profile = await this.client.profile({
        containerTag: this.containerTag,
        q: query
      });

      // Format response
      const staticFacts = (profile?.profile?.static || []).join('\n') || '(no static facts yet)';
      const dynamicFacts = (profile?.profile?.dynamic || []).join('\n') || '(no dynamic facts yet)';
      const memories = (profile?.searchResults?.results || [])
        .map(r => r.memory)
        .filter(Boolean)
        .join('\n') || '(no memories yet)';

      const formatted = {
        raw: profile,
        static: staticFacts,
        dynamic: dynamicFacts,
        memories,
        context: `Static profile:\n${staticFacts}\n\nDynamic profile:\n${dynamicFacts}\n\nRelevant memories:\n${memories}`
      };

      // Update cache
      this.profileCache = formatted;
      this.cacheTimestamp = now;

      return formatted;
    } catch (err) {
      console.error('❌ Profile fetch failed:', err.message);
      throw err;
    }
  }

  /**
   * Search memories
   */
  async search(query, limit = 10) {
    try {
      if (!this.client) {
        throw new Error('Client not initialized. Call init() first.');
      }

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

  /**
   * Session start hook - get context for session
   */
  async sessionStart(query = '') {
    try {
      if (!this.config.features.sessionStart.enabled) {
        return null;
      }

      console.log('🧠 Loading Supermemory profile for session start...');
      const profile = await this.getProfile(query);

      console.log('✅ Supermemory profile loaded');
      return profile;
    } catch (err) {
      console.error('⚠️  Session start failed (non-fatal):', err.message);
      return null;
    }
  }

  /**
   * Session end hook - sync highlights
   */
  async sessionEnd(highlights = []) {
    try {
      if (!this.config.features.sessionEnd.enabled || !this.config.features.sessionEnd.autoSync) {
        return null;
      }

      console.log('💾 Syncing session highlights to Supermemory...');

      const maxHighlights = this.config.features.sessionEnd.maxHighlights || 5;
      const toSync = highlights.slice(0, maxHighlights);

      const results = await this.addBatch(toSync);
      const success = results.filter(r => r.success).length;

      console.log(`✅ Session sync complete: ${success}/${toSync.length} highlights synced`);
      return { success, total: toSync.length, results };
    } catch (err) {
      console.error('⚠️  Session end sync failed (non-fatal):', err.message);
      return null;
    }
  }

  /**
   * Extract session highlights from daily log
   */
  async extractHighlights(dailyLogContent) {
    const highlights = [];
    const lines = dailyLogContent.split('\n');

    // Simple extraction logic - look for decision points, actions, insights
    const keywordPatterns = [
      /decision:/i,
      /implemented:/i,
      /learned:/i,
      /insight:/i,
      /completed:/i,
      /preference:/i,
      /goal:/i
    ];

    for (const line of lines) {
      for (const pattern of keywordPatterns) {
        if (pattern.test(line) && line.length > 20) {
          highlights.push(line.trim());
          break;
        }
      }
    }

    return highlights;
  }
}

// CLI interface
async function main() {
  try {
    const [action, ...args] = process.argv.slice(2);

    if (!action) {
      console.log(`
Supermemory Enhanced Client CLI

Usage:
  node scripts/supermemory-client.js add <content>           Add content
  node scripts/supermemory-client.js profile [query]         Get profile
  node scripts/supermemory-client.js search <query>          Search
  node scripts/supermemory-client.js session-start [query]   Session start hook
  node scripts/supermemory-client.js session-end             Session end hook
      `);
      return;
    }

    const sm = await new SupermemoryClient().init();

    switch (action) {
      case 'add':
        const content = args.join(' ');
        if (!content) {
          console.error('❌ No content provided');
          process.exit(1);
        }
        const addResult = await sm.add(content);
        console.log('Result:', JSON.stringify(addResult, null, 2));
        break;

      case 'profile':
        const query = args.join(' ');
        const profile = await sm.getProfile(query);
        console.log('\n📊 User Profile:\n');
        console.log(profile.context);
        break;

      case 'search':
        const searchQuery = args.join(' ');
        if (!searchQuery) {
          console.error('❌ No search query provided');
          process.exit(1);
        }
        const results = await sm.search(searchQuery);
        console.log('\n🔍 Search Results:\n');
        console.log(JSON.stringify(results, null, 2));
        break;

      case 'session-start':
        const startQuery = args.join(' ');
        const startProfile = await sm.sessionStart(startQuery);
        if (startProfile) {
          console.log('\n🚀 Session Started - Context:\n');
          console.log(startProfile.context);
        }
        break;

      case 'session-end':
        console.log('💾 Session ending...');
        const endResult = await sm.sessionEnd(['Example highlight from session']);
        console.log('Result:', JSON.stringify(endResult, null, 2));
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
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default SupermemoryClient;
