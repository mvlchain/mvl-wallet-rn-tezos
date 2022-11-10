import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { useDi } from '@@hooks/common/useDi';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { walletStore } from '@@store/wallet/walletStore';

const useAddress = () => {
  const { t } = useTranslation();
  const keyClient = useDi('KeyClient');

  const postboxkey = keyClient.postboxKeyHolder?.postboxKey ?? 'default';
  const { selectedWalletIndex } = walletPersistStore();
  const { walletData } = walletStore();

  const onPressCopyAddress = () => {
    Clipboard.setString(walletData[selectedWalletIndex[postboxkey]]?.address);
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('copy_to_clipboard'),
    });
  };
  return {
    address: walletData[selectedWalletIndex[postboxkey]]?.address ?? 'Wallet 1',
    onPressCopyAddress,
  };
};

export default useAddress;
