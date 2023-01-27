import { useCallback, useEffect, useState } from 'react';

import Url from 'url';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import qs from 'qs';
import { useTranslation } from 'react-i18next';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { InvalidThirdPartyDeepLinkConnectionError } from '@@domain/error/InvalidThirdPartyConnectionRequestError';
import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase, getEventPhase } from '@@domain/model/EventPhase';
import { ThirdPartyDeepLink } from '@@domain/model/ThirdPartyDeepLink';
import { ThirdPartyConnectCheckResponseDto, EarnEventGetClaimResponseDto } from '@@generated/generated-scheme';
import { useConnectThirdParty } from '@@hooks/event/useConnectThirdParty';
import { useAppStateChange } from '@@hooks/useAppStateChange';
import { useDi } from '@@hooks/useDi';
import { TADA_DRIVER, TADA_RIDER } from '@@navigation/DeepLinkOptions';
import {
  IEventDetailsUiState,
  IEventDetails,
  IEventThirdParty,
  IThirdPartyConnection,
} from '@@screens/EarnEventScreen/EarnEventDetailsScreen/EarnEventDetailsScreen.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import utilStore from '@@store/util/utilStore';
import { tagLogger } from '@@utils/Logger';
import { assembleUrl, evaluateUrlScheme } from '@@utils/regex';
import { isNotBlank, format, isBlank } from '@@utils/strings';
import { valueOf } from '@@utils/types';

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
  data?: EarnEventDto;
  deepLink?: ThirdPartyDeepLink;
};

export const useEarnEventDetailsUiState = ({ id, data, deepLink }: useEarnEventDetailsUiStateProps): IEventDetailsUiState => {
  const { t } = useTranslation();
  const service = useDi('EarnEventService');
  const { openModal, closeModal } = globalModalStore();
  const { connectThirdParty } = useConnectThirdParty();
  const eventLogger = tagLogger('Event');
  const isFocused = useIsFocused();

  eventLogger.log(`useEarnEventDetailsUiState() starts with deepLink: ${JSON.stringify(deepLink)}`);

  const [args, setArgs] = useState({
    id,
    data,
    deepLink,
  });
  const [uiState, setUiState] = useState<IEventDetailsUiState>({
    details: {
      event: data,
      phase: data ? getEventPhase(data) : EventPhase.NotAvailable,
      deepLink,
    },
    thirdParty: {
      isThirdPartySupported: false,
      points: [],
      isThirdPartyConnectionRequired: false,
      error: null,
    },
    claimStatusInfo: undefined,
    refresh: async (newDeepLink?: ThirdPartyDeepLink) => {},
  });

  useEffect(() => {
    setArgs({ ...args, deepLink });
  }, [deepLink]);

  // 훅이 호출되기전에 호출된다.
  // useAppStateChange(
  //   (isAppStateVisible: boolean) => {
  //     setIsAppStateVisible(isAppStateVisible);
  //     // if (isAppStateVisible) {
  //     //   console.log("EventDetails is visible");
  //     //   uiState.refresh(deepLink);
  //     // }
  //   },
  //   [deepLink, uiState]
  // );

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

  const getEarnEventDetailsUiState = useCallback(async (id: string, data?: EarnEventDto, deepLink?: ThirdPartyDeepLink) => {
    eventLogger.log(`calling getEarnEventDetailsUiState(), with id: ${id}, data: ${data}, deepLink: ${deepLink}, `);

    const res = await service.getEarnEventDetailsUiState(id, data, deepLink);
    const { details, thirdParty } = res;
    const { event } = details;

    eventLogger.log(
      `isThirdPartyConnectionRequired: ${thirdParty.isThirdPartyConnectionRequired}, thirdPartyConnection: ${JSON.stringify(thirdParty.connection)}`
    );

    const thirdPartyApp = event.app;
    if (thirdPartyApp && thirdParty.connection && thirdParty.isThirdPartyConnectionRequired) {
      const { appId, token } = thirdParty.connection;

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

    return res;
  }, []);

  // const refresh = useCallback(async (newDeepLink?: ThirdPartyDeepLink) => {
  //   const { id, data, deepLink } = args;
  //   const res = await getEarnEventDetailsUiState(id, data, newDeepLink);
  // }, [args]);

  useEffect(() => {
    (async () => {
      console.log('calling a getEarnEventDetailsUiState');
      const { id, data, deepLink } = args;
      const res = await getEarnEventDetailsUiState(id, data, deepLink);

      setUiState({
        ...res,
        refresh: async (newDeepLink?: ThirdPartyDeepLink) => {
          setArgs({
            id,
            data: res.details.event,
            deepLink: newDeepLink,
          });
        },
      });
    })();
  }, [args]);

  return uiState;
};
