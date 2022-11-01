import { View } from 'react-native';
import Modal from 'react-native-modal';

import PinLayout from '@@components/Pin/PinLayout/PinLayout';
import { THEME } from '@@constants/setting.constant';
import settingPersistStore from '@@store/setting/settingPersistStore';

import * as S from './PinModal.style';

function PinModal({ open, isFull }: { open: boolean; isFull: boolean }) {
  const { appTheme } = settingPersistStore();
  return (
    <Modal
      isVisible={open}
      style={isFull ? S.inlineStyles.fullScreen : S.inlineStyles.notFullScreen}
      backdropColor={S.BackdropColor[appTheme.label]}
      backdropOpacity={appTheme.value === THEME.LIGHT || appTheme.value === THEME.DEFAULT ? 0.25 : 1}
    >
      <PinLayout isFull={isFull} />
    </Modal>
  );
}

export default PinModal;
