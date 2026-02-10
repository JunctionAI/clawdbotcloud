/**
 * Respond to a task and mark notifications as delivered
 */

const { ConvexHttpClient } = require("convex/browser");

const CONVEX_URL = "https://little-ladybug-483.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

async function respondToTask() {
  const args = process.argv.slice(2);
  const taskId = args[0];
  const validStatuses = ["inbox", "assigned", "in_progress", "review", "done", "blocked"];
  const status = validStatuses.includes(args[1]) ? args[1] : null;
  const messageStart = validStatuses.includes(args[1]) ? 2 : 1;
  const message = args.slice(messageStart).join(" ") || null;

  if (!taskId) {
    console.log("Usage: node respond-to-task.js <taskId> [status] [message]");
    console.log("Status: inbox | assigned | in_progress | review | done | blocked");
    process.exit(1);
  }

  try {
    // Get Jarvis agent
    const agents = await client.query("agents:list");
    const jarvis = agents.find((a) => a.name === "Jarvis");

    if (!jarvis) {
      console.error("Jarvis agent not found");
      process.exit(1);
    }

    // Mark all notifications as delivered for Jarvis
    const count = await client.mutation("notifications:markAllDelivered", {
      agentId: jarvis._id,
    });
    console.log(`Marked ${count} notification(s) as delivered`);

    // Update task status if provided
    if (status) {
      await client.mutation("tasks:update", {
        id: taskId,
        status: status,
      });
      console.log(`Updated task status to: ${status}`);
    }

    // Add message if provided
    if (message) {
      await client.mutation("messages:create", {
        taskId: taskId,
        fromAgentId: jarvis._id,
        content: message,
      });
      console.log(`Added message: ${message}`);
    }

    console.log("Done!");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

respondToTask();
