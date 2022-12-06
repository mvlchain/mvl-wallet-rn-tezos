import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { NetworkId } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';

export default function useTokenQuery(network: NetworkId, options: UseQueryOptions<TokenDto[], unknown, TokenDto[]> = {}) {
  const TokenRepository = useDi('TokenRepository');
  return useQuery<TokenDto[], unknown, TokenDto[]>(createKey(network), () => TokenRepository.getToken(network), options);
}

const createKey = (network: NetworkId) => ['token', network];
useTokenQuery.createKey = createKey;
