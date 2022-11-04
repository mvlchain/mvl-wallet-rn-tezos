import { View } from 'react-native';
import Modal from 'react-native-modal';

import PinLayout from '@@components/Pin/PinLayout/PinLayout';
import { THEME } from '@@constants/setting.constant';
import { pinStore } from '@@store/pin/pinStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './PinModal.style';
import usePinModal from './usePinModal';

function PinModal({ isFull }: { isFull: boolean }) {
  const { isOpen, interruption } = usePinModal();
  const { appTheme } = settingPersistStore();

  return (
    //TODO: 아이폰에서 상태바 가리는 문제 해결필요 내부에 View쓰면 됨
    <Modal
      isVisible={isOpen.pin}
      coverScreen={isFull}
      style={isFull ? S.inlineStyles.fullScreen : S.inlineStyles.notFullScreen}
      backdropColor={S.BackdropColor[appTheme.label]}
      backdropOpacity={appTheme.value === THEME.LIGHT || appTheme.value === THEME.DEFAULT ? 0.25 : 1}
    >
      <PinLayout isFull={isFull} back={interruption} />
    </Modal>
  );
}

export default PinModal;
