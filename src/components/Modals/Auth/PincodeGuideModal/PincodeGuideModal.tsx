import React from 'react';

import { useTranslation } from 'react-i18next';
import { Modal } from 'react-native';

import { Protect } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';
import { pinStore } from '@@store/pin/pinStore';

import * as S from './PincodeGuideModal.style';
import usePincodeGuideModal from './usePincodeGuideModal';

function PincodeGuideModal() {
  const { t } = useTranslation();
  const { isOpen, close, interruption } = usePincodeGuideModal();
  const _pinStore = pinStore();
  return (
    <Modal visible={isOpen.guide} onRequestClose={interruption}>
      <S.PincodeContainer>
        <S.PincodeTitleWrapper>
          <S.PincodeTitle>{t('set_pin_number')}</S.PincodeTitle>
          <S.PincodeSubTitle>{t('setup_password_guide_lbl_description')}</S.PincodeSubTitle>
        </S.PincodeTitleWrapper>
        <Protect />
        <S.PrimaryButtonWrapper>
          <PrimaryButton
            label={t('set_pin_number')}
            onPress={() => {
              _pinStore.open();
              close(AUTH_MODAL_NAME.GUIDE);
            }}
          />
        </S.PrimaryButtonWrapper>
      </S.PincodeContainer>
    </Modal>
  );
}

export default PincodeGuideModal;
