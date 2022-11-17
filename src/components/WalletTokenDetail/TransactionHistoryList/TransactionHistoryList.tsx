import React from 'react';

import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import globalModalStore from '@@store/globalModal/globalModalStore';

import TransactionHistoryListItem from '../TransactionHistoryItem';

import * as S from './TransactionHistoryList.style';
import useTransactionHistoryFilter from './useTransactionHistoryFilter';
import useTransactionHistoryList from './useTransactionHistoryList';

function TransactionHistoryList() {
  const { openModal } = globalModalStore();
  const { filteredData, onEndReached, filterCriteria } = useTransactionHistoryList();
  const { t } = useTranslation();

  return (
    <S.TransactionHistoryContainer>
      <S.TransactionHistoryLabelWrapper>
        <S.TransactionHistoryLabel>{t('transaction_history')}</S.TransactionHistoryLabel>
        <TextButton
          label={t('filter_all')}
          onPress={() => {
            openModal('BOTTOM_SELECT', { modalTitle: t('filter'), menuList: filterCriteria });
          }}
          disabled={false}
        />
      </S.TransactionHistoryLabelWrapper>
      {filteredData ? (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => <TransactionHistoryListItem {...item} />}
          keyExtractor={(item, idx) => item.hash}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
          showsVerticalScrollIndicator={false}
          bounces={false}
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
