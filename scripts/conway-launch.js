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

  console.log('Creating sandbox...');
  const sandbox = await callTool('sandbox_create', {
    name: 'agent-empire-v1',
    vcpu: 1,
    memory_mb: 512,
    disk_gb: 5,
    region: 'us-east'
  });
  console.log('SANDBOX:', JSON.stringify(sandbox?.result, null, 2));

  const result = JSON.parse(sandbox?.result?.content?.[0]?.text || '{}');
  const sandboxId = result?.id || result?.sandbox_id;
  
  if (sandboxId) {
    console.log('\nSandbox ID:', sandboxId);
    
    // Test it works
    const test = await callTool('sandbox_exec', {
      sandbox_id: sandboxId,
      command: 'echo "Conway agent online" && uname -a && pwd && date'
    });
    console.log('TEST:', JSON.stringify(test?.result, null, 2));
    
    // Install basics
    const install = await callTool('sandbox_exec', {
      sandbox_id: sandboxId,
      command: 'apt-get update -qq && apt-get install -y -qq python3 python3-pip curl wget git 2>&1 | tail -3 && pip3 install requests beautifulsoup4 -q 2>&1 | tail -2 && echo "READY"'
    });
    console.log('INSTALL:', JSON.stringify(install?.result, null, 2));
  }

  conway.kill(); process.exit(0);
}
main().catch(e => { console.error(e); conway.kill(); process.exit(1); });
