import globalModalStore from '@@store/globalModal/globalModalStore';

import SettingBottomModal from './SettingBottomModal/SettingBottomModal';
import { TextModal } from './TextModal';

export const MODAL_TYPES = {
  TEXT_MODAL: 'TEXT_MODAL',
  SETTING_BOTTOM: 'SETTING_BOTTOM',
} as const;

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.TEXT_MODAL]: TextModal,
  [MODAL_TYPES.SETTING_BOTTOM]: SettingBottomModal,
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
