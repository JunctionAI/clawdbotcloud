const { spawn } = require('child_process');

const server = spawn('node', ['C:\\Users\\Nightgalem\\AppData\\Roaming\\npm\\node_modules\\conway-terminal\\dist\\index.js'], {
  env: { ...process.env, CONWAY_API_KEY: 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi' },
  stdio: ['pipe', 'pipe', 'pipe']
});

let buffer = '';
const results = {};

server.stdout.on('data', (data) => {
  buffer += data.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop();
  for (const line of lines) {
    if (line.trim()) {
      try {
        const msg = JSON.parse(line);
        if (msg.id && (msg.result || msg.error)) {
          results[msg.id] = msg;
        }
      } catch(e) {}
    }
  }
});

function send(msg) {
  server.stdin.write(JSON.stringify(msg) + '\n');
}

send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {
  protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'test', version: '1.0' }
}});

setTimeout(() => {
  send({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'credits_balance', arguments: {} }});
}, 500);

setTimeout(() => {
  send({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'credits_pricing', arguments: {} }});
}, 1000);

setTimeout(() => {
  send({ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'wallet_info', arguments: {} }});
}, 1500);

setTimeout(() => {
  console.log('\n=== CREDITS BALANCE ===');
  if (results[2]) console.log(results[2].result?.content?.[0]?.text || JSON.stringify(results[2]));
  console.log('\n=== PRICING ===');
  if (results[3]) console.log(results[3].result?.content?.[0]?.text || JSON.stringify(results[3]));
  console.log('\n=== WALLET INFO ===');
  if (results[4]) console.log(results[4].result?.content?.[0]?.text || JSON.stringify(results[4]));
  server.kill();
  process.exit(0);
}, 5000);
