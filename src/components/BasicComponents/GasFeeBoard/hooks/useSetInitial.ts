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
  isValidInput,
}: {
  setEnableTip: Dispatch<SetStateAction<boolean>>;
  setEnableLimitCustom: Dispatch<SetStateAction<boolean>>;
  setBlockBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setBlockGas: Dispatch<SetStateAction<BigNumber | null>>;
  isValidInput: boolean;
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
      //useEffect가 실행될때 valid하디는것은 data가 미리 입력되어 들어온다는것을 의미함
      //이때에는 initialgas가 아니라 estimategas가 먼저 보여져야한다.
      if (!isValidInput) {
        setBlockGas(gasFeeData.gasLimit ?? null);
        setState({ gas: gasFeeData.gasLimit });
      }
    } catch (err) {
      console.log(err);
    }
  }, [selectedNetwork]);
};

export default useSetInitial;
