import { useState } from 'react';

import { WalletDto } from '@@domain/model/WalletDto';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { useDi } from './common/useDi';
import useBalanceQuery from './queries/useBalanceQuery';
import useWalletsQuery from './queries/useWalletsQuery';

export const useTokenBalanceList = () => {
  // @TODO 데이터 연결
  const keyClient = useDi('KeyClient');
  const postboxkey = keyClient.postboxKeyHolder?.postboxKey ?? '';
  const [walletData, setWalletData] = useState<WalletDto[]>([]);
  useWalletsQuery({
    onSuccess: (data) => {
      setWalletData(data);
    },
  });
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();

  const { data: balanceData } = useBalanceQuery(walletData[selectedWalletIndex[postboxkey]]?.address, selectedNetwork[postboxkey], {
    enabled: walletData.length !== 0,
    keepPreviousData: true,
  });

  return { balanceData };
};
