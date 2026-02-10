/**
 * Autonomous Queue Worker
 * Checks task queue and processes pending tasks
 * Run via: node autonomous/scripts/queue-worker.js
 */

const fs = require('fs');
const path = require('path');

const QUEUE_PATH = path.join(__dirname, '..', 'task-queue.json');
const LOG_PATH = path.join(__dirname, '..', 'worker-log.json');

function loadQueue() {
  return JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));
}

function saveQueue(queue) {
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));
}

function loadLog() {
  return JSON.parse(fs.readFileSync(LOG_PATH, 'utf8'));
}

function saveLog(log) {
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2));
}

function getQueueStatus() {
  const queue = loadQueue();
  const status = {
    timestamp: new Date().toISOString(),
    queues: {}
  };
  
  for (const [name, q] of Object.entries(queue.queues)) {
    status.queues[name] = {
      pending: q.pending.length,
      inProgress: q.inProgress.length,
      completed: q.completed.length,
      failed: q.failed.length
    };
  }
  
  return status;
}

function addTask(queueName, task) {
  const queue = loadQueue();
  
  if (!queue.queues[queueName]) {
    throw new Error(`Queue ${queueName} does not exist`);
  }
  
  const newTask = {
    id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...task
  };
  
  queue.queues[queueName].pending.push(newTask);
  saveQueue(queue);
  
  console.log(`Added task ${newTask.id} to ${queueName} queue`);
  return newTask.id;
}

function getNextTask(queueName) {
  const queue = loadQueue();
  
  if (!queue.queues[queueName]) {
    return null;
  }
  
  const task = queue.queues[queueName].pending.shift();
  
  if (task) {
    task.status = 'in_progress';
    task.startedAt = new Date().toISOString();
    queue.queues[queueName].inProgress.push(task);
    saveQueue(queue);
  }
  
  return task;
}

function completeTask(queueName, taskId, result) {
  const queue = loadQueue();
  const q = queue.queues[queueName];
  
  const taskIndex = q.inProgress.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    throw new Error(`Task ${taskId} not found in progress`);
  }
  
  const task = q.inProgress.splice(taskIndex, 1)[0];
  task.status = 'completed';
  task.completedAt = new Date().toISOString();
  task.result = result;
  
  q.completed.push(task);
  queue.stats.totalTasksCompleted++;
  queue.stats.lastTaskCompleted = new Date().toISOString();
  
  saveQueue(queue);
  
  // Log it
  const log = loadLog();
  log.sessions.push({
    taskId,
    queueName,
    completedAt: task.completedAt,
    result
  });
  saveLog(log);
  
  console.log(`Completed task ${taskId}`);
}

function failTask(queueName, taskId, error) {
  const queue = loadQueue();
  const q = queue.queues[queueName];
  
  const taskIndex = q.inProgress.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    throw new Error(`Task ${taskId} not found in progress`);
  }
  
  const task = q.inProgress.splice(taskIndex, 1)[0];
  task.status = 'failed';
  task.failedAt = new Date().toISOString();
  task.error = error;
  
  q.failed.push(task);
  queue.stats.totalTasksFailed++;
  
  saveQueue(queue);
  console.log(`Failed task ${taskId}: ${error}`);
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'status':
    console.log(JSON.stringify(getQueueStatus(), null, 2));
    break;
    
  case 'add':
    const queueName = args[1];
    const taskJson = args.slice(2).join(' ');
    const task = JSON.parse(taskJson);
    addTask(queueName, task);
    break;
    
  case 'next':
    const nextQueue = args[1];
    const nextTask = getNextTask(nextQueue);
    console.log(JSON.stringify(nextTask, null, 2));
    break;
    
  case 'complete':
    const completeQueue = args[1];
    const completeId = args[2];
    const resultJson = args.slice(3).join(' ') || '{}';
    completeTask(completeQueue, completeId, JSON.parse(resultJson));
    break;
    
  case 'fail':
    const failQueue = args[1];
    const failId = args[2];
    const errorMsg = args.slice(3).join(' ');
    failTask(failQueue, failId, errorMsg);
    break;
    
  default:
    console.log(`
Autonomous Queue Worker

Commands:
  status                          - Show queue status
  add <queue> <task-json>         - Add task to queue
  next <queue>                    - Get next pending task
  complete <queue> <id> [result]  - Mark task complete
  fail <queue> <id> <error>       - Mark task failed
    `);
}
