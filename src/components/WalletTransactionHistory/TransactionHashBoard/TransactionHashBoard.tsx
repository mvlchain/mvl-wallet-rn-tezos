import React from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import ViewScanButton from '@@components/BasicComponents/ViewScanButton';
import useHeader from '@@hooks/useHeader';
import {
  TTransactionHistoryRootStackProps,
  TTransactionHistoryRouteProps,
} from '@@screens/WalletScreen/WalletTransactionHistory/WalletTransactionHistory.type';

import * as S from './TransactionHashBoard.style';

function TransactionHashBoard() {
  const { params } = useRoute<TTransactionHistoryRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TTransactionHistoryRootStackProps>();
  const { t } = useTranslation();

  return (
    <S.TransactionHashBoardContainer>
      <S.LabelWrapper>
        <S.TransactionHashLabel>{t('transaction_hash')}</S.TransactionHashLabel>
        <ViewScanButton txHash={params.hash} />
      </S.LabelWrapper>
      <S.TransactionHash>{params.hash}</S.TransactionHash>
    </S.TransactionHashBoardContainer>
  );
}

export default TransactionHashBoard;
