import { useEffect, useRef } from 'react';

const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef<Function | null>(null);
  useEffect(() => {
    savedCallback.current = callback;
  }, callback);

  useEffect(() => {
    const tick = () => {
      savedCallback.current && savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
};

export default useInterval;
