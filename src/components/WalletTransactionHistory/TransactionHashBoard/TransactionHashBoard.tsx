import React from 'react';

import { useTranslation } from 'react-i18next';

import ViewScanButton from '@@components/BasicComponents/ViewScanButton';

import * as S from './TransactionHashBoard.style';

function TransactionHashBoard({ hash }: { hash: string }) {
  const { t } = useTranslation();

  return (
    <S.TransactionHashBoardContainer>
      <S.LabelWrapper>
        <S.TransactionHashLabel>{t('transaction_hash')}</S.TransactionHashLabel>
        <ViewScanButton txHash={hash} />
      </S.LabelWrapper>
      <S.TransactionHash>{hash}</S.TransactionHash>
    </S.TransactionHashBoardContainer>
  );
}

export default TransactionHashBoard;
