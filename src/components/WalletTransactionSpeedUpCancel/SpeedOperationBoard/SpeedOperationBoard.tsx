import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { WarningIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import Toggle from '@@components/Form/Toggle';
import { width } from '@@utils/ui';

import SpeedInputs from './SpeedInputs';
import * as S from './SpeedOperationBoard.style';
import SpeedRadioButtons from './SpeedRadioButtons';

function SpeedOperationBoard() {
  const [advanced, setAdvanced] = useState(false);
  const { t } = useTranslation();
  return (
    <S.Container>
      <View>
        <S.InnerContainer>
          <S.Row>
            <S.BoardLabel>{t('transaction')}</S.BoardLabel>
            <S.ToggleWrapper>
              <S.Value>{t('advanced')}</S.Value>
              <Toggle
                checked={advanced}
                onPress={() => {
                  setAdvanced(!advanced);
                }}
                style={{ marginLeft: width * 16 }}
              />
            </S.ToggleWrapper>
          </S.Row>

          {advanced ? <SpeedInputs /> : <SpeedRadioButtons />}
        </S.InnerContainer>
        <Divider thickness={DIVIDER_THICKNESS.THIN} />
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
          <S.Warning>
            <S.WarningIconWrapper>
              <WarningIcon />
            </S.WarningIconWrapper>
            <S.WarningText>{'Please sest your~~~'}</S.WarningText>
          </S.Warning>
        </S.InnerContainer>
      </View>
      <S.ConfirmWrapper>
        <PrimaryButton label={t('confirm')} onPress={() => {}} />
      </S.ConfirmWrapper>
    </S.Container>
  );
}

export default SpeedOperationBoard;