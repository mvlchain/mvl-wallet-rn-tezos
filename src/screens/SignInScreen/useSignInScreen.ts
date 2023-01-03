import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { AuthProvider } from '@@domain/auth/IAuthService';
import { useDi } from '@@hooks/useDi';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import { authModalStore } from '@@store/auth/authModalStore';
import authPersistStore from '@@store/auth/authPersistStore';
import authStore from '@@store/auth/authStore';

const useSignInScreen = () => {
  type StackProps = TRootStackNavigationProps<'AUTH'>;
  const navigation = useNavigation<StackProps>();
  const keyClient = useDi('KeyClient');
  const { pKey, setPKey } = authStore();
  const { stage } = authPersistStore();
  const { close } = authModalStore();

  const auth = useDi('AuthService');
  const legacyAuthMigrationService = useDi('LegacyAuthMigrationService');

  useEffect(() => {
    const checkNeedsMigrationAndExec = async () => {
      if (await legacyAuthMigrationService.needsMigration()) {
        await legacyAuthMigrationService.migrate();
      }
    };
    checkNeedsMigrationAndExec();
  }, []);

  useEffect(() => {
    const getPinCodeAndAutoSignIn = async () => {
      const pKey = await auth.autoSignIn();
      if (pKey === null) {
        return;
      }
      setPKey(pKey);
    };
    getPinCodeAndAutoSignIn();
  }, []);

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

  useEffect(() => {
    return () => {
      close(AUTH_MODAL_NAME.PIN);
    };
  }, []);

  return {
    signIn,
  };
};

export default useSignInScreen;
