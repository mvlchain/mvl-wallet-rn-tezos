import { useState } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { useDi } from '@@hooks/common/useDi';

const useSettingPrivateKeyScreen = () => {
  // TODO: 실제 데이터 연동
  const pkey = 'testPkey!!';
  const { t } = useTranslation();
  const uiService = useDi('UIService');
  const [type, setType] = useState<'hide' | 'show'>('hide');

  const onPressViewPrivatekey = async () => {
    await uiService.triggerGetPincode();
    setType('show');
  };

  const onPressCopyPrivateKey = () => {
    // TODO: pKey 없을 때 예외처리(에러처리)추가
    if (!pkey) return;
    Clipboard.setString(pkey);
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('copy_to_clipboard'),
    });
  };

  return {
    type,
    pkey,
    onPressViewPrivatekey,
    onPressCopyPrivateKey,
  };
};

export default useSettingPrivateKeyScreen;
