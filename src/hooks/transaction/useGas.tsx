import { useEffect, useState, useMemo } from 'react';

import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

import { GAS_LEVEL } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/transaction/GasService.type';
import { useDi } from '@@hooks/common/useDi';

const useGas = () => {
  const gasService = useDi('GasService');
  const [advanced, setAdvanced] = useState(false);
  const [avgBlockGasPrice, setAvgBlockGasPrice] = useState<BigNumber | null>(null);
  const [maxBlockGasLimit, setMaxBlockGasLimit] = useState<BigNumber | null>(null);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);
  const [gasPrice, setGasPrice] = useState<BigNumber | null>(null);
  const [gasLimit, setGasLimit] = useState<BigNumber>(BigNumber.from(21000));

  useEffect(() => {
    setInitialGas();
  }, []);

  //TODO: 나중에 입력받도록 수정 필요
  const networkInfo = { rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545', chainId: 97 };
  const setInitialGas = async () => {
    const gasInfo = await gasService.getGasInfo(networkInfo);
    setAvgBlockGasPrice(gasInfo.gasPrice);
    setMaxBlockGasLimit(gasInfo.gasLimit);
    setGasPrice(gasInfo.gasPrice);
  };

  const totalGas = useMemo(() => {
    if (!advanced) {
      if (!avgBlockGasPrice) return '-';
      const levelmultipledGasPrice = BigNumber.from(new Decimal(avgBlockGasPrice.toString()).mul(gasLevel).toString());
      const totalGasBN = levelmultipledGasPrice.mul(gasLimit);
      return formatEther(totalGasBN);
    } else {
      if (!gasPrice) return '-';
      const totalGasBN = gasPrice.mul(gasLimit);
      return formatEther(totalGasBN);
    }
  }, [avgBlockGasPrice, gasLimit, advanced, gasLevel, gasPrice, gasLimit]);

  return {
    avgBlockGasPrice,
    maxBlockGasLimit,
    gasPrice,
    gasLimit,
    totalGas,
    advanced,
    gasLevel,
    setGasLevel,
    setAdvanced,
    setGasLimit,
    setGasPrice,
  };
};

export default useGas;
