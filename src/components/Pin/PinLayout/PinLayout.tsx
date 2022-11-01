import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';

import Blurs from '../Blurs';
import NumPads from '../NumPads';
import PinInstruction from '../PinInstruction';

import * as S from './PinLayout.style';

function PinLayout() {
  const { t } = useTranslation();
  return (
    <S.PinContainer>
      <S.LayoutAssistant />
      <S.PinPasswordMonitorContainer>
        <S.PinMonitorInnerWrraper>
          <PinInstruction />
        </S.PinMonitorInnerWrraper>
        <S.PinMonitorInnerWrraper>
          <Blurs />
        </S.PinMonitorInnerWrraper>
        <S.PinMonitorInnerWrraper>
          <TextButton label={t('password_forgot_pin')} onPress={() => {}} disabled={false} />
        </S.PinMonitorInnerWrraper>
      </S.PinPasswordMonitorContainer>
      <S.PinNumpadContainer>
        <NumPads />
      </S.PinNumpadContainer>
    </S.PinContainer>
  );
}

export default PinLayout;
