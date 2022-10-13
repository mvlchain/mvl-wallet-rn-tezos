import { useEffect, useState } from 'react';

import authStore from '@@store/authStore';

const useConfirmSeedPhrase = () => {
  const { mnemonicList } = authStore();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (mnemonicList.filter((mnemonic) => mnemonic.word === '').length !== 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [mnemonicList]);

  return {
    disabled,
  };
};

export default useConfirmSeedPhrase;
