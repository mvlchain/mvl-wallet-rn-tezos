import { useState, useCallback } from 'react';

import { BigNumber } from 'ethers';

import { GAS_LEVEL } from '@@constants/gas.constant';
import { NETWORK_FEE_TYPE, getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { IGasFeeInfo, TGasLevel } from '@@domain/gas/GasService.type';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import useEstimatedGas from './hooks/useEstimatedGas';
import useGetTotalGas from './hooks/useGetTotalFee';
import useInitializeGasSet from './hooks/useInitializeGasSet';
import useSetCustom from './hooks/useSetCustom';

const useGasFeeBoard = (tokenDto: TokenDto, onConfirm: (param: IGasFeeInfo) => Promise<void>) => {
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const network = getNetworkConfig(selectedNetwork);

  //The setted value
  const [advanced, setAdvanced] = useState(false);
  const [gasLevel, setGasLevel] = useState<TGasLevel>(GAS_LEVEL.LOW);
  const [gasLimit, setGasLimit] = useState<BigNumber | null>(null);

  //The reference values from blockchain
  const [estimatedGas, setEstimatedGas] = useState<BigNumber | null>(null);
  const [baseFee, setBaseFee] = useState<BigNumber | null>(null);
  const [enableTip, setEnableTip] = useState<boolean>(false);
  const [enableLimitCustom, setEnableLimitCustom] = useState<boolean>(true);

  //The values to be entered by the user
  const [customBaseFee, setCustomBaseFee] = useState<BigNumber | null>(null);
  const [customTip, setCustomTip] = useState<BigNumber | null>(null);
  const [customGasLimit, setCustomGasLimit] = useState<BigNumber | null>(null);

  const { transactionFee } = useGetTotalGas({ customBaseFee, customGasLimit, customTip, estimatedGas });
  useSetCustom({ setCustomBaseFee, setCustomTip, setCustomGasLimit, gasLevel, baseFee, estimatedGas });
  useEstimatedGas({ tokenDto, setEstimatedGas, setCustomGasLimit, setBaseFee });
  useInitializeGasSet({
    setEnableTip,
    setEnableLimitCustom,
    setBaseFee,
    setGasLimit,
    setCustomGasLimit,
  });

  const toggleGasAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  const isGasReady = () => {
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        return customBaseFee && customGasLimit && customTip && transactionFee !== '-';
      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        return customBaseFee && customGasLimit && transactionFee !== '-';
      case NETWORK_FEE_TYPE.TEZOS:
        return customBaseFee && customGasLimit && customTip && transactionFee !== '-';
    }
  };

  //Wrap up the send transaction function which from useTokenSend and inject parameters
  const onConfirmGasFee = useCallback(async () => {
    if (!isGasReady()) return;
    onConfirm({ baseFee: customBaseFee!, tip: customTip!, gasLimit: customGasLimit!, total: parseFloat(transactionFee) });
  }, [customBaseFee, customGasLimit, transactionFee, customTip, enableTip, onConfirm]);

  return {
    advanced,
    gasLevel,
    gasLimit,
    enableTip,
    enableLimitCustom,
    estimatedGas,
    customBaseFee,
    customTip,
    customGasLimit,
    transactionFee,
    setGasLevel,
    setCustomBaseFee,
    setCustomTip,
    setCustomGasLimit,
    toggleGasAdvanced,
    onConfirmGasFee,
  };
};

export default useGasFeeBoard;
