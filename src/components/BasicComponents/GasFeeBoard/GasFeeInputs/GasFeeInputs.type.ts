export type TGasHint = {
  text: string;
  color: string;
} | null;
export interface IGasFeeInputsProps {
  enableTip: boolean;
  enableLimitCustom: boolean;
  baseFeeCheck: TGasHint;
  tipCheck: TGasHint;
  gasCheck: TGasHint;
}
