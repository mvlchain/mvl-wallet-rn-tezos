import { useState } from 'react';

import { TextInputProps, Text } from 'react-native';
import Styled from 'styled-components/native';

import { BlackScanIcon, TextFieldDelete } from '@@assets/image';
import { theme } from '@@style/theme';
import { fontSize } from '@@utils/ui';

//height를 어떻게 해야하지? 글씨크기를 상대적으로 할거면 모두다 그렇게 해야하는거 아닌가
const inputHeight = fontSize(48) + 'px';
const BaseInput = Styled.TextInput<BaseTextFieldProps>`
   flex:9;
`;
const BaseTextFieldContainer = Styled.View`
    width: 100%;
    flex-direction: row;
    border-style : solid;
    border-width : 1px;
    border-color : ${({ theme }) => theme.color.grey100Grey900};
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
  isValid?: boolean;
  scanable?: boolean;
}

export function BaseTextField({ placeholder, isValid, value, onChange, scanable, style, unit, type }: BaseTextFieldComponentProps) {
  const clearTextField = () => {
    onChange('');
  };

  return (
    <BaseTextFieldContainer>
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
      />
      {unit && <Unit>{unit}</Unit>}
      <TextFieldDelete onPress={clearTextField} style={{ marginLeft: 8 }} />
      {/* TODO: 스캔함수 작성되면 추가 필요*/}
      {scanable && <BlackScanIcon onPress={() => {}} style={{ marginLeft: 8 }} />}
    </BaseTextFieldContainer>
  );
}
