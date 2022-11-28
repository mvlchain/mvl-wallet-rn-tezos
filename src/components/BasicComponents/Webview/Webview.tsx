import React from 'react';

import { WebView } from 'react-native-webview';

import * as S from './Webview.style';
import { IWebviewProps } from './Webview.type';
import { useWebview } from './useWebview';

function Webview({ url }: IWebviewProps) {
  const { onLoadStart, onLoadEnd } = useWebview();
  return <WebView source={{ uri: url }} style={S.WebviewStyle.container} onLoadStart={onLoadStart} onLoadEnd={onLoadEnd} />;
}

export default Webview;
