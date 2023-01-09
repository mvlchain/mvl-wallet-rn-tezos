import { useEffect } from 'react';

import { Linking } from 'react-native';

import authStore from '@@store/auth/authStore';
/**
 * Get an initial DeepLink and set it to the Store so that
 * it can be used later on from RootStack.
 */
export const useInitialUrl = () => {
  const { setInitialUrl } = authStore();

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setInitialUrl(initialUrl);
      }
    })();
  }, []);
};
