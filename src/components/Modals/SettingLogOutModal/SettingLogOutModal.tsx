import { useTranslation } from 'react-i18next';

import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import Check from '@@components/Form/Check';
import { useToggle } from '@@hooks/common/useToggle';

import { MODAL_TYPES } from '../GlobalModal';

import * as S from './SettingLogOutModal.style';
import useSettingLogOutModal from './useSettingLogOutModal';

function SettingLogOutModal() {
  const [isAgree, toggle] = useToggle();
  const { t } = useTranslation();
  const { modalType, closeModal, onPressLogOut } = useSettingLogOutModal();

  return (
    <BaseModal
      title={t('log_out')}
      modalPosition='center'
      isVisible={modalType === MODAL_TYPES.SETTING_LOG_OUT}
      onConfirm={onPressLogOut}
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
    </BaseModal>
  );
}

export default SettingLogOutModal;
