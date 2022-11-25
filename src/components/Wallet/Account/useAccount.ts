import { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { IBottomSelectMenuProps } from '@@components/BasicComponents/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { NETWORK } from '@@constants/network.constant';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { formatNetwork } from '@@utils/format';

const useAccount = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const { t } = useTranslation();
  const { openModal, closeModal } = globalModalStore();
  const { data } = useWalletsQuery();
  const { selectedWalletIndex, selectedNetwork, selectNetwork } = walletPersistStore();

  // TODO: network를 서버에서 받아오는지 체크, 현재는 로컬에서 저장 중
  const dummyNetwork: IBottomSelectMenuProps[] = useMemo(
    () => [
      {
        title: formatNetwork(NETWORK.ETHEREUM),
        isSelected: selectedNetwork === NETWORK.ETHEREUM,
        onPress: () => selectNetwork(NETWORK.ETHEREUM),
      },
      {
        title: formatNetwork(NETWORK.BSC),
        isSelected: selectedNetwork === NETWORK.BSC,
        onPress: () => selectNetwork(NETWORK.BSC),
      },
    ],
    [selectedNetwork]
  );

  const onChangeWalletInput = (value: string) => {
    console.log('input value:  ', value);
    // TODO: call wallet name change method
    closeModal();
  };

  const moreEditList = useMemo(
    () => [
      {
        title: t('edit_wallet_name'),
        isSelected: false,
        onPress: () =>
          openModal(MODAL_TYPES.TEXT_INPUT, {
            title: t('edit_wallet_name'),
            defaultValue: data && data[selectedWalletIndex]?.name,
            onConfirm: onChangeWalletInput,
          }),
      },
      {
        title: t('edit_token_list'),
        isSelected: false,
        onPress: () => rootNavigation.navigate(ROOT_STACK_ROUTE.WALLET_EDIT_TOKEN_LIST),
      },
    ],
    [data]
  );

  const onPressSwitchNetwork = () => {
    openModal(MODAL_TYPES.BOTTOM_SELECT, { modalTitle: t('dialog_network_switch_lbl_title'), menuList: dummyNetwork });
  };

  const onPressMore = () => {
    openModal(MODAL_TYPES.BOTTOM_SELECT, { modalTitle: '', menuList: moreEditList });
  };

  return {
    networkName: formatNetwork(selectedNetwork),
    onPressSwitchNetwork,
    onPressMore,
  };
};

export default useAccount;
