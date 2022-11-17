import { useEffect, useState } from 'react';

import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import authStore from '@@store/auth/authStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IWalletListMenuProps } from './WalletListMenu/WalletListMenu.type';

const useWalletListModal = () => {
  const { selectedWalletIndex, selectWallet } = walletPersistStore();
  const { data } = useWalletsQuery();
  const { pKey } = authStore();
  const [wallet, setWallet] = useState<IWalletListMenuProps[]>();

  useEffect(() => {
    if (!pKey || !data) return;
    const walletArr: IWalletListMenuProps[] = data.map((walletItem) => {
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
  }, [data]);

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
