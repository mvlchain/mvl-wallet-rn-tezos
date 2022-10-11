import { TextInputProps } from 'react-native';

import { KeyboardTypeByInputType } from './BaseTextField';

//Base
export interface BaseTextFieldComponentProps extends BaseTextFieldProps {
  style?: TextInputProps['style'];
  unit?: 'GWEI' | 'ETHER';
  type: keyof typeof KeyboardTypeByInputType;
}

export interface BaseTextFieldProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  isValid?: boolean;
  scanable?: boolean;
}

export interface ContainerProps {
  lcColor: string | null;
}

//TradeVolume
export interface TradeVolumeComponentProps {
  useMax: boolean;
  onSelect: () => void;
  label: string;
  symbol: string;
  value: string;
  onChange: () => void;
  hint: string;
}
