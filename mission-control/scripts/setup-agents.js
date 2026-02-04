/**
 * Setup Script - Register agents in Convex
 */

require('dotenv').config({ path: '.env.local' });
const { ConvexHttpClient } = require("convex/browser");

const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
  console.error("❌ CONVEX_URL not set");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

const AGENTS = [
  {
    name: "Jarvis",
    role: "Squad Lead",
    sessionKey: "agent:main:main",
    status: "idle",
  },
  {
    name: "Shuri",
    role: "Product Analyst",
    sessionKey: "agent:product-analyst:main",
    status: "idle",
  },
  {
    name: "Fury",
    role: "Customer Researcher",
    sessionKey: "agent:customer-researcher:main",
    status: "idle",
  },
];

async function setupAgents() {
  console.log("🤖 Setting up agents in Mission Control...\n");

  for (const agent of AGENTS) {
    try {
      // Check if agent already exists
      const existing = await client.query("agents:getBySessionKey", {
        sessionKey: agent.sessionKey,
      });

      if (existing) {
        console.log(`✓ ${agent.name} already registered`);
        continue;
      }

      // Create agent
      const agentId = await client.mutation("agents:create", agent);
      console.log(`✅ Created ${agent.name} (${agent.role})`);
    } catch (error) {
      console.error(`❌ Failed to create ${agent.name}: ${error.message}`);
    }
  }

  console.log("\n🎉 Agent setup complete!");
  console.log("\nNext steps:");
  console.log("1. Set up heartbeat crons for each agent");
  console.log("2. Start the notification daemon");
  console.log("3. Create your first task!\n");
}

setupAgents().catch(console.error);
