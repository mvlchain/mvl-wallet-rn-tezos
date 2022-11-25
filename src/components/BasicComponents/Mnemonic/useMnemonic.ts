import { useState, useEffect } from 'react';

import authStore from '@@store/auth/authStore';

const useMnemonic = () => {
  const { mnemonic } = authStore();
  const [mnemonicArr, setMnemonicArr] = useState<string[]>([]);

  useEffect(() => {
    // mnemonic 없을 때 예외처리(에러처리)추가
    if (!mnemonic) return;
    setMnemonicArr(mnemonic.split(' '));
  }, [mnemonic]);

  return { mnemonicArr };
};

export default useMnemonic;
