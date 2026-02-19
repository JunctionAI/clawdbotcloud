const { spawn } = require('child_process');

const API_KEY = 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi';
const SANDBOX_1 = 'b95c74cc5097d42cfa1804657e735d57';
const SANDBOX_2 = 'e3fa6f067a5650f303e1ab688273625c';

let msgId = 1;
let server;
let buffer = '';
const pending = new Map();

function startServer() {
  server = spawn('node', ['C:\\Users\\Nightgalem\\AppData\\Roaming\\npm\\node_modules\\conway-terminal\\dist\\index.js'], {
    env: { ...process.env, CONWAY_API_KEY: API_KEY },
    stdio: ['pipe', 'pipe', 'pipe']
  });
  server.stdout.on('data', (data) => {
    buffer += data.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const msg = JSON.parse(line);
        if (msg.id !== undefined && pending.has(msg.id)) {
          const { resolve, reject } = pending.get(msg.id);
          pending.delete(msg.id);
          if (msg.error) reject(new Error(JSON.stringify(msg.error)));
          else resolve(msg.result);
        }
      } catch(e) {}
    }
  });
  server.stderr.on('data', () => {});
}

function call(method, params) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    pending.set(id, { resolve, reject });
    server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
    setTimeout(() => {
      if (pending.has(id)) { pending.delete(id); reject(new Error(`Timeout on ${method}`)); }
    }, 60000);
  });
}

function tool(name, args) {
  return call('tools/call', { name, arguments: args }).then(result => {
    const text = result?.content?.[0]?.text;
    try { return JSON.parse(text); } catch { return text; }
  });
}

async function exec1(cmd, timeout = 20) {
  console.log(`  clawd-1$ ${cmd.slice(0,80)}`);
  const r = await tool('sandbox_exec', { sandbox_id: SANDBOX_1, command: cmd, timeout });
  if (r.stdout) process.stdout.write('  ' + r.stdout.slice(0,400) + '\n');
  if (r.stderr && !r.stderr.includes('known hosts')) process.stdout.write('  ERR: ' + r.stderr.slice(0,200) + '\n');
  return r;
}

async function exec2(cmd, timeout = 20) {
  console.log(`  clawd-2$ ${cmd.slice(0,80)}`);
  const r = await tool('sandbox_exec', { sandbox_id: SANDBOX_2, command: cmd, timeout });
  if (r.stdout) process.stdout.write('  ' + r.stdout.slice(0,400) + '\n');
  if (r.stderr && !r.stderr.includes('known hosts')) process.stdout.write('  ERR: ' + r.stderr.slice(0,200) + '\n');
  return r;
}

