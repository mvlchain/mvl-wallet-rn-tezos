import { useEffect } from 'react';

import { BlockChain } from '@@domain/blockchain/BlockChain';
import { WalletService } from '@@domain/wallet/WalletService';
import authStore from '@@store/auth/authStore';
import { walletStore } from '@@store/wallet/walletStore';

/**
 * UseCase: get current selected wallet from local storage
 */
export const useCurrentWallet = (service: WalletService) => {
  const { walletData, setWalletData } = walletStore();
  const { pKey } = authStore();

  const createWallet = async (index: number, blockchain: BlockChain) => {
    if (!pKey) return;
    const data = await service.createWallet(pKey, index, blockchain);
    fetchWalletList();
    return data;
  };

  const fetchWalletList = async () => {
    const result = await service.getWalletList();

    // updates wallets state
    // (WalletDto and WalletState have the same fields. just casting)
    setWalletData(result);
  };

  useEffect(() => {
    fetchWalletList();
  }, []);

  return { walletData, refetch: fetchWalletList, createWallet };
};
