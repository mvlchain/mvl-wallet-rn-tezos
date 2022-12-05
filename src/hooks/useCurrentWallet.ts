import { NETWORK } from '@@constants/network.constant';
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
    if (selectedNetwork === NETWORK.ETH || selectedNetwork === NETWORK.BSC) {
      // ether와 bsc가 /v1/wallets   시에 함께 생성된다.
      create(NETWORK.ETH);
      create(NETWORK.BSC);
    } else {
      create(selectedNetwork);
    }
  };

  return { walletData: data ?? [], createWallet };
};
