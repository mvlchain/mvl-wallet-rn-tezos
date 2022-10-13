import { useEffect, useState } from 'react';

import authStore from '@@store/authStore';

interface IuseSelectMnemonic {
  mnemonic: string;
}

const useSelectMnemonic = ({ mnemonic }: IuseSelectMnemonic) => {
  const { mnemonicList, focusedIndex, setMnemonic, removeMnemonic, setFocusedIndex } = authStore();
  const [mnemonicArr, setMnemonicArr] = useState<string[]>([]);

  useEffect(() => {
    setMnemonicArr(mnemonic.split(' ').sort(() => Math.random() - 0.5));
  }, []);

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
    mnemonicArr,
    onPressSelectChip,
  };
};

export default useSelectMnemonic;
