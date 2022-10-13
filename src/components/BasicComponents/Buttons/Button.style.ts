import styled, { css } from 'styled-components/native';

import { width } from '@@utils/ui';

import {
  BaseButtonWrapper,
  BaseButtonProps,
  BaseButtonLabelProps,
  BaseButtonStyleObj,
  BUTTON_SIZE,
  IconWrapperProps,
  TextButtonLabelProps,
} from './Button.type';

//Base
export const BaseButtonContainer = styled.Pressable<BaseButtonWrapper>`
  ${({ size }) =>
    size === BUTTON_SIZE.SMALL
      ? null
      : css`
          width: 100%;
        `};
`;
export const BaseButton = styled.View<BaseButtonProps>`
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${width * 8}px;
  height: ${({ size }) => (size === BUTTON_SIZE.SMALL ? `${width * 40}px` : `${width * 60}px`)};
  padding: ${width * 12}px ${width * 16}px;
  background-color: ${({ theme, pressed, disabled, bgColor, bgColorPressed, bgColorDisabled }) =>
    disabled ? theme.color[bgColorDisabled] : !disabled && pressed ? theme.color[bgColorPressed] : theme.color[bgColor]};
  border-color: ${({ theme, lcColor }) => (lcColor ? theme.color[lcColor] : 'transparent')};
  border-style: solid;
  border-width: ${width * 1}px;
`;
export const BaseButtonLabel = styled.Text<BaseButtonLabelProps>`
  ${({ theme, size }) => (size === BUTTON_SIZE.SMALL ? theme.font.Label.sm : theme.font.Label.lg)};
  color: ${({ theme, disabled, txColor, txColorDisabled }) => (disabled ? theme.color[txColorDisabled] : theme.color[txColor])};
  font-family: ${({ theme }) => theme.fmRegular};
`;

export const baseButtonStyleObj: BaseButtonStyleObj = {
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

export const IconWrapper = styled.View<IconWrapperProps>`
  position: absolute;
  left: ${width * 16}px;
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
`;
export const TextWrapper = styled.View`
  flex-direction: row;
`;

//Text
export const TextButtonContainer = styled.Pressable`
  align-items: center;
  justify-content: center;
  border-radius: ${width * 8}px;
`;

export const TextButtonLabel = styled.Text<TextButtonLabelProps>`
  ${({ theme }) => theme.font.Label.sm};
  color: ${({ theme, disabled }) => (disabled ? theme.color.primaryDarkest : theme.color.primary)};
  background-color: ${({ theme, pressed }) => (pressed ? theme.color.grey100Grey900 : 'transparent')};
`;
