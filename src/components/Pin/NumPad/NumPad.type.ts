import { NUMPAD } from '@@constants/pin.constant';

export type TNumPadType = typeof NUMPAD[keyof typeof NUMPAD];
export interface INumPadProps {
  type: TNumPadType;
  text?: number | null;
}
