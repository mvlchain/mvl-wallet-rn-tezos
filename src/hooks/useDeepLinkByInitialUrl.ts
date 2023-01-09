import { useEffect } from 'react';

import { navigateByDeepLink } from '@@navigation/DeepLinkOptions';
import authStore from '@@store/auth/authStore';

export const useDeepLinkByInitialUrl = () => {
  const { initialUrl, setInitialUrl } = authStore();

  useEffect(() => {
    if (initialUrl) {
      console.log(`DeepLink> redirect from initialUrl ${initialUrl}`);
      navigateByDeepLink(initialUrl);

      // consume initialUrl by setting initialUrl to null
      setInitialUrl(null);
    }
  }, [initialUrl]);
};
