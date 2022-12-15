import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

import { TDeepLinkConnectProxyRouteProps } from './DeepLinkConnectProxyScreen.type';

/**
 * DeepLink redirection proxy
 * clutchwallet://connect?f={appId}&t={accessToken}&e={eventId}&a={alias}
 */
export const DeepLinkConnectProxyScreen = () => {
  const navigation = useNavigation<TRootStackNavigationProps<typeof ROOT_STACK_ROUTE.MAIN>>();
  const { params } = useRoute<TDeepLinkConnectProxyRouteProps>();

  navigation.popToTop();
  navigation.navigate(ROOT_STACK_ROUTE.EVENT_DETAILS, {
    i: params.e,
    deepLink: {
      appId: params.f,
      token: params.t,
      alias: params.a,
    },
  });
  return null;
};
