import { useEffect, useMemo, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { IBottomSelectMenuProps } from '@@components/BasicComponents/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig, getNetworkName, NETWORK, SUPPORTED_NETWORKS } from '@@constants/network.constant';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useAccount = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const { t } = useTranslation();
  const { openModal, closeModal } = globalModalStore();
  const { data } = useWalletsQuery();
  const { selectedWalletIndex, selectedNetwork, walletList, selectNetwork, editWalletName } = walletPersistStore();
  const _selectedWalletIndex = useMemo(() => selectedWalletIndex[selectedNetwork], [selectedWalletIndex, selectedNetwork]);
  const [networkList, setNetworkList] = useState<IBottomSelectMenuProps[]>([]);

  useEffect(() => {
    const _networkList: IBottomSelectMenuProps[] = [];
    SUPPORTED_NETWORKS.forEach((network) => {
      _networkList.push({
        id: network,
        title: getNetworkConfig(getNetworkName(false, network)).name,
        isSelected: selectedNetwork === network,
        onPress: () => selectNetwork(network),
      });
    });
    setNetworkList(_networkList);
  }, [selectedNetwork]);

  const onChangeWalletInput = (value: string) => {
    editWalletName({ index: _selectedWalletIndex, name: value }, selectedNetwork);
    closeModal();
  };

  const moreEditList = useMemo(
    () => [
      {
        id: 'EDIT_WALLET',
        title: t('edit_wallet_name'),
        isSelected: false,
        onPress: () =>
          openModal(MODAL_TYPES.TEXT_INPUT, {
            title: t('edit_wallet_name'),
            defaultValue: walletList[selectedNetwork][_selectedWalletIndex]?.name,
            onConfirm: onChangeWalletInput,
          }),
      },
      {
        id: 'EDIT_TOKEN_LIST',
        title: t('edit_token_list'),
        isSelected: false,
        onPress: () => rootNavigation.navigate(ROOT_STACK_ROUTE.WALLET_EDIT_TOKEN_LIST),
      },
    ],
    [data, _selectedWalletIndex, selectedNetwork, walletList]
  );

  const onPressSwitchNetwork = () => {
    openModal(MODAL_TYPES.BOTTOM_SELECT, { modalTitle: t('dialog_network_switch_lbl_title'), menuList: networkList });
  };

  const onPressMore = () => {
    openModal(MODAL_TYPES.BOTTOM_SELECT, { modalTitle: '', menuList: moreEditList });
  };

  return {
    networkName: getNetworkConfig(getNetworkName(false, selectedNetwork)).name,
    onPressSwitchNetwork,
    onPressMore,
  };
};

export default useAccount;
