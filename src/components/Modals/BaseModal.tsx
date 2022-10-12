import React from 'react';

import Modal from 'react-native-modal';

import { CloseBlackIconLight } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/Buttons/BaseButton';

import * as S from './styled';
import * as Type from './type';

export function BaseModal({ title, children, onCancel, onConfirm, onClose, isVisible, type, image }: Type.ModalComponentProps) {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.25} style={S.inlineStyles(type).modal}>
      <S.ModalBackDrop type={type}>
        <S.ModalContainer type={type}>
          <S.ModalTopWrapper>
            <S.ModalTitle>{title}</S.ModalTitle>
            {/* TODO: theme 스토어추가시 추가작업 */}
            {!!onClose && <CloseBlackIconLight onPress={onClose} />}
          </S.ModalTopWrapper>
          <S.ContentWrapper>{children}</S.ContentWrapper>
          {!!onConfirm && (
            <S.ButtonWrapper>
              {!!onCancel && <SecondaryButton label={'cancel'} onPress={() => {}} disabled={false} wrapperStyle={S.inlineStyles(type).halfbutton} />}
              {!!onCancel && <S.Gap />}
              <PrimaryButton label={'confirm'} onPress={() => {}} disabled={false} wrapperStyle={S.inlineStyles(type).halfbutton} />
            </S.ButtonWrapper>
          )}
        </S.ModalContainer>
      </S.ModalBackDrop>
    </Modal>
  );
}
