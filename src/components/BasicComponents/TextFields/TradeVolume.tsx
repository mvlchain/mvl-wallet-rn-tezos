import React, { useState, useEffect } from 'react';

import { parseUnits, commify } from 'ethers/lib/utils';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { ChevronDownLightIcon, TextFieldDelete } from '@@assets/image';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import useDebounce from '@@hooks/useDebounce';
import useOneTokenBalance from '@@hooks/useOneTokenBalance';
import { useColor } from '@@hooks/useTheme';
import { height } from '@@utils/ui';

import * as S from './TextField.style';
import * as Type from './TextField.type';

export function TradeVolume(props: Type.ITradeVolumeComponentProps) {
  const { useMax, onSelect, label, tokenDto, value, onChange, hint } = props;
  const [showDelete, setShowDelete] = useState(false);
  const [displayValue, setDisplayValue] = useState<string | null>(null);
  const { balance } = useOneTokenBalance(tokenDto);
  const { color } = useColor();
  const debounceCallback = useDebounce(onChange, 1000);

  useEffect(() => {
    debounceCallback(displayValue ? parseUnits(displayValue, 'ether') : null);
  }, [displayValue]);

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
    setDisplayValue(value);
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
            value={displayValue ? commify(displayValue) : ''}
            onChange={onSet}
            keyboardType={'numeric'}
            selectionColor={color.black}
            placeholder={'0.00'}
            placeholderTextColor={color.grey300Grey700}
            onKeyPress={onKeyPress}
          />
          {showDelete && <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />}
        </S.TradeVolumeInputWrapper>
        <S.SymbolWrapper>
          <SvgUri uri={tokenDto.logoURI} width={height * 32} height={height * 32} />
          <S.Token>{tokenDto.symbol}</S.Token>
          {!!onSelect && <ChevronDownLightIcon style={S.inlineStyles.marginProvider} onPress={() => {}} />}
        </S.SymbolWrapper>
      </S.TradeVolumeMiddle>
      {hint ? <S.Hint>{hint}</S.Hint> : <S.Balance>{`Balance: ${balance}`}</S.Balance>}
    </S.TradeVolumeContainer>
  );
}
