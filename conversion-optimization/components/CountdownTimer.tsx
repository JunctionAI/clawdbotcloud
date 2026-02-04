import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { trackTimerExpired } from '../utils/analytics';

interface CountdownTimerProps {
  duration?: number; // seconds
  targetDate?: Date;
  title?: string;
  variant?: 'default' | 'urgent' | 'minimal';
  onExpire?: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  duration = 1800, // 30 minutes default
  targetDate,
  title = "Limited Time Offer Ends In:",
  variant = 'default',
  onExpire,
}) => {
  const timeLeft = useCountdown({
    duration,
    targetDate,
    onComplete: () => {
      trackTimerExpired('offer-timer');
      onExpire?.();
    },
  });

  const isUrgent = timeLeft.total < 300000; // Less than 5 minutes

  const TimeBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className={`flex flex-col items-center ${
      variant === 'minimal' ? 'min-w-[60px]' : 'min-w-[80px]'
    }`}>
      <div
        className={`
          ${variant === 'minimal' ? 'text-2xl' : 'text-3xl md:text-4xl'}
          font-bold
          ${isUrgent ? 'text-red-600 animate-pulse' : 'text-gray-900'}
          ${variant === 'urgent' ? 'bg-red-50 px-4 py-2 rounded-lg' : ''}
          ${variant === 'default' ? 'bg-gradient-to-br from-purple-100 to-blue-100 px-4 py-3 rounded-lg shadow-md' : ''}
        `}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span className={`
        ${variant === 'minimal' ? 'text-xs' : 'text-sm'}
        text-gray-600 mt-2 uppercase tracking-wide
      `}>
        {label}
      </span>
    </div>
  );

  if (variant === 'minimal') {
    return (
      <div className="inline-flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
        <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <div className="flex items-center space-x-1 text-sm font-semibold text-gray-900">
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span>:</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span>:</span>
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      ${variant === 'urgent' ? 'bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200' : 'bg-white border border-gray-200'}
      rounded-xl p-6 shadow-lg
    `}>
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className={`
          ${variant === 'urgent' ? 'text-red-600' : 'text-gray-900'}
          text-lg md:text-xl font-bold flex items-center justify-center
        `}>
          {isUrgent && (
            <svg className="w-5 h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {title}
        </h3>
      </div>

      {/* Timer */}
      <div className="flex justify-center items-center space-x-3 md:space-x-4">
        {timeLeft.days > 0 && (
          <>
            <TimeBox value={timeLeft.days} label="Days" />
            <div className="text-2xl font-bold text-gray-400">:</div>
          </>
        )}
        <TimeBox value={timeLeft.hours} label="Hours" />
        <div className="text-2xl font-bold text-gray-400">:</div>
        <TimeBox value={timeLeft.minutes} label="Mins" />
        <div className="text-2xl font-bold text-gray-400">:</div>
        <TimeBox value={timeLeft.seconds} label="Secs" />
      </div>

      {/* Urgency Message */}
      {isUrgent && (
        <div className="mt-4 text-center">
          <p className="text-sm font-semibold text-red-600 animate-pulse">
            🔥 Hurry! Offer expires soon!
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};
