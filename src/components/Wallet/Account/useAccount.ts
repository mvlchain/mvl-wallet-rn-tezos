import { useEffect, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig, getNetworkByBase, NETWORK } from '@@constants/network.constant';
import useWalletMutation from '@@hooks/queries/useWalletMutation';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import { useNetworkList } from '@@hooks/useNetworkList';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import authStore from '@@store/auth/authStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useAccount = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const { t } = useTranslation();
  const { selectedWalletIndex, selectedNetwork, walletList, setWallets, editWalletName } = walletPersistStore();

  const { openModal, closeModal } = globalModalStore();
  const { pKey } = authStore();
  const { networkList } = useNetworkList();
  const _selectedWalletIndex = useMemo(() => selectedWalletIndex[selectedNetwork], [selectedWalletIndex, selectedNetwork]);
  const { mutate } = useWalletMutation();
  const { data } = useWalletsQuery(selectedNetwork, {
    onSuccess: (result) => {
      if (selectedNetwork === 'TEZOS' && result.length === 0) {
        mutate({ index: 0, network: NETWORK.TEZOS });
      }
    },
  });

  // TODO: 추후 네트워크 추가 시 walletList에 해당 네트워크 name object추가하기
  const checkNetworkDefault = () => {
    return walletList[selectedNetwork][0].index === -1;
  };

  useEffect(() => {
    if (checkNetworkDefault() && data && pKey) {
      // TODO: 추후 네트워크 추가 시 네트워크에 따라 알맞게 set해주기.
      // 지금은 ETH와 BSC가 생성시 함께 사용하기 때문에 함께 넣어주고 있음.
      setWallets(
        selectedNetwork,
        data.map((wallet) => ({ index: wallet.index, name: wallet.name }))
      );
    }
  }, [walletList, data, pKey]);

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

  const onPressReceive = () => {
    if (!data) return;
    rootNavigation.navigate('WALLET_TOKEN_RECEIVE_SELECT', {
      network: selectedNetwork,
      address: data[_selectedWalletIndex]?.address,
    });
  };

  return {
    walletName: walletList[selectedNetwork][_selectedWalletIndex]?.name ?? 'default wallet',
    networkName: getNetworkConfig(getNetworkByBase(selectedNetwork)).name,
    address: (data && data[_selectedWalletIndex]?.address) ?? 'default address',
    onPressSwitchNetwork,
    onPressMore,
    onPressReceive,
  };
};

export default useAccount;
