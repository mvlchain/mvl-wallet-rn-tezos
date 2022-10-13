import React from 'react';

import Modal from 'react-native-modal';

import { CloseBlackIconDark } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';

import * as S from './Modal.style';
import * as Type from './Modal.type';

/**
 * image modal position is fixed at the bottom
 */
export function ImageModal({ title, children, onCancel, onConfirm, onClose, isVisible, image }: Type.ImageModalComponentProps) {
  const type = Type.Bottom;
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.25} style={S.inlineStyles(type).modal}>
      <S.ModalBackDrop type={type}>
        <S.ImageWrapper>
          {image}
          <S.ImageModalTopWrapper>
            <S.ImageModalTitle>{title}</S.ImageModalTitle>
            {!!onClose && <CloseBlackIconDark onPress={onClose} />}
          </S.ImageModalTopWrapper>
        </S.ImageWrapper>
        <S.ImageModalContainer type={type}>
          <S.ContentWrapper>{children}</S.ContentWrapper>
          {!!onConfirm && (
            <S.ButtonWrapper>
              {!!onCancel && <SecondaryButton label={'cancel'} onPress={() => {}} disabled={false} wrapperStyle={S.inlineStyles(type).halfbutton} />}
              {!!onCancel && <S.Gap />}
              <PrimaryButton label={'confirm'} onPress={() => {}} disabled={false} wrapperStyle={S.inlineStyles(type).halfbutton} />
            </S.ButtonWrapper>
          )}
        </S.ImageModalContainer>
      </S.ModalBackDrop>
    </Modal>
  );
}
