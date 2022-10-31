import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { AuthProvider } from '@@domain/auth/IAuthService';
import { useDi } from '@@hooks/common/useDi';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import authStore from '@@store/auth/authStore';

const useSignInScreen = () => {
  type StackProps = TRootStackNavigationProps<'AUTH'>;
  const navigation = useNavigation<StackProps>();
  const { pKey, setPKey } = authStore();

  const auth = useDi('AuthService');

  const signIn = async (provider: AuthProvider) => {
    try {
      const key = await auth.signIn(provider);
      setPKey(key);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (pKey) {
      if (auth.signUpFlag) {
        // TODO: go to mnemonic
        navigation.navigate(ROOT_STACK_ROUTE.SEED_PHRASE);
      } else {
        navigation.navigate(ROOT_STACK_ROUTE.MAIN);
      }
    }
  }, [pKey]);

  return {
    signIn,
  };
};

export default useSignInScreen;
