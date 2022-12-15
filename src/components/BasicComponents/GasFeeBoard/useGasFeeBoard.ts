import { useState, useCallback } from 'react';

import { BigNumber } from 'ethers';

import { GAS_LEVEL } from '@@constants/gas.constant';
import { NETWORK_FEE_TYPE, getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { IGasFeeInfo, TGasLevel } from '@@domain/gas/GasService.type';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import useEstimateGas from './hooks/useEstimateGas';
import useGetTotalGas from './hooks/useGetTotalFee';
import useSetAmount from './hooks/useSetAmountMax';
import useSetCustom from './hooks/useSetCustom';
import useSetInitial from './hooks/useSetInitial';

const useGasFeeBoard = (tokenDto: TokenDto, onConfirm: (param: IGasFeeInfo) => Promise<void>) => {
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const network = getNetworkConfig(selectedNetwork);

  //The setted value
  const [advanced, setAdvanced] = useState(false);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);
  const [enableTip, setEnableTip] = useState<boolean>(false);
  const [enableLimitCustom, setEnableLimitCustom] = useState<boolean>(true);

  //The reference values from blockchain
  const [gas, setGas] = useState<BigNumber | null>(null);
  const [baseFee, setBaseFee] = useState<BigNumber | null>(null);

  //The values to be entered on input by user or to be changed by selected level
  const [customBaseFee, setCustomBaseFee] = useState<BigNumber | null>(null);
  const [customTip, setCustomTip] = useState<BigNumber | null>(null);
  const [customGas, setCustomGas] = useState<BigNumber | null>(null);

  const { transactionFee } = useGetTotalGas({ customBaseFee, customGas, customTip, gas });
  useSetCustom({ setCustomBaseFee, setCustomTip, setCustomGas, gasLevel, baseFee, gas });
  useEstimateGas({ tokenDto, setGas, setBaseFee });
  useSetInitial({
    setEnableTip,
    setEnableLimitCustom,
    setBaseFee,
    setGas,
    setCustomGas,
  });
  useSetAmount(transactionFee, tokenDto);

  const toggleGasAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  const isGasReady = () => {
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        return customBaseFee && customGas && customTip && transactionFee !== '-';
      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        return customBaseFee && customGas && transactionFee !== '-';
      case NETWORK_FEE_TYPE.TEZOS:
        return customBaseFee && customGas && customTip && transactionFee !== '-';
    }
  };

  //Wrap up the send transaction function which from useTokenSend and inject parameters
  const onConfirmGasFee = useCallback(async () => {
    if (!isGasReady()) return;
    onConfirm({ baseFee: customBaseFee!, tip: customTip!, gas: customGas!, total: parseFloat(transactionFee) });
  }, [customBaseFee, customGas, transactionFee, customTip, enableTip, onConfirm]);

  return {
    advanced,
    gasLevel,
    enableTip,
    enableLimitCustom,
    customBaseFee,
    customTip,
    customGas,
    transactionFee,
    setGasLevel,
    setCustomBaseFee,
    setCustomTip,
    setCustomGas,
    toggleGasAdvanced,
    onConfirmGasFee,
  };
};

export default useGasFeeBoard;
