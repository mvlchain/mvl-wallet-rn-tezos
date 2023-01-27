import zustandFlipper from 'react-native-flipper-zustand';
import create from 'zustand';

import { MODAL_TYPE, IGlobalModalStore, MODAL_PROPS } from './globalModalStore.type';

/**
 * TODO:
 *  - closeModal을 실행할 경우 파라미터로 모달 아이디를 주고, 결과를 받을 수 있도록 해보자
 */
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
