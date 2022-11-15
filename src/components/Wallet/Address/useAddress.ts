import { useCallback } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { useDi } from '@@hooks/common/useDi';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useAddress = () => {
  const { t } = useTranslation();
  const keyClient = useDi('KeyClient');

  const postboxkey = keyClient.postboxKeyHolder?.postboxKey ?? 'default';
  const { selectedWalletIndex } = walletPersistStore();

  const { data } = useWalletsQuery();

  const onPressCopyAddress = useCallback(() => {
    if (!data) return;
    Clipboard.setString(data[selectedWalletIndex[postboxkey]]?.address);
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('copy_to_clipboard'),
    });
  }, [data]);

  return {
    address: (data && data[selectedWalletIndex[postboxkey]]?.address) ?? 'Wallet 1',
    onPressCopyAddress,
  };
};

export default useAddress;