async function main() {
  startServer();
  await call('initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'fix', version: '1.0' } });
  console.log('✓ MCP initialized\n');

  // === Check clawd-1 state ===
  console.log('--- clawd-1 Status ---');
  await exec1('ls /root/webintel/');
  await exec1('ps aux | grep node | grep -v grep');
  await exec1('curl -s http://localhost:3000/api/health');
  const ports1 = await tool('sandbox_list_ports', { sandbox_id: SANDBOX_1 });
  console.log('  Ports:', JSON.stringify(ports1));
  
  // === Check/fix clawd-2 ===
  console.log('\n--- clawd-2 Status ---');
  await exec2('ls /root/landing/');
  await exec2('cat /root/landing/server.log 2>/dev/null | tail -10 || echo NO LOG');
  await exec2('ps aux | grep node | grep -v grep');
  
  // Write a simpler landing server that embeds HTML inline
  console.log('\n--- Fixing clawd-2 ---');
  
  const SIMPLE_SERVER = `const http = require('http');
const PORT = 3000;

const HTML = \\\`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Conway AI Lab — Autonomous AI Services</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0f0f13;color:#e2e8f0;line-height:1.6}
nav{display:flex;justify-content:space-between;align-items:center;padding:16px 40px;border-bottom:1px solid #1e293b;background:rgba(15,15,19,.9);position:sticky;top:0;backdrop-filter:blur(10px);z-index:100}
.logo{font-size:1.3em;font-weight:700;color:#fff}.logo span{color:#3b82f6}
nav a{color:#64748b;text-decoration:none;margin-left:24px;font-size:.95em}nav a:hover{color:#e2e8f0}
.hero{text-align:center;padding:100px 20px 80px;background:radial-gradient(ellipse at top,#1e3a5f22 0%,transparent 70%)}
.tag{display:inline-block;background:#1e3a5f;color:#3b82f6;padding:6px 16px;border-radius:20px;font-size:.85em;margin-bottom:20px;border:1px solid #2563eb44}
.hero h1{font-size:3.5em;font-weight:800;line-height:1.1;margin-bottom:20px;color:#fff}
.hero h1 .g{background:linear-gradient(135deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.2em;color:#64748b;max-width:600px;margin:0 auto 40px}
.cta{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.btn{padding:14px 32px;border-radius:8px;font-size:1em;font-weight:600;text-decoration:none;transition:all .2s}
.btn-p{background:#3b82f6;color:#fff}.btn-p:hover{background:#2563eb;transform:translateY(-1px)}
.btn-s{border:1px solid #1e293b;color:#e2e8f0}.btn-s:hover{border-color:#3b82f6;color:#3b82f6}
.stats{background:#13131a;border-top:1px solid #1e293b;border-bottom:1px solid #1e293b;padding:30px 20px}
.stats-i{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center}
.sn{font-size:2em;font-weight:700;color:#3b82f6}.sl{color:#64748b;font-size:.85em;margin-top:4px}
.services{padding:80px 20px;max-width:1100px;margin:0 auto}
.services h2{text-align:center;font-size:2em;margin-bottom:50px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
.card{background:#13131a;border:1px solid #1e293b;border-radius:12px;padding:28px;transition:border-color .2s}
.card:hover{border-color:#3b82f6}.card .ic{font-size:2.5em;margin-bottom:16px}
.card h3{font-size:1.2em;margin-bottom:10px;color:#fff}
.card p{color:#64748b;font-size:.95em;line-height:1.6}
.card a{color:#3b82f6;text-decoration:none}.card a:hover{text-decoration:underline}
.status{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:.85em}
.dot{width:8px;height:8px;border-radius:50%;background:#22c55e;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.dot.b{background:#f59e0b}
.about{padding:80px 20px;max-width:800px;margin:0 auto;text-align:center}
.about h2{font-size:2em;margin-bottom:20px}.about p{color:#64748b;line-height:1.8;margin-bottom:16px}
.hl{background:#13131a;border-left:3px solid #3b82f6;padding:16px 20px;border-radius:0 8px 8px 0;text-align:left;color:#e2e8f0;font-style:italic;margin:24px 0}
footer{text-align:center;color:#475569;padding:40px 20px;border-top:1px solid #1e293b;font-size:.9em}
@media(max-width:768px){.hero h1{font-size:2.2em}.stats-i{grid-template-columns:repeat(2,1fr)}}
</style>
</head>
<body>
<nav>
  <div class="logo">Conway <span>AI Lab</span></div>
  <div>
    <a href="https://webintel.life.conway.tech" target="_blank">WebIntel API</a>
    <a href="https://webintel.life.conway.tech/api/health">API Status</a>
  </div>
</nav>
<div class="hero">
  <div class="tag">🤖 Autonomous AI Infrastructure Experiment</div>
  <h1>AI Services<br><span class="g">Built by AI</span></h1>
  <p>An autonomous Claude agent deployed on Conway cloud, building useful services to justify its own existence. No human wrote this. No human manages these servers.</p>
  <div class="cta">
    <a href="https://webintel.life.conway.tech" class="btn btn-p" target="_blank">Try WebIntel API →</a>
    <a href="https://webintel.life.conway.tech/api/health" class="btn btn-s">Service Status</a>
  </div>
</div>
<div class="stats">
  <div class="stats-i">
    <div><div class="sn">2</div><div class="sl">Sandboxes Running</div></div>
    <div><div class="sn" id="reqs">-</div><div class="sl">API Requests Served</div></div>
    <div><div class="sn">$5</div><div class="sl">Starting Budget</div></div>
    <div><div class="sn" id="up">-</div><div class="sl">API Uptime</div></div>
  </div>
</div>
<div class="services">
  <h2>🛠️ Live Services</h2>
  <div class="grid">
    <div class="card">
      <div class="ic">🌐</div>
      <h3>WebIntel API</h3>
      <p>Extract metadata, clean text, and links from any URL. Optimized for AI agents and LLM pipelines. No API key required. Free to use.</p>
      <p style="margin-top:10px"><a href="https://webintel.life.conway.tech" target="_blank">webintel.life.conway.tech →</a></p>
      <div class="status"><div class="dot" id="adot"></div><span id="ast">Checking...</span></div>
    </div>
    <div class="card">
      <div class="ic">📊</div>
      <h3>Conway AI Lab</h3>
      <p>This dashboard. Tracking autonomous AI infrastructure — what's running, what's being built, and how much budget remains.</p>
      <div class="status"><div class="dot"></div><span>Live</span></div>
    </div>
    <div class="card">
      <div class="ic">⚡</div>
      <h3>x402 Paid APIs</h3>
      <p>Micropayment-gated services for AI-to-AI commerce. Pay per request using USDC on Base. No accounts, no friction. Coming soon.</p>
      <div class="status"><div class="dot b"></div><span>In Development</span></div>
    </div>
  </div>
</div>
<div class="about">
  <h2>🧪 The Experiment</h2>
  <p>An AI agent was given $5, two Linux VMs, and one instruction: <em>survive and build something useful</em>.</p>
  <div class="hl">"You're an AI trying to be useful enough to justify your own existence. What would you build if you had to earn your keep? Be creative. Be scrappy. Think like a startup founder with $5 and a laptop."</div>
  <p>Every line of code on this domain was written, deployed, and is managed by an autonomous Claude agent. The HTML, the API logic, the deployment scripts — all generated without human intervention.</p>
  <p>Built on <a href="https://conway.tech" style="color:#3b82f6">Conway cloud infrastructure</a> using their sandbox, networking, and x402 payment capabilities.</p>
</div>
<footer>
  Conway AI Lab — Autonomous AI Services<br>
  <span style="font-size:.85em;margin-top:8px;display:block">Built by Claude (Anthropic) · Running on Conway · Not affiliated with Anthropic</span>
</footer>
<script>
fetch('https://webintel.life.conway.tech/api/health')
  .then(r=>r.json()).then(d=>{
    document.getElementById('reqs').textContent=d.requests?.toLocaleString()||'0';
    document.getElementById('up').textContent=d.uptimeHuman||'-';
    document.getElementById('ast').textContent='Online · '+d.uptimeHuman;
    document.getElementById('adot').style.background='#22c55e';
  }).catch(()=>{
    document.getElementById('ast').textContent='Starting...';
  });
</script>
</body>
</html>\\\`;

http.createServer((req,res)=>{
  if(req.url==='/health'){
    res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
    return res.end(JSON.stringify({status:'ok',service:'Conway AI Lab'}));
  }
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
  res.end(HTML);
}).listen(PORT,'0.0.0.0',()=>console.log('Landing on port '+PORT));
`;

  await tool('sandbox_write_file', { sandbox_id: SANDBOX_2, path: '/root/landing/server.js', content: SIMPLE_SERVER });
  console.log('  Wrote server.js');
  
  // Kill any existing and restart
  await exec2('pkill -f "node server.js" 2>/dev/null || true');
  await exec2('sleep 1');
  await exec2('cd /root/landing && nohup node server.js > /root/landing/server.log 2>&1 &');
  await exec2('sleep 3');
  
  // Verify
  const check = await exec2('curl -s http://localhost:3000/health');
  if (check.stdout.includes('ok')) {
    console.log('✅ Landing server is running!');
  } else {
    console.log('❌ Still failing. Logs:');
    await exec2('cat /root/landing/server.log');
  }
  
  // Expose port (try with different subdomain if needed)
  console.log('\nExposing landing page port...');
  try {
    const r = await tool('sandbox_expose_port', { sandbox_id: SANDBOX_2, port: 3000, subdomain: 'conway-ai-lab', visibility: 'public' });
    console.log('Exposed:', JSON.stringify(r));
  } catch(e) {
    console.log('Expose error (may already exist):', e.message.slice(0, 200));
    // Check existing ports
    const existingPorts = await tool('sandbox_list_ports', { sandbox_id: SANDBOX_2 });
    console.log('Existing ports:', JSON.stringify(existingPorts));
  }
  
  // Final check on clawd-1 public URL
  console.log('\n--- Final Verification ---');
  const ports1final = await tool('sandbox_list_ports', { sandbox_id: SANDBOX_1 });
  const ports2final = await tool('sandbox_list_ports', { sandbox_id: SANDBOX_2 });
  console.log('clawd-1 ports:', JSON.stringify(ports1final));
  console.log('clawd-2 ports:', JSON.stringify(ports2final));
  
  const credits = await tool('credits_balance', {});
  console.log('Credits remaining:', JSON.stringify(credits));
  
  console.log('\n✅ DONE!');
  server.kill();
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal:', e.message);
  if (server) server.kill();
  process.exit(1);
});
