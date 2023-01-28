import { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase, getEventPhase } from '@@domain/model/EventPhase';
import { ThirdPartyDeepLink } from '@@domain/model/ThirdPartyDeepLink';
import { useConnectThirdParty } from '@@hooks/event/useConnectThirdParty';
import { useAppStateChange } from '@@hooks/useAppStateChange';
import { useDi } from '@@hooks/useDi';
import {
  IEventDetailsUiState,
  IEventDetails,
  IEventThirdParty,
  IThirdPartyConnection,
  IEventDetailsGroup,
} from '@@screens/EarnEventScreen/EarnEventDetailsScreen/EarnEventDetailsScreen.type';
import deepLinkStore from '@@store/deepLinkStore/deepLinkStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { tagLogger } from '@@utils/Logger';
import { format } from '@@utils/strings';

/**
 * A hook that calculates EventDetails screen state.
 *
 * UseCases
 *  • useThirdPartyConnection & useUserPoints
 *  • useClaimStatusInformation
 *    - useClaimInfomation
 *    - useClaimStatus
 *
 * [details] dependency
 * setDetails -> refreshThirdParty()
 * refreshThirdParty() {
 *   const connection = useThirdPartyConnection(appId, token)
 *   const points = useUserPoints(...)
 *   setThirdPary({ connection, points })
 * }
 *
 * [thirdParty] dependency
 * const claimStatus = await useClaimStatus(event.id);
 * const claimInfo = await useClaimInformation(event.id);
 * setClaimStatusInfo({
 *   claimStatus, claimInfo
 * })
 *
 * [claimStatusInfo] dependency
 * useEventDetailsUiState = () => ({
 *   ...
 *   return {
 *     details,
 *     thirdParty,
 *     claimStatusInfo
 *   }
 * })
 *
 * 포인트 혹은 클레임 리워드 (이벤트의 상태에 따라 다른 API를 조회한다)
 * when EventPhase is in (BeforeEvent, OnEvent, BeforeClaim) -> useUserPoints(...)[participation/current]
 * when EventPhase in OnClaim -> useClaimInformation(...)[claim/information]
 *
 * isClaimable field is equal to the conditions as follows
 * ```
 * ((!isAllowParticipationInClaim &&
 *   (status == null ||
 *     status == 'CANCELED' ||
 *     status == 'FAILED_TRANSFER' ||
 *     status == 'FAILED_WITHDRAW')) ||
 *   isAllowParticipationInClaim) &&
 *   (amount > 0 || subCurrencyAmount == null || (subCurrencyAmount != null && subCurrencyAmount > 0)) &&
 *   currentPoint >= lowerLimitPoint
 * ```
 */
export type useEarnEventDetailsUiStateProps = {
  id: string;
  event?: EarnEventDto;
};

export const useEarnEventDetailsUiState = (props: useEarnEventDetailsUiStateProps): IEventDetailsUiState => {
  const { t } = useTranslation();
  const { openModal, closeModal } = globalModalStore();
  const { connectThirdParty } = useConnectThirdParty();
  const service = useDi('EarnEventService');
  const eventLogger = tagLogger('Event');

  const { id, event } = props;
  eventLogger.log(`useEarnEventDetailsUiState() started`);

  const refresh = useCallback(
    async (deepLink?: ThirdPartyDeepLink) => {
      await getEarnEventDetailsUiState(id, event, deepLink);
    },
    [id, event]
  );

  const [uiState, setUiState] = useState<IEventDetailsUiState>({
    details: {
      event: event,
      phase: event ? getEventPhase(event) : EventPhase.NotAvailable,
    },
    thirdParty: {
      isThirdPartySupported: false,
      points: [],
      isThirdPartyConnectionRequired: false,
      error: null,
    },
    claimStatusInfo: undefined,
    refresh: refresh,
  });

  const { getState, setState } = deepLinkStore;
  const appState = useAppStateChange();

  /*
   * fetching uiState when AppState == active which is in foreground.
   * if there's thirdPartyLink in deepLinkStore then it means this screen is navigated by DeepLink
   * which will trgger thirdPartyApp connection
   */
  useEffect(() => {
    const thirdPartyLink = getState().thirdPartyLink;
    eventLogger.log(`EventDetails's refresh() with AppState: ${appState}, thirdPartyLink: ${getState().thirdPartyLink}`);
    if (appState === 'active') {
      refresh(thirdPartyLink);

      if (thirdPartyLink) {
        // consume deepLink not to repeat deepLink proces.
        setState({
          thirdPartyLink: undefined,
        });
      }
    } else if (appState.match(/inactive|background/)) {
      // in bacground
    }
  }, [appState]);

  // ThirdParty connection callback. This will connect ThirdPartyApp if executed.
  const onThirdPartyConnectionConfirm = useCallback(async (appId: string, token: string | null, details: IEventDetails) => {
    if (token) {
      const res = await connectThirdParty(appId, token);
      if (res && res.status === 'ok') {
        const thirdParty = await service.refreshThirdParty(details);
        const claimStatusInfo = await service.getClaimStatusInformation(details, thirdParty);
        setUiState({
          ...uiState,
          thirdParty,
          claimStatusInfo,
        });
      }
    }
  }, []);

  // fetching uiState
  const getEarnEventDetailsUiState = useCallback(async (id: string, data?: EarnEventDto, deepLink?: ThirdPartyDeepLink) => {
    eventLogger.log(`getEarnEventDetailsUiState(), with id: ${id}, data: ${data}, deepLink: ${deepLink}, `);

    const res = await service.getEarnEventDetailsUiState(id, data, deepLink);
    const { details, thirdParty } = res;
    const { event } = details;

    eventLogger.log(
      `isThirdPartyConnectionRequired: ${thirdParty.isThirdPartyConnectionRequired}, event:${event.app} thirdPartyConnection: ${JSON.stringify(
        thirdParty.connection
      )}`
    );

    const thirdPartyApp = event.app;
    if (thirdPartyApp && thirdParty.connection && thirdParty.isThirdPartyConnectionRequired) {
      const { appId, token } = thirdParty.connection;

      eventLogger.log(`rendering connction modal`);
      openModal(MODAL_TYPES.TEXT_MODAL, {
        title: format(t('connect_thirdparty_dialog_title'), thirdPartyApp.name),
        label: format(t('connect_thirdparty_dialog_description'), thirdPartyApp.name),
        confirmLabel: t('connect'),
        onConfirm: async () => await onThirdPartyConnectionConfirm(appId, token, details),
        cancelLabel: t('btn_cancel'),
        onCancel: () => {
          closeModal();
        },
      });
    }

    setUiState({
      ...uiState,
      ...res,
    });
  }, []);

  return uiState;
};
