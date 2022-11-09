import { useEffect } from 'react';

import { Clutch } from '@@domain/blockchain/Clutch';
import { useDi } from '@@hooks/common/useDi';
import authStore from '@@store/auth/authStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { walletStore } from '@@store/wallet/walletStore';
import { IWalletData } from '@@store/wallet/walletStore.type';

const useWalletScreen = () => {
  const keyClient = useDi('KeyClient');
  const postboxKey = keyClient.postboxKeyHolder?.postboxKey;
  const { pKey } = authStore();
  const { walletList, initWallet } = walletPersistStore();
  const { setWalletData } = walletStore();

  useEffect(() => {
    if (!postboxKey) return;
    if (!walletList[postboxKey]) {
      initWallet(postboxKey);
    }
  }, []);

  useEffect(() => {
    if (!pKey || !postboxKey || !walletList[postboxKey]) return;
    const walletArr: IWalletData[] = walletList[postboxKey].map((walletItem) => {
      const idx = walletItem.index;
      const _wallet = Clutch.createWalletWithEntropy(pKey, `m/44'/60'/0'/0/${idx}`);

      return {
        ...walletItem,
        address: _wallet.address,
        privateKey: _wallet.privateKey,
      } as unknown as IWalletData;
    });
    setWalletData(walletArr);
  }, [walletList[postboxKey ?? '']]);
};

export default useWalletScreen;
