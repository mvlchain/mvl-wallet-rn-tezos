import { Dispatch, ReactNode, SetStateAction } from 'react';

import { BigNumber } from 'ethers';
import { TextInputProps, TextInputChangeEventData } from 'react-native';
import { SvgProps } from 'react-native-svg/lib/typescript/elements/Svg';

import { WALLET_TOKEN } from '@@constants/token.constant';

import { KeyboardTypeByInputType } from './BaseTextField';
//Base
export interface IBaseTextFieldComponentProps extends IBaseTextFieldProps {
  style?: TextInputProps['style'];
  unit?: 'GWEI' | 'ETHER';
  type: keyof typeof KeyboardTypeByInputType;
}

export interface IBaseTextFieldProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  isValid?: boolean;
  scanable?: boolean;
}

export interface IGasTextFieldProps {
  value: BigNumber | null;
  setValue: Dispatch<SetStateAction<BigNumber | null>> | Dispatch<SetStateAction<BigNumber>>;
  hint?: string;
  style?: TextInputProps['style'];
  unit?: 'gwei' | 'ether';
}

export interface ITextFieldContainerProps {
  lcColor: string | null;
}

//TradeVolume
export interface ITradeVolumeComponentProps {
  useMax?: boolean;
  onSelect?: () => void;
  label?: string;
  symbol?: keyof typeof WALLET_TOKEN;
  value: BigNumber | null;
  onChange: (amount: any) => void;
  hint?: string;
}
