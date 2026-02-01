import React from 'react';
import { AlertCircle, WifiOff, ServerCrash, ImageOff, Clock } from 'lucide-react';

const errorTypes = {
  network: {
    icon: WifiOff,
    title: 'Network Error',
    description: 'Unable to connect. Please check your internet connection and try again.',
    color: 'text-orange-400'
  },
  server: {
    icon: ServerCrash,
    title: 'Server Congested',
    description: 'Our servers are experiencing high traffic. We\'ll automatically retry your request.',
    color: 'text-red-400'
  },
  timeout: {
    icon: Clock,
    title: 'Request Timeout',
    description: 'The request took too long. Please try again with a smaller image.',
    color: 'text-yellow-400'
  },
  image: {
    icon: ImageOff,
    title: 'Image Processing Error',
    description: 'There was a problem processing your image. Please try a different photo.',
    color: 'text-purple-400'
  },
  unknown: {
    icon: AlertCircle,
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred. Please try again.',
    color: 'text-red-400'
  }
};

const ErrorMessage = ({ 
  type = 'unknown', 
  message = null,
  onRetry = null,
  onDismiss = null,
  retryCount = 0,
  maxRetries = 3
}) => {
  const errorConfig = errorTypes[type] || errorTypes.unknown;
  const Icon = errorConfig.icon;
  const showRetryProgress = type === 'server' && retryCount > 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[110] bg-black/60 backdrop-blur-sm p-8">
      <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[40px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
        <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto ${errorConfig.color} bg-current/10`}>
          <Icon size={32} className={errorConfig.color} />
        </div>

        <h3 className="text-xl font-black text-white text-center mb-2">
          {errorConfig.title}
        </h3>

        <p className="text-white/60 text-center text-sm mb-6">
          {message || errorConfig.description}
        </p>

        {showRetryProgress && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/40 font-bold uppercase tracking-wider">
                Retry Attempt
              </span>
              <span className="text-xs text-[#667EEA] font-bold">
                {retryCount} / {maxRetries}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] transition-all duration-500"
                style={{ width: `${(retryCount / maxRetries) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex-1 bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white font-bold py-3 px-6 rounded-2xl transition-all active:scale-95 hover:shadow-2xl"
            >
              Try Again
            </button>
          )}
          
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-1 bg-white/5 border border-white/10 text-white/60 font-bold py-3 px-6 rounded-2xl transition-all active:scale-95 hover:bg-white/10"
            >
              Dismiss
            </button>
          )}
        </div>

        {type === 'server' && (
          <p className="text-center text-xs text-white/30 mt-4 font-mono">
            Auto-retrying with exponential backoff...
          </p>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
