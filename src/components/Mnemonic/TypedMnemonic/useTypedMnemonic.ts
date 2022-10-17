import { useEffect } from 'react';

import authStore from '@@store/auth/authStore';
import { TMnemonic } from '@@types/MnemonicType';

const useTypedMnemonic = () => {
  const { mnemonicList, focusedIndex, initMnemonic, setFocusedIndex, removeMnemonic } = authStore();

  useEffect(() => {
    const nums = new Set<number>();
    while (nums.size !== 10) {
      nums.add(Math.floor(Math.random() * 24) + 1);
    }
    const result = [...nums].sort((a, b) => a - b).map((number) => ({ index: number, word: '', selectChipIndex: -1 } as TMnemonic));
    initMnemonic(result);
    setFocusedIndex(result[0].index);
  }, []);

  const onPressTypedChip = (index: number) => {
    const mnemonic = mnemonicList.filter((mnemonic) => mnemonic.index === index)[0];
    if (mnemonic === undefined) {
      throw new Error('random index not matching');
    }

    if (mnemonic.word !== '') {
      removeMnemonic(mnemonic.selectChipIndex);
    }
    setFocusedIndex(index);
  };

  return {
    mnemonicList,
    focusedIndex,
    onPressTypedChip,
  };
};

export default useTypedMnemonic;
