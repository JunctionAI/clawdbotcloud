const { spawn } = require('child_process');

const conway = spawn('cmd', ['/c', 'conway-terminal'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env, CONWAY_API_KEY: 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi' }
});

let buffer = '';
let msgId = 1;

function send(obj) {
  const msg = JSON.stringify(obj) + '\n';
  conway.stdin.write(msg);
}

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
          if (parsed.id === id) {
            conway.stdout.off('data', handler);
            resolve(parsed);
          }
        } catch(e) {}
      }
    };
    conway.stdout.on('data', handler);
    send({ jsonrpc: '2.0', id, method: 'tools/call', params: { name, arguments: args } });
  });
}

async function main() {
  // Initialize
  await new Promise((resolve) => {
    let initBuf = '';
    const handler = (data) => {
      initBuf += data.toString();
      if (initBuf.includes('"serverInfo"')) {
        conway.stdout.off('data', handler);
        resolve();
      }
    };
    conway.stdout.on('data', handler);
    send({ jsonrpc: '2.0', id: msgId++, method: 'initialize', params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'clawd', version: '1.0.0' }
    }});
  });

  console.log('Conway connected. Checking wallet balance...');

  // Check wallet info on Arbitrum
  const walletInfo = await callTool('wallet_info', { network: 'eip155:42161' });
  console.log('Wallet info (Arbitrum):', JSON.stringify(walletInfo?.result, null, 2));

  // Check wallet info on Base (default)
  const walletBase = await callTool('wallet_info', { network: 'eip155:8453' });
  console.log('Wallet info (Base):', JSON.stringify(walletBase?.result, null, 2));

  // Try credits topup on Arbitrum
  console.log('\nAttempting credits topup on Arbitrum...');
  const topup = await callTool('credits_topup', { network: 'eip155:42161', amount_usdc: 10 });
  console.log('Topup result:', JSON.stringify(topup?.result, null, 2));

  conway.kill();
  process.exit(0);
}

main().catch(e => { console.error(e); conway.kill(); process.exit(1); });
