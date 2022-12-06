import React, { useEffect, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import { ChevronRightBlackIcon, ChevronRightLightIcon } from '@@assets/image';
import { getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { TTransactionStatus, IGetTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';
import { useDi } from '@@hooks/useDi';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import { useAssetFromTheme } from '@@hooks/useTheme';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import { TTokenDetailRouteProps } from '@@screens/WalletScreen/WalletTokenDetail/WalletTokenDetail.type';
import { TCancelRootStackProps } from '@@screens/WalletScreen/WalletTransactionCancel/WalletTransactionCancel.type';
import { TTransactionHistoryRootStackProps } from '@@screens/WalletScreen/WalletTransactionHistory/WalletTransactionHistory.type';
import { TSpeedUpRootStackProps } from '@@screens/WalletScreen/WalletTransactionSpeedUp/WalletTransactionSpeedUp.type';
import settingPersistStore from '@@store/setting/settingPersistStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import * as S from './TransactionHistoryListItem.style';

function TransactionHistoryListItem(props: IGetTransactionHistoryResponse) {
  const { params } = useRoute<TTokenDetailRouteProps>();
  const [valueSign, setValueSign] = useState('');
  const { status, updatedAt, value, from } = props;
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  const isCanceled = status === TTransactionStatus.FAIL;

  const navigation = useNavigation<TTransactionHistoryRootStackProps | TCancelRootStackProps | TSpeedUpRootStackProps>();
  const walletService = useDi('WalletService');
  const { selectedNetwork: pickNetwork, selectedWalletIndex } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const { settedCurrency } = settingPersistStore();
  const network = getNetworkConfig(selectedNetwork);
  const price = useOneTokenPrice(params.tokenDto, value);

  const setSign = async () => {
    const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], bip44: network.bip44 });
    const valueSign = from === wallet.address ? '-' : '';
    setValueSign(valueSign);
  };
  useEffect(() => {
    setSign();
  }, []);

  // NOTE: 우선은 취소랑 스피드업 지원하지 않음
  // const goToSpeedUp = () => {
  //   navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_SPEED_UP);
  // };
  // const goToCancel = () => {
  //   navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_CANCEL);
  // };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_HISTORY, { ...props, tokenDto: params.tokenDto });
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
              <S.TransactionBaseCurrency isCanceled={isCanceled}>{`${valueSign} ${price} ${settedCurrency}`}</S.TransactionBaseCurrency>
            </S.TransactionAmountWrapper>
          </S.TransactionHistoryContentInnerWrapper>
          <RightIcon />
        </S.HistoryItemTopContent>
        {/* NOTE: 우선은 취소랑 스피드업 지원하지 않음 */}
        {/* {status === TTransactionStatus.PENDING && (
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
        )} */}
      </S.TransactionHistoryListItem>
    </Pressable>
  );
}

export default TransactionHistoryListItem;
