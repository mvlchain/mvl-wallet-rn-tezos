import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';

const useAddress = () => {
  const { t } = useTranslation();

  const onPressCopyAddress = (address: string) => {
    Clipboard.setString(address);
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('copy_to_clipboard'),
    });
  };

  return {
    onPressCopyAddress,
  };
};

export default useAddress;
