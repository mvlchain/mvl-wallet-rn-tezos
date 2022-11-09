import React from 'react';

import { useTranslation } from 'react-i18next';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import Devider from '@@components/BasicComponents/Devider';
import { DEVIDER_THICKNESS } from '@@components/BasicComponents/Devider/Devider.type';
import { height } from '@@utils/ui';

import * as S from './SpeedOperationBoard.style';

function SpeedOperationBoard() {
  const { t } = useTranslation();
  return (
    <S.Container>
      <S.InnerContainer>
        <S.Row>
          <S.BoardLabel>{t('transaction')}</S.BoardLabel>
          <S.ToggleWrapper>
            <S.Value>{t('advanced')}</S.Value>
          </S.ToggleWrapper>
        </S.Row>
        <S.Row>
          <S.Label>{t('speed')}</S.Label>
        </S.Row>
      </S.InnerContainer>
      <Devider thickness={DEVIDER_THICKNESS.THIN} />
      <S.InnerContainer>
        <S.Row>
          <S.Label>{t('estimated_time')}</S.Label>
          <S.Value>{'~ 2 min 0 sec'}</S.Value>
        </S.Row>
        <S.MarginRow>
          <S.Label>{t('new_transaction_fee')}</S.Label>
          <S.Value>{'0.04 ETH'}</S.Value>
        </S.MarginRow>
        <S.BaseCurrency>{'6.30 USD'}</S.BaseCurrency>
      </S.InnerContainer>
      <S.ConfirmWrapper>
        <PrimaryButton label={t('confirm')} onPress={() => {}} />
      </S.ConfirmWrapper>
    </S.Container>
  );
}

export default SpeedOperationBoard;
