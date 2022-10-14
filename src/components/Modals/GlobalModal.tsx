import globalModalStore from '@@store/globalModal/globalModalStore';
import { MODAL_TYPE, MODAL_TYPES } from '@@store/globalModal/globalModalStore.type';

import { TestModal } from './TestModal';

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.TEST_MODAL]: TestModal,
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
