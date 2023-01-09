import { useState, useEffect, useRef } from 'react';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { Animated, Easing, BackHandler } from 'react-native';

import utilStore from '@@store/util/utilStore';

const useLoadingIndicator = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const { isLoadingCnt, isShowLoading } = utilStore();
  const [isLoading, setIsLoading] = useState(false);
  const lottieProgress = useRef(new Animated.Value(0)).current;
  const indicatorAnimation = Animated.loop(
    Animated.timing(lottieProgress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  );

  const preventBack = () => {
    return true;
  };

  useEffect(() => {
    if (isLoading) {
      indicatorAnimation.start();
      BackHandler.addEventListener('hardwareBackPress', preventBack);
    } else {
      indicatorAnimation.stop();
      lottieProgress.setValue(0);
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', preventBack);
    };
  }, [isLoading]);

  useEffect(() => {
    console.log(`blockChain: ${isLoadingCnt} | fetch: ${isFetching} | mutate: ${isMutating}`);

    if (isLoadingCnt > 0 || isFetching || isMutating) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoadingCnt, isFetching, isMutating]);

  return {
    isLoading,
    lottieProgress,
    isShowLoading,
  };
};

export default useLoadingIndicator;
