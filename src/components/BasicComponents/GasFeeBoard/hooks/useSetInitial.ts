import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';

import { BigNumber } from 'bignumber.js';

import { getNetworkByBase } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import gasStore from '@@store/gas/gasStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useSetInitial = ({
  setEnableTip,
  setEnableLimitCustom,
  setBlockBaseFee,
  setBlockGas,
}: {
  setEnableTip: Dispatch<SetStateAction<boolean>>;
  setEnableLimitCustom: Dispatch<SetStateAction<boolean>>;
  setBlockBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setBlockGas: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasService = useDi('GasService');
  const { selectedNetwork: pickNetwork } = walletPersistStore();
  const { setState } = gasStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);

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
      setBlockBaseFee(gasFeeData.baseFee ?? null);
      setBlockGas(gasFeeData.gasLimit ?? null);
      setState({ gas: gasFeeData.gasLimit });
    } catch (err) {
      console.log(err);
    }
  }, [selectedNetwork]);
};

export default useSetInitial;
