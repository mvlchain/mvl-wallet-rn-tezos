import React, { useState, useEffect } from 'react';

import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { TextFieldDelete } from '@@assets/image';
import { GAS_UNIT, GAS_UNIT_DECIMAL } from '@@constants/gas.constant';
import useDebounce from '@@hooks/useDebounce';
import { useColor } from '@@hooks/useTheme';
import { commonColors } from '@@style/colors';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { inputNumberFormatter } from '@@utils/gas';

import * as S from '../TextField.style';

import { IGasTextFieldProps } from './GasTextField.type';

export function GasTextField(props: IGasTextFieldProps) {
  const { value, setValue, style, unit, disabled, defaultValue, setParentValid } = props;
  const { color } = useColor();
  const [lcColor, setLcColor] = useState<string | null>(null);
  const decimal = unit ? -GAS_UNIT_DECIMAL[unit] : 0;
  const initialDisplayValue = value ? value.shiftedBy(-decimal).toString(10) : '';
  const [displayValue, setDisplayValue] = useState<string>(initialDisplayValue);
  const { t } = useTranslation();
  const debounceCallback = useDebounce(setValue, 1000);

  const errorMsgZero = t('must_greater_than_zero');
  const errorMsgLimit = t('must_greater_than_21000');
  const [showHint, setShowHint] = useState<boolean>(false);

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
    setDisplayValue('');
  };

  useEffect(() => {
    handleHint();
  }, [value]);

  const handleHint = useDebounce(() => {
    if (!value) {
      setShowHint(false);
      setParentValid(false);
      return;
    }
    switch (unit) {
      case GAS_UNIT.MUTEZ:
        setParentValid(true);
        return;
      case GAS_UNIT.GWEI:
        if (value.gt(new BigNumber(0))) {
          setShowHint(false);
          setParentValid(true);
        } else {
          setShowHint(true);
          setParentValid(false);
        }
      case undefined:
        if (value.gt(new BigNumber(21000))) {
          setShowHint(false);
          setParentValid(true);
        } else {
          setShowHint(true);
          setParentValid(false);
        }
    }
  }, 800);

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
      {showHint && <S.BaseTextFieldHint>{unit ? errorMsgZero : errorMsgLimit}</S.BaseTextFieldHint>}
    </S.BaseTextFieldContainer>
  );
}
