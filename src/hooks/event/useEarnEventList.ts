import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { useDi } from '@@hooks/common/useDi';

/**
 * UseCase: GetEarnEventUseCase
 *
 * @returns a list of ear-events
 */
export const useEarnEventList = (): UseQueryResult<EarnEventDto[], AxiosError> => {
  const repository = useDi('EarnEventRepository');
  return useQuery({
    queryKey: ['earn-events'],
    queryFn: repository.getEvents,
  });
};
