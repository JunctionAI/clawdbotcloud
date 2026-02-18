const { spawn } = require('child_process');

const conway = spawn('cmd', ['/c', 'conway-terminal'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env, CONWAY_API_KEY: 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi' }
});

let buffer = '';
let msgId = 1;

function send(obj) { conway.stdin.write(JSON.stringify(obj) + '\n'); }

function callTool(name, args) {
  return new Promise((resolve) => {
    const id = msgId++;
    const handler = (data) => {
      buffer += data.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line);
          if (parsed.id === id) { conway.stdout.off('data', handler); resolve(parsed); }
        } catch(e) {}
      }
    };
    conway.stdout.on('data', handler);
    send({ jsonrpc: '2.0', id, method: 'tools/call', params: { name, arguments: args } });
  });
}

async function main() {
  await new Promise((resolve) => {
    let buf = '';
    const h = (data) => { buf += data.toString(); if (buf.includes('"serverInfo"')) { conway.stdout.off('data', h); resolve(); } };
    conway.stdout.on('data', h);
    send({ jsonrpc: '2.0', id: msgId++, method: 'initialize', params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'clawd', version: '1.0' } }});
  });

  const credits = await callTool('credits_balance', {});
  console.log('CREDITS:', JSON.stringify(credits?.result, null, 2));

  const sandboxes = await callTool('sandbox_list', {});
  console.log('SANDBOXES:', JSON.stringify(sandboxes?.result, null, 2));

  conway.kill(); process.exit(0);
}
main().catch(e => { console.error(e); conway.kill(); process.exit(1); });
