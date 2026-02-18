const { execSync } = require('child_process');

const args = JSON.stringify({ sessionKey: 'agent:product-analyst:main' });

try {
  const result = execSync(`npx convex run agents:heartbeat "${args.replace(/"/g, '\\"')}"`, {
    encoding: 'utf-8',
    cwd: __dirname
  });
  console.log('Heartbeat updated:', result);
} catch (e) {
  // Try with a temp file approach
  const fs = require('fs');
  const tempFile = require('path').join(__dirname, '_shuri_hb_temp.json');
  fs.writeFileSync(tempFile, args);
  try {
    const result2 = execSync(`npx convex run agents:heartbeat "$(cat _shuri_hb_temp.json)"`, {
      encoding: 'utf-8',
      cwd: __dirname,
      shell: 'bash'
    });
    console.log('Heartbeat updated (bash):', result2);
  } catch (e2) {
    console.log('Heartbeat update failed (known Windows quoting issue):', e.message.slice(0, 200));
  } finally {
    try { fs.unlinkSync(tempFile); } catch(_) {}
  }
}
