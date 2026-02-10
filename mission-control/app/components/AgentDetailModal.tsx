"use client";

import { useEffect, useState } from "react";
import { AgentData } from "./AgentOverviewHeader";

interface QueueTask {
  id: string;
  title: string;
  status: string;
  priority?: string;
}

interface QueueData {
  agent: string;
  project: string;
  tasks: QueueTask[];
}

interface AgentDetailModalProps {
  agent: AgentData | null;
  onClose: () => void;
}

export function AgentDetailModal({ agent, onClose }: AgentDetailModalProps) {
  const [queueData, setQueueData] = useState<QueueData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!agent) return;
    
    // Load queue data for the agent
    const loadQueue = async () => {
      setLoading(true);
      try {
        // Map agent id to queue file
        const queueMap: Record<string, string> = {
          "alternate-agent": "queue-alternate.json",
          "junction-agent": "queue-junction.json",
          "personal-agent": "queue-personal.json",
        };
        
        const queueFile = queueMap[agent.id];
        if (queueFile) {
          const res = await fetch(`/api/queue?file=${queueFile}`);
          if (res.ok) {
            const data = await res.json();
            setQueueData(data);
          }
        }
      } catch (err) {
        console.error("Failed to load queue:", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadQueue();
  }, [agent]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!agent) return null;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Never";
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const formatRelativeTime = (dateStr: string | null) => {
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
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "idle": return "bg-slate-400";
      case "blocked": return "bg-red-500";
      default: return "bg-slate-400";
    }
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "done": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "ready": return "bg-yellow-100 text-yellow-800";
      case "blocked": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div 
      className="z-[9999] flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        className="rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-700"
        style={{ backgroundColor: 'rgb(15, 23, 42)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{agent.emoji}</div>
              <div>
                <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
                <p className="text-slate-400 mt-1">{agent.focus}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`}></span>
                  <span className="text-sm text-slate-300 capitalize">{agent.status}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-sm text-slate-400">{agent.project}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-2xl font-bold text-white">{agent.tasksCompleted}</div>
              <div className="text-sm text-slate-400">Tasks Completed</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-lg font-bold text-white">{agent.heartbeatInterval}</div>
              <div className="text-sm text-slate-400">Heartbeat Interval</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="text-lg font-bold text-white">{formatRelativeTime(agent.lastHeartbeat)}</div>
              <div className="text-sm text-slate-400">Last Heartbeat</div>
            </div>
          </div>
          
          {/* Current Task */}
          {agent.currentTask && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Current Task
              </h3>
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                <p className="text-white">{agent.currentTask}</p>
              </div>
            </div>
          )}
          
          {/* Capabilities */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Capabilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {agent.capabilities.map((cap, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-sm border border-slate-700"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
          
          {/* Task Queue */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Task Queue
            </h3>
            {loading ? (
              <div className="text-slate-400 text-center py-4">Loading queue...</div>
            ) : queueData ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {queueData.tasks.slice(0, 10).map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between bg-slate-800 rounded-lg p-3 border border-slate-700"
                  >
                    <div className="flex-1">
                      <p className="text-white text-sm">{task.title}</p>
                      <p className="text-xs text-slate-500">{task.id}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTaskStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                ))}
                {queueData.tasks.length > 10 && (
                  <p className="text-slate-500 text-sm text-center py-2">
                    +{queueData.tasks.length - 10} more tasks
                  </p>
                )}
              </div>
            ) : (
              <div className="text-slate-500 text-center py-4 bg-slate-800/50 rounded-lg">
                No queue data available
              </div>
            )}
          </div>
          
          {/* Metadata */}
          <div className="text-xs text-slate-500 border-t border-slate-700 pt-4">
            <p>Created: {formatDate(agent.createdAt)}</p>
            <p>Agent ID: {agent.id}</p>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="bg-slate-800 p-4 border-t border-slate-700 flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            🚀 Spawn Task
          </button>
          <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            📊 View History
          </button>
          <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            🔄 Check Status
          </button>
        </div>
      </div>
    </div>
  );
}
