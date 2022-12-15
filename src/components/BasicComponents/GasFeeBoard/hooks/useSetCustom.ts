import { useEffect, useMemo, Dispatch, SetStateAction } from 'react';

import { BigNumber } from 'ethers';

import { GAS_LEVEL_SETTING } from '@@constants/gas.constant';
import { NETWORK_FEE_TYPE, getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { TGasLevel } from '@@domain/gas/GasService.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { getLeveledBaseFee } from '@@utils/gas';

const useSetCustom = ({
  setCustomBaseFee,
  setCustomTip,
  setCustomGasLimit,
  gasLevel,
  baseFee,
  estimatedGas,
}: {
  setCustomBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setCustomTip: Dispatch<SetStateAction<BigNumber | null>>;
  setCustomGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
  gasLevel: TGasLevel;
  baseFee: BigNumber | null;
  estimatedGas: BigNumber | null;
}) => {
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const network = getNetworkConfig(selectedNetwork);

  const leveledBaseFee = useMemo(() => {
    return getLeveledBaseFee(network.networkFeeType, gasLevel, baseFee);
  }, [gasLevel, baseFee]);

  const tip = useMemo(() => {
    return GAS_LEVEL_SETTING[gasLevel].tip[network.networkFeeType];
  }, [gasLevel]);

  useEffect(() => {
    setCustomBaseFee(leveledBaseFee);
  }, [leveledBaseFee]);

  useEffect(() => {
    setCustomTip(tip);
  }, [tip]);

  useEffect(() => {
    setCustomGasLimit(estimatedGas);
  }, [estimatedGas]);
};

export default useSetCustom;
