import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get scheduled jobs for a week
export const getWeeklySchedule = query({
  args: {
    weekStart: v.number(), // timestamp of week start (Monday)
  },
  handler: async (ctx, args) => {
    const weekEnd = args.weekStart + 7 * 24 * 60 * 60 * 1000;

    // Get all active scheduled jobs
    const jobs = await ctx.db
      .query("scheduledJobs")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();

    // Get scheduled tasks
    const scheduledTasks = await ctx.db
      .query("tasks")
      .collect();

    const tasksInRange = scheduledTasks.filter(
      (task) =>
        task.scheduledFor &&
        task.scheduledFor >= args.weekStart &&
        task.scheduledFor < weekEnd
    );

    // Calculate which jobs run this week based on their nextRun
    const jobsInRange = jobs.filter(
      (job) => job.nextRun >= args.weekStart && job.nextRun < weekEnd
    );

    // Group by day of week
    const weekDays: Record<number, Array<{
      type: "task" | "job";
      id: any;
      title: string;
      time: number;
      description: string;
      status?: string;
    }>> = {};

    for (let i = 0; i < 7; i++) {
      const dayStart = args.weekStart + i * 24 * 60 * 60 * 1000;
      weekDays[dayStart] = [];
    }

    // Add tasks
    for (const task of tasksInRange) {
      if (task.scheduledFor) {
        const dayStart = getDayStart(task.scheduledFor);
        if (weekDays[dayStart]) {
          weekDays[dayStart].push({
            type: "task",
            id: task._id,
            title: task.title,
            time: task.scheduledFor,
            description: task.description,
            status: task.status,
          });
        }
      }
    }

    // Add jobs
    for (const job of jobsInRange) {
      const dayStart = getDayStart(job.nextRun);
      if (weekDays[dayStart]) {
        weekDays[dayStart].push({
          type: "job",
          id: job._id,
          title: job.name,
          time: job.nextRun,
          description: job.description,
          status: job.status,
        });
      }
    }

    // Sort each day by time
    for (const day of Object.keys(weekDays)) {
      weekDays[Number(day)].sort((a, b) => a.time - b.time);
    }

    return weekDays;
  },
});

function getDayStart(timestamp: number): number {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

// Get all scheduled jobs
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("scheduledJobs")
      .order("desc")
      .collect();
  },
});

// Create a scheduled job
export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    cronExpression: v.string(),
    taskType: v.string(),
    nextRun: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("scheduledJobs", {
      name: args.name,
      description: args.description,
      cronExpression: args.cronExpression,
      taskType: args.taskType,
      nextRun: args.nextRun,
      status: "active",
      createdAt: now,
    });
  },
});

// Update job status
export const updateStatus = mutation({
  args: {
    id: v.id("scheduledJobs"),
    status: v.union(v.literal("active"), v.literal("paused"), v.literal("completed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
    return args.id;
  },
});

// Mark job as run and calculate next run
export const markRun = mutation({
  args: {
    id: v.id("scheduledJobs"),
    nextRun: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    await ctx.db.patch(args.id, {
      lastRun: now,
      nextRun: args.nextRun,
    });
    return args.id;
  },
});

// Get upcoming jobs in the next N hours
export const upcoming = query({
  args: { hours: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const now = Date.now();
    const endTime = now + (args.hours ?? 24) * 60 * 60 * 1000;

    const jobs = await ctx.db
      .query("scheduledJobs")
      .withIndex("by_next_run")
      .collect();

    return jobs.filter(
      (job) => job.status === "active" && job.nextRun >= now && job.nextRun <= endTime
    );
  },
});
