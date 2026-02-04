import { useEffect, useState } from 'react';

interface UseCountdownOptions {
  targetDate?: Date;
  duration?: number; // in seconds
  onComplete?: () => void;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const useCountdown = (options: UseCountdownOptions) => {
  const { targetDate, duration, onComplete } = options;

  const calculateTimeLeft = (): CountdownTime => {
    let endTime: number;

    if (targetDate) {
      endTime = targetDate.getTime();
    } else if (duration) {
      // Check if we have a stored end time in localStorage
      const storageKey = 'countdown-end-time';
      const storedEndTime = localStorage.getItem(storageKey);

      if (storedEndTime) {
        endTime = parseInt(storedEndTime, 10);
      } else {
        endTime = Date.now() + duration * 1000;
        localStorage.setItem(storageKey, endTime.toString());
      }
    } else {
      endTime = Date.now();
    }

    const total = endTime - Date.now();

    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds, total };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0 && onComplete) {
        onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, duration, onComplete]);

  return timeLeft;
};
