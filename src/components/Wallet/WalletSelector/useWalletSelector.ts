import { useEffect } from 'react';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import useWalletListModal from '@@components/BasicComponents/Modals/WalletListModal/useWalletListModal';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import authStore from '@@store/auth/authStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useWalletSelector = () => {
  const { wallet } = useWalletListModal();
  const { openModal } = globalModalStore();

  const { selectedWalletIndex, selectedNetwork, walletList, setWallets } = walletPersistStore();
  const { pKey } = authStore();
  const { data } = useWalletsQuery();

  const onPressWalletList = () => {
    if (!wallet) return;
    openModal(MODAL_TYPES.WALLET_LIST, { menuList: wallet });
  };

  // TODO: 추후 네트워크 추가 시 walletList에 해당 네트워크 name object추가하기
  const checkNetworkDefault = () => {
    const networkList = Object.values(walletList);
    let isDefault = false;
    networkList.forEach((network) => {
      if (network[0]?.index === -1) {
        isDefault = true;
      }
    });
    return isDefault;
  };

  useEffect(() => {
    if (checkNetworkDefault() && data && pKey) {
      // TODO: 추후 네트워크 추가 시 네트워크에 따라 알맞게 set해주기.
      // 지금은 ETH와 BSC가 생성시 함께 사용하기 때문에 함께 넣어주고 있음.
      setWallets(data.map((wallet) => ({ index: wallet.index, name: wallet.name })));
    }
  }, [walletList, data, pKey]);

  return {
    name: walletList[selectedNetwork][selectedWalletIndex]?.name,
    onPressWalletList,
  };
};

export default useWalletSelector;
