import { useState } from 'react';

const useAccount = () => {
  const [sample, setSample] = useState('');
  return {
    sample,
  };
};

export default useAccount;
