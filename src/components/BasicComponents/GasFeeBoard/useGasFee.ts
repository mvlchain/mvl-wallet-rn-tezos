import { useEffect, useState, useMemo } from 'react';

import { BigNumber } from 'ethers';

import { GAS_LEVEL } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import { useDi } from '@@hooks/useDi';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useGasFee = () => {
  const gasService = useDi('GasService');
  const { selectedNetwork } = walletPersistStore();

  // advanced mode means the value will from user direct input
  const [advanced, setAdvanced] = useState(false);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);

  //block means the value has from blockchain not from user input
  const [avgBlockGasPrice, setAvgBlockGasPrice] = useState<BigNumber | null>(null);
  const [maxBlockGasLimit, setMaxBlockGasLimit] = useState<BigNumber | null>(null);
  const [gasPrice, setGasPrice] = useState<BigNumber | null>(null);
  const [gasLimit, setGasLimit] = useState<BigNumber>(BigNumber.from(21000));

  useEffect(() => {
    setInitialGas();
  }, []);

  const setInitialGas = async () => {
    const gasFeeData = (await gasService.getGasFeeData(selectedNetwork)) as IGasFeeInfo;
    setAvgBlockGasPrice(gasFeeData.gasPrice);
    setMaxBlockGasLimit(gasFeeData.gasLimit);
    setGasPrice(gasFeeData.gasPrice);
  };

  const transactionFee = useMemo(() => {
    if (advanced) {
      if (!gasPrice) return '-';
      return gasService.getTotalGasFee({
        selectedNetwork,
        gasPrice,
        gasLimit,
      });
    } else {
      if (!avgBlockGasPrice) return '-';
      return gasService.getTotalGasFee({
        selectedNetwork,
        gasPrice: avgBlockGasPrice,
        gasLimit,
        gasLevel,
      });
    }
  }, [advanced, avgBlockGasPrice, gasLimit, gasLevel, gasPrice, gasLimit]);

  return {
    avgBlockGasPrice,
    maxBlockGasLimit,
    gasPrice,
    gasLimit,
    transactionFee,
    advanced,
    gasLevel,
    setGasLevel,
    setAdvanced,
    setGasLimit,
    setGasPrice,
  };
};

export default useGasFee;
