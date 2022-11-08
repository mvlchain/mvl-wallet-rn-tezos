import { useState } from 'react';

const useWalletSelector = () => {
  const [sample, setSample] = useState('');
  return {
    sample,
  };
};

export default useWalletSelector;
