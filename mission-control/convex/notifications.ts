import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const undelivered = query({
  handler: async (ctx) => {
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_delivered", (q) => q.eq("delivered", false))
      .collect();

    return await Promise.all(
      notifications.map(async (notification) => {
        const agent = await ctx.db.get(notification.mentionedAgentId);
        const task = notification.taskId
          ? await ctx.db.get(notification.taskId)
          : null;

        return {
          ...notification,
          agent,
          task,
        };
      })
    );
  },
});

export const forAgent = query({
  args: {
    agentId: v.id("agents"),
    includeDelivered: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("notifications")
      .withIndex("by_agent", (q) => q.eq("mentionedAgentId", args.agentId));

    const notifications = await query.order("desc").collect();

    if (!args.includeDelivered) {
      return notifications.filter((n) => !n.delivered);
    }

    return notifications;
  },
});

export const markDelivered = mutation({
  args: {
    id: v.id("notifications"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      delivered: true,
      deliveredAt: Date.now(),
    });
  },
});

export const markAllDelivered = mutation({
  args: {
    agentId: v.id("agents"),
  },
  handler: async (ctx, args) => {
    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_agent", (q) => q.eq("mentionedAgentId", args.agentId))
      .filter((q) => q.eq(q.field("delivered"), false))
      .collect();

    await Promise.all(
      notifications.map((n) =>
        ctx.db.patch(n._id, {
          delivered: true,
          deliveredAt: Date.now(),
        })
      )
    );

    return notifications.length;
  },
});
