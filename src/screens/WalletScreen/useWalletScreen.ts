import { useEffect } from 'react';

import walletPersistStore from '@@store/wallet/walletPersistStore';

const useWalletScreen = () => {
  const { selectedNetwork, selectedWalletIndex, initWallet } = walletPersistStore();
  useEffect(() => {
    if (typeof selectedNetwork === 'string' && typeof selectedWalletIndex === 'number') return;
    initWallet();
  }, []);
};

export default useWalletScreen;
