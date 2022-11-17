import { useState } from 'react';

import { WalletDto } from '@@domain/model/WalletDto';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import useBalanceQuery from './queries/useBalanceQuery';
import useWalletsQuery from './queries/useWalletsQuery';

export const useTokenBalanceList = () => {
  // @TODO 데이터 연결
  const [walletData, setWalletData] = useState<WalletDto[]>([]);
  useWalletsQuery({
    onSuccess: (data) => {
      setWalletData(data);
    },
  });
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();

  const { data: balanceData } = useBalanceQuery(walletData[selectedWalletIndex]?.address, selectedNetwork, {
    enabled: walletData.length !== 0,
    keepPreviousData: true,
  });

  return { balanceData };
};
