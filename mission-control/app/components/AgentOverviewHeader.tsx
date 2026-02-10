"use client";

import { useMemo } from "react";

export interface AgentData {
  id: string;
  name: string;
  emoji: string;
  focus: string;
  project: string;
  status: "active" | "idle" | "blocked";
  heartbeatInterval: string;
  lastHeartbeat: string | null;
  capabilities: string[];
  currentTask: string | null;
  tasksCompleted: number;
  createdAt: string;
}

interface AgentOverviewHeaderProps {
  agents: AgentData[];
}

export function AgentOverviewHeader({ agents }: AgentOverviewHeaderProps) {
  const stats = useMemo(() => {
    const total = agents.length;
    const active = agents.filter((a) => a.status === "active").length;
    const idle = agents.filter((a) => a.status === "idle").length;
    const blocked = agents.filter((a) => a.status === "blocked").length;
    const totalCompleted = agents.reduce((sum, a) => sum + a.tasksCompleted, 0);
    
    // Find most recent activity
    const heartbeats = agents
      .filter((a) => a.lastHeartbeat)
      .map((a) => new Date(a.lastHeartbeat!).getTime());
    const lastActivity = heartbeats.length > 0 
      ? new Date(Math.max(...heartbeats))
      : null;

    return { total, active, idle, blocked, totalCompleted, lastActivity };
  }, [agents]);

  const formatLastActivity = (date: Date | null) => {
    if (!date) return "No activity yet";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 mb-6 shadow-lg border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          🤖 Agent Fleet Overview
        </h2>
        <div className="text-sm text-slate-400">
          Last activity: {formatLastActivity(stats.lastActivity)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Agents */}
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <div className="text-3xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-slate-400 flex items-center gap-1">
            <span>🤖</span> Total Agents
          </div>
        </div>
        
        {/* Active */}
        <div className="bg-green-900/30 rounded-lg p-4 border border-green-700/50">
          <div className="text-3xl font-bold text-green-400">{stats.active}</div>
          <div className="text-sm text-green-300/70 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Active
          </div>
        </div>
        
        {/* Idle */}
        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
          <div className="text-3xl font-bold text-slate-300">{stats.idle}</div>
          <div className="text-sm text-slate-400 flex items-center gap-1">
            <span className="w-2 h-2 bg-slate-400 rounded-full"></span> Idle
          </div>
        </div>
        
        {/* Blocked */}
        <div className="bg-red-900/30 rounded-lg p-4 border border-red-700/50">
          <div className="text-3xl font-bold text-red-400">{stats.blocked}</div>
          <div className="text-sm text-red-300/70 flex items-center gap-1">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span> Blocked
          </div>
        </div>
        
        {/* Tasks Completed */}
        <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700/50">
          <div className="text-3xl font-bold text-blue-400">{stats.totalCompleted}</div>
          <div className="text-sm text-blue-300/70 flex items-center gap-1">
            <span>✅</span> Tasks Done
          </div>
        </div>
      </div>
    </div>
  );
}
