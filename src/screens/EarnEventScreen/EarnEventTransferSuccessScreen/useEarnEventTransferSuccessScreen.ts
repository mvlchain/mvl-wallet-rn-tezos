import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

import { TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

export const useEarnEventTransferSuccessScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();

  const onPressConfirm = () => {
    rootNavigation.popToTop();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressConfirm);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressConfirm);
    };
  }, []);

  return {
    onPressConfirm,
  };
};
