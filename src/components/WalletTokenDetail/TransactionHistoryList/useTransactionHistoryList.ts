import { useState, useEffect, useMemo } from 'react';

import { useRoute } from '@react-navigation/native';

import { getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { TRANSACTION_HISTORY_FILTER_CRITERIA } from '@@constants/transaction.constant';
import { IGetTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';
import useTransactionHitoryQuery from '@@hooks/queries/useTransactionHistoryQuery';
import { useDi } from '@@hooks/useDi';
import { TTokenDetailRouteProps } from '@@screens/WalletScreen/WalletTokenDetail/WalletTokenDetail.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import useTransactionHistoryFilter from './useTransactionHistoryFilter';

const useTransactionHistoryList = () => {
  const { params } = useRoute<TTokenDetailRouteProps>();
  const walletService = useDi('WalletService');
  const { selectedNetwork: pickNetwork, selectedWalletIndex } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const network = getNetworkConfig(selectedNetwork);
  const [history, setHistory] = useState<IGetTransactionHistoryResponse[]>([]);
  const [beforeblock, setBeforeBlock] = useState(2147483647);
  const [beforeindex, setBeforeIndex] = useState(2147483647);
  const { currentCriteria, filterCriteria } = useTransactionHistoryFilter();

  const [myaddress, setMyAddress] = useState('');
  const setWallet = async () => {
    const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], network: selectedNetwork });
    setMyAddress(wallet.address);
  };
  useEffect(() => {
    setWallet();
  }, []);

  const filteredData = useMemo(() => {
    if (!history || !myaddress) return;
    switch (currentCriteria) {
      case TRANSACTION_HISTORY_FILTER_CRITERIA.SENT_ONLY:
        return history.filter((v, i) => v.from === myaddress);
      case TRANSACTION_HISTORY_FILTER_CRITERIA.RECEIVED_ONLY:
        return history.filter((v, i) => v.to === myaddress);
      default:
        return history;
    }
  }, [currentCriteria, history.length, myaddress]);

  const { refetch } = useTransactionHitoryQuery(
    {
      network: pickNetwork,
      address: myaddress,
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
        }
      },
      keepPreviousData: true,
    }
  );

  const onEndReached = () => {
    refetch();
  };

  return {
    filteredData,
    onEndReached,
    filterCriteria,
  };
};

export default useTransactionHistoryList;
