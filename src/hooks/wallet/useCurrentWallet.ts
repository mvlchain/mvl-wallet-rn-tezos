import { useEffect } from 'react';

import { WalletRepository } from '@@domain/wallet/WalletRepository';
import { useWalletStore } from '@@store/WalletStore';

/**
 * UseCase: get current selected wallet from local storage
 */
export const useCurrentWallet = (repository: WalletRepository) => {
  const [wallets, setWallets] = useWalletStore((state) => [state.wallets, state.setWallets]);

  useEffect(() => {
    (async () => {
      // TODO we will get param xpub from the store, mayby?
      const result = await repository.getWallets('xpub');

      // updates wallets state
      setWallets(result);
    })();
  }, []);

  return wallets;
};
