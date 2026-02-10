/**
 * Check for Fury's tasks and @mentions
 */

const { ConvexHttpClient } = require("convex/browser");

const CONVEX_URL = "https://little-ladybug-483.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

async function checkTasks() {
  try {
    // Get Fury's agent record
    const agents = await client.query("agents:list");
    const fury = agents.find((a) => a.name === "Fury");

    if (!fury) {
      console.log("NO_FURY_AGENT");
      return;
    }

    // Get all tasks
    const tasks = await client.query("tasks:list");
    
    // Filter tasks assigned to Fury (not done)
    const myTasks = tasks.filter((t) => 
      t.assigneeIds && t.assigneeIds.includes(fury._id) && t.status !== "done"
    );

    // Check for notifications
    let notifications = [];
    try {
      notifications = await client.query("notifications:forAgent", {
        agentId: fury._id,
      });
    } catch (e) {
      // Notifications query might not exist
    }

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
    console.log("ERROR: " + error.message);
  }
}

checkTasks();
