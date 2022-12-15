import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { MODAL_TYPE, IGlobalModalStore, MODAL_PROPS } from './globalModalStore.type';
const globalModalStore = create<IGlobalModalStore>(
  zustandFlipper(
    (set) => ({
      modalType: null,
      modalProps: null,
      openModal: <K extends MODAL_TYPE>(modalType: K, modalProps: MODAL_PROPS<K>) =>
        set({ modalType, modalProps }, false, `openGlobalModal-${modalType}`),
      closeModal: () => set({ modalType: null, modalProps: null }, false, 'closeGlobalModal'),
    }),
    'globalModalStore'
  )
);
export default globalModalStore;
