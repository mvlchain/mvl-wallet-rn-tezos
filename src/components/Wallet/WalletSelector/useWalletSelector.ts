import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import useWalletListModal from '@@components/BasicComponents/Modals/WalletListModal/useWalletListModal';
import globalModalStore from '@@store/globalModal/globalModalStore';

const useWalletSelector = () => {
  const { wallet } = useWalletListModal();
  const { openModal } = globalModalStore();

  const onPressWalletList = () => {
    if (!wallet) return;
    openModal(MODAL_TYPES.WALLET_LIST, { menuList: wallet });
  };

  return {
    onPressWalletList,
  };
};

export default useWalletSelector;
