import React from 'react';

import { useTranslation } from 'react-i18next';

import { dateFormatter } from '@@utils/dateFormatter';

import * as S from './TransactionDetailBoard.style';
import { ITransactionDetailBoardProps } from './TransactionDetailBoard.type';

function TransactionDetailBoard({ type, value, valueSign, ticker, price, settedCurrency, updatedAt, to, status }: ITransactionDetailBoardProps) {
  const { t } = useTranslation();

  return (
    <>
      <S.TransactionDetailBoardContainer>
        <S.TransactionType>{type}</S.TransactionType>
        <S.TransactionAmount>
          {valueSign}
          {value}
          {ticker}
        </S.TransactionAmount>
        <S.TransactionBaseCurrencyAmount>{`≈ ${price} ${settedCurrency}`}</S.TransactionBaseCurrencyAmount>
      </S.TransactionDetailBoardContainer>
      <S.TransactionDetailBoardContainer>
        <S.Row>
          <S.Label>{t('date')}</S.Label>
          <S.Value>{dateFormatter(updatedAt)}</S.Value>
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
