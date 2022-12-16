import { useEffect, useState } from 'react';

import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import authStore from '@@store/auth/authStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IClaimWalletListMenuProps } from './ClaimWalletListMenu/ClaimWalletListMenu.type';
import { IUseClaimWalletListModalParam } from './ClaimWalletListModal.type';

const useClaimWalletListModal = ({ network, onPressClaim }: IUseClaimWalletListModalParam) => {
  const { walletList } = walletPersistStore();
  const { data } = useWalletsQuery(network);
  const { pKey } = authStore();
  const [wallet, setWallet] = useState<IClaimWalletListMenuProps[]>([]);

  useEffect(() => {
    if (!pKey || !data) return;
    const walletArr: IClaimWalletListMenuProps[] = data.map((walletItem) => {
      const { index, address } = walletItem;

      return {
        index,
        name: walletList[network][index]?.name,
        address,
        onPress: () => onPressClaim(),
      } as unknown as IClaimWalletListMenuProps;
    });

    setWallet(walletArr);
  }, [data, walletList]);

  return { wallet };
};

export default useClaimWalletListModal;
