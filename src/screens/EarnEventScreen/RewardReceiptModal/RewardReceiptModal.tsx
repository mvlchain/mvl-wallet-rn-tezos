import React from 'react';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import WebViewModal from '@@components/BasicComponents/Modals/WebViewModal';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { IRewardReceiptModalProps } from './RewardReceiptModal.type';

function RewardReceiptModal({ url, cancelLabel, onCancel, confirmLabel, onConfirm, isConfirmDisabled }: IRewardReceiptModalProps) {
  const { modalType, closeModal } = globalModalStore();

  return (
    <WebViewModal
      url={url}
      isVisible={modalType === MODAL_TYPES.REWARD_RECEIPT}
      cancelLabel={cancelLabel}
      onCancel={onCancel}
      confirmLabel={confirmLabel}
      onConfirm={() => {
        closeModal();
      }}
      isConfirmDisabled={isConfirmDisabled}
      onBackDropPress={() => {
        closeModal();
      }}
    />
  );
}

export default RewardReceiptModal;
