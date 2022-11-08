import React, { useEffect, useState } from 'react';

import { FlatList } from 'react-native';

import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@@constants/transaction.constant';

import TransactionHistoryListItem from '../TransactionHistoryItem';
import { ITransactionHistoryListItemProps } from '../TransactionHistoryItem/TransactionHistoryListItem.type';

function TransactionHistoryList() {
  const LIMIT = 5;
  const [data, setData] = useState<ITransactionHistoryListItemProps[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

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

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TransactionHistoryListItem
          type={item.type}
          status={item.status}
          amount={item.amount}
          baseCurrencyAmount={item.baseCurrencyAmount}
          baseCurrencySymbol={item.baseCurrencySymbol}
          address={item.address}
          date={item.date}
        />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
    />
  );
}

export default TransactionHistoryList;

//TODO: 데이터타입 확정 후 수정 필요
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
      address: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      type: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.CONFIRMED,
      amount: 1000,
      baseCurrencyAmount: 0.5,
      baseCurrencySymbol: 'USD',
      address: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      type: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.CANCELED,
      amount: 1000,
      baseCurrencyAmount: 0.5,
      baseCurrencySymbol: 'USD',
      address: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      type: TRANSACTION_TYPE.RECEIVE,
      status: TRANSACTION_STATUS.CONFIRMED,
      amount: 1000,
      baseCurrencyAmount: 0.5,
      baseCurrencySymbol: 'USD',
      address: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      type: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.PENDING,
      amount: 1000,
      baseCurrencyAmount: 0.5,
      baseCurrencySymbol: 'USD',
      address: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
  ],
};
