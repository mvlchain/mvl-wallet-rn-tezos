import { TextInputProps } from 'react-native';

import { TGasUnit } from '@@constants/gas.constant';

export interface IBaseTextFieldComponentProps extends IBaseTextFieldProps {
  style?: TextInputProps['style'];
  unit?: TGasUnit;
}

export interface IBaseTextFieldProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  hint?: string | null;
  isValid?: boolean;
  scanable?: boolean;
  gotoScan?: Function;
}
export interface ITextFieldContainerProps {
  lcColor: string | null;
  editable?: boolean;
}
