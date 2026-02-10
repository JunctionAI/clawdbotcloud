"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AgentData } from "./AgentOverviewHeader";
import { AgentDetailModal } from "./AgentDetailModal";

interface EnhancedAgentCardsProps {
  agents: AgentData[];
}

function getStatusColor(status: AgentData["status"]) {
  switch (status) {
    case "active":
      return "border-green-500 bg-green-900/20";
    case "idle":
      return "border-slate-500 bg-slate-800/50";
    case "blocked":
      return "border-red-500 bg-red-900/20";
  }
}

function getStatusBadge(status: AgentData["status"]) {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border-green-500/50";
    case "idle":
      return "bg-slate-500/20 text-slate-400 border-slate-500/50";
    case "blocked":
      return "bg-red-500/20 text-red-400 border-red-500/50";
  }
}

function formatRelativeTime(dateStr: string | null) {
  if (!dateStr) return "Never";
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 0) return "Just now";
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function EnhancedAgentCards({ agents }: EnhancedAgentCardsProps) {
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (agents.length === 0) {
    return (
      <div className="text-center text-slate-500 py-8 bg-slate-800/30 rounded-xl border border-slate-700">
        <div className="text-4xl mb-3">🤖</div>
        <p className="font-medium">No agents registered yet.</p>
        <p className="text-sm mt-2">Run agent setup to add agents.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className={`border-l-4 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] bg-slate-800/80 backdrop-blur ${getStatusColor(agent.status)}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{agent.emoji}</span>
                <div>
                  <h3 className="font-bold text-white">{agent.name}</h3>
                  <p className="text-xs text-slate-400">{agent.project}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(agent.status)}`}>
                {agent.status}
              </span>
            </div>
            
            {/* Focus */}
            <p className="text-sm text-slate-300 mb-3 line-clamp-2">{agent.focus}</p>
            
            {/* Current Task */}
            {agent.currentTask && (
              <div className="bg-blue-900/30 border border-blue-700/40 rounded-lg p-2 mb-3">
                <p className="text-xs text-blue-300 font-medium">Current Task</p>
                <p className="text-sm text-white truncate">{agent.currentTask}</p>
              </div>
            )}
            
            {/* Capabilities Preview */}
            <div className="mb-3">
              <p className="text-xs text-slate-500 mb-1.5">Capabilities</p>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.slice(0, 3).map((cap, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-0.5 bg-slate-700/70 text-slate-300 rounded text-xs"
                  >
                    {cap}
                  </span>
                ))}
                {agent.capabilities.length > 3 && (
                  <span className="px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded text-xs">
                    +{agent.capabilities.length - 3}
                  </span>
                )}
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700 pt-3 mt-3">
              <div className="flex items-center gap-1">
                <span>✅</span>
                <span>{agent.tasksCompleted} completed</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💓</span>
                <span>{formatRelativeTime(agent.lastHeartbeat)}</span>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2 mt-3">
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="flex-1 text-xs bg-blue-600/80 hover:bg-blue-600 text-white py-1.5 px-2 rounded-lg transition-colors"
              >
                🚀 Spawn
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="flex-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 py-1.5 px-2 rounded-lg transition-colors"
              >
                📊 History
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="flex-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 py-1.5 px-2 rounded-lg transition-colors"
              >
                🔄 Status
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Detail Modal - rendered via portal to avoid z-index issues */}
      {mounted && selectedAgent && createPortal(
        <AgentDetailModal 
          agent={selectedAgent} 
          onClose={() => setSelectedAgent(null)} 
        />,
        document.body
      )}
    </>
  );
}
