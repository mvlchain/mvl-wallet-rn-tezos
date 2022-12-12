import React, { useCallback } from 'react';

import Decimal from 'decimal.js';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import { ChevronRightBlackIcon, ChevronRightLightIcon, CircleAlertIcon } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { useAssetFromTheme } from '@@hooks/useTheme';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { format } from '@@utils/strings';

import * as S from './EventActionControl.style';
import { EarnEventActionModalProps } from './EventActionControl.type';
import { useRewardReceiptUrlByExtenedPublicKey } from './useRewardReceiptUrlByExtenedPublicKey';

/**
 * EarnEvent action modal to behave event features
 */
export const EventActionControl = ({
  avatarUrl,
  points,
  claimStatusInfo,
  isAllowParticipationInClaim,
  eventActionButtonTitle,
  eventActionScheme,
  receiptUrl,
}: EarnEventActionModalProps) => {
  const { t } = useTranslation();
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  const { rewardReceiptUrl } = useRewardReceiptUrlByExtenedPublicKey(receiptUrl);
  const { openModal } = globalModalStore();
  const isReceiptEnabled = receiptUrl ? true : false;

  const getTxFee = useCallback((fee: string | undefined) => {
    if (fee) {
      // TODO decimal format 홤수 유틸화 할 것
      return new Decimal(fee).toFixed();
    } else {
      return '';
    }
  }, []);

  console.log(`EventAction> isAllowParticipationInClaim: ${isAllowParticipationInClaim} claimStatusInfo: ${JSON.stringify(claimStatusInfo)}`);

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
          <S.RewardAvatar source={{ uri: avatarUrl }} />
          {points ? (
            <S.PointGroupLayout>
              {points.map((point, index) => {
                return (
                  <S.PointContentLayout key={`${point.key}-${index}`}>
                    <S.PointCategoryWrapper>
                      <S.PointCategoryText>{point.title}</S.PointCategoryText>
                    </S.PointCategoryWrapper>
                    <Text style={S.style.pointAmount}>
                      {point.amount}
                      <Text style={S.style.pointUnit}>{` ${point.currency}`}</Text>
                    </Text>
                  </S.PointContentLayout>
                );
              })}
            </S.PointGroupLayout>
          ) : null}
          {isReceiptEnabled ? <RightIcon style={S.style.extensionArrow} /> : null}
        </S.RewardBoard>

        {!!claimStatusInfo?.isTxFeeVisible ? (
          <S.TxFeeLayout>
            <CircleAlertIcon />
            <S.TxFeeLabel>{format(t('transaction_fee_with_value_currency'), getTxFee(claimStatusInfo.fee), claimStatusInfo.currency)}</S.TxFeeLabel>
          </S.TxFeeLayout>
        ) : null}

        <PrimaryButton
          label={eventActionButtonTitle}
          disabled={!claimStatusInfo?.isEventActionButtonEnabled}
          onPress={() => {
            // onActionButtonPress
          }}
        />
      </S.Container>
    </DropShadow>
  );
};
