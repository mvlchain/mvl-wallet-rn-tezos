import { useEffect, useMemo, useState } from 'react';

import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import authStore from '@@store/auth/authStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IWalletListMenuProps } from './WalletListMenu/WalletListMenu.type';

const useWalletListModal = () => {
  const { selectedWalletIndex, selectedNetwork, walletList, selectWallet } = walletPersistStore();
  const { data } = useWalletsQuery();
  const { pKey } = authStore();
  const [wallet, setWallet] = useState<IWalletListMenuProps[]>([]);
  const _selectedWalletIndex = useMemo(() => selectedWalletIndex[selectedNetwork], [selectedWalletIndex, selectedNetwork]);

  useEffect(() => {
    if (!pKey || !data) return;
    const walletArr: IWalletListMenuProps[] = data.map((walletItem) => {
      const { index, address } = walletItem;

      return {
        index,
        name: walletList[selectedNetwork][index]?.name,
        address,
        onPress: () => selectWallet(index),
        isSelected: _selectedWalletIndex === index,
      } as unknown as IWalletListMenuProps;
    });
    setWallet(walletArr);
  }, [data, walletList, selectedNetwork, _selectedWalletIndex]);

  useEffect(() => {
    if (!wallet) return;
    setWallet(
      wallet?.map((val) => {
        return {
          ...val,
          isSelected: val.index === _selectedWalletIndex,
        };
      })
    );
  }, [_selectedWalletIndex]);

  return { wallet };
};

export default useWalletListModal;
