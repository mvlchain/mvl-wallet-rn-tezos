import React, { useState, useEffect } from 'react';

import { BigNumber } from 'bignumber.js';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { TextFieldDelete } from '@@assets/image';
import useDebounce from '@@hooks/useDebounce';
import { useColor } from '@@hooks/useTheme';
import { commonColors } from '@@style/colors';
import { formatBigNumber } from '@@utils/formatBigNumber';

import * as S from './TextField.style';
import * as Type from './TextField.type';

export function GasTextField(props: Type.IGasTextFieldProps) {
  const { value, setValue, style, unit, hint, delay, disabled, defaultValue } = props;
  const { color } = useColor();
  const [lcColor, setLcColor] = useState<string | null>(null);
  const getInitialValue = (unit: 'gwei' | 'mutez' | undefined, value: BigNumber | null | undefined) => {
    if (!value) return '0';
    switch (unit) {
      case 'gwei':
        return value.shiftedBy(-9).toString(10);
      case 'mutez':
        return value.toString(10);
      default:
        return value.toString();
    }
  };
  const initialDisplayValue = getInitialValue(unit, value);
  const [displayValue, setDisplayValue] = useState<string>(initialDisplayValue);
  const debounceCallback = useDebounce(setValue, 1000);

  useEffect(() => {
    debounceCallback(getUnitValue(unit, displayValue));
  }, [displayValue]);

  const getUnitValue = (unit: 'gwei' | 'mutez' | undefined, value: string) => {
    switch (unit) {
      case 'gwei':
        return formatBigNumber(new BigNumber(value), 9);
      case 'mutez':
        return new BigNumber(value);
      default:
        return new BigNumber(value);
    }
  };
  const onBlur = () => {
    setLcColor(null);
  };
  const onFocus = () => {
    setLcColor(commonColors.primary);
  };

  const onChange = (data: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (!setValue) return;
    let value = data.nativeEvent.text;

    if (!value || value === '') {
      setDisplayValue('0');
    }

    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') {
      value = value.slice(1);
    }

    if (value.indexOf('.') !== value.lastIndexOf('.')) {
      return;
    }

    setDisplayValue(value);
  };

  const clearTextField = () => {
    if (!setValue) return;
    setDisplayValue('0');
  };

  return (
    <S.BaseTextFieldContainer>
      <S.BaseTextFieldInputWrapper lcColor={lcColor} editable={!disabled}>
        <S.BaseInput
          defaultValue={defaultValue}
          keyboardType={'numeric'}
          placeholder={'0.00'}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={displayValue}
          style={style}
          selectionColor={color.black}
          placeholderTextColor={color.grey300Grey700}
          editable={!disabled}
        />
        {unit && <S.Unit>{unit.toUpperCase()}</S.Unit>}
        <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />
      </S.BaseTextFieldInputWrapper>
      {hint && <S.BaseTextFieldHint>{hint}</S.BaseTextFieldHint>}
    </S.BaseTextFieldContainer>
  );
}
