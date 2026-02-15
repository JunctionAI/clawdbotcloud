const { execSync } = require('child_process');

// Check for undelivered notifications
console.log('=== UNDELIVERED NOTIFICATIONS ===');
const notifications = execSync('npx convex run notifications:undelivered {}', { encoding: 'utf-8', cwd: __dirname });
console.log(notifications);

// Check all tasks - filter for non-done
console.log('\n=== ACTIVE TASKS (not done) ===');
const allTasks = JSON.parse(execSync('npx convex run tasks:list {}', { encoding: 'utf-8', cwd: __dirname }));
const activeTasks = allTasks.filter(t => t.status !== 'done');
console.log(JSON.stringify(activeTasks, null, 2));

// Update heartbeat for Jarvis
console.log('\n=== UPDATING HEARTBEAT ===');
const heartbeat = execSync('npx convex run agents:heartbeat \'{"sessionKey":"agent:main:main"}\'', { encoding: 'utf-8', cwd: __dirname });
console.log(heartbeat);
