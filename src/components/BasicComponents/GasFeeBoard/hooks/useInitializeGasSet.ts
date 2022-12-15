import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';

import { BigNumber } from 'ethers';

import { getNetworkName } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useInitializeGasSet = ({
  setEnableTip,
  setEnableLimitCustom,
  setBaseFee,
  setGasLimit,
  setCustomGasLimit,
}: {
  setEnableTip: Dispatch<SetStateAction<boolean>>;
  setEnableLimitCustom: Dispatch<SetStateAction<boolean>>;
  setBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
  setCustomGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasService = useDi('GasService');
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);

  useEffect(() => {
    setInitialGas();
  }, []);

  const setInitialGas = useCallback(async () => {
    try {
      const gasFeeData = await gasService.getGasFeeData(selectedNetwork);
      if (!gasFeeData) {
        throw new Error('Fail to get gasfee data');
      }
      setEnableTip(gasFeeData.enableTip);
      setEnableLimitCustom(gasFeeData.enableLimitCustom);
      setBaseFee(gasFeeData.baseFee ?? null);
      setGasLimit(gasFeeData.gasLimit ?? null);
      setCustomGasLimit(gasFeeData.gasLimit ?? null);
    } catch (err) {
      console.log(err);
    }
  }, [selectedNetwork]);
};

export default useInitializeGasSet;
