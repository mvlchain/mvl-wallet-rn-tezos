import { useState, useCallback, useEffect } from 'react';

export default function useDebounce(callback: any, delay: number) {
  const [debounceReady, setDebounceReady] = useState(true);

  const debouncedCallback = useCallback(
    (...args: any) => {
      if (debounceReady) {
        callback(...args);
        setDebounceReady(false);
      }
    },
    [debounceReady, callback]
  );

  useEffect(() => {
    if (debounceReady) {
      return undefined;
    }
    const interval = setTimeout(() => setDebounceReady(true), delay);
    return () => clearTimeout(interval);
  }, [debounceReady, delay]);

  return debouncedCallback;
}
