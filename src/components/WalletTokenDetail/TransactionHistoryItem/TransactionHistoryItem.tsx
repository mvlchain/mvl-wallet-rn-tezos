import React, { useEffect, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';

import { ChevronRightBlackIcon, ChevronRightLightIcon } from '@@assets/image';
import { getNetworkConfig, getNetworkByBase } from '@@constants/network.constant';
import { TTransactionStatus, IGetTransactionHistoryResponse } from '@@domain/transaction/TransactionService.type';
import useRefreshTransactionQuery from '@@hooks/queries/useRefreshTransactionQuery';
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
import { getDateFormat } from '@@utils/dateFormatter';
import { formatBigNumber } from '@@utils/formatBigNumber';

import * as S from './TransactionHistoryListItem.style';

function TransactionHistoryListItem(props: IGetTransactionHistoryResponse) {
  const { params } = useRoute<TTokenDetailRouteProps>();
  const [valueSign, setValueSign] = useState('');
  const [refreshHash, setRefreshHash] = useState<string>('');
  const [displayStatus, setDisplayStatus] = useState<TTransactionStatus>(props.status);
  const { status, updatedAt, value: bnValue, from } = props;
  const value = formatBigNumber(new BigNumber(bnValue), params.tokenDto.decimals).toString(10);
  const RightIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  const isCanceled = status === TTransactionStatus.FAIL;

  const navigation = useNavigation<TTransactionHistoryRootStackProps | TCancelRootStackProps | TSpeedUpRootStackProps>();
  const walletService = useDi('WalletService');
  const { selectedNetwork: pickNetwork, selectedWalletIndex } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);
  const { settedCurrency } = settingPersistStore();
  const network = getNetworkConfig(selectedNetwork);
  const { price } = useOneTokenPrice(params.tokenDto, value);
  useRefreshTransactionQuery(
    { network: network.networkId, hash: refreshHash },
    {
      enabled: !!refreshHash,
      onSuccess: (data) => {
        setDisplayStatus(data.status as TTransactionStatus);
      },
    }
  );

  const setSign = async () => {
    const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], network: selectedNetwork });
    const valueSign = from === wallet.address ? '-' : '';
    setValueSign(valueSign);
  };

  useEffect(() => {
    if (status === TTransactionStatus.PENDING) {
      setRefreshHash(props.hash);
    }
  }, [status]);

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
        navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_HISTORY, {
          ...props,
          status: displayStatus,
          tokenDto: params.tokenDto,
        });
      }}
    >
      <S.TransactionHistoryListItem>
        <S.HistoryItemTopContent>
          <S.TransactionHistoryContentInnerWrapper>
            <S.TransactionStatusWrapper>
              <S.TransactionStatus>{displayStatus}</S.TransactionStatus>
              <S.TransactionDate>{getDateFormat(updatedAt)}</S.TransactionDate>
            </S.TransactionStatusWrapper>
            <S.TransactionAmountWrapper>
              <S.TransactionAmount isCanceled={isCanceled}>
                {valueSign}
                {value}
              </S.TransactionAmount>
              <S.TransactionBaseCurrency isCanceled={isCanceled}>{`${valueSign} ${price} ${settedCurrency}`}</S.TransactionBaseCurrency>
            </S.TransactionAmountWrapper>
          </S.TransactionHistoryContentInnerWrapper>
          <S.IconWrapper>
            <RightIcon />
          </S.IconWrapper>
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
