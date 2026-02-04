interface Agent {
  _id: any;
  _creationTime: number;
  name: string;
  role: string;
  status: "idle" | "active" | "blocked";
  currentTaskId?: any;
  sessionKey: string;
  lastHeartbeat?: number;
}

function getStatusColor(status: Agent["status"]) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "idle":
      return "bg-gray-100 text-gray-800";
    case "blocked":
      return "bg-red-100 text-red-800";
  }
}

function getStatusEmoji(status: Agent["status"]) {
  switch (status) {
    case "active":
      return "🟢";
    case "idle":
      return "⚪";
    case "blocked":
      return "🔴";
  }
}

function formatLastSeen(timestamp?: number) {
  if (!timestamp) return "Never";
  
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

export function AgentCards({ agents }: { agents: Agent[] }) {
  if (agents.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No agents registered yet.</p>
        <p className="text-sm mt-2">Run agent setup to add agents.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {agents.map((agent) => (
        <div
          key={agent._id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getStatusEmoji(agent.status)}</span>
                <h3 className="font-semibold text-gray-900">{agent.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">{agent.role}</p>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                agent.status
              )}`}
            >
              {agent.status}
            </span>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Last seen: {formatLastSeen(agent.lastHeartbeat)}
          </div>
        </div>
      ))}
    </div>
  );
}
