const { spawn } = require('child_process');
const API_KEY = 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi';
const SANDBOX_2 = 'e3fa6f067a5650f303e1ab688273625c';

let msgId = 1, server, buffer = '', pending = new Map();

function start() {
  server = spawn('node', ['C:\\Users\\Nightgalem\\AppData\\Roaming\\npm\\node_modules\\conway-terminal\\dist\\index.js'], {
    env: { ...process.env, CONWAY_API_KEY: API_KEY }, stdio: ['pipe','pipe','pipe']
  });
  server.stdout.on('data', d => {
    buffer += d.toString();
    buffer.split('\n').slice(0,-1).forEach(line => {
      if (!line.trim()) return;
      try {
        const msg = JSON.parse(line);
        if (msg.id !== undefined && pending.has(msg.id)) {
          const {resolve,reject} = pending.get(msg.id);
          pending.delete(msg.id);
          msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
        }
      } catch(e) {}
    });
    buffer = buffer.split('\n').slice(-1)[0];
  });
  server.stderr.on('data', () => {});
}

function call(method, params) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    pending.set(id, {resolve, reject});
    server.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params}) + '\n');
    setTimeout(() => { if(pending.has(id)) { pending.delete(id); reject(new Error('Timeout')); } }, 30000);
  });
}
const tool = (name, args) => call('tools/call', {name, arguments: args}).then(r => {
  const t = r?.content?.[0]?.text; try { return JSON.parse(t); } catch { return t; }
});
const exec2 = async (cmd, timeout=15) => {
  console.log(`  $ ${cmd.slice(0,80)}`);
  const r = await tool('sandbox_exec', {sandbox_id: SANDBOX_2, command: cmd, timeout});
  if (r.stdout) process.stdout.write('  ' + r.stdout.slice(0,400) + '\n');
  return r;
};

async function main() {
  start();
  await call('initialize', {protocolVersion:'2024-11-05',capabilities:{},clientInfo:{name:'status',version:'1.0'}});
  
  console.log('=== CLAWD-2 STATUS ===\n');
  await exec2('ls /root/');
  await exec2('ps aux | grep node | grep -v grep');
  await exec2('ss -tlnp');
  await exec2('free -m');
  await exec2('df -h | head -4');
  
  const ports = await tool('sandbox_list_ports', {sandbox_id: SANDBOX_2});
  console.log('\nExposed ports:', JSON.stringify(ports, null, 2));
  
  const credits = await tool('credits_balance', {});
  console.log('Credits:', JSON.stringify(credits));
  
  const wallet = await tool('wallet_info', {});
  console.log('Wallet:', JSON.stringify(wallet));
  
  server.kill(); process.exit(0);
}
main().catch(e => { console.error(e.message); server?.kill(); process.exit(1); });
