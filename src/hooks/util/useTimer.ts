'use client'
import { useEffect, useState } from 'react';

export default function useTimer(initialTime?: number) {
  const [time, setTime] = useState<number>(initialTime || 120);

  useEffect(() => {
    if (time === 0) return;
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const resetTimer = () => {
    setTime(initialTime || 120);
  };

  return { time, seconds, minutes, resetTimer };
}
