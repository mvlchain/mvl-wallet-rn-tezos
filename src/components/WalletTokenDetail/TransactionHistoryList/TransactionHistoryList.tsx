import React from 'react';

import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import useTransactionHistoryFilter from '@@hooks/transactionHistory/useTransactionHistoryFilter';
import useTransactionHistoryList from '@@hooks/transactionHistory/useTransactionHistoryList';
import globalModalStore from '@@store/globalModal/globalModalStore';

import TransactionHistoryListItem from '../TransactionHistoryItem';

import * as S from './TransactionHistoryList.style';

function TransactionHistoryList() {
  const { openModal } = globalModalStore();
  const { filteredData, onEndReached, filterCriterias } = useTransactionHistoryList();
  const { t } = useTranslation();

  return (
    <S.TransactionHistoryContainer>
      <S.TransactionHistoryLabelWrapper>
        <S.TransactionHistoryLabel>{t('transaction_history')}</S.TransactionHistoryLabel>
        <TextButton
          label={'All'}
          onPress={() => {
            openModal('BOTTOM_SELECT', { modalTitle: t('filter'), menuList: filterCriterias });
          }}
          disabled={false}
        />
      </S.TransactionHistoryLabelWrapper>
      {filteredData ? (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TransactionHistoryListItem
              type={item.type}
              status={item.status}
              amount={item.amount}
              baseCurrencyAmount={item.baseCurrencyAmount}
              baseCurrencySymbol={item.baseCurrencySymbol}
              txHash={item.txHash}
              date={item.date}
            />
          )}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
        />
      ) : (
        <S.EmptyHistoryLabelWrapper>
          <S.EmptyHistoryLabel>{t('transaction_history_empty')}</S.EmptyHistoryLabel>
        </S.EmptyHistoryLabelWrapper>
      )}
    </S.TransactionHistoryContainer>
  );
}

export default TransactionHistoryList;
