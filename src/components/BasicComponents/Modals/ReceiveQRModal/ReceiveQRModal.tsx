import React from 'react';

import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import QRcode from '@@components/BasicComponents/QR/QRcode';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import * as S from './ReceiveQRModal.style';
import { IReceiveQRModalProps } from './ReceiveQRModal.type';

function ReceiveQRModal({ title, amount, token, qr, cancelLabel, confirmLabel, onCancel, onConfirm }: IReceiveQRModalProps) {
  const { modalType } = globalModalStore();
  return (
    <ModalLayout
      title={title}
      modalPosition='center'
      isVisible={modalType === MODAL_TYPES.RECEIVE_QR}
      onConfirm={() => {
        if (onConfirm) {
          onConfirm(qr);
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
        <QRcode qr={qr} />
      </S.Container>
    </ModalLayout>
  );
}

export default ReceiveQRModal;
