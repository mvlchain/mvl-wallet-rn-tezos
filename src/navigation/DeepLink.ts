import { LinkingOptions, useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

import { ROOT_STACK_ROUTE, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';
import { valueOf } from '@@utils/types';

import { MAIN_TAB_ROUTE } from './MainTab/MainTab.type';
import * as R from './RootStack/RootNavigation';

export const CLUTCH_APP_SCHEME = 'clutchwallet';
/**
 * React Navigation By DeepLinks
 *
 * DeepLink
 * • clutchwallet://screen/earn?i={eventId}
 */
export const linking: LinkingOptions<TRootStackParamList> = {
  prefixes: [`${CLUTCH_APP_SCHEME}://`],
  config: {
    screens: {
      [ROOT_STACK_ROUTE.EVENT_DETAILS]: {
        path: 'screen/earn',
      },
    },
  },

  subscribe: (listener) => {
    const onUrlScheme = (event: { url: string }): void => {
      console.log(`DeepLink> ${event.url}`);

      // alternatives to deeplink redirectiopn
      // if (event.url == 'clutchwallet://screen/earn') {
      //   R.navigate(ROOT_STACK_ROUTE.SETTING_APP_VERSION);
      // }

      listener(event.url);
    };

    const subscription = Linking.addEventListener('url', onUrlScheme);
    return () => {
      subscription.remove();
    };
  },
};
