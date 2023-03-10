import { StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';

import { height, width } from '@@utils/ui';

import * as Type from './Button.type';

//Base
export const BaseButtonContainer = styled.Pressable<Type.IBaseButtonWrapper>`
  ${({ size }) =>
    size === Type.BUTTON_SIZE.FIT
      ? css`
          flex-wrap: wrap;
          flex-direction: row;
          align-items: baseline;
        `
      : size === Type.BUTTON_SIZE.SMALL
      ? null
      : css`
          width: 100%;
        `};
`;
export const BaseButton = styled.View<Type.IBaseButtonProps>`
  ${({ size }) =>
    size === Type.BUTTON_SIZE.FIT
      ? null
      : css`
          width: 100%;
        `};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${width * 8}px;
  padding: ${({ size }) =>
      size === Type.BUTTON_SIZE.SMALL ? `${height * 12}` : size === Type.BUTTON_SIZE.FIT ? `${height * 12}` : `${height * 18}`}px
    ${width * 16}px;
  background-color: ${({ theme, pressed, disabled, bgColor, bgColorPressed, bgColorDisabled }) =>
    disabled ? theme.color[bgColorDisabled] : !disabled && pressed ? theme.color[bgColorPressed] : theme.color[bgColor]};
  opacity: ${({ pressed }) => (pressed ? 0.7 : 1)};
  border-color: ${({ theme, lcColor }) => (lcColor ? theme.color[lcColor] : 'transparent')};
  border-style: solid;
  border-width: ${width * 1}px;
`;

export const BaseButtonIconWrapper = styled.View`
  margin-right: ${width * 12}px;
`;

export const BaseButtonLabel = styled.Text<Type.IBaseButtonLabelProps>`
  ${({ theme, size }) =>
    size === Type.BUTTON_SIZE.SMALL ? theme.font.Label.sm : size === Type.BUTTON_SIZE.FIT ? theme.font.Label.sm : theme.font.Label.lg};
  color: ${({ theme, disabled, txColor, txColorDisabled }) => (disabled ? theme.color[txColorDisabled] : theme.color[txColor])};
  font-family: ${({ theme }) => theme.fmRegular};
`;

export const baseButtonStyleObj: Type.IBaseButtonStyleObj = {
  primary: {
    bg: {
      bgColor: 'primary',
      bgColorPressed: 'medium',
      bgColorDisabled: 'lightestDarkest',
    },
    tx: {
      txColor: 'white',
      txColorDisabled: 'grey300Grey700',
    },
  },
  secondary: {
    bg: {
      bgColor: 'grey100Grey900',
      bgColorPressed: 'grey300Grey800',
      bgColorDisabled: 'grey100Grey900',
    },
    tx: {
      txColor: 'blackWhite',
      txColorDisabled: 'grey300Grey700',
    },
  },
  outline: {
    bg: {
      bgColor: 'white',
      bgColorPressed: 'grey100',
      bgColorDisabled: 'white',
      lcColor: 'grey100Transparent',
    },
    tx: {
      txColor: 'black',
      txColorDisabled: 'grey300',
    },
  },
  black: {
    bg: {
      bgColor: 'grey900White',
      bgColorPressed: 'blackGrey100',
      bgColorDisabled: 'grey300White',
    },
    tx: {
      txColor: 'whiteBlack',
      txColorDisabled: 'whiteGrey300',
    },
  },
};

//Social
export const SocialButton = styled(BaseButton)`
  flex-direction: row;
`;
export const BoldLabel = styled(BaseButtonLabel)`
  font-family: ${({ theme }) => theme.fmBold};
`;

export const IconWrapper = styled.View<Type.IIconWrapperProps>`
  position: absolute;
  left: ${width * 16}px;
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
`;
export const TextWrapper = styled.View`
  flex-direction: row;
`;

//Text
export const TextButtonContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${width * 8}px;
`;

export const TextButtonLabel = styled.Text<Type.ITextButtonLabelProps>`
  ${({ theme }) => theme.font.Label.sm};
  color: ${({ theme, disabled }) => (disabled ? theme.color.primaryDarkest : theme.color.primary)};
  background-color: ${({ theme, pressed }) => (pressed ? theme.color.grey100Grey900 : 'transparent')};
`;

export const inlineStyle = StyleSheet.create({
  textIcon: {
    marginRight: width * 8,
  },
});
