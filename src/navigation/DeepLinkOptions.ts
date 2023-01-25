import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import { LinkingOptions } from '@react-navigation/native';
import qs from 'qs';
import { Linking, Platform } from 'react-native';
import { container } from 'tsyringe';

import { URL_DEEPLINK, URL_DYNAMIC_LINK } from '@@constants/url.constant';
import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { WalletBlockChainService } from '@@domain/wallet/services/WalletBlockChainService';
import { ROOT_STACK_ROUTE, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';
import { tagLogger } from '@@utils/Logger';
import { evaluateQueryString, evaluateUrlScheme } from '@@utils/regex';

import { ThirdPartyScheme, RouteLink } from './DeepLink.type';
import { MAIN_TAB_ROUTE } from './MainTab/MainTab.type';
import * as R from './RootStack/RootNavigation';

export const CLUTCH_APP_SCHEME = 'clutchwallet';

const blockChainService = container.resolve<WalletBlockChainService>('WalletBlockChainService');
const deepLinkLogger = tagLogger('DeepLink');
const eventLogger = tagLogger('Event');

/**
 * React Navigation By DeepLinks
 *
 * DeepLinks
 *
 * ThirdParty app connection
 * • clutchwallet://connect?f={appId}&t={accessToken}&e={eventId}&a={eventAlias}
 *  - f: from, UUID style app id defined by Clutch
 *  - t: token, access token
 *  - e?(optional): event id
 *  - a?(optional): alias, event alias
 *
 * EarnEventDetailsScreen
 * • clutchwallet://screen/earn?i={eventId}
 *  - i: event id
 *
 * TradeScreen
 * • clutchwallet://screen/trade
 */
export const DeepLinkOptions: LinkingOptions<TRootStackParamList> = {
  prefixes: [`${CLUTCH_APP_SCHEME}://`],
  /**
   * DeepLinks that are not required pin authentication can be navigated by configs as follows.
   */
  config: {
    // initialRouteName: ROOT_STACK_ROUTE.MAIN,
    screens: {
      // [ROOT_STACK_ROUTE.DEEPLINK_CONNECT]: {
      //   path: 'connect',
      // },
      [ROOT_STACK_ROUTE.EVENT_DETAILS]: {
        path: 'screen/earn',
      },
      [ROOT_STACK_ROUTE.MAIN]: {
        screens: {
          [MAIN_TAB_ROUTE.TRADE]: {
            path: 'screen/trade',
          },
        },
      },
    },
  },

  async getInitialURL(): Promise<string | null> {
    const dynamicLink = await dynamicLinks().getInitialLink();
    if (dynamicLink) {
      deepLinkLogger.log(`initial DynamicLink: ${dynamicLink.url}`);
      return dynamicLink.url;
    }
    const initialUrl = await Linking.getInitialURL();
    deepLinkLogger.log(`initial URL: ${initialUrl}`);
    return initialUrl;
  },

  subscribe: (listener) => {
    const onUrlScheme = (event: { url: string }): void => {
      deepLinkLogger.log(`${event.url}`);
      navigateByDeepLink(event.url);
      listener(event.url);
    };
    const urlLinkSubscription = Linking.addEventListener('url', onUrlScheme);

    const onDynamicLink = (dynamicLink: FirebaseDynamicLinksTypes.DynamicLink) => {
      deepLinkLogger.log(`DynamicLink: ${dynamicLink.url}`);
      navigateByDeepLink(dynamicLink.url);
      listener(dynamicLink.url);
    };
    const unsubscribeToDynamicLink = dynamicLinks().onLink(onDynamicLink);

    return () => {
      unsubscribeToDynamicLink();
      urlLinkSubscription.remove();
    };
  },
};

export const navigateByDeepLink = (url: string | null): void => {
  const link = parseDeepLink(url);
  console.log(`QrPay> navigating a link: ${JSON.stringify(link)}`);
  if (link) {
    const { routeName, params } = link;
    R.navigate(routeName, params);
  }
};

export const parseDeepLink = (url: string | null): RouteLink | undefined => {
  if (!url) return;

  const queryString = evaluateQueryString(url);

  if (url.startsWith(`${CLUTCH_APP_SCHEME}://connect`) && queryString) {
    // Link 1.
    // clutchwallet://connect?f={appId}&t={accessToken}&e={eventId}&a={eventAlias}

    const params = qs.parse(queryString);
    deepLinkLogger.log(`parsing params: ${JSON.stringify(params, null, 2)}`);

    const repository = container.resolve<EarnEventRepository>('EarnEventRepository');
    const eventId = params.e;

    if (eventId) {
      repository
        .getEvent(eventId?.toString())
        .then((event) => {
          R.navigate(ROOT_STACK_ROUTE.EVENT_DETAILS, {
            i: params.e,
            data: event,
            deepLink: {
              appId: params.f,
              token: params.t,
              alias: params.a,
            },
          });
        })
        .catch((e) => {
          eventLogger.error(`failed to get event: ${e}`);
        });
    }
  } else if (url.startsWith(`https://${URL_DYNAMIC_LINK}`) || url.startsWith(`https://${URL_DEEPLINK}`)) {
    // Link 2.
    // https://link.mvlclutch.io/short
    blockChainService
      .parseQrCodeLink(url)
      .then((qrCodeLink) => {
        if (qrCodeLink) {
          const { qrCodeContents, token } = qrCodeLink;
          R.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_SEND, {
            tokenDto: token,
            scanData: {
              address: qrCodeContents.address,
              amount: qrCodeContents.amount,
            },
          });
        }
      })
      .catch((e) => console.error(e));
  }
};

const TADA_DRIVER: ThirdPartyScheme = {
  scheme: '***REMOVED***',
  packageName: 'io.mvlchain.tada.driver',
};
const TADA_RIDER: ThirdPartyScheme = {
  scheme: '***REMOVED***',
  packageName: 'io.mvlchain.tada',
};

const THIRD_PARTY_SCHEME = new Map<string, ThirdPartyScheme>();
THIRD_PARTY_SCHEME.set(TADA_DRIVER.scheme, TADA_DRIVER);
THIRD_PARTY_SCHEME.set(TADA_RIDER.scheme, TADA_RIDER);

export const openUriForApp = async (uri: string) => {
  if (await Linking.canOpenURL(uri)) {
    await Linking.openURL(uri);
  } else {
    const scheme = evaluateUrlScheme(uri)?.replace(':', '').toLocaleLowerCase();
    if (scheme) {
      const thirdPartyScheme = THIRD_PARTY_SCHEME.get(scheme);
      if (thirdPartyScheme) {
        // a third party app not installed
        switch (Platform.OS) {
          case 'ios':
            await Linking.openURL(`https://itunes.apple.com/lookup?bundleId=${thirdPartyScheme.packageName}`);
            break;
          case 'android':
            try {
              await Linking.openURL(`market://details?id=${thirdPartyScheme.packageName}`);
            } catch (e) {
              await Linking.openURL(`https://play.google.com/store/apps/details?id=${thirdPartyScheme.packageName}`);
            }
            break;
        }
      }
    }
  }
};
