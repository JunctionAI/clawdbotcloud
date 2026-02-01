import React, { useState, useEffect } from 'react';
import { Camera, RotateCcw, Download, Share2, Home, Heart, User, Sparkles, ArrowLeft, X, ShoppingBag, Moon, Sun, CheckCircle2, Info, Check, AlertCircle, Plus, Clock, History } from 'lucide-react';

// Import new components
import MultiItemSelector from './components/MultiItemSelector';
import FavoritesManager from './components/FavoritesManager';
import SocialShare from './components/SocialShare';
import OutfitHistory from './components/OutfitHistory';
import StyleRecommendations from './components/StyleRecommendations';
import ComparisonSlider from './components/ComparisonSlider';
import OnboardingTutorial from './components/OnboardingTutorial';

// Import hooks
import useHistory from './hooks/useHistory';
import useFavorites from './hooks/useFavorites';

// Import utilities
import { resizeImage, getBase64Data, convertHeicToJpeg, downloadImage } from './utils/imageProcessor';

const apiKey = "AIzaSyAeqykSy0cSKCzpGYmn7mEFmJGpLoxPNg8";

const App = () => {
  const [screen, setScreen] = useState('upload');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState('mobile');
  const [userPhoto, setUserPhoto] = useState(null);
  const [transformedPhoto, setTransformedPhoto] = useState(null);
  const [conversionLoading, setConversionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState({ top: null, bottom: null, shoes: null });
  const [isProcessingSwap, setIsProcessingSwap] = useState(false);
  const [toast, setToast] = useState(null);
  
  // New feature states
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Custom hooks
  const { history, addToHistory } = useHistory();
  const { favorites, saveFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const theme = {
    bg: isDarkMode ? 'bg-black' : 'bg-[#F2F2F7]',
    glass: isDarkMode ? 'bg-white/10 backdrop-blur-3xl border-white/10' : 'bg-black/5 backdrop-blur-3xl border-black/5',
    text: isDarkMode ? 'text-white' : 'text-black',
    subtext: isDarkMode ? 'text-white/40' : 'text-black/40',
    accent: 'from-[#667EEA] to-[#764BA2]',
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const performAITransformation = async () => {
    if (!userPhoto) return;
    
    // Check if any item is selected
    const hasSelection = Object.values(selectedItems).some(item => item !== null);
    if (!hasSelection) {
      showToast('Please select at least one item');
      return;
    }

    setIsProcessingSwap(true);
    setError(null);

    try {
      const optimizedImage = await resizeImage(userPhoto);
      const base64Data = getBase64Data(optimizedImage);
      
      // Build prompt from selected items
      const itemDescriptions = [];
      if (selectedItems.top) itemDescriptions.push(selectedItems.top.prompt);
      if (selectedItems.bottom) itemDescriptions.push(selectedItems.bottom.prompt);
      if (selectedItems.shoes) itemDescriptions.push(selectedItems.shoes.prompt);
      
      const promptText = `In the provided photo, replace the person's clothing with the following items: ${itemDescriptions.join(', ')}. Ensure the new garments fit perfectly on their body, maintaining the original pose, lighting, and realistic texture. Keep the rest of the image exactly the same including the background. The transformation should look completely photorealistic.`;

      const makeRequest = async (retryCount = 0) => {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: promptText },
                  { inlineData: { mimeType: "image/jpeg", data: base64Data } }
                ]
              }],
              generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
            })
          });

          if (!response.ok) throw new Error();
          const result = await response.json();
          const base64Image = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

          if (base64Image) {
            const newTransformed = `data:image/jpeg;base64,${base64Image}`;
            setTransformedPhoto(newTransformed);
            setIsProcessingSwap(false);
            setScreen('results');
            
            // Add to history
            addToHistory({
              userPhoto,
              transformedPhoto: newTransformed,
              items: selectedItems
            });
          } else {
            throw new Error();
          }
        } catch (err) {
          if (retryCount < 3) {
            const delay = Math.pow(2, retryCount) * 1000;
            setTimeout(() => makeRequest(retryCount + 1), delay);
          } else {
            setError("Server Congested. Retrying...");
            setIsProcessingSwap(false);
          }
        }
      };

      await makeRequest();
    } catch (e) {
      setIsProcessingSwap(false);
      setError("Image processing error.");
    }
  };

  const handleItemSelect = (category, item) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: prev[category]?.id === item.id ? null : item
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic';

    if (isHeic && window.heic2any) {
      setConversionLoading(true);
      try {
        const result = await convertHeicToJpeg(file);
        setUserPhoto(result);
        setConversionLoading(false);
        setScreen('swap');
      } catch {
        setConversionLoading(false);
        showToast('Error converting HEIC image');
      }
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result);
        setScreen('swap');
      };
      reader.readAsDataURL(file);
    }
  };

  const reset = () => {
    setScreen('upload');
    setUserPhoto(null);
    setTransformedPhoto(null);
    setSelectedItems({ top: null, bottom: null, shoes: null });
    setError(null);
  };

  const handleSaveFavorite = () => {
    if (!transformedPhoto) return;
    saveFavorite({
      userPhoto,
      transformedPhoto,
      items: selectedItems
    });
    showToast('Saved to Favorites');
  };

  const handleDownload = () => {
    if (transformedPhoto) {
      downloadImage(transformedPhoto, `style-swap-${Date.now()}.png`);
      showToast('Download Started');
    }
  };

  const StatusOverlay = () => (
    <div className="absolute top-0 left-0 right-0 h-12 flex justify-between items-center px-8 z-[100] pointer-events-none">
      <span className={`text-xs font-bold tracking-widest ${theme.text}`}>9:41</span>
      <div className="flex gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>
    </div>
  );

  const NavDock = () => (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[280px] h-14 rounded-full flex justify-around items-center border border-white/5 bg-white/5 backdrop-blur-2xl z-50 shadow-2xl">
      <button onClick={() => setScreen('upload')} className="transition-all active:scale-90">
        <Home size={20} className={screen === 'upload' ? 'text-[#667EEA]' : 'text-white/20'} />
      </button>
      <button onClick={() => setShowFavorites(true)} className="transition-all active:scale-90 relative">
        <Heart size={20} className="text-white/20" />
        {favorites.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] text-white font-bold flex items-center justify-center">
            {favorites.length}
          </span>
        )}
      </button>
      <button onClick={() => setShowHistory(true)} className="transition-all active:scale-90 relative">
        <Clock size={20} className="text-white/20" />
      </button>
      <button onClick={() => showToast('Profile Coming Soon')} className="transition-all active:scale-90">
        <User size={20} className="text-white/20" />
      </button>
    </div>
  );

  const UploadScreen = () => (
    <div className="h-full w-full relative group bg-black/20">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center pointer-events-none">
        <div className="w-24 h-24 rounded-[40px] bg-gradient-to-br from-[#667EEA] to-[#764BA2] flex items-center justify-center text-white shadow-[0_20px_40px_rgba(102,126,234,0.3)] mb-8 animate-pulse">
          <Plus size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-black tracking-tighter mb-2 text-white italic">Style Swap</h1>
        <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">Select a Portrait</p>
      </div>
      <input type="file" accept="image/*,.heic" className="absolute inset-0 opacity-0 cursor-pointer z-50" onChange={handleFileChange} />
      {conversionLoading && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center z-[100]">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
          <span className="text-[10px] font-black text-white tracking-[0.4em]">OPTIMIZING</span>
        </div>
      )}
    </div>
  );

  const SwapScreen = () => (
    <div className="h-full w-full relative overflow-hidden bg-black">
      <div className="absolute top-16 left-8 z-50">
        <button onClick={reset} className="p-3 bg-white/10 backdrop-blur-2xl rounded-full border border-white/10 text-white transition-all active:scale-90">
          <ArrowLeft size={18} />
        </button>
      </div>
      <img 
        src={userPhoto} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
          isProcessingSwap ? 'scale-110 saturate-0 blur-2xl opacity-40' : 'scale-100 opacity-100'
        }`} 
        alt="user" 
      />
      
      <div className="absolute bottom-24 left-0 right-0 p-6 z-50 space-y-6">
        <StyleRecommendations 
          selectedItems={selectedItems}
          onRecommendation={(category, itemId) => {
            // Find and select the recommended item
            showToast(`Great choice! Select ${itemId}`);
          }}
        />
        
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Multi-Item Try-On</h3>
            <span className="text-[10px] text-[#667EEA] font-bold">PRO V.2</span>
          </div>
          
          <div className="space-y-4">
            <MultiItemSelector 
              selectedItems={selectedItems}
              onItemSelect={handleItemSelect}
              isProcessing={isProcessingSwap}
              category="top"
            />
            <MultiItemSelector 
              selectedItems={selectedItems}
              onItemSelect={handleItemSelect}
              isProcessing={isProcessingSwap}
              category="bottom"
            />
            <MultiItemSelector 
              selectedItems={selectedItems}
              onItemSelect={handleItemSelect}
              isProcessing={isProcessingSwap}
              category="shoes"
            />
          </div>

          {/* Generate button */}
          <button
            onClick={performAITransformation}
            disabled={isProcessingSwap || !Object.values(selectedItems).some(Boolean)}
            className="w-full mt-6 py-4 bg-gradient-to-r from-[#667EEA] to-[#764BA2] rounded-3xl text-white font-black uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-2xl"
          >
            {isProcessingSwap ? 'Generating...' : 'Generate Look'}
          </button>
        </div>
      </div>

      {isProcessingSwap && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-black/40 backdrop-blur-sm">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#667EEA] to-transparent absolute top-1/2 animate-scanline shadow-[0_0_30px_#667EEA]" />
          <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in">
            <div className="w-16 h-16 border-2 border-[#667EEA]/40 border-t-[#667EEA] rounded-full animate-spin" />
            <span className="text-[9px] font-black text-white tracking-[0.6em] uppercase">Generating Reality</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-[110] bg-black/60 p-8">
          <div className="bg-red-500/80 backdrop-blur-xl p-4 rounded-3xl flex items-center gap-3 text-white">
            <AlertCircle size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{error}</span>
          </div>
        </div>
      )}
    </div>
  );

  const ResultsScreen = () => (
    <div className="h-full w-full bg-black relative">
      {/* Header controls */}
      <div className="absolute top-16 left-8 right-8 z-50 flex items-center justify-between">
        <button onClick={reset} className="p-3 bg-white/10 backdrop-blur-3xl rounded-full border border-white/10 text-white transition-all active:scale-90">
          <X size={18} />
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 bg-white/10 backdrop-blur-3xl rounded-full border border-white/10 text-white text-xs font-bold transition-all active:scale-90"
          >
            {showComparison ? 'Split View' : 'Compare'}
          </button>
        </div>
      </div>

      {/* Main content */}
      {showComparison ? (
        <ComparisonSlider 
          beforeImage={userPhoto}
          afterImage={transformedPhoto || userPhoto}
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full">
          {/* Before */}
          <div className="flex-1 relative border-r border-white/5 overflow-hidden">
            <img src={userPhoto} className="w-full h-full object-cover grayscale opacity-30" alt="before" />
            <div className="absolute bottom-10 left-8">
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em] block mb-2 italic">Baseline</span>
              <div className="w-6 h-0.5 bg-white/20" />
            </div>
          </div>
          
          {/* After */}
          <div className="flex-[1.5] relative overflow-hidden">
            <img src={transformedPhoto || userPhoto} className="w-full h-full object-cover animate-in fade-in duration-1000" alt="after" />
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="absolute bottom-32 left-8 right-8 animate-in slide-in-from-bottom duration-700 delay-300">
        <div className="bg-white/10 backdrop-blur-[60px] border border-white/20 rounded-[40px] p-5 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-3xl bg-white/10 flex items-center justify-center text-3xl">
              {selectedItems.top?.icon || '👗'}
            </div>
            <div>
              <span className="text-[9px] font-black text-[#667EEA] uppercase tracking-widest block mb-0.5">Complete Look</span>
              <h3 className="text-lg font-black text-white tracking-tighter italic">
                {Object.values(selectedItems).filter(Boolean).map(i => i.name).join(' + ')}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Action dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 items-center">
        <button
          onClick={handleDownload}
          className="p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 text-white shadow-xl transition-all active:scale-75"
        >
          <Download size={20} />
        </button>
        <button
          onClick={() => setShowShare(true)}
          className="p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 text-white shadow-xl transition-all active:scale-75"
        >
          <Share2 size={20} />
        </button>
        <button
          onClick={handleSaveFavorite}
          className={`p-4 backdrop-blur-xl rounded-full border text-white shadow-xl transition-all active:scale-75 ${
            isFavorite(transformedPhoto) 
              ? 'bg-red-500 border-red-500' 
              : 'bg-white/10 border-white/10'
          }`}
        >
          <Heart size={20} fill={isFavorite(transformedPhoto) ? 'white' : 'none'} />
        </button>
      </div>

      {toast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl z-[100] animate-in slide-in-from-top duration-300">
          {toast}
        </div>
      )}
    </div>
  );

  return (
    <>
      <OnboardingTutorial 
        onComplete={() => setShowOnboarding(false)}
      />

      <div className="min-h-screen bg-[#050505] font-sans flex items-center justify-center p-0 md:p-12 overflow-hidden">
        <div className="fixed top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#667EEA] rounded-full blur-[240px] opacity-10 pointer-events-none" />
        <div className="fixed bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#764BA2] rounded-full blur-[240px] opacity-10 pointer-events-none" />
        
        <div className="fixed top-8 right-8 z-[200] flex items-center gap-3">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/40 transition-all hover:text-white active:scale-90"
          >
            {isDarkMode ? <Sun size={14}/> : <Moon size={14}/>}
          </button>
          <select 
            value={view} 
            onChange={(e) => setView(e.target.value)} 
            className="bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full outline-none cursor-pointer"
          >
            <option value="mobile">Mobile View</option>
            <option value="tablet">Canvas View</option>
          </select>
        </div>
        
        <div className={`relative shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          view === 'mobile'
            ? 'w-[375px] h-[812px] rounded-[60px] border-[12px] border-black shadow-[0_0_0_4px_rgba(255,255,255,0.05)]'
            : 'w-[900px] h-[1100px] rounded-[50px] border-[14px] border-black'
        } ${theme.bg} `}>
          <StatusOverlay />
          <div className="h-full w-full">
            {screen === 'upload' && <UploadScreen />}
            {screen === 'swap' && <SwapScreen />}
            {screen === 'results' && <ResultsScreen />}
          </div>
          {screen !== 'results' && <NavDock />}
        </div>
      </div>

      {/* Feature modals */}
      <FavoritesManager 
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        onLoadLook={(look) => {
          setUserPhoto(look.userPhoto);
          setTransformedPhoto(look.transformedPhoto);
          setSelectedItems(look.items);
          setScreen('results');
          setShowFavorites(false);
        }}
      />

      <OutfitHistory 
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onRestore={(entry) => {
          setUserPhoto(entry.userPhoto);
          setTransformedPhoto(entry.transformedPhoto);
          setSelectedItems(entry.items);
          setScreen('results');
          setShowHistory(false);
        }}
      />

      {showShare && (
        <SocialShare 
          imageUrl={transformedPhoto}
          lookDetails={{ items: selectedItems }}
          onClose={() => setShowShare(false)}
        />
      )}

      <style>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        * {
          cursor: default;
        }
      `}</style>
    </>
  );
};

export default App;
