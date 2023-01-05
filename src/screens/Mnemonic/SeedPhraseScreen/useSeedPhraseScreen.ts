import { useState, useEffect, useLayoutEffect } from 'react';

import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation, useIsFocused, RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { BackHandler } from 'react-native';
import Toast from 'react-native-toast-message';

import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { useDi } from '@@hooks/useDi';
import useHeader from '@@hooks/useHeader';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';
import { authModalStore } from '@@store/auth/authModalStore';
import authStore from '@@store/auth/authStore';

const useSeedPhraseScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'SEED_PHRASE'>;
  type SeedPhraseScreenRouteProp = RouteProp<TRootStackParamList, 'SEED_PHRASE'>;
  const { params } = useRoute<SeedPhraseScreenRouteProp>();
  const navigation = useNavigation<rootStackProps>();
  const isFocused = useIsFocused();

  const { t } = useTranslation();

  const auth = useDi('AuthService');
  const uiService = useDi('UIService');
  const { handleStackHeaderOption } = useHeader();
  const { mnemonic, setMnemonic } = authStore();
  const { close } = authModalStore();

  const [type, setType] = useState<'show' | 'hide'>('hide');

  useEffect(() => {
    setMnemonic(auth.getMnemonicByPkey());
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setType('hide');
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', interruption);
    return () => backHandler.remove();
  }, [type, isFocused]);

  useLayoutEffect(() => {
    const title = t('seed_phrase_lbl_title');
    let headerOption = handleStackHeaderOption({ title });
    if (!params?.onlyCopy) {
      if (type === 'hide') {
        headerOption = {
          title,
          headerLeft: () => null,
        };
      } else {
        headerOption = handleStackHeaderOption({ title, isDisableBack: true, onPressBack: () => setType('hide') });
      }
    }
    navigation.setOptions(headerOption);
  }, [type]);

  const interruption = () => {
    if (type === 'show') {
      setType('hide');
      return false;
    } else {
      return true;
    }
  };

  const onPressViewSeedPhrase = async () => {
    // TODO: pincode입력 안했을 때 정상적으로 진행 안되고 빠져나가는지 테스트 필요
    const pincode = await uiService.triggerGetPincode();
    if (pincode) {
      close(AUTH_MODAL_NAME.PIN);
    }
    setType('show');
  };

  const onPressCopyMnemonic = () => {
    // TODO: mnemonic 없을 때 예외처리(에러처리)추가
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

  return { type, onlyCopy: params?.onlyCopy, onPressViewSeedPhrase, onPressCopyMnemonic, onPressNext };
};

export default useSeedPhraseScreen;
