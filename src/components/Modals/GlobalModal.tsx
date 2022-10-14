import globalModalStore from '@@store/globalModal/globalModalStore';
import { MODAL_TYPE } from '@@store/globalModal/globalModalStore.type';

import { TextModal } from './TextModal';

export const MODAL_TYPES = {
  TEXT_MODAL: 'TEXT_MODAL',
} as const;

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.TEXT_MODAL]: TextModal,
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
