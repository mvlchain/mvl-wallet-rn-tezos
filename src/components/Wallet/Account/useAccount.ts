import { useTranslation } from 'react-i18next';

import { IBottomSelectMenuProps } from '@@components/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import { IBottomSelectModalProps } from '@@components/Modals/BottomSelectModal/BottomSelectModal.type';
import { MODAL_TYPES } from '@@components/Modals/GlobalModal';
import { NETWORK } from '@@constants/network.constant';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { formatNetwork } from '@@utils/format';

const useAccount = () => {
  const dummyNetwork: IBottomSelectMenuProps[] = [
    {
      title: formatNetwork(NETWORK.ETHEREUM),
      isSelected: true,
      onPress: () => console.log('select ethereum'),
    },
    {
      title: formatNetwork(NETWORK.BSC),
      isSelected: false,
      onPress: () => console.log('select binance'),
    },
  ];
  const { t } = useTranslation();
  const { openModal } = globalModalStore();

  const onPressSwitchNetwork = () => {
    openModal(MODAL_TYPES.BOTTOM_SELECT, { modalTitle: t('dialog_network_switch_lbl_title'), menuList: dummyNetwork });
  };

  return {
    onPressSwitchNetwork,
  };
};

export default useAccount;
