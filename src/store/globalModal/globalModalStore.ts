import create from 'zustand';

import { MODAL_TYPE, IGlobalModalStore, MODAL_PROPS } from './globalModalStore.type';
const globalModalStore = create<IGlobalModalStore>((set, get) => ({
  modalType: null,
  modalProps: null,
  openModal: <K extends MODAL_TYPE>(modalType: K, modalProps: MODAL_PROPS<K>) => {
    set({ modalType, modalProps });
  },
  closeModal: () => {
    set({ modalType: null, modalProps: null });
  },
}));
export default globalModalStore;
