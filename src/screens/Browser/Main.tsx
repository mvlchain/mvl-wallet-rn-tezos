/* eslint-disable max-lines */

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Alert, BackHandler, StyleSheet, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import { FileDownloadEvent, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';
import URL from 'url-parse';

import useAccount from '@@components/Wallet/Account/useAccount';
import { TRootStackParamList } from '@@navigation/RootStack/RootStack.type';
import PhishingModal from '@@screens/PhishingModal/PhishingModal';
import useBrowserHistoryPersistStore from '@@store/dapp/useBrowserHistoryPersistStore';
import { mmLightColors, mmShadows } from '@@style/colors';
import { fontStyles } from '@@style/fonts';
import BackgroundBridge from '@@utils/BackgroundBridge/BackgroundBridge';
import { getRpcMethodMiddleware } from '@@utils/BackgroundBridge/RPCMethodMiddleware';
import { JS_DESELECT_TEXT, SPA_urlChangeListener } from '@@utils/BackgroundBridge/browserScripts';
import { tagLogger } from '@@utils/Logger';
import Device from '@@utils/device';

import AppConstants from '../../utils/BackgroundBridge/AppConstants';
import EntryScriptWeb3 from '../../utils/BackgroundBridge/EntryScriptWeb3';
import onUrlSubmit, { getHost, getUrlObj } from '../../utils/browser';

import * as S from './Main.style';

export const MM_BLOCKLIST_ISSUE_URL = 'https://github.com/metamask/eth-phishing-detect/issues/new';
export const MM_ETHERSCAN_URL = 'https://etherscamdb.info/domain/meta-mask.com';
export const MM_PHISH_DETECT_URL = 'https://github.com/metamask/eth-phishing-detect';
export const PHISHFORT_BLOCKLIST_ISSUE_URL = 'https://github.com/phishfort/phishfort-lists/issues/new';

const { HOMEPAGE_URL, NOTIFICATION_NAMES } = AppConstants;
const HOMEPAGE_HOST = new URL(HOMEPAGE_URL)?.hostname;

const sanitizeUrlInput = (url: string) => url.replace(/'/g, '%27').replace(/[\r\n]/g, '');
export const baseStyles: Record<string, ViewStyle> = {
  flexGrow: {
    flex: 1,
  },
  flexStatic: {
    flex: 0,
  },
};

const createStyles = (colors: any, shadows: any) =>
  StyleSheet.create({
    wrapper: {
      ...baseStyles.flexGrow,
      backgroundColor: colors.background.default,
    },
    hide: {
      flex: 0,
      opacity: 0,
      display: 'none',
      width: 0,
      height: 0,
    },
    progressBarWrapper: {
      height: 3,
      width: '100%',
      left: 0,
      right: 0,
      top: 0,
      position: 'absolute',
      zIndex: 999999,
    },
    optionsOverlay: {
      position: 'absolute',
      zIndex: 99999998,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    optionsWrapper: {
      position: 'absolute',
      zIndex: 99999999,
      width: 200,
      borderWidth: 1,
      borderColor: colors.border.default,
      backgroundColor: colors.background.default,
      borderRadius: 10,
      paddingBottom: 5,
      paddingTop: 10,
    },
    optionsWrapperAndroid: {
      ...shadows.size.xs,
      bottom: 65,
      right: 5,
    },
    optionsWrapperIos: {
      ...shadows.size.xs,
      bottom: 90,
      right: 5,
    },
    option: {
      paddingVertical: 10,
      height: 'auto',
      minHeight: 44,
      paddingHorizontal: 15,
      backgroundColor: colors.background.default,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: Device.isAndroid() ? 0 : -5,
    },
    optionText: {
      fontSize: 16,
      lineHeight: 16,
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 3,
      color: colors.primary.default,
      flex: 1,
      ...fontStyles.fontPrimary,
    },
    optionIconWrapper: {
      flex: 0,
      borderRadius: 5,
      backgroundColor: colors.primary.muted,
      padding: 3,
      marginRight: 10,
      alignSelf: 'center',
    },
    optionIcon: {
      color: colors.primary.default,
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 18,
    },
    webview: {
      ...baseStyles.flexGrow,
      zIndex: 1,
    },
    urlModalContent: {
      flexDirection: 'row',
      paddingTop: Device.isAndroid() ? 10 : Device.isIphoneX() ? 50 : 27,
      paddingHorizontal: 10,
      height: Device.isAndroid() ? 59 : Device.isIphoneX() ? 87 : 65,
      backgroundColor: colors.background.default,
    },
    searchWrapper: {
      flexDirection: 'row',
      borderRadius: 30,
      backgroundColor: colors.background.alternative,
      height: Device.isAndroid() ? 40 : 30,
      flex: 1,
    },
    clearButton: { paddingHorizontal: 12, justifyContent: 'center' },
    urlModal: {
      justifyContent: 'flex-start',
      margin: 0,
    },
    urlInput: {
      ...fontStyles.normal,
      fontSize: Device.isAndroid() ? 16 : 14,
      paddingLeft: 15,
      flex: 1,
      color: colors.text.default,
    },
    cancelButton: {
      marginTop: -6,
      marginLeft: 10,
      justifyContent: 'center',
    },
    cancelButtonText: {
      fontSize: 14,
      color: colors.primary.default,
      ...fontStyles.normal,
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    fullScreenModal: {
      flex: 1,
    },
  });

type ApprovedHosts = { [key: string]: boolean | undefined };

const logger = tagLogger('BrowserMain');
export const BrowserMain = ({ webviewRef }: { webviewRef: any }) => {
  type TBrowserDappRouteProps = RouteProp<TRootStackParamList, 'BROWSER_DAPP'>;
  const { params } = useRoute<TBrowserDappRouteProps>();
  const { address } = useAccount();
  const { addBrowserHistory } = useBrowserHistoryPersistStore();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [approvedHosts, setApprovedHosts] = useState<ApprovedHosts>({});
  const getApprovedHosts = useCallback(() => {
    return approvedHosts;
  }, [approvedHosts]);
  const approveHost = useCallback(
    (url: string) => {
      setApprovedHosts({ ...approvedHosts, [url]: true });
    },
    [approvedHosts]
  );
  const [props, setProps] = useState<any>({
    id: 0,
    activeTab: 0,
    navigation,
    defaultProtocol: 'https://',
  });

  useEffect(() => {
    setApprovedHosts({ [params.link]: true });
  }, []);

  useEffect(() => {
    setProps({
      ...props,
      selectedAddress: address,
    });
  }, [address]);

  const [backEnabled, setBackEnabled] = useState(false);
  const [forwardEnabled, setForwardEnabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [initialUrl, setInitialUrl] = useState('');
  const [firstUrlLoaded, setFirstUrlLoaded] = useState(false);
  const [error, setError] = useState<boolean | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [entryScriptWeb3, setEntryScriptWeb3] = useState<string | null>(null);
  const [showPhishingModal, setShowPhishingModal] = useState(false);
  const [blockedUrl, setBlockedUrl] = useState<string | undefined>(undefined);
  const [navState, setNavState] = useState<WebViewNavigation>();
  const blockListType = useRef('');

  const url = useRef('');
  const title = useRef('');
  const icon = useRef(null);
  const backgroundBridge = useRef<any>();
  const fromHomepage = useRef(false);
  const wizardScrollAdjusted = useRef(false);

  const colors = mmLightColors;
  const shadows = mmShadows;
  const styles = createStyles(colors, shadows);

  const isTabActive = useCallback(() => props.activeTab === props.id, [props.activeTab, props.id]);

  const getMaskedUrl = (url?: string) => {
    if (!url) return url;
    return url;
  };

  const isENSUrl = (url?: string) => {
    return false;
  };

  const isHomepage = useCallback((checkUrl: string | null = null) => {
    const currentPage = checkUrl || url.current;
    const { host: currentHost } = getUrlObj(currentPage);
    return currentHost === HOMEPAGE_HOST;
  }, []);

  const notifyAllConnections = useCallback((payload: any, restricted = true) => {
    logger.log(`notifyAllConnections callback called, ${payload}, ${restricted}`);
    const fullHostname = new URL(url.current).hostname;

    // TODO:permissions move permissioning logic elsewhere
    if (!backgroundBridge.current) return;
    if (backgroundBridge.current.hostname === fullHostname && !restricted) {
      // || approvedHosts[bridge.hostname]
      logger.log(`bridge.sendNotification called`);
      backgroundBridge.current.sendNotification(payload);
    }
  }, []);

  useEffect(() => {
    const { selectedAddress } = props;

    const numApprovedHosts = Object.keys(approvedHosts).length;
    logger.log(`selectedAddress: ${selectedAddress}, numApprovedHosts: ${numApprovedHosts}`);

    // this will happen if the approved hosts were cleared
    if (numApprovedHosts === 0) {
      notifyAllConnections(
        {
          method: NOTIFICATION_NAMES.accountsChanged,
          params: [],
        },
        false
      ); // notification should be sent regardless of approval status
    }

    if (numApprovedHosts > 0) {
      notifyAllConnections({
        method: NOTIFICATION_NAMES.accountsChanged,
        params: [selectedAddress],
      });
    }
  }, [notifyAllConnections, props, approvedHosts, props.selectedAddress]);

  /**
   * Dismiss the text selection on the current website
   */
  const dismissTextSelectionIfNeeded = useCallback(() => {
    if (isTabActive() && Device.isAndroid()) {
      const { current } = webviewRef;
      if (current) {
        setTimeout(() => {
          current.injectJavaScript(JS_DESELECT_TEXT);
        }, 50);
      }
    }
  }, [isTabActive]);

  /**
   * Toggle the options menu
   */
  const toggleOptions = useCallback(() => {
    dismissTextSelectionIfNeeded();
    setShowOptions(!showOptions);
    // InteractionManager.runAfterInteractions(() => {
    //   Analytics.trackEvent(ANALYTICS_EVENT_OPTS.DAPP_BROWSER_OPTIONS);
    // });
  }, [dismissTextSelectionIfNeeded, showOptions]);

  /**
   * Show the options menu
   */
  const toggleOptionsIfNeeded = useCallback(() => {
    if (showOptions) {
      toggleOptions();
    }
  }, [showOptions, toggleOptions]);

  /**
   * Go back to previous website in history
   */
  const goBack = useCallback(() => {
    if (!backEnabled) return;

    toggleOptionsIfNeeded();
    const { current } = webviewRef;
    current && current.goBack();
  }, [backEnabled, toggleOptionsIfNeeded]);

  /**
   * Check if a hostname is allowed
   */
  const isAllowedUrl = useCallback((hostname: string) => {
    return true;
  }, []);

  /**
   * Show a phishing modal when a url is not allowed
   */
  const handleNotAllowedUrl = (urlToGo: string) => {
    setBlockedUrl(urlToGo);
    setTimeout(() => setShowPhishingModal(true), 1000);
  };

  /**
   * Go to a url
   */
  const go = useCallback(
    async (url: string, initialCall?: any): Promise<string | null> => {
      const hasProtocol = url.match(/^[a-z]*:\/\//) || isHomepage(url);
      const sanitizedURL = hasProtocol ? url : `${props.defaultProtocol}${url}`;
      const { hostname } = new URL(sanitizedURL);
      let urlToGo = sanitizedURL;
      urlToGo = sanitizeUrlInput(urlToGo);
      const { current } = webviewRef;
      logger.log(`hostname: ${hostname}, ${isAllowedUrl(hostname)}, ${initialCall}`);

      if (isAllowedUrl(hostname)) {
        if (initialCall || !firstUrlLoaded) {
          setInitialUrl(urlToGo);
          setFirstUrlLoaded(true);
        } else {
          current && current.injectJavaScript(`(function(){window.location.href = '${urlToGo}' })()`);
        }

        setProgress(0);
        return sanitizedURL;
      }
      handleNotAllowedUrl(urlToGo);
      return null;
    },
    [firstUrlLoaded, isAllowedUrl, isHomepage, props.defaultProtocol]
  );

  /**
   * Reload current page
   */
  const reload = useCallback(() => {
    const { current } = webviewRef;
    current && current.reload();
  }, []);

  /**
   * Set initial url, dapp scripts and engine. Similar to componentDidMount
   */
  useEffect(() => {
    // const initialUrl = props.initialUrl || HOMEPAGE_URL;
    const initialUrl = params.link || HOMEPAGE_URL;

    go(initialUrl, true);

    const getEntryScriptWeb3 = async () => {
      const entryScriptWeb3 = await EntryScriptWeb3.get();
      setEntryScriptWeb3(entryScriptWeb3 + SPA_urlChangeListener);
    };

    getEntryScriptWeb3();

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (!backgroundBridge.current) return;
      backgroundBridge.current.onDisconnect();
    };
  }, []);

  /**
   * Set navigation listeners
   */
  useEffect(() => {
    const handleAndroidBackPress = () => {
      if (!navState || !webviewRef.current) return;

      if (navState.canGoBack) {
        toggleOptionsIfNeeded();
        webviewRef.current.goBack();
        return true;
      } else {
        return false;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', handleAndroidBackPress);

    // Handle hardwareBackPress event only for browser, not components rendered on top
    props.navigation.addListener('willFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', handleAndroidBackPress);
    });
    props.navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener('hardwareBackPress', handleAndroidBackPress);
    });

    return function cleanup() {
      BackHandler.removeEventListener('hardwareBackPress', handleAndroidBackPress);
    };
  }, [goBack, isTabActive, props.navigation, navState?.canGoBack, webviewRef.current]);

  /**
   * Handles state changes for when the url changes
   */
  const changeUrl = (siteInfo: any) => {
    url.current = siteInfo.url;
    title.current = siteInfo.title;
    if (siteInfo.icon) icon.current = siteInfo.icon;
  };

  /**
   * Handles state changes for when the url changes
   */
  const changeAddressBar = (siteInfo: any) => {
    setBackEnabled(siteInfo.canGoBack);
    setForwardEnabled(siteInfo.canGoForward);

    isTabActive() &&
      props.navigation.setParams({
        url: getMaskedUrl(siteInfo.url),
        icon: siteInfo.icon,
        silent: true,
      });
  };

  /**
   * Go to eth-phishing-detect page
   */
  const goToETHPhishingDetector = () => {
    setShowPhishingModal(false);
    go(MM_PHISH_DETECT_URL);
  };

  /**
   * Continue to phishing website
   */
  const continueToPhishingSite = () => {
    if (blockedUrl === undefined) return;

    const urlObj = new URL(blockedUrl);
    props.addToWhitelist(urlObj.hostname);
    setShowPhishingModal(false);

    blockedUrl !== url.current &&
      setTimeout(() => {
        go(blockedUrl);
        setBlockedUrl(undefined);
      }, 1000);
  };

  /**
   * Go to etherscam websiter
   */
  const goToEtherscam = () => {
    setShowPhishingModal(false);
    go(MM_ETHERSCAN_URL);
  };

  /**
   * Go to eth-phishing-detect issue
   */
  const goToFilePhishingIssue = () => {
    setShowPhishingModal(false);
    blockListType.current === 'MetaMask' ? go(MM_BLOCKLIST_ISSUE_URL) : go(PHISHFORT_BLOCKLIST_ISSUE_URL);
  };

  /**
   * Go back from phishing website alert
   */
  const goBackToSafety = () => {
    blockedUrl === url.current && goBack();
    setTimeout(() => {
      setShowPhishingModal(false);
      setBlockedUrl(undefined);
    }, 500);
  };

  /**
   * Renders the phishing modal
   */
  const renderPhishingModal = () => {
    if (blockedUrl === undefined) return null;

    return (
      <Modal
        isVisible={showPhishingModal}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        style={styles.fullScreenModal}
        backdropOpacity={1}
        backdropColor={colors.error.default}
        animationInTiming={300}
        animationOutTiming={300}
        useNativeDriver
      >
        <PhishingModal
          fullUrl={blockedUrl}
          goToETHPhishingDetector={goToETHPhishingDetector}
          continueToPhishingSite={continueToPhishingSite}
          goToEtherscam={goToEtherscam}
          goToFilePhishingIssue={goToFilePhishingIssue}
          goBackToSafety={goBackToSafety}
        />
      </Modal>
    );
  };

  const trackEventSearchUsed = useCallback(() => {
    // AnalyticsV2.trackEvent(AnalyticsV2.ANALYTICS_EVENTS.BROWSER_SEARCH_USED, {
    //   option_chosen: 'Search on URL',
    //   number_of_tabs: undefined,
    // });
  }, []);

  /**
   * Stops normal loading when it's ens, instead call go to be properly set up
   */
  const onShouldStartLoadWithRequest = ({ url }: { url: string }) => {
    if (isENSUrl(url)) {
      go(url.replace(/^http:\/\//, 'https://'));
      return false;
    }
    return true;
  };

  /**
   * Sets loading bar progress
   */
  const onLoadProgress = ({ nativeEvent }: any) => {
    logger.log(`WB SETUP> WebView onLoadProgress: ${JSON.stringify(nativeEvent, null, 2)}`);
    setProgress(progress);
  };

  const onLoad = ({ nativeEvent }: any) => {
    //For iOS url on the navigation bar should only update upon load.
    if (Device.isIos()) {
      changeUrl(nativeEvent);
    }
  };

  /**
   * When website finished loading
   */
  const onLoadEnd = ({ nativeEvent }: any) => {
    logger.log(`WB SETUP> onLoadEnd`);
    // Do not update URL unless website has successfully completed loading.
    if (nativeEvent.loading) {
      return;
    }
    const { title } = nativeEvent;
    addBrowserHistory({ link: params.link ?? title, title });
    // Use URL to produce real url. This should be the actual website that the user is viewing.
    const urlObj = new URL(nativeEvent.url);
    const { origin, pathname = '', query = '' } = urlObj;
    const realUrl = `${origin}${pathname}${query}`;
    // Generate favicon.
    const favicon = `https://api.faviconkit.com/${getHost(realUrl)}/32`;
    // Update navigation bar address with title of loaded url.
    changeUrl({ ...nativeEvent, url: realUrl, icon: favicon });
    changeAddressBar({ ...nativeEvent, url: realUrl, icon: favicon });
  };

  /**
   * Handle message from website
   */
  const onMessage = ({ nativeEvent }: WebViewMessageEvent) => {
    logger.debug(`WB INCOMING> 1. onMessage data: ${nativeEvent.data}`);
    const dataRaw = nativeEvent.data;
    try {
      const data = typeof dataRaw === 'string' ? JSON.parse(dataRaw) : dataRaw;
      if (!data || !data.name) {
        logger.debug(`WB INCOMING> 2. data or data.name doesn't exist`);
        return;
      }
      logger.debug(`WB INCOMING> 2. backgroundBridges.current.forEach .onMessage: ${backgroundBridge.current}`);

      if (!backgroundBridge.current) return;
      const { origin } = data && data.origin && new URL(data.origin);
      if (backgroundBridge.current.url !== origin) {
        logger.warn(`bridge.url !== origin, onMessage not executed: ${backgroundBridge.current.url}, ${origin}`);
        return;
      }
      backgroundBridge.current.onMessage(data);
      return;
    } catch (e: any) {
      logger.debug(`WB INCOMING> error: ${e.message}`);
    }
  };

  /**
   * Handle url input submit
   */
  const onUrlInputSubmit = useCallback(
    async (inputValue = undefined) => {
      trackEventSearchUsed();
      if (!inputValue) {
        return;
      }
      const { defaultProtocol, searchEngine } = props;
      const sanitizedInput = onUrlSubmit(inputValue, searchEngine, defaultProtocol);
      await go(sanitizedInput);
    },
    /* we do not want to depend on the props object
		- since we are changing it here, this would give us a circular dependency and infinite re renders
		*/

    []
  );

  /**
   * Shows or hides the url input modal.
   * When opened it sets the current website url on the input.
   */
  const toggleUrlModal = useCallback(
    (shouldClearInput = false) => {
      const urlToShow = shouldClearInput ? '' : getMaskedUrl(url.current);
      // props.navigation.navigate(
      //   ...createBrowserUrlModalNavDetails({
      //     url: urlToShow,
      //     onUrlInputSubmit,
      //   })
      // );
    },
    /* we do not want to depend on the props.navigation object
		- since we are changing it here, this would give us a circular dependency and infinite re renders
		*/

    [onUrlInputSubmit]
  );

  const initializeBackgroundBridge = (urlBridge: string) => {
    logger.log(`WB SETUP> initializeBackgroundBridge starts, ${urlBridge}`);
    const newBridge = new BackgroundBridge({
      webview: webviewRef,
      url: urlBridge,
      getRpcMethodMiddleware: ({ hostname, getProviderState }: any) => {
        return getRpcMethodMiddleware({
          hostname,
          getProviderState,
          navigation: props.navigation,
          getApprovedHosts,
          setApprovedHosts,
          approveHost: approveHost,
          // Website info
          url,
          title,
          icon,
          // Bookmarks
          isHomepage,
          // Show autocomplete
          fromHomepage,
          toggleUrlModal,
          // Wizard
          wizardScrollAdjusted,
          tabId: props.id.toString(),
        });
      },
    });
    // backgroundBridges.current.push(newBridge);
    backgroundBridge.current = newBridge;
  };

  /**
   * Website started to load
   */
  const onLoadStart = async ({ nativeEvent }: any) => {
    logger.log(`WB SETUP> WebView onLoadStart: ${JSON.stringify(nativeEvent, null, 2)}`);
    const { hostname } = new URL(nativeEvent.url);

    if (nativeEvent.url !== url.current && nativeEvent.loading && nativeEvent.navigationType === 'backforward') {
      changeAddressBar({ ...nativeEvent });
    }

    if (!isAllowedUrl(hostname)) {
      return handleNotAllowedUrl(nativeEvent.url);
    }

    setError(false);

    changeUrl(nativeEvent);

    icon.current = null;

    // Reset the previous bridges
    // backgroundBridges.current.length && backgroundBridges.current.forEach((bridge) => bridge.onDisconnect());
    // backgroundBridges.current = [];
    backgroundBridge.current && backgroundBridge.current.onDisconnect();
    backgroundBridge.current = undefined;
    const origin = new URL(nativeEvent.url).origin;
    initializeBackgroundBridge(origin);
  };

  /**
   * Enable the header to toggle the url modal and update other header data
   */
  // useEffect(() => {
  //   if (props.activeTab === props.id) {
  //     props.navigation.setParams({
  //       showUrlModal: toggleUrlModal,
  //       url: getMaskedUrl(url.current),
  //       icon: icon.current,
  //       error,
  //     });
  //   }
  //   /* we do not want to depend on the entire props object
  // 	- since we are changing it here, this would give us a circular dependency and infinite re renders
  // 	*/
  // }, [error, props.activeTab, props.id, toggleUrlModal]);

  /**
   * Handle error, for example, ssl certificate error
   */
  const onError = ({ nativeEvent: errorInfo }: any) => {
    logger.log(errorInfo);
    props.navigation.setParams({
      error: true,
    });
    setError(errorInfo);
  };

  const handleOnFileDownload = useCallback(
    async ({ nativeEvent: { downloadUrl } }: FileDownloadEvent) => {
      logger.log(`fileDownload tried: ${downloadUrl}`);
      Alert.alert(t('download_file.unsupported'));
      reload();
    },
    [reload]
  );

  logger.log(`main render starts, ${!!entryScriptWeb3}, ${firstUrlLoaded}`);

  return (
    <S.Container>
      <View style={[styles.wrapper]} {...(Device.isAndroid() ? { collapsable: false } : {})}>
        <View style={styles.webview}>
          {!!entryScriptWeb3 && firstUrlLoaded && (
            <WebView
              originWhitelist={['https://*', 'http://*']}
              decelerationRate={'normal'}
              ref={webviewRef}
              renderError={() => <View>{error}</View>}
              source={{ uri: initialUrl }}
              injectedJavaScriptBeforeContentLoaded={entryScriptWeb3}
              style={styles.webview}
              onLoadStart={onLoadStart}
              onLoad={onLoad}
              onLoadEnd={onLoadEnd}
              onLoadProgress={onLoadProgress}
              onMessage={onMessage}
              onError={onError}
              onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
              sendCookies
              javascriptEnabled
              allowsInlineMediaPlayback
              useWebkit
              cacheEnabled={false}
              cacheMode={'LOAD_NO_CACHE'}
              testID={'browser-webview'}
              applicationNameForUserAgent={'WebView MetaMaskMobile'}
              onFileDownload={handleOnFileDownload}
              onNavigationStateChange={setNavState}
            />
          )}
        </View>
      </View>
    </S.Container>
  );
};

export default BrowserMain;
