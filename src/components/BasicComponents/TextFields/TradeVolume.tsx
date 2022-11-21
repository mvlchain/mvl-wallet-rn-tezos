import React, { useState } from 'react';

import { ChevronDownLightIcon, TextFieldDelete } from '@@assets/image';
import * as TokenIcon from '@@assets/image/token';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { theme } from '@@style/theme';
import { height } from '@@utils/ui';

import * as S from './TextField.style';
import * as Type from './TextField.type';

export function TradeVolume(props: Type.ITradeVolumeComponentProps) {
  const { useMax, onSelect, label, symbol, value, onChange, hint } = props;
  const { appTheme } = settingPersistStore();
  const color = theme[appTheme.label].color;

  //TODO: 리스트에 없는 토큰일 결루 보여줄 심볼
  const TokenImage = TokenIcon[symbol ?? 'Mvl'];
  const [showDelete, setShowDelete] = useState(false);
  const clearTextField = () => {
    if (onChange && value) {
      onChange('');
      setShowDelete(false);
    }
  };
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
            selectionColor={color.black}
            placeholder={'0.00'}
            placeholderTextColor={color.grey300Grey700}
          />
          {showDelete && <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />}
        </S.TradeVolumeInputWrapper>
        <S.SymbolWrapper>
          <TokenImage width={height * 32} height={height * 32} />
          <S.Token>{symbol}</S.Token>
          {!!onSelect && <ChevronDownLightIcon style={S.inlineStyles.marginProvider} onPress={() => {}} />}
        </S.SymbolWrapper>
      </S.TradeVolumeMiddle>
      {hint && <S.Hint>{hint}</S.Hint>}
    </S.TradeVolumeContainer>
  );
}
