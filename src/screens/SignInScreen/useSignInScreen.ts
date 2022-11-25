import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { AuthProvider } from '@@domain/auth/IAuthService';
import { useDi } from '@@hooks/useDi';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import authPersistStore from '@@store/auth/authPersistStore';
import authStore from '@@store/auth/authStore';

const useSignInScreen = () => {
  type StackProps = TRootStackNavigationProps<'AUTH'>;
  const navigation = useNavigation<StackProps>();
  const keyClient = useDi('KeyClient');
  const { pKey, setPKey } = authStore();
  const { stage } = authPersistStore();

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
      /**
       * TODO: postboxkey없을 때 예외처리
       */
      const _postboxKey = keyClient?.postboxKeyHolder?.postboxKey;
      if (!_postboxKey) {
        throw new Error('postboxkey is required');
      }
      if (stage[_postboxKey] === 'BACKUP_SEED_PHRASE_STAGE') {
        navigation.navigate(ROOT_STACK_ROUTE.SEED_PHRASE);
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: ROOT_STACK_ROUTE.MAIN }],
        });
      }
    }
  }, [pKey]);

  return {
    signIn,
  };
};

export default useSignInScreen;
