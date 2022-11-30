import React from 'react';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { WarningIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import Toggle from '@@components/BasicComponents/Form/Toggle';
import { width } from '@@utils/ui';

import * as S from './GasFeeBoardLayout.style';
import { IGasFeeBoardLayoutProps } from './GasFeeBoardLayout.type';

function GasFeeBoardLayout({ isRevision, estimatedTime, transactionFee, advanced, onConfirm, handleAdvanced, children }: IGasFeeBoardLayoutProps) {
  const { t } = useTranslation();
  return (
    <S.Container>
      <View>
        <S.InnerContainer>
          <S.Row>
            <S.BoardLabel>{t('transaction')}</S.BoardLabel>
            <S.ToggleWrapper>
              <S.Value>{t('advanced')}</S.Value>
              <Toggle checked={advanced} onPress={handleAdvanced} style={{ marginLeft: width * 16 }} />
            </S.ToggleWrapper>
          </S.Row>
          {advanced ? children[1] : children[0]}
        </S.InnerContainer>
        <Divider thickness={DIVIDER_THICKNESS.THIN} />
        <S.InnerContainer>
          {estimatedTime && (
            <S.Row>
              <S.Label>{t('estimated_time')}</S.Label>
              <S.Value>{estimatedTime}</S.Value>
            </S.Row>
          )}
          <S.MarginRow>
            <S.Label>{`${isRevision ? t('new') + ' ' : ''}${t('transaction_fee')}`}</S.Label>
            <S.Value>{`${transactionFee} BNB`}</S.Value>
          </S.MarginRow>
          <S.BaseCurrency>{'6.30 USD'}</S.BaseCurrency>
          <S.Warning>
            <S.WarningIconWrapper>
              <WarningIcon />
            </S.WarningIconWrapper>
            <S.WarningText>{'Please sest your~~~'}</S.WarningText>
          </S.Warning>
        </S.InnerContainer>
      </View>
      <S.ConfirmWrapper>
        <PrimaryButton label={t('confirm')} onPress={onConfirm} />
      </S.ConfirmWrapper>
    </S.Container>
  );
}

export default GasFeeBoardLayout;
