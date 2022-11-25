import { useEffect, useState, useMemo } from 'react';

import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

import { EIP_1559_SUPPORT_NETWORK, NETWORK } from '@@constants/network.constant';
import { GAS_LEVEL, GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/transaction/GasService.type';
import { useDi } from '@@hooks/common/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';

const useGas = () => {
  const gasService = useDi('GasService');

  // advanced mode means the value will from user direct input
  const [advanced, setAdvanced] = useState(false);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);

  //block means the value has from blockchain not from user input
  const [avgBlockGasPrice, setAvgBlockGasPrice] = useState<BigNumber | null>(null);
  const [maxBlockGasLimit, setMaxBlockGasLimit] = useState<BigNumber | null>(null);
  const [gasPrice, setGasPrice] = useState<BigNumber | null>(null);
  const [gasLimit, setGasLimit] = useState<BigNumber>(BigNumber.from(21000));

  //for EIP1559 (ETHEREUM network)
  const [blockMaxFeePerGas, setBlockMaxFeePerGas] = useState<BigNumber | null>(null);
  const [blockMaxPriorityFeePerGas, setBlockMaxPriorityFeePerGas] = useState<BigNumber | null>(null);
  const [maxFeePerGas, setMaxFeePerGas] = useState<BigNumber | null>(null);
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<BigNumber | null>(GAS_LEVEL_SETTING[gasLevel].maxPriorityFeePerGas);

  //need estimated gas for EIP1559 total gas
  const { to, value, data } = transactionRequestStore();
  const transactionService = useDi('EtherTransactionService');

  useEffect(() => {
    setInitialGas();
  }, []);

  const privateKey = '0x8082bea335283b2ac437fb6a93530dcf8aea48db478f7b0df871568d17b0094e';
  const setInitialGas = async () => {
    if (EIP_1559_SUPPORT_NETWORK.includes(networkInfo.name)) {
      const gasFeeData = await gasService.getEIP1559GasFeeData(networkInfo);
      setMaxFeePerGas(gasFeeData.maxFeePerGas);
      setBlockMaxFeePerGas(gasFeeData.maxFeePerGas);
      setBlockMaxPriorityFeePerGas(gasFeeData.maxPriorityFeePerGas);
      setMaxPriorityFeePerGas(gasFeeData.maxPriorityFeePerGas);
      setMaxBlockGasLimit(gasFeeData.gasLimit);
    } else {
      const gasFeeData = await gasService.getGasFeeData(networkInfo);
      setAvgBlockGasPrice(gasFeeData.gasPrice);
      setMaxBlockGasLimit(gasFeeData.gasLimit);
      setGasPrice(gasFeeData.gasPrice);
    }
  };

  const transactionFee = useMemo(async () => {
    if (EIP_1559_SUPPORT_NETWORK.includes(networkInfo.name)) {
      if (advanced) {
        if (!maxFeePerGas || !maxPriorityFeePerGas) return '-';
        if (!to || !value) return '-';
        const estimatedGas = await transactionService.estimateGas({
          to,
          value,
          networkInfo,
          privateKey,
        });
        if (!estimatedGas) return '-';
        return gasService.getTotalGasFee_EIP1559({
          maxFeePerGas,
          maxPriorityFeePerGas,
          estimatedGas: estimatedGas as BigNumber,
        });
      } else {
        if (!blockMaxFeePerGas || !blockMaxPriorityFeePerGas) return '-';
        if (!to || !value) return '-';
        const estimatedGas = await transactionService.estimateGas({
          to,
          value,
          networkInfo,
          privateKey,
        });
        if (!estimatedGas) return '-';
        //TODO: maxPriorityFeePerGas 가져온 값을 그냥 사용할지 아니면 셋팅대로 갈지 확인후 수정필요
        return gasService.getTotalGasFee_EIP1559({
          maxFeePerGas: blockMaxFeePerGas,
          maxPriorityFeePerGas: blockMaxPriorityFeePerGas,
          estimatedGas: estimatedGas as BigNumber,
          gasLevel,
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
    to,
    value,
    data,
  ]);

  return {
    avgBlockGasPrice,
    maxBlockGasLimit,
    gasPrice,
    gasLimit,
    transactionFee,
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
