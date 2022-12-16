import { useEffect, useRef, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { Animated, BackHandler, Easing } from 'react-native';

import useEarnEventMutation from '@@hooks/queries/useEarnEventMutation';
import useEarnEventStatusQuery from '@@hooks/queries/useEarnEventStatusQuery';

import { TTransactionHistoryRouteProps } from './EarnEventTransferringScreen.type';

const useEarnEventTransferringScreen = () => {
  const { params } = useRoute<TTransactionHistoryRouteProps>();

  const [isEndMutation, setIsEndMutation] = useState(true);

  const { refetch } = useEarnEventStatusQuery(params.eventId, {
    enabled: isEndMutation,
    refetchInterval: (data) => {
      if (data?.status === 'COMPLETED_TRANSFER') {
        // TODO: navigate to EarnEventSuccessScreen
        console.log('success transfer. move to EarnEventSuccessScreen');
        return false;
      } else {
        return 1000;
      }
    },
  });
  const { mutate } = useEarnEventMutation({
    onSuccess: () => {
      setIsEndMutation(true);
      refetch();
    },
  });

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
    const { eventId, address } = params;

    indicatorAnimation.start();
    BackHandler.addEventListener('hardwareBackPress', preventBack);

    mutate({ eventId, address });

    return () => {
      indicatorAnimation.stop();
      lottieProgress.setValue(0);
      BackHandler.removeEventListener('hardwareBackPress', preventBack);
    };
  }, []);
  return { lottieProgress };
};

export default useEarnEventTransferringScreen;
