import { useEffect, useState } from 'react';

import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IClaimWalletListMenuProps } from './ClaimWalletListMenu/ClaimWalletListMenu.type';
import { IUseClaimWalletListModalParam } from './ClaimWalletListModal.type';

const useClaimWalletListModal = ({ network, onPressClaim }: IUseClaimWalletListModalParam) => {
  const { walletList, setWallets } = walletPersistStore();
  const { data } = useWalletsQuery(network);
  const [wallet, setWallet] = useState<IClaimWalletListMenuProps[]>([]);

  const checkNetworkDefault = () => {
    return walletList[network][0].index === -1;
  };

  useEffect(() => {
    if (checkNetworkDefault() && data) {
      setWallets(
        network,
        data.map((wallet) => ({ index: wallet.index, name: wallet.name }))
      );
    }
  }, [data]);

  useEffect(() => {
    if (!data) return;
    const walletArr: IClaimWalletListMenuProps[] = data.map((walletItem) => {
      const { index, address } = walletItem;

      return {
        index,
        name: walletList[network][index]?.name,
        address,
        onPress: () => onPressClaim(address),
      } as unknown as IClaimWalletListMenuProps;
    });
    setWallet(walletArr);
  }, [data, walletList]);

  return { wallet };
};

export default useClaimWalletListModal;
