import { v } from "convex/values";
import { query } from "./_generated/server";

// Global search across tasks, documents, and activities
export const globalSearch = query({
  args: {
    query: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const searchQuery = args.query.toLowerCase();
    const limit = args.limit ?? 20;

    // Search tasks
    const allTasks = await ctx.db.query("tasks").collect();
    const matchingTasks = allTasks
      .filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery) ||
          task.description.toLowerCase().includes(searchQuery)
      )
      .slice(0, limit)
      .map((task) => ({
        type: "task" as const,
        id: task._id,
        title: task.title,
        preview: task.description.slice(0, 100),
        status: task.status,
        createdAt: task.createdAt,
      }));

    // Search documents
    const allDocs = await ctx.db.query("documents").collect();
    const matchingDocs = allDocs
      .filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchQuery) ||
          doc.content.toLowerCase().includes(searchQuery)
      )
      .slice(0, limit)
      .map((doc) => ({
        type: "document" as const,
        id: doc._id,
        title: doc.title,
        preview: doc.content.slice(0, 100),
        docType: doc.type,
        createdAt: doc.createdAt,
      }));

    // Search activities
    const allActivities = await ctx.db.query("activities").order("desc").take(500);
    const matchingActivities = allActivities
      .filter((activity) =>
        activity.message.toLowerCase().includes(searchQuery)
      )
      .slice(0, limit)
      .map((activity) => ({
        type: "activity" as const,
        id: activity._id,
        title: activity.message,
        preview: activity.type,
        activityType: activity.type,
        createdAt: activity.createdAt,
      }));

    // Search agents
    const allAgents = await ctx.db.query("agents").collect();
    const matchingAgents = allAgents
      .filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchQuery) ||
          agent.role.toLowerCase().includes(searchQuery)
      )
      .slice(0, limit)
      .map((agent) => ({
        type: "agent" as const,
        id: agent._id,
        title: agent.name,
        preview: agent.role,
        status: agent.status,
        createdAt: agent._creationTime,
      }));

    // Combine and sort by relevance (creation time for now)
    const results = [
      ...matchingTasks,
      ...matchingDocs,
      ...matchingActivities,
      ...matchingAgents,
    ].sort((a, b) => b.createdAt - a.createdAt);

    return results.slice(0, limit);
  },
});

// Quick search suggestions
export const suggestions = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    if (args.query.length < 2) return [];

    const searchQuery = args.query.toLowerCase();

    // Get recent task titles
    const recentTasks = await ctx.db
      .query("tasks")
      .order("desc")
      .take(50);

    const suggestions = recentTasks
      .filter((task) => task.title.toLowerCase().includes(searchQuery))
      .slice(0, 5)
      .map((task) => task.title);

    return suggestions;
  },
});
