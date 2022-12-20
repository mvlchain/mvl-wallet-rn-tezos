import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { SimpleResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/useDi';

/**
 * Connect third-party app to clutch
 */
export const useConnectThirdParty = () => {
  const repository: EarnEventRepository = useDi('EarnEventRepository');
  const connectThirdParty = async (appId: string, token: string | null): Promise<SimpleResponseDto | undefined> => {
    if (appId) {
      return await repository.connectThirdParty(appId, token);
    }
    return;
  };

  return {
    connectThirdParty,
  };
};
