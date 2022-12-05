import { useState, useEffect, useMemo } from 'react';

import { useRoute } from '@react-navigation/native';

import { getNetworkConfig } from '@@constants/network.constant';
import { TRANSACTION_HISTORY_FILTER_CRITERIA } from '@@constants/transaction.constant';
import useTransactionHitoryQuery from '@@hooks/queries/useTransactionHistoryQuery';
import { useDi } from '@@hooks/useDi';
import { TTokenDetailRouteProps } from '@@screens/WalletScreen/WalletTokenDetail/WalletTokenDetail.type';
import transactionHistoryStore from '@@store/transaction/transactionHistoryStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import useTransactionHistoryFilter from './useTransactionHistoryFilter';

import 'reflect-metadata';

const useTransactionHistoryList = () => {
  const { params } = useRoute<TTokenDetailRouteProps>();
  const walletService = useDi('WalletService');
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);

  const { tokens, setHistory } = transactionHistoryStore();
  const { currentCriteria, filterCriteria } = useTransactionHistoryFilter();

  const [myaddress, setMyAddress] = useState('');
  const setWallet = async () => {
    const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], bip44: network.bip44 });
    setMyAddress(wallet.address);
  };
  useEffect(() => {
    setWallet();
  }, []);

  const filteredData = useMemo(() => {
    if (!tokens[params.tokenDto.symbol] || !myaddress) return;
    switch (currentCriteria) {
      case TRANSACTION_HISTORY_FILTER_CRITERIA.ALL:
        return tokens[params.tokenDto.symbol]?.history;
      case TRANSACTION_HISTORY_FILTER_CRITERIA.SENT_ONLY:
        return tokens[params.tokenDto.symbol]?.history.filter((v, i) => v.from === myaddress);
      case TRANSACTION_HISTORY_FILTER_CRITERIA.RECEIVED_ONLY:
        return tokens[params.tokenDto.symbol]?.history.filter((v, i) => v.to === myaddress);
      default:
        return tokens[params.tokenDto.symbol]?.history;
    }
    //TODO: deps고민 해보기
  }, [currentCriteria, tokens[params.tokenDto.symbol]?.history.length, myaddress]);

  const { refetch } = useTransactionHitoryQuery(
    {
      network: selectedNetwork,
      address: myaddress,
      ticker: params.tokenDto.symbol,
      beforeblock: tokens[params.tokenDto.symbol]?.beforeblock ?? 2147483647,
      beforeindex: tokens[params.tokenDto.symbol]?.beforeindex ?? 2147483647,
      limit: 20,
    },
    {
      onSuccess: (list) => {
        if (list) {
          setHistory(params.tokenDto.symbol, list, list[list.length - 1].blockNumber, list[list.length - 1].index);
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
