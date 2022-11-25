import { useEffect, useState } from 'react';

import authStore from '@@store/auth/authStore';

const useSelectMnemonic = () => {
  const { mnemonic, mnemonicList, focusedIndex, setMnemonicList, removeMnemonic, setFocusedIndex } = authStore();
  const [mnemonicArr, setMnemonicArr] = useState<string[]>([]);

  useEffect(() => {
    // mnemonic 없을 때 예외처리(에러처리)추가
    if (!mnemonic) return;
    setMnemonicArr(mnemonic.split(' ').sort(() => Math.random() - 0.5));
  }, [mnemonic]);

  const onPressSelectChip = (word: string, index: number) => {
    const selected = mnemonicList.filter((mnemonic) => mnemonic.selectChipIndex === index);
    if (selected.length !== 0) {
      removeMnemonic(index);
      setFocusedIndex(selected[0].index);
    } else {
      if (focusedIndex === -1) return;
      setMnemonicList({ word, index: focusedIndex, selectChipIndex: index });
    }
  };
  return {
    mnemonicList,
    mnemonicArr,
    onPressSelectChip,
  };
};

export default useSelectMnemonic;
