import React, { useState, useEffect } from 'react';
import { Camera, Shirt, Sparkles, Download, ArrowRight, X, Check } from 'lucide-react';

const OnboardingTutorial = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('styleSwapOnboardingComplete');
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const steps = [
    {
      title: 'Welcome to Style Swap',
      description: 'Transform your look with AI-powered fashion try-on. See yourself in any outfit instantly.',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      image: '✨'
    },
    {
      title: 'Upload Your Photo',
      description: 'Start by selecting a clear portrait photo. Our AI works best with full-body or upper-body shots.',
      icon: Camera,
      color: 'from-blue-500 to-cyan-500',
      image: '📸',
      tip: 'Pro tip: Good lighting makes better results!'
    },
    {
      title: 'Choose Your Style',
      description: 'Browse through tops, bottoms, and shoes. Mix and match to create your perfect outfit.',
      icon: Shirt,
      color: 'from-orange-500 to-red-500',
      image: '👔',
      tip: 'Try multiple combinations!'
    },
    {
      title: 'AI Magic Happens',
      description: 'Watch as our AI transforms your photo in real-time. The result looks photorealistic.',
      icon: Sparkles,
      color: 'from-green-500 to-teal-500',
      image: '🎨',
      tip: 'Processing takes 10-15 seconds'
    },
    {
      title: 'Save & Share',
      description: 'Love your look? Download, share on social media, or save to your favorites for later.',
      icon: Download,
      color: 'from-indigo-500 to-purple-500',
      image: '💾',
      tip: 'Share with #StyleSwapAI'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('styleSwapOnboardingComplete', 'true');
    setIsVisible(false);
    onComplete?.();
  };

  if (!isVisible) return null;

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[500] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="max-w-md w-full">
        {/* Skip button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSkip}
            className="px-4 py-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-all"
          >
            Skip Tutorial
          </button>
        </div>

        {/* Main card */}
        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[50px] overflow-hidden">
          {/* Icon/Emoji Header */}
          <div className={`p-12 bg-gradient-to-br ${step.color} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
            
            <div className="relative text-center">
              <div className="text-8xl mb-4 animate-bounce-subtle">
                {step.image}
              </div>
              <Icon size={32} className="text-white mx-auto" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-2xl font-black text-white mb-3 tracking-tight text-center">
              {step.title}
            </h2>
            <p className="text-white/60 text-sm leading-relaxed text-center mb-4">
              {step.description}
            </p>

            {step.tip && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-start gap-2">
                <Sparkles size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-white/80 text-xs font-bold">
                  {step.tip}
                </p>
              </div>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 pb-6">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`transition-all rounded-full ${
                  idx === currentStep
                    ? 'w-8 h-2 bg-white'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="p-6 pt-0 flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-bold transition-all active:scale-95"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className={`${currentStep === 0 ? 'w-full' : 'flex-1'} py-4 bg-gradient-to-r ${step.color} hover:scale-105 rounded-2xl text-white font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-2xl`}
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              {currentStep === steps.length - 1 ? (
                <Check size={20} />
              ) : (
                <ArrowRight size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Step counter */}
        <div className="text-center mt-6">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OnboardingTutorial;
