import React from 'react';

import { useTranslation } from 'react-i18next';

import * as S from './OldTransactionBoard.style';

function OldTransactionBoard() {
  const { t } = useTranslation();
  return (
    <S.Container>
      <S.Row>
        {/* TODO: 문구 추가 필요 */}
        <S.Label>{'Old Transaction Fee'}</S.Label>
        <S.Value>{'1000 ETH'}</S.Value>
      </S.Row>
      <S.BaseCurrency>{'500 USD'}</S.BaseCurrency>
    </S.Container>
  );
}

export default OldTransactionBoard;
