import { Modal } from 'react-native';

import PinLayout from '@@components/Pin/PinLayout/PinLayout';

import usePinModal from './usePinModal';

function PinModal() {
  const { isOpen, interruption } = usePinModal();

  return (
    <Modal visible={isOpen.pin} onRequestClose={interruption}>
      <PinLayout back={interruption} />
    </Modal>
  );
}

export default PinModal;
