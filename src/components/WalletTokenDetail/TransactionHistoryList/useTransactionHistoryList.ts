import { useState, useEffect, useMemo } from 'react';

import { useRoute } from '@react-navigation/native';

import { getNetworkConfig, getNetworkByBase } from '@@constants/network.constant';
import { TRANSACTION_HISTORY_FILTER_CRITERIA } from '@@constants/transaction.constant';
import { IGetTransactionHistoryResponse, TTransactionStatus } from '@@domain/transaction/TransactionService.type';
import useTransactionHistoryQuery from '@@hooks/queries/useTransactionHistoryQuery';
import { useDi } from '@@hooks/useDi';
import { TTokenDetailRouteProps } from '@@screens/WalletScreen/WalletTokenDetail/WalletTokenDetail.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import useTransactionHistoryFilter from './useTransactionHistoryFilter';

const useTransactionHistoryList = () => {
  const { params } = useRoute<TTokenDetailRouteProps>();
  const walletService = useDi('WalletService');
  const { selectedNetwork: pickNetwork, selectedWalletIndex } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);
  const network = getNetworkConfig(selectedNetwork);
  const [history, setHistory] = useState<IGetTransactionHistoryResponse[]>([]);
  const [beforeblock, setBeforeBlock] = useState(2147483647);
  const [beforeindex, setBeforeIndex] = useState(2147483647);
  const { currentCriteria, filterCriteria } = useTransactionHistoryFilter();

  const [myAddress, setMyAddress] = useState<string | null>(null);
  const setWallet = async () => {
    const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], network: selectedNetwork });
    setMyAddress(wallet.address);
  };
  useEffect(() => {
    setWallet();
  }, []);

  const filteredData = useMemo(() => {
    if (!history || !myAddress) return;
    switch (currentCriteria) {
      case TRANSACTION_HISTORY_FILTER_CRITERIA.SENT_ONLY:
        return history.filter((v, i) => v.from === myAddress);
      case TRANSACTION_HISTORY_FILTER_CRITERIA.RECEIVED_ONLY:
        return history.filter((v, i) => v.to === myAddress);
      default:
        return history;
    }
  }, [currentCriteria, history.length, myAddress]);

  const { refetch } = useTransactionHistoryQuery(
    {
      network: network.networkId,
      address: myAddress,
      ticker: params.tokenDto.symbol,
      beforeblock,
      beforeindex,
      limit: 20,
    },
    {
      onSuccess: (list) => {
        if (list.length > 0) {
          setHistory([...history, ...list]);
          setBeforeBlock(list[list.length - 1].blockNumber);
          setBeforeIndex(list[list.length - 1].index);
          const pendingHistory = list.filter((history) => history.status === TTransactionStatus.SUCCESS);
          const hashBulk = pendingHistory.map((history) => history.hash).join(',');
          console.log('hashBulk', hashBulk);
        }
      },
      keepPreviousData: true,
      enabled: !!myAddress,
    }
  );

  const getHistory = () => {
    refetch();
  };

  return {
    filteredData,
    getHistory,
    filterCriteria,
  };
};

export default useTransactionHistoryList;
