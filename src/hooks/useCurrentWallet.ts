import useWalletMutation from '@@hooks/queries/useWalletMutation';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import walletPersistStore from '@@store/wallet/walletPersistStore';

/**
 * UseCase: get current selected wallet from local storage
 */
export const useCurrentWallet = () => {
  const { createWallet: create, selectedNetwork } = walletPersistStore();
  const { mutate } = useWalletMutation();
  const { data } = useWalletsQuery(selectedNetwork);
  const createWallet = async () => {
    if (!data) return;
    mutate({ index: data.length, network: selectedNetwork });
    create();
  };

  return { walletData: data ?? [], createWallet };
};
