import { MODAL_TYPE, MODAL_TYPES } from '@@store/globalModal/types';
import useGlobalModalStore from '@@store/globalModal/useGlobalModalStore';

import { TestModal } from './TestModal';
import { TostModal } from './TostModal';

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.TEST_MODAL]: TestModal,
  [MODAL_TYPES.TOST_MODAL]: TostModal,
};

export const GlobalModal = () => {
  const { modalType, modalProps } = useGlobalModalStore();
  if (!modalType) {
    return null;
  }
  const ModalComponent = MODAL_COMPONENTS[modalType];
  if (!ModalComponent) {
    return null;
  }
  return <ModalComponent {...modalProps} />;
};
