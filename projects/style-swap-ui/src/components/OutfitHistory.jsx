import React, { useState, useEffect } from 'react';
import { Clock, Trash2, RefreshCw, Download } from 'lucide-react';

const OutfitHistory = ({ isOpen, onClose, onRestore }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const saved = localStorage.getItem('styleSwapHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  };

  const addToHistory = (entry) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...entry
    };
    const updated = [newEntry, ...history].slice(0, 50); // Keep last 50
    setHistory(updated);
    localStorage.setItem('styleSwapHistory', JSON.stringify(updated));
  };

  const clearHistory = () => {
    if (confirm('Clear all history?')) {
      setHistory([]);
      localStorage.removeItem('styleSwapHistory');
    }
  };

  const deleteEntry = (id) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('styleSwapHistory', JSON.stringify(updated));
  };

  const downloadEntry = (entry) => {
    const link = document.createElement('a');
    link.download = `outfit-${entry.id}.png`;
    link.href = entry.transformedPhoto || entry.userPhoto;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[50px] max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-blue-400" />
            <h2 className="text-xl font-black text-white tracking-tight">Outfit History</h2>
            <span className="text-xs text-white/40 font-bold">
              {history.length} {history.length === 1 ? 'try' : 'tries'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={clearHistory}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-2xl text-red-400 text-xs font-bold transition-all"
            >
              Clear All
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {history.length === 0 ? (
            <div className="text-center py-20">
              <Clock size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-sm">No outfit history yet</p>
              <p className="text-white/20 text-xs mt-2">Start trying on outfits to build your history</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {history.map((entry) => (
                <div 
                  key={entry.id}
                  className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={entry.transformedPhoto || entry.userPhoto} 
                      alt="History entry"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => onRestore(entry)}
                        className="p-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/30 transition-all active:scale-90"
                        title="Restore"
                      >
                        <RefreshCw size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => downloadEntry(entry)}
                        className="p-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/30 transition-all active:scale-90"
                        title="Download"
                      >
                        <Download size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="p-3 bg-red-500/20 backdrop-blur-xl rounded-full border border-red-500/20 hover:bg-red-500/30 transition-all active:scale-90"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>

                    {/* Date badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-xl rounded-full text-white text-[9px] font-bold">
                      {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-[10px] text-white/60 font-bold truncate">
                      {entry.items && Object.values(entry.items).filter(Boolean).map(i => i.name).join(' + ')}
                    </p>
                    <p className="text-[9px] text-white/30 mt-1">
                      {new Date(entry.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { OutfitHistory };
export default OutfitHistory;
