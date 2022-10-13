import { useEffect, useState } from 'react';

import useAuthStore from '@@store/useAuthStore';

const useConfirmSeedPhrase = () => {
  const { mnemonicList } = useAuthStore();
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
