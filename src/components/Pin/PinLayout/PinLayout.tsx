import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import { PIN_MODE } from '@@constants/pin.constant';
import usePin from '@@hooks/pin/usePin';
import { pinStore } from '@@store/pin/pinStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import Blurs from '../Blurs';
import NumPads from '../NumPads';
import PinInstruction from '../PinInstruction';

import * as S from './PinLayout.style';
import { IPinLayoutStyleProps } from './PinLayout.type';

function PinLayout({ isFull }: IPinLayoutStyleProps) {
  const { backSpace, bioAuth, setPassword, current } = usePin();
  const { pinMode } = pinStore();
  const { t } = useTranslation();
  const { settedBioAuth } = settingPersistStore();

  useEffect(() => {
    if (settedBioAuth) {
      bioAuth();
    }
  }, []);

  return (
    <S.PinContainer isFull={isFull}>
      <S.LayoutAssistant />
      <S.PinPasswordMonitorContainer>
        <S.PinMonitorInnerWrraper>
          <PinInstruction />
        </S.PinMonitorInnerWrraper>
        <S.PinMonitorInnerWrraper>
          <Blurs current={current} />
        </S.PinMonitorInnerWrraper>
        <S.PinMonitorInnerWrraper>
          {/* TODO: reset기능 넣기 */}
          {pinMode === PIN_MODE.CONFIRM && <TextButton label={t('password_forgot_pin')} onPress={() => {}} disabled={false} />}
        </S.PinMonitorInnerWrraper>
      </S.PinPasswordMonitorContainer>
      <S.PinNumpadContainer>
        <NumPads backSpace={backSpace} bioAuth={bioAuth} setPassword={setPassword} />
      </S.PinNumpadContainer>
    </S.PinContainer>
  );
}

export default PinLayout;
