/**
 * Sequential Conway deployment - proper async/await pattern
 */
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
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`Timeout on ${method}`));
      }
    }, 120000);
  });
}

function tool(name, args) {
  return call('tools/call', { name, arguments: args }).then(result => {
    const text = result?.content?.[0]?.text;
    try { return JSON.parse(text); } catch { return text; }
  });
}

async function exec(sandbox_id, command, timeout = 30) {
  console.log(`  $ ${command.slice(0, 80)}...`);
  const result = await tool('sandbox_exec', { sandbox_id, command, timeout });
  if (result.stdout) process.stdout.write('  OUT: ' + result.stdout.slice(0, 300) + '\n');
  if (result.stderr && !result.stderr.includes('known hosts')) {
    process.stdout.write('  ERR: ' + result.stderr.slice(0, 200) + '\n');
  }
  return result;
}

async function writeFile(sandbox_id, path, content) {
  console.log(`  Writing ${path}...`);
  return tool('sandbox_write_file', { sandbox_id, path, content });
}

async function main() {
  startServer();
  
  // Initialize
  await call('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'sequential', version: '1.0' }
  });
  console.log('✓ MCP initialized\n');
  
  // ==========================================
  // PHASE 1: Deploy WebIntel API to clawd-1
  // ==========================================
  console.log('=== PHASE 1: WebIntel API (clawd-1) ===\n');
  
  // Check if npm install already happened
  const checkNpm = await exec(SANDBOX_1, 'ls /root/webintel/node_modules/cheerio 2>/dev/null && echo INSTALLED || echo NEEDS_INSTALL', 10);
  
  if (checkNpm.stdout.includes('NEEDS_INSTALL')) {
    console.log('Installing npm dependencies...');
    await exec(SANDBOX_1, 'cd /root/webintel && npm install 2>&1 | tail -3', 90);
  } else {
    console.log('npm deps already installed ✓');
  }
  
  // Kill any existing server
  await exec(SANDBOX_1, 'pkill -f "node server.js" 2>/dev/null || true', 5);
  await exec(SANDBOX_1, 'sleep 1', 3);
  
  // Start server
  console.log('\nStarting WebIntel API server...');
  await exec(SANDBOX_1, 'cd /root/webintel && nohup node server.js > /root/webintel/server.log 2>&1 &', 10);
  await exec(SANDBOX_1, 'sleep 3', 5);
  
  // Verify
  const healthCheck = await exec(SANDBOX_1, 'curl -s http://localhost:3000/api/health', 15);
  if (healthCheck.stdout.includes('"ok"')) {
    console.log('✅ WebIntel API is running!');
  } else {
    console.log('⚠️ Health check failed. Checking logs...');
    await exec(SANDBOX_1, 'cat /root/webintel/server.log | tail -20', 5);
  }
  
  // Expose port
  console.log('\nExposing port 3000 with subdomain "webintel"...');
  let apiUrl;
  try {
    const exposeResult = await tool('sandbox_expose_port', { 
      sandbox_id: SANDBOX_1, 
      port: 3000, 
      subdomain: 'webintel', 
      visibility: 'public' 
    });
    console.log('Expose result:', JSON.stringify(exposeResult, null, 2));
    apiUrl = exposeResult?.url || exposeResult?.public_url || 'https://webintel.life.conway.tech';
  } catch(e) {
    console.log('Port expose error (may already be exposed):', e.message);
    apiUrl = 'https://webintel.life.conway.tech';
  }
  console.log('✅ API URL:', apiUrl);
  
  // ==========================================
  // PHASE 2: Deploy Landing Page to clawd-2
  // ==========================================
  console.log('\n=== PHASE 2: Landing Page (clawd-2) ===\n');
  
  // Kill any existing server
  await exec(SANDBOX_2, 'pkill -f "node server.js" 2>/dev/null || true', 5);
  await exec(SANDBOX_2, 'sleep 1', 3);
  
  // Start landing server  
  console.log('Starting landing page server...');
  await exec(SANDBOX_2, 'cd /root/landing && nohup node server.js > /root/landing/server.log 2>&1 &', 10);
  await exec(SANDBOX_2, 'sleep 3', 5);
  
  // Verify
  const landingCheck = await exec(SANDBOX_2, 'curl -s http://localhost:3000/health', 10);
  if (landingCheck.stdout.includes('ok')) {
    console.log('✅ Landing page is running!');
  } else {
    console.log('⚠️ Landing health check failed:', landingCheck.stdout);
    await exec(SANDBOX_2, 'cat /root/landing/server.log | tail -20', 5);
  }
  
  // Expose port
  console.log('\nExposing landing page port...');
  let landingUrl;
  try {
    const landingExpose = await tool('sandbox_expose_port', {
      sandbox_id: SANDBOX_2,
      port: 3000,
      subdomain: 'conway-ai-lab',
      visibility: 'public'
    });
    console.log('Landing expose result:', JSON.stringify(landingExpose, null, 2));
    landingUrl = landingExpose?.url || landingExpose?.public_url || 'https://conway-ai-lab.life.conway.tech';
  } catch(e) {
    console.log('Landing port expose error (may already be exposed):', e.message);
    landingUrl = 'https://conway-ai-lab.life.conway.tech';
  }
  console.log('✅ Landing URL:', landingUrl);
  
  // ==========================================
  // PHASE 3: Final verification
  // ==========================================
  console.log('\n=== PHASE 3: Final Status ===\n');
  
  const credits = await tool('credits_balance', {});
  console.log('Credits:', JSON.stringify(credits));
  
  const ports1 = await tool('sandbox_list_ports', { sandbox_id: SANDBOX_1 });
  const ports2 = await tool('sandbox_list_ports', { sandbox_id: SANDBOX_2 });
  console.log('clawd-1 ports:', JSON.stringify(ports1));
  console.log('clawd-2 ports:', JSON.stringify(ports2));
  
  console.log('\n🎉 DEPLOYMENT COMPLETE!');
  console.log('WebIntel API:', apiUrl);
  console.log('Landing page:', landingUrl);
  
  server.kill();
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal error:', e);
  if (server) server.kill();
  process.exit(1);
});
