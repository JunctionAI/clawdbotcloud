import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    taskId: v.id("tasks"),
    fromAgentId: v.optional(v.id("agents")),
    fromUser: v.optional(v.string()),
    content: v.string(),
    attachments: v.optional(v.array(v.id("documents"))),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found");

    // Extract @mentions from content
    const mentionRegex = /@(\w+)/g;
    const mentions: any[] = [];
    let match;
    
    while ((match = mentionRegex.exec(args.content)) !== null) {
      const mentionName = match[1].toLowerCase();
      
      if (mentionName === "all") {
        // @all mentions everyone
        const allAgents = await ctx.db.query("agents").collect();
        mentions.push(...allAgents.map((a) => a._id));
      } else {
        // Find specific agent
        const agents = await ctx.db.query("agents").collect();
        const agent = agents.find((a) => a.name.toLowerCase() === mentionName);
        if (agent) mentions.push(agent._id);
      }
    }

    const now = Date.now();
    const messageId = await ctx.db.insert("messages", {
      taskId: args.taskId,
      fromAgentId: args.fromAgentId,
      fromUser: args.fromUser,
      content: args.content,
      attachments: args.attachments ?? [],
      mentions: [...new Set(mentions)], // Remove duplicates
      createdAt: now,
    });

    // Create notifications for mentions
    for (const agentId of mentions) {
      // Don't notify the sender
      if (args.fromAgentId && agentId === args.fromAgentId) continue;
      
      const agent = await ctx.db.get(agentId);
      if (agent && 'name' in agent) {
        await ctx.db.insert("notifications", {
          mentionedAgentId: agentId,
          taskId: args.taskId,
          messageId,
          content: `@${agent.name} in ${task.title}: ${args.content.substring(0, 100)}`,
          delivered: false,
          createdAt: now,
        });
      }
    }

    // Log activity
    const fromName = args.fromUser ?? 
      (args.fromAgentId ? (await ctx.db.get(args.fromAgentId))?.name : "Unknown");
    
    await ctx.db.insert("activities", {
      type: "message_sent",
      agentId: args.fromAgentId,
      taskId: args.taskId,
      message: `${fromName} commented on ${task.title}`,
      createdAt: now,
    });

    // Update task timestamp
    await ctx.db.patch(args.taskId, { updatedAt: now });

    return messageId;
  },
});

export const list = query({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
      .order("asc")
      .collect();

    // Enrich with author info
    return await Promise.all(
      messages.map(async (msg) => {
        const author = msg.fromAgentId
          ? await ctx.db.get(msg.fromAgentId)
          : null;
        
        return {
          ...msg,
          author,
        };
      })
    );
  },
});

export const recent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .order("desc")
      .take(args.limit ?? 50);

    return await Promise.all(
      messages.map(async (msg) => {
        const author = msg.fromAgentId
          ? await ctx.db.get(msg.fromAgentId)
          : null;
        const task = await ctx.db.get(msg.taskId);
        
        return {
          ...msg,
          author,
          task,
        };
      })
    );
  },
});
