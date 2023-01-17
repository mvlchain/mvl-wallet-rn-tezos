import { useEffect, useMemo } from 'react';

import { BigNumber } from 'bignumber.js';
import { BytesLike } from 'ethers';

import { getNetworkConfig, getNetworkByBase, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import gasStore from '@@store/gas/gasStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useSetTotal = ({ blockGas }: { blockGas: BigNumber | null }) => {
  const gasService = useDi('GasService');
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);
  const network = getNetworkConfig(selectedNetwork);
  const { baseFee, tip, gas, setState } = gasStore();

  const isTransactionFeeReady = useMemo(() => {
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        return baseFee && gas && tip;
      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        return baseFee && gas;
      case NETWORK_FEE_TYPE.TEZOS:
        return baseFee && gas && tip;
    }
  }, [baseFee, gas, tip]);

  useEffect(() => {
    setTotal();
  }, [baseFee, tip, gas, blockGas]);

  const setTotal = () => {
    if (!isTransactionFeeReady) return '-';
    const total = gasService.getTotalGasFee({
      selectedNetwork,
      baseFee: baseFee!,
      tip: tip,
      gas: gas,
    });
    if (!total) {
      console.log('fail to get total');
      return;
    }
    // getTotal result means all gas value is valid
    setState({ total, gasValid: true, baseFeeValid: true, tipValid: true });
  };
};

export default useSetTotal;
