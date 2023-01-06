/* eslint-disable max-lines */
import { useCallback, useEffect, useState } from 'react';

import Url from 'url';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Decimal from 'decimal.js';
import qs from 'qs';
import { useTranslation } from 'react-i18next';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { InvalidThirdPartyDeepLinkConnectionError } from '@@domain/error/InvalidThirdPartyConnectionRequestError';
import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase, getEventPhase } from '@@domain/model/EventPhase';
import { ThirdPartyDeepLink } from '@@domain/model/ThirdPartyDeepLink';
import { ThirdPartyConnectCheckResponseDto, EarnEventCurrentResponseDto, EarnEventGetClaimResponseDto } from '@@generated/generated-scheme';
import { useConnectThirdParty } from '@@hooks/event/useConnectThirdParty';
import { useDi } from '@@hooks/useDi';
import { IEventDetails, IEventThirdParty, IThirdPartyConnection } from '@@screens/EarnEventScreen/EarnEventDetailsScreen/EarnEventDetailsScreentype';
import { ThirdPartyApp } from '@@screens/EarnEventScreen/ThirdPartyApp';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { assembleUrl, evaluateUrlScheme } from '@@utils/regex';
import { isNotBlank, format, isBlank } from '@@utils/strings';
import { valueOf } from '@@utils/types';

