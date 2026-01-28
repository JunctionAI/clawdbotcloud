#!/usr/bin/env node

// Railway start script for Clawdbot
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Setup Clawdbot config
const homeDir = os.homedir();
const clawdbotDir = path.join(homeDir, '.clawdbot');
const configPath = path.join(clawdbotDir, 'clawdbot.json');
const agentsDir = path.join(clawdbotDir, 'agents', 'main', 'agent');
const authProfilesPath = path.join(agentsDir, 'auth-profiles.json');
const workspaceDir = process.env.CLAWDBOT_WORKSPACE || '/app/workspace';

console.log('Setting up Clawdbot configuration...');

// Create directories
[clawdbotDir, agentsDir, workspaceDir, `${workspaceDir}/memory`].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Load and process config template
const railwayConfig = require('./railway-config.json');

// Replace environment variable placeholders
const configStr = JSON.stringify(railwayConfig, null, 2)
  .replace(/\$\{DISCORD_BOT_TOKEN\}/g, process.env.DISCORD_BOT_TOKEN || '');

fs.writeFileSync(configPath, configStr);
console.log(`Wrote config to: ${configPath}`);

// Create auth profiles
const authProfiles = {
  version: 1,
  profiles: {
    "openai:manual": {
      type: "token",
      provider: "openai",
      token: process.env.OPENAI_API_KEY || ''
    },
    "anthropic:manual": {
      type: "token",
      provider: "anthropic",
      token: process.env.ANTHROPIC_API_KEY || ''
    }
  },
  lastGood: {
    anthropic: "anthropic:manual"
  }
};

fs.writeFileSync(authProfilesPath, JSON.stringify(authProfiles, null, 2));
console.log(`Wrote auth profiles to: ${authProfilesPath}`);

// Find clawdbot entry point
const clawdbotEntry = path.join(__dirname, 'node_modules', 'clawdbot', 'dist', 'entry.js');

console.log('Starting Clawdbot gateway...');
console.log(`Workspace: ${workspaceDir}`);

// Spawn clawdbot gateway
const gateway = spawn('node', [clawdbotEntry, 'gateway', 'start'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    CLAWDBOT_WORKSPACE: workspaceDir,
    PORT: process.env.PORT || '18789',
    HOME: homeDir
  }
});

gateway.on('error', (err) => {
  console.error('Failed to start Clawdbot:', err);
  process.exit(1);
});

gateway.on('exit', (code) => {
  console.log(`Clawdbot exited with code ${code}`);
  process.exit(code);
});

// Handle process signals
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  gateway.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  gateway.kill('SIGINT');
});
