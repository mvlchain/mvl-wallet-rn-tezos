import { useEffect, useMemo } from 'react';

import walletPersistStore from '@@store/wallet/walletPersistStore';

const useWalletScreen = () => {
  const { selectedNetwork, selectedWalletIndex, initWallet } = walletPersistStore();
  const _selectedWalletIndex = useMemo(() => selectedWalletIndex[selectedNetwork], [selectedWalletIndex, selectedNetwork]);

  useEffect(() => {
    if (typeof selectedNetwork === 'string' && typeof _selectedWalletIndex === 'number') return;
    initWallet();
  }, []);
};

export default useWalletScreen;
