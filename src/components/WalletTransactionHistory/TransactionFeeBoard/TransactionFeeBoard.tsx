import React from 'react';

import { useTranslation } from 'react-i18next';

import * as S from './TransactionFeeBoard.style';

function TransactionFeeBoard() {
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
