import React, { useState, useEffect } from 'react';
import { Heart, Trash2, X, ShoppingBag } from 'lucide-react';

const FavoritesManager = ({ isOpen, onClose, onLoadLook }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const saved = localStorage.getItem('styleSwapFavorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const saveFavorite = (look) => {
    const newFavorite = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...look
    };
    const updated = [newFavorite, ...favorites].slice(0, 20); // Keep max 20
    setFavorites(updated);
    localStorage.setItem('styleSwapFavorites', JSON.stringify(updated));
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem('styleSwapFavorites', JSON.stringify(updated));
  };

  const exportFavorites = () => {
    // Backend-ready: returns data structure
    return {
      userId: 'user_' + Date.now(), // Would be actual user ID
      favorites: favorites.map(f => ({
        lookId: f.id,
        items: f.items,
        timestamp: f.timestamp,
        imageUrl: f.transformedPhoto // Would be uploaded to CDN
      }))
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200] flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[50px] max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Heart size={20} className="text-red-400" />
            <h2 className="text-xl font-black text-white tracking-tight">Saved Looks</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90"
          >
            <X size={20} className="text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favorites.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-sm">No saved looks yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {favorites.map((fav) => (
                <div 
                  key={fav.id}
                  className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={fav.transformedPhoto || fav.userPhoto} 
                      alt="Saved look"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Item badges */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 flex-wrap">
                      {fav.items && Object.entries(fav.items).map(([category, item]) => item && (
                        <span 
                          key={category}
                          className="text-[8px] px-2 py-1 bg-white/20 backdrop-blur-xl rounded-full text-white font-bold uppercase"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onLoadLook(fav)}
                        className="p-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/30 transition-all active:scale-90"
                      >
                        <ShoppingBag size={14} className="text-white" />
                      </button>
                      <button
                        onClick={() => removeFavorite(fav.id)}
                        className="p-2 bg-red-500/20 backdrop-blur-xl rounded-full border border-red-500/20 hover:bg-red-500/30 transition-all active:scale-90"
                      >
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="p-3">
                    <p className="text-[10px] text-white/40 font-bold">
                      {new Date(fav.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Export for Backend */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              const data = exportFavorites();
              console.log('Backend-ready data:', data);
              // In production: POST to /api/favorites/sync
            }}
            className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white text-xs font-black uppercase tracking-widest transition-all"
          >
            Sync to Cloud (Backend Ready)
          </button>
        </div>
      </div>
    </div>
  );
};

export { FavoritesManager };
export default FavoritesManager;
