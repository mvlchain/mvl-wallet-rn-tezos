import { useState } from 'react';

export const useWebview = () => {
  const [isLoading, setIsLoading] = useState(false);
  // TODO: setting loading indicator
  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };
  return {
    onLoadStart,
    onLoadEnd,
  };
};
