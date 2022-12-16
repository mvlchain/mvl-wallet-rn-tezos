import { BigNumber } from 'bignumber.js';
import { TextInputProps } from 'react-native';

import { TGasUnit } from '@@constants/gas.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';

import { KeyboardTypeByInputType } from './BaseTextField';
//Base
export interface IBaseTextFieldComponentProps extends IBaseTextFieldProps {
  style?: TextInputProps['style'];
  unit?: TGasUnit;
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
  gotoScan?: Function;
}

export interface IGasTextFieldProps {
  defaultValue?: any;
  value?: BigNumber | null;
  setValue?: (value: BigNumber) => void;
  hint?: string;
  style?: TextInputProps['style'];
  unit?: TGasUnit;
  delay?: number;
  disabled?: boolean;
}

export interface ITextFieldContainerProps {
  lcColor: string | null;
  editable?: boolean;
}

//TradeVolume
export interface ITradeVolumeComponentProps {
  useMax?: boolean;
  onSelect?: () => void;
  label?: string;
  tokenDto: TokenDto;
  value?: BigNumber | null;
  onChange: (amount: any) => void;
  hint?: string;
  iconUrl?: string;
  disableHint?: boolean;
  debounceTime?: number;
}
