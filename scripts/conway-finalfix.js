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
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); reject(new Error('Timeout')); } }, 60000);
  });
}

function tool(name, args) {
  return call('tools/call', { name, arguments: args }).then(result => {
    const text = result?.content?.[0]?.text;
    try { return JSON.parse(text); } catch { return text; }
  });
}

async function execS(sb, cmd, timeout = 20) {
  const label = sb === SANDBOX_1 ? 'clawd-1' : 'clawd-2';
  console.log(`  ${label}$ ${cmd.slice(0, 80)}`);
  const r = await tool('sandbox_exec', { sandbox_id: sb, command: cmd, timeout });
  if (r.stdout) process.stdout.write('  ' + r.stdout.slice(0, 400) + '\n');
  if (r.stderr && !r.stderr.includes('known hosts')) process.stdout.write('  ERR:' + r.stderr.slice(0, 200) + '\n');
  return r;
}

async function main() {
  startServer();
  await call('initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'finalfix', version: '1.0' } });
  console.log('✓ MCP initialized\n');

  // === FIX 1: Landing page server.js (no inline HTML - reads from disk) ===
  console.log('=== FIX 1: Landing Page Server ===');
  
  // Write clean server.js that reads HTML from disk
  const cleanServer = 'const http = require(\'http\');\n' +
    'const fs = require(\'fs\');\n' +
    'const PORT = 3000;\n' +
    'let HTML;\n' +
    'try { HTML = fs.readFileSync(\'/root/landing/index.html\', \'utf8\'); }\n' +
    'catch(e) { HTML = \'<h1>Loading...</h1>\'; }\n' +
    'http.createServer((req, res) => {\n' +
    '  if (req.url === \'/health\') {\n' +
    '    res.writeHead(200, {\'Content-Type\': \'application/json\', \'Access-Control-Allow-Origin\': \'*\'});\n' +
    '    return res.end(JSON.stringify({status: \'ok\', service: \'Conway AI Lab\', uptime: process.uptime()}));\n' +
    '  }\n' +
    '  res.writeHead(200, {\'Content-Type\': \'text/html; charset=utf-8\'});\n' +
    '  res.end(HTML);\n' +
    '}).listen(PORT, \'0.0.0.0\', () => console.log(\'Landing on port \' + PORT));\n';
  
  await tool('sandbox_write_file', { sandbox_id: SANDBOX_2, path: '/root/landing/server.js', content: cleanServer });
  console.log('  Wrote clean server.js');
  
  // Kill old, restart
  await execS(SANDBOX_2, 'pkill -f "node server.js" 2>/dev/null || true', 5);
  await execS(SANDBOX_2, 'sleep 1', 3);
  await execS(SANDBOX_2, 'cd /root/landing && nohup node server.js > /root/landing/server.log 2>&1 &', 10);
  await execS(SANDBOX_2, 'sleep 3', 5);
  
  const check2 = await execS(SANDBOX_2, 'curl -s http://localhost:3000/health', 10);
  if (check2.stdout.includes('ok')) {
    console.log('✅ Landing server FIXED and running!');
  } else {
    console.log('❌ Still failing. Log:');
    await execS(SANDBOX_2, 'cat /root/landing/server.log | tail -15', 5);
  }
  
  // === FIX 2: Expose clawd-1 port with different subdomain ===
  console.log('\n=== FIX 2: Expose clawd-1 Port ===');
  
  // Verify API is still running
  const apiCheck = await execS(SANDBOX_1, 'curl -s http://localhost:3000/api/health', 10);
  if (!apiCheck.stdout.includes('ok')) {
    console.log('API not running, restarting...');
    await execS(SANDBOX_1, 'pkill -f "node server.js" 2>/dev/null || true', 5);
    await execS(SANDBOX_1, 'sleep 1', 3);
    await execS(SANDBOX_1, 'cd /root/webintel && nohup node server.js > /root/webintel/server.log 2>&1 &', 10);
    await execS(SANDBOX_1, 'sleep 3', 5);
    await execS(SANDBOX_1, 'curl -s http://localhost:3000/api/health', 10);
  } else {
    console.log('  API still running ✓');
  }
  
  // Try exposing with "webintel-api" subdomain
  try {
    const r1 = await tool('sandbox_expose_port', { sandbox_id: SANDBOX_1, port: 3000, subdomain: 'webintel-api', visibility: 'public' });
    console.log('✅ Exposed clawd-1:', JSON.stringify(r1));
  } catch(e) {
    console.log('webintel-api subdomain failed:', e.message.slice(0, 100));
    // Try without subdomain
    try {
      const r2 = await tool('sandbox_expose_port', { sandbox_id: SANDBOX_1, port: 3000, visibility: 'public' });
      console.log('✅ Exposed clawd-1 (no subdomain):', JSON.stringify(r2));
    } catch(e2) {
      console.log('No-subdomain also failed:', e2.message.slice(0, 100));
    }
  }
  
  // === FINAL STATUS ===
  console.log('\n=== FINAL STATUS ===');
  const p1 = await tool('sandbox_list_ports', { sandbox_id: SANDBOX_1 });
  const p2 = await tool('sandbox_list_ports', { sandbox_id: SANDBOX_2 });
  const credits = await tool('credits_balance', {});
  
  console.log('clawd-1 ports:', JSON.stringify(p1, null, 2));
  console.log('clawd-2 ports:', JSON.stringify(p2, null, 2));
  console.log('Credits:', JSON.stringify(credits));
  
  // Test public URL if available
  if (p1.ports && p1.ports.length > 0) {
    const publicUrl = p1.ports[0].custom_url || p1.ports[0].public_url;
    console.log('\nTesting public API URL:', publicUrl);
    await execS(SANDBOX_1, `curl -s "${publicUrl}/api/health" | head -c 200`, 15);
  }
  
  console.log('\n✅ FINAL FIX COMPLETE');
  server.kill();
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal:', e.message);
  if (server) server.kill();
  process.exit(1);
});
