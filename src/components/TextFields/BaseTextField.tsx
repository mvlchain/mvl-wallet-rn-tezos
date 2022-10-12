import { useState } from 'react';

import { BlackScanIcon, TextFieldDelete } from '@@assets/image';
import { commonColors } from '@@style/colors';
import { theme } from '@@style/theme';

import * as S from './styled';
import * as Type from './type';

export const KeyboardTypeByInputType = {
  address: 'default',
  gas: 'numeric',
  search: 'default',
} as const;

export function BaseTextField({ placeholder, isValid, value, onChange, scanable, style, unit, type, label, hint }: Type.BaseTextFieldComponentProps) {
  const [lcColor, setLcColor] = useState<string | null>(null);

  const clearTextField = () => {
    onChange('');
  };
  const onBlur = () => {
    setLcColor(null);
  };
  const onFocus = () => {
    setLcColor(commonColors.primary);
  };

  return (
    <S.BaseTextFieldContainer>
      {label && <S.BaseTextFieldLabel>{label}</S.BaseTextFieldLabel>}
      <S.BaseTextFieldInputWrapper lcColor={lcColor}>
        <S.BaseInput
          keyboardType={KeyboardTypeByInputType[type]}
          placeholder={placeholder}
          //TODO: 스토어에 theme 들어오면 수정필요
          placeholderTextColor={theme.light.color.grey300Grey700}
          isValid={isValid}
          value={value}
          onChange={onChange}
          scanable={scanable}
          style={style}
          selectionColor={theme.light.color.black}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {unit && <S.Unit>{unit}</S.Unit>}
        <TextFieldDelete onPress={clearTextField} style={S.inlineStyles.marginProvider} />
        {/* TODO: 스캔함수 작성되면 추가 필요*/}
        {scanable && <BlackScanIcon onPress={() => {}} style={S.inlineStyles.marginProvider} />}
      </S.BaseTextFieldInputWrapper>
      {hint && <S.BaseTextFieldHint>{hint}</S.BaseTextFieldHint>}
    </S.BaseTextFieldContainer>
  );
}
