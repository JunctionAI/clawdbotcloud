import React from 'react';
import { ShoppingBag, Shirt, Footprints } from 'lucide-react';

const MultiItemSelector = ({ 
  selectedItems, 
  onItemSelect, 
  isProcessing, 
  category = 'top' 
}) => {
  const itemOptions = {
    top: [
      { id: 'linen', name: 'Linen', icon: '👔', price: '$89', prompt: "a crisp white linen button-up shirt" },
      { id: 'leather', name: 'Leather', icon: '🧥', price: '$249', prompt: "a black leather biker jacket with silver zippers" },
      { id: 'flannel', name: 'Flannel', icon: '👕', price: '$65', prompt: "a red buffalo plaid flannel shirt" },
      { id: 'cashmere', name: 'Cashmere', icon: '🧶', price: '$180', prompt: "a light grey cashmere sweater" },
      { id: 'denim', name: 'Denim', icon: '🧥', price: '$110', prompt: "a vintage blue denim jacket" },
      { id: 'trench', name: 'Trench', icon: '🧥', price: '$320', prompt: "a classic tan trench coat" },
      { id: 'hoodie', name: 'Hoodie', icon: '🧥', price: '$95', prompt: "a black techwear hoodie" },
    ],
    bottom: [
      { id: 'jeans', name: 'Denim', icon: '👖', price: '$120', prompt: "dark blue slim-fit denim jeans" },
      { id: 'chinos', name: 'Chinos', icon: '👖', price: '$85', prompt: "khaki slim-fit chino pants" },
      { id: 'cargo', name: 'Cargo', icon: '👖', price: '$95', prompt: "olive green cargo pants with multiple pockets" },
      { id: 'joggers', name: 'Joggers', icon: '👖', price: '$75', prompt: "black athletic jogger pants" },
      { id: 'slacks', name: 'Slacks', icon: '👖', price: '$140', prompt: "grey wool dress slacks" },
    ],
    shoes: [
      { id: 'sneakers', name: 'Sneakers', icon: '👟', price: '$150', prompt: "white leather sneakers" },
      { id: 'boots', name: 'Boots', icon: '🥾', price: '$220', prompt: "brown leather chelsea boots" },
      { id: 'loafers', name: 'Loafers', icon: '👞', price: '$180', prompt: "black leather loafers" },
      { id: 'runners', name: 'Runners', icon: '👟', price: '$130', prompt: "black and white running shoes" },
    ]
  };

  const options = itemOptions[category] || [];
  const categoryIcon = {
    top: <Shirt size={16} />,
    bottom: <ShoppingBag size={16} />,
    shoes: <Footprints size={16} />
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-2">
        <div className="text-white/60">{categoryIcon[category]}</div>
        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">
          {category}
        </h3>
      </div>
      
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x">
        {options.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemSelect(category, item)}
            disabled={isProcessing}
            className={`flex-shrink-0 w-20 h-28 rounded-3xl border transition-all flex flex-col items-center justify-center gap-2 snap-center active:scale-95 ${
              selectedItems[category]?.id === item.id
                ? 'bg-white/20 border-white/40 shadow-2xl scale-105'
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[8px] font-black text-white uppercase tracking-wider">{item.name}</span>
            <span className="text-[7px] text-white/40 font-bold">{item.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiItemSelector;
