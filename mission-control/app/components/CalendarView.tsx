"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface ScheduledItem {
  type: "task" | "job";
  id: any;
  title: string;
  time: number;
  description: string;
  status?: string;
}

function getWeekStart(date: Date): number {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarView() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    getWeekStart(new Date())
  );

  const weeklySchedule = useQuery(api.scheduledJobs.getWeeklySchedule, {
    weekStart: currentWeekStart,
  });

  const upcomingJobs = useQuery(api.scheduledJobs.upcoming, { hours: 168 }); // 7 days

  const weekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(currentWeekStart + i * 24 * 60 * 60 * 1000);
    }
    return days;
  }, [currentWeekStart]);

  const goToPrevWeek = () => {
    setCurrentWeekStart((prev) => prev - 7 * 24 * 60 * 60 * 1000);
  };

  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => prev + 7 * 24 * 60 * 60 * 1000);
  };

  const goToToday = () => {
    setCurrentWeekStart(getWeekStart(new Date()));
  };

  const isToday = (timestamp: number): boolean => {
    const today = new Date();
    const date = new Date(timestamp);
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  };

  const getItemColor = (item: ScheduledItem): string => {
    if (item.type === "job") {
      return "bg-purple-100 border-purple-400 text-purple-800";
    }
    switch (item.status) {
      case "in_progress":
        return "bg-blue-100 border-blue-400 text-blue-800";
      case "done":
        return "bg-green-100 border-green-400 text-green-800";
      case "blocked":
        return "bg-red-100 border-red-400 text-red-800";
      default:
        return "bg-gray-100 border-gray-400 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ←
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Today
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            →
          </button>
        </div>
        <span className="text-sm text-gray-600">
          {formatDate(currentWeekStart)} - {formatDate(currentWeekStart + 6 * 24 * 60 * 60 * 1000)}
        </span>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={`text-center py-2 text-xs font-medium ${
              isToday(day)
                ? "bg-blue-500 text-white rounded-t-lg"
                : "text-gray-500"
            }`}
          >
            <div>{DAY_NAMES[i]}</div>
            <div className="text-lg font-bold">{new Date(day).getDate()}</div>
          </div>
        ))}

        {/* Day cells with items */}
        {weekDays.map((day) => {
          const items = weeklySchedule?.[day] ?? [];
          return (
            <div
              key={`items-${day}`}
              className={`min-h-[120px] p-1 border rounded-b-lg ${
                isToday(day) ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              {items.length === 0 ? (
                <div className="text-xs text-gray-400 text-center py-4">
                  No events
                </div>
              ) : (
                <div className="space-y-1">
                  {items.map((item: ScheduledItem) => (
                    <div
                      key={item.id}
                      className={`p-1 text-xs rounded border-l-2 ${getItemColor(
                        item
                      )}`}
                    >
                      <div className="font-medium truncate">{item.title}</div>
                      <div className="text-[10px] opacity-75">
                        {formatTime(item.time)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upcoming jobs section */}
      {upcomingJobs && upcomingJobs.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            ⏰ Upcoming Scheduled Jobs
          </h3>
          <div className="space-y-2">
            {upcomingJobs.slice(0, 5).map((job) => (
              <div
                key={job._id}
                className="flex items-center justify-between p-2 bg-purple-50 rounded-lg text-sm"
              >
                <div>
                  <span className="font-medium">{job.name}</span>
                  <span className="text-gray-500 ml-2 text-xs">
                    {job.cronExpression}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  {formatDate(job.nextRun)} {formatTime(job.nextRun)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
