import { useState } from 'react';

const useTokenListItem = () => {
  const [sample, setSample] = useState('');
  return {
    sample,
  };
};

export default useTokenListItem;
