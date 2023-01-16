import { useState } from 'react';

const useBrowserSearchScreen = () => {
  const [sample, setSample] = useState('');
  return {
    sample,
  };
};

export default useBrowserSearchScreen;
