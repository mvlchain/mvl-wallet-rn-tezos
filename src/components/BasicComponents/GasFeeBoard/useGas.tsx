import { useEffect, useState, useMemo } from 'react';

import { Estimate } from '@taquito/taquito';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

import { NETWORK_INFO } from '@@components/BasicComponents/GasFeeBoard/testNetworkEnv';
import { EIP_1559_SUPPORT_NETWORK, NETWORK, TEZOS_NETWORK } from '@@constants/network.constant';
import { GAS_LEVEL, GAS_LEVEL_SETTING } from '@@constants/transaction.constant';
import { TGasLevel } from '@@domain/transaction/GasService.type';
import { useDi } from '@@hooks/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useGas = () => {
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

  //for EIP1559 (ETHEREUM network)
  const [blockMaxFeePerGas, setBlockMaxFeePerGas] = useState<BigNumber | null>(null);
  const [blockMaxPriorityFeePerGas, setBlockMaxPriorityFeePerGas] = useState<BigNumber | null>(null);
  const [maxFeePerGas, setMaxFeePerGas] = useState<BigNumber | null>(null);
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<BigNumber | null>(GAS_LEVEL_SETTING[gasLevel].maxPriorityFeePerGas);
  const [estimatedGas, setEstimatedGas] = useState<BigNumber | null>(null);

  //need estimated gas for EIP1559 total gas
  const { to, value, data } = transactionRequestStore();
  const ethersTransactionService = useDi('EtherTransactionService');
  const tezosTransactionService = useDi('TezosTransactionService');

  useEffect(() => {
    setInitialGas();
  }, []);

  useEffect(() => {
    estimateGas();
  }, [to, value, data]);
  const networkInfo = NETWORK_INFO[selectedNetwork];
  const privateKey = '0x2b27eaa12c946c41c523324a9c4a87e386e4f90cc61844aedc6edea18320002a';

  const setInitialGas = async () => {
    if (EIP_1559_SUPPORT_NETWORK.includes(selectedNetwork)) {
      const gasFeeData = await gasService.getEIP1559GasFeeData(networkInfo);
      console.log('gasFeeData', gasFeeData);
      setMaxFeePerGas(gasFeeData.maxFeePerGas);
      setBlockMaxFeePerGas(gasFeeData.maxFeePerGas);
      setBlockMaxPriorityFeePerGas(gasFeeData.maxPriorityFeePerGas);
      setMaxPriorityFeePerGas(gasFeeData.maxPriorityFeePerGas);
      setMaxBlockGasLimit(gasFeeData.gasLimit);
    } else {
      const gasFeeData = await gasService.getGasFeeData(networkInfo);
      console.log('gasFeeData', gasFeeData);
      setAvgBlockGasPrice(gasFeeData.gasPrice);
      setMaxBlockGasLimit(gasFeeData.gasLimit);
      setGasPrice(gasFeeData.gasPrice);
    }
  };

  const estimateGas = async () => {
    // if (!to || !value) return;
    if (TEZOS_NETWORK.includes(selectedNetwork)) {
      const newEstimatedGas = (await tezosTransactionService.estimateGas({
        to: 'tz1TbtL8o42styDAngvPkKBb6wpgTnT71m3t',
        value: 2,
        networkInfo,
        privateKey: 'edsk2rKA8YEExg9Zo2qNPiQnnYheF1DhqjLVmfKdxiFfu5GyGRZRnb',
      })) as Estimate;

      //기본적으로 소각되는 비용
      // let baseFee = mutezToTz(newEstimatedGas.burnFeeMutez + newEstimatedGas.suggestedFeeMutez);
      //feeoption은
      console.log(
        '>>>>>>>>>>>>',
        newEstimatedGas.burnFeeMutez,
        newEstimatedGas.suggestedFeeMutez,
        newEstimatedGas.totalCost,
        newEstimatedGas.minimalFeeMutez,
        newEstimatedGas.usingBaseFeeMutez
      );
      // setEstimatedGas(newEstimatedGas.suggestedFeeMutez);
    } else {
      const newEstimatedGas = (await ethersTransactionService.estimateGas({
        to,
        value,
        networkInfo,
        privateKey,
      })) as BigNumber;

      setEstimatedGas(newEstimatedGas);
    }
  };

  const transactionFee = useMemo(() => {
    if (EIP_1559_SUPPORT_NETWORK.includes(selectedNetwork)) {
      if (advanced) {
        if (!maxFeePerGas || !maxPriorityFeePerGas) return '-';
        if (!estimatedGas) return '-';
        return gasService.getTotalGasFee_EIP1559({
          maxFeePerGas,
          maxPriorityFeePerGas,
          estimatedGas: estimatedGas as BigNumber,
        });
      } else {
        if (!blockMaxFeePerGas || !blockMaxPriorityFeePerGas) return '-';
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
    estimatedGas,
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
