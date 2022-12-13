// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { useTranslation } from 'react-i18next';

import { GasTextField } from '@@components/BasicComponents/TextFields/GasTextField';
import { getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { height } from '@@utils/ui';

import * as S from './GasFeeInputs.style';
import { IGasFeeInputsProps } from './GasFeeInputs.type';

function GasFeeInputs({
  enableTip,
  enableLimitCustom,
  customBaseFee,
  customTip,
  customGasLimit,
  setCustomBaseFee,
  setCustomTip,
  setCustomGasLimit,
}: IGasFeeInputsProps) {
  const { t } = useTranslation();
  const { selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);
  const tezosFeeType = network.networkFeeType === NETWORK_FEE_TYPE.TEZOS;

  return (
    <S.Container>
      <S.Label>{t('gas_price')}</S.Label>
      <S.InputWrapper>
        <GasTextField value={customBaseFee} setValue={setCustomBaseFee} unit={tezosFeeType ? 'mutez' : 'gwei'} disabled={tezosFeeType} />
      </S.InputWrapper>
      {enableTip && (
        <>
          <S.Label style={{ marginTop: height * 24 }}>{t('gas_tip')}</S.Label>
          <S.InputWrapper>
            <GasTextField value={customTip} setValue={setCustomTip} unit={tezosFeeType ? 'mutez' : 'gwei'} />
          </S.InputWrapper>
        </>
      )}
      {enableLimitCustom && (
        <>
          <S.Label style={{ marginTop: height * 24 }}>{t('gas_limit')}</S.Label>
          <S.InputWrapper>
            <GasTextField value={customGasLimit} setValue={setCustomGasLimit} />
          </S.InputWrapper>
        </>
      )}
    </S.Container>
  );
}

export default GasFeeInputs;
