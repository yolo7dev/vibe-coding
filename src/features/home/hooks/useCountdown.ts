import { useEffect, useState } from 'react';

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function diff(target: number): CountdownParts {
  const total = Math.max(0, target - Date.now());
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor(total / 3_600_000) % 24,
    minutes: Math.floor(total / 60_000) % 60,
    seconds: Math.floor(total / 1_000) % 60,
  };
}

export function useCountdown(target: Date): CountdownParts {
  const [parts, setParts] = useState(() => diff(target.getTime()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(diff(target.getTime()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return parts;
}
