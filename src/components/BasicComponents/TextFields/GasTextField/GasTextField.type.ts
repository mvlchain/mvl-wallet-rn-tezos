import { BigNumber } from 'bignumber.js';
import { TextInputProps } from 'react-native';

import { TGasUnit } from '@@constants/gas.constant';

//Base

export interface IGasTextFieldProps {
  defaultValue?: any;
  value?: BigNumber | null;
  setValue?: (value: BigNumber) => void;
  hint?: string;
  style?: TextInputProps['style'];
  unit?: TGasUnit;
  delay?: number;
  disabled?: boolean;
  setParentValid: (valid: boolean) => void;
}
