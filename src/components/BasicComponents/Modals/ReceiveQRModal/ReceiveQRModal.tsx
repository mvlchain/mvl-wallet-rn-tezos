import React from 'react';

import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import QRcode from '@@components/BasicComponents/QR/QRcode';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import * as S from './ReceiveQRModal.style';
import { IReceiveQRModalProps } from './ReceiveQRModal.type';
import { useReceiveQRModal } from './useReceiveQRModal';

function ReceiveQRModal({ title, amount, token, address, cancelLabel, confirmLabel, onCancel, onConfirm }: IReceiveQRModalProps) {
  const { modalType, closeModal } = globalModalStore();
  const { qr } = useReceiveQRModal({ token, address, value: amount });
  return (
    <ModalLayout
      title={title}
      modalPosition='center'
      isVisible={modalType === MODAL_TYPES.RECEIVE_QR}
      onConfirm={() => {
        if (onConfirm) {
          onConfirm();
        }
      }}
      onCancel={onCancel}
      cancelLabel={cancelLabel}
      confirmLabel={confirmLabel}
      isReverseBtn={true}
    >
      <S.Container>
        <S.AmountText>
          {amount} {token.symbol}
        </S.AmountText>
        {qr && <QRcode qr={qr} />}
      </S.Container>
    </ModalLayout>
  );
}

export default ReceiveQRModal;
