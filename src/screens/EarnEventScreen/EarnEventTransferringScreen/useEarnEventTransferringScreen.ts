import { useEffect, useRef, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Animated, BackHandler, Easing } from 'react-native';

import useEarnEventMutation from '@@hooks/queries/useEarnEventMutation';
import useEarnEventStatusQuery from '@@hooks/queries/useEarnEventStatusQuery';
import { TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import utilStore from '@@store/util/utilStore';

import { TTransactionHistoryRouteProps } from './EarnEventTransferringScreen.type';

const useEarnEventTransferringScreen = () => {
  const { params } = useRoute<TTransactionHistoryRouteProps>();
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const { turnOffGlobalLoading } = utilStore();

  const [isEndMutation, setIsEndMutation] = useState(true);

  const { refetch } = useEarnEventStatusQuery(params.eventId, {
    enabled: isEndMutation,
    refetchInterval: (data) => {
      if (data?.status === 'COMPLETED_TRANSFER') {
        rootNavigation.navigate('EARN_EVENT_TRANSFER_SUCCESS');
        console.log('success transfer. move to EarnEventSuccessScreen');
        return false;
      } else {
        // 혹시 재요청을 막고싶다면(횟수제한 등) 여기서 조건 줄 수 있습니다.
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
    // loading indicator 끄기
    const restoreLoading = turnOffGlobalLoading();
    indicatorAnimation.start();
    BackHandler.addEventListener('hardwareBackPress', preventBack);

    mutate({ eventId, address });

    return () => {
      restoreLoading();
      indicatorAnimation.stop();
      lottieProgress.setValue(0);
      BackHandler.removeEventListener('hardwareBackPress', preventBack);
    };
  }, []);
  return { lottieProgress };
};

export default useEarnEventTransferringScreen;
