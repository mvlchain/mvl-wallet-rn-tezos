import { PIN_LAYOUT, PIN_MODE, PIN_STEP } from '@@constants/pin.constant';

export interface PinstoreInitialDTO {
  pinModalResolver: Function | null;
  pinModalRejector: Function | null;
  pinMode: TPinMode | null;
  error: TError | null;
  showError: boolean;
  step: TPinStep;
  layout: TPinLayout;
}

export interface PinStore extends PinstoreInitialDTO {
  setState: TSetState<PinStore>;
  success: (pin: string) => void;
  fail: (message: string) => void;
  resetStore: () => void;
}

export type TError = {
  message: string;
};

export type TPinMode = typeof PIN_MODE[keyof typeof PIN_MODE];
export type TPinStep = typeof PIN_STEP[keyof typeof PIN_STEP];
export type TPinLayout = typeof PIN_LAYOUT[keyof typeof PIN_LAYOUT];
export type TSetState<T> = (newState: Partial<Omit<T, 'setState'>>) => void;
