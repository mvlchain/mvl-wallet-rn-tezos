import React from 'react';

import { useTranslation } from 'react-i18next';
import { View, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { WarningIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import Toggle from '@@components/BasicComponents/Form/Toggle';
import { COIN_DTO, NETWORK_CONFIGS, getNetworkName } from '@@constants/network.constant';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import settingPersistStore from '@@store/setting/settingPersistStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { width } from '@@utils/ui';

import * as S from './GasFeeBoardLayout.style';
import { IGasFeeBoardLayoutProps } from './GasFeeBoardLayout.type';

function GasFeeBoardLayout({ isRevision, estimatedTime, transactionFee, advanced, onConfirm, toggleGasAdvanced, children }: IGasFeeBoardLayoutProps) {
  const { t } = useTranslation();
  const { settedCurrency } = settingPersistStore();
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const coin = NETWORK_CONFIGS[selectedNetwork].coin;
  const { price } = useOneTokenPrice(COIN_DTO[coin], transactionFee);
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
        <Divider thickness={DIVIDER_THICKNESS.THIN} />
        <S.InnerContainer>
          {estimatedTime && (
            <S.Row>
              <S.Label>{t('estimated_time')}</S.Label>
              <S.Value>{estimatedTime}</S.Value>
            </S.Row>
          )}
          <S.MarginRow>
            <S.Label>{`${isRevision ? t('new') + ' ' : ''}${t('transaction_fee')}`}</S.Label>
            <S.Value>{`${transactionFee} ${coin}`}</S.Value>
          </S.MarginRow>
          <S.BaseCurrency>{`${price} ${settedCurrency}`}</S.BaseCurrency>
          {transactionFee === '-' && (
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
          label={t('confirm')}
          onPress={() => {
            onConfirm();
          }}
        />
      </S.ConfirmWrapper>
    </S.Container>
  );
}

export default GasFeeBoardLayout;
