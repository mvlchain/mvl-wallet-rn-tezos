import { useEffect } from 'react';

import { WalletService } from '@@domain/wallet/WalletService';
import { WalletState } from '@@store/WalletSlice';
import { useWalletStore } from '@@store/useWalletStore';

/**
 * UseCase: get current selected wallet from local storage
 */
export const useCurrentWallet = (service: WalletService) => {
  const [wallets, setWallets] = useWalletStore((state) => [state.wallets, state.setWallets]);

  useEffect(() => {
    (async () => {
      const result = await service.getWalletList();

      // updates wallets state
      // (WalletDto and WalletState have the same fields. just casting)
      setWallets(result as WalletState[]);
    })();
  }, []);

  return wallets;
};
