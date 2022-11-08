import { useState } from 'react';

const useTokenList = () => {
  const [sample, setSample] = useState('');
  return {
    sample,
  };
};

export default useTokenList;
