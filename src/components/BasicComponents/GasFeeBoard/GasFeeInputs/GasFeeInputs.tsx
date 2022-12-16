// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { GasTextField } from '@@components/BasicComponents/TextFields/GasTextField';
import { GAS_UNIT } from '@@constants/gas.constant';
import { getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import gasStore from '@@store/gas/gasStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { height } from '@@utils/ui';

import * as S from './GasFeeInputs.style';
import { IGasFeeInputsProps } from './GasFeeInputs.type';

function GasFeeInputs({ enableTip, enableLimitCustom }: IGasFeeInputsProps) {
  const { t } = useTranslation();
  const { selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);
  const tezosFeeType = network.networkFeeType === NETWORK_FEE_TYPE.TEZOS;
  const { baseFee, gas, tip, setState } = gasStore();

  const setBaseFee = (baseFee: BigNumber) => {
    setState({ baseFee });
  };
  const setTip = (tip: BigNumber) => {
    setState({ tip });
  };
  const setGas = (gas: BigNumber) => {
    setState({ gas });
  };

  return (
    <S.Container>
      <S.Label>{t('gas_price')}</S.Label>
      <S.InputWrapper>
        <GasTextField value={baseFee} setValue={setBaseFee} unit={tezosFeeType ? GAS_UNIT.MUTEZ : GAS_UNIT.GWEI} />
      </S.InputWrapper>
      {enableTip && (
        <>
          <S.Label style={{ marginTop: height * 24 }}>{t('gas_tip')}</S.Label>
          <S.InputWrapper>
            <GasTextField value={tip} setValue={setTip} unit={tezosFeeType ? GAS_UNIT.MUTEZ : GAS_UNIT.GWEI} />
          </S.InputWrapper>
        </>
      )}
      {enableLimitCustom && (
        <>
          <S.Label style={{ marginTop: height * 24 }}>{t('gas_limit')}</S.Label>
          <S.InputWrapper>
            <GasTextField value={gas} setValue={setGas} />
          </S.InputWrapper>
        </>
      )}
    </S.Container>
  );
}

export default GasFeeInputs;
