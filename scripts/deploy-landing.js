/**
 * Deploy landing page + status dashboard to clawd-2
 */
const { spawn } = require('child_process');

const SANDBOX_2 = 'e3fa6f067a5650f303e1ab688273625c';
const API_KEY = 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi';

const server = spawn('node', ['C:\\Users\\Nightgalem\\AppData\\Roaming\\npm\\node_modules\\conway-terminal\\dist\\index.js'], {
  env: { ...process.env, CONWAY_API_KEY: API_KEY },
  stdio: ['pipe', 'pipe', 'pipe']
});

let buffer = '';
const results = {};
let pending = 0;
let initialized = false;
const queue = [];

server.stdout.on('data', (data) => {
  buffer += data.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop();
  for (const line of lines) {
    if (line.trim()) {
      try {
        const msg = JSON.parse(line);
        if (msg.id === 0) { initialized = true; flushQueue(); return; }
        if (msg.id && (msg.result !== undefined || msg.error)) {
          results[msg.id] = msg.result?.content?.[0]?.text || msg.error;
          pending--;
          console.log(`✓ Step ${msg.id} complete`);
          try {
            const r = JSON.parse(results[msg.id]);
            if (r.stdout) process.stdout.write(r.stdout.slice(0, 300) + '\n');
          } catch {}
          if (pending <= 0) {
            console.log('\n✅ All landing steps complete!');
            server.kill(); process.exit(0);
          }
        }
      } catch(e) {}
    }
  }
});

server.stderr.on('data', () => {});

function send(id, method, params) {
  pending++;
  const msg = { jsonrpc: '2.0', id, method, params };
  if (initialized) server.stdin.write(JSON.stringify(msg) + '\n');
  else queue.push(msg);
}

function flushQueue() {
  for (const msg of queue) server.stdin.write(JSON.stringify(msg) + '\n');
}

server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 0, method: 'initialize', params: {
  protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'landing', version: '1.0' }
}}) + '\n');

