import { BigNumber } from 'bignumber.js';
import { TextInputProps } from 'react-native';

import { TGasUnit } from '@@constants/gas.constant';

import { TGasHint } from '../../GasFeeBoard/GasFeeInputs/GasFeeInputs.type';

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
