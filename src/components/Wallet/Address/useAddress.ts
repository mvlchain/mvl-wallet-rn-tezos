import { useState } from 'react';

const useAddress = () => {
  const [sample, setSample] = useState('');
  return {
    sample,
  };
};

export default useAddress;
