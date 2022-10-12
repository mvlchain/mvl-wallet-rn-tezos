import create from 'zustand';

interface GlobalModalStore {
  isOpened: boolean;
  targetModalName: string;
  open: (modalName: string) => void;
  close: () => void;
}

const useGlobalModalStore = create<GlobalModalStore>((set, get) => ({
  isOpened: false,
  targetModalName: '',
  open: (modalName: string) => {
    set({ isOpened: true, targetModalName: modalName });
  },
  close: () => {
    set({ isOpened: false, targetModalName: '' });
  },
}));
export default useGlobalModalStore;
