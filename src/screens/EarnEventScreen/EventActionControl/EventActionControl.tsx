import React, { useCallback, useEffect } from 'react';

import Decimal from 'decimal.js';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import { ChevronRightBlackIcon, ChevronRightLightIcon, CircleAlertIcon } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import Picture from '@@components/BasicComponents/Picture';
import { useAssetFromTheme } from '@@hooks/useTheme';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { format } from '@@utils/strings';
import { getWidth } from '@@utils/ui';

import * as S from './EventActionControl.style';
import { EarnEventActionModalProps } from './EventActionControl.type';
import { useActionControlsByPhase } from './useActionControlsByPhase';
import { useRewardReceiptUrlByExtenedPublicKey } from './useRewardReceiptUrlByExtenedPublicKey';

/**
 * EarnEvent action modal to behave event features
 */
export const EventActionControl = ({ phase, event, thirdParty, claimStatusInfo }: EarnEventActionModalProps) => {
  const { t } = useTranslation();
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  const { rewardReceiptUrl } = useRewardReceiptUrlByExtenedPublicKey(event.calcInfoPageUrl);
  const { openModal } = globalModalStore();
  const isReceiptEnabled = !!event.calcInfoPageUrl;
  const actionControlAttrs = useActionControlsByPhase(phase, event, thirdParty, claimStatusInfo);

  const getTxFee = useCallback((fee: string | undefined) => {
    if (fee) {
      // TODO make it separate DecimalFormatter class or function
      return new Decimal(fee).toFixed();
    } else {
      return '';
    }
  }, []);

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
          <Picture url={actionControlAttrs.avatarUrl} width={getWidth(40)} height={getWidth(40)} />

          <S.PointGroupLayout>
            {actionControlAttrs.eventPointInfoList.map((point, index) => {
              return (
                <S.PointContentLayout key={index}>
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

          {isReceiptEnabled ? <RightIcon style={S.style.extensionArrow} /> : null}
        </S.RewardBoard>

        {!!claimStatusInfo?.isTxFeeVisible ? (
          <S.TxFeeLayout>
            <CircleAlertIcon />
            <S.TxFeeLabel>{format(t('transaction_fee_with_value_currency'), getTxFee(claimStatusInfo.fee), claimStatusInfo.currency)}</S.TxFeeLabel>
          </S.TxFeeLayout>
        ) : null}

        {actionControlAttrs.isActionButtonVisible ? (
          <PrimaryButton
            label={actionControlAttrs.actionButtonTitle}
            disabled={!actionControlAttrs.isActionButtonEnabled}
            onPress={() => {
              if (!actionControlAttrs.onActionButtonPress) return;
              actionControlAttrs.onActionButtonPress();
            }}
          />
        ) : null}
      </S.Container>
    </DropShadow>
  );
};
