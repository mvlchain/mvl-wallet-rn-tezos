import React from 'react';

import DropShadow from 'react-native-drop-shadow';

import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';

import * as S from './ThirdPartyApp.style';
import { IThirdPartyAppProps } from './ThirdPartyApp.type';

export function ThirdPartyApp({ avatarUrl, connectionState, displayName, onConnectPress, onDisconnectPress }: IThirdPartyAppProps) {
  return (
    <DropShadow style={S.style.shadow}>
      <S.Container>
        <S.ThirdPartyAvatar source={{ uri: avatarUrl }} />
        <S.ThirdPartyConnectionLayout>
          <S.ThirdPartyConnectionState>{connectionState}</S.ThirdPartyConnectionState>
          {displayName && <S.ThirdPartyDisplayName>{displayName}</S.ThirdPartyDisplayName>}
        </S.ThirdPartyConnectionLayout>

        {/* TODO 버튼 width를 변경하여 다시 잘 맞출 것 */}
        <SecondaryButton
          label='Disconnect'
          size='small'
          wrapperStyle={S.style.connection}
          onPress={() => {
            if (onDisconnectPress) onDisconnectPress();
          }}
        />
      </S.Container>
    </DropShadow>
  );
}
