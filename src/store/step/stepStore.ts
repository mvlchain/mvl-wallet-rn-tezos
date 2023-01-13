import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { IStep, IStepState } from './stepStore.type';

const initState: IStepState = {
  step: 0,
  max: null,
};

const stepStore = create<IStep>(
  zustandFlipper(
    (set, get) => ({
      ...initState,
      setMax: (max: number) => {
        set({ max });
      },
      nextStep: () => {
        const next = get().step++;
        const max = get().max;
        set({ step: max && Math.min(max, next) === max ? max : next });
      },
      jumpStep: (step: number) => {
        set({ step });
      },
      prevStep: () => {
        set({ step: Math.min(get().step--, 0) });
      },
      resetStep: () => {
        set({ step: 0, max: null });
      },
    }),
    'stepStore'
  )
);
export default stepStore;
