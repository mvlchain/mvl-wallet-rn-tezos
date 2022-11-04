import { View } from 'react-native';
import Modal from 'react-native-modal';

import PinLayout from '@@components/Pin/PinLayout/PinLayout';
import { PIN_LAYOUT } from '@@constants/pin.constant';
import { THEME } from '@@constants/setting.constant';
import { pinStore } from '@@store/pin/pinStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './PinModal.style';
import usePinModal from './usePinModal';

function PinModal() {
  const { isOpen, interruption } = usePinModal();
  const { layout } = pinStore();
  const { appTheme } = settingPersistStore();
  const isFull = layout === PIN_LAYOUT.FULLSCREEN;

  return (
    <Modal
      isVisible={isOpen.pin}
      coverScreen={isFull}
      style={isFull ? S.inlineStyles.fullScreen : S.inlineStyles.notFullScreen}
      backdropColor={S.BackdropColor[appTheme.label]}
      backdropOpacity={appTheme.value === THEME.LIGHT || appTheme.value === THEME.DEFAULT ? 0.25 : 1}
    >
      <S.PinLayoutWrapper isFull={isFull}>
        <PinLayout isFull={isFull} back={interruption} />
      </S.PinLayoutWrapper>
    </Modal>
  );
}

export default PinModal;
