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
  const { pKey, setPKey, setAppScreen } = authStore();
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
      console.log(`auto signin: ${pKey}`);
      if (pKey === null) {
        return;
      }
      setPKey(pKey);
      setAppScreen(AppScreen.Root);
    })();
  }, []);

  // manual signIn
  const signIn = async (provider: AuthProvider) => {
    try {
      const { privateKey, isNewUser } = await auth.signIn(provider);
      console.log(`manual signin: ${privateKey}, stage: ${stage}`);
      setPKey(privateKey);

      if (!navigateToSeedPhrase(privateKey, isNewUser) && privateKey) {
        setAppScreen(AppScreen.Root);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // useEffect(() => {
  //   if (!navigateToSeedPhrase(pKey)) {
  //     if (pKey && !stage) {
  //       setAppScreen(AppScreen.Root);
  //     }
  //   }
  // }, [pKey, stage]);

  /**
   * @return true if current screen navigates to SeedPhrase otherwise false
   */
  const navigateToSeedPhrase = (pkey: string | null, isNewUser: boolean | undefined): boolean => {
    if (pkey) {
      /**
       * TODO: postboxkey없을 때 예외처리
       */
      const _postboxKey = keyClient?.postboxKeyHolder?.postboxKey;
      if (!_postboxKey) {
        throw new Error('postboxkey is required');
      }
      console.log(`Route> navigating to SEED_PHRASE from SignInScreen, pkey: ${_postboxKey}, stage: ${JSON.stringify(stage)}`);

      if (isNewUser) {
        console.log(`Route> navigating to SeedPhraseScreen, navigation id: ${navigation.getId}`);
        navigation.push(APP_STACK_ROUTE.SEED_PHRASE);
        return true;
      }
    }
    return false;
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
