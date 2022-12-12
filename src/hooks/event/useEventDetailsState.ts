import { useEffect, useState } from 'react';

import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { InvalidThirdPartyDeepLinkConnectionError } from '@@domain/error/InvalidThirdPartyConnectionRequestError';
import { EarnEvent } from '@@domain/model/EarnEvent';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { ThirdPartyDeepLink } from '@@domain/model/ThirdPartyDeepLink';
import { ThirdPartyConnectCheckResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/useDi';
import { ThirdPartyApp } from '@@screens/EarnEventScreen/ThirdPartyApp';
import { isNotBlank, format } from '@@utils/strings';

/**
 * UiState for EarnEventDetailsScreen
 */
export interface IEventDetailsUiState {
  isThirdPartySupported: boolean;
  thirdPartyConnection?: IThirdPartyConnection;
  error: Error | unknown;
}

export interface IThirdPartyConnection {
  appId: string;
  token: string | null;
  exists: boolean;
  displayName: string | null;
}

/**
 * Combination of following usecases
 *
 * UseCases
 *  • useThirdPartyConnection (CheckThirdPartyConnection)
 *  • useCurrentParticipants
 *  • useClaimInfomation (GetClaimInfomation)
 *  • useClaimStatus
 */
export const useEarnEventDetailsState = (event: EarnEvent, deepLink?: ThirdPartyDeepLink): IEventDetailsUiState => {
  const repository: EarnEventRepository = useDi('EarnEventRepository');
  const { t } = useTranslation();

  const [uiState, setUiState] = useState<IEventDetailsUiState>({
    isThirdPartySupported: false,
    thirdPartyConnection: undefined,
    error: null,
  });

  // UseCase: useThirdPartyConnection
  useEffect(() => {
    (async () => {
      const thirdPartyApp = event.app;
      if (thirdPartyApp) {
        const { appId, token, error } = parseThirdPartyConnectionArgs(thirdPartyApp.id, deepLink);

        try {
          const thirdPartyConnection = await repository.checkThirdPartyConnection(appId, token);
          setUiState({
            isThirdPartySupported: true,
            thirdPartyConnection: {
              appId,
              token,
              exists: thirdPartyConnection.exists,
              displayName: thirdPartyConnection.displayName,
            },
            error: null,
          });
        } catch (e) {
          console.error(e);
          setUiState({ ...uiState, error: e });
        }
      } else {
        setUiState({ ...uiState, isThirdPartySupported: false });
      }
    })();
  }, [event, deepLink]);

  return uiState;
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
    appId: appId,
    token: token,
    error: useCaseError,
  };
}
