import { useCallback, useEffect, useRef } from 'react';

export default function useDebounce(callback: any, delay: number) {
  const debounceReady = useRef(false);

  const debouncedCallback = useCallback(
    (...args: any) => {
      if (debounceReady.current) {
        callback(...args);
        debounceReady.current = false;
      }
    },
    [debounceReady.current, callback]
  );

  useEffect(() => {
    if (debounceReady.current) {
      return undefined;
    }
    const interval = setTimeout(() => (debounceReady.current = true), delay);
    return () => {
      clearTimeout(interval);
    };
  }, [debounceReady.current, delay]);

  return debouncedCallback;
}
