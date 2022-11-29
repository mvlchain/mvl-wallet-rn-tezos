import React, { useState, useCallback } from 'react';

import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { TextInput, Platform, NativeSyntheticEvent, TextInputChangeEventData, View } from 'react-native';

import { BlackScanIcon, TextFieldDelete } from '@@assets/image';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { commonColors } from '@@style/colors';
import { theme } from '@@style/theme';

import * as S from './TextField.style';
import * as Type from './TextField.type';

export function GasTextField(props: Type.IGasTextFieldProps) {
  const { value, setValue, style, unit, hint, delay, disabled, defaultValue } = props;
  const { appTheme } = settingPersistStore();
  const color = theme[appTheme.value].color;
  const [lcColor, setLcColor] = useState<string | null>(null);
  const initialDisplayValue = value && unit ? formatUnits(value, unit).toString() : value ? value.toString() : '0';
  const [displayValue, setDisplayValue] = useState<string>(initialDisplayValue);

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
      setValue(BigNumber.from(0));
      setDisplayValue('0');
    }

    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') {
      value = value.slice(1);
    }

    if (value.indexOf('.') !== value.lastIndexOf('.')) {
      return;
    }

    setValue(unit ? parseUnits(value, unit) : BigNumber.from(value));
    setDisplayValue(value);
  };

  const clearTextField = () => {
    if (!setValue) return;
    setValue(BigNumber.from(0));
    setDisplayValue('0');
  };

  //TODO: 디바운스 처리
  const debounce = useCallback((callback: any) => {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  }, []);

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
