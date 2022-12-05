import React from 'react';

import Webview from '@@components/BasicComponents/Webview';

import * as S from './EarnEventDetailsScreen.style';

/**
 * Event details screen that displays contents to the WebView.
 *
 * DeepLinks
 *  clutchwallet://connect
 *  clutchwallet://screen/earn
 *  clutchwallet://screen/trade
 */
export function EarnEventDetailsScreen() {
  return (
    <S.Container>
      <Webview url={'https://mvlbridge.io'} />
    </S.Container>
  );
}
