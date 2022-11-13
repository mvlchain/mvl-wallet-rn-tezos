import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { ICreateWalletBody } from '@@domain/wallet/WalletService.type';
import { WalletResponseDto } from '@@generated/generated-scheme';
import { useDi } from '@@hooks/common/useDi';

export default function useWalletMutation(): UseMutationResult<WalletResponseDto, unknown, ICreateWalletBody, unknown> {
  const queryClient = useQueryClient();
  const walletService = useDi('WalletService');
  return useMutation<WalletResponseDto, unknown, ICreateWalletBody>(walletService.createWallet, {
    onSuccess: () => queryClient.invalidateQueries(['wallets']),
  });
}
