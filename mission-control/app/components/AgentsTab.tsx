"use client";

import { useEffect, useState } from "react";
import { AgentOverviewHeader, AgentData } from "./AgentOverviewHeader";
import { EnhancedAgentCards } from "./EnhancedAgentCards";

export function AgentsTab() {
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const res = await fetch("/api/agents");
        if (!res.ok) throw new Error("Failed to fetch agents");
        const data = await res.json();
        setAgents(data.agents || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadAgents();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadAgents, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🔄</div>
          <p className="text-slate-400">Loading agents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-red-400 font-medium">Failed to load agents</p>
        <p className="text-sm text-red-300/70 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <AgentOverviewHeader agents={agents} />
      <EnhancedAgentCards agents={agents} />
    </div>
  );
}
