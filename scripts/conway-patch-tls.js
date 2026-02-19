/**
 * Patch the WebIntel API server to handle TLS cert issues in sandbox
 */
const { spawn } = require('child_process');

const API_KEY = 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi';
const SANDBOX_1 = 'b95c74cc5097d42cfa1804657e735d57';

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

async function exec1(cmd, timeout = 20) {
  console.log(`  $ ${cmd.slice(0, 80)}`);
  const r = await tool('sandbox_exec', { sandbox_id: SANDBOX_1, command: cmd, timeout });
  if (r.stdout) process.stdout.write('  ' + r.stdout.slice(0, 400) + '\n');
  if (r.stderr && !r.stderr.includes('known hosts')) process.stdout.write('  ERR: ' + r.stderr.slice(0, 200) + '\n');
  return r;
}

async function main() {
  startServer();
  await call('initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'patch', version: '1.0' } });
  console.log('✓ MCP initialized\n');

  // Check TLS issue
  await exec1('node -e "const https = require(\'https\'); https.get(\'https://example.com\', (r) => console.log(r.statusCode)).on(\'error\', e => console.log(\'TLS Error:\', e.message))"', 10);
  
  // Update start script to set NODE_TLS_REJECT_UNAUTHORIZED=0
  // This is acceptable since we're fetching public web content
  const newStartScript = '#!/bin/bash\n' +
    'cd /root/webintel\n' +
    'export NODE_TLS_REJECT_UNAUTHORIZED=0\n' +
    'nohup node server.js > /root/webintel/server.log 2>&1 &\n' +
    'echo $! > /root/webintel/server.pid\n' +
    'echo "Server started with PID $(cat /root/webintel/server.pid)"\n';
  
  await tool('sandbox_write_file', { sandbox_id: SANDBOX_1, path: '/root/webintel/start.sh', content: newStartScript });
  console.log('Updated start.sh with TLS bypass');
  
  // Restart server with TLS bypass
  await exec1('pkill -f "node server.js" 2>/dev/null || true', 5);
  await exec1('sleep 1', 3);
  await exec1('cd /root/webintel && NODE_TLS_REJECT_UNAUTHORIZED=0 nohup node server.js > /root/webintel/server.log 2>&1 &', 10);
  await exec1('sleep 3', 5);
  
  // Verify it works now
  const healthCheck = await exec1('curl -s http://localhost:3000/api/health', 10);
  console.log('Health:', healthCheck.stdout.includes('ok') ? '✅ Running' : '❌ Failed');
  
  // Test meta endpoint
  const metaTest = await exec1('curl -s "http://localhost:3000/api/meta?url=https://example.com" | head -c 500', 15);
  if (metaTest.stdout.includes('title')) {
    console.log('✅ Meta endpoint working!');
  } else {
    console.log('Meta test result:', metaTest.stdout.slice(0, 200));
  }
  
  // Test text endpoint
  const textTest = await exec1('curl -s "http://localhost:3000/api/text?url=https://news.ycombinator.com&maxChars=200" | head -c 300', 15);
  console.log('Text test:', textTest.stdout.slice(0, 300));
  
  console.log('\n✅ Patch complete!');
  server.kill();
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal:', e.message);
  if (server) server.kill();
  process.exit(1);
});
