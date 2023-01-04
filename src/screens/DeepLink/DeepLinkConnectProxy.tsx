import React, { useEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

import { TDeepLinkConnectProxyRouteProps } from './DeepLinkConnectProxy.type';

/**
 * DeepLink redirection proxy
 * clutchwallet://connect?f={appId}&t={accessToken}&e={eventId}&a={eventAlias}
 */
export const DeepLinkConnectProxy = () => {
  const navigation = useNavigation<TRootStackNavigationProps<typeof ROOT_STACK_ROUTE.MAIN>>();
  const { params } = useRoute<TDeepLinkConnectProxyRouteProps>();

  useEffect(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    navigation.navigate({
      name: ROOT_STACK_ROUTE.EVENT_DETAILS,
      params: {
        i: params.e,
        deepLink: {
          appId: params.f,
          token: params.t,
          alias: params.a,
        },
      },
      merge: true,
    });
  }, []);

  return null;
};
