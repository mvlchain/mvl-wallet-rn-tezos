import React from 'react';

import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';

import * as S from './EarnEventTransferringScreen.style';
import useEarnEventTransferringScreen from './useEarnEventTransferringScreen';

function EarnEventTransferringScreen() {
  const { t } = useTranslation();
  const { lottieProgress } = useEarnEventTransferringScreen();
  return (
    <S.Container>
      <LottieView progress={lottieProgress} source={require('@@assets/lottie/lottie_loading.json')} style={S.styles.lottie} />
      <S.Text>{t('await_title_transferring')}</S.Text>
    </S.Container>
  );
}

export default EarnEventTransferringScreen;
