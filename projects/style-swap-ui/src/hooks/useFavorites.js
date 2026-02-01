import { useState, useEffect, useCallback } from 'react';

export const useFavorites = (maxItems = 20) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem('styleSwapFavorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorite = useCallback((look) => {
    const newFavorite = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...look
    };
    
    setFavorites(prev => {
      // Check if already favorited
      const exists = prev.some(f => f.transformedPhoto === look.transformedPhoto);
      if (exists) return prev;
      
      const updated = [newFavorite, ...prev].slice(0, maxItems);
      localStorage.setItem('styleSwapFavorites', JSON.stringify(updated));
      return updated;
    });
    
    return true;
  }, [maxItems]);

  const removeFavorite = useCallback((id) => {
    setFavorites(prev => {
      const updated = prev.filter(f => f.id !== id);
      localStorage.setItem('styleSwapFavorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isFavorite = useCallback((transformedPhoto) => {
    return favorites.some(f => f.transformedPhoto === transformedPhoto);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem('styleSwapFavorites');
  }, []);

  const exportFavorites = useCallback(() => {
    // Backend-ready export
    return {
      userId: 'user_' + Date.now(),
      favorites: favorites.map(f => ({
        lookId: f.id,
        items: f.items,
        timestamp: f.timestamp,
        imageUrl: f.transformedPhoto
      })),
      exportedAt: new Date().toISOString()
    };
  }, [favorites]);

  return {
    favorites,
    saveFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    exportFavorites
  };
};

export default useFavorites;
