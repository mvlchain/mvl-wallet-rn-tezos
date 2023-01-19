import { useEffect, useState } from 'react';

import { NETWORK } from '@@constants/network.constant';
import useWalletMutation from '@@hooks/queries/useWalletMutation';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IClaimWalletListMenuProps } from './ClaimWalletListMenu/ClaimWalletListMenu.type';
import { IUseClaimWalletListModalParam } from './ClaimWalletListModal.type';

const useClaimWalletListModal = ({ network, onPressClaim }: IUseClaimWalletListModalParam) => {
  const { walletList, setWallets } = walletPersistStore();
  const { mutate } = useWalletMutation();
  const { data } = useWalletsQuery(network, {
    onSuccess: (result) => {
      if (network === NETWORK.TEZOS && result.length === 0) {
        mutate({ index: 0, network: NETWORK.TEZOS });
      }
    },
  });
  const [wallet, setWallet] = useState<IClaimWalletListMenuProps[]>([]);

  const checkNetworkDefault = () => {
    return walletList[network][0] === undefined || walletList[network][0].index === -1;
  };

  useEffect(() => {
    if (checkNetworkDefault() && data && data.length > 0) {
      setWallets(
        network,
        data.map((wallet) => ({ index: wallet.index, name: wallet.name }))
      );
    }
  }, [walletList, data]);

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
