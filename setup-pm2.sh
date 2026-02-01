#!/bin/bash
# Clawdbot PM2 Setup Script (Mac/Linux)
# Run this script to set up Clawdbot to run 24/7 in the background

set -e

echo "🚀 Setting up Clawdbot with PM2..."
echo ""

# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
else
    echo "✅ PM2 already installed"
fi

# Create ecosystem.config.js in workspace
WORKSPACE_DIR="$HOME/clawd"
mkdir -p "$WORKSPACE_DIR"

echo "📝 Creating PM2 configuration..."
cat > "$WORKSPACE_DIR/ecosystem.config.js" << 'EOF'
module.exports = {
  apps: [{
    name: 'clawdbot-gateway',
    script: 'clawdbot',
    args: 'gateway start',
    cwd: process.env.HOME + '/clawd',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
EOF

# Navigate to workspace
cd "$WORKSPACE_DIR"

# Stop existing instance if running
pm2 delete clawdbot-gateway 2>/dev/null || true

# Start Clawdbot with PM2
echo "🎯 Starting Clawdbot..."
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Show status
echo ""
echo "✅ Clawdbot is now running!"
echo ""
pm2 status

echo ""
echo "📋 Next steps:"
echo "  1. Run: pm2 startup"
echo "  2. Follow the command PM2 gives you (requires sudo)"
echo "  3. This will make Clawdbot start automatically on boot"
echo ""
echo "💡 Useful commands:"
echo "  pm2 status                    # Check if running"
echo "  pm2 logs clawdbot-gateway     # View live logs"
echo "  pm2 restart clawdbot-gateway  # Restart"
echo ""
