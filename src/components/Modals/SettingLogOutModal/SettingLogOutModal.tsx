import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from '../GlobalModal';

import { ISettingLogOutModalProps } from './SettingLogOutModal.style';

function SettingLogOutModal({ modalTitle }: ISettingLogOutModalProps) {
  const { modalType, closeModal } = globalModalStore();
  const { t } = useTranslation();

  return (
    <BaseModal
      title={t('log_out')}
      modalPosition='center'
      isVisible={modalType === MODAL_TYPES.SETTING_LOG_OUT}
      onClose={() => {
        closeModal();
      }}
    >
      <Text>{t('log_out_description')}</Text>
    </BaseModal>
  );
}

export default SettingLogOutModal;
