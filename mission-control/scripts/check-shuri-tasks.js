/**
 * Check for Shuri's tasks and @mentions
 */

const { ConvexHttpClient } = require("convex/browser");

const CONVEX_URL = "https://little-ladybug-483.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

async function checkTasks() {
  try {
    // Get Shuri's agent record
    const agents = await client.query("agents:list");
    const shuri = agents.find((a) => a.name === "Shuri");

    if (!shuri) {
      console.log("❌ Shuri agent not found");
      return;
    }

    console.log(`🤖 Checking tasks for Shuri (ID: ${shuri._id})\n`);

    // Get all tasks
    const tasks = await client.query("tasks:list");
    
    // Filter tasks assigned to Shuri
    const myTasks = tasks.filter((t) => 
      t.assigneeIds && t.assigneeIds.includes(shuri._id)
    );

    if (myTasks.length === 0) {
      console.log("✅ No tasks assigned");
    } else {
      console.log(`📋 ${myTasks.length} task(s) assigned:\n`);
      for (const task of myTasks) {
        console.log(`   - [${task.status}] ${task.title}`);
        console.log(`     ${task.description}`);
        console.log("");
      }
    }

    // Check for notifications
    const notifications = await client.query("notifications:forAgent", {
      agentId: shuri._id,
    });

    if (notifications.length === 0) {
      console.log("✅ No @mentions");
    } else {
      console.log(`📬 ${notifications.length} notification(s):\n`);
      for (const notif of notifications) {
        console.log(`   - ${notif.content}`);
        console.log(`     Delivered: ${notif.deliveredAt ? "Yes" : "No"}`);
        console.log("");
      }
    }

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

checkTasks();
