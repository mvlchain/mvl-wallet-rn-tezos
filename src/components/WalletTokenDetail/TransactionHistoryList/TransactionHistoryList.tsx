import React from 'react';

import { FlatList } from 'react-native';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import useTransactionHistoryFilter from '@@hooks/transactionHistory/useTransactionHistoryFilter';
import useTransactionHistoryList from '@@hooks/transactionHistory/useTransactionHistoryList';
import globalModalStore from '@@store/globalModal/globalModalStore';

import TransactionHistoryListItem from '../TransactionHistoryItem';

import * as S from './TransactionHistoryList.style';

function TransactionHistoryList() {
  const { openModal } = globalModalStore();
  const { filterCriterias } = useTransactionHistoryFilter();
  const { filteredData, onEndReached } = useTransactionHistoryList();

  return (
    <S.TransactionHistoryContainer>
      <S.TransactionHistoryLabelWrapper>
        <S.TransactionHistoryLabel>Transaction History</S.TransactionHistoryLabel>
        <TextButton
          label={'All'}
          onPress={() => {
            openModal('BOTTOM_SELECT', { modalTitle: 'Filter', menuList: filterCriterias });
          }}
          disabled={false}
        />
      </S.TransactionHistoryLabelWrapper>
      <FlatList
        data={filteredData}
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
    </S.TransactionHistoryContainer>
  );
}

export default TransactionHistoryList;
