import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  RotateCcw,
  Download,
  Share2,
  Home,
  Heart,
  User,
  Sparkles,
  ArrowLeft,
  X,
  ShoppingBag,
  Moon,
  Sun,
  CheckCircle2,
  Info,
  Check,
  AlertCircle,
  Plus
} from 'lucide-react';
import celebritiesData from './data/celebrities.json';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

const App = () => {
  const [screen, setScreen] = useState('upload');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState('mobile');
  const [userPhoto, setUserPhoto] = useState(null);
  const [transformedPhoto, setTransformedPhoto] = useState(null);
  const [conversionLoading, setConversionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Navigation state - what level of carousel we're at
  const [carouselView, setCarouselView] = useState('celebrities'); // 'celebrities', 'looks', 'items'
  const [selectedCelebrity, setSelectedCelebrity] = useState(null);
  const [selectedLook, setSelectedLook] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const [isProcessingSwap, setIsProcessingSwap] = useState(false);
  const [toast, setToast] = useState(null);
  const [savedLooks, setSavedLooks] = useState([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  useEffect(() => {
    // Load saved looks from localStorage
    const saved = JSON.parse(localStorage.getItem('savedLooks') || '[]');
    setSavedLooks(saved);
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

  const getBase64Data = (dataUrl) => dataUrl.split(',')[1];

  const resizeImage = (dataUrl, maxDim = 1024) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) { height *= maxDim / width; width = maxDim; }
        } else {
          if (height > maxDim) { width *= maxDim / height; height = maxDim; }
        }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = dataUrl;
    });
  };

  const performAITransformation = async (item) => {
    if (!userPhoto) return;
    setIsProcessingSwap(true);
    setError(null);

    try {
      const optimizedImage = await resizeImage(userPhoto);
      const base64Data = getBase64Data(optimizedImage);
      const promptText = `In the provided photo, replace the person's current outfit with ${item.aiPrompt}. Ensure the new garment fits perfectly on their body, maintaining the original pose, lighting, and realistic texture. Keep the rest of the image exactly the same including the background. The transformation should look completely photorealistic.`;

      const makeRequest = async (retryCount = 0) => {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`, {
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
            setTransformedPhoto(`data:image/jpeg;base64,${base64Image}`);
            setIsProcessingSwap(false);
          } else { throw new Error(); }
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

  const handleCelebSelect = (celeb) => {
    setSelectedCelebrity(celeb);
    setCarouselView('looks');
  };

  const handleLookSelect = (look) => {
    setSelectedLook(look);
    setCarouselView('items');
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    performAITransformation(item);
  };

  const handleBack = () => {
    if (carouselView === 'items') {
      setCarouselView('looks');
      setSelectedLook(null);
    } else if (carouselView === 'looks') {
      setCarouselView('celebrities');
      setSelectedCelebrity(null);
    }
  };

  const handleSaveCurrentLook = () => {
    if (!transformedPhoto || !selectedItem) return;

    const newLook = {
      id: Date.now(),
      image: transformedPhoto,
      item: selectedItem,
      celebrity: selectedCelebrity?.name,
      look: selectedLook?.event,
      timestamp: new Date().toISOString()
    };

    const updated = [newLook, ...savedLooks];
    setSavedLooks(updated);
    localStorage.setItem('savedLooks', JSON.stringify(updated));
    showToast('Look Saved!');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic';
    if (isHeic && window.heic2any) {
      setConversionLoading(true);
      try {
        const blob = await window.heic2any({ blob: file, toType: "image/jpeg" });
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserPhoto(reader.result);
          setTransformedPhoto(null);
          setConversionLoading(false);
          setScreen('swap');
        };
        reader.readAsDataURL(Array.isArray(blob) ? blob[0] : blob);
      } catch { setConversionLoading(false); }
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result);
        setTransformedPhoto(null);
        setScreen('swap');
      };
      reader.readAsDataURL(file);
    }
  };

  const reset = () => {
    setScreen('upload');
    setUserPhoto(null);
    setTransformedPhoto(null);
    setSelectedCelebrity(null);
    setSelectedLook(null);
    setSelectedItem(null);
    setCarouselView('celebrities');
    setError(null);
  };

  const handleAction = (type) => {
    showToast(`${type} Successful`);
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
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[240px] h-14 rounded-full flex justify-around items-center border border-white/5 bg-white/5 backdrop-blur-2xl z-50 shadow-2xl">
      <button onClick={() => setScreen('upload')} className="transition-all active:scale-90"><Home size={20} className={screen === 'upload' ? 'text-[#667EEA]' : 'text-white/20'} /></button>
      <button onClick={() => handleAction('Saved')} className="transition-all active:scale-90"><Heart size={20} className="text-white/20" /></button>
      <button onClick={() => handleAction('Profile')} className="transition-all active:scale-90"><User size={20} className="text-white/20" /></button>
    </div>
  );

  const UploadScreen = () => (
    <div className="h-full w-full relative group bg-black/20">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center pointer-events-none">
        <div className="w-24 h-24 rounded-[40px] bg-gradient-to-br from-[#667EEA] to-[#764BA2] flex items-center justify-center text-white shadow-[0_20px_40px_rgba(102,126,234,0.3)] mb-8 animate-pulse">
          <Plus size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-black tracking-tighter mb-2 text-white italic">Style Swap ⚡</h1>
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
      {/* Header Controls */}
      <div className="absolute top-16 left-0 right-0 flex items-center justify-between px-8 z-50">
        <button
          onClick={carouselView !== 'celebrities' ? handleBack : reset}
          className="p-3 bg-white/10 backdrop-blur-2xl rounded-full border border-white/10 text-white transition-all active:scale-90"
        >
          <ArrowLeft size={18} />
        </button>

        {transformedPhoto && selectedItem && (
          <button
            onClick={handleSaveCurrentLook}
            className="p-3 bg-gradient-to-r from-[#667EEA] to-[#764BA2] backdrop-blur-2xl rounded-full border border-white/10 text-white transition-all active:scale-90 shadow-lg"
          >
            <Heart size={18} fill="white" />
          </button>
        )}
      </div>

      {/* Photo Display */}
      <img
        src={transformedPhoto || userPhoto}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isProcessingSwap ? 'scale-110 saturate-0 blur-2xl opacity-40' : 'scale-100 opacity-100'}`}
        alt="user"
      />

      {/* Current Selection Info */}
      {selectedItem && transformedPhoto && !isProcessingSwap && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-top duration-500">
          <div className="bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
            <div className="text-2xl">
              {selectedItem.type === 'top' && '👕'}
              {selectedItem.type === 'bottom' && '👖'}
              {selectedItem.type === 'dress' && '👗'}
              {selectedItem.type === 'accessory' && '👒'}
            </div>
            <div>
              <span className="text-[8px] font-black text-[#667EEA] uppercase tracking-widest block">Wearing</span>
              <span className="text-xs font-black text-white tracking-tight">{selectedItem.name}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Carousel */}
      <div className="absolute bottom-24 left-0 right-0 p-6 z-50">
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">
            {carouselView === 'celebrities' && 'Celebrity Inspiration'}
            {carouselView === 'looks' && `${selectedCelebrity?.name}'s Looks`}
            {carouselView === 'items' && 'Shop This Look'}
          </h3>
          {carouselView === 'celebrities' && (
            <span className="text-[10px] text-[#667EEA] font-bold">STYLE ICONS</span>
          )}
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
          {/* Celebrities Carousel */}
          {carouselView === 'celebrities' && celebritiesData.celebrities.map((celeb) => (
            <button
              key={celeb.id}
              onClick={() => handleCelebSelect(celeb)}
              disabled={isProcessingSwap}
              className={`flex-shrink-0 w-24 h-32 rounded-[32px] border transition-all flex flex-col items-center justify-center gap-3 snap-center active:scale-95 relative overflow-hidden
                ${selectedCelebrity?.id === celeb.id ? 'bg-white/20 border-white/40 shadow-2xl scale-110' : 'bg-white/5 border-white/5 hover:bg-white/10'}
              `}
            >
              <img src={celeb.avatar} alt={celeb.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/20" />
              <span className="text-[9px] font-black text-white uppercase tracking-widest text-center px-2">{celeb.name.split(' ')[0]}</span>
            </button>
          ))}

          {/* Looks Carousel */}
          {carouselView === 'looks' && selectedCelebrity?.looks.map((look) => (
            <button
              key={look.id}
              onClick={() => handleLookSelect(look)}
              disabled={isProcessingSwap}
              className={`flex-shrink-0 w-32 h-48 rounded-[32px] border transition-all snap-center active:scale-95 overflow-hidden relative
                ${selectedLook?.id === look.id ? 'border-white/40 shadow-2xl scale-110' : 'border-white/10 hover:border-white/20'}
              `}
            >
              <img src={look.image} alt={look.event} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-[8px] font-black text-white uppercase tracking-widest block">{look.event}</span>
              </div>
            </button>
          ))}

          {/* Items Carousel */}
          {carouselView === 'items' && selectedLook?.items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemSelect(item)}
              disabled={isProcessingSwap}
              className={`flex-shrink-0 w-24 h-32 rounded-[32px] border transition-all snap-center active:scale-95 flex flex-col items-center justify-center gap-3 relative
                ${selectedItem?.id === item.id ? 'bg-white/20 border-white/40 shadow-2xl scale-110' : 'bg-white/5 border-white/10 hover:bg-white/10'}
              `}
            >
              <div className="text-3xl">
                {item.type === 'top' && '👕'}
                {item.type === 'bottom' && '👖'}
                {item.type === 'dress' && '👗'}
                {item.type === 'accessory' && '👒'}
                {item.type === 'full' && '🎽'}
              </div>
              <span className="text-[8px] font-black text-white uppercase tracking-widest text-center px-2">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessingSwap && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-black/40 backdrop-blur-sm">
           <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#667EEA] to-transparent absolute top-1/2 animate-scanline shadow-[0_0_30px_#667EEA]" />
           <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in">
             <div className="w-16 h-16 border-2 border-[#667EEA]/40 border-t-[#667EEA] rounded-full animate-spin" />
             <span className="text-[9px] font-black text-white tracking-[0.6em] uppercase">Generating Reality</span>
           </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-[110] bg-black/60 p-8">
           <div className="bg-red-500/80 backdrop-blur-xl p-4 rounded-3xl flex items-center gap-3 text-white">
              <AlertCircle size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{error}</span>
           </div>
        </div>
      )}

      {/* Toast Notifications */}
      {toast && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl z-[110] animate-in slide-in-from-top duration-300">
          {toast}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] font-sans flex items-center justify-center p-0 md:p-12 overflow-hidden">
      <div className="fixed top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#667EEA] rounded-full blur-[240px] opacity-10 pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#764BA2] rounded-full blur-[240px] opacity-10 pointer-events-none" />

      <div className="fixed top-8 right-8 z-[200] flex items-center gap-3">
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/40 transition-all hover:text-white active:scale-90">
           {isDarkMode ? <Sun size={14}/> : <Moon size={14}/>}
        </button>
        <select value={view} onChange={(e) => setView(e.target.value)} className="bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full outline-none cursor-pointer">
          <option value="mobile">Mobile View</option>
          <option value="tablet">Canvas View</option>
        </select>
      </div>

      <div
        className={`relative shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${view === 'mobile' ? 'w-[375px] h-[812px] rounded-[60px] border-[12px] border-black shadow-[0_0_0_4px_rgba(255,255,255,0.05)]' : 'w-[900px] h-[1100px] rounded-[50px] border-[14px] border-black'}
          ${theme.bg}
        `}
      >
        <StatusOverlay />
        <div className="h-full w-full">
          {screen === 'upload' && <UploadScreen />}
          {screen === 'swap' && <SwapScreen />}
        </div>
        <NavDock />
      </div>

      <style>{`
        @keyframes scanline { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-scanline { animation: scanline 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        body { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; letter-spacing: -0.02em; }
        * { cursor: default; }
      `}</style>
    </div>
  );
};

export default App;
