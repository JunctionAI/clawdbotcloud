"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface SearchResult {
  type: "task" | "document" | "activity" | "agent";
  id: any;
  title: string;
  preview: string;
  createdAt: number;
  status?: string;
  docType?: string;
  activityType?: string;
}

function getTypeIcon(type: string): string {
  switch (type) {
    case "task":
      return "📋";
    case "document":
      return "📄";
    case "activity":
      return "📡";
    case "agent":
      return "🤖";
    default:
      return "•";
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case "task":
      return "bg-blue-100 text-blue-700";
    case "document":
      return "bg-green-100 text-green-700";
    case "activity":
      return "bg-purple-100 text-purple-700";
    case "agent":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString();
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchResults = useQuery(
    api.search.globalSearch,
    debouncedQuery.length >= 2 ? { query: debouncedQuery, limit: 20 } : "skip"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length >= 2) {
      setIsOpen(true);
    }
  };

  const handleFocus = () => {
    if (query.length >= 2) {
      setIsOpen(true);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder="Search tasks, documents, activity... (⌘K)"
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-50">
          {!searchResults ? (
            <div className="p-4 text-center text-gray-500">
              <span className="animate-pulse">Searching...</span>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : (
            <div className="py-2">
              {/* Group results by type */}
              {(["task", "document", "agent", "activity"] as const).map(
                (type) => {
                  const typeResults = searchResults.filter(
                    (r: SearchResult) => r.type === type
                  );
                  if (typeResults.length === 0) return null;

                  return (
                    <div key={type}>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
                        {getTypeIcon(type)} {type}s ({typeResults.length})
                      </div>
                      {typeResults.map((result: SearchResult) => (
                        <div
                          key={result.id}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`text-xs px-2 py-1 rounded ${getTypeColor(
                                result.type
                              )}`}
                            >
                              {result.type}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">
                                {result.title}
                              </div>
                              <div className="text-sm text-gray-500 truncate mt-1">
                                {result.preview}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {formatTime(result.createdAt)}
                                {result.status && (
                                  <span className="ml-2 px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
                                    {result.status}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
              )}
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 bg-gray-50 border-t text-xs text-gray-500 flex justify-between">
            <span>
              Press <kbd className="px-1 py-0.5 bg-gray-200 rounded">↵</kbd> to
              select
            </span>
            <span>
              Press <kbd className="px-1 py-0.5 bg-gray-200 rounded">ESC</kbd>{" "}
              to close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
