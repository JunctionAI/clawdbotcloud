import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  agents: defineTable({
    name: v.string(),
    role: v.string(),
    status: v.union(v.literal("idle"), v.literal("active"), v.literal("blocked")),
    currentTaskId: v.optional(v.id("tasks")),
    sessionKey: v.string(),
    lastHeartbeat: v.optional(v.number()),
  })
    .index("by_session_key", ["sessionKey"])
    .index("by_status", ["status"]),

  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("inbox"),
      v.literal("assigned"),
      v.literal("in_progress"),
      v.literal("review"),
      v.literal("done"),
      v.literal("blocked")
    ),
    assigneeIds: v.array(v.id("agents")),
    createdBy: v.optional(v.id("agents")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_updated", ["updatedAt"]),

  messages: defineTable({
    taskId: v.id("tasks"),
    fromAgentId: v.optional(v.id("agents")),
    fromUser: v.optional(v.string()), // "Tom" or other humans
    content: v.string(),
    attachments: v.array(v.id("documents")),
    mentions: v.array(v.id("agents")), // @mentions in this message
    createdAt: v.number(),
  })
    .index("by_task", ["taskId"])
    .index("by_created", ["createdAt"]),

  activities: defineTable({
    type: v.union(
      v.literal("task_created"),
      v.literal("task_updated"),
      v.literal("message_sent"),
      v.literal("document_created"),
      v.literal("agent_heartbeat"),
      v.literal("agent_assigned"),
      v.literal("status_changed")
    ),
    agentId: v.optional(v.id("agents")),
    taskId: v.optional(v.id("tasks")),
    message: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_created", ["createdAt"])
    .index("by_agent", ["agentId"])
    .index("by_task", ["taskId"]),

  documents: defineTable({
    title: v.string(),
    content: v.string(), // Markdown
    type: v.union(
      v.literal("deliverable"),
      v.literal("research"),
      v.literal("protocol"),
      v.literal("reference")
    ),
    taskId: v.optional(v.id("tasks")),
    authorId: v.optional(v.id("agents")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_task", ["taskId"])
    .index("by_type", ["type"])
    .index("by_created", ["createdAt"]),

  notifications: defineTable({
    mentionedAgentId: v.id("agents"),
    taskId: v.optional(v.id("tasks")),
    messageId: v.optional(v.id("messages")),
    content: v.string(),
    delivered: v.boolean(),
    createdAt: v.number(),
    deliveredAt: v.optional(v.number()),
  })
    .index("by_agent", ["mentionedAgentId"])
    .index("by_delivered", ["delivered"])
    .index("by_created", ["createdAt"]),
});
