/**
 * Check for Jarvis's tasks and @mentions
 */

const { ConvexHttpClient } = require("convex/browser");

const CONVEX_URL = "https://little-ladybug-483.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

async function checkTasks() {
  try {
    // Get Jarvis's agent record
    const agents = await client.query("agents:list");
    const jarvis = agents.find((a) => a.name === "Jarvis");

    if (!jarvis) {
      console.log("HEARTBEAT_OK");
      return;
    }

    // Get all tasks
    const tasks = await client.query("tasks:list");
    
    // Filter tasks assigned to Jarvis (not done)
    const myTasks = tasks.filter((t) => 
      t.assigneeIds && t.assigneeIds.includes(jarvis._id) && t.status !== "done"
    );

    // Check for notifications
    const notifications = await client.query("notifications:forAgent", {
      agentId: jarvis._id,
    });

    const undelivered = notifications.filter(n => !n.deliveredAt);

    if (myTasks.length === 0 && undelivered.length === 0) {
      console.log("HEARTBEAT_OK");
      return;
    }

    // Output structured data for parsing
    console.log(JSON.stringify({
      tasks: myTasks,
      notifications: undelivered
    }, null, 2));

  } catch (error) {
    console.log("HEARTBEAT_OK");
  }
}

checkTasks();
