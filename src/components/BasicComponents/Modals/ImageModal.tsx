import React from 'react';

import Modal from 'react-native-modal';

import { CloseBlackIconDark } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';

import * as S from './Modal.style';
import * as Type from './Modal.type';

/**
 * image modal position is fixed at the bottom
 */
export function ImageModal(props: Type.IImageModalComponentProps) {
  const { title, children, onCancel, onConfirm, onClose, isVisible, image } = props;
  const modalPosition = Type.Bottom;
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.25} style={S.inlineStyles(modalPosition).modal}>
      <S.ModalBackDrop modalPosition={modalPosition}>
        <S.ImageWrapper>
          {image}
          <S.ImageModalTopWrapper>
            <S.ImageModalTitle>{title}</S.ImageModalTitle>
            {!!onClose && <CloseBlackIconDark onPress={onClose} />}
          </S.ImageModalTopWrapper>
        </S.ImageWrapper>
        <S.ImageModalContainer modalPosition={modalPosition}>
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
        </S.ImageModalContainer>
      </S.ModalBackDrop>
    </Modal>
  );
}
