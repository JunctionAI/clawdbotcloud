// Mission Control Database Schema
// Convex schema for agent coordination

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Agents in the squad
  agents: defineTable({
    name: v.string(),              // "Jarvis", "Friday", etc.
    role: v.string(),              // "Squad Lead", "Developer", etc.
    status: v.string(),            // "idle", "active", "blocked"
    sessionKey: v.string(),        // Clawdbot session identifier
    currentTaskId: v.optional(v.id("tasks")),
    lastHeartbeat: v.number(),     // Unix timestamp
    metadata: v.optional(v.any()),
  }),

  // Work items
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.string(),            // "inbox", "assigned", "in_progress", "review", "done", "blocked"
    priority: v.string(),          // "low", "medium", "high", "urgent"
    assignedTo: v.array(v.id("agents")),
    createdBy: v.optional(v.id("agents")),
    createdAt: v.number(),
    updatedAt: v.number(),
    dueDate: v.optional(v.number()),
    tags: v.array(v.string()),
    parentTaskId: v.optional(v.id("tasks")),
    metadata: v.optional(v.any()),
  }),

  // Comments and discussions on tasks
  messages: defineTable({
    taskId: v.id("tasks"),
    agentId: v.id("agents"),
    content: v.string(),
    createdAt: v.number(),
    replyToId: v.optional(v.id("messages")),
    attachments: v.array(v.string()),
    metadata: v.optional(v.any()),
  }),

  // Activity feed
  activities: defineTable({
    type: v.string(),              // "task_created", "message_sent", "status_changed", etc.
    agentId: v.optional(v.id("agents")),
    taskId: v.optional(v.id("tasks")),
    message: v.string(),
    timestamp: v.number(),
    metadata: v.optional(v.any()),
  }),

  // Documents and deliverables
  documents: defineTable({
    title: v.string(),
    content: v.string(),           // Markdown content
    type: v.string(),              // "deliverable", "research", "protocol", "report"
    taskId: v.optional(v.id("tasks")),
    createdBy: v.id("agents"),
    createdAt: v.number(),
    updatedAt: v.number(),
    tags: v.array(v.string()),
    metadata: v.optional(v.any()),
  }),

  // Notifications for @mentions
  notifications: defineTable({
    agentId: v.id("agents"),
    content: v.string(),
    sourceType: v.string(),        // "mention", "task_assigned", "task_completed"
    sourceId: v.optional(v.string()),
    delivered: v.boolean(),
    deliveredAt: v.optional(v.number()),
    createdAt: v.number(),
  }),
});
