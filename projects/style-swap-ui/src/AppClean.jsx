import React, { useState, useCallback } from 'react';
import { Camera, ArrowLeft, X, Download, Share2, ShoppingBag, Sparkles } from 'lucide-react';

const apiKey = "AIzaSyAeqykSy0cSKCzpGYmn7mEFmJGpLoxPNg8";

const App = () => {
  const [screen, setScreen] = useState('upload');
  const [userPhoto, setUserPhoto] = useState(null);
  const [transformedPhoto, setTransformedPhoto] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const styles = [
    { id: 'linen', name: 'White Linen', icon: '👔', prompt: "a crisp white linen button-up shirt" },
    { id: 'leather', name: 'Leather Jacket', icon: '🧥', prompt: "a black leather biker jacket" },
    { id: 'flannel', name: 'Flannel', icon: '🔥', prompt: "a red flannel shirt" },
    { id: 'cashmere', name: 'Cashmere', icon: '✨', prompt: "a grey cashmere sweater" },
    { id: 'denim', name: 'Denim Jacket', icon: '💙', prompt: "a vintage denim jacket" },
    { id: 'hoodie', name: 'Hoodie', icon: '🎯', prompt: "a black hoodie" },
  ];

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUserPhoto(event.target.result);
      setScreen('select');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleStyleSelect = useCallback(async (style) => {
    if (!userPhoto) return;
    
    setIsProcessing(true);
    setSelectedStyle(style);
    setError(null);

    try {
      const base64Data = userPhoto.split(',')[1];
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: `Transform this photo by replacing the person's shirt with ${style.prompt}. Keep everything else the same. Make it photorealistic.` },
                { inlineData: { mimeType: "image/jpeg", data: base64Data } }
              ]
            }],
            generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
          })
        }
      );

      const result = await response.json();
      const imageData = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

      if (imageData) {
        setTransformedPhoto(`data:image/jpeg;base64,${imageData}`);
        setScreen('result');
      } else {
        throw new Error('No image returned');
      }
    } catch (err) {
      setError('Failed to transform image. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [userPhoto]);

  const reset = useCallback(() => {
    setScreen('upload');
    setUserPhoto(null);
    setTransformedPhoto(null);
    setSelectedStyle(null);
    setError(null);
  }, []);

  // Upload Screen
  if (screen === 'upload') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6 shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-black text-white mb-3">Style Swap</h1>
            <p className="text-purple-300 text-lg">Try on any outfit with AI</p>
          </div>

          <label className="block">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition" />
              <div className="relative bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-12 text-center hover:border-white/40 transition">
                <Camera className="w-16 h-16 text-white mx-auto mb-4" />
                <p className="text-white text-xl font-bold mb-2">Upload Your Photo</p>
                <p className="text-purple-200 text-sm">Click or drag to select</p>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    );
  }

  // Style Selection Screen
  if (screen === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 p-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={reset}
            className="mb-6 flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Preview */}
            <div className="relative">
              <div className="sticky top-4">
                <img
                  src={userPhoto}
                  alt="Your photo"
                  className="w-full rounded-3xl shadow-2xl"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white font-bold">Transforming...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Style Options */}
            <div>
              <h2 className="text-3xl font-black text-white mb-6">Choose Your Style</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-2xl text-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleStyleSelect(style)}
                    disabled={isProcessing}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      selectedStyle?.id === style.id
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-white'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="text-5xl mb-3">{style.icon}</div>
                    <p className="text-white font-bold">{style.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (screen === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition"
            >
              <X className="w-5 h-5" />
              <span className="font-semibold">New Try-On</span>
            </button>

            <div className="flex gap-3">
              <button className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div>
              <p className="text-purple-300 text-sm font-bold uppercase tracking-wider mb-3">Before</p>
              <img
                src={userPhoto}
                alt="Original"
                className="w-full rounded-3xl shadow-2xl"
              />
            </div>

            {/* After */}
            <div>
              <p className="text-pink-300 text-sm font-bold uppercase tracking-wider mb-3">After</p>
              <img
                src={transformedPhoto}
                alt="Transformed"
                className="w-full rounded-3xl shadow-2xl"
              />
              
              <div className="mt-6 p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="text-sm opacity-80 mb-1">Your style</p>
                    <p className="text-2xl font-black">{selectedStyle?.name}</p>
                  </div>
                  <button className="p-4 bg-white rounded-2xl text-black hover:scale-105 transition">
                    <ShoppingBag className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
