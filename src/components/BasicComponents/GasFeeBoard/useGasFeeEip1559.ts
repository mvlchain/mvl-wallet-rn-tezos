import { useEffect, useState, useMemo } from 'react';

import { BigNumber } from 'ethers';

import { NETWORK_INFO } from '@@components/BasicComponents/GasFeeBoard/testNetworkEnv';
import { GAS_LEVEL, GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';
import { useDi } from '@@hooks/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useGas = () => {
  const gasService = useDi('GasService');
  const { selectedNetwork } = walletPersistStore();
  const [advanced, setAdvanced] = useState(false);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);
  const [gasLimit, setGasLimit] = useState<BigNumber>(BigNumber.from(21000));
  const [blockMaxFeePerGas, setBlockMaxFeePerGas] = useState<BigNumber | null>(null);
  const [blockMaxPriorityFeePerGas, setBlockMaxPriorityFeePerGas] = useState<BigNumber | null>(null);
  const [maxBlockGasLimit, setMaxBlockGasLimit] = useState<BigNumber | null>(null);
  const [maxFeePerGas, setMaxFeePerGas] = useState<BigNumber | null>(null);
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<BigNumber | null>(GAS_LEVEL_SETTING[gasLevel].maxPriorityFeePerGas);
  const [estimatedGas, setEstimatedGas] = useState<BigNumber | null>(null);

  //need estimated gas for EIP1559 total gas
  const { to, value, data } = transactionRequestStore();

  useEffect(() => {
    setInitialGas();
  }, []);

  useEffect(() => {
    estimateGas();
  }, [to, value, data]);

  const privateKey = '0x2b27eaa12c946c41c523324a9c4a87e386e4f90cc61844aedc6edea18320002a';

  const setInitialGas = async () => {
    const gasFeeData = (await gasService.getGasFeeData(selectedNetwork)) as IGasFeeInfoEip1559;
    setMaxFeePerGas(gasFeeData.maxFeePerGas);
    setBlockMaxFeePerGas(gasFeeData.maxFeePerGas);
    setBlockMaxPriorityFeePerGas(gasFeeData.maxPriorityFeePerGas);
    setMaxPriorityFeePerGas(gasFeeData.maxPriorityFeePerGas);
    setMaxBlockGasLimit(gasFeeData.gasLimit);
  };

  const estimateGas = async () => {
    if (!to || !value) return;
    const newEstimatedGas = (await gasService.estimateGas({
      to,
      value,
      selectedNetwork,
      privateKey,
    })) as BigNumber;

    setEstimatedGas(newEstimatedGas);
  };

  const transactionFee = useMemo(() => {
    if (advanced) {
      if (!maxFeePerGas || !maxPriorityFeePerGas) return '-';
      if (!estimatedGas) return '-';
      return gasService.getTotalGasFee({
        selectedNetwork,
        maxFeePerGas,
        maxPriorityFeePerGas,
        estimatedGas: estimatedGas as BigNumber,
      });
    } else {
      if (!blockMaxFeePerGas || !blockMaxPriorityFeePerGas) return '-';
      if (!estimatedGas) return '-';
      //TODO: maxPriorityFeePerGas 가져온 값을 그냥 사용할지 아니면 셋팅대로 갈지 확인후 수정필요
      return gasService.getTotalGasFee({
        selectedNetwork,
        maxFeePerGas: blockMaxFeePerGas,
        maxPriorityFeePerGas: blockMaxPriorityFeePerGas,
        estimatedGas: estimatedGas as BigNumber,
        gasLevel,
      });
    }
  }, [advanced, gasLimit, gasLevel, gasLimit, maxFeePerGas, maxPriorityFeePerGas, blockMaxFeePerGas, blockMaxPriorityFeePerGas, estimatedGas]);

  return {
    maxBlockGasLimit,
    gasLimit,
    transactionFee,
    advanced,
    gasLevel,
    maxFeePerGas,
    maxPriorityFeePerGas,
    setGasLevel,
    setAdvanced,
    setGasLimit,
    setMaxFeePerGas,
    setMaxPriorityFeePerGas,
  };
};

export default useGas;
