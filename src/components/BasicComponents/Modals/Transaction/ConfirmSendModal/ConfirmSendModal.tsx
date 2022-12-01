import React from 'react';

import { formatEther } from 'ethers/lib/utils';
import { useTranslation } from 'react-i18next';

import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { height } from '@@utils/ui';

import { MODAL_TYPES } from '../../GlobalModal';

import * as S from './ConfirmSendModal.style';
import { IConfirmSendModalProps } from './ConfirmSendModal.type';

function ConfirmSendModal({ recipientAddress, amount, fee, onConfirm }: IConfirmSendModalProps) {
  const { t } = useTranslation();
  const { modalType, closeModal } = globalModalStore();

  return (
    <ModalLayout
      title={t('confirm_send')}
      modalPosition='bottom'
      isVisible={modalType === MODAL_TYPES.CONFIRM_SEND}
      onClose={() => {
        closeModal();
      }}
      onCancel={() => {
        closeModal();
      }}
      onConfirm={onConfirm}
    >
      <S.TopContainer>
        <S.GreyText>{'Recipient Address'}</S.GreyText>
        <S.LargeBlackText>{recipientAddress}</S.LargeBlackText>
      </S.TopContainer>
      <S.MiddleContainer>
        <S.Row>
          <S.BlackText> {t('send_amount')}</S.BlackText>
          <S.RightAlign>
            <S.BlackText>{`${formatEther(amount)} MVL`}</S.BlackText>
            <S.GreyText>{'dsfdsfsadfsaf USD'}</S.GreyText>
          </S.RightAlign>
        </S.Row>
        <S.Row style={{ marginBottom: height * 16 }}>
          <S.BlackText>{t('transaction_fee')}</S.BlackText>
          <S.RightAlign>
            <S.BlackText>{`${formatEther(fee)} ETH`}</S.BlackText>
            <S.GreyText>{'dsfdsfsadfsaf USD'}</S.GreyText>
          </S.RightAlign>
        </S.Row>
        <Divider thickness={DIVIDER_THICKNESS.THIN} />
        <S.Row>
          <S.BlackText>{t('total')}</S.BlackText>
          <S.RightAlign>
            <S.BlackText>{`${formatEther(amount)} MVL + ${formatEther(fee)}ETH`}</S.BlackText>
            <S.GreyText>{'d205465 USD'}</S.GreyText>
          </S.RightAlign>
        </S.Row>
      </S.MiddleContainer>
    </ModalLayout>
  );
}

export default ConfirmSendModal;
