import { TGasUnit } from '@@constants/gas.constant';
export interface IGasInputs {
  label: string;
  hint?: null | { text: string; color: string };
  unit?: TGasUnit;
  value: any;
  setValue: (value: any) => void;
}
