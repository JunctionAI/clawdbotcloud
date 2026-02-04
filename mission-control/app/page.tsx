"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { AgentCards } from "./components/AgentCards";
import { ActivityFeed } from "./components/ActivityFeed";
import { TaskBoard } from "./components/TaskBoard";

export default function Home() {
  const agents = useQuery(api.agents.list);
  const activities = useQuery(api.activities.recent, { limit: 50 });
  const tasks = useQuery(api.tasks.list);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          🎯 Mission Control
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Real-time agent activity dashboard
        </p>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Agent Cards */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">🤖 Agents</h2>
              <AgentCards agents={agents ?? []} />
            </div>
          </div>

          {/* Middle column - Activity Feed */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">📡 Activity Feed</h2>
              <ActivityFeed activities={activities ?? []} />
            </div>
          </div>

          {/* Right column - Task Board Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">📋 Tasks</h2>
              <TaskBoard tasks={tasks ?? []} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
