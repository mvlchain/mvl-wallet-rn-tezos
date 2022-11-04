import { Modal } from 'react-native';

import PinLayout from '@@components/Pin/PinLayout/PinLayout';
import { PIN_LAYOUT } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';

import usePinModal from './usePinModal';

function PinModal() {
  const { isOpen, interruption } = usePinModal();
  const { layout } = pinStore();
  const isFull = layout === PIN_LAYOUT.FULLSCREEN;

  return (
    <Modal visible={isOpen.pin} onRequestClose={interruption}>
      <PinLayout isFull={isFull} back={interruption} />
    </Modal>
  );
}

export default PinModal;
