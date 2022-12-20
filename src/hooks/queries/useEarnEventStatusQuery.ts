import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { EarnEventClaimCheckResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/useDi';

export default function useEarnEventStatusQuery(
  eventId: string,
  options: UseQueryOptions<EarnEventClaimCheckResponseDto, unknown, EarnEventClaimCheckResponseDto> = {}
) {
  const earnEventRepository = useDi('EarnEventRepository');
  return useQuery<EarnEventClaimCheckResponseDto, unknown, EarnEventClaimCheckResponseDto>(
    createKey(eventId),
    () => earnEventRepository.getClaimStatus(eventId),
    options
  );
}

const createKey = (eventId: string) => ['earnEventStatus', eventId];
useEarnEventStatusQuery.createKey = createKey;
