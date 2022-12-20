import React from 'react';

import LottieView from 'lottie-react-native';

import * as S from './LoadingIndicator.style';
import useLoadingIndicator from './useLoadingIndicator';

function LoadingIndicator() {
  const { lottieProgress, isLoading, isShowLoading } = useLoadingIndicator();

  /**
   * isShowLoading이라는 global state를 통해 특정 로직에서는 로딩을 보여주지 않도록 할 수 있습니다.
   * 해당 방법이 위험하다고 생각하시면, indicator가 없는 특정 페이지(EarnEventTransfer)를 지정해도될 것 같습니다.
   * EarnEventTransfer는 자체적으로 로딩을 보여주기 때문에, indicator가 겹치는 것을 방지하기 위함입니다.
   */

  return isLoading ? (
    <S.IndicatorContainer>
      {isShowLoading && <LottieView progress={lottieProgress} source={require('@@assets/lottie/lottie_loading.json')} style={S.styles.lottie} />}
    </S.IndicatorContainer>
  ) : null;
}

export default LoadingIndicator;
