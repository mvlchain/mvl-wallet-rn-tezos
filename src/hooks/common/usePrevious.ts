import { useEffect, useRef } from 'react';

export const usePrevious = <T>(data: T) => {
  const prevData = useRef<T>();

  useEffect(() => {
    prevData.current = data;
  }, [data]);

  return prevData.current;
};
