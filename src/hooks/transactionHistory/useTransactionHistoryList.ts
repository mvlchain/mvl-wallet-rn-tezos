import { useState, useEffect, useMemo } from 'react';

import {
  TTranscationType,
  ITransactionHistoryListItemProps,
} from '@@components/WalletTokenDetail/TransactionHistoryItem/TransactionHistoryListItem.type';
import { TRANSACTION_HISTORY_FILTER_CRITERIA, TRANSACTION_STATUS, TRANSACTION_TYPE } from '@@constants/transaction.constant';

import useTransactionHistoryFilter from './useTransactionHistoryFilter';

const useTransactionHistoryList = () => {
  //TODO: 나중에 데이터 붙여야함 스토어랑ㅇㅇㅇㅇㅇㅇㅇㅇ t함수동!
  const LIMIT = 5;
  const [data, setData] = useState<ITransactionHistoryListItemProps[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const { currentCriteria, filterCriterias } = useTransactionHistoryFilter();

  const filteredData = useMemo(() => {
    let type: TTranscationType;
    switch (currentCriteria) {
      case TRANSACTION_HISTORY_FILTER_CRITERIA.ALL:
        return data;
      case TRANSACTION_HISTORY_FILTER_CRITERIA.SENT_ONLY:
        type = TRANSACTION_TYPE.SEND;
        break;
      case TRANSACTION_HISTORY_FILTER_CRITERIA.RECEIVED_ONLY:
        type = TRANSACTION_TYPE.RECEIVE;
        break;
      default:
        return data;
    }
    return data.filter((v, i) => v.type === type);
  }, [currentCriteria, data]);

  const getData = () => {
    setLoading(true);
    setData([...data, ...mockData.transactionHistory]);
    setOffset(offset + 5);
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
    filterCriterias,
  };
};

export default useTransactionHistoryList;

const mockData = {
  symbol: 'MVL',
  base: 'USD',
  transactionHistory: [
    {
      type: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.CONFIRMED,
      amount: 1000,
      baseCurrencyAmount: 0.5,
      baseCurrencySymbol: 'USD',
      txHash: 'sdgsgsdgdahgjagdsfsdfsfdfsfsfsdfsdfsdfsfsfsfsfsfsfsfdsfsfsdsk',
      date: '21.10.31 10:30',
    },
    {
      type: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.CONFIRMED,
      amount: 1000,
      baseCurrencyAmount: 0.5,
      baseCurrencySymbol: 'USD',
      txHash: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      type: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.CANCELED,
      amount: 1000,
      baseCurrencyAmount: 0.5,
      baseCurrencySymbol: 'USD',
      txHash: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      type: TRANSACTION_TYPE.RECEIVE,
      status: TRANSACTION_STATUS.CONFIRMED,
      amount: 1000,
      baseCurrencyAmount: 0.5,
      baseCurrencySymbol: 'USD',
      txHash: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      type: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.PENDING,
      amount: 1000,
      baseCurrencyAmount: 0.5,
      baseCurrencySymbol: 'USD',
      txHash: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
  ],
};
