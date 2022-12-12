import React from 'react';

import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import { ChevronRightBlackIcon, ChevronRightLightIcon, CircleAlertIcon } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { useAssetFromTheme } from '@@hooks/useTheme';
import globalModalStore from '@@store/globalModal/globalModalStore';

import * as S from './EventActionControl.style';
import { EarnEventActionModalProps } from './EventActionControl.type';
import { useRewardReceiptUrlByExtenedPublicKey } from './useRewardReceiptUrlByExtenedPublicKey';

/**
 * EarnEvent action modal to behave event features
 */
export const EventActionControl = ({ avatarUrl, points, eventActionButtonTitle, eventActionScheme, receiptUrl }: EarnEventActionModalProps) => {
  const { t } = useTranslation();
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  // const { rewardReceiptUrl } = useRewardReceiptUrlByExtenedPublicKey(receiptUrl);
  const { openModal } = globalModalStore();
  const isReceiptEnabled = receiptUrl ? true : false;

  return (
    <DropShadow style={S.style.shadow}>
      <S.Container>
        <S.RewardBoard
          disabled={!isReceiptEnabled}
          onPress={() => {
            // open Reward Receipt using WebViewModal
            openModal(MODAL_TYPES.REWARD_RECEIPT, {
              // url: rewardReceiptUrl,
              url: '',
            });
          }}
        >
          <S.RewardAvatar source={{ uri: avatarUrl }} />
          {points ? (
            <S.PointGroupLayout>
              {points.map((point, index) => {
                return (
                  <S.PointContentLayout key={`point.key-${index}`}>
                    <S.PointCategoryWrapper>
                      <S.PointCategoryText>{point.title}</S.PointCategoryText>
                    </S.PointCategoryWrapper>
                    <Text style={S.style.pointAmount}>
                      {/* TODO 포인트 조회하여 기입할 것. require space before currency unit.*/}
                      {'315'}
                      <Text style={S.style.pointUnit}>{` ${point.currency}`}</Text>
                    </Text>
                  </S.PointContentLayout>
                );
              })}
            </S.PointGroupLayout>
          ) : null}
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
