import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { IBottomSelectMenuProps } from '@@components/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import { MODAL_TYPES } from '@@components/Modals/GlobalModal';
import { NETWORK } from '@@constants/network.constant';
import { useDi } from '@@hooks/common/useDi';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { walletStore } from '@@store/wallet/walletStore';
import { formatNetwork } from '@@utils/format';

const useAccount = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const { t } = useTranslation();
  const keyClient = useDi('KeyClient');
  const { openModal, closeModal } = globalModalStore();
  const { walletData } = walletStore();
  const { selectedWalletIndex } = walletPersistStore();
  const postboxkey = keyClient.postboxKeyHolder?.postboxKey ?? 'default';

  // TODO: 실제 데이터 연동 및 onPress시 해당 network데이터 불러오기 작업
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

  const onChangeWalletInput = (value: string) => {
    console.log('input value:  ', value);
    // TODO: call wallet name change method
    closeModal();
  };

  const moreEditList = [
    {
      title: t('edit_wallet_name'),
      isSelected: false,
      onPress: () =>
        openModal(MODAL_TYPES.TEXT_INPUT, {
          title: t('edit_wallet_name'),
          defaultValue: walletData[selectedWalletIndex[postboxkey]]?.name,
          onConfirm: onChangeWalletInput,
        }),
    },
    {
      title: t('edit_token_list'),
      isSelected: false,
      onPress: () => rootNavigation.navigate(ROOT_STACK_ROUTE.WALLET_EDIT_TOKEN_LIST),
    },
  ];

  const onPressSwitchNetwork = () => {
    openModal(MODAL_TYPES.BOTTOM_SELECT, { modalTitle: t('dialog_network_switch_lbl_title'), menuList: dummyNetwork });
  };

  const onPressMore = () => {
    openModal(MODAL_TYPES.BOTTOM_SELECT, { modalTitle: '', menuList: moreEditList });
  };

  return {
    onPressSwitchNetwork,
    onPressMore,
  };
};

export default useAccount;
