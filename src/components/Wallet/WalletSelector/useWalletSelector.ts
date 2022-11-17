import { MODAL_TYPES } from '@@components/Modals/GlobalModal';
import useWalletListModal from '@@components/Modals/WalletListModal/useWalletListModal';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useWalletSelector = () => {
  const { wallet } = useWalletListModal();
  const { openModal } = globalModalStore();

  const { selectedWalletIndex } = walletPersistStore();
  const { data } = useWalletsQuery();
  const onPressWalletList = () => {
    if (!wallet) return;
    openModal(MODAL_TYPES.WALLET_LIST, { menuList: wallet });
  };

  return {
    name: data ? data[selectedWalletIndex]?.name : 'Wallet 1',
    onPressWalletList,
  };
};

export default useWalletSelector;
