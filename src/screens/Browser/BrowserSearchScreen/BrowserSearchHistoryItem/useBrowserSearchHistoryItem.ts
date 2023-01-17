import { useState } from 'react';

const useBrowserSearchHistoryItem = () => {
  const [sample, setSample] = useState('');
  return {
    sample,
  };
};

export default useBrowserSearchHistoryItem;
