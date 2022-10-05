import React from 'react';

import { Pressable, TextProps, ViewProps } from 'react-native';
import Styled, { css } from 'styled-components/native';

import { CommonColor, ThemeColor } from '@@style/theme';

type ButtonType = 'primary' | 'secondary' | 'outline' | 'black' | 'text' | 'outlineText';
type ButtonSizeType = 'small' | 'default';
interface Wrapper {
  size?: ButtonSizeType;
}
interface BackGround {
  bgColor: CommonColor | ThemeColor;
  bgColorPressed: CommonColor | ThemeColor;
  bgColorDisabled: CommonColor | ThemeColor;
  lcColor?: CommonColor | ThemeColor;
  pressed?: boolean;
  disabled?: boolean;
  size?: ButtonSizeType;
}
interface Label {
  txColor: CommonColor | ThemeColor;
  txColorDisabled: CommonColor | ThemeColor;
  disabled?: boolean;
  size?: ButtonSizeType;
}
interface BaseStyle {
  type: ButtonType;
  bg: BackGround;
  tx: Label;
}
interface ComponentProps {
  label: string;
  disabled: boolean;
  wrapperStyle?: ViewProps['style'];
  buttonStyle?: ViewProps['style'];
  textStyle?: TextProps['style'];
  size?: ButtonSizeType;
  onPress(): void;
}

const styles: BaseStyle[] = [
  {
    type: 'primary',
    bg: {
      bgColor: 'cbg01',
      bgColorPressed: 'cbg06',
      bgColorDisabled: 'bg09',
    },
    tx: {
      txColor: 'cfc01',
      txColorDisabled: 'fc05',
    },
  },
  {
    type: 'secondary',
    bg: {
      bgColor: 'bg02',
      bgColorPressed: 'bg08',
      bgColorDisabled: 'bg02',
    },
    tx: {
      txColor: 'fc01',
      txColorDisabled: 'fc05',
    },
  },
  {
    type: 'outline',
    bg: {
      bgColor: 'cbg05',
      bgColorPressed: 'cbg03',
      bgColorDisabled: 'cbg05',
      lcColor: 'lc03',
    },
    tx: {
      txColor: 'cfc05',
      txColorDisabled: 'cfc04',
    },
  },
  {
    type: 'black',
    bg: {
      bgColor: 'bg05',
      bgColorPressed: 'bg06',
      bgColorDisabled: 'bg07',
    },
    tx: {
      txColor: 'fc02',
      txColorDisabled: 'fc04',
    },
  },
  {
    type: 'text',
    bg: {
      bgColor: 'bg05',
      bgColorPressed: 'bg06',
      bgColorDisabled: 'bg07',
    },
    tx: {
      txColor: 'fc02',
      txColorDisabled: 'fc04',
    },
  },
];

const BaseButtonContainer = Styled.Pressable<Wrapper>`
${({ size }) =>
  size === 'small'
    ? null
    : css`
        width: 100%;
      `};
`;
const ButtonBase = Styled.View<BackGround>`
width:100%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: ${({ size }) => (size === 'small' ? '40px' : '60px')};
  padding: 12px 16px ;
  background-color:${({ theme, pressed, disabled, bgColor, bgColorPressed, bgColorDisabled }) =>
    disabled ? theme.color[bgColorDisabled] : !disabled && pressed ? theme.color[bgColorPressed] : theme.color[bgColor]};
  border-color:${({ theme, lcColor }) => (lcColor ? theme.color[lcColor] : 'transparent')};
  border-style:solid;
  border-width:1px;
`;
const Text = Styled.Text<Label>`
  ${({ theme, size }) => (size === 'small' ? theme.font.Label.sm : theme.font.Label.lg)};
  color: ${({ theme, disabled, txColor, txColorDisabled }) => (disabled ? theme.color[txColorDisabled] : theme.color[txColor])};
  font-Family:${({ theme }) => theme.fmRegular};
`;

const generator = () =>
  styles.map(
    (baseStyle) =>
      function Button({ label, onPress, disabled, wrapperStyle, buttonStyle, textStyle, size }: ComponentProps) {
        return (
          <BaseButtonContainer onPress={onPress} size={size} style={wrapperStyle}>
            {({ pressed }) => (
              <ButtonBase pressed={pressed} disabled={disabled} {...baseStyle.bg} size={size} style={buttonStyle}>
                <Text {...baseStyle.tx} size={size} style={textStyle} disabled={disabled}>
                  {label}
                </Text>
              </ButtonBase>
            )}
          </BaseButtonContainer>
        );
      }
  );

export const [PrimaryButton, SecondaryButton, OutlineButton, BlackButton] = generator();
