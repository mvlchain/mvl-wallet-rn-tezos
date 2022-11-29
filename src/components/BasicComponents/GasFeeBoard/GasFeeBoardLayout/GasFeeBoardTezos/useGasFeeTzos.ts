import { useEffect, useState, useMemo, useCallback } from 'react';

import { Estimate } from '@taquito/taquito';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

import { GAS_LEVEL, GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import { useDi } from '@@hooks/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useGasFeeTezos = () => {
  const gasService = useDi('GasService');
  const { selectedNetwork } = walletPersistStore();

  const [advanced, setAdvanced] = useState(false);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);
  const [baseFee, setBaseFee] = useState<BigNumber | null>(null);
  const [additionalFee, setAdditionalFee] = useState<BigNumber>(GAS_LEVEL_SETTING[GAS_LEVEL.LOW].tezosAdditionalFee);
  const { to, value, data } = transactionRequestStore();

  useEffect(() => {
    estimateGas();
  }, [to, value, data]);

  const estimateGas = async () => {
    if (!to || !value) return;

    const newEstimatedGas = (await gasService.estimateGas({
      to: 'tz1TbtL8o42styDAngvPkKBb6wpgTnT71m3t',
      value: 2,
      selectedNetwork,
      privateKey: 'edsk2rKA8YEExg9Zo2qNPiQnnYheF1DhqjLVmfKdxiFfu5GyGRZRnb',
    })) as Estimate;

    const burnFeeMutezInDecimal = new Decimal(newEstimatedGas.burnFeeMutez);
    const suggestedFeeMutezInDecimal = new Decimal(newEstimatedGas.suggestedFeeMutez);
    const baseFeeInDecimal = burnFeeMutezInDecimal.add(suggestedFeeMutezInDecimal);
    setBaseFee(parseUnits(baseFeeInDecimal.toString(), 'gwei'));
  };

  const transactionFee = useMemo(() => {
    if (advanced) {
      if (!baseFee || !additionalFee) return '-';
      return gasService.getTotalGasFee({
        selectedNetwork,
        baseFee: baseFee.toNumber(),
        additionalFee: additionalFee.toNumber(),
      });
    } else {
      if (!baseFee) return '-';
      return gasService.getTotalGasFee({
        selectedNetwork,
        baseFee: baseFee.toNumber(),
        gasLevel,
      });
    }
  }, [advanced, gasLevel, baseFee, additionalFee]);

  const handleAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  return {
    advanced,
    gasLevel,
    baseFee,
    additionalFee,
    transactionFee,
    setAdditionalFee,
    setGasLevel,
    handleAdvanced,
  };
};

export default useGasFeeTezos;
