const { spawn } = require('child_process');

const SANDBOX_1 = 'b95c74cc5097d42cfa1804657e735d57';
const SANDBOX_2 = 'e3fa6f067a5650f303e1ab688273625c';

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
          results[msg.id] = msg;
          pending--;
          if (pending <= 0) {
            console.log(JSON.stringify(results, null, 2));
            server.kill();
            process.exit(0);
          }
        }
      } catch(e) {}
    }
  }
});

server.stderr.on('data', () => {}); // suppress

function send(id, method, params) {
  pending++;
  server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
}

// Initialize first
server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 0, method: 'initialize', params: {
  protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'assess', version: '1.0' }
}}) + '\n');

setTimeout(() => {
  send(1, 'tools/call', { name: 'credits_balance', arguments: {} });
  send(2, 'tools/call', { name: 'sandbox_list', arguments: {} });
  send(3, 'tools/call', { name: 'sandbox_exec', arguments: { sandbox_id: SANDBOX_1, command: 'ps aux | head -20 && echo "---DISK---" && df -h && echo "---MEM---" && free -m && echo "---PORTS---" && ss -tlnp' } });
  send(4, 'tools/call', { name: 'sandbox_exec', arguments: { sandbox_id: SANDBOX_2, command: 'ps aux | head -20 && echo "---DISK---" && df -h && echo "---MEM---" && free -m && echo "---PORTS---" && ss -tlnp' } });
  send(5, 'tools/call', { name: 'sandbox_list_ports', arguments: { sandbox_id: SANDBOX_1 } });
  send(6, 'tools/call', { name: 'sandbox_list_ports', arguments: { sandbox_id: SANDBOX_2 } });
  send(7, 'tools/call', { name: 'wallet_info', arguments: {} });
}, 600);

setTimeout(() => {
  console.log('TIMEOUT - partial results:', JSON.stringify(results, null, 2));
  server.kill();
  process.exit(1);
}, 20000);
