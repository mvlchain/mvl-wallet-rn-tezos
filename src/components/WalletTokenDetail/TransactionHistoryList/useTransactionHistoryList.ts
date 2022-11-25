import { useState, useEffect, useMemo } from 'react';

import { TRANSACTION_HISTORY_FILTER_CRITERIA } from '@@constants/transaction.constant';
import { useDi } from '@@hooks/useDi';
import transactionHistoryStore from '@@store/transaction/transactionHistoryStore';

import useTransactionHistoryFilter from './useTransactionHistoryFilter';

import 'reflect-metadata';

const useTransactionHistoryList = () => {
  //TDOO: mock => real
  const myPublicAddress = '0x09Fc9e92261113C227c0eC6F1B20631AA7b2789d';
  const token = 'ETH';
  const network = 'ETHEREUM';

  const ethersTransactionService = useDi('EtherTransactionService');
  const tezosTransactionService = useDi('TezosTransactionService');

  const [loading, setLoading] = useState(false);
  const { tokens, setHistory } = transactionHistoryStore();
  const { currentCriteria, filterCriteria } = useTransactionHistoryFilter();

  const filteredData = useMemo(() => {
    if (!tokens[token]) return;
    switch (currentCriteria) {
      case TRANSACTION_HISTORY_FILTER_CRITERIA.ALL:
        return tokens[token].history;
      case TRANSACTION_HISTORY_FILTER_CRITERIA.SENT_ONLY:
        return tokens[token].history.filter((v, i) => v.from === myPublicAddress);
      case TRANSACTION_HISTORY_FILTER_CRITERIA.RECEIVED_ONLY:
        return tokens[token].history.filter((v, i) => v.to === myPublicAddress);
      default:
        return tokens[token].history;
    }
    //TODO: deps고민 해보기
  }, [currentCriteria, tokens[token]?.history.length]);

  const getData = async () => {
    setLoading(true);
    const params = {
      network,
      address: myPublicAddress,
      ticker: token,
      beforeblock: tokens[token]?.beforeblock ?? 2147483647,
      beforeindex: tokens[token]?.beforeindex ?? 2147483647,
      limit: 20,
    };
    //TODO: 나중에 고칠 부분
    //@ts-ignore
    const transactionService = network === 'TEZOS' ? tezosTransactionService : ethersTransactionService;
    const history = await transactionService.getHistory(params);
    if (!history) {
      setLoading(false);
      return;
    }
    const lastIdx = history.length - 1;
    setHistory(token, history, history[lastIdx].blockNumber, history[lastIdx].index);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onEndReached = () => {
    if (loading) {
      return;
    } else {
      getData();
    }
  };

  return {
    filteredData,
    onEndReached,
    filterCriteria,
  };
};

export default useTransactionHistoryList;
