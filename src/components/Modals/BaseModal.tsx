import React from 'react';

import Modal from 'react-native-modal';

import { CloseBlackIconLight, NFTImage } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/Buttons/BaseButton';

import * as S from './styled';
import * as Type from './type';

export function BaseModal({ title, children, onCancel, onConfirm, onClose, isVisible, type, image }: Type.ModalComponentProps) {
  const margin = type === Type.Center ? 16 : 0;
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.25} style={{ justifyContent: 'flex-end', margin: margin }}>
      <S.ModalBackDrop type={type}>
        <S.ModalContainer type={type}>
          <S.ModalTopWrapper>
            <S.ModalTitle>{title}</S.ModalTitle>
            {!!onClose && <CloseBlackIconLight onPress={onClose} />}
          </S.ModalTopWrapper>
          <S.ContentWrapper>{children}</S.ContentWrapper>
          {!!onConfirm && (
            <S.ButtonWrapper>
              {!!onCancel && <SecondaryButton label={'cancel'} onPress={() => {}} disabled={false} wrapperStyle={{ flex: 1 }} />}
              {!!onCancel && <S.Gap />}
              <PrimaryButton label={'confirm'} onPress={() => {}} disabled={false} wrapperStyle={{ flex: 1 }} />
            </S.ButtonWrapper>
          )}
        </S.ModalContainer>
      </S.ModalBackDrop>
    </Modal>
  );
}
