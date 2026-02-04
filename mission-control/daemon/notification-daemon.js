/**
 * Notification Daemon
 * 
 * Polls Convex every 2 seconds for undelivered notifications
 * Delivers them to Clawdbot sessions via clawdbot sessions send
 */

require('dotenv').config({ path: '../.env.local' });
const { ConvexHttpClient } = require("convex/browser");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

// Initialize Convex client
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
  console.error("❌ CONVEX_URL not set. Please set CONVEX_URL or NEXT_PUBLIC_CONVEX_URL");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

// Agent session keys mapping
const AGENT_SESSIONS = {
  "Jarvis": "agent:main:main",
  "Shuri": "agent:product-analyst:main",
  "Fury": "agent:customer-researcher:main",
};

async function deliverNotification(notification) {
  const agentName = notification.agent?.name;
  const sessionKey = AGENT_SESSIONS[agentName];

  if (!sessionKey) {
    console.log(`⚠️ No session key found for agent: ${agentName}`);
    return false;
  }

  try {
    // Send to Clawdbot session
    const command = `clawdbot sessions send --session "${sessionKey}" --message "${notification.content.replace(/"/g, '\\"')}"`;
    
    console.log(`📤 Delivering to ${agentName} (${sessionKey})`);
    await execAsync(command);
    
    // Mark as delivered in Convex
    await client.mutation("notifications:markDelivered", { id: notification._id });
    
    console.log(`✅ Delivered notification to ${agentName}`);
    return true;
  } catch (error) {
    // Agent might be asleep, notification stays queued
    console.log(`⏸️ Could not deliver to ${agentName}: ${error.message}`);
    return false;
  }
}

async function pollAndDeliver() {
  try {
    // Get undelivered notifications
    const notifications = await client.query("notifications:undelivered");
    
    if (notifications.length === 0) {
      process.stdout.write(".");
      return;
    }

    console.log(`\n📬 Found ${notifications.length} undelivered notification(s)`);

    // Try to deliver each one
    for (const notification of notifications) {
      await deliverNotification(notification);
      // Small delay between deliveries
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (error) {
    console.error(`❌ Poll error: ${error.message}`);
  }
}

async function main() {
  console.log("🚀 Notification Daemon Starting...");
  console.log(`📡 Convex URL: ${CONVEX_URL}`);
  console.log(`👥 Monitoring agents: ${Object.keys(AGENT_SESSIONS).join(", ")}`);
  console.log(`⏰ Polling every 2 seconds\n`);

  // Poll every 2 seconds
  setInterval(async () => {
    await pollAndDeliver();
  }, 2000);

  // Keep process alive
  process.on("SIGINT", () => {
    console.log("\n👋 Shutting down notification daemon");
    process.exit(0);
  });
}

main().catch(console.error);
