import { BlockChain } from '@@domain/blockchain/BlockChain';
import useWalletMutation from '@@hooks/queries/useWalletMutation';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import authStore from '@@store/auth/authStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

/**
 * UseCase: get current selected wallet from local storage
 */
export const useCurrentWallet = () => {
  const { mutate } = useWalletMutation();
  const { data } = useWalletsQuery();
  const { createWallet: create } = walletPersistStore();
  const createWallet = async (blockchain: BlockChain) => {
    if (!data) return;
    mutate({ index: data.length, blockchain: blockchain });
    create();
  };

  return { walletData: data ?? [], createWallet };
};
