import React from 'react';

import { useTranslation } from 'react-i18next';

import { ChangeIconLight } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { TradeVolume } from '@@components/BasicComponents/TextFields/TradeVolume/TradeVolume';

import * as S from './TradeScreen.style';
import { useTradeScreen } from './useTradeScreen';

function TradeScreen() {
  const { t } = useTranslation();
  const { fromToken, toToken, onPressToken, onPressChange } = useTradeScreen();
  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>{t('trade')}</S.HeaderTitle>
      </S.Header>
      <S.InputContainer>
        {fromToken && (
          <TradeVolume
            onChange={() => console.log('')}
            tokenDto={fromToken}
            useMax={true}
            label={t('from')}
            handleTokenSelect={() => onPressToken('from')}
          />
        )}
        <S.SwapButtonContainer>
          <S.SwapButton onPress={onPressChange}>
            <ChangeIconLight />
          </S.SwapButton>
        </S.SwapButtonContainer>
        {toToken && (
          <TradeVolume
            onChange={() => console.log('')}
            tokenDto={toToken}
            label={t('to')}
            disableHint={true}
            handleTokenSelect={() => onPressToken('to')}
          />
        )}
        <PrimaryButton onPress={() => console.log('')} label={t('enter_amount')} wrapperStyle={S.InlineStyle.button} />
        <S.PriceImpactContainer>
          <S.PriceImpactText>{t('price_impact')}</S.PriceImpactText>
          <S.PriceImpactHelp>?</S.PriceImpactHelp>
        </S.PriceImpactContainer>
      </S.InputContainer>
    </S.Container>
  );
}

export default TradeScreen;
