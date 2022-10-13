import create from 'zustand';

import { MODAL_TYPE, GlobalModalStore, MODAL_PROPS } from './types';
const useGlobalModalStore = create<GlobalModalStore>((set, get) => ({
  modalType: null,
  modalProps: null,
  openModal: <K extends MODAL_TYPE>(modalType: K, modalProps: MODAL_PROPS<K>) => {
    set({ modalType, modalProps });
  },
  closeModal: () => {
    set({ modalType: null, modalProps: null });
  },
}));
export default useGlobalModalStore;
