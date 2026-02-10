#!/usr/bin/env node
/**
 * Supermemory Integration Test Suite
 * Verifies all components work correctly
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class IntegrationTester {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  async test(name, fn) {
    process.stdout.write(`  ${name}... `);
    try {
      await fn();
      console.log('✅ PASS');
      this.passed++;
      return true;
    } catch (err) {
      console.log('❌ FAIL');
      console.log(`     Error: ${err.message}`);
      this.failed++;
      return false;
    }
  }

  async run() {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🧪 SUPERMEMORY INTEGRATION TEST SUITE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Test 1: Files exist
    console.log('📦 Test Group 1: Files & Configuration\n');

    await this.test('Credentials file exists', async () => {
      const credsPath = path.join(__dirname, '..', 'supermemory-credentials.json');
      await fs.access(credsPath);
    });

    await this.test('Config file exists', async () => {
      const configPath = path.join(__dirname, '..', 'config', 'supermemory-config.json');
      await fs.access(configPath);
    });

    await this.test('Client script exists', async () => {
      const clientPath = path.join(__dirname, 'supermemory-client.js');
      await fs.access(clientPath);
    });

    await this.test('Session start script exists', async () => {
      const sessionStartPath = path.join(__dirname, 'supermemory-session-start.js');
      await fs.access(sessionStartPath);
    });

    await this.test('Documentation exists', async () => {
      const docsPath = path.join(__dirname, '..', 'SUPERMEMORY-INTEGRATION.md');
      await fs.access(docsPath);
    });

    // Test 2: Configuration validity
    console.log('\n⚙️  Test Group 2: Configuration Validity\n');

    let config;
    await this.test('Config file is valid JSON', async () => {
      const configPath = path.join(__dirname, '..', 'config', 'supermemory-config.json');
      const data = await fs.readFile(configPath, 'utf8');
      config = JSON.parse(data);
    });

    await this.test('Config has required fields', async () => {
      if (!config) throw new Error('Config not loaded');
      if (!config.enabled) throw new Error('enabled field missing');
      if (!config.features) throw new Error('features field missing');
      if (!config.userProfile) throw new Error('userProfile field missing');
    });

    let creds;
    await this.test('Credentials file is valid JSON', async () => {
      const credsPath = path.join(__dirname, '..', 'supermemory-credentials.json');
      const data = await fs.readFile(credsPath, 'utf8');
      creds = JSON.parse(data);
    });

    await this.test('Credentials have required fields', async () => {
      if (!creds) throw new Error('Credentials not loaded');
      if (!creds.apiKey) throw new Error('apiKey missing');
      if (!creds.containerTag) throw new Error('containerTag missing');
    });

    // Test 3: SDK installation
    console.log('\n📦 Test Group 3: SDK Installation\n');

    let Supermemory;
    await this.test('Supermemory SDK is installed', async () => {
      const module = await import('supermemory');
      Supermemory = module.default;
      if (!Supermemory) throw new Error('Supermemory not exported');
    });

    // Test 4: Client functionality
    console.log('\n🔧 Test Group 4: Client Functionality\n');

    let SupermemoryClient;
    await this.test('SupermemoryClient module loads', async () => {
      const module = await import('./supermemory-client.js');
      SupermemoryClient = module.default;
      if (!SupermemoryClient) throw new Error('SupermemoryClient not exported');
    });

    let client;
    await this.test('Client initializes successfully', async () => {
      client = await new SupermemoryClient().init();
      if (!client.client) throw new Error('Client not initialized');
      if (!client.containerTag) throw new Error('Container tag not set');
    });

    // Test 5: API connectivity
    console.log('\n🌐 Test Group 5: API Connectivity\n');

    await this.test('Add memory works', async () => {
      if (!client) throw new Error('Client not initialized');
      const result = await client.add('Test memory for integration test');
      if (!result.success) throw new Error('Add failed: ' + (result.error || 'unknown'));
    });

    let profile;
    await this.test('Get profile works', async () => {
      if (!client) throw new Error('Client not initialized');
      profile = await client.getProfile();
      if (!profile) throw new Error('Profile is null');
      if (!profile.context) throw new Error('Profile missing context');
    });

    await this.test('Search works', async () => {
      if (!client) throw new Error('Client not initialized');
      const results = await client.search('test');
      if (!results) throw new Error('Search returned null');
    });

    // Test 6: Privacy filter
    console.log('\n🔒 Test Group 6: Privacy Filter\n');

    await this.test('Blocks password content', async () => {
      if (!client) throw new Error('Client not initialized');
      const result = await client.add('My password is abc123');
      if (!result.blocked) throw new Error('Should have blocked password content');
    });

    await this.test('Blocks API key content', async () => {
      if (!client) throw new Error('Client not initialized');
      const result = await client.add('API key: sk_test_123456');
      if (!result.blocked) throw new Error('Should have blocked API key content');
    });

    await this.test('Allows safe content', async () => {
      if (!client) throw new Error('Client not initialized');
      const result = await client.add('User prefers morning meetings');
      if (result.blocked) throw new Error('Should not have blocked safe content');
      if (!result.success) throw new Error('Safe content should succeed');
    });

    // Test 7: Caching
    console.log('\n⚡ Test Group 7: Performance & Caching\n');

    await this.test('Profile caching works', async () => {
      if (!client) throw new Error('Client not initialized');
      
      // First call (should fetch)
      const start1 = Date.now();
      await client.getProfile();
      const time1 = Date.now() - start1;
      
      // Second call (should use cache)
      const start2 = Date.now();
      await client.getProfile();
      const time2 = Date.now() - start2;
      
      if (time2 > time1) {
        throw new Error(`Cache not working: first=${time1}ms, second=${time2}ms`);
      }
      
      console.log(`       First fetch: ${time1}ms, Cached: ${time2}ms`);
    });

    // Test 8: STATE.json integration
    console.log('\n📋 Test Group 8: STATE.json Integration\n');

    let state;
    await this.test('STATE.json exists and is valid', async () => {
      const statePath = path.join(__dirname, '..', 'STATE.json');
      const data = await fs.readFile(statePath, 'utf8');
      state = JSON.parse(data);
    });

    await this.test('STATE.json has Supermemory entry', async () => {
      if (!state) throw new Error('STATE.json not loaded');
      if (!state.connectedServices) throw new Error('connectedServices missing');
      if (!state.connectedServices.supermemory) throw new Error('supermemory entry missing');
    });

    await this.test('Supermemory entry is correctly configured', async () => {
      const sm = state.connectedServices.supermemory;
      if (!sm.connected) throw new Error('connected should be true');
      if (!sm.containerTag) throw new Error('containerTag missing');
      if (!sm.credentialsPath) throw new Error('credentialsPath missing');
    });

    // Summary
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 TEST RESULTS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const total = this.passed + this.failed;
    const percentage = ((this.passed / total) * 100).toFixed(1);
    
    console.log(`  Total Tests:  ${total}`);
    console.log(`  Passed:       ${this.passed} ✅`);
    console.log(`  Failed:       ${this.failed} ${this.failed > 0 ? '❌' : ''}`);
    console.log(`  Success Rate: ${percentage}%`);
    console.log('');

    if (this.failed === 0) {
      console.log('✅ ALL TESTS PASSED! Integration is working perfectly.\n');
      console.log('🚀 Ready for production use.\n');
    } else {
      console.log('⚠️  SOME TESTS FAILED. Review errors above.\n');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (this.passed === total) {
      console.log('📚 Next Steps:\n');
      console.log('1. Test session start:');
      console.log('   node scripts/supermemory-session-start.js\n');
      console.log('2. Add to AGENTS.md session routine\n');
      console.log('3. Test with real customer data\n');
    }

    process.exit(this.failed > 0 ? 1 : 0);
  }
}

// Run tests
const tester = new IntegrationTester();
tester.run();
