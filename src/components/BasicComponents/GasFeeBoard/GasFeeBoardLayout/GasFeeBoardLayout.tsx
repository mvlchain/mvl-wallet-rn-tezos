import React, { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, withSequence, withSpring, withTiming } from 'react-native-reanimated';

import { WarningIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import Toggle from '@@components/BasicComponents/Form/Toggle';
import { getNetworkByBase, getNetworkConfig } from '@@constants/network.constant';
import useCoinDto from '@@hooks/useCoinDto';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import gasStore from '@@store/gas/gasStore';
import settingPersistStore from '@@store/setting/settingPersistStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { formatBigNumber } from '@@utils/formatBigNumber';
import { width } from '@@utils/ui';

import * as S from './GasFeeBoardLayout.style';
import { IGasFeeBoardLayoutProps } from './GasFeeBoardLayout.type';

function GasFeeBoardLayout({
  isRevision,
  estimatedTime,
  advanced,
  onConfirm,
  toggleGasAdvanced,
  children,
  onConfirmTitle,
  hideDivider,
  onConfirmValid,
}: IGasFeeBoardLayoutProps) {
  const { t } = useTranslation();
  const { settedCurrency } = settingPersistStore();
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);
  const coin = getNetworkConfig(selectedNetwork).coin;
  const { total } = gasStore();
  const { coinDto } = useCoinDto();
  const totalStr = total ? formatBigNumber(total, coinDto.decimals).toString(10) : '-';
  const { price } = useOneTokenPrice(coinDto, totalStr);
  // const { toValid, valueValid } = transactionRequestStore();
  const { baseFeeValid, tipValid, gasValid } = gasStore();
  const isValid = onConfirmValid && baseFeeValid && tipValid && gasValid;

  const opacityAnimation = useAnimatedStyle(() => {
    return {
      opacity: withSequence(withTiming(0, { duration: 500 }), withSpring(1)),
    };
  }, [total]);

  return (
    <S.Container>
      <View>
        <S.InnerContainer>
          <S.Row>
            <S.BoardLabel>{t('transaction')}</S.BoardLabel>
            <S.ToggleWrapper>
              <S.Value>{t('advanced')}</S.Value>
              <Toggle checked={advanced} onPress={toggleGasAdvanced} style={{ marginLeft: width * 16 }} />
            </S.ToggleWrapper>
          </S.Row>
          {advanced ? children[1] : children[0]}
        </S.InnerContainer>
        {!hideDivider && <Divider thickness={DIVIDER_THICKNESS.THIN} />}
        <S.InnerContainer>
          {estimatedTime && (
            <S.Row>
              <S.Label>{t('estimated_time')}</S.Label>
              <S.Value>{estimatedTime}</S.Value>
            </S.Row>
          )}
          <S.MarginRow>
            <S.Label>{`${isRevision ? t('new') + ' ' : ''}${t('transaction_fee')}`}</S.Label>
            <Animated.View style={[opacityAnimation]}>
              <S.Value>{`${totalStr} ${coin}`}</S.Value>
            </Animated.View>
          </S.MarginRow>
          <Animated.View style={[opacityAnimation]}>
            <S.BaseCurrency>{`${price} ${settedCurrency}`}</S.BaseCurrency>
          </Animated.View>
          {!total && (
            <S.Warning>
              <S.WarningIconWrapper>
                <WarningIcon />
              </S.WarningIconWrapper>
              <S.WarningText>
                {estimatedTime ? t('warning_before_transaction_fee_input') : t('warning_before_transaction_fee_input_without_time')}
              </S.WarningText>
            </S.Warning>
          )}
        </S.InnerContainer>
      </View>
      <S.ConfirmWrapper>
        <PrimaryButton
          label={onConfirmTitle ? onConfirmTitle : t('next')}
          onPress={() => {
            onConfirm();
          }}
          disabled={!isValid}
        />
      </S.ConfirmWrapper>
    </S.Container>
  );
}

export default GasFeeBoardLayout;
