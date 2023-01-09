import { LinkingOptions, useNavigation } from '@react-navigation/native';
import qs from 'qs';
import { Linking } from 'react-native';

import { ROOT_STACK_ROUTE, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';
import { evaluateQueryString } from '@@utils/regex';
import { valueOf } from '@@utils/types';

import { RouteLink } from './DeepLink.type';
import { MAIN_TAB_ROUTE } from './MainTab/MainTab.type';
import * as R from './RootStack/RootNavigation';

export const CLUTCH_APP_SCHEME = 'clutchwallet';
/**
 * React Navigation By DeepLinks
 *
 * DeepLink
 * • clutchwallet://connect?f={appId}&t={accessToken}&e={eventId}&a={eventAlias}
 *  - f: from, UUID style app id defined by Clutch
 *  - t: token, access token
 *  - e?(optional): event id
 *  - a?(optional): alias, event alias
 *
 * • clutchwallet://screen/earn?i={eventId}
 *  - i: event id
 */
export const DeepLinkOptions: LinkingOptions<TRootStackParamList> = {
  prefixes: [`${CLUTCH_APP_SCHEME}://`],
  /**
   * DeepLinks that are not required pin authentication can be navigated by configs as follows.
   */
  // config: {
  //   initialRouteName: ROOT_STACK_ROUTE.MAIN,
  //   screens: {
  //     [ROOT_STACK_ROUTE.DEEPLINK_CONNECT]: {
  //       path: 'connect',
  //     },
  //     [ROOT_STACK_ROUTE.EVENT_DETAILS]: {
  //       path: 'screen/earn',
  //     },
  //   },
  // },

  subscribe: (listener) => {
    const onUrlScheme = (event: { url: string }): void => {
      console.log(`DeepLink> ${event.url}`);

      // const link = parseDeepLink(event.url);
      // if (link) {
      //   const { routeName, params } = link;
      //   R.navigate(routeName, params);
      // }
      navigateByDeepLink(event.url);

      listener(event.url);
    };

    const subscription = Linking.addEventListener('url', onUrlScheme);
    return () => {
      subscription.remove();
    };
  },
};

export const navigateByDeepLink = (url: string | null): void => {
  const link = parseDeepLink(url);
  if (link) {
    const { routeName, params } = link;
    R.navigate(routeName, params);
  }
};

export const parseDeepLink = (url: string | null): RouteLink | undefined => {
  if (!url) return;

  const queryString = evaluateQueryString(url);

  if ((url.startsWith(`${CLUTCH_APP_SCHEME}://connect`), queryString)) {
    // Link 1.
    // clutchwallet://connect?f={appId}&t={accessToken}&e={eventId}&a={eventAlias}

    const params = qs.parse(queryString);
    console.log(`DeepLink> parsing params: ${JSON.stringify(params, null, 2)}`);

    return {
      routeName: ROOT_STACK_ROUTE.EVENT_DETAILS,
      params: {
        i: params.e,
        deepLink: {
          appId: params.f,
          token: params.t,
          alias: params.a,
        },
      },
    };
  }
};
