import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { SimpleResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/useDi';

/**
 * Disconnect third-party app to clutch
 */
export const useDisconnectThirdParty = () => {
  const repository: EarnEventRepository = useDi('EarnEventRepository');

  const disconnectThirdParty = async (appId: string | undefined): Promise<SimpleResponseDto | undefined> => {
    if (appId) {
      return await repository.disconnectThirdParty(appId);
    }
    return;
  };

  return {
    disconnectThirdParty,
  };
};
