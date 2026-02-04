import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    assigneeIds: v.optional(v.array(v.id("agents"))),
    createdBy: v.optional(v.id("agents")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const taskId = await ctx.db.insert("tasks", {
      title: args.title,
      description: args.description,
      status: "inbox",
      assigneeIds: args.assigneeIds ?? [],
      createdBy: args.createdBy,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("activities", {
      type: "task_created",
      agentId: args.createdBy,
      taskId,
      message: `Task created: ${args.title}`,
      createdAt: now,
    });

    // Notify assignees
    if (args.assigneeIds && args.assigneeIds.length > 0) {
      for (const agentId of args.assigneeIds) {
        const agent = await ctx.db.get(agentId);
        if (agent) {
          await ctx.db.insert("notifications", {
            mentionedAgentId: agentId,
            taskId,
            content: `You've been assigned to: ${args.title}`,
            delivered: false,
            createdAt: now,
          });
        }
      }
    }

    return taskId;
  },
});

export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("inbox"),
        v.literal("assigned"),
        v.literal("in_progress"),
        v.literal("review"),
        v.literal("done"),
        v.literal("blocked")
      )
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("tasks")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    }
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

export const get = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("inbox"),
        v.literal("assigned"),
        v.literal("in_progress"),
        v.literal("review"),
        v.literal("done"),
        v.literal("blocked")
      )
    ),
    assigneeIds: v.optional(v.array(v.id("agents"))),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) throw new Error("Task not found");

    const updates: any = { updatedAt: Date.now() };
    if (args.title !== undefined) updates.title = args.title;
    if (args.description !== undefined) updates.description = args.description;
    if (args.status !== undefined) updates.status = args.status;
    if (args.assigneeIds !== undefined) updates.assigneeIds = args.assigneeIds;

    await ctx.db.patch(args.id, updates);

    // Log activity
    if (args.status && args.status !== task.status) {
      await ctx.db.insert("activities", {
        type: "status_changed",
        taskId: args.id,
        message: `${task.title}: ${task.status} → ${args.status}`,
        metadata: { oldStatus: task.status, newStatus: args.status },
        createdAt: Date.now(),
      });
    }

    // Notify new assignees
    if (args.assigneeIds) {
      const newAssignees = args.assigneeIds.filter(
        (id) => !task.assigneeIds.includes(id)
      );
      for (const agentId of newAssignees) {
        const agent = await ctx.db.get(agentId);
        if (agent) {
          await ctx.db.insert("notifications", {
            mentionedAgentId: agentId,
            taskId: args.id,
            content: `You've been assigned to: ${task.title}`,
            delivered: false,
            createdAt: Date.now(),
          });
        }
      }
    }

    return args.id;
  },
});

export const getWithDetails = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) return null;

    const assignees = await Promise.all(
      task.assigneeIds.map((id) => ctx.db.get(id))
    );

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_task", (q) => q.eq("taskId", args.id))
      .collect();

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_task", (q) => q.eq("taskId", args.id))
      .collect();

    return {
      ...task,
      assignees: assignees.filter((a) => a !== null),
      messages,
      documents,
    };
  },
});
