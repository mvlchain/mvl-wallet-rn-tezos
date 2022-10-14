import { useState, useEffect } from 'react';

import { IUseMnemonicProps } from './Mnemonic.type';

const useMnemonic = ({ mnemonic }: IUseMnemonicProps) => {
  const [mnemonicArr, setMnemonicArr] = useState<string[]>([]);

  useEffect(() => {
    setMnemonicArr(mnemonic.split(' '));
  }, []);

  return { mnemonicArr };
};

export default useMnemonic;
