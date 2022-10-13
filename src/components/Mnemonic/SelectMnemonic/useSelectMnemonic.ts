import React from 'react';

import authStore from '@@store/authStore';

const useSelectMnemonic = () => {
  const { mnemonicList, focusedIndex, setMnemonic, removeMnemonic, setFocusedIndex } = authStore();
  const onPressSelectChip = (word: string, index: number) => {
    const selected = mnemonicList.filter((mnemonic) => mnemonic.selectChipIndex === index);
    if (selected.length !== 0) {
      removeMnemonic(index);
      setFocusedIndex(selected[0].index);
    } else {
      if (focusedIndex === -1) return;
      setMnemonic({ word, index: focusedIndex, selectChipIndex: index });
    }
  };
  return {
    mnemonicList,
    onPressSelectChip,
  };
};

export default useSelectMnemonic;
