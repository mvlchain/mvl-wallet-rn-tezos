import React from 'react';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import useHeader from '@@hooks/common/useHeader';
import {
  TTransactionHistoryRootStackProps,
  TTransactionHistoryRouteProps,
} from '@@screens/WalletScreen/WalletTransactionHistory/WalletTransactionHistory.type';

import * as S from './TransactionDetailBoard.style';

function TransactionDetailBoard() {
  const { params } = useRoute<TTransactionHistoryRouteProps>();
  const { handleStackHeaderOption } = useHeader();
  const navigation = useNavigation<TTransactionHistoryRootStackProps>();
  const { t } = useTranslation();

  const { type, status, value, ticker, updatedAt, to, from } = params;
  // TODO: 여러번 계산되는 것 같음, 서버 데이터에 구겨넣을까..?
  const valueSign = from === '0x09Fc9e92261113C227c0eC6F1B20631AA7b2789d' ? '-' : null;
  return (
    <>
      <S.TransactionDetailBoardContainer>
        <S.TransactionType>{type}</S.TransactionType>
        <S.TransactionAmount>
          {valueSign}
          {value}
          {ticker}
        </S.TransactionAmount>
        <S.TransactionBaseCurrencyAmount>
          {/* TODO: 계산필요 */}
          {'≈'} {1000} {'USD'}
        </S.TransactionBaseCurrencyAmount>
      </S.TransactionDetailBoardContainer>
      <S.TransactionDetailBoardContainer>
        <S.Row>
          <S.Label>{t('date')}</S.Label>
          <S.Value>{updatedAt}</S.Value>
        </S.Row>
        <S.Row isMiddle={true}>
          <S.Label>{t('status')}</S.Label>
          <S.Value>{status}</S.Value>
        </S.Row>
        <S.Row>
          <S.Label>{t('receiver')}</S.Label>
          <S.ReceiverWrapper>
            <S.Value>{to}</S.Value>
          </S.ReceiverWrapper>
        </S.Row>
      </S.TransactionDetailBoardContainer>
    </>
  );
}

export default TransactionDetailBoard;
