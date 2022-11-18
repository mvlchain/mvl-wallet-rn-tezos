import React from 'react';

import { ChevronDownLightIcon, TextFieldDelete, TokenMVL32Icon } from '@@assets/image';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import { theme } from '@@style/theme';

import * as S from './TextField.style';
import * as Type from './TextField.type';

export function TradeVolume(props: Type.ITradeVolumeComponentProps) {
  const { useMax, onSelect, label, symbol, value, onChange, hint } = props;
  const clearTextField = () => {};
  return (
    <S.TradeVolumeContainer>
      <S.TradeVolumeTop>
        <S.Label>{label}</S.Label>
        <TextButton label={'Max'} onPress={() => {}} disabled={true} />
      </S.TradeVolumeTop>
      <S.TradeVolumeMiddle>
        <S.TradeVolumeInputWrapper>
          <S.TradeVolumeInput
            value={value}
            onChange={onChange}
            keyboardType={'numeric'}
            selectionColor={theme.light.color.black}
            placeholder={'0.00'}
            //TODO: 스토어에 theme 들어오면 수정필요
            placeholderTextColor={theme.light.color.grey300Grey700}
          />

          <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />
        </S.TradeVolumeInputWrapper>
        <S.SymbolWrapper>
          <TokenMVL32Icon />
          <S.Token>bMVL</S.Token>
          {!!onSelect && <ChevronDownLightIcon style={S.inlineStyles.marginProvider} onPress={() => {}} />}
        </S.SymbolWrapper>
      </S.TradeVolumeMiddle>
      {hint && <S.Hint>{hint}</S.Hint>}
    </S.TradeVolumeContainer>
  );
}