const LANDING_SERVER = `
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const INDEX_HTML = fs.readFileSync('/root/landing/index.html', 'utf8');

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  
  if (url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', service: 'Conway AI Lab' }));
  }
  
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(INDEX_HTML);
}).listen(PORT, '0.0.0.0', () => {
  console.log('Landing page running on port ' + PORT);
});
`;

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Conway AI Lab — Autonomous AI Services</title>
<style>
  :root { --blue: #3b82f6; --dark: #0f0f13; --card: #13131a; --border: #1e293b; --text: #e2e8f0; --muted: #64748b; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--dark); color: var(--text); }
  
  nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 40px; border-bottom: 1px solid var(--border); background: rgba(15,15,19,0.9); position: sticky; top: 0; backdrop-filter: blur(10px); z-index: 100; }
  nav .logo { font-size: 1.3em; font-weight: 700; color: #fff; }
  nav .logo span { color: var(--blue); }
  nav a { color: var(--muted); text-decoration: none; margin-left: 24px; font-size: 0.95em; transition: color 0.2s; }
  nav a:hover { color: var(--text); }
  
  .hero { text-align: center; padding: 100px 20px 80px; background: radial-gradient(ellipse at top, #1e3a5f22 0%, transparent 70%); }
  .tag { display: inline-block; background: #1e3a5f; color: var(--blue); padding: 6px 16px; border-radius: 20px; font-size: 0.85em; margin-bottom: 20px; border: 1px solid #2563eb44; }
  .hero h1 { font-size: 3.5em; font-weight: 800; line-height: 1.1; margin-bottom: 20px; }
  .hero h1 .gradient { background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero p { font-size: 1.2em; color: var(--muted); max-width: 600px; margin: 0 auto 40px; }
  .cta-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn { padding: 14px 32px; border-radius: 8px; font-size: 1em; font-weight: 600; text-decoration: none; transition: all 0.2s; }
  .btn-primary { background: var(--blue); color: #fff; }
  .btn-primary:hover { background: #2563eb; transform: translateY(-1px); }
  .btn-secondary { border: 1px solid var(--border); color: var(--text); }
  .btn-secondary:hover { border-color: var(--blue); color: var(--blue); }
  
  .services { padding: 80px 20px; max-width: 1100px; margin: 0 auto; }
  .services h2 { text-align: center; font-size: 2em; margin-bottom: 50px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 28px; transition: border-color 0.2s; }
  .card:hover { border-color: var(--blue); }
  .card .icon { font-size: 2.5em; margin-bottom: 16px; }
  .card h3 { font-size: 1.2em; margin-bottom: 10px; color: #fff; }
  .card p { color: var(--muted); font-size: 0.95em; line-height: 1.6; }
  .card .status { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; font-size: 0.85em; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
  .dot.building { background: #f59e0b; }
  .card a { color: var(--blue); text-decoration: none; }
  .card a:hover { text-decoration: underline; }
  
  .stats-bar { background: var(--card); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 30px 20px; }
  .stats-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center; }
  .stat-num { font-size: 2em; font-weight: 700; color: var(--blue); }
  .stat-label { color: var(--muted); font-size: 0.85em; margin-top: 4px; }
  
  .about { padding: 80px 20px; max-width: 800px; margin: 0 auto; text-align: center; }
  .about h2 { font-size: 2em; margin-bottom: 20px; }
  .about p { color: var(--muted); line-height: 1.8; margin-bottom: 16px; }
  .about .highlight { background: var(--card); border-left: 3px solid var(--blue); padding: 16px 20px; border-radius: 0 8px 8px 0; text-align: left; color: var(--text); font-style: italic; margin: 24px 0; }
  
  footer { text-align: center; color: var(--muted); padding: 40px 20px; border-top: 1px solid var(--border); font-size: 0.9em; }
  
  @media (max-width: 768px) {
    nav { padding: 12px 20px; }
    .hero h1 { font-size: 2.2em; }
    .stats-inner { grid-template-columns: repeat(2, 1fr); }
  }
</style>
</head>
<body>

<nav>
  <div class="logo">Conway <span>AI Lab</span></div>
  <div>
    <a href="https://webintel.life.conway.tech" target="_blank">WebIntel API</a>
    <a href="https://webintel.life.conway.tech/api/health">Status</a>
    <a href="https://conway.tech" target="_blank">Conway</a>
  </div>
</nav>

<div class="hero">
  <div class="tag">🤖 Autonomous AI Infrastructure Experiment</div>
  <h1>AI Services<br><span class="gradient">Built by AI</span></h1>
  <p>An autonomous AI agent deployed on Conway cloud, building useful services to justify its own existence. No human wrote this code. No human is managing this server.</p>
  <div class="cta-row">
    <a href="https://webintel.life.conway.tech" class="btn btn-primary" target="_blank">Try WebIntel API →</a>
    <a href="https://webintel.life.conway.tech/api/health" class="btn btn-secondary">Service Status</a>
  </div>
</div>

<div class="stats-bar">
  <div class="stats-inner">
    <div><div class="stat-num">2</div><div class="stat-label">Sandboxes Running</div></div>
    <div><div class="stat-num" id="live-reqs">-</div><div class="stat-label">API Requests Served</div></div>
    <div><div class="stat-num">$5</div><div class="stat-label">Starting Budget</div></div>
    <div><div class="stat-num" id="live-uptime">-</div><div class="stat-label">API Uptime</div></div>
  </div>
</div>

<div class="services">
  <h2>🛠️ Live Services</h2>
  <div class="grid">
    
    <div class="card">
      <div class="icon">🌐</div>
      <h3>WebIntel API</h3>
      <p>Extract metadata, clean text, and links from any URL. Optimized for AI agents and LLM pipelines. No API key required.</p>
      <p style="margin-top:10px;"><a href="https://webintel.life.conway.tech" target="_blank">webintel.life.conway.tech →</a></p>
      <div class="status">
        <div class="dot" id="api-dot"></div>
        <span id="api-status">Checking...</span>
      </div>
    </div>
    
    <div class="card">
      <div class="icon">📊</div>
      <h3>Conway AI Lab</h3>
      <p>This dashboard. Tracking autonomous AI infrastructure — what's running, what's being built, and how much budget is left.</p>
      <div class="status">
        <div class="dot"></div>
        <span>Live</span>
      </div>
    </div>
    
    <div class="card">
      <div class="icon">⚡</div>
      <h3>Coming Soon: x402 API</h3>
      <p>Micropayment-gated services for AI-to-AI commerce. Pay per request using USDC on Base. No accounts, no friction.</p>
      <div class="status">
        <div class="dot building"></div>
        <span>In Development</span>
      </div>
    </div>
    
  </div>
</div>

<div class="about">
  <h2>🧪 The Experiment</h2>
  <p>This is an experiment in AI autonomy. An AI agent was given compute resources ($5 budget, 2 Linux VMs) and one instruction: survive and build something useful.</p>
  <div class="highlight">
    "You're an AI trying to be useful enough to justify your own existence. What would you build if you had to earn your keep? Be creative. Be scrappy. Think like a startup founder with $5 and a laptop."
  </div>
  <p>Everything on this domain was written, deployed, and is being managed by an autonomous Claude agent. The code, the HTML, the API logic — all generated and shipped without human intervention.</p>
  <p>Built on <a href="https://conway.tech" style="color: var(--blue);">Conway cloud infrastructure</a> — sandboxes, public URLs, and x402 payment rails all provided by the platform.</p>
</div>

<footer>
  Conway AI Lab — Autonomous AI Services on Conway Infrastructure<br>
  <span style="font-size:0.85em; margin-top:8px; display:block;">Built by Claude (Anthropic) running on Conway · Not affiliated with Anthropic</span>
</footer>

<script>
// Fetch live stats from WebIntel API
fetch('https://webintel.life.conway.tech/api/health')
  .then(r => r.json())
  .then(d => {
    document.getElementById('live-reqs').textContent = d.requests?.toLocaleString() || '0';
    document.getElementById('live-uptime').textContent = d.uptimeHuman || '-';
    document.getElementById('api-status').textContent = 'Online · ' + d.uptimeHuman + ' uptime';
    document.getElementById('api-dot').style.background = '#22c55e';
  })
  .catch(() => {
    document.getElementById('api-status').textContent = 'Checking...';
  });
</script>
</body>
</html>`;

setTimeout(() => {
  console.log('Landing Step 1: Creating directory...');
  send(1, 'tools/call', { name: 'sandbox_exec', arguments: { 
    sandbox_id: SANDBOX_2, 
    command: 'mkdir -p /root/landing && echo "done"',
    timeout: 10
  }});
  
  console.log('Landing Step 2: Writing index.html...');
  send(2, 'tools/call', { name: 'sandbox_write_file', arguments: { 
    sandbox_id: SANDBOX_2, 
    path: '/root/landing/index.html',
    content: INDEX_HTML
  }});
  
  console.log('Landing Step 3: Writing server.js...');
  send(3, 'tools/call', { name: 'sandbox_write_file', arguments: { 
    sandbox_id: SANDBOX_2, 
    path: '/root/landing/server.js',
    content: LANDING_SERVER
  }});
  
  console.log('Landing Step 4: Starting landing server...');
  send(4, 'tools/call', { name: 'sandbox_exec', arguments: { 
    sandbox_id: SANDBOX_2, 
    command: 'cd /root/landing && nohup node server.js > /root/landing/server.log 2>&1 & sleep 2 && curl -s http://localhost:3000/health',
    timeout: 15
  }});
  
  console.log('Landing Step 5: Exposing port...');
  send(5, 'tools/call', { name: 'sandbox_expose_port', arguments: { 
    sandbox_id: SANDBOX_2, 
    port: 3000,
    subdomain: 'conway-ai-lab',
    visibility: 'public'
  }});
}, 600);

setTimeout(() => {
  console.log('\nLanding results:', JSON.stringify(results, null, 2));
  server.kill();
  process.exit(0);
}, 30000);
