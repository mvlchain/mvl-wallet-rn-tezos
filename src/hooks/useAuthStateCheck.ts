import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import * as R from '@@navigation/RootStack/RootNavigation';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import authStore from '@@store/auth/authStore';

export const useAuthStateCheck = () => {
  const { isSignedIn } = authStore();
  const navigation = useNavigation<TRootStackNavigationProps<'MAIN'>>();

  useEffect(() => {
    if (!isSignedIn) {
      console.warn('not signed in: redirect to auth');

      navigation.navigate(ROOT_STACK_ROUTE.AUTH);
    }
  }, []);
};
