import React from 'react';

import Modal from 'react-native-modal';

import { CloseBlackIconLight } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import globalModalStore from '@@store/globalModal/globalModalStore';

import * as S from './Modal.style';
import * as Type from './Modal.type';

export function BaseModal({ title, children, onCancel, onConfirm, onClose, isVisible, modalPosition }: Type.IBaseModalComponentProps) {
  const { closeModal } = globalModalStore();

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.25}
      style={S.inlineStyles(modalPosition).modal}
      onBackButtonPress={closeModal}
      onBackdropPress={() => {
        closeModal();
      }}
    >
      <S.ModalContainer modalPosition={modalPosition}>
        <S.ModalTopWrapper>
          <S.ModalTitle>{title}</S.ModalTitle>
          {/* TODO: theme 스토어추가시 추가작업 */}
          {!!onClose && <CloseBlackIconLight onPress={onClose} />}
        </S.ModalTopWrapper>
        <S.ContentWrapper>{children}</S.ContentWrapper>
        {!!onConfirm && (
          <S.ButtonWrapper>
            {!!onCancel && (
              <SecondaryButton label={'cancel'} onPress={onCancel} disabled={false} wrapperStyle={S.inlineStyles(modalPosition).halfbutton} />
            )}
            {!!onCancel && <S.Gap />}
            <PrimaryButton label={'confirm'} onPress={onConfirm} disabled={false} wrapperStyle={S.inlineStyles(modalPosition).halfbutton} />
          </S.ButtonWrapper>
        )}
      </S.ModalContainer>
    </Modal>
  );
}
