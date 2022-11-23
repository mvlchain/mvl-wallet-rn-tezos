import { useEffect, useState, useMemo } from 'react';

import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

import { EIP_1559_SUPPORT_NETWORK } from '@@constants/network.constant';
import { GAS_LEVEL, GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/transaction/GasService.type';
import { useDi } from '@@hooks/common/useDi';

const useGas = () => {
  const gasService = useDi('GasService');
  // advanced: user input
  const [advanced, setAdvanced] = useState(false);
  const [avgBlockGasPrice, setAvgBlockGasPrice] = useState<BigNumber | null>(null);
  const [maxBlockGasLimit, setMaxBlockGasLimit] = useState<BigNumber | null>(null);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);
  const [gasPrice, setGasPrice] = useState<BigNumber | null>(null);
  const [gasLimit, setGasLimit] = useState<BigNumber>(BigNumber.from(21000));

  //additional info for EIP1559
  const [maxFeePerGas, setMaxFeePerGas] = useState<BigNumber | null>(null);
  const [blockMaxFeePerGas, setBlockMaxFeePerGas] = useState<BigNumber | null>(null);
  const [blockMaxPriorityFeePerGas, setBlockMaxPriorityFeePerGas] = useState<BigNumber | null>(null);
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<BigNumber | null>(GAS_LEVEL_SETTING[gasLevel].maxPriorityFeePerGas);

  useEffect(() => {
    setInitialGas();
  }, []);

  //TODO: 나중에 입력받도록 수정 필요
  const networkInfo = { rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545', chainId: 97, name: 'Ethereum_testnet' };
  const setInitialGas = async () => {
    if (EIP_1559_SUPPORT_NETWORK.includes(networkInfo.name)) {
      const gasFeeData = await gasService.getEIP1559GasFeeData(networkInfo);
      setMaxFeePerGas(gasFeeData.maxFeePerGas);
      setBlockMaxFeePerGas(gasFeeData.maxFeePerGas);
      setBlockMaxPriorityFeePerGas(gasFeeData.maxPriorityFeePerGas);
      setMaxBlockGasLimit(gasFeeData.gasLimit);
    } else {
      const gasFeeData = await gasService.getGasFeeData(networkInfo);
      setAvgBlockGasPrice(gasFeeData.gasPrice);
      setMaxBlockGasLimit(gasFeeData.gasLimit);
      setGasPrice(gasFeeData.gasPrice);
    }
  };

  const totalGas = useMemo(() => {
    if (EIP_1559_SUPPORT_NETWORK.includes(networkInfo.name)) {
      if (advanced) {
        if (!maxFeePerGas || !maxPriorityFeePerGas) return '-';
        return gasService.getTotalGasFee_EIP1559({
          maxFeePerGas,
          maxPriorityFeePerGas,
          gasLimit,
          gasLevel,
        });
      } else {
        if (!blockMaxFeePerGas || !blockMaxPriorityFeePerGas) return '-';
        return gasService.getTotalGasFee_EIP1559({
          maxFeePerGas: blockMaxFeePerGas,
          maxPriorityFeePerGas: blockMaxPriorityFeePerGas,
          gasLimit,
        });
      }
    } else {
      if (advanced) {
        if (!gasPrice) return '-';
        return gasService.getTotalGasFee({
          gasPrice,
          gasLimit,
        });
      } else {
        if (!avgBlockGasPrice) return '-';
        return gasService.getTotalGasFee({
          gasPrice: avgBlockGasPrice,
          gasLimit,
          gasLevel,
        });
      }
    }
  }, [
    advanced,
    avgBlockGasPrice,
    gasLimit,
    gasLevel,
    gasPrice,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    blockMaxFeePerGas,
    blockMaxPriorityFeePerGas,
  ]);

  return {
    avgBlockGasPrice,
    maxBlockGasLimit,
    gasPrice,
    gasLimit,
    totalGas,
    advanced,
    gasLevel,
    maxFeePerGas,
    maxPriorityFeePerGas,
    setGasLevel,
    setAdvanced,
    setGasLimit,
    setGasPrice,
    setMaxFeePerGas,
    setMaxPriorityFeePerGas,
  };
};

export default useGas;
