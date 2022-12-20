import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

import { IEarnEventMutation } from '@@domain/auth/repositories/EarnEventRepository.type';
import { SimpleResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/useDi';

export default function useEarnEventMutation(
  options: UseMutationOptions<SimpleResponseDto, unknown, IEarnEventMutation> = {}
): UseMutationResult<SimpleResponseDto, unknown, IEarnEventMutation, unknown> {
  const earnEventRepository = useDi('EarnEventRepository');
  return useMutation<SimpleResponseDto, unknown, IEarnEventMutation>(earnEventRepository.requestClaim, options);
}
