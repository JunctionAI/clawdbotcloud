const { spawn } = require('child_process');

const SANDBOX_1 = 'b95c74cc5097d42cfa1804657e735d57';

const server = spawn('node', ['C:\\Users\\Nightgalem\\AppData\\Roaming\\npm\\node_modules\\conway-terminal\\dist\\index.js'], {
  env: { ...process.env, CONWAY_API_KEY: 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi' },
  stdio: ['pipe', 'pipe', 'pipe']
});

let buffer = '';
const results = {};
let pending = 0;

server.stdout.on('data', (data) => {
  buffer += data.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop();
  for (const line of lines) {
    if (line.trim()) {
      try {
        const msg = JSON.parse(line);
        if (msg.id && (msg.result !== undefined || msg.error)) {
          results[msg.id] = msg.result?.content?.[0]?.text || msg.error;
          pending--;
          if (pending <= 0) {
            for (const [k, v] of Object.entries(results)) {
              console.log(`\n=== Response ${k} ===`);
              console.log(v);
            }
            server.kill();
            process.exit(0);
          }
        }
      } catch(e) {}
    }
  }
});

server.stderr.on('data', () => {});

function send(id, method, params) {
  pending++;
  server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
}

server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 0, method: 'initialize', params: {
  protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'check', version: '1.0' }
}}) + '\n');

setTimeout(() => {
  send(1, 'tools/call', { name: 'sandbox_exec', arguments: { 
    sandbox_id: SANDBOX_1, 
    command: 'node --version && npm --version && python3 --version && curl --version | head -1 && which wget && uname -a',
    timeout: 15
  }});
  send(2, 'tools/call', { name: 'sandbox_exec', arguments: { 
    sandbox_id: SANDBOX_1, 
    command: 'apt list --installed 2>/dev/null | grep -E "nodejs|npm|python|curl|wget|git" | head -20',
    timeout: 15
  }});
}, 600);

setTimeout(() => {
  for (const [k, v] of Object.entries(results)) {
    console.log(`\n=== Response ${k} ===`);
    console.log(v);
  }
  server.kill();
  process.exit(1);
}, 25000);
