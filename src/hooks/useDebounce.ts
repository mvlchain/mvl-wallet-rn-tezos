import { useCallback, useRef } from 'react';

export default function useDebounce(
  func: Function,
  wait: number,
  exceptionHandler: Function = (e: any) => {
    console.error(e);
  }
) {
  const timeout = useRef<any>(null);

  return useCallback(
    (...args: any) => {
      const later = async () => {
        clearTimeout(timeout.current);
        try {
          await func(...args);
        } catch (e) {
          exceptionHandler(e);
        }
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait]
  );
}
