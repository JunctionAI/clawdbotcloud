"use client";

import { useState, useEffect } from "react";

// Mock data for demo (replace with Convex queries later)
const mockAgents = [
  { id: 1, name: "PREP", status: "active", tasksCompleted: 47, uptime: "99.7%", cpu: 23, memory: 45 },
  { id: 2, name: "JARVIS", status: "active", tasksCompleted: 156, uptime: "99.9%", cpu: 45, memory: 62 },
  { id: 3, name: "SHURI", status: "idle", tasksCompleted: 89, uptime: "98.5%", cpu: 5, memory: 28 },
  { id: 4, name: "FURY", status: "active", tasksCompleted: 234, uptime: "99.2%", cpu: 67, memory: 71 },
];

const mockTasks = [
  { id: 1, title: "Morning Briefing", status: "completed", agent: "PREP", priority: "high" },
  { id: 2, title: "Email Intelligence Scan", status: "in_progress", agent: "JARVIS", priority: "medium" },
  { id: 3, title: "TWG Website Analysis", status: "pending", agent: "SHURI", priority: "high" },
  { id: 4, title: "Financial Dashboard Update", status: "in_progress", agent: "FURY", priority: "low" },
];

const mockActivities = [
  { id: 1, message: "PREP completed Morning Briefing", time: "2 min ago", type: "success" },
  { id: 2, message: "JARVIS scanning 847 emails", time: "5 min ago", type: "info" },
  { id: 3, message: "System health check passed", time: "12 min ago", type: "success" },
  { id: 4, message: "FURY detected anomaly in data", time: "18 min ago", type: "warning" },
];

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <span className="counter-value">{count}</span>;
}

function ProgressRing({ progress, size = 120 }: { progress: number; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <svg width={size} height={size} className="progress-ring">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(0, 240, 255, 0.1)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        className="progress-ring-circle"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

function HUDCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`hud-card hud-corner-br p-6 ${className}`}>
      {children}
    </div>
  );
}

