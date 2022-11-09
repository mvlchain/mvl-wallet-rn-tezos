import globalModalStore from '@@store/globalModal/globalModalStore';

import BottomSelectModal from './BottomSelectModal';
import SettingSignOutModal from './SettingSignOutModal';
import TextModal from './TextModal';
import TitleOnlyModal from './TitleOnlyModal/TitleOnlyModal';
import WalletListModal from './WalletListModal';

export const MODAL_TYPES = {
  TEXT_MODAL: 'TEXT_MODAL',
  BOTTOM_SELECT: 'BOTTOM_SELECT',
  SETTING_LOG_OUT: 'SETTING_LOG_OUT',
  TITLE_ONLY: 'TITLE_ONLY',
  WALLET_LIST: 'WALLET_LIST',
} as const;

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.TEXT_MODAL]: TextModal,
  [MODAL_TYPES.BOTTOM_SELECT]: BottomSelectModal,
  [MODAL_TYPES.SETTING_LOG_OUT]: SettingSignOutModal,
  [MODAL_TYPES.TITLE_ONLY]: TitleOnlyModal,
  [MODAL_TYPES.WALLET_LIST]: WalletListModal,
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
