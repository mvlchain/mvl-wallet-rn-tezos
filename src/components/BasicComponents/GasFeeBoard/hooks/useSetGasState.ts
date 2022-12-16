import { useEffect, useMemo } from 'react';

import { BigNumber } from 'bignumber.js';

import { GAS_LEVEL_SETTING } from '@@constants/gas.constant';
import { getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import gasStore from '@@store/gas/gasStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { getLeveledBaseFee } from '@@utils/gas';

const useSetGasState = ({ blockBaseFee, blockGas }: { blockBaseFee: BigNumber | null; blockGas: BigNumber | null }) => {
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
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
  }, [leveledBaseFee]);

  useEffect(() => {
    setState({ tip: leveledTip });
  }, [leveledTip]);

  useEffect(() => {
    setState({ gas: blockGas });
  }, [blockGas]);
};

export default useSetGasState;
