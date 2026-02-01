# Clawdbot Railway Deployment
FROM node:22-alpine

# Install Clawdbot globally
RUN npm install -g clawdbot@latest

# Create workspace directory
WORKDIR /root/clawd

# Copy workspace files
COPY AGENTS.md ./
COPY SOUL.md ./
COPY USER.md ./
COPY IDENTITY.md ./
COPY TOOLS.md ./
COPY HEARTBEAT.md ./
COPY MEMORY.md ./
COPY memory/ ./memory/

# Copy any additional files (skills, etc.)
COPY *.md ./

# Expose gateway port
EXPOSE 18789

# Start Clawdbot gateway
CMD ["clawdbot", "gateway", "start"]
