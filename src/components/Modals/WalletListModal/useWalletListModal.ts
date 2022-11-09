import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import authStore from '@@store/auth/authStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { walletStore } from '@@store/wallet/walletStore';

import { IWalletListMenuProps } from './WalletListMenu/WalletListMenu.type';

const useWalletListModal = () => {
  const { selectedWalletIndex, selectWallet } = walletPersistStore();
  const { walletData } = walletStore();
  const { pKey } = authStore();
  const [wallet, setWallet] = useState<IWalletListMenuProps[]>();

  useEffect(() => {
    if (!pKey) return;
    console.log('walletData:  ', walletData);
    const walletArr: IWalletListMenuProps[] = walletData.map((walletItem) => {
      const { index, name, address } = walletItem;

      return {
        index,
        name,
        address,
        onPress: () => selectWallet(index),
        isSelected: selectedWalletIndex === index,
      } as unknown as IWalletListMenuProps;
    });
    setWallet(walletArr);
  }, [walletData]);

  useEffect(() => {
    if (!wallet) return;
    setWallet(
      wallet?.map((val) => {
        return {
          ...val,
          isSelected: val.index === selectedWalletIndex,
        };
      })
    );
  }, [selectedWalletIndex]);

  return { wallet };
};

export default useWalletListModal;
