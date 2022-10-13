import React from 'react';

import authStore from '@@store/authStore';

const useSelectMnemonic = () => {
  const { focusedIndex, setMnemonic } = authStore();
  const onPressSelectChip = (word: string) => {
    if (focusedIndex === -1) return;
    setMnemonic({ word, index: focusedIndex });
  };
  return {
    onPressSelectChip,
  };
};

export default useSelectMnemonic;
