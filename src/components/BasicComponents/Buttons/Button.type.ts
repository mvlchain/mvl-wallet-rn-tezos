import { TextProps, ViewProps } from 'react-native';

import { CommonColor, ThemeColor } from '@@style/theme';

//Base
export const BUTTON_SIZE = { SMALL: 'small', DEFAULT: 'default' } as const;
export const BUTTON_TYPE = { PRIMARY: 'primary', SECONDARY: 'secondary', OUTLINE: 'outline', BLACK: 'black' } as const;

export type ButtonType = typeof BUTTON_TYPE[keyof typeof BUTTON_TYPE];
export type ButtonSizeType = typeof BUTTON_SIZE[keyof typeof BUTTON_SIZE];
export interface BaseButtonWrapper {
  size?: ButtonSizeType;
}
export interface BaseButtonProps {
  bgColor: CommonColor | ThemeColor;
  bgColorPressed: CommonColor | ThemeColor;
  bgColorDisabled: CommonColor | ThemeColor;
  lcColor?: CommonColor | ThemeColor;
  pressed?: boolean;
  disabled?: boolean;
  size?: ButtonSizeType;
}
export interface BaseButtonLabelProps {
  txColor: CommonColor | ThemeColor;
  txColorDisabled: CommonColor | ThemeColor;
  disabled?: boolean;
  size?: ButtonSizeType;
}
export interface BaseButtonStyle {
  bg: BaseButtonProps;
  tx: BaseButtonLabelProps;
}

export interface BaseButtonStyleObj {
  primary: BaseButtonStyle;
  secondary: BaseButtonStyle;
  outline: BaseButtonStyle;
  black: BaseButtonStyle;
}

export interface BaseButtonComponentProps {
  label?: string;
  disabled?: boolean;
  wrapperStyle?: ViewProps['style'];
  buttonStyle?: ViewProps['style'];
  textStyle?: TextProps['style'];
  size?: ButtonSizeType;
  onPress(): void;
}
//Social
export interface IconWrapperProps {
  disabled?: boolean;
}
//Text
export interface TextButtonLabelProps {
  disabled?: boolean;
  pressed?: boolean;
}

export interface TextButtonComponentProps {
  label: string;
  disabled: boolean;
  wrapperStyle?: ViewProps['style'];
  textStyle?: TextProps['style'];
  onPress(): void;
}
