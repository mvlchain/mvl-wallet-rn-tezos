import { StateCreator } from 'zustand';

import { WalletStoreSlices } from './WalletStoreStates';

export type WalletState = {
  id: string;
  name: string;
  network: string;
  address: string;
  index: number;
};

export interface WalletSlice {
  readonly wallets: WalletState[];
  setWallets: (items: WalletState[]) => void;
}

export const createWalletSlice: StateCreator<WalletStoreSlices, [], [], WalletSlice> = (set) => ({
  wallets: [],
  setWallets: (items: WalletState[]) => set((state) => ({ wallets: items })),
});