function AgentCard({ agent }: { agent: typeof mockAgents[0] }) {
  return (
    <HUDCard className="hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white font-['Orbitron']">{agent.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`status-dot ${agent.status === 'active' ? 'status-active' : 'status-warning'}`}></span>
            <span className="text-sm text-slate-400 uppercase tracking-wider">{agent.status}</span>
          </div>
        </div>
        <div className="relative">
          <ProgressRing progress={agent.cpu} size={60} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-cyan-400 font-mono">{agent.cpu}%</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">CPU USAGE</span>
            <span className="text-cyan-400 font-mono">{agent.cpu}%</span>
          </div>
          <div className="h-1 bg-slate-800 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
              style={{ width: `${agent.cpu}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">MEMORY</span>
            <span className="text-purple-400 font-mono">{agent.memory}%</span>
          </div>
          <div className="h-1 bg-slate-800 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
              style={{ width: `${agent.memory}%` }}
            />
          </div>
        </div>
        
        <div className="flex justify-between pt-2 border-t border-slate-700/50">
          <div className="text-center">
            <div className="text-lg font-bold text-white font-mono">{agent.tasksCompleted}</div>
            <div className="text-[10px] text-slate-500 uppercase">Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400 font-mono">{agent.uptime}</div>
            <div className="text-[10px] text-slate-500 uppercase">Uptime</div>
          </div>
        </div>
      </div>
    </HUDCard>
  );
}

function ActivityItem({ activity }: { activity: typeof mockActivities[0] }) {
  const typeColors = {
    success: "text-green-400 border-green-400/30 bg-green-400/5",
    info: "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
    warning: "text-orange-400 border-orange-400/30 bg-orange-400/5",
  };
  
  return (
    <div className={`flex items-center gap-3 p-3 rounded border ${typeColors[activity.type as keyof typeof typeColors]} transition-all hover:bg-opacity-20`}>
      <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-400' : activity.type === 'warning' ? 'bg-orange-400' : 'bg-cyan-400'} animate-pulse`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">{activity.message}</p>
        <p className="text-xs text-slate-500">{activity.time}</p>
      </div>
    </div>
  );
}

function TaskItem({ task }: { task: typeof mockTasks[0] }) {
  const statusConfig = {
    completed: { color: "text-green-400", bg: "bg-green-400/10", icon: "✓" },
    in_progress: { color: "text-cyan-400", bg: "bg-cyan-400/10", icon: "◉" },
    pending: { color: "text-slate-400", bg: "bg-slate-400/10", icon: "○" },
  };
  
  const config = statusConfig[task.status as keyof typeof statusConfig];
  
  return (
    <div className={`flex items-center gap-3 p-4 rounded border border-slate-700/50 ${config.bg} hover:border-cyan-400/30 transition-all`}>
      <span className={`text-lg ${config.color}`}>{config.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{task.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-slate-500">Agent: {task.agent}</span>
          <span className={`text-xs px-2 py-0.5 rounded ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' : task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-500/20 text-slate-400'}`}>
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="jarvis-bg min-h-screen relative">
      {/* Animated overlays */}
      <div className="grid-overlay"></div>
      <div className="scanline"></div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      {/* Header */}
      <header className="relative z-50 border-b border-cyan-400/20 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"></div>
                </div>
                <div className="absolute -inset-1 rounded-full border border-cyan-400/30 animate-ping"></div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold font-['Orbitron'] glow-text tracking-wider">
                  MISSION CONTROL
                </h1>
                <p className="text-xs text-cyan-400/60 font-['Share_Tech_Mono'] tracking-widest">
                  AUTONOMOUS AGENT COMMAND CENTER
                </p>
              </div>
            </div>
            
            {/* Time display */}
            <div className="text-right">
              <div className="text-3xl font-['Share_Tech_Mono'] text-cyan-400 glow-text tracking-wider">
                {formattedTime}
              </div>
              <div className="text-xs text-slate-400 font-['Rajdhani'] tracking-wider uppercase">
                {formattedDate}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="relative z-40 border-b border-cyan-400/10 bg-slate-900/30 backdrop-blur">
        <div className="container mx-auto px-6">
          <div className="flex">
            {["overview", "agents", "tasks", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`hud-tab ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <div className="relative z-30 container mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "ACTIVE AGENTS", value: 3, color: "cyan" },
            { label: "TASKS COMPLETED", value: 526, color: "green" },
            { label: "IN PROGRESS", value: 12, color: "purple" },
            { label: "SYSTEM HEALTH", value: 98, suffix: "%", color: "cyan" },
          ].map((stat, i) => (
            <HUDCard key={i}>
              <div className="text-center">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-['Rajdhani']">
                  {stat.label}
                </div>
                <div className={`text-4xl font-bold font-['Share_Tech_Mono'] ${
                  stat.color === 'cyan' ? 'text-cyan-400 glow-text' : 
                  stat.color === 'green' ? 'text-green-400 glow-text-green' : 
                  'text-purple-400 glow-text-purple'
                }`}>
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix || ''}
                </div>
              </div>
            </HUDCard>
          ))}
        </div>
        
        {/* Main grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Agents section */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-6 bg-cyan-400 rounded"></div>
              <h2 className="text-lg font-bold text-white font-['Orbitron'] tracking-wider">
                ACTIVE AGENTS
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {mockAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
          
          {/* Activity feed */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-6 bg-purple-400 rounded"></div>
              <h2 className="text-lg font-bold text-white font-['Orbitron'] tracking-wider">
                ACTIVITY FEED
              </h2>
            </div>
            <HUDCard className="max-h-[400px] overflow-y-auto">
              <div className="space-y-3">
                {mockActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </HUDCard>
          </div>
        </div>
        
        {/* Tasks section */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-green-400 rounded"></div>
            <h2 className="text-lg font-bold text-white font-['Orbitron'] tracking-wider">
              TASK QUEUE
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {mockTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-30 border-t border-cyan-400/10 bg-slate-900/30 backdrop-blur mt-8 py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-['Share_Tech_Mono']">
            <span>SYSTEM STATUS: <span className="text-green-400">OPERATIONAL</span></span>
            <span>CLAWDBOT MISSION CONTROL v2.0</span>
            <span>UPTIME: 99.97%</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
