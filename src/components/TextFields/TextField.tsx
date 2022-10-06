//enabled
//focus typing
//negative
//complete
//placehold

//단위
//엑스아이콘
//코드스캔

//decimal

import { useState } from 'react';

import { TextInputProps } from 'react-native';
import Styled from 'styled-components/native';

import { theme } from '@@style/theme';

const Input = Styled.TextInput<DecimalTextFieldProps>`
    ${({ theme }) => theme.font.Paragraph.md};
    border-style : solid;
    border-width : 1px;
    border-color : ${({ theme }) => theme.color.grey100Grey900};
    border-radius : 8px;
    width: 100%;
    height: 48px;
    padding: 14px 16px;

`;

interface DecimalTextFieldComponentProps extends DecimalTextFieldProps {
  style?: TextInputProps['style'];
}

interface DecimalTextFieldProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  isValid?: boolean;
  scanable?: boolean;
}

export function DecimalTextField({ placeholder, isValid, value, onChange, scanable, style }: DecimalTextFieldComponentProps) {
  return (
    <Input
      placeholder={placeholder}
      //스토어에 theme 들어오면 수정필요
      placeholderTextColor={theme.light.color.grey300Grey700}
      isValid={isValid}
      value={value}
      onChange={onChange}
      scanable={scanable}
      style={style}
    />
  );
}
