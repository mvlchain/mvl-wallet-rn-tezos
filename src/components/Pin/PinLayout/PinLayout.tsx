import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import { PIN_MODE } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';

import Blurs from '../Blurs';
import NumPads from '../NumPads';
import PinInstruction from '../PinInstruction';

import * as S from './PinLayout.style';
import { IPinLayoutStyleProps } from './PinLayout.type';

function PinLayout({ isFull }: IPinLayoutStyleProps) {
  const { pinMode } = pinStore();
  const { t } = useTranslation();
  return (
    <S.PinContainer isFull={isFull}>
      <S.LayoutAssistant />
      <S.PinPasswordMonitorContainer>
        <S.PinMonitorInnerWrraper>
          <PinInstruction />
        </S.PinMonitorInnerWrraper>
        <S.PinMonitorInnerWrraper>
          <Blurs />
        </S.PinMonitorInnerWrraper>
        <S.PinMonitorInnerWrraper>
          {pinMode === PIN_MODE.CONFIRM && <TextButton label={t('password_forgot_pin')} onPress={() => {}} disabled={false} />}
        </S.PinMonitorInnerWrraper>
      </S.PinPasswordMonitorContainer>
      <S.PinNumpadContainer>
        <NumPads />
      </S.PinNumpadContainer>
    </S.PinContainer>
  );
}

export default PinLayout;
