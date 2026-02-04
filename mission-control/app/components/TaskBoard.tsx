interface Task {
  _id: any;
  _creationTime: number;
  title: string;
  description: string;
  status: "inbox" | "assigned" | "in_progress" | "review" | "done" | "blocked";
  assigneeIds: any[];
  createdAt: number;
  updatedAt: number;
}

function getStatusColor(status: Task["status"]) {
  switch (status) {
    case "inbox":
      return "bg-gray-100 text-gray-800";
    case "assigned":
      return "bg-blue-100 text-blue-800";
    case "in_progress":
      return "bg-yellow-100 text-yellow-800";
    case "review":
      return "bg-purple-100 text-purple-800";
    case "done":
      return "bg-green-100 text-green-800";
    case "blocked":
      return "bg-red-100 text-red-800";
  }
}

function getStatusLabel(status: Task["status"]) {
  switch (status) {
    case "inbox":
      return "📥 Inbox";
    case "assigned":
      return "👤 Assigned";
    case "in_progress":
      return "🔨 In Progress";
    case "review":
      return "👀 Review";
    case "done":
      return "✅ Done";
    case "blocked":
      return "🚫 Blocked";
  }
}

export function TaskBoard({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No tasks yet.</p>
        <p className="text-sm mt-2">Create a task to get started.</p>
      </div>
    );
  }

  // Group tasks by status
  const tasksByStatus = tasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const statuses: Task["status"][] = [
    "inbox",
    "assigned",
    "in_progress",
    "review",
    "done",
    "blocked",
  ];

  return (
    <div className="space-y-4">
      {statuses.map((status) => {
        const statusTasks = tasksByStatus[status] || [];
        if (statusTasks.length === 0) return null;

        return (
          <div key={status} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">{getStatusLabel(status)}</h3>
              <span className="text-xs text-gray-500">{statusTasks.length}</span>
            </div>
            <div className="space-y-2">
              {statusTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-50 border border-gray-200 rounded p-2 hover:shadow-sm transition-shadow cursor-pointer"
                >
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                  {task.assigneeIds.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">
                        {task.assigneeIds.length} assignee(s)
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
