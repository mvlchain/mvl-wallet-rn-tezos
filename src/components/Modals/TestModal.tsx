import { Text } from 'react-native';

import { BaseModal } from '@@components/BasicComponents/Modals/BaseModal';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { MODAL_TYPES } from '@@store/globalModal/globalModalStore.type';

export const TestModal = () => {
  const { modalType } = globalModalStore();
  return (
    <BaseModal title='test' modalPosition='bottom' isVisible={modalType === MODAL_TYPES.TEST_MODAL}>
      <Text>Test</Text>
    </BaseModal>
  );
};
