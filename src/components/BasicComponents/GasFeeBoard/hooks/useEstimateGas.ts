import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import { BigNumber } from 'bignumber.js';
import { BytesLike } from 'ethers';

import { getNetworkByBase } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import { useDi } from '@@hooks/useDi';
import useInterval from '@@hooks/useInterval';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useEstimateGas = ({
  to,
  value,
  data,
  isValidInput,
  setBlockBaseFee,
  setBlockGas,
}: {
  to?: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  isValidInput: boolean;
  tokenDto?: TokenDto;
  setBlockBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setBlockGas: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasService = useDi('GasService');
  const { selectedNetwork: pickNetwork, selectedWalletIndex } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);

  //TODO: estimategas 실패했을시 명시적으로 적을 수 있도록 작업 필요
  //advanced로 바꿔주고 입력받음
  const estimateGas = useCallback(
    async ({ to, value, data }: { to: string; value: BigNumber; data?: BytesLike | null }) => {
      console.log('to,value,data', to, value, data);
      const estimation = await gasService.estimateGas({
        selectedNetwork,
        selectedWalletIndex: selectedWalletIndex[selectedNetwork],
        to,
        value: value?.toString(10),
        data,
        //data set after entering to and value in useTokenSend useEffect, so add non-null assertion
      });
      if (!estimation) {
        console.log('fail to estimate gas');
        return;
      }
      console.log(`estimation res: ${JSON.stringify(estimation, null, 2)}`);
      setBlockGas(estimation.gasUsage);
      //tezos return basefee after estimategas
      if (estimation.baseFee) {
        setBlockBaseFee(estimation.baseFee);
      }
    },
    [isValidInput]
  );

  const debounceEstimate = useDebounce(estimateGas, 1000);

  useEffect(() => {
    if (!isValidInput) return;
    debounceEstimate({ to, value, data });
  }, [to, value, data]);

  useInterval(() => {
    if (!isValidInput) return;
    debounceEstimate({ to, value, data });
  }, 20000);
};
export default useEstimateGas;
