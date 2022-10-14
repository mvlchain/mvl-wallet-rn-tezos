import { TextProps, ViewProps } from 'react-native';

import { CommonColor, ThemeColor } from '@@style/theme';

//Base
export const BUTTON_SIZE = { SMALL: 'small', DEFAULT: 'default' } as const;
export const BUTTON_TYPE = { PRIMARY: 'primary', SECONDARY: 'secondary', OUTLINE: 'outline', BLACK: 'black' } as const;

export type TButtonType = typeof BUTTON_TYPE[keyof typeof BUTTON_TYPE];
export type TButtonSizeType = typeof BUTTON_SIZE[keyof typeof BUTTON_SIZE];
export interface IBaseButtonWrapper {
  size?: TButtonSizeType;
}
export interface IBaseButtonProps {
  bgColor: CommonColor | ThemeColor;
  bgColorPressed: CommonColor | ThemeColor;
  bgColorDisabled: CommonColor | ThemeColor;
  lcColor?: CommonColor | ThemeColor;
  pressed?: boolean;
  disabled?: boolean;
  size?: TButtonSizeType;
}
export interface IBaseButtonLabelProps {
  txColor: CommonColor | ThemeColor;
  txColorDisabled: CommonColor | ThemeColor;
  disabled?: boolean;
  size?: TButtonSizeType;
}
export interface IBaseButtonStyleProps {
  bg: IBaseButtonProps;
  tx: IBaseButtonLabelProps;
}

export interface IBaseButtonStyleObj {
  primary: IBaseButtonStyleProps;
  secondary: IBaseButtonStyleProps;
  outline: IBaseButtonStyleProps;
  black: IBaseButtonStyleProps;
}

export interface IBaseButtonComponentProps {
  label?: string;
  disabled?: boolean;
  wrapperStyle?: ViewProps['style'];
  buttonStyle?: ViewProps['style'];
  textStyle?: TextProps['style'];
  size?: TButtonSizeType;
  onPress: Function;
}
//Social
export interface IIconWrapperProps {
  disabled?: boolean;
}
//Text
export interface ITextButtonLabelProps {
  disabled?: boolean;
  pressed?: boolean;
}

export interface ITextButtonComponentProps {
  label: string;
  disabled: boolean;
  wrapperStyle?: ViewProps['style'];
  textStyle?: TextProps['style'];
  onPress: Function;
}
