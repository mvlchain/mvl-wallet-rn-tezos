import { useState, useEffect, useMemo } from 'react';

import { TRANSACTION_HISTORY_FILTER_CRITERIA, TRANSACTION_STATUS, TRANSACTION_TYPE } from '@@constants/transaction.constant';
import { IFetchTransactionHistoryResponse, TTransactionType } from '@@domain/transaction/TransactionService.type';
import { useDi } from '@@hooks/common/useDi';
import transactionStore from '@@store/transaction/transactionStore';

import useTransactionHistoryFilter from './useTransactionHistoryFilter';

const useTransactionHistoryList = () => {
  const transactionService = useDi('TransactionService');
  //TODO: 나중에 데이터 붙여야함 스토어랑ㅇㅇㅇㅇㅇㅇㅇㅇ t함수동!

  const [loading, setLoading] = useState(false);
  const transactionStore = transactionStore();
  const { currentCriteria, filterCriteria } = useTransactionHistoryFilter();
  const myPublicAddress = '0x09Fc9e92261113C227c0eC6F1B20631AA7b2789d';
  const token = 'ETH';

  const filteredData = useMemo(() => {
    switch (currentCriteria) {
      case TRANSACTION_HISTORY_FILTER_CRITERIA.ALL:
        return transactionStore[token].history;
      case TRANSACTION_HISTORY_FILTER_CRITERIA.SENT_ONLY:
        return transactionStore[token].history.filter((v, i) => v.from === myPublicAddress);
      case TRANSACTION_HISTORY_FILTER_CRITERIA.RECEIVED_ONLY:
        return transactionStore[token].history.filter((v, i) => v.to === myPublicAddress);
      default:
        return transactionStore[token].history;
    }
  }, [currentCriteria, transactionStore[token].history]);

  const getData = async () => {
    setLoading(true);
    const params = {
      network: 'ETHEREUM',
      address: myPublicAddress,
      ticker: 'ETH',
      beforeblock: transactionStore[token].beforeblock ?? 2147483647,
      beforeindex: transactionStore[token].beforeindex ?? 2147483647,
      limit: 20,
    };
    const history = await transactionService.getHistory(params);
    if (!history) {
      setLoading(false);
      return;
    }
    const lastIdx = history.length - 1;
    transactionStore.setHistory(token, history, history[lastIdx].blockNumber, history[lastIdx].index);
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
