/**
 * Full Shuri heartbeat check - tasks, activity, all open tasks
 */
const { ConvexHttpClient } = require("convex/browser");

const CONVEX_URL = "https://little-ladybug-483.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

async function check() {
  try {
    // Get all tasks
    const allTasks = await client.query("tasks:list");
    
    console.log("=== ALL TASKS ===");
    if (allTasks.length === 0) {
      console.log("No tasks in system.");
    } else {
      for (const t of allTasks) {
        console.log(`[${t.status}] ${t.title} (ID: ${t._id})`);
        console.log(`  Assignees: ${t.assigneeIds.length}`);
        console.log(`  Updated: ${new Date(t.updatedAt).toISOString()}`);
      }
    }

    // Get recent activity
    console.log("\n=== RECENT ACTIVITY (last 10) ===");
    const activities = await client.query("activities:recent", { limit: 10 });
    if (activities.length === 0) {
      console.log("No recent activity.");
    } else {
      for (const a of activities) {
        const agentName = a.agent ? a.agent.name : "System";
        const time = new Date(a.createdAt).toISOString();
        console.log(`[${time}] ${agentName}: ${a.message}`);
      }
    }

    // Get all agents
    console.log("\n=== AGENTS ===");
    const agents = await client.query("agents:list");
    for (const a of agents) {
      const lastHB = a.lastHeartbeat ? new Date(a.lastHeartbeat).toISOString() : "never";
      console.log(`${a.name} (${a.role}) - ${a.status} - Last heartbeat: ${lastHB}`);
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

check();
