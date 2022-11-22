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

  const { selectedWalletIndex, walletList, setWallets } = walletPersistStore();
  const { pKey } = authStore();
  const { data } = useWalletsQuery();

  const onPressWalletList = () => {
    if (!wallet) return;
    openModal(MODAL_TYPES.WALLET_LIST, { menuList: wallet });
  };

  useEffect(() => {
    if (walletList[0].index === -1 && data && pKey) {
      setWallets(data.map((wallet) => ({ index: wallet.index, name: wallet.name })));
    }
  }, [walletList, data, pKey]);

  return {
    name: walletList[selectedWalletIndex]?.name,
    onPressWalletList,
  };
};

export default useWalletSelector;
