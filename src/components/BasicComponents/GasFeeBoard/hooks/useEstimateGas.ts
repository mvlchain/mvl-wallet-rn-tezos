import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import { BigNumber } from 'bignumber.js';
import { BytesLike } from 'ethers';

import { getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import useDebounce from '@@hooks/useDebounce';
import { useDi } from '@@hooks/useDi';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useEstimateGas = ({
  tokenDto,
  setBlockBaseFee,
  setBlockGas,
}: {
  tokenDto: TokenDto;
  setBlockBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setBlockGas: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasService = useDi('GasService');
  const { selectedNetwork: pickNetwork, selectedWalletIndex } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);

  const { to, value, data, toValid, valueValid } = transactionRequestStore();

  const estimateGas = useCallback(
    async ({ to, value, data, contractAddress }: { to: string; value: BigNumber; data?: BytesLike | null; contractAddress?: string | null }) => {
      if (!toValid || !valueValid) return;
      const estimation = await gasService.estimateGas({
        selectedNetwork,
        selectedWalletIndex: selectedWalletIndex[selectedNetwork],
        to: contractAddress ?? to,
        value: contractAddress ? undefined : value,
        data: contractAddress ? data! : undefined,
        //data set after entering to and value in useTokenSend useEffect, so add non-null assertion
      });
      if (!estimation) {
        console.log('fail to estimate gas');
        return;
      }
      setBlockGas(estimation.gasUsage);
      //tezos return basefee after estimategas
      if (estimation.baseFee) {
        setBlockBaseFee(estimation.baseFee);
      }
    },
    [toValid, valueValid]
  );

  const debounceEstimate = useDebounce(estimateGas, 800);

  useEffect(() => {
    if (!to || !value) return;
    if (!!tokenDto.contractAddress && !data) return;
    debounceEstimate({ to, value, data, contractAddress: tokenDto.contractAddress });
  }, [to, value, data]);
};
export default useEstimateGas;
