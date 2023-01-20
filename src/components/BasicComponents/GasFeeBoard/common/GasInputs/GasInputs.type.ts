import { TGasUnit, TGasHint } from '@@constants/gas.constant';

export interface IGasInputs {
  label: string;
  hint?: TGasHint;
  unit?: TGasUnit;
  value: any;
  setValue: (value: any) => void;
}
