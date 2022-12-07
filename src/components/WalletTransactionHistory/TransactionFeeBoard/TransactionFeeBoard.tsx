import React from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import useHeader from '@@hooks/useHeader';
import {
  TTransactionHistoryRootStackProps,
  TTransactionHistoryRouteProps,
} from '@@screens/WalletScreen/WalletTransactionHistory/WalletTransactionHistory.type';

import * as S from './TransactionFeeBoard.style';

function TransactionFeeBoard() {
  const { params } = useRoute<TTransactionHistoryRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TTransactionHistoryRootStackProps>();
  const { t } = useTranslation();
  return (
    <S.TransactionFeeBoardContainer>
      <S.Label>{t('transaction_fee')}</S.Label>
      <S.Value>
        {0.004} {'USD'}
      </S.Value>
    </S.TransactionFeeBoardContainer>
  );
}

export default TransactionFeeBoard;
