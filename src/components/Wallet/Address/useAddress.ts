import { useCallback, useMemo } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useAddress = () => {
  const { t } = useTranslation();

  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  const _selectedWalletIndex = useMemo(() => selectedWalletIndex[selectedNetwork], [selectedWalletIndex, selectedNetwork]);

  const { data } = useWalletsQuery();

  const onPressCopyAddress = useCallback(() => {
    if (!data) return;
    Clipboard.setString(data[_selectedWalletIndex]?.address);
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('copy_to_clipboard'),
    });
  }, [data, _selectedWalletIndex]);

  return {
    address: (data && data[_selectedWalletIndex]?.address) ?? 'Wallet 1',
    onPressCopyAddress,
  };
};

export default useAddress;
