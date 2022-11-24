import React from 'react';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { WarningIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import Divider from '@@components/BasicComponents/Divider';
import { DIVIDER_THICKNESS } from '@@components/BasicComponents/Divider/Divider.type';
import Toggle from '@@components/BasicComponents/Form/Toggle';
import { EIP_1559_SUPPORT_NETWORK, NETWORK } from '@@constants/network.constant';
import useGas from '@@hooks/transaction/useGas';
import { width } from '@@utils/ui';

import SpeedInputs from './SpeedInputs';
import SpeedInputsEIP1559 from './SpeedInputs/SpeedInputsEIP1559';
import * as S from './SpeedOperationBoard.style';
import { ISpeedOperationBoardProps } from './SpeedOperationBoard.type';
import SpeedRadioButtons from './SpeedRadioButtons';

function SpeedOperationBoard({ onConfirm }: ISpeedOperationBoardProps) {
  const { t } = useTranslation();
  const {
    gasLimit,
    gasPrice,
    gasLevel,
    totalGas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    advanced,
    setGasLevel,
    setAdvanced,
    setGasPrice,
    setGasLimit,
    setMaxFeePerGas,
    setMaxPriorityFeePerGas,
  } = useGas();

  return (
    <S.Container>
      <View>
        <S.InnerContainer>
          <S.Row>
            <S.BoardLabel>{t('transaction')}</S.BoardLabel>
            <S.ToggleWrapper>
              <S.Value>{t('advanced')}</S.Value>
              <Toggle
                checked={advanced}
                onPress={() => {
                  setAdvanced(!advanced);
                }}
                style={{ marginLeft: width * 16 }}
              />
            </S.ToggleWrapper>
          </S.Row>
          {advanced && EIP_1559_SUPPORT_NETWORK.includes(networkInfo.name) && (
            <SpeedInputsEIP1559
              maxFeePerGas={maxFeePerGas}
              maxPriorityFeePerGas={maxPriorityFeePerGas}
              gasLimit={gasLimit}
              setMaxFeePerGas={setMaxFeePerGas}
              setMaxPriorityFeePerGas={setMaxPriorityFeePerGas}
              setGasLimit={setGasLimit}
            />
          )}
          {advanced && !EIP_1559_SUPPORT_NETWORK.includes(networkInfo.name) && (
            <SpeedInputs gasPrice={gasPrice} gasLimit={gasLimit} setGasPrice={setGasPrice} setGasLimit={setGasLimit} />
          )}
          {!advanced && <SpeedRadioButtons setGasLevel={setGasLevel} gasLevel={gasLevel} />}
        </S.InnerContainer>
        <Divider thickness={DIVIDER_THICKNESS.THIN} />
        <S.InnerContainer>
          <S.Row>
            <S.Label>{t('estimated_time')}</S.Label>
            <S.Value>{'~ 2 min 0 sec'}</S.Value>
          </S.Row>
          <S.MarginRow>
            <S.Label>{t('new_transaction_fee')}</S.Label>
            <S.Value>
              {totalGas}
              {'BNB'}
            </S.Value>
          </S.MarginRow>
          <S.BaseCurrency>{'6.30 USD'}</S.BaseCurrency>
          <S.Warning>
            <S.WarningIconWrapper>
              <WarningIcon />
            </S.WarningIconWrapper>
            <S.WarningText>{'Please sest your~~~'}</S.WarningText>
          </S.Warning>
        </S.InnerContainer>
      </View>
      <S.ConfirmWrapper>
        <PrimaryButton label={t('confirm')} onPress={onConfirm} />
      </S.ConfirmWrapper>
    </S.Container>
  );
}

export default SpeedOperationBoard;
