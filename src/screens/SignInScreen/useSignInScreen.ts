import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { APP_STACK_ROUTE, TAppStackNavigationProps } from 'App.type';

import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { AuthProvider } from '@@domain/auth/IAuthService';
import { useDi } from '@@hooks/useDi';
import { authModalStore } from '@@store/auth/authModalStore';
import authPersistStore from '@@store/auth/authPersistStore';
import authStore from '@@store/auth/authStore';
import { AppScreen } from '@@store/auth/authStore.type';

const useSignInScreen = () => {
  const navigation = useNavigation<TAppStackNavigationProps<'AUTH'>>();
  const keyClient = useDi('KeyClient');
  const { pKey, setPKey, setAppScreen, setPKeyAppScreen } = authStore();
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

  // auto signIn
  useEffect(() => {
    (async () => {
      const pKey = await auth.autoSignIn();
      if (pKey === null) {
        return;
      }
      setPKeyAppScreen(pKey, AppScreen.Root);
    })();
  }, []);

  // manual signIn
  const signIn = async (provider: AuthProvider) => {
    try {
      const { privateKey, isNewUser } = await auth.signIn(provider);

      // setPKey(privateKey);
      // if (!navigateToSeedPhrase(privateKey, isNewUser) && privateKey) {
      //   setAppScreen(AppScreen.Root);
      // }

      if (isSeedPhraseNavigatable(privateKey, isNewUser)) {
        setPKey(privateKey);
        navigateToSeedPhrase();
      } else if (privateKey) {
        setPKeyAppScreen(privateKey, AppScreen.Root);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isSeedPhraseNavigatable = (pkey: string | null, isNewUser: boolean | undefined): boolean => {
    const postboxKey = keyClient?.postboxKeyHolder?.postboxKey;
    return pkey && isNewUser && !!postboxKey ? true : false;
  };

  const navigateToSeedPhrase = () => {
    navigation.navigate(APP_STACK_ROUTE.SEED_PHRASE);
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
