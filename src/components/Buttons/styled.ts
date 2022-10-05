import Styled, { css } from 'styled-components/native';

import { BaseButtonWrapper, BaseButtonProps, BaseButtonLabelProps, BUTTON_TYPE, BUTTON_SIZE, IconWrapperProps, TextButtonLabelProps } from './type';

//Base
export const BaseButtonContainer = Styled.Pressable<BaseButtonWrapper>`
${({ size }) =>
  size === BUTTON_SIZE.SMALL
    ? null
    : css`
        width: 100%;
      `};
`;
export const BaseButton = Styled.View<BaseButtonProps>`
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: ${({ size }) => (size === BUTTON_SIZE.SMALL ? '40px' : '60px')};
  padding: 12px 16px ;
  background-color:${({ theme, pressed, disabled, bgColor, bgColorPressed, bgColorDisabled }) =>
    disabled ? theme.color[bgColorDisabled] : !disabled && pressed ? theme.color[bgColorPressed] : theme.color[bgColor]};
  border-color:${({ theme, lcColor }) => (lcColor ? theme.color[lcColor] : 'transparent')};
  border-style: solid;
  border-width: 1px;
`;
export const BaseButtonLabel = Styled.Text<BaseButtonLabelProps>`
  ${({ theme, size }) => (size === BUTTON_SIZE.SMALL ? theme.font.Label.sm : theme.font.Label.lg)};
  color: ${({ theme, disabled, txColor, txColorDisabled }) => (disabled ? theme.color[txColorDisabled] : theme.color[txColor])};
  font-Family:${({ theme }) => theme.fmRegular};
`;

//Social
export const SocialButton = Styled(BaseButton)`
  flex-direction: row;
`;
export const BoldLabel = Styled(BaseButtonLabel)`
  font-family: ${({ theme }) => theme.fmBold};
`;

export const IconWrapper = Styled.View<IconWrapperProps>`
  position: absolute;
  left: 16px;
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
`;
export const TextWrapper = Styled.View`
 flex-direction: row;
`;

//Text
export const TextButtonContainer = Styled.Pressable`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 12px 16px;
`;

export const TextButtonLabel = Styled.Text<TextButtonLabelProps>`
  ${({ theme }) => theme.font.Label.sm};
  color: ${({ theme, disabled }) => (disabled ? theme.color.fc06 : theme.color.cfc06)};
  background-color: ${({ theme, pressed }) => (pressed ? theme.color.bg02 : 'transparent')};
`;
