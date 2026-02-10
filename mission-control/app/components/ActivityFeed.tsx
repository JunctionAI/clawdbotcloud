"use client";

import { useState } from "react";

interface Activity {
  _id: any;
  _creationTime: number;
  type: string;
  agentId?: any;
  taskId?: any;
  message: string;
  createdAt: number;
  agent?: {
    name: string;
    role: string;
  } | null;
  task?: {
    title: string;
    status: string;
  } | null;
}

type FilterType = "all" | "tasks" | "agents" | "documents";

function getActivityIcon(type: string) {
  switch (type) {
    case "task_created":
      return "📝";
    case "task_updated":
      return "✏️";
    case "message_sent":
      return "💬";
    case "document_created":
      return "📄";
    case "agent_heartbeat":
      return "💓";
    case "agent_assigned":
      return "👤";
    case "status_changed":
      return "🔄";
    default:
      return "•";
  }
}

function getActivityColor(type: string) {
  switch (type) {
    case "task_created":
      return "border-green-500 bg-green-50";
    case "task_updated":
    case "status_changed":
      return "border-blue-500 bg-blue-50";
    case "message_sent":
      return "border-purple-500 bg-purple-50";
    case "document_created":
      return "border-yellow-500 bg-yellow-50";
    case "agent_heartbeat":
      return "border-pink-500 bg-pink-50";
    case "agent_assigned":
      return "border-orange-500 bg-orange-50";
    default:
      return "border-gray-500 bg-gray-50";
  }
}

function formatTime(timestamp: number) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString();
}

function formatFullTime(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}

function matchesFilter(activity: Activity, filter: FilterType): boolean {
  if (filter === "all") return true;
  if (filter === "tasks") {
    return ["task_created", "task_updated", "status_changed", "agent_assigned"].includes(
      activity.type
    );
  }
  if (filter === "agents") {
    return ["agent_heartbeat", "agent_assigned", "message_sent"].includes(activity.type);
  }
  if (filter === "documents") {
    return activity.type === "document_created";
  }
  return true;
}

export function ActivityFeed({ activities }: { activities: Activity[] }) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredActivities = activities.filter((a) => matchesFilter(a, filter));

  if (activities.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <div className="text-4xl mb-4">📡</div>
        <p className="font-medium">No activity yet</p>
        <p className="text-sm mt-2">Activity will appear here as agents work.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "tasks", "agents", "documents"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f === "all" && "All"}
            {f === "tasks" && "📋 Tasks"}
            {f === "agents" && "🤖 Agents"}
            {f === "documents" && "📄 Docs"}
          </button>
        ))}
      </div>

      {/* Activity count */}
      <div className="text-xs text-gray-500">
        Showing {filteredActivities.length} of {activities.length} activities
      </div>

      {/* Activity list */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {filteredActivities.map((activity) => {
          const isExpanded = expandedId === activity._id;
          return (
            <div
              key={activity._id}
              className={`border-l-4 pl-3 py-2 rounded-r transition-all cursor-pointer ${getActivityColor(
                activity.type
              )} ${isExpanded ? "shadow-md" : "hover:shadow-sm"}`}
              onClick={() => setExpandedId(isExpanded ? null : activity._id)}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">
                    {activity.message}
                  </p>
                  
                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-2 p-2 bg-white rounded text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span className="font-mono">{activity.type}</span>
                      </div>
                      {activity.agent && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Agent:</span>
                          <span>
                            {activity.agent.name} ({activity.agent.role})
                          </span>
                        </div>
                      )}
                      {activity.task && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Task:</span>
                          <span>
                            {activity.task.title} [{activity.task.status}]
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Time:</span>
                        <span>{formatFullTime(activity.createdAt)}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-1">
                    {activity.agent && (
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        🤖 {activity.agent.name}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {formatTime(activity.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load more hint */}
      {filteredActivities.length >= 50 && (
        <div className="text-center text-xs text-gray-400 py-2">
          Showing latest 50 activities
        </div>
      )}
    </div>
  );
}
