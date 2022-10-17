import { Text } from 'react-native';

import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import globalModalStore from '@@store/globalModal/globalModalStore';

import { MODAL_TYPES } from './GlobalModal';

export const TextModal = () => {
  const { modalType, closeModal } = globalModalStore();
  return (
    <BaseModal
      title={'Rooted Device'}
      modalPosition='center'
      isVisible={modalType === MODAL_TYPES.TEXT_MODAL}
      onConfirm={() => {
        closeModal();
      }}
    >
      <Text>테스트용 모달입니다.</Text>
    </BaseModal>
  );
};
