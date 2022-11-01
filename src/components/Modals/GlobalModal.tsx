import globalModalStore from '@@store/globalModal/globalModalStore';

import SettingBottomModal from './SettingBottomModal';
import SettingSignOutModal from './SettingSignOutModal';
import TextModal from './TextModal';
import TitleOnlyModal from './TitleOnlyModal/TitleOnlyModal';

export const MODAL_TYPES = {
  TEXT_MODAL: 'TEXT_MODAL',
  SETTING_BOTTOM: 'SETTING_BOTTOM',
  SETTING_LOG_OUT: 'SETTING_LOG_OUT',
  TITLE_ONLY: 'TITLE_ONLY',
} as const;

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.TEXT_MODAL]: TextModal,
  [MODAL_TYPES.SETTING_BOTTOM]: SettingBottomModal,
  [MODAL_TYPES.SETTING_LOG_OUT]: SettingSignOutModal,
  [MODAL_TYPES.TITLE_ONLY]: TitleOnlyModal,
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
