import { useEffect, useMemo } from 'react';

import { BigNumber } from 'bignumber.js';

import { GAS_LEVEL_SETTING } from '@@constants/gas.constant';
import { getNetworkConfig, getNetworkByBase } from '@@constants/network.constant';
import gasStore from '@@store/gas/gasStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { getLeveledBaseFee } from '@@utils/gas';

const useSetGasState = ({ blockBaseFee, blockGas, advanced }: { blockBaseFee: BigNumber | null; blockGas: BigNumber | null; advanced: boolean }) => {
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);
  const network = getNetworkConfig(selectedNetwork);
  const { setState, level } = gasStore();

  const leveledBaseFee = useMemo(() => {
    return getLeveledBaseFee(network.networkFeeType, level, blockBaseFee);
  }, [level, blockBaseFee]);

  const leveledTip = useMemo(() => {
    return GAS_LEVEL_SETTING[level].tip[network.networkFeeType];
  }, [level]);

  useEffect(() => {
    setState({ baseFee: leveledBaseFee });
  }, [leveledBaseFee, advanced]);

  useEffect(() => {
    setState({ tip: leveledTip });
  }, [leveledTip, advanced]);

  useEffect(() => {
    setState({ gas: blockGas });
  }, [blockGas, advanced]);
};

export default useSetGasState;
