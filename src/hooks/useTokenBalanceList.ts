import { useEffect, useState } from 'react';

import { IS_PRODUCT } from '@env';

import { getToken } from '@@constants/contract/contract.constant';
import { BlockChainList } from '@@domain/blockchain/BlockChain';
import { WalletDto } from '@@domain/model/WalletDto';
import authStore from '@@store/auth/authStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { useDi } from './common/useDi';
import useBalanceQuery from './queries/useBalanceQuery';
import useWalletsQuery from './queries/useWalletsQuery';

export const useTokenBalanceList = () => {
  // @TODO 데이터 연결
  const etherContract = useDi('EthersContractRepository');
  const wallet = useDi('WalletService');
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  const { pKey } = authStore();
  const [walletData, setWalletData] = useState<WalletDto[]>([]);
  const [balanceData, setBalanceData] = useState([]);
  useWalletsQuery({
    onSuccess: (data) => {
      setWalletData(data);
    },
  });

  const { data } = useBalanceQuery(walletData[selectedWalletIndex]?.address, selectedNetwork, {
    enabled: walletData.length !== 0,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (walletData.length === 0 || !pKey) return;
    const walletPkey = wallet.getWalletPKey({ pKey, index: selectedWalletIndex, blockchain: BlockChainList[selectedNetwork] });
    if (selectedNetwork === 'ETHEREUM') {
      // TODO: network에 따라 balance조회
      // simple price로 시세 조회
      // etherContract.getBalance({ selectedWalletPrivateKey: walletPkey, rpcUrl: getToken(IS_PRODUCT === 'TRUE', ) });
    }
  }, [selectedNetwork, walletData]);

  return { balanceData: data };
};
