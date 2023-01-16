import React, { useCallback, useEffect, useState } from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Linking, Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import Webview from '@@components/BasicComponents/Webview';
import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { useConnectThirdParty } from '@@hooks/event/useConnectThirdParty';
import { useDisconnectThirdParty } from '@@hooks/event/useDisconnectThirdParty';
import { useEarnEventDetailsUiState } from '@@hooks/event/useEventDetailsUiState';
import { openUriForApp } from '@@navigation/DeepLinkOptions';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { format } from '@@utils/strings';

import { EventActionControl } from '../EventActionControl';
import { ThirdPartyApp } from '../ThirdPartyApp';

import * as S from './EarnEventDetailsScreen.style';
import { TEarnEventDetailsRouteProps } from './EarnEventDetailsScreentype';

/**
 * Event details screen that displays contents to the WebView.
 * WebView: display event contents (O)
 * EventActionControl (O)
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
 *  • useThirdPartyConnection (O)
 *  • useUserPoints (O)
 *  • useClaimStatusInformation (O)
 *    - useClaimInfomation
 *    - useClaimStatus
 *
 * Scenario (Analysis of legacy)
 *   whenPageLoaded (event: EarnEvent)
 *     const {thirdPartyConnection} = useThirdPartyConnection(event, deepLink?: ThirdPartyDeepLink);
 *
 *     const {participants} = useUserPoints(event, thirdPartyConnection);
 *
 *     const {claimStatusInfo} = useClaimStatusInformation(event, thirdPartyConnection); {
 *       const {claimInfo} = useClaimInfomation(onClaimEvent);
 *       const {claimStatus} = useClaimStatus(onClaimEvent);
 *     }
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
 * • `transaction fee` will only be visible when claimInfo.fee > 0
 *
 * DeepLinks
 *  clutchwallet://connect (O)
 *  clutchwallet://screen/earn (O)
 *  clutchwallet://screen/trade
 */
export function EarnEventDetailsScreen() {
  const { t } = useTranslation();
  const { params } = useRoute<TEarnEventDetailsRouteProps>();
  if (!params) {
    console.error('inappropriate event params!');
  }

  const { disconnectThirdParty } = useDisconnectThirdParty();
  const { openModal } = globalModalStore();

  console.log(`Details> i: ${params.i}`);

  const { details, thirdParty, claimStatusInfo, refresh } = useEarnEventDetailsUiState(params.i, params.data, params.deepLink);
  const { event, phase } = details;

  const onConnectThirdPartyPress = useCallback(
    async (uri: string) => {
      try {
        await openUriForApp(uri);
      } catch (e) {
        Toast.show({
          ...TOAST_DEFAULT_OPTION,
          type: 'basic',
          text1: t('msg_error_cannot_resolve_uri'),
        });
      }
    },
    [event]
  );

  const onDisconnectThirdPartyPress = useCallback(async () => {
    const res = await disconnectThirdParty(event?.app?.id);
    if (res?.status === 'ok') {
      // TODO: disconnected successfully. do following tasks
      //  1. third-party disconnection modal
      console.log(`Details> disconnected and refreshing`);
      refresh(true);
    }
  }, [event]);

  if (!event) {
    console.log(`Details> event is null`);
    return null;
  }

  const isThirdPartyConnected = thirdParty.connection?.exists ?? false;

  function decorateThirdPartyApp(
    isThirdPartyConnected: boolean,
    thirdPartyDisplayName: string | null,
    thirdPartyAppName: string | undefined
  ): {
    isThirdPartyConnected: boolean;
    connectionState: string;
    displayName: string | undefined;
  } {
    let connectionState = '';
    let displayName: string | undefined = '';

    if (isThirdPartyConnected) {
      connectionState = t('connected_account');
      displayName = thirdPartyDisplayName ?? undefined;
    } else {
      connectionState = format(t('third_party_connect_account'), thirdPartyAppName ?? '');
      displayName = undefined;
    }

    return {
      isThirdPartyConnected,
      connectionState,
      displayName,
    };
  }

  return (
    <S.Container>
      {event ? (
        <>
          <Webview url={event.detailPageUrl} />

          {thirdParty.isThirdPartySupported && thirdParty.connection ? (
            <ThirdPartyApp
              avatarUrl={event.iconUrl}
              {...decorateThirdPartyApp(isThirdPartyConnected, thirdParty.connection.displayName, event.app?.name)}
              onConnectPress={() => {
                // decorated deeplink
                const connectionDeepLink = thirdParty.connection!.connectionDeepLink;
                console.log(`Details> connectionDeepLink: ${connectionDeepLink}`);
                if (connectionDeepLink) {
                  onConnectThirdPartyPress(connectionDeepLink);
                }
              }}
              onDisconnectPress={() => {
                onDisconnectThirdPartyPress();
              }}
            />
          ) : null}

          <EventActionControl phase={phase} event={event} thirdParty={thirdParty} claimStatusInfo={claimStatusInfo} />
        </>
      ) : null}
    </S.Container>
  );
}
