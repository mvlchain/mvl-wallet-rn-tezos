import React from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
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
        <TextButton label={t('view_etherscan')} onPress={() => {}} disabled={false} />
      </S.LabelWrapper>
      <S.TransactionHash>{params.txHash}</S.TransactionHash>
    </S.TransactionHashBoardContainer>
  );
}

export default TransactionHashBoard;
