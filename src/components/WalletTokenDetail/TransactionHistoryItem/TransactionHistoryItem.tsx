import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import { ChevronRightBlackIcon, ChevronRightLightIcon } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { BUTTON_SIZE } from '@@components/BasicComponents/Buttons/Button.type';
import { TTransactionStatus, TTransactionType, IGetTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';
import { useAssetFromTheme } from '@@hooks/common/useTheme';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import { TCancelRootStackProps } from '@@screens/WalletScreen/WalletTransactionCancel/WalletTransactionCancel.type';
import { TTransactionHistoryRootStackProps } from '@@screens/WalletScreen/WalletTransactionHistory/WalletTransactionHistory.type';
import { TSpeedUpRootStackProps } from '@@screens/WalletScreen/WalletTransactionSpeedUp/WalletTransactionSpeedUp.type';
import { fontSize } from '@@utils/ui';

import * as S from './TransactionHistoryListItem.style';

function TransactionHistoryListItem(props: IGetTransactionHistoryResponse) {
  const { type, status, updatedAt, value, hash, from, to } = props;
  const { t } = useTranslation();
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  const isCanceled = status === TTransactionStatus.FAIL;
  const valueSign = from === '0x09Fc9e92261113C227c0eC6F1B20631AA7b2789d' ? '-' : null;
  const navigation = useNavigation<TTransactionHistoryRootStackProps | TCancelRootStackProps | TSpeedUpRootStackProps>();

  const goToSpeedUp = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_SPEED_UP);
  };

  const goToCancel = () => {
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_CANCEL);
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_HISTORY, props);
      }}
    >
      <S.TransactionHistoryListItem>
        <S.HistoryItemTopContent>
          <S.TransactionHistoryContentInnerWrapper>
            <S.TransactionStatusWrapper>
              <S.TransactionStatus>{status}</S.TransactionStatus>
              <S.TransactionDate>{updatedAt}</S.TransactionDate>
            </S.TransactionStatusWrapper>
            <S.TransactionAmountWrapper>
              <S.TransactionAmount isCanceled={isCanceled}>
                {valueSign}
                {value}
              </S.TransactionAmount>
              <S.TransactionBaseCurrency isCanceled={isCanceled}>
                {valueSign}
                {/* TODO: 계산 필요 */}
                {10} {'USD'}
              </S.TransactionBaseCurrency>
            </S.TransactionAmountWrapper>
          </S.TransactionHistoryContentInnerWrapper>

          <RightIcon />
        </S.HistoryItemTopContent>
        {status === TTransactionStatus.PENDING && (
          <S.HistoryItemBottomContent>
            <SecondaryButton
              label={t('cancel')}
              onPress={goToCancel}
              size={BUTTON_SIZE.SMALL}
              wrapperStyle={{ flex: 1 }}
              textStyle={{ lineHeight: fontSize(14) }}
            />
            <S.ButtonGap />
            <PrimaryButton
              label={t('speed_up')}
              onPress={goToSpeedUp}
              size={BUTTON_SIZE.SMALL}
              wrapperStyle={{ flex: 1 }}
              textStyle={{ lineHeight: fontSize(14) }}
            />
          </S.HistoryItemBottomContent>
        )}
      </S.TransactionHistoryListItem>
    </Pressable>
  );
}

export default TransactionHistoryListItem;
