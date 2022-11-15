import { useState } from 'react';

import { MODAL_TYPES } from '@@components/Modals/GlobalModal';
import useWalletListModal from '@@components/Modals/WalletListModal/useWalletListModal';
import { useDi } from '@@hooks/common/useDi';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useWalletSelector = () => {
  const { wallet } = useWalletListModal();
  const { openModal } = globalModalStore();
  const keyClient = useDi('KeyClient');

  const postboxkey = keyClient.postboxKeyHolder?.postboxKey ?? 'default';
  const { selectedWalletIndex } = walletPersistStore();
  const { data } = useWalletsQuery();
  const onPressWalletList = () => {
    if (!wallet) return;
    openModal(MODAL_TYPES.WALLET_LIST, { menuList: wallet });
  };

  return {
    name: data ? data[selectedWalletIndex[postboxkey]]?.name : 'Wallet 1',
    onPressWalletList,
  };
};

export default useWalletSelector;
