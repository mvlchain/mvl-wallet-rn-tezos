import React from 'react';

import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import * as S from './TextModal.style';
import { ITextModalProps } from './TextModal.type';

function TextModal({ title, label, cancelLabel, confirmLabel, onCancel, onConfirm }: ITextModalProps) {
  const { modalType, closeModal } = globalModalStore();
  return (
    <ModalLayout
      title={title}
      modalPosition='center'
      isVisible={modalType === MODAL_TYPES.TEXT_MODAL}
      onConfirm={() => {
        if (onConfirm) {
          onConfirm();
        }
        closeModal();
      }}
      onCancel={onCancel}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
    >
      <S.Label>{label}</S.Label>
    </ModalLayout>
  );
}

export default TextModal;
