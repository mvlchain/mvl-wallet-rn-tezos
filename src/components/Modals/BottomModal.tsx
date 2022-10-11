import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { CloseBlackIconLight } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/Buttons/BaseButton';
import { useTokenBalanceList } from '@@hooks/useTokenBalanceList';

import * as S from './styled';
import * as Type from './type';

export function BottomModal({ title, children, onCancel, onConfirm, onClose, isVisible }: Type.ModalComponentProps) {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.25} style={{ justifyContent: 'flex-end', margin: 0 }}>
      <S.BottomModalBackDrop>
        <S.BottomModalContainer>
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
        </S.BottomModalContainer>
      </S.BottomModalBackDrop>
    </Modal>
  );
}
