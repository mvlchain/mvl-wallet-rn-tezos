import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { CloseBlackIconLight } from '@@assets/image';
import { PrimaryButton } from '@@components/Buttons/BaseButton';
import { useTokenBalanceList } from '@@hooks/useTokenBalanceList';

import * as S from './styled';
import * as Type from './type';

export function MiddleModal({ title, children, onCancel, onConfirm, onClose, isVisible }: Type.ModalComponentProps) {
  const tokenList = useTokenBalanceList();

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.25}>
      <S.MiddleModalBackDrop>
        <S.MiddleModalContainer>
          <S.ModalTopWrapper>
            <S.ModalTitle>{title}</S.ModalTitle>
            {!!onClose && <CloseBlackIconLight onPress={onClose} />}
          </S.ModalTopWrapper>
          <S.ContentWrapper>
            <Text>I am the modal content!???????????</Text>
            <Text>I am the modal content!???????????</Text>
            <Text>I am the modal content!???????????</Text>
            <Text>I am the modal content!???????????</Text>
            <Text>I am the modal content!???????????</Text>
            <Text>I am the modal content!???????????</Text>
          </S.ContentWrapper>

          <PrimaryButton label={'gdsgdagag'} onPress={() => {}} disabled={false} />
        </S.MiddleModalContainer>
      </S.MiddleModalBackDrop>
    </Modal>
  );
}
