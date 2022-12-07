import React from 'react';

import { Alert, Text } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import { ChevronRightBlackIcon, ChevronRightLightIcon, CircleAlertIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { useAssetFromTheme } from '@@hooks/useTheme';

import * as S from './EventActionControl.style';
import { EarnEventActionModalProps } from './EventActionControl.type';

/**
 * EarnEvent action modal to behave event features
 */
export const EventActionControl = ({ eventActionButtonTitle, eventActionScheme, avatarUrl }: EarnEventActionModalProps) => {
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);

  return (
    <DropShadow style={S.style.shadow}>
      <S.Container>
        <S.RewardBoard
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
        </S.RewardBoard>

        <S.TxFeeLayout>
          <CircleAlertIcon />
          <S.TxFeeLabel>{'Transaction Fee: 10 bMVL'}</S.TxFeeLabel>
        </S.TxFeeLayout>

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
