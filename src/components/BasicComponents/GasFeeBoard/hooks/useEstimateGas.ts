import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import { BigNumber } from 'bignumber.js';
import { BytesLike } from 'ethers';

import { getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import useDebounce from '@@hooks/useDebounce';
import { useDi } from '@@hooks/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useEstimateGas = ({
  tokenDto,
  setGas,
  setBaseFee,
}: {
  tokenDto: TokenDto;
  setGas: Dispatch<SetStateAction<BigNumber | null>>;
  setBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasService = useDi('GasService');
  const { selectedNetwork: pickNetwork, selectedWalletIndex } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);

  const { to, value, data } = transactionRequestStore();

  const estimateGas = useCallback(
    async ({ to, value, data, contractAddress }: { to: string; value: BigNumber; data?: BytesLike | null; contractAddress?: string | null }) => {
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
      setGas(estimation.gasUsage);
      //tezos return basefee after estimategas
      if (estimation.baseFee) {
        setBaseFee(estimation.baseFee);
      }
    },
    []
  );

  const debounceEstimate = useDebounce(estimateGas, 800);

  useEffect(() => {
    if (!to || !value) return;
    if (!!tokenDto.contractAddress && !data) return;
    debounceEstimate({ to, value, data, contractAddress: tokenDto.contractAddress });
  }, [to, value, data]);
};
export default useEstimateGas;
