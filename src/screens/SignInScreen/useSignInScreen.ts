import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { AuthProvider } from '@@domain/auth/IAuthService';
import { useDi } from '@@hooks/useDi';
import { TAuthStackNavigationProps, AUTH_STACK_ROUTE } from '@@navigation/AuthStack/AuthStack.type';
import { authModalStore } from '@@store/auth/authModalStore';
import authPersistStore from '@@store/auth/authPersistStore';
import authStore from '@@store/auth/authStore';
import { AppScreen } from '@@store/auth/authStore.type';
import { isEmptyObject } from '@@utils/types';

const useSignInScreen = () => {
  const navigation = useNavigation<TAuthStackNavigationProps<'SIGN_IN'>>();
  const keyClient = useDi('KeyClient');
  const { setPKey, setPKeyAppScreen } = authStore();
  const { close } = authModalStore();
  const { stage } = authPersistStore();

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

  console.log(`Auth> stage: ${JSON.stringify(stage)}`);

  // auto signIn
  useEffect(() => {
    (async () => {
      const pKey = await auth.autoSignIn();
      if (pKey === null) {
        return;
      }
      updateAuthState(pKey, undefined);
    })();
  }, []);

  // manual signIn
  const signIn = async (provider: AuthProvider) => {
    try {
      const { privateKey, isNewUser } = await auth.signIn(provider);
      updateAuthState(privateKey, isNewUser);
    } catch (e) {
      console.error(e);
    }
  };

  const updateAuthState = (privateKey: string, isNewUser: boolean | undefined) => {
    if (isSeedPhraseNavigatable(privateKey, isNewUser)) {
      setPKey(privateKey);
      navigateToSeedPhrase();
    } else if (privateKey) {
      setPKeyAppScreen(privateKey, AppScreen.Root);
    }
  };

  const isSeedPhraseNavigatable = (pkey: string | null, isNewUser: boolean | undefined): boolean => {
    const postboxKey = keyClient?.postboxKeyHolder?.postboxKey;
    return (pkey && isNewUser && !!postboxKey ? true : false) || !isEmptyObject(stage);
  };

  const navigateToSeedPhrase = () => {
    navigation.navigate(AUTH_STACK_ROUTE.SEED_PHRASE);

    // signUp 이후에 SeedPhrase화면 이동후 PIN 모달을 닫는다.
    // 아래의 코드가 없으면 닫히지 않는다. 왜???
    close(AUTH_MODAL_NAME.PIN);
  };

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
