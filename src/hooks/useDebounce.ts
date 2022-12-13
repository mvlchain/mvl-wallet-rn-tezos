import { useCallback, useRef } from 'react';

export default function useDebounce(func: any, wait: number) {
  const timeout = useRef<any>(null);

  return useCallback(
    (...args: any) => {
      const later = () => {
        clearTimeout(timeout.current);
        func(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait]
  );
}
