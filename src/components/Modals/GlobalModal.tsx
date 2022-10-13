import globalModalStore from '@@store/globalModal/globalModalStore';
import { MODAL_TYPE, MODAL_TYPES } from '@@store/globalModal/globalModalStore.types';

import { TestModal } from './TestModal';
import { TostModal } from './TostModal';

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.TEST_MODAL]: TestModal,
  [MODAL_TYPES.TOST_MODAL]: TostModal,
};

export const GlobalModal = () => {
  const { modalType, modalProps } = globalModalStore();
  if (!modalType) {
    return null;
  }
  const ModalComponent = MODAL_COMPONENTS[modalType];
  if (!ModalComponent) {
    return null;
  }
  //@ts-ignore
  return <ModalComponent {...modalProps} />;
};
