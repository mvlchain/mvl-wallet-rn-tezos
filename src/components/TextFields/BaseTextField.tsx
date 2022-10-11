import { useState } from 'react';

import { TextInputProps } from 'react-native';
import Styled from 'styled-components/native';

import { BlackScanIcon, TextFieldDelete } from '@@assets/image';
import { Color, commonColors } from '@@style/colors';
import { theme } from '@@style/theme';
import { fontSize } from '@@utils/ui';

//height를 어떻게 해야하지? 글씨크기를 상대적으로 할거면 모두다 그렇게 해야하는거 아닌가
const inputHeight = fontSize(48) + 'px';
const BaseInput = Styled.TextInput<BaseTextFieldProps>`
   flex:9;
`;
const BaseTextFieldInputWrapper = Styled.View<ContainerProps>`
    width: 100%;
    flex-direction: row;
    border-style : solid;
    border-width : 1px;
    border-color : ${({ theme, lcColor }) => (lcColor ? lcColor : theme.color.grey100Grey900)};
    border-radius : 8px;
    ${({ theme }) => theme.font.Paragraph.md};
    height: ${inputHeight};
    padding: 14px 16px;
    gap: 8px;
    outline-color: ${({ theme }) => theme.color.primary};
    outline-style: solid;
`;

const Unit = Styled.Text`
  color: ${({ theme }) => theme.color.grey300};
  line-height: 20px;
  margin-left: 8px;
`;

const BaseTextFieldLabel = Styled.Text`
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: 20px;
  margin-bottom: 8px;
`;

const BaseTextFieldHint = Styled.Text`
color: ${({ theme }) => theme.color.grey500};
line-height: 20px;
margin-top: 8px;
`;

const BaseTextFieldContainer = Styled.View`
`;
const KeyboardTypeByInputType = {
  address: 'default',
  gas: 'numeric',
  search: 'default',
} as const;

interface BaseTextFieldComponentProps extends BaseTextFieldProps {
  style?: TextInputProps['style'];
  unit?: 'GWEI' | 'ETHER';
  type: keyof typeof KeyboardTypeByInputType;
}

interface BaseTextFieldProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  isValid?: boolean;
  scanable?: boolean;
}

interface ContainerProps {
  lcColor: string | null;
}
export function BaseTextField({ placeholder, isValid, value, onChange, scanable, style, unit, type, label, hint }: BaseTextFieldComponentProps) {
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
    <BaseTextFieldContainer>
      {label && <BaseTextFieldLabel>{label}</BaseTextFieldLabel>}
      <BaseTextFieldInputWrapper lcColor={lcColor}>
        <BaseInput
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
        {unit && <Unit>{unit}</Unit>}
        <TextFieldDelete onPress={clearTextField} style={{ marginLeft: 8 }} />
        {/* TODO: 스캔함수 작성되면 추가 필요*/}
        {scanable && <BlackScanIcon onPress={() => {}} style={{ marginLeft: 8 }} />}
      </BaseTextFieldInputWrapper>
      {hint && <BaseTextFieldHint>{hint}</BaseTextFieldHint>}
    </BaseTextFieldContainer>
  );
}
