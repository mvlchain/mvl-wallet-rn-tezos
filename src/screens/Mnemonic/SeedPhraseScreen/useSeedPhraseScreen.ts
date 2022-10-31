import { useState, useEffect } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { useDi } from '@@hooks/common/useDi';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import authStore from '@@store/auth/authStore';

const useSeedPhraseScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'SEED_PHRASE'>;
  const navigation = useNavigation<rootStackProps>();

  const { t } = useTranslation();

  const auth = useDi('AuthService');
  const uiService = useDi('UIService');
  const { mnemonic, setMnemonic } = authStore();
  const [type, setType] = useState<'show' | 'hide'>('hide');

  useEffect(() => {
    setMnemonic(auth.getMnemonicByPkey());
  }, []);

  const onPressViewSeedPhrase = async () => {
    // TODO: pincode입력 안했을 때 정상적으로 진행 안되고 빠져나가는지 테스트 필요
    await uiService.triggerGetPincode();
    setType('show');
  };

  const onPressCopymnemonic = () => {
    // mnemonic 없을 때 예외처리(에러처리)추가
    if (!mnemonic) return;
    Clipboard.setString(mnemonic);
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('copy_to_clipboard'),
    });
  };

  const onPressNext = () => {
    navigation.navigate(ROOT_STACK_ROUTE.SEED_PHRASE_CONFIRM);
  };

  return { type, onPressViewSeedPhrase, onPressCopymnemonic, onPressNext };
};

export default useSeedPhraseScreen;
