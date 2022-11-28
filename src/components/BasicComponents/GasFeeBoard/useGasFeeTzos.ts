import { useEffect, useState, useMemo } from 'react';

import { Estimate } from '@taquito/taquito';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

import { NETWORK_INFO } from '@@components/BasicComponents/GasFeeBoard/testNetworkEnv';
import { EIP_1559_SUPPORT_NETWORK, NETWORK, TEZOS_NETWORK } from '@@constants/network.constant';
import { GAS_LEVEL, GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';
import { useDi } from '@@hooks/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useGas = () => {
  const gasService = useDi('GasService');
  const { selectedNetwork } = walletPersistStore();

  const [advanced, setAdvanced] = useState(false);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);
  const [baseFee, setBaseFee] = useState<number | null>(null);
  const [additionalFee, setAdditionalFee] = useState<number>(GAS_LEVEL_SETTING[GAS_LEVEL.LOW].tezosAdditionalFee);
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
    setBaseFee(baseFeeInDecimal.toNumber);
  };

  const transactionFee = useMemo(() => {
    if (advanced) {
      if (!baseFee || !additionalFee) return '-';
      return gasService.getTotalGasFee({
        selectedNetwork,
        baseFee,
        additionalFee,
      });
    } else {
      if (!baseFee) return '-';
      return gasService.getTotalGasFee({
        selectedNetwork,
        baseFee,
        gasLevel,
      });
    }
  }, [advanced, gasLevel, baseFee, additionalFee]);

  return {
    advanced,
    gasLevel,
    baseFee,
    additionalFee,
    transactionFee,
    setAdditionalFee,
    setGasLevel,
    setAdvanced,
  };
};

export default useGas;
