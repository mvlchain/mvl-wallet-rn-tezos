import React from 'react';

import { red } from 'bn.js';
import { Text, View } from 'react-native';

import { TokenMVL32Icon, ChevronRightBlackIcon, ChevronRightLightIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@@constants/transaction.constant';
import { useAssetFromTheme } from '@@hooks/common/useTheme';
import { width, height, fontSize } from '@@utils/ui';

import * as S from './WalletTokenDetail.style';
function WalletTokenDetail() {
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  return (
    <View>
      <S.TokenInfoContainer>
        <S.TokenSymbolWrapper>
          <TokenMVL32Icon width={width * 40} height={height * 40} />
          <S.TokenName>MVL</S.TokenName>
        </S.TokenSymbolWrapper>
        <S.TokenAmountWrapper>
          <S.TokenAmount>0 MVL</S.TokenAmount>
          <S.TokenBaseCurrency>0 USD</S.TokenBaseCurrency>
        </S.TokenAmountWrapper>
      </S.TokenInfoContainer>

      <S.ReceiveSendContainer>
        <PrimaryButton label='Receive' onPress={() => {}} size={'small'} wrapperStyle={{ flex: 1 }} textStyle={{ lineHeight: fontSize(14) }} />
        <S.Gap />
        <PrimaryButton label='Send' onPress={() => {}} size={'small'} wrapperStyle={{ flex: 1 }} textStyle={{ lineHeight: fontSize(14) }} />
      </S.ReceiveSendContainer>

      <S.EmptyDeviderThick />

      <S.TransactionHistoryContainer>
        <S.TransactionHistoryLabelWrapper>
          <S.TransactionHistoryLabel>Transaction History</S.TransactionHistoryLabel>
          <TextButton label={'All'} onPress={() => {}} disabled={false} />
        </S.TransactionHistoryLabelWrapper>
        <S.TransactionHistoryList>
          {mockData.transactionHistory.map((v, i) => {
            return (
              <S.TransactionHistoryListItem key={'history' + i}>
                <S.TransactionHistoryContentWrapper>
                  <S.TransactionStatusWrapper>
                    <S.TransactionStatus>{v.status}</S.TransactionStatus>
                    <S.TransactionDate>{v.date}</S.TransactionDate>
                  </S.TransactionStatusWrapper>

                  <S.TokenAmountWrapper>
                    <S.TransactionAmount>1000</S.TransactionAmount>
                    <S.TransactionBaseCurrency>0.5 USD</S.TransactionBaseCurrency>
                  </S.TokenAmountWrapper>
                </S.TransactionHistoryContentWrapper>
                <RightIcon />
              </S.TransactionHistoryListItem>
            );
          })}
        </S.TransactionHistoryList>
      </S.TransactionHistoryContainer>
    </View>
  );
}

export default WalletTokenDetail;

//TODO: 데이터타입 확정 후 수정 필요
const mockData = {
  symbol: 'MVL',
  base: 'USD',
  transactionHistory: [
    {
      transactionType: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.CONFIRMED,
      amount: 1000,
      transactionAddress: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      transactionType: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.CONFIRMED,
      amount: 1000,
      transactionAddress: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      transactionType: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.canceled,
      amount: 1000,
      transactionAddress: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      transactionType: TRANSACTION_TYPE.RECEIVE,
      status: TRANSACTION_STATUS.CONFIRMED,
      amount: 1000,
      transactionAddress: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
    {
      transactionType: TRANSACTION_TYPE.SEND,
      status: TRANSACTION_STATUS.PENDING,
      amount: 1000,
      transactionAddress: 'sdgsgsdgdahgjagsk',
      date: '21.10.31 10:30',
    },
  ],
};
