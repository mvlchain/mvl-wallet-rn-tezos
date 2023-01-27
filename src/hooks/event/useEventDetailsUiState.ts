import { useCallback, useEffect, useState } from 'react';

import Url from 'url';

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

export const useEarnEventDetailsUiState = ({ id, data, deepLink }: useEarnEventDetailsUiStateProps): IEventDetailsUiState | undefined => {
  const { t } = useTranslation();
  const service = useDi('EarnEventService');
  const { openModal, closeModal } = globalModalStore();
  const { connectThirdParty } = useConnectThirdParty();
  const eventLogger = tagLogger('Event');

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
    refresh: async (clearDeepLink: boolean) => {},
  });

  useAppStateChange(
    (isAppStateVisible: boolean) => {
      if (isAppStateVisible) {
        uiState.refresh(false);
      }
    },
    [uiState]
  );

  // ThirdParty connection callback. This will connect ThirdPartyApp if executed.
  const onThirdPartyConnectionConfirm = useCallback(async (appId: string, token: string | null, details: IEventDetails) => {
    if (token) {
      const res = await connectThirdParty(appId, token);
      if (res && res.status === 'ok') {
        const thirdParty = await service.refreshThirdParty(details);
        setUiState({
          ...uiState,
          thirdParty,
        });
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      const { id, data, deepLink } = args;

      eventLogger.log(`calling getEarnEventDetailsUiState(), with id: ${id}, data: ${data}, deepLink: ${deepLink}`);

      const res = await service.getEarnEventDetailsUiState(id, data, deepLink);
      const { details, thirdParty } = res;
      const { event } = details;

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

      setUiState({
        ...res,
        refresh: async (clearDeepLink: boolean) => {
          setArgs({
            id,
            data: res.details.event,
            deepLink: clearDeepLink ? undefined : deepLink,
          });
        },
      });
    })();
  }, [args]);

  return uiState;

  // eventLogger.log(`useEarnEventDetailsUiState() starts with deepLink: ${JSON.stringify(deepLink)}`);

  // const { t } = useTranslation();
  // const { openModal, closeModal } = globalModalStore();
  // const { connectThirdParty } = useConnectThirdParty();

  // // States
  // const [details, setDetails] = useState<IEventDetails>({
  //   event: data,
  //   phase: data ? getEventPhase(data) : EventPhase.NotAvailable,
  //   deepLink: deepLink,
  // });
  // const [thirdParty, setThirdParty] = useState<IEventThirdParty>({
  //   isThirdPartySupported: false,
  //   connection: undefined,
  //   points: details.event?.pointInfoArr.map((data) => ({ ...data, amount: '0' })) ?? [],
  //   isThirdPartyConnectionRequired: false,
  //   error: null,
  // });
  // const [claimStatusInfo, setClaimStatusInfo] = useState<ClaimStatusInformation | undefined>();

  // // ThirdParty connection callback. This will connect ThirdPartyApp if executed.
  // const onThirdPartyConnectionConfirm = useCallback(
  //   async (appId: string, token: string | null) => {
  //     if (token) {
  //       if (appId) {
  //         const res = await connectThirdParty(appId, token);
  //         if (res && res.status === 'ok') {
  //           refreshThirdParty();
  //         }
  //       }
  //     }
  //   },
  //   [details]
  // );

  // useEffect(() => {
  //   eventLogger.log(`init details. will trigger refreshThirdParty(), after updating EarnEventDetailsScreen`);
  //   setDetails({
  //     event: data,
  //     phase: data ? getEventPhase(data) : EventPhase.NotAvailable,
  //     deepLink: deepLink,
  //   });
  // }, [data, deepLink]);

  // // refresh State<Details>
  // const refresh = async (clearDeepLink: boolean = false) => {
  //   try {
  //     const res = await repository.getEvent(id);
  //     setDetails({
  //       event: res,
  //       phase: getEventPhase(res),
  //       deepLink: clearDeepLink ? undefined : deepLink,
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // // UseCase: useEarnEventDetails, State<Details>
  // useEffect(() => {
  //   (async () => {
  //     if (!data && isNotBlank(id)) {
  //       await refresh();
  //     }
  //   })();
  // }, [id, data]);

  // // refresh State<ThirdParty>
  // const refreshThirdParty = async () => {
  //   const { event, phase, deepLink } = details;
  //   if (!event) return;

  //   eventLogger.log(`refreshThirdParty, details.deepLink: ${JSON.stringify(details.deepLink)}`);

  //   const thirdPartyApp = event.app;
  //   if (!thirdPartyApp) {
  //     setThirdParty({ ...thirdParty, isThirdPartySupported: false });
  //     return;
  //   }

  //   // result state machine
  //   const machine: IEventThirdParty = {
  //     ...thirdParty,
  //   };

  //   // UseCase: useThirdPartyConnection
  //   const { appId, token, error } = parseThirdPartyConnectionArgs(thirdPartyApp.id, deepLink);
  //   try {
  //     const connection = await repository.checkThirdPartyConnection(appId, token);
  //     const connectionDeepLink = getThirdPartyConnectionDeepLink(event, thirdPartyApp.connectionDeepLink);

  //     machine.isThirdPartySupported = true;
  //     machine.connection = {
  //       appId,
  //       token,
  //       exists: connection.exists,
  //       displayName: connection.displayName,
  //       connectionDeepLink,
  //     };
  //     machine.points = event.pointInfoArr.map((data) => ({ ...data, amount: '0' }));

  //     // ThirdPartyConnection modal
  //     if (!connection.exists && !!token) {
  //       machine.isThirdPartyConnectionRequired = true;
  //       openModal(MODAL_TYPES.TEXT_MODAL, {
  //         title: format(t('connect_thirdparty_dialog_title'), thirdPartyApp.name),
  //         label: format(t('connect_thirdparty_dialog_description'), thirdPartyApp.name),
  //         confirmLabel: t('connect'),
  //         onConfirm: async () => await onThirdPartyConnectionConfirm(appId, token),
  //         cancelLabel: t('btn_cancel'),
  //         onCancel: () => {
  //           closeModal();
  //         },
  //       });
  //     }
  //   } catch (e) {
  //     console.error(e);
  //     setThirdParty({ ...thirdParty, error: e });
  //     return;
  //   }

  //   // UseCase: useUserPoints
  //   if (isPointInquiryAvailable(phase, machine.isThirdPartySupported)) {
  //     try {
  //       const res = await repository.getUserPoints(event.id);
  //       machine.points = res;
  //     } catch (e) {
  //       console.error(e);
  //       setThirdParty({
  //         ...thirdParty,
  //         points: event.pointInfoArr.map((data) => ({ ...data, amount: '0' })),
  //         error: e,
  //       });
  //       return;
  //     }
  //   }

  //   setThirdParty({
  //     ...machine,
  //   });
  // };

  // // UseCase: useThirdPartyConnection & useUserPoints, State<ThirdParty>
  // useEffect(() => {
  //   (async () => {
  //     await refreshThirdParty();
  //   })();
  // }, [details]);

  // // UseCase: useClaimStatusInformation, State<ClaimStatusInfo>
  // useEffect(() => {
  //   (async () => {
  //     const { event, phase } = details;
  //     if (!event) return;

  //     eventLogger.log(`useClaimStatusInformation, phase: ${phase}`);

  //     const thirdPartyConnection = thirdParty.connection;
  //     if (phase === EventPhase.OnClaim) {
  //       // get an OnClaim phase event id.
  //       const claimStatus = await repository.getClaimStatus(event.id);
  //       const claimInfo = await repository.getClaimInformation(event.id);
  //       const fee = new Decimal(claimInfo.fee);

  //       // isTxFeeVisible: 'transaction fee' component is visible when the claimInfo.fee is greater then zero.
  //       setClaimStatusInfo({
  //         ...claimStatus,
  //         ...claimInfo,
  //         isTxFeeVisible: fee.toNumber() > 0,
  //         isEventActionButtonEnabled: isEventActionButtonEnabled(phase, thirdPartyConnection, claimInfo, thirdParty.isThirdPartySupported),
  //       });
  //     }
  //   })();
  // }, [thirdParty]);

  // return {
  //   details,
  //   thirdParty,
  //   claimStatusInfo,
  //   refresh,
  // } as const;
};

