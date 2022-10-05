import React from 'react';

import { TextProps, ViewProps } from 'react-native';
import Styled from 'styled-components/native';

interface Label {
  disabled?: boolean;
  pressed?: boolean;
}

interface ComponentProps {
  label: string;
  disabled: boolean;
  wrapperStyle?: ViewProps['style'];
  textStyle?: TextProps['style'];
  onPress(): void;
}

const BaseButtonContainer = Styled.Pressable`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 12px 16px;
`;

const Text = Styled.Text<Label>`
  ${({ theme }) => theme.font.Label.sm};
  color: ${({ theme, disabled }) => (disabled ? theme.color.cfc07 : theme.color.cfc06)};
  background-color: ${({ theme, pressed }) => (pressed ? theme.color.cbg03 : 'transparent')};
`;

export function TextButton({ label, onPress, disabled, wrapperStyle, textStyle }: ComponentProps) {
  return (
    <BaseButtonContainer onPress={onPress} style={wrapperStyle}>
      {({ pressed }) => (
        <Text pressed={pressed} style={textStyle} disabled={disabled}>
          {label}
        </Text>
      )}
    </BaseButtonContainer>
  );
}
