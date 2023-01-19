import React from 'react';

import { useTranslation } from 'react-i18next';
import DropShadow from 'react-native-drop-shadow';

import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import Picture from '@@components/BasicComponents/Picture';
import { getWidth } from '@@utils/ui';

import * as S from './ThirdPartyApp.style';
import { IThirdPartyAppProps } from './ThirdPartyApp.type';

export function ThirdPartyApp({
  avatarUrl,
  isThirdPartyConnected,
  connectionState,
  displayName,
  onConnectPress,
  onDisconnectPress,
}: IThirdPartyAppProps) {
  const { t } = useTranslation();

  return (
    <DropShadow style={S.style.shadow}>
      <S.Container>
        <Picture url={avatarUrl} width={getWidth(40)} height={getWidth(40)} />
        <S.ThirdPartyConnectionLayout>
          <S.ThirdPartyConnectionState>{connectionState}</S.ThirdPartyConnectionState>
          {displayName && <S.ThirdPartyDisplayName>{displayName}</S.ThirdPartyDisplayName>}
        </S.ThirdPartyConnectionLayout>

        {/* TODO 버튼 width를 변경하여 다시 잘 맞출 것 */}
        <S.ButtonLayout>
          {isThirdPartyConnected ? (
            <SecondaryButton
              label={t('disconnect')}
              size='small'
              wrapperStyle={S.style.connection}
              onPress={() => {
                if (onDisconnectPress) onDisconnectPress();
              }}
            />
          ) : (
            <PrimaryButton
              label={t('connect')}
              size='small'
              wrapperStyle={S.style.connection}
              onPress={() => {
                if (onConnectPress) onConnectPress();
              }}
            />
          )}
        </S.ButtonLayout>
      </S.Container>
    </DropShadow>
  );
}
