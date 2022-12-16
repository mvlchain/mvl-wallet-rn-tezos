import React, { useState, useEffect } from 'react';

import { BigNumber } from 'bignumber.js';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { TextFieldDelete } from '@@assets/image';
import { GAS_UNIT_DECIMAL } from '@@constants/gas.constant';
import useDebounce from '@@hooks/useDebounce';
import { useColor } from '@@hooks/useTheme';
import { commonColors } from '@@style/colors';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { inputNumberFormatter } from '@@utils/gas';

import * as S from './TextField.style';
import * as Type from './TextField.type';

export function GasTextField(props: Type.IGasTextFieldProps) {
  const { value, setValue, style, unit, hint, delay, disabled, defaultValue } = props;
  const { color } = useColor();
  const [lcColor, setLcColor] = useState<string | null>(null);
  const decimal = unit ? -GAS_UNIT_DECIMAL[unit] : 0;

  const initialDisplayValue = value ? value.shiftedBy(decimal).toString(10) : '0';
  const [displayValue, setDisplayValue] = useState<string>(initialDisplayValue);
  const debounceCallback = useDebounce(setValue, 1000);

  useEffect(() => {
    debounceCallback(formatBigNumber(new BigNumber(displayValue), decimal));
  }, [displayValue]);

  const onBlur = () => {
    setLcColor(null);
  };
  const onFocus = () => {
    setLcColor(commonColors.primary);
  };

  const onChange = (data: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (!setValue) return;
    const value = data.nativeEvent.text;
    const formattedValue = inputNumberFormatter(value, decimal);
    if (!formattedValue) return;
    setDisplayValue(formattedValue);
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
        {unit && <S.Unit>{unit}</S.Unit>}
        <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />
      </S.BaseTextFieldInputWrapper>
      {hint && <S.BaseTextFieldHint>{hint}</S.BaseTextFieldHint>}
    </S.BaseTextFieldContainer>
  );
}
