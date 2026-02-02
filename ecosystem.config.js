module.exports = {
  apps: [{
    name: 'clawdbot-gateway',
    script: 'C:\\Users\\Nightgalem\\AppData\\Roaming\\npm\\node_modules\\clawdbot\\dist\\entry.js',
    args: 'gateway start',
    cwd: 'C:\\Users\\Nightgalem\\clawd',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
