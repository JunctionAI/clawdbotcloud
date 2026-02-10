#!/usr/bin/env node
/**
 * Real-time Agent Dashboard
 * Shows all active subagents and their status
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3200;
const SESSIONS_DIR = path.join(process.env.USERPROFILE || process.env.HOME, '.clawdbot', 'agents', 'main', 'sessions');

// Get active sessions
function getActiveSessions() {
  const sessions = [];
  
  try {
    const files = fs.readdirSync(SESSIONS_DIR).filter(f => f.endsWith('.jsonl'));
    
    for (const file of files) {
      const filePath = path.join(SESSIONS_DIR, file);
      const stats = fs.statSync(filePath);
      
      // Only show sessions active in last 30 minutes
      const thirtyMinAgo = Date.now() - (30 * 60 * 1000);
      if (stats.mtimeMs < thirtyMinAgo) continue;
      
      // Read last few lines to get status
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.trim().split('\n').filter(l => l.trim());
      
      let label = 'unknown';
      let status = 'running';
      let lastMessage = '';
      let task = '';
      
      // Parse JSONL to extract info
      for (const line of lines) {
        try {
          const entry = JSON.parse(line);
          if (entry.label) label = entry.label;
          if (entry.task) task = entry.task;
          if (entry.role === 'assistant' && entry.content) {
            lastMessage = entry.content.substring(0, 200);
          }
          if (entry.status) status = entry.status;
        } catch (e) {}
      }
      
      sessions.push({
        id: file.replace('.jsonl', ''),
        label,
        task: task.substring(0, 100),
        status,
        lastMessage,
        updatedAt: stats.mtimeMs,
        updatedAgo: formatTimeAgo(stats.mtimeMs)
      });
    }
  } catch (e) {
    console.error('Error reading sessions:', e);
  }
  
  // Sort by most recently updated
  sessions.sort((a, b) => b.updatedAt - a.updatedAt);
  
  return sessions;
}

function formatTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

// HTML Dashboard
function getDashboardHTML() {
  return `<!DOCTYPE html>
<html>
<head>
  <title>🤖 Agent Dashboard</title>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f0f1a;
      color: #e0e0e0;
      padding: 20px;
    }
    h1 { 
      color: #818cf8;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .stats {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }
    .stat {
      background: #1a1a2e;
      padding: 15px 25px;
      border-radius: 10px;
      border: 1px solid #2a2a4a;
    }
    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #818cf8;
    }
    .stat-label {
      color: #888;
      font-size: 14px;
    }
    .agents {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 15px;
    }
    .agent {
      background: #1a1a2e;
      border: 1px solid #2a2a4a;
      border-radius: 12px;
      padding: 15px;
      transition: all 0.2s;
    }
    .agent:hover {
      border-color: #818cf8;
      transform: translateY(-2px);
    }
    .agent-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .agent-label {
      font-weight: bold;
      color: #818cf8;
      font-size: 16px;
    }
    .agent-status {
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
    }
    .status-running {
      background: #22c55e20;
      color: #22c55e;
    }
    .status-completed {
      background: #3b82f620;
      color: #3b82f6;
    }
    .agent-task {
      color: #aaa;
      font-size: 13px;
      margin-bottom: 8px;
      line-height: 1.4;
    }
    .agent-time {
      color: #666;
      font-size: 12px;
    }
    .agent-message {
      background: #0f0f1a;
      padding: 10px;
      border-radius: 8px;
      font-size: 12px;
      color: #888;
      margin-top: 10px;
      max-height: 80px;
      overflow: hidden;
    }
    .pulse {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      margin-right: 8px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .refresh-note {
      color: #666;
      font-size: 12px;
      margin-top: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1><span class="pulse"></span> Agent Dashboard</h1>
  
  <div class="stats" id="stats"></div>
  <div class="agents" id="agents"></div>
  <p class="refresh-note">Auto-refreshes every 2 seconds</p>
  
  <script>
    async function fetchAgents() {
      try {
        const res = await fetch('/api/agents');
        const agents = await res.json();
        
        // Update stats
        const running = agents.filter(a => a.status === 'running').length;
        const completed = agents.filter(a => a.status === 'completed').length;
        
        document.getElementById('stats').innerHTML = \`
          <div class="stat">
            <div class="stat-value">\${agents.length}</div>
            <div class="stat-label">Total Agents</div>
          </div>
          <div class="stat">
            <div class="stat-value">\${running}</div>
            <div class="stat-label">Running</div>
          </div>
          <div class="stat">
            <div class="stat-value">\${completed}</div>
            <div class="stat-label">Completed</div>
          </div>
        \`;
        
        // Update agents grid
        document.getElementById('agents').innerHTML = agents.map(agent => \`
          <div class="agent">
            <div class="agent-header">
              <span class="agent-label">\${agent.label}</span>
              <span class="agent-status status-\${agent.status}">\${agent.status}</span>
            </div>
            <div class="agent-task">\${agent.task || 'Working...'}</div>
            <div class="agent-time">\${agent.updatedAgo}</div>
            \${agent.lastMessage ? \`<div class="agent-message">\${agent.lastMessage}</div>\` : ''}
          </div>
        \`).join('');
        
      } catch (e) {
        console.error('Failed to fetch agents:', e);
      }
    }
    
    // Initial fetch and auto-refresh
    fetchAgents();
    setInterval(fetchAgents, 2000);
  </script>
</body>
</html>`;
}

// Create server
const server = http.createServer((req, res) => {
  if (req.url === '/api/agents') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getActiveSessions()));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(getDashboardHTML());
  }
});

server.listen(PORT, () => {
  console.log(`🤖 Agent Dashboard running at http://localhost:${PORT}`);
});
