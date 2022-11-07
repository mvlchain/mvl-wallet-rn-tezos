import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { MODAL_TYPE, IGlobalModalStore, MODAL_PROPS } from './globalModalStore.type';
const globalModalStore = create<IGlobalModalStore>()(
  devtools(
    (set) => ({
      modalType: null,
      modalProps: null,
      openModal: <K extends MODAL_TYPE>(modalType: K, modalProps: MODAL_PROPS<K>) =>
        set({ modalType, modalProps }, false, `openGlobalModal-${modalType}-${JSON.stringify(modalProps)}`),
      closeModal: () => set({ modalType: null, modalProps: null }, false, 'closeGlobalModal'),
    }),
    { name: 'globalModalStore', enabled: __DEV__ }
  )
);
export default globalModalStore;
