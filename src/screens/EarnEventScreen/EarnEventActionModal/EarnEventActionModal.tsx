import React from 'react';

import { Alert, Text } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import { ChevronRightBlackIcon, ChevronRightLightIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { useAssetFromTheme } from '@@hooks/useTheme';

import * as S from './EarnEventActionModal.style';
import { EarnEventActionModalProps } from './EarnEventActionModal.type';

/**
 * EarnEvent action modal to behave event features
 */
export const EarnEventActionModal = ({ eventActionButtonTitle, eventActionScheme, avatarUrl }: EarnEventActionModalProps) => {
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);

  return (
    <DropShadow style={S.style.shadow}>
      <S.Container>
        <S.RewardLayout
          onPress={() => {
            // TODO replace this
            Alert.alert('Go to event receipt screen', 'description', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
          }}
        >
          <S.Avatar source={{ uri: avatarUrl }} />
          <S.PointGroupLayout>
            <S.PointCategoryWrapper>
              <S.PointCategoryText>{'My point'}</S.PointCategoryText>
            </S.PointCategoryWrapper>
            <Text style={S.style.pointAmount}>
              {'315 '}
              <Text style={S.style.pointUnit}>{'bMVL'}</Text>
            </Text>
          </S.PointGroupLayout>
          <RightIcon style={S.style.extensionArrow} />
        </S.RewardLayout>

        <PrimaryButton
          label={eventActionButtonTitle}
          disabled={false}
          onPress={() => {
            // onActionButtonPress
          }}
        />
      </S.Container>
    </DropShadow>
  );
};
