/**
 * Autonomous Task Executor
 * Processes task-queue.json and executes pending tasks
 */

const fs = require('fs');
const path = require('path');
const { BrowserEngine } = require('./browser-engine.js');

const QUEUE_PATH = path.join(__dirname, 'task-queue.json');
const OUTPUT_DIR = path.join(__dirname, 'output');

// Ensure output directories exist
['higgsfield', 'content', 'social', 'research'].forEach(dir => {
  const fullPath = path.join(OUTPUT_DIR, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

function loadQueue() {
  const data = fs.readFileSync(QUEUE_PATH, 'utf8');
  return JSON.parse(data);
}

function saveQueue(queue) {
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2));
}

function moveTask(queue, queueName, taskId, fromStatus, toStatus, notes = null) {
  const q = queue.queues[queueName];
  const taskIndex = q[fromStatus].findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) return null;
  
  const task = q[fromStatus].splice(taskIndex, 1)[0];
  task.status = toStatus === 'completed' ? 'completed' : toStatus === 'failed' ? 'failed' : 'inProgress';
  
  if (toStatus === 'completed') {
    task.completedAt = new Date().toISOString();
    queue.stats.totalTasksCompleted++;
    queue.stats.lastTaskCompleted = task.completedAt;
  } else if (toStatus === 'failed') {
    task.failedAt = new Date().toISOString();
    queue.stats.totalTasksFailed++;
  }
  
  if (notes) task.notes = notes;
  
  q[toStatus].push(task);
  return task;
}

async function executeHiggsfield(task) {
  console.log(`[Executor] Running Higgsfield task: ${task.title}`);
  
  const engine = new BrowserEngine();
  
  try {
    await engine.init({ headless: true });
    
    // Navigate to Higgsfield
    await engine.goto('https://higgsfield.ai/generate');
    
    // Wait for page load
    await engine.page.waitForTimeout(3000);
    
    // Look for prompt input
    const promptInput = await engine.page.$('textarea, input[type="text"]');
    if (promptInput) {
      await promptInput.fill(task.prompt);
    }
    
    // Screenshot for debugging
    await engine.screenshot(task.outputPath.replace('.png', '-debug.png'));
    
    // TODO: Complete Higgsfield flow when we know the UI
    // For now, return partial success
    
    return {
      success: true,
      partial: true,
      message: 'Browser automation ready - need to complete Higgsfield UI flow'
    };
    
  } catch (error) {
    console.error(`[Executor] Higgsfield error: ${error.message}`);
    return { success: false, error: error.message };
    
  } finally {
    await engine.close();
  }
}

async function processQueue() {
  console.log('[Executor] Loading task queue...');
  const queue = loadQueue();
  
  const queueNames = ['content', 'higgsfield', 'social', 'research'];
  let tasksProcessed = 0;
  
  for (const queueName of queueNames) {
    const q = queue.queues[queueName];
    if (!q || !q.pending || q.pending.length === 0) continue;
    
    console.log(`[Executor] Processing ${queueName} queue (${q.pending.length} pending)`);
    
    // Process up to maxConcurrentTasks
    const maxTasks = queue.config.maxConcurrentTasks || 3;
    const tasksToProcess = q.pending.slice(0, maxTasks);
    
    for (const task of tasksToProcess) {
      console.log(`[Executor] Starting task: ${task.id} - ${task.title}`);
      
      // Move to inProgress
      moveTask(queue, queueName, task.id, 'pending', 'inProgress');
      saveQueue(queue);
      
      let result;
      
      try {
        switch (queueName) {
          case 'higgsfield':
            result = await executeHiggsfield(task);
            break;
          // Add other queue handlers here
          default:
            result = { success: false, error: 'No handler for queue type' };
        }
        
        if (result.success) {
          moveTask(queue, queueName, task.id, 'inProgress', 'completed', result.message);
        } else {
          moveTask(queue, queueName, task.id, 'inProgress', 'failed', result.error);
        }
        
      } catch (error) {
        moveTask(queue, queueName, task.id, 'inProgress', 'failed', error.message);
      }
      
      tasksProcessed++;
      saveQueue(queue);
    }
  }
  
  queue.stats.lastCheckTime = new Date().toISOString();
  saveQueue(queue);
  
  console.log(`[Executor] Processed ${tasksProcessed} tasks`);
  return { tasksProcessed };
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args[0] === 'run') {
    processQueue().then(result => {
      console.log('[Executor] Complete:', result);
      process.exit(0);
    }).catch(err => {
      console.error('[Executor] Fatal:', err);
      process.exit(1);
    });
  } else if (args[0] === 'test-browser') {
    (async () => {
      const engine = new BrowserEngine();
      await engine.init({ headless: true });
      await engine.goto('https://example.com');
      console.log('Page title:', await engine.page.title());
      await engine.screenshot('autonomous/output/browser-test.png');
      await engine.close();
      console.log('Browser test passed!');
    })();
  } else {
    console.log('Usage: node executor.js [run|test-browser]');
  }
}

module.exports = { processQueue, executeHiggsfield };
