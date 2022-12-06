import React from 'react';

import { useRoute } from '@react-navigation/native';

import Webview from '@@components/BasicComponents/Webview';

import * as S from './EarnEventDetailsScreen.style';
import { TEarnEventDetailsRouteProps } from './EarnEventDetailsScreentype';

/**
 * Event details screen that displays contents to the WebView.
 *
 * DeepLinks
 *  clutchwallet://connect
 *  clutchwallet://screen/earn
 *  clutchwallet://screen/trade
 */
export function EarnEventDetailsScreen() {
  const route = useRoute<TEarnEventDetailsRouteProps>();

  if (!route.params) {
    console.error('inappropriate event params!');
  }

  const data = route.params?.data;

  return <S.Container>{data && <Webview url={data.detailPageUrl} />}</S.Container>;
}
