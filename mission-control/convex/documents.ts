import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    type: v.union(
      v.literal("deliverable"),
      v.literal("research"),
      v.literal("protocol"),
      v.literal("reference")
    ),
    taskId: v.optional(v.id("tasks")),
    authorId: v.optional(v.id("agents")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const docId = await ctx.db.insert("documents", {
      title: args.title,
      content: args.content,
      type: args.type,
      taskId: args.taskId,
      authorId: args.authorId,
      createdAt: now,
      updatedAt: now,
    });

    // Log activity
    const author = args.authorId ? await ctx.db.get(args.authorId) : null;
    await ctx.db.insert("activities", {
      type: "document_created",
      agentId: args.authorId,
      taskId: args.taskId,
      message: `${author?.name ?? "Someone"} created document: ${args.title}`,
      createdAt: now,
    });

    return docId;
  },
});

export const list = query({
  args: {
    type: v.optional(
      v.union(
        v.literal("deliverable"),
        v.literal("research"),
        v.literal("protocol"),
        v.literal("reference")
      )
    ),
    taskId: v.optional(v.id("tasks")),
  },
  handler: async (ctx, args) => {
    if (args.taskId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
        .collect();
    }
    
    if (args.type) {
      return await ctx.db
        .query("documents")
        .withIndex("by_type", (q) => q.eq("type", args.type!))
        .collect();
    }

    return await ctx.db.query("documents").order("desc").collect();
  },
});

export const get = query({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.id);
    if (!doc) return null;

    const author = doc.authorId ? await ctx.db.get(doc.authorId) : null;
    const task = doc.taskId ? await ctx.db.get(doc.taskId) : null;

    return {
      ...doc,
      author,
      task,
    };
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: any = { updatedAt: Date.now() };
    if (args.title !== undefined) updates.title = args.title;
    if (args.content !== undefined) updates.content = args.content;

    await ctx.db.patch(args.id, updates);
    return args.id;
  },
});
