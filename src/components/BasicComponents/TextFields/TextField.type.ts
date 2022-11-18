import { TextInputProps, TextInputChangeEventData } from 'react-native';

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

export interface ITextFieldContainerProps {
  lcColor: string | null;
}

//TradeVolume
export interface ITradeVolumeComponentProps {
  useMax?: boolean;
  onSelect?: () => void;
  label?: string;
  symbol?: string;
  value?: string;
  //TODO: input에 맞는 타입뭐냐
  onChange?: (amount: any) => void;
  hint?: string;
}
