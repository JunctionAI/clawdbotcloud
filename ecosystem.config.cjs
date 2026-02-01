/**
 * PM2 Ecosystem Config for Clawdbot Gateway
 * Windows 24/7 Service Configuration
 */

module.exports = {
  apps: [{
    name: 'clawdbot-gateway',
    script: 'clawdbot',
    args: 'gateway start',
    interpreter: 'none', // Use clawdbot as direct executable
    cwd: 'C:\\Users\\Nightgalem\\clawd',
    
    // Auto-restart on crash
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    
    // Restart policy
    restart_delay: 5000,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Logs
    error_file: 'C:\\Users\\Nightgalem\\clawd\\logs\\pm2-error.log',
    out_file: 'C:\\Users\\Nightgalem\\clawd\\logs\\pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Environment
    env: {
      NODE_ENV: 'production',
      PATH: process.env.PATH
    }
  }]
};
