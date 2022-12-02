import { useEffect, useState } from 'react';

import { WALLET_TOKEN } from '@@constants/token.constant';
import { useDi } from '@@hooks/useDi';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useOneTokenBalance = (symbol: keyof typeof WALLET_TOKEN) => {
  const ethService = useDi('WalletBlockChainService');
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  const [balance, setBalance] = useState<string>('-');

  const getBalance = async () => {
    try {
      const balance = await ethService.getOneBalanceFromNetwork(selectedWalletIndex, selectedNetwork, symbol);
      setBalance(balance);
    } catch (e) {
      console.log('Data fetch from blockchain is fail -> Fetch from Server');
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return { balance };
};
export default useOneTokenBalance;
