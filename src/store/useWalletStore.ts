import create from 'zustand';

import { createWalletSlice } from './WalletSlice';
import { WalletStoreSlices } from './WalletStoreStates';

/**
 * ex) const { wallets } = useWalletStore();
 */
export const useWalletStore = create<WalletStoreSlices>()((...p) => ({
  ...createWalletSlice(...p),
}));
