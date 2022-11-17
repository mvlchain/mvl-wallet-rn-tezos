import { useCallback } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useAddress = () => {
  const { t } = useTranslation();

  const { selectedWalletIndex } = walletPersistStore();

  const { data } = useWalletsQuery();

  const onPressCopyAddress = useCallback(() => {
    if (!data) return;
    Clipboard.setString(data[selectedWalletIndex]?.address);
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('copy_to_clipboard'),
    });
  }, [data]);

  return {
    address: (data && data[selectedWalletIndex]?.address) ?? 'Wallet 1',
    onPressCopyAddress,
  };
};

export default useAddress;
