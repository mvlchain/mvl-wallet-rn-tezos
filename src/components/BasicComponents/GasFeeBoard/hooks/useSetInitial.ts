import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';

import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

import { getNetworkName } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useSetInitial = ({
  setEnableTip,
  setEnableLimitCustom,
  setBaseFee,
  setGas,
  setCustomGas,
}: {
  setEnableTip: Dispatch<SetStateAction<boolean>>;
  setEnableLimitCustom: Dispatch<SetStateAction<boolean>>;
  setBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setGas: Dispatch<SetStateAction<BigNumber | null>>;
  setCustomGas: Dispatch<SetStateAction<BigNumber | null>>;
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
      console.log(gasFeeData.baseFee ? formatEther(gasFeeData.baseFee) : '..');
      setEnableTip(gasFeeData.enableTip);
      setEnableLimitCustom(gasFeeData.enableLimitCustom);
      setBaseFee(gasFeeData.baseFee ?? null);
      setGas(gasFeeData.gasLimit ?? null);
      setCustomGas(gasFeeData.gasLimit ?? null);
    } catch (err) {
      console.log(err);
    }
  }, [selectedNetwork]);
};

export default useSetInitial;
