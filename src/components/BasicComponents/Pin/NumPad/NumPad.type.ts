import { TBackspace, TBioAuth, TSetPassword } from '@@components/BasicComponents/Pin/PinLayout/usePin.type';
import { NUMPAD } from '@@constants/pin.constant';

export type TNumPadType = typeof NUMPAD[keyof typeof NUMPAD];
export interface INumPadProps {
  type: TNumPadType;
  text?: string;
  backSpace?: TBackspace;
  bioAuth?: TBioAuth;
  setPassword?: TSetPassword;
}
