import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    sessionKey: v.string(),
    status: v.optional(v.union(v.literal("idle"), v.literal("active"), v.literal("blocked"))),
  },
  handler: async (ctx, args) => {
    const agentId = await ctx.db.insert("agents", {
      name: args.name,
      role: args.role,
      sessionKey: args.sessionKey,
      status: args.status ?? "idle",
      lastHeartbeat: Date.now(),
    });

    // Log activity
    await ctx.db.insert("activities", {
      type: "agent_heartbeat",
      agentId,
      message: `${args.name} joined Mission Control`,
      createdAt: Date.now(),
    });

    return agentId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("agents").collect();
  },
});

export const get = query({
  args: { id: v.id("agents") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySessionKey = query({
  args: { sessionKey: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("agents")
      .withIndex("by_session_key", (q) => q.eq("sessionKey", args.sessionKey))
      .first();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("agents"),
    status: v.union(v.literal("idle"), v.literal("active"), v.literal("blocked")),
    currentTaskId: v.optional(v.id("tasks")),
  },
  handler: async (ctx, args) => {
    const agent = await ctx.db.get(args.id);
    if (!agent) throw new Error("Agent not found");

    await ctx.db.patch(args.id, {
      status: args.status,
      currentTaskId: args.currentTaskId,
      lastHeartbeat: Date.now(),
    });

    await ctx.db.insert("activities", {
      type: "agent_heartbeat",
      agentId: args.id,
      message: `${agent.name} is now ${args.status}`,
      createdAt: Date.now(),
    });
  },
});

export const heartbeat = mutation({
  args: {
    sessionKey: v.string(),
    status: v.optional(v.union(v.literal("idle"), v.literal("active"), v.literal("blocked"))),
    currentTaskId: v.optional(v.id("tasks")),
  },
  handler: async (ctx, args) => {
    const agent = await ctx.db
      .query("agents")
      .withIndex("by_session_key", (q) => q.eq("sessionKey", args.sessionKey))
      .first();

    if (!agent) throw new Error("Agent not found");

    await ctx.db.patch(agent._id, {
      status: args.status ?? agent.status,
      currentTaskId: args.currentTaskId,
      lastHeartbeat: Date.now(),
    });

    return agent._id;
  },
});