/**
 * Combination of following usecases
 *
 * UseCases
 *  • useThirdPartyConnection & useUserPoints
 *  • useClaimStatusInformation
 *    - useClaimInfomation
 *    - useClaimStatus
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
export const useEarnEventDetailsUiState = (
  id: string,
  data?: EarnEventDto,
  deepLink?: ThirdPartyDeepLink
): {
  details: IEventDetails;
  thirdParty: IEventThirdParty;
  claimStatusInfo: ClaimStatusInformation | undefined;
  refresh: (clearDeepLink: boolean) => Promise<void>;
} => {
  const repository: EarnEventRepository = useDi('EarnEventRepository');

  const { t } = useTranslation();
  const { openModal, closeModal } = globalModalStore();
  const { connectThirdParty } = useConnectThirdParty();

  const [details, setDetails] = useState<IEventDetails>({
    event: data,
    phase: data ? getEventPhase(data) : EventPhase.NotAvailable,
    deepLink: deepLink,
  });

  useEffect(() => {
    setDetails({
      event: data,
      phase: data ? getEventPhase(data) : EventPhase.NotAvailable,
      deepLink: deepLink,
    });
  }, [data, deepLink]);

  const [thirdParty, setThirdParty] = useState<IEventThirdParty>({
    isThirdPartySupported: false,
    connection: undefined,
    points: details.event?.pointInfoArr.map((data) => ({ ...data, amount: '0' })) ?? [],
    error: null,
  });
  const [claimStatusInfo, setClaimStatusInfo] = useState<ClaimStatusInformation | undefined>();

  const onThirdPartyConnectionConfirm = useCallback(
    async (appId: string, token: string | null) => {
      if (token) {
        if (appId) {
          const res = await connectThirdParty(appId, token);
          if (res && res.status === 'ok') {
            refreshThirdParty();
          }
        }
      }
    },
    [details]
  );
  // const onThirdPartyConnectionConfirm = async (appId: string, token: string | null) => {
  //   if (token) {
  //     const res = await connectThirdParty(appId, token);
  //     if (res && res.status === 'ok') {
  //       refreshThirdParty();
  //     }
  //   }
  // };

  // refresh State<Details>
  const refresh = async (clearDeepLink: boolean = false) => {
    try {
      const res = await repository.getEvent(id);
      setDetails({
        event: res,
        phase: getEventPhase(res),
        deepLink: clearDeepLink ? undefined : details.deepLink,
      });
    } catch (e) {
      console.error(e);
    }
  };

  // UseCase: useEarnEventDetails, State<Details>
  useEffect(() => {
    (async () => {
      if (!data && isNotBlank(id)) {
        await refresh();
      }
    })();
  }, [id, data]);

  // refresh State<ThirdParty>
  const refreshThirdParty = async () => {
    const { event, phase, deepLink } = details;
    if (!event) return;

    const thirdPartyApp = event.app;
    if (!thirdPartyApp) {
      setThirdParty({ ...thirdParty, isThirdPartySupported: false });
      return;
    }

    // result state machine
    const machine: IEventThirdParty = {
      ...thirdParty,
    };

    // UseCase: useThirdPartyConnection & useUserPoints
    const { appId, token, error } = parseThirdPartyConnectionArgs(thirdPartyApp.id, deepLink);
    try {
      const connection = await repository.checkThirdPartyConnection(appId, token);
      const connectionDeepLink = getThirdPartyConnectionDeepLink(event, thirdPartyApp.connectionDeepLink);

      machine.isThirdPartySupported = true;
      machine.connection = {
        appId,
        token,
        exists: connection.exists,
        displayName: connection.displayName,
        connectionDeepLink,
      };
      machine.points = event.pointInfoArr.map((data) => ({ ...data, amount: '0' }));

      // ThirdPartyConnection modal
      if (!connection.exists && !!token) {
        openModal(MODAL_TYPES.TEXT_MODAL, {
          title: format(t('connect_thirdparty_dialog_title'), thirdPartyApp.name),
          label: format(t('connect_thirdparty_dialog_description'), thirdPartyApp.name),
          confirmLabel: t('connect'),
          onConfirm: async () => await onThirdPartyConnectionConfirm(appId, token),
          cancelLabel: t('btn_cancel'),
          onCancel: () => {
            closeModal();
          },
        });
      }
    } catch (e) {
      console.error(e);
      setThirdParty({ ...thirdParty, error: e });
      return;
    }

    // UseCase: useUserPoints
    if (isPointInquiryAvailable(phase, machine.isThirdPartySupported)) {
      try {
        const res = await repository.getUserPoints(event.id);
        machine.points = res;
      } catch (e) {
        console.error(e);
        setThirdParty({
          ...thirdParty,
          points: event.pointInfoArr.map((data) => ({ ...data, amount: '0' })),
          error: e,
        });
        return;
      }
    }

    setThirdParty({
      ...machine,
    });
  };

  // State<ThirdParty>
  useEffect(() => {
    (async () => {
      await refreshThirdParty();
    })();
  }, [details]);

  // UseCase: useClaimStatusInformation, State<ClaimStatusInfo>
  useEffect(() => {
    (async () => {
      const { event, phase } = details;
      if (!event) return;

      const thirdPartyConnection = thirdParty.connection;
      if (phase === EventPhase.OnClaim) {
        // get an OnClaim phase event id.
        const claimStatus = await repository.getClaimStatus(event.id);
        const claimInfo = await repository.getClaimInformation(event.id);
        const fee = new Decimal(claimInfo.fee);

        // isTxFeeVisible: 'transaction fee' component is visible when the claimInfo.fee is greater then zero.
        setClaimStatusInfo({
          ...claimStatus,
          ...claimInfo,
          isTxFeeVisible: fee.toNumber() > 0,
          isEventActionButtonEnabled: isEventActionButtonEnabled(phase, thirdPartyConnection, claimInfo, thirdParty.isThirdPartySupported),
        });
      }
    })();
  }, [thirdParty]);

  return {
    details,
    thirdParty,
    claimStatusInfo,
    refresh,
  } as const;
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
    case '***REMOVED***:':
    case '***REMOVED***:':
      const url = Url.parse(connectionDeepLink ?? '', true);
      url.query.e = event.id;
      return assembleUrl(url.protocol, url.host, url.pathname, qs.stringify(url.query));
    default:
      return connectionDeepLink ?? null;
  }
}
