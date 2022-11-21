import React, { useState } from 'react';

import { parseUnits } from 'ethers/lib/utils';
import { NativeSyntheticEvent, TextInputChangeEventData, TextInputEndEditingEventData } from 'react-native';

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
  const [displayValue, setDisplayValue] = useState<string | null>(null);

  const clearTextField = () => {
    onChange(null);
    setDisplayValue(null);
    setShowDelete(false);
  };

  const onKeyPress = () => {
    setShowDelete(true);
  };

  const onSet = (data: NativeSyntheticEvent<TextInputChangeEventData>) => {
    let value = data.nativeEvent.text;

    if (!value) {
      setShowDelete(false);
    }

    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') {
      value = value.slice(1);
    }

    if (value.indexOf('.') !== value.lastIndexOf('.')) {
      return;
    }

    onChange(parseUnits(value, 'ether'));
    setDisplayValue(value);
  };

  const onEndEditing = (data: NativeSyntheticEvent<TextInputEndEditingEventData>) => {};

  return (
    <S.TradeVolumeContainer>
      <S.TradeVolumeTop>
        <S.Label>{label}</S.Label>
        <TextButton label={'Max'} onPress={() => {}} disabled={true} />
      </S.TradeVolumeTop>
      <S.TradeVolumeMiddle>
        <S.TradeVolumeInputWrapper>
          <S.TradeVolumeInput
            value={displayValue ?? ''}
            onChange={onSet}
            onEndEditing={onEndEditing}
            keyboardType={'numeric'}
            selectionColor={color.black}
            placeholder={'0.00'}
            placeholderTextColor={color.grey300Grey700}
            onKeyPress={onKeyPress}
          />
          {showDelete && <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />}
        </S.TradeVolumeInputWrapper>
        <S.SymbolWrapper>
          <TokenImage width={height * 32} height={height * 32} />
          <S.Token>{symbol}</S.Token>
          {!!onSelect && <ChevronDownLightIcon style={S.inlineStyles.marginProvider} onPress={() => {}} />}
        </S.SymbolWrapper>
      </S.TradeVolumeMiddle>
      {hint ? <S.Hint>{hint}</S.Hint> : <S.Balance>{'Balance: 2222222222222'}</S.Balance>}
    </S.TradeVolumeContainer>
  );
}
