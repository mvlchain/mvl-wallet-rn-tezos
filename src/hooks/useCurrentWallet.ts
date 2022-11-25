import { BlockChain } from '@@domain/blockchain/BlockChain';
import useWalletMutation from '@@hooks/queries/useWalletMutation';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import authStore from '@@store/auth/authStore';

/**
 * UseCase: get current selected wallet from local storage
 */
export const useCurrentWallet = () => {
  const { pKey } = authStore();
  const { mutate } = useWalletMutation();
  const { data } = useWalletsQuery();
  const createWallet = async (blockchain: BlockChain) => {
    if (!pKey || !data) return;
    mutate({ pKey: pKey ?? 'TODO: ERROR', index: data.length, blockchain: blockchain });
  };

  return { walletData: data ?? [], createWallet };
};
