export interface IStep extends IStepState {
  nextStep: () => void;
  jumpStep: (step: number) => void;
  prevStep: () => void;
  resetStep: () => void;
  setMax: (max: number) => void;
}

export interface IStepState {
  step: number;
  max: number | null;
}
