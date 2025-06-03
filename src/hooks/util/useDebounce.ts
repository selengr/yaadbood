import { useEffect, useState } from 'react';

type CallbackFunction = (...args: any[]) => void;

export const useDebounce = (callback: CallbackFunction, delay: number) => {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const debouncedFunction = (...args: Parameters<CallbackFunction>) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setDebounceTimeout(
      setTimeout(() => {
        callback(...args);
      }, delay)
    );
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return debouncedFunction;
};
