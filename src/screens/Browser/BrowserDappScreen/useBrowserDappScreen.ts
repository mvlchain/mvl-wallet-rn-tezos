import { useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';

import { TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

const useBrowserDappScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const webviewRef = useRef<null | WebView<any>>(null);

  const onPressClose = () => {
    rootNavigation.goBack();
  };

  const onPressRefresh = () => {
    if (!webviewRef.current) return;
    webviewRef.current.reload();
  };

  return {
    webviewRef,
    onPressRefresh,
    onPressClose,
  };
};

export default useBrowserDappScreen;
