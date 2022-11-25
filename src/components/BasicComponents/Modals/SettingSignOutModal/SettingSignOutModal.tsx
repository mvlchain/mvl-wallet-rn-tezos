import React from 'react';

import { useTranslation } from 'react-i18next';

import Check from '@@components/BasicComponents/Form/Check';
import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import { useToggle } from '@@hooks/useToggle';

import { MODAL_TYPES } from '../GlobalModal';

import * as S from './SettingSignOutModal.style';
import useSettingSignOutModal from './useSettingSignOutModal';

function SettingSignOutModal() {
  const [isAgree, toggle] = useToggle();
  const { t } = useTranslation();
  const { modalType, closeModal, onPressSignOut } = useSettingSignOutModal();

  return (
    <ModalLayout
      title={t('log_out')}
      modalPosition='center'
      isVisible={modalType === MODAL_TYPES.SETTING_LOG_OUT}
      onConfirm={onPressSignOut}
      confirmLabel={t('log_out')}
      isConfirmDisabled={!isAgree}
      onCancel={closeModal}
    >
      <S.DiscriptionText>{t('log_out_description')}</S.DiscriptionText>
      <S.AgreeContainer>
        <Check checked={isAgree} onPress={toggle}>
          <S.AgreeText>{t('log_out_agree')}</S.AgreeText>
        </Check>
      </S.AgreeContainer>
    </ModalLayout>
  );
}

export default SettingSignOutModal;
