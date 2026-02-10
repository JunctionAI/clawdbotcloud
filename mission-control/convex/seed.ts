import { mutation } from "./_generated/server";

// Seed the database with sample data for demo
export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Create sample agents
    const agent1 = await ctx.db.insert("agents", {
      name: "Main Agent",
      role: "orchestrator",
      status: "active",
      sessionKey: "main-session-001",
      lastHeartbeat: now,
    });

    const agent2 = await ctx.db.insert("agents", {
      name: "Research Agent",
      role: "researcher",
      status: "idle",
      sessionKey: "research-session-002",
      lastHeartbeat: now - 30 * 60000,
    });

    const agent3 = await ctx.db.insert("agents", {
      name: "Code Agent",
      role: "developer",
      status: "active",
      sessionKey: "code-session-003",
      lastHeartbeat: now - 5 * 60000,
    });

    // Create sample tasks
    const task1 = await ctx.db.insert("tasks", {
      title: "Build Mission Control Dashboard",
      description: "Create a dashboard with Activity Feed, Calendar View, and Global Search",
      status: "in_progress",
      assigneeIds: [agent1, agent3],
      createdBy: agent1,
      createdAt: now - 2 * 60 * 60000,
      updatedAt: now,
      isScheduled: false,
    });

    const task2 = await ctx.db.insert("tasks", {
      title: "Daily Email Check",
      description: "Check and respond to important emails",
      status: "inbox",
      assigneeIds: [],
      createdAt: now - 24 * 60 * 60000,
      updatedAt: now - 24 * 60 * 60000,
      scheduledFor: now + 9 * 60 * 60000, // Tomorrow 9am
      isScheduled: true,
    });

    const task3 = await ctx.db.insert("tasks", {
      title: "Weekly Report",
      description: "Generate and send weekly progress report",
      status: "done",
      assigneeIds: [agent2],
      createdAt: now - 48 * 60 * 60000,
      updatedAt: now - 24 * 60 * 60000,
      scheduledFor: now - 24 * 60 * 60000,
      isScheduled: true,
    });

    const task4 = await ctx.db.insert("tasks", {
      title: "Code Review",
      description: "Review pull requests and merge approved changes",
      status: "review",
      assigneeIds: [agent3],
      createdAt: now - 4 * 60 * 60000,
      updatedAt: now - 1 * 60 * 60000,
    });

    // Create sample activities
    await ctx.db.insert("activities", {
      type: "task_created",
      agentId: agent1,
      taskId: task1,
      message: "Task created: Build Mission Control Dashboard",
      createdAt: now - 2 * 60 * 60000,
    });

    await ctx.db.insert("activities", {
      type: "agent_assigned",
      agentId: agent3,
      taskId: task1,
      message: "Code Agent assigned to: Build Mission Control Dashboard",
      createdAt: now - 1.5 * 60 * 60000,
    });

    await ctx.db.insert("activities", {
      type: "status_changed",
      taskId: task1,
      message: "Build Mission Control Dashboard: inbox → in_progress",
      metadata: { oldStatus: "inbox", newStatus: "in_progress" },
      createdAt: now - 1 * 60 * 60000,
    });

    await ctx.db.insert("activities", {
      type: "document_created",
      agentId: agent2,
      message: "Research document created: Market Analysis Q1",
      createdAt: now - 45 * 60000,
    });

    await ctx.db.insert("activities", {
      type: "agent_heartbeat",
      agentId: agent1,
      message: "Main Agent heartbeat - all systems operational",
      createdAt: now - 30 * 60000,
    });

    await ctx.db.insert("activities", {
      type: "message_sent",
      agentId: agent3,
      taskId: task4,
      message: "Code Agent: Pushed initial implementation of ActivityFeed component",
      createdAt: now - 20 * 60000,
    });

    await ctx.db.insert("activities", {
      type: "task_updated",
      taskId: task4,
      message: "Code Review: Added new review comments",
      createdAt: now - 10 * 60000,
    });

    await ctx.db.insert("activities", {
      type: "status_changed",
      taskId: task3,
      message: "Weekly Report: review → done",
      metadata: { oldStatus: "review", newStatus: "done" },
      createdAt: now - 5 * 60000,
    });

    // Create sample scheduled jobs
    const tomorrow9am = new Date();
    tomorrow9am.setDate(tomorrow9am.getDate() + 1);
    tomorrow9am.setHours(9, 0, 0, 0);

    const nextMonday = new Date();
    nextMonday.setDate(nextMonday.getDate() + ((7 - nextMonday.getDay()) % 7) + 1);
    nextMonday.setHours(8, 0, 0, 0);

    await ctx.db.insert("scheduledJobs", {
      name: "Daily Email Check",
      description: "Check inbox for urgent emails",
      cronExpression: "0 9 * * *",
      taskType: "email_check",
      nextRun: tomorrow9am.getTime(),
      status: "active",
      createdAt: now,
    });

    await ctx.db.insert("scheduledJobs", {
      name: "Weekly Backup",
      description: "Backup all documents and memory files",
      cronExpression: "0 8 * * 1",
      taskType: "backup",
      nextRun: nextMonday.getTime(),
      status: "active",
      createdAt: now,
    });

    await ctx.db.insert("scheduledJobs", {
      name: "Memory Cleanup",
      description: "Archive old memory entries",
      cronExpression: "0 2 * * 0",
      taskType: "cleanup",
      nextRun: now + 5 * 24 * 60 * 60 * 1000,
      status: "active",
      createdAt: now,
    });

    // Create sample documents
    await ctx.db.insert("documents", {
      title: "Project Roadmap",
      content: "# Mission Control Roadmap\n\n## Phase 1: MVP\n- Activity Feed ✅\n- Calendar View ✅\n- Global Search ✅\n\n## Phase 2: Enhancements\n- Real-time notifications\n- Task dependencies\n- Analytics dashboard",
      type: "protocol",
      taskId: task1,
      authorId: agent1,
      createdAt: now - 24 * 60 * 60000,
      updatedAt: now,
    });

    await ctx.db.insert("documents", {
      title: "Market Analysis Q1",
      content: "# Market Analysis\n\nKey findings from Q1 research...",
      type: "research",
      authorId: agent2,
      createdAt: now - 45 * 60000,
      updatedAt: now - 45 * 60000,
    });

    return {
      agents: 3,
      tasks: 4,
      activities: 8,
      scheduledJobs: 3,
      documents: 2,
    };
  },
});

// Clear all data
export const clearData = mutation({
  args: {},
  handler: async (ctx) => {
    const tables = ["agents", "tasks", "activities", "scheduledJobs", "documents", "messages", "notifications"];
    
    for (const table of tables) {
      const docs = await ctx.db.query(table as any).collect();
      for (const doc of docs) {
        await ctx.db.delete(doc._id);
      }
    }
    
    return { cleared: tables };
  },
});
