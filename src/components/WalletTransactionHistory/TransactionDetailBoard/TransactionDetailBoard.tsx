import React from 'react';

import { useTranslation } from 'react-i18next';

import * as S from './TransactionDetailBoard.style';

function TransactionDetailBoard() {
  const { t } = useTranslation();
  //TODO: 데이터정해지면 수정
  const { type, status, amount, symbol, baseCurrencyAmount, baseCurrencySymbol, date, receiver } = {
    type: 'Send',
    amount: 10,
    symbol: 'MVL',
    baseCurrencyAmount: 10000,
    baseCurrencySymbol: 'USD',
    date: '2021.10.31 09:00 am',
    status: 'Confirmed',
    receiver: 'DFGSHSHSDHSDHSDHSDHFDSHDFHdgsgdsgdgsgsdgsglighlks422124124242421352135ngvaln436543.21.3SDHDFHDFH',
  };
  return (
    <S.TransactionDetailBoardContainer>
      <S.TransactionType>{type}</S.TransactionType>
      <S.TransactionAmount>
        {'sign'}
        {amount}
        {symbol}
      </S.TransactionAmount>
      <S.TransactionBaseCurrencyAmount>
        {'≈'} {baseCurrencyAmount} {baseCurrencySymbol}
      </S.TransactionBaseCurrencyAmount>

      <S.Row>
        <S.Label>{t('date')}</S.Label>
        <S.Value>{date}</S.Value>
      </S.Row>

      <S.Row>
        <S.Label>{t('status')}</S.Label>
        <S.Value>{status}</S.Value>
      </S.Row>

      <S.Row>
        <S.Label>{t('receiver')}</S.Label>
        <S.Value>{receiver}</S.Value>
      </S.Row>
    </S.TransactionDetailBoardContainer>
  );
}

export default TransactionDetailBoard;
