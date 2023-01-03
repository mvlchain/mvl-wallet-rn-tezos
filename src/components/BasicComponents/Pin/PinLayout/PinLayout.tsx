import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';
import FadeInOut from 'react-native-fade-in-out';

import { BackIconDark, BackIconLight } from '@@assets/image';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import usePin from '@@components/BasicComponents/Pin/PinLayout/usePin';
import { PIN_LAYOUT, PIN_MODE } from '@@constants/pin.constant';
import { useAssetFromTheme, useColor } from '@@hooks/useTheme';
import { pinStore } from '@@store/pin/pinStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import Blurs from '../Blurs';
import NumPads from '../NumPads';
import PinInstruction from '../PinInstruction';

import * as S from './PinLayout.style';
import { IPinLayoutProps } from './PinLayout.type';

function PinLayout({ back }: IPinLayoutProps) {
  const { backSpace, bioAuth, setPassword, current, reset, visible } = usePin();
  const { pinMode, layout } = pinStore();
  const { t } = useTranslation();
  const { settedBioAuth } = settingPersistStore();
  const { color } = useColor();
  const BackIcon = useAssetFromTheme(BackIconLight, BackIconDark);
  const isFull = layout === PIN_LAYOUT.FULLSCREEN;

  useEffect(() => {
    if (settedBioAuth) {
      bioAuth();
    }
  }, []);

  return (
    <>
      <S.BackDrop onPress={back} />
      <S.PinLayoutWrapper isFull={isFull}>
        {isFull ? null : <StatusBar backgroundColor={color.opacityBlackWhite} />}
        <S.PinContainer isFull={isFull}>
          {isFull ? (
            <S.PinBackButtonHeaderWrapper onPress={back}>
              <BackIcon />
            </S.PinBackButtonHeaderWrapper>
          ) : (
            <S.PinLayoutAssistant />
          )}

          <S.PinPasswordMonitorContainer isConfirm={pinMode === PIN_MODE.CONFIRM}>
            <PinInstruction />
            <Blurs current={current} />
            <S.TextButtonWrapper>
              <FadeInOut visible={visible} duration={400}>
                {pinMode === PIN_MODE.CONFIRM && <TextButton label={t('password_forgot_pin')} onPress={reset} disabled={false} />}
              </FadeInOut>
            </S.TextButtonWrapper>
          </S.PinPasswordMonitorContainer>
          <S.PinNumpadContainer>
            <NumPads backSpace={backSpace} bioAuth={bioAuth} setPassword={setPassword} />
          </S.PinNumpadContainer>
        </S.PinContainer>
      </S.PinLayoutWrapper>
    </>
  );
}

export default PinLayout;
