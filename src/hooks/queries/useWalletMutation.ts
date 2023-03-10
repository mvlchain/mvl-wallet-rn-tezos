import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { ICreateWalletBody } from '@@domain/wallet/services/WalletService.type';
import { WalletResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/useDi';

export default function useWalletMutation(): UseMutationResult<WalletResponseDto, unknown, ICreateWalletBody, unknown> {
  const queryClient = useQueryClient();
  const walletService = useDi('WalletService');
  return useMutation<WalletResponseDto, unknown, ICreateWalletBody>(walletService.createWallet, {
    onSuccess: () => queryClient.invalidateQueries(['wallets']),
  });
}
