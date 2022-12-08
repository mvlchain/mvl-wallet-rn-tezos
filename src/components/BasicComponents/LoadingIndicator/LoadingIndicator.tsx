import React from 'react';

import LottieView from 'lottie-react-native';

import * as S from './LoadingIndicator.style';
import useLoadingIndicator from './useLoadingIndicator';

function LoadingIndicator() {
  const { lottieProgress, isLoading } = useLoadingIndicator();

  return isLoading ? (
    <S.IndicatorContainer>
      <LottieView progress={lottieProgress} source={require('@@assets/lottie/lottie_loading.json')} style={S.styles.lottie} />
    </S.IndicatorContainer>
  ) : null;
}

export default LoadingIndicator;
