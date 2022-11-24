import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { EarnEventDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/common/useDi';

/**
 * UseCase: GetEarnEventUseCase
 *
 * @returns a list of ear-events
 */
export const useEarEventList = (): UseQueryResult<EarnEventDto[], AxiosError> => {
  const repository = useDi('EarnEventRepository');
  return useQuery({
    queryKey: ['earn-events'],
    queryFn: repository.getEvents,
  });
};
