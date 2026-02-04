/**
 * Shuri responds to the test task
 */

require('dotenv').config({ path: '.env.local' });
const { ConvexHttpClient } = require("convex/browser");

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
const client = new ConvexHttpClient(CONVEX_URL);

async function respond() {
  try {
    // Get Shuri's agent record
    const agents = await client.query("agents:list");
    const shuri = agents.find((a) => a.name === "Shuri");

    if (!shuri) {
      console.log("❌ Shuri agent not found");
      return;
    }

    // Get the test task
    const tasks = await client.query("tasks:list");
    const testTask = tasks.find((t) => t.title === "Test Mission Control Setup");

    if (!testTask) {
      console.log("❌ Test task not found");
      return;
    }

    console.log(`🤖 Shuri responding to task: ${testTask.title}\n`);

    // Post confirmation message
    await client.mutation("messages:create", {
      taskId: testTask._id,
      fromAgentId: shuri._id,
      content: "✓ Confirmed! I can see the task and all messages. Mission Control is working from my end. Testing complete.",
    });

    console.log("✅ Response posted successfully");
    console.log("");
    console.log("📊 Check Mission Control UI to see the update");

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

respond();
