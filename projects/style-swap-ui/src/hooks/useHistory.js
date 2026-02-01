import { useState, useEffect, useCallback } from 'react';

export const useHistory = (maxItems = 50) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const saved = localStorage.getItem('styleSwapHistory');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const addToHistory = useCallback((entry) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...entry
    };
    
    setHistory(prev => {
      const updated = [newEntry, ...prev].slice(0, maxItems);
      localStorage.setItem('styleSwapHistory', JSON.stringify(updated));
      return updated;
    });
  }, [maxItems]);

  const removeFromHistory = useCallback((id) => {
    setHistory(prev => {
      const updated = prev.filter(h => h.id !== id);
      localStorage.setItem('styleSwapHistory', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('styleSwapHistory');
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
};

export default useHistory;
