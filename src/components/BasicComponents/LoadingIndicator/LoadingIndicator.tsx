import React from 'react';

import LottieView from 'lottie-react-native';

import * as S from './LoadingIndicator.style';

function LoadingIndicator() {
  return <LottieView source={require('@@assets/lottie/lottie_loading.json')} autoPlay loop style={S.styles.lottie} />;
}

export default LoadingIndicator;
