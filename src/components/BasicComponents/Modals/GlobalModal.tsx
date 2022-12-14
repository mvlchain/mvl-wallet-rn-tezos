import RewardReceiptModal from '@@screens/EarnEventScreen/RewardReceiptModal/RewardReceiptModal';
import globalModalStore from '@@store/globalModal/globalModalStore';

import ViewScanModal from '../ViewScanButton/ViewScanModal';

import BottomSelectModal from './BottomSelectModal';
import SettingSignOutModal from './SettingSignOutModal';
import TextInputModal from './TextInputModal';
import TextModal from './TextModal';
import TitleOnlyModal from './TitleOnlyModal/TitleOnlyModal';
import ConfirmSendModal from './Transaction/ConfirmSendModal/ConfirmSendModal';
import ConfirmTxPinModal from './Transaction/Pin/ConfirmTxPinModal';
import WalletListModal from './WalletListModal';

export const MODAL_TYPES = {
  TEXT_MODAL: 'TEXT_MODAL',
  TEXT_INPUT: 'TEXT_INPUT',
  BOTTOM_SELECT: 'BOTTOM_SELECT',
  SETTING_LOG_OUT: 'SETTING_LOG_OUT',
  TITLE_ONLY: 'TITLE_ONLY',
  WALLET_LIST: 'WALLET_LIST',
  CONFIRM_SEND: 'CONFIRM_SEND',
  CONFIRM_TX_PIN: 'CONFIRM_TX_PIN',
  REWARD_RECEIPT: 'REWARD_RECEIPT',
  VIEW_SCAN: 'VIEW_SCAN',
} as const;

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.TEXT_MODAL]: TextModal,
  [MODAL_TYPES.BOTTOM_SELECT]: BottomSelectModal,
  [MODAL_TYPES.SETTING_LOG_OUT]: SettingSignOutModal,
  [MODAL_TYPES.TITLE_ONLY]: TitleOnlyModal,
  [MODAL_TYPES.WALLET_LIST]: WalletListModal,
  [MODAL_TYPES.TEXT_INPUT]: TextInputModal,
  [MODAL_TYPES.CONFIRM_SEND]: ConfirmSendModal,
  [MODAL_TYPES.CONFIRM_TX_PIN]: ConfirmTxPinModal,
  [MODAL_TYPES.REWARD_RECEIPT]: RewardReceiptModal,
  [MODAL_TYPES.VIEW_SCAN]: ViewScanModal,
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
