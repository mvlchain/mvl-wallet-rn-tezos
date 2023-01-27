import React from 'react';

import { useTranslation } from 'react-i18next';
import { RefreshControl } from 'react-native';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import globalModalStore from '@@store/globalModal/globalModalStore';

import TransactionHistoryListItem from '../TransactionHistoryItem';

import * as S from './TransactionHistoryList.style';
import useTransactionHistoryList from './useTransactionHistoryList';

function TransactionHistoryList() {
  const { openModal } = globalModalStore();
  const { filteredData, getHistory, filterCriteria } = useTransactionHistoryList();
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
      {filteredData && filteredData.length > 0 ? (
        <S.HistoryList
          refreshControl={<RefreshControl onRefresh={() => getHistory()} refreshing={false} tintColor='rgba(0, 137, 231,0.5)' />}
          data={filteredData}
          renderItem={({ item }) => <TransactionHistoryListItem {...item} />}
          keyExtractor={(item, idx) => item.hash}
          onEndReached={getHistory}
          onEndReachedThreshold={0.8}
          showsVerticalScrollIndicator={false}
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
