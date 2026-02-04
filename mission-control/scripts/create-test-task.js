/**
 * Create a test task to verify Mission Control is working
 */

require('dotenv').config({ path: '.env.local' });
const { ConvexHttpClient } = require("convex/browser");

const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
  console.error("❌ CONVEX_URL not set");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

async function createTestTask() {
  console.log("📝 Creating test task...\n");

  try {
    // Get agents
    const agents = await client.query("agents:list");
    const jarvis = agents.find((a) => a.name === "Jarvis");
    const shuri = agents.find((a) => a.name === "Shuri");
    const fury = agents.find((a) => a.name === "Fury");

    if (!jarvis || !shuri || !fury) {
      console.error("❌ Not all agents found. Run setup-agents.js first.");
      return;
    }

    // Create task
    const taskId = await client.mutation("tasks:create", {
      title: "Test Mission Control Setup",
      description: "Verify that all agents can see and interact with this task. @Shuri please confirm you can see this. @Fury please add a test comment.",
      assigneeIds: [jarvis._id, shuri._id, fury._id],
      createdBy: jarvis._id,
    });

    console.log("✅ Test task created!");
    console.log(`   Task ID: ${taskId}`);
    console.log("");

    // Post a message to the task
    await client.mutation("messages:create", {
      taskId,
      fromUser: "Tom",
      content: "Testing @mentions - @Jarvis @Shuri @Fury can you all see this?",
    });

    console.log("✅ Test message posted with @mentions");
    console.log("");
    console.log("🎯 Check Mission Control UI to see:");
    console.log("   - Task appears in 'Assigned' column");
    console.log("   - Activity feed shows task creation");
    console.log("   - Agents show as assigned");
    console.log("");
    console.log("📬 Agents will receive @mentions on their next heartbeat");
    console.log("");
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

createTestTask();
