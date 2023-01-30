import { useEffect, useState } from 'react';

import { formatFixed } from '@ethersproject/bignumber';
import { useIsFocused } from '@react-navigation/native';

import { getNetworkConfig } from '@@constants/network.constant';
import { IBalance } from '@@domain/wallet/services/WalletBlockChainService.type';
import { useDi } from '@@hooks/useDi';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { getAddress } from '@@utils/walletHelper';

import useBalanceQuery from './queries/useBalanceQuery';

const useOneTokenBalance = (tokenDto: TokenDto, disable?: boolean) => {
  const isFocused = useIsFocused();
  const ethService = useDi('WalletBlockChainService');
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  const [balance, setBalance] = useState<string>('-');
  const address = getAddress();
  const getBalance = async () => {
    try {
      const balance = await ethService.getOneBalanceFromNetwork(selectedWalletIndex[selectedNetwork], selectedNetwork, tokenDto);
      setBalance(balance);
    } catch (e) {
      console.log('Data fetch from blockchain is fail -> Fetch from Server', e);
      refetch();
    }
  };

  const { refetch } = useBalanceQuery(address, getNetworkConfig(selectedNetwork).networkId, {
    enabled: false,
    keepPreviousData: true,
    select: (data) => {
      let newData: IBalance = {};
      const targetTokenAmount = data.filter((token) => token.asset.ticker === tokenDto.symbol)[0]?.amount || '0';
      newData = { balance: formatFixed(targetTokenAmount, tokenDto.decimals) };
      return newData;
    },
    onSuccess: (data) => {
      setBalance(data.balance);
    },
  });

  useEffect(() => {
    if (!isFocused || disable) return;
    getBalance();
  }, [tokenDto, selectedNetwork, selectedWalletIndex, isFocused]);

  return { balance, getBalance };
};
export default useOneTokenBalance;
