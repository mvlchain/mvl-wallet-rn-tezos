import { useMemo } from 'react';

import { BigNumber } from 'ethers';

import { getNetworkConfig, getNetworkName, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useGetTotalGas = ({
  customBaseFee,
  customGasLimit,
  customTip,
  estimatedGas,
}: {
  customBaseFee: BigNumber | null;
  customGasLimit: BigNumber | null;
  customTip: BigNumber | null;
  estimatedGas: BigNumber | null;
}) => {
  const gasService = useDi('GasService');
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const network = getNetworkConfig(selectedNetwork);

  const isTransactionFeeReady = useMemo(() => {
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        return customBaseFee && customGasLimit && customTip;
      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        return customBaseFee && customGasLimit;
      case NETWORK_FEE_TYPE.TEZOS:
        return customBaseFee && customGasLimit && customTip;
    }
  }, [customBaseFee, customGasLimit, customTip]);

  const transactionFee = useMemo(() => {
    if (!isTransactionFeeReady) return '-';
    const total = gasService.getTotalGasFee({
      selectedNetwork,
      baseFee: customBaseFee!,
      tip: customTip,
      gasLimit: customGasLimit,
      estimatedGas,
    });
    if (!total) {
      console.log('fail to get total');
      return '-';
    }
    return total;
  }, [customBaseFee, customTip, customGasLimit, estimatedGas]);

  return { transactionFee };
};

export default useGetTotalGas;
