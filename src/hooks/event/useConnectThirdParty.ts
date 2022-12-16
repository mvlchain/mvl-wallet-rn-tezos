import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { useDi } from '@@hooks/useDi';

/**
 * Connect third-party app to clutch
 */
export const useConnectThirdParty = (appId: string, token: string | null): UseQueryResult<string, AxiosError> => {
  const repository: EarnEventRepository = useDi('EarnEventRepository');
  return useQuery({
    queryKey: ['third-party-connect', appId, token],
    queryFn: () => repository.connectThirdParty(appId, token),
  });
};
