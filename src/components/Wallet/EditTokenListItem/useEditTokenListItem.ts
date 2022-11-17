import { useState } from 'react';

const useEditTokenListItem = () => {
  const [sample, setSample] = useState('');
  return {
    sample,
  };
};

export default useEditTokenListItem;
