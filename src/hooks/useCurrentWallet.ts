import { getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import useWalletMutation from '@@hooks/queries/useWalletMutation';
import useWalletsQuery from '@@hooks/queries/useWalletsQuery';
import walletPersistStore from '@@store/wallet/walletPersistStore';

/**
 * UseCase: get current selected wallet from local storage
 */
export const useCurrentWallet = () => {
  const { mutate } = useWalletMutation();
  const { data } = useWalletsQuery();
  const { createWallet: create, selectedNetwork } = walletPersistStore();
  const createWallet = async () => {
    if (!data) return;
    mutate({ index: data.length, bip44: getNetworkConfig(getNetworkName(false, selectedNetwork)).bip44, network: selectedNetwork });
    create();
  };

  return { walletData: data ?? [], createWallet };
};
