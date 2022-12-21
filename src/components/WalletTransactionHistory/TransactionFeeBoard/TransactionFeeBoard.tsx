import React from 'react';

import { useTranslation } from 'react-i18next';

import * as S from './TransactionFeeBoard.style';
import { ITransactionFeeBoardProps } from './TransactionFeeBoard.type';

function TransactionFeeBoard({ fee, ticker }: ITransactionFeeBoardProps) {
  const { t } = useTranslation();
  return (
    <S.TransactionFeeBoardContainer>
      <S.Label>{t('transaction_fee')}</S.Label>
      <S.Value>
        {fee} {ticker}
      </S.Value>
    </S.TransactionFeeBoardContainer>
  );
}

export default TransactionFeeBoard;
