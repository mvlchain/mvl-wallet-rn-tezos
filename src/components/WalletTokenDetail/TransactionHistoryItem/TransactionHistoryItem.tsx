import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

import { ChevronRightBlackIcon, ChevronRightLightIcon } from '@@assets/image';
import { PrimaryButton, SecondaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@@constants/transaction.constant';
import { useAssetFromTheme } from '@@hooks/common/useTheme';
import { TWalletStackNavigationProps, WALLET_STACK_ROUTE } from '@@navigation/WalletStack/WalletStack.type';
import { fontSize } from '@@utils/ui';

import * as S from './TransactionHistoryListItem.style';
import { ITransactionHistoryListItemProps } from './TransactionHistoryListItem.type';

function TransactionHistoryListItem({
  type,
  status,
  date,
  amount,
  baseCurrencyAmount,
  baseCurrencySymbol,
  txHash,
}: ITransactionHistoryListItemProps) {
  type WalletStackProps = TWalletStackNavigationProps<'WALLET_TRANSACTION_HISTORY'>;
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  const isCanceled = status === TRANSACTION_STATUS.CANCELED;
  const amountSign = type === TRANSACTION_TYPE.SEND ? '-' : null;
  const navigation = useNavigation<WalletStackProps>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(WALLET_STACK_ROUTE.WALLET_TRANSACTION_HISTORY, { txHash });
      }}
    >
      <S.TransactionHistoryListItem>
        <S.HistoryItemTopContent>
          <S.TransactionHistoryContentInnerWrapper>
            <S.TransactionStatusWrapper>
              <S.TransactionStatus>{status}</S.TransactionStatus>
              <S.TransactionDate>{date}</S.TransactionDate>
            </S.TransactionStatusWrapper>
            <S.TransactionAmountWrapper>
              <S.TransactionAmount isCanceled={isCanceled}>
                {amountSign}
                {amount}
              </S.TransactionAmount>
              <S.TransactionBaseCurrency isCanceled={isCanceled}>
                {amountSign}
                {baseCurrencyAmount} {baseCurrencySymbol}
              </S.TransactionBaseCurrency>
            </S.TransactionAmountWrapper>
          </S.TransactionHistoryContentInnerWrapper>

          <RightIcon />
        </S.HistoryItemTopContent>
        {status === TRANSACTION_STATUS.PENDING && (
          <S.HistoryItemBottomContent>
            <SecondaryButton label='Cancel' onPress={() => {}} size={'small'} wrapperStyle={{ flex: 1 }} textStyle={{ lineHeight: fontSize(14) }} />
            <S.ButtonGap />
            <PrimaryButton label='Speed Up' onPress={() => {}} size={'small'} wrapperStyle={{ flex: 1 }} textStyle={{ lineHeight: fontSize(14) }} />
          </S.HistoryItemBottomContent>
        )}
      </S.TransactionHistoryListItem>
    </Pressable>
  );
}

export default TransactionHistoryListItem;
