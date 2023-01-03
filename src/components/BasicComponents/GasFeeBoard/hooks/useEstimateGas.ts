import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import { BigNumber } from 'bignumber.js';
import { BytesLike } from 'ethers';

import { getNetworkByBase } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import { useDi } from '@@hooks/useDi';
import useInterval from '@@hooks/useInterval';
import gasStore from '@@store/gas/gasStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useEstimateGas = ({
  to,
  value,
  data,
  isValidInput,
  tokenDto,
  setBlockBaseFee,
  setBlockGas,
}: {
  to?: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  isValidInput: boolean;
  tokenDto: TokenDto;
  setBlockBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setBlockGas: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasService = useDi('GasService');
  const { selectedNetwork: pickNetwork, selectedWalletIndex } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);

  const { isDataRequired } = gasStore();

  //TODO: estimategas 실패했을시 명시적으로 적을 수 있도록 작업 필요
  //advanced로 바꿔주고 입력받음
  const estimateGas = useCallback(
    async ({ to, value, data, contractAddress }: { to: string; value: BigNumber; data?: BytesLike | null; contractAddress?: string | null }) => {
      const isCoin = !contractAddress;
      const estimation = await gasService.estimateGas({
        selectedNetwork,
        selectedWalletIndex: selectedWalletIndex[selectedNetwork],
        to: isDataRequired || isCoin ? to : contractAddress,
        value: contractAddress ? undefined : value,
        data: isDataRequired || !isCoin ? data! : undefined,
        //data set after entering to and value in useTokenSend useEffect, so add non-null assertion
      });
      if (!estimation) {
        console.log('fail to estimate gas');
        return;
      }
      console.log(`estimation.gasUsage: ${estimation.gasUsage}`);
      setBlockGas(estimation.gasUsage);
      //tezos return basefee after estimategas
      if (estimation.baseFee) {
        setBlockBaseFee(estimation.baseFee);
      }
    },
    [isValidInput]
  );

  const debounceEstimate = useDebounce(estimateGas, 100);

  useEffect(() => {
    if (!to || !value) return;
    if (tokenDto && !!tokenDto.contractAddress && !data) return;
    if (!isValidInput) return;
    debounceEstimate({ to, value, data, contractAddress: tokenDto?.contractAddress ?? to });
  }, [to, value, data]);

  useInterval(() => {
    if (!to || !value) return;
    if (tokenDto && !!tokenDto.contractAddress && !data) return;
    if (!isValidInput) return;
    debounceEstimate({ to, value, data, contractAddress: tokenDto?.contractAddress ?? to });
  }, 20000);
};
export default useEstimateGas;
