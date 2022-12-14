import React from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import useHeader from '@@hooks/useHeader';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import {
  TTransactionHistoryRootStackProps,
  TTransactionHistoryRouteProps,
} from '@@screens/WalletScreen/WalletTransactionHistory/WalletTransactionHistory.type';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './TransactionFeeBoard.style';

function TransactionFeeBoard() {
  const { params } = useRoute<TTransactionHistoryRouteProps>();
  const { settedCurrency } = settingPersistStore();
  const { price } = useOneTokenPrice(params.tokenDto, params.fee);
  const navigation = useNavigation<TTransactionHistoryRootStackProps>();
  const { t } = useTranslation();
  return (
    <S.TransactionFeeBoardContainer>
      <S.Label>{t('transaction_fee')}</S.Label>
      <S.Value>
        {price} {settedCurrency}
      </S.Value>
    </S.TransactionFeeBoardContainer>
  );
}

export default TransactionFeeBoard;
