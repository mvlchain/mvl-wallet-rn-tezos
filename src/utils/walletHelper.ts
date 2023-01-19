import { container } from 'tsyringe';

import { WalletService } from '@@domain/wallet/services/WalletService';
import walletPersistStore from '@@store/wallet/walletPersistStore';

// TODO: performance tuning, extract wallet address from root public key?
export const getAddress = () => {
  const walletService = container.resolve<WalletService>('WalletService');
  const _walletPersistStore = walletPersistStore.getState();
  const selectedNetwork = _walletPersistStore.selectedNetwork;
  const selectedWalletIndex = _walletPersistStore.selectedWalletIndex[selectedNetwork];
  const { address } = walletService.getWalletInfoFromStore({ index: selectedWalletIndex, network: selectedNetwork });
  return address;
};
