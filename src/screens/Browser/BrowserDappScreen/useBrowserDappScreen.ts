import { useState } from 'react';

const useBrowserDappScreen = () => {
  const [sample, setSample] = useState('');
  return {
    sample,
  };
};

export default useBrowserDappScreen;
