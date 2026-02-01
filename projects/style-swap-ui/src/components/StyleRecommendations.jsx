import React, { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Star } from 'lucide-react';

const StyleRecommendations = ({ selectedItems, onRecommendation }) => {
  const [recommendations, setRecommendations] = useState([]);

  // Smart recommendation engine based on selected items
  useEffect(() => {
    generateRecommendations();
  }, [selectedItems]);

  const styleRules = {
    // Top suggestions based on existing selections
    top: {
      leather: { 
        bottoms: ['jeans', 'cargo'], 
        shoes: ['boots', 'sneakers'],
        style: 'Edgy & Urban'
      },
      linen: { 
        bottoms: ['chinos', 'slacks'], 
        shoes: ['loafers', 'runners'],
        style: 'Smart Casual'
      },
      flannel: { 
        bottoms: ['jeans', 'cargo'], 
        shoes: ['boots', 'sneakers'],
        style: 'Casual & Rugged'
      },
      cashmere: { 
        bottoms: ['slacks', 'chinos'], 
        shoes: ['loafers', 'boots'],
        style: 'Refined & Elegant'
      },
      hoodie: { 
        bottoms: ['joggers', 'jeans'], 
        shoes: ['sneakers', 'runners'],
        style: 'Athletic & Comfy'
      }
    },
    
    // Seasonal recommendations
    seasons: {
      leather: 'fall',
      flannel: 'winter',
      linen: 'summer',
      cashmere: 'winter',
      hoodie: 'all-season'
    },

    // Color harmony
    colorPairings: {
      black: ['white', 'grey', 'navy'],
      white: ['black', 'blue', 'khaki'],
      grey: ['navy', 'black', 'burgundy']
    }
  };

  const generateRecommendations = () => {
    const recs = [];
    const top = selectedItems.top;
    const bottom = selectedItems.bottom;
    const shoes = selectedItems.shoes;

    if (top && !bottom) {
      const rule = styleRules.top[top.id];
      if (rule) {
        recs.push({
          type: 'bottom',
          suggestions: rule.bottoms,
          reason: `Perfect match for ${top.name}`,
          style: rule.style
        });
      }
    }

    if (top && !shoes) {
      const rule = styleRules.top[top.id];
      if (rule) {
        recs.push({
          type: 'shoes',
          suggestions: rule.shoes,
          reason: `Completes your ${top.name} look`,
          style: rule.style
        });
      }
    }

    if ((top || bottom) && !shoes) {
      recs.push({
        type: 'shoes',
        suggestions: ['sneakers', 'boots'],
        reason: 'Versatile footwear options',
        style: 'Universal'
      });
    }

    // Add style insights
    if (top && bottom && shoes) {
      const season = styleRules.seasons[top.id];
      recs.push({
        type: 'insight',
        message: `This ${rule?.style || 'outfit'} works great for ${season} season!`,
        confidence: 0.92
      });
    }

    setRecommendations(recs);
  };

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-2 px-2">
        <Sparkles size={14} className="text-purple-400" />
        <h4 className="text-[9px] font-black text-white/60 uppercase tracking-[0.4em]">
          AI Recommendations
        </h4>
      </div>

      <div className="space-y-2">
        {recommendations.map((rec, idx) => (
          <div 
            key={idx}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-4 backdrop-blur-xl"
          >
            {rec.type === 'insight' ? (
              <div className="flex items-start gap-3">
                <TrendingUp size={16} className="text-purple-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-white text-xs font-bold">{rec.message}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={10} className="text-yellow-400" />
                    <span className="text-[9px] text-white/40 font-bold">
                      {(rec.confidence * 100).toFixed(0)}% Match
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-2">
                  Try adding {rec.type}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {rec.suggestions.map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => onRecommendation(rec.type, suggestion)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-[10px] font-bold transition-all active:scale-95"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <p className="text-white/40 text-[9px] font-bold">
                  {rec.reason} · {rec.style}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleRecommendations;
