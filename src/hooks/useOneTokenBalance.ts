import { useEffect, useState } from 'react';

import { getNetworkByBase } from '@@constants/network.constant';
import { WALLET_TOKEN } from '@@constants/token.constant';
import { useDi } from '@@hooks/useDi';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useOneTokenBalance = (tokenDto: TokenDto) => {
  const ethService = useDi('WalletBlockChainService');
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  const [balance, setBalance] = useState<string>('-');

  const getBalance = async () => {
    try {
      const balance = await ethService.getOneBalanceFromNetwork(selectedWalletIndex[selectedNetwork], selectedNetwork, tokenDto);
      setBalance(balance);
    } catch (e) {
      console.log('Data fetch from blockchain is fail -> Fetch from Server', e);
    }
  };

  useEffect(() => {
    getBalance();
  }, [tokenDto]);

  return { balance };
};
export default useOneTokenBalance;
