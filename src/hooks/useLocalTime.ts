import { useState, useEffect } from 'react';

export interface LocalTimeState {
  time: string;
  utcOffset: string;
  zone: string;
}

export function useLocalTime(timeZone = 'Asia/Kolkata'): LocalTimeState {
  const [currentTime, setCurrentTime] = useState<LocalTimeState>(() => {
    return formatCurrentTime(timeZone);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatCurrentTime(timeZone));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  return currentTime;
}

function formatCurrentTime(timeZone: string): LocalTimeState {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return {
      time: formatter.format(now),
      utcOffset: 'UTC+05:30',
      zone: 'IST',
    };
  } catch {
    return {
      time: '00:00:00',
      utcOffset: 'UTC+05:30',
      zone: 'IST',
    };
  }
}
