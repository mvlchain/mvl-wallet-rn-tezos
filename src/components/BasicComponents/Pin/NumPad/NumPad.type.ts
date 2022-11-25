import { NUMPAD } from '@@constants/pin.constant';
import { TBackspace, TBioAuth, TSetPassword } from '@@hooks/pin/usePin.type';

export type TNumPadType = typeof NUMPAD[keyof typeof NUMPAD];
export interface INumPadProps {
  type: TNumPadType;
  text?: string;
  backSpace?: TBackspace;
  bioAuth?: TBioAuth;
  setPassword?: TSetPassword;
}
