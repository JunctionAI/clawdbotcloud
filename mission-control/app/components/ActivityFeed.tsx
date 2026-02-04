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
  } | null;
}

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

function formatTime(timestamp: number) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ActivityFeed({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No activity yet.</p>
        <p className="text-sm mt-2">Activity will appear here as agents work.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto">
      {activities.map((activity) => (
        <div
          key={activity._id}
          className="border-l-4 border-blue-500 pl-3 py-2 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start gap-2">
            <span className="text-lg flex-shrink-0">
              {getActivityIcon(activity.type)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              {activity.agent && (
                <p className="text-xs text-gray-500 mt-1">
                  {activity.agent.name}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {formatTime(activity.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
