import { useEffect, useState } from 'react';

import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Decimal from 'decimal.js';
import { useTranslation } from 'react-i18next';

import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { InvalidThirdPartyDeepLinkConnectionError } from '@@domain/error/InvalidThirdPartyConnectionRequestError';
import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEvent } from '@@domain/model/EarnEvent';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase, getEventPhase } from '@@domain/model/EventPhase';
import { ThirdPartyDeepLink } from '@@domain/model/ThirdPartyDeepLink';
import { ThirdPartyConnectCheckResponseDto, EarnEventCurrentResponseDto, EarnEventGetClaimResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/useDi';
import { ThirdPartyApp } from '@@screens/EarnEventScreen/ThirdPartyApp';
import { isNotBlank, format } from '@@utils/strings';
import { valueOf } from '@@utils/types';

/**
 * UiState for EarnEventDetailsScreen
 */
export interface IEventThirdParty {
  isThirdPartySupported: boolean;
  thirdPartyConnection?: IThirdPartyConnection;
  points: IEventPointAmount[];
  error: Error | unknown;
}

export interface IThirdPartyConnection {
  appId: string;
  token: string | null;
  exists: boolean;
  displayName: string | null;
}

export interface IEventPointAmount {
  amount: string;
  key: string;
  title: string;
  currency: string;
}

/**
 * Combination of following usecases
 *
 * UseCases
 *  • useThirdPartyConnection
 *  • useUserPoints
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
export const useEarnEventDetailsState = (
  event: EarnEvent,
  deepLink?: ThirdPartyDeepLink
): {
  phase: valueOf<typeof EventPhase>;
  thirdParty: IEventThirdParty;
  claimStatusInfo: ClaimStatusInformation | undefined;
} => {
  const repository: EarnEventRepository = useDi('EarnEventRepository');

  const [phase, setPhase] = useState<valueOf<typeof EventPhase>>(EventPhase.NotAvailable);

  const [thirdParty, setThirdParty] = useState<IEventThirdParty>({
    isThirdPartySupported: false,
    thirdPartyConnection: undefined,
    points: event.pointInfoArr.map((data) => ({ ...data, amount: '0' })),
    error: null,
  });

  const [claimStatusInfo, setClaimStatusInfo] = useState<ClaimStatusInformation | undefined>();

  // UseCase: useThirdPartyConnection
  useEffect(() => {
    (async () => {
      setPhase(getEventPhase(event));

      const thirdPartyApp = event.app;

      if (thirdPartyApp) {
        const { appId, token, error } = parseThirdPartyConnectionArgs(thirdPartyApp.id, deepLink);

        try {
          const thirdPartyConnection = await repository.checkThirdPartyConnection(appId, token);

          setThirdParty({
            isThirdPartySupported: true,
            thirdPartyConnection: {
              appId,
              token,
              exists: thirdPartyConnection.exists,
              displayName: thirdPartyConnection.displayName,
            },
            points: event.pointInfoArr.map((data) => ({ ...data, amount: '0' })),
            error: null,
          });
        } catch (e) {
          console.error(e);
          setThirdParty({ ...thirdParty, error: e });
        }
      } else {
        setThirdParty({ ...thirdParty, isThirdPartySupported: false });
      }
    })();
  }, [event, deepLink]);

  // UseCase: useUserPoints
  useEffect(() => {
    (async () => {
      if (thirdParty.thirdPartyConnection && isPointInquiryAvailable(event, thirdParty.isThirdPartySupported)) {
        try {
          const res = await repository.getUserPoints(event.id);
          setThirdParty({ ...thirdParty, points: res });
        } catch (e) {
          console.error(e);
          setThirdParty({
            ...thirdParty,
            points: event.pointInfoArr.map((data) => ({ ...data, amount: '0' })),
            error: e,
          });
        }
      }
    })();
  }, [thirdParty]);

  // UseCase: useClaimStatusInformation
  useEffect(() => {
    (async () => {
      const phase = getEventPhase(event);

      const thirdPartyConnection = thirdParty.thirdPartyConnection;
      if (phase === EventPhase.OnClaim) {
        // get an OnClaim phase event id.
        console.log(`Events> claim status starts`);
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
    phase,
    thirdParty,
    claimStatusInfo,
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
function isPointInquiryAvailable(event: EarnEvent, isThirdPartySupported: boolean): boolean {
  const phase = getEventPhase(event);
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
