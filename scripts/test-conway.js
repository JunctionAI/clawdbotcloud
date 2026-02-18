const { spawn } = require('child_process');

const server = spawn('node', ['C:\\Users\\Nightgalem\\AppData\\Roaming\\npm\\node_modules\\conway-terminal\\dist\\index.js'], {
  env: { ...process.env, CONWAY_API_KEY: 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi' },
  stdio: ['pipe', 'pipe', 'pipe']
});

let buffer = '';

server.stdout.on('data', (data) => {
  buffer += data.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop();
  for (const line of lines) {
    if (line.trim()) {
      try {
        const msg = JSON.parse(line);
        if (msg.result || msg.error) {
          console.log(JSON.stringify(msg, null, 2));
        }
      } catch(e) {
        // not JSON (e.g. "Starting Conway Terminal...")
      }
    }
  }
});

server.stderr.on('data', (d) => process.stderr.write(d));

function send(msg) {
  server.stdin.write(JSON.stringify(msg) + '\n');
}

// Step 1: initialize
send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {
  protocolVersion: '2024-11-05',
  capabilities: {},
  clientInfo: { name: 'test', version: '1.0' }
}});

// Step 2: list tools
setTimeout(() => {
  send({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} });
}, 500);

// Step 3: get balance
setTimeout(() => {
  send({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: {
    name: 'get_balance',
    arguments: {}
  }});
}, 1000);

setTimeout(() => {
  server.kill();
  process.exit(0);
}, 5000);
