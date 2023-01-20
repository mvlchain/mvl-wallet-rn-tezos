import { BigNumber } from 'bignumber.js';
import { TextInputProps } from 'react-native';

import { TGasUnit, TGasHint } from '@@constants/gas.constant';

export interface IGasTextFieldProps {
  defaultValue?: any;
  value?: BigNumber | null;
  setValue?: (value: BigNumber) => void;
  hint?: TGasHint;
  style?: TextInputProps['style'];
  unit?: TGasUnit;
  delay?: number;
  disabled?: boolean;
}
