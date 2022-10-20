import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import * as S from './TextModal.style';
import { ITextModalProps } from './TextModal.type';

function TextModal({ title, label, cancelLabel, confirmLabel, onCancel, onConfirm }: ITextModalProps) {
  const { modalType, closeModal } = globalModalStore();
  return (
    <BaseModal
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
    </BaseModal>
  );
}

export default TextModal;
