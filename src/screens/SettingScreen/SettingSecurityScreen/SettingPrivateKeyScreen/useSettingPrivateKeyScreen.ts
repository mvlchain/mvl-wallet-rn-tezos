import { useCallback, useEffect, useState } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { IBottomSelectMenuProps } from '@@components/BasicComponents/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { IWalletListMenuProps } from '@@components/BasicComponents/Modals/WalletListModal/WalletListMenu/WalletListMenu.type';
import { getNetworkConfig, getNetworkByBase, NETWORK, Network, SUPPORTED_NETWORKS } from '@@constants/network.constant';
import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import { useDi } from '@@hooks/useDi';
import authStore from '@@store/auth/authStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IPkeyWalletIndex } from './SettingPrivateKeyScreen.type';

const useSettingPrivateKeyScreen = () => {
  const uiService = useDi('UIService');
  const walletService = useDi('WalletService');
  const [pkey, setPkey] = useState('');
  const { t } = useTranslation();
  const { openModal } = globalModalStore();
  const { pKey } = authStore();
  const { walletList } = walletPersistStore();
  const [type, setType] = useState<'hide' | 'show'>('hide');
  const [networkList, setNetworkList] = useState<IBottomSelectMenuProps[]>([]);
  const [pkeySelectedNetwork, setPkeySelectedNetwork] = useState<Network>(NETWORK.ETH);
  const [pkeyWalletIndex, setPkeyWalletIndex] = useState<IPkeyWalletIndex>({
    [NETWORK.ETH]: 0,
    [NETWORK.BSC]: 0,
    [NETWORK.GOERLI]: 0,
    [NETWORK.BSC_TESTNET]: 0,
    [NETWORK.TEZOS]: 0,
    [NETWORK.TEZOS_GHOSTNET]: 0,
  });
  const [wallet, setWallet] = useState<IWalletListMenuProps[]>([]);
  const { data } = useWalletsQuery(pkeySelectedNetwork);

  useEffect(() => {
    if (!pKey || !data) return;
    const walletArr: IWalletListMenuProps[] = data.map((walletItem) => {
      const { index, address } = walletItem;

      return {
        index,
        name: walletList[pkeySelectedNetwork][index]?.name,
        address,
        onPress: () =>
          setPkeyWalletIndex((prev) => ({
            ...prev,
            [pkeySelectedNetwork]: index,
          })),
        isSelected: pkeyWalletIndex[pkeySelectedNetwork] === index,
      } as unknown as IWalletListMenuProps;
    });

    setWallet(walletArr);
  }, [data, walletList, pkeyWalletIndex, pkeySelectedNetwork]);

  useEffect(() => {
    const _networkList: IBottomSelectMenuProps[] = [];
    SUPPORTED_NETWORKS.forEach((network) => {
      _networkList.push({
        id: network,
        title: getNetworkConfig(getNetworkByBase(network)).name,
        isSelected: pkeySelectedNetwork === network,
        onPress: () => setPkeySelectedNetwork(network),
      });
    });
    setNetworkList(_networkList);
  }, [pkeySelectedNetwork]);

  const _getWalletInfo = async () => {
    const walletInfo = await walletService.getWalletInfo({ index: pkeyWalletIndex[pkeySelectedNetwork], network: pkeySelectedNetwork });
    setPkey(walletInfo.privateKey);
  };

  useEffect(() => {
    _getWalletInfo();
  }, [pkeySelectedNetwork, pkeyWalletIndex]);

  const onPressViewPrivatekey = async () => {
    await uiService.triggerGetPincode();
    setType('show');
  };

  const onPressCopyPrivateKey = useCallback(() => {
    // TODO: pKey 없을 때 예외처리(에러처리)추가
    if (!pkey) return;
    Clipboard.setString(pkey);
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('copy_to_clipboard'),
    });
  }, [pkey]);

  const openWalletListModal = () => {
    if (!wallet) return;
    openModal(MODAL_TYPES.WALLET_LIST, { menuList: wallet, disableCreate: true });
  };

  const onPressWalletList: Function | undefined = () => {
    if (!wallet) return;
    if (wallet.length > 1) {
      return openWalletListModal;
    } else {
      return undefined;
    }
  };

  const onPressSwitchNetwork = () => {
    openModal(MODAL_TYPES.BOTTOM_SELECT, { modalTitle: t('dialog_network_switch_lbl_title'), menuList: networkList });
  };

  return {
    type,
    pkey,
    wallet,
    pkeySelectedNetwork,
    pkeyWalletIndex,
    onPressViewPrivatekey,
    onPressCopyPrivateKey,
    onPressSwitchNetwork,
    onPressWalletList: onPressWalletList(),
  };
};

export default useSettingPrivateKeyScreen;
