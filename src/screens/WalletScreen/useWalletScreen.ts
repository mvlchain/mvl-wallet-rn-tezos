import { useDi } from '@@hooks/common/useDi';
import { useCurrentWallet } from '@@hooks/wallet/useCurrentWallet';

const useWalletScreen = () => {
  const walletService = useDi('WalletService');
  useCurrentWallet(walletService);
};

export default useWalletScreen;
