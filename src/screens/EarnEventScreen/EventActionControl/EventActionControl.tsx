import React from 'react';

import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import { ChevronRightBlackIcon, ChevronRightLightIcon, CircleAlertIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { useAssetFromTheme } from '@@hooks/useTheme';
import globalModalStore from '@@store/globalModal/globalModalStore';

import * as S from './EventActionControl.style';
import { EarnEventActionModalProps } from './EventActionControl.type';
import { useRewardReceiptUrlByExtenedPublicKey } from './useRewardReceiptUrlByExtenedPublicKey';

/**
 * EarnEvent action modal to behave event features
 */
export const EventActionControl = ({ avatarUrl, eventActionButtonTitle, eventActionScheme, receiptUrl }: EarnEventActionModalProps) => {
  const { t } = useTranslation();
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  const { rewardReceiptUrl } = useRewardReceiptUrlByExtenedPublicKey(receiptUrl);
  const { openModal } = globalModalStore();
  const isReceiptEnabled = receiptUrl ? true : false;

  console.log(`Event> receipt: ${receiptUrl}, rewardReceiptUrl: ${rewardReceiptUrl} isEnabled: ${isReceiptEnabled}`);

  return (
    <DropShadow style={S.style.shadow}>
      <S.Container>
        <S.RewardBoard
          disabled={!isReceiptEnabled}
          onPress={() => {
            // open Reward Receipt using WebViewModal
            openModal(MODAL_TYPES.REWARD_RECEIPT, {
              url: rewardReceiptUrl,
            });
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
          {isReceiptEnabled ? <RightIcon style={S.style.extensionArrow} /> : null}
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
