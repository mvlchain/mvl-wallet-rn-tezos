import React, { useEffect, useState } from 'react';

import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { BlackScanIcon, TextFieldDelete } from '@@assets/image';
import useDebounce from '@@hooks/useDebounce';
import { useColor } from '@@hooks/useTheme';
import { commonColors } from '@@style/colors';

import * as S from './TextField.style';
import * as Type from './TextField.type';

export const KeyboardTypeByInputType = {
  address: 'default',
  gas: 'numeric',
  search: 'default',
} as const;

export function BaseTextField(props: Type.IBaseTextFieldComponentProps) {
  const { placeholder, isValid, value, onChange, scanable, style, unit, type, label, hint } = props;
  const { color } = useColor();

  const [lcColor, setLcColor] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>('');
  const debounceCallback = useDebounce(onChange, 1000);

  useEffect(() => {
    debounceCallback(displayValue);
  }, [displayValue]);

  const clearTextField = () => {
    setDisplayValue('');
    setShowDelete(false);
  };
  const onBlur = () => {
    setLcColor(null);
  };
  const onFocus = () => {
    setLcColor(commonColors.primary);
  };
  const onKeyPress = () => {
    setShowDelete(true);
  };

  const onSet = (data: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setDisplayValue(data.nativeEvent.text);
    if (!data.nativeEvent.text) {
      setShowDelete(false);
    }
  };

  return (
    <S.BaseTextFieldContainer>
      {label && <S.BaseTextFieldLabel>{label}</S.BaseTextFieldLabel>}
      <S.BaseTextFieldInputWrapper lcColor={lcColor} editable={true}>
        <S.BaseInput
          keyboardType={KeyboardTypeByInputType[type]}
          placeholder={placeholder}
          placeholderTextColor={color.grey300Grey700}
          isValid={isValid}
          value={displayValue}
          onChange={onSet}
          scanable={scanable}
          style={style}
          selectionColor={color.black}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyPress={onKeyPress}
        />
        {unit && <S.Unit>{unit}</S.Unit>}
        {showDelete && <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />}
        {/* TODO: 스캔함수 작성되면 추가 필요*/}
        {scanable && <BlackScanIcon onPress={() => {}} style={S.inlineStyles.marginProvider} />}
      </S.BaseTextFieldInputWrapper>
      {hint && <S.BaseTextFieldHint>{hint}</S.BaseTextFieldHint>}
    </S.BaseTextFieldContainer>
  );
}
