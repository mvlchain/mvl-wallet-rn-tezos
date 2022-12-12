import React, { useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Webview from '@@components/BasicComponents/Webview';
import { useEarnEventDetailsState, IEventDetailsUiState } from '@@hooks/event/useEventDetailsState';
import { format } from '@@utils/strings';

import { EventActionControl } from '../EventActionControl';
import { ThirdPartyApp } from '../ThirdPartyApp';

import * as S from './EarnEventDetailsScreen.style';
import { TEarnEventDetailsRouteProps } from './EarnEventDetailsScreentype';

/**
 * Event details screen that displays contents to the WebView.
 * WebView: display event contents (O)
 * EventActionControl (~ing)
 * RewardReceiptModal (O WebView based modal)
 * ThirdPartyApp (O)
 * Alert modal
 *  • failed claim
 *  • transfer failed
 *  • connect with {tada} (with connection useCase)
 *  • disconnect with {tada} with (dis-connection useCase)
 *  • connection conflict modal
 *  • Confirm claim modal
 * WalletChooserModal
 * AwaitRewardScreen
 * TransferSuccessScreen
 *
 * UseCases
 *  • useConnectThirdParty
 *  • useDisconnectThirdParty
 *  • useThirdPartyConnection (CheckThirdPartyConnection)
 *  • useCurrentParticipants
 *  • useClaimInfomation (GetClaimInfomation)
 *  • useClaimStatus
 *
 * Scenario (Analysis of legacy)
 *   whenPageLoaded (event: EarnEvent)
 *     if (event.app == null) {
 *       hide ThirdPartyApp();
 *     }
 *
 *     // 1
 *     const {thirdPartyConnection} = useThirdPartyConnection(event, deepLink?: ThirdPartyDeepLink);
 *
 *     // 2-1
 *     const {participants} = useCurrentParticipants(event, thirdPartyConnection);
 *
 *     // 2-2
 *     const {onClaimEvent} = useOnClaimEvent(event, thirdPartyConnection);
 *     const {claimInfo} = useClaimInfomation(onClaimEvent);
 *     const {claimStatus} = useClaimStatus(onClaimEvent);
 *
 *     // {ThirdPartyApp}
 *     when {
 *       thirdPartyConnection.exists == true -> {
 *         render ThirdPartyApp(connected, thirdPartyConnection.displayName)
 *       }
 *       thirdPartyConnection.exists == false -> {
 *         render ThirdPartyApp(disconnected)
 *       }
 *     }
 *
 *     // {EventActionControl}
 *     if (participants) {
 *       render EventActionControl(event, participants)
 *     }
 *
 *   useThirdPartyConnection(event: EarnEvent, deepLink?: ThirdPartyDeepLink) {
 *     if (event.app == null) {
 *       return;
 *     }
 *
 *     if (deepLink.appId.isNotEmpty() && event.app.id.isNotEmpty()) {
 *       const {appId, token, error} = when () {
 *         deepLink.appId != event.app.id -> {
 *           return@when {event.app.id, null, ThirdPartyAppAlreadyConnectedError()}
 *         }
 *         deepLink.appId == event.app.id -> {
 *           return@when {deepLink.appId, deepLink.token}
 *         }
 *       }
 *     }
 *     const connection = CheckThirdPartyConnection(appId, token);
 *     return {connection, error}
 *   }
 *
 *   when ThirdPartyApp `Connect` pressed
 *     if (isNotNullNorEmpty(event.app.connectionDeepLink)) {
 *       redirect event.app.connectionDeepLink -> go to third party app
 *     } else {
 *       toast('msg invalid redirection error')
 *     }
 *
 *
 * DeepLinks
 *  clutchwallet://connect
 *  clutchwallet://screen/earn
 *  clutchwallet://screen/trade
 */
export function EarnEventDetailsScreen() {
  const { t } = useTranslation();
  const { params } = useRoute<TEarnEventDetailsRouteProps>();
  if (!params) {
    console.error('inappropriate event params!');
  }

  const { isThirdPartySupported, thirdPartyConnection, error } = useEarnEventDetailsState(params?.data);

  const data = params?.data;

  function decorateThirdPartyApp(
    thirdParyExists: boolean,
    thirdPartyDisplayName: string | null,
    thirdPartyAppName: string | undefined
  ): {
    connectionState: string;
    displayName: string | undefined;
  } {
    let connectionState = '';
    let displayName: string | undefined = '';

    if (thirdParyExists) {
      connectionState = t('connected_account');
      displayName = thirdPartyDisplayName ?? undefined;
    } else {
      connectionState = format(t('third_party_connect_account'), thirdPartyAppName ?? '');
      displayName = undefined;
    }

    return {
      connectionState,
      displayName,
    };
  }

  return (
    <S.Container>
      {data ? (
        <>
          <Webview url={data.detailPageUrl} />

          {isThirdPartySupported && thirdPartyConnection ? (
            <ThirdPartyApp
              avatarUrl={data.iconUrl}
              {...decorateThirdPartyApp(thirdPartyConnection.exists ?? false, thirdPartyConnection.displayName, data.app?.name)}
            />
          ) : null}

          <EventActionControl
            avatarUrl={data.pointIconUrl}
            points={data.pointInfoArr}
            eventActionButtonTitle={data.eventActionButtonTitle ?? ''}
            eventActionScheme={data.eventActionScheme ?? ''}
            receiptUrl={data.calcInfoPageUrl}
          />
        </>
      ) : null}
    </S.Container>
  );
}
