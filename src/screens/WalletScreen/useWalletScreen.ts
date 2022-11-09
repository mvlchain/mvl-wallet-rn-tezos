import { useEffect } from 'react';

import { Clutch } from '@@domain/blockchain/Clutch';
import authStore from '@@store/auth/authStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { walletStore } from '@@store/wallet/walletStore';
import { IWalletData } from '@@store/wallet/walletStore.type';

const useWalletScreen = () => {
  const { pKey } = authStore();
  const { walletList } = walletPersistStore();
  const { setWalletData } = walletStore();

  useEffect(() => {
    if (!pKey) return;
    const walletArr: IWalletData[] = walletList.map((walletItem) => {
      const idx = walletItem.index;
      const _wallet = Clutch.createWalletWithEntropy(pKey, `m/44'/60'/0'/0/${idx}`);

      return {
        ...walletItem,
        address: _wallet.address,
        privateKey: _wallet.privateKey,
      } as unknown as IWalletData;
    });
    setWalletData(walletArr);
  }, [walletList]);
};

export default useWalletScreen;
