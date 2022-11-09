import { useEffect, useRef } from 'react';

import { Clutch } from '@@domain/blockchain/Clutch';
import authStore from '@@store/auth/authStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { walletStore } from '@@store/wallet/walletStore';
import { IWalletData } from '@@store/wallet/walletStore.type';

const useWalletScreen = () => {
  const { pKey } = authStore();
  const { walletList } = walletPersistStore();
  const { setWalletData } = walletStore();
  const walletListRef = useRef(walletList);
  // useEffect(() => {
  //   if (!pKey) return;
  //   const wallet = Clutch.createWalletWithEntropy(pKey, "m/44'/60'/0'/0/0");
  //   console.log('wallet:  ', wallet);
  //   console.log('wallet.address:  ', wallet.address);
  //   console.log(' wallet.publicKey:  ', wallet.publicKey);
  //   console.log(' wallet.privateKey:  ', wallet.privateKey);

  //   // const mnemonic = keyClient.getMnemonicByPkey();
  //   // const keyPair = Clutch.createKeyPair(mnemonic, "m/44'/60'/0'/0/0");
  //   // console.log('mnemonic:  ', mnemonic);
  //   // console.log('keyPair:  ', keyPair);
  // }, [pKey]);
  useEffect(() => {
    if (!pKey) return;
    console.log('walletList:  ', walletList);
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
  useEffect(() => walletPersistStore.subscribe((state) => walletListRef.current === state.walletList), []);
};

export default useWalletScreen;
