import React, { useEffect, useState } from 'react';
import { trackSocialProofClick } from '../utils/analytics';

interface Notification {
  id: string;
  name: string;
  action: string;
  location?: string;
  time: string;
  avatar?: string;
}

interface SocialProofProps {
  notifications?: Notification[];
  displayDuration?: number; // ms
  interval?: number; // ms between notifications
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

const defaultNotifications: Notification[] = [
  { id: '1', name: 'Sarah M.', action: 'just purchased Premium Plan', location: 'New York, USA', time: '2 minutes ago' },
  { id: '2', name: 'James L.', action: 'started their free trial', location: 'London, UK', time: '5 minutes ago' },
  { id: '3', name: 'Maria G.', action: 'upgraded to Enterprise', location: 'Madrid, Spain', time: '8 minutes ago' },
  { id: '4', name: 'David K.', action: 'just purchased Premium Plan', location: 'Sydney, Australia', time: '12 minutes ago' },
  { id: '5', name: 'Emma W.', action: 'started their free trial', location: 'Toronto, Canada', time: '15 minutes ago' },
  { id: '6', name: 'Lucas P.', action: 'just purchased Premium Plan', location: 'São Paulo, Brazil', time: '18 minutes ago' },
  { id: '7', name: 'Sophie D.', action: 'upgraded to Enterprise', location: 'Paris, France', time: '22 minutes ago' },
  { id: '8', name: 'Michael R.', action: 'started their free trial', location: 'Berlin, Germany', time: '25 minutes ago' },
];

export const SocialProof: React.FC<SocialProofProps> = ({
  notifications = defaultNotifications,
  displayDuration = 5000,
  interval = 8000,
  position = 'bottom-left',
}) => {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let currentIndex = 0;

    const showNotification = () => {
      setIsVisible(true);
      setCurrentNotification(notifications[currentIndex]);
      trackSocialProofClick('notification_shown');

      // Hide after display duration
      setTimeout(() => {
        setIsVisible(false);
      }, displayDuration);

      // Move to next notification
      currentIndex = (currentIndex + 1) % notifications.length;
    };

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);

    // Then show at intervals
    const intervalId = setInterval(showNotification, interval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [notifications, displayDuration, interval]);

  if (!currentNotification) return null;

  const positionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
  };

  return (
    <div
      className={`
        fixed ${positionClasses[position]} z-40
        transition-all duration-500 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
      `}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              {currentNotification.name.charAt(0)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-semibold text-gray-900">
                {currentNotification.name}
              </p>
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-gray-700 mt-1">
              {currentNotification.action}
            </p>
            {currentNotification.location && (
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {currentNotification.location}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              {currentNotification.time}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
