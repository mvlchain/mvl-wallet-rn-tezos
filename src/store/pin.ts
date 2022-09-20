import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type Mode = 'choose' | 'enter' | 'locked';
interface PinstoreInitialDTO {
  mode: Mode;
  pinModalResolver: Function | undefined;
  pinModalRejector: Function | undefined;
}
interface PinStore extends PinstoreInitialDTO {
  isOpen: boolean;
  open: Function;
  close: Function;
  success: (pin: string) => void;
  fail: (message: string) => void;
  init: (init: PinstoreInitialDTO) => void;
  destroy: Function;
}

export const usePinStore = create<PinStore>((set, get) => ({
  isOpen: false,
  mode: 'enter',
  pinModalResolver: () => {},
  pinModalRejector: () => {},
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  success: (pin: string) => {
    get().pinModalResolver?.(pin);
  },
  fail: (message: string) => {
    get().pinModalRejector?.(message);
  },
  init: ({ mode, pinModalResolver, pinModalRejector }) => set({ mode: mode, pinModalResolver: pinModalResolver, pinModalRejector: pinModalRejector }),
  destroy: () => set({}),
}));
