import React, { useState } from 'react';

import { useRoute } from '@react-navigation/native';

import Webview from '@@components/BasicComponents/Webview';

import { EarnEventActionModal } from '../EarnEventActionModal';

import * as S from './EarnEventDetailsScreen.style';
import { TEarnEventDetailsRouteProps } from './EarnEventDetailsScreentype';

/**
 * Event details screen that displays contents to the WebView.
 * WebView: display event contents.
 * EarnEventActionLayout
 * WebViewModal (EarnEventReceiptModal)
 * Alert modal
 *  . failed claim
 *  . transfer failed
 *  . connect with {tada} (with connection useCase)
 *  . disconnect with {tada} with (dis-connection useCase)
 *  . connection conflict modal
 *  . Confirm claim modal
 * WalletChooserModal
 * AwaitRewardScreen
 * TransferSuccessScreen
 *
 * DeepLinks
 *  clutchwallet://connect
 *  clutchwallet://screen/earn
 *  clutchwallet://screen/trade
 */
export function EarnEventDetailsScreen() {
  const { params } = useRoute<TEarnEventDetailsRouteProps>();
  if (!params) {
    console.error('inappropriate event params!');
  }

  const data = params?.data;

  return (
    <S.Container>
      {data && (
        <>
          <Webview url={data.detailPageUrl} />
          <EarnEventActionModal
            eventActionButtonTitle={data.eventActionButtonTitle ?? ''}
            eventActionScheme={data.eventActionScheme ?? ''}
            avatarUrl={data.iconUrl}
          />
        </>
      )}
    </S.Container>
  );
}
