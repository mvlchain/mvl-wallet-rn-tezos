import React from 'react';

import { useTranslation } from 'react-i18next';
import { Modal } from 'react-native';

import { Protect } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { AUTH_MODAL_NAME } from '@@constants/authModal.constant';

import * as S from './PincodeGuideModal.style';
import usePincodeGuideModal from './usePincodeGuideModal';

function PincodeGuideModal() {
  const { t } = useTranslation();
  const { isOpen, open, interruption } = usePincodeGuideModal();

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
              open(AUTH_MODAL_NAME.PIN);
            }}
          />
        </S.PrimaryButtonWrapper>
      </S.PincodeContainer>
    </Modal>
  );
}

export default PincodeGuideModal;