/**
 * UseCase: useThirdPartyConnection
 */
const useThirdPartyConnection = (appId: string, token: string | null): UseQueryResult<ThirdPartyConnectCheckResponseDto, AxiosError> => {
  const repository: EarnEventRepository = useDi('EarnEventRepository');
  return useQuery({
    queryKey: ['third-party-connection', appId, token],
    queryFn: () => repository.checkThirdPartyConnection(appId, token),
  });
};

interface ThirdPartyConnectionArgs {
  appId: string;
  token: string | null;
  error: Error | unknown;
}

/**
 * Parse third-party app arguments appId, token
 * @param appId third-party app id
 * @param deepLink optional deeplink that is given by third-party app
 */
function parseThirdPartyConnectionArgs(appId: string, deepLink?: ThirdPartyDeepLink): ThirdPartyConnectionArgs {
  let token: string | null = null;

  let useCaseError: Error | unknown;

  if (isNotBlank(deepLink?.appId)) {
    if (appId == deepLink?.appId) {
      token = deepLink?.token;
    } else {
      useCaseError = new InvalidThirdPartyDeepLinkConnectionError();
    }
  }

  return {
    appId,
    token,
    error: useCaseError,
  };
}

/**
 * Check if it's avilable to make an inquiry about event points
 */
function isPointInquiryAvailable(phase: valueOf<typeof EventPhase>, isThirdPartySupported: boolean): boolean {
  return (isThirdPartySupported && phase === EventPhase.BeforeEvent) || phase === EventPhase.OnEvent || phase === EventPhase.BeforeClaim;
}

/**
 * is event action button enabled.
 */
function isEventActionButtonEnabled(
  phase: valueOf<typeof EventPhase>,
  thirdPartyConnection: IThirdPartyConnection | undefined,
  claimInfo: EarnEventGetClaimResponseDto,
  isThirdPartySupported: boolean
): boolean {
  const isThirdPartyConnected = thirdPartyConnection?.exists === true;
  const isOnEvent = phase == EventPhase.OnEvent;
  const isAbleToClaim = phase == EventPhase.OnClaim && claimInfo.isClaimable;

  return (!isThirdPartySupported || isThirdPartyConnected) && (isOnEvent || isAbleToClaim);
}

/**
 * modify third-party connectionDeepLink according to clutch policy (fallback)
 * @param connectionDeepLink a link from event.app.connectionDeepLink field
 * @returns
 */
function getThirdPartyConnectionDeepLink(event: EarnEventDto, connectionDeepLink: string | null): string | null {
  if (isBlank(connectionDeepLink)) {
    return null;
  }

  const scheme = evaluateUrlScheme(connectionDeepLink);
  switch (scheme) {
    case `${TADA_RIDER.scheme}:`:
    case `${TADA_DRIVER.scheme}:`:
      const url = Url.parse(connectionDeepLink ?? '', true);
      url.query.e = event.id;
      return assembleUrl(url.protocol, url.host, url.pathname, qs.stringify(url.query));
    default:
      return connectionDeepLink ?? null;
  }
}
