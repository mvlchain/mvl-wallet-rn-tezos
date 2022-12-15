import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import { BigNumber, BytesLike } from 'ethers';

import { getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import useDebounce from '@@hooks/useDebounce';
import { useDi } from '@@hooks/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useEstimatedGas = ({
  tokenDto,
  setEstimatedGas,
  setCustomGasLimit,
  setBaseFee,
}: {
  tokenDto: TokenDto;
  setEstimatedGas: Dispatch<SetStateAction<BigNumber | null>>;
  setCustomGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
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
      setEstimatedGas(estimation.gasUsage);
      setCustomGasLimit(estimation.gasUsage);
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
export default useEstimatedGas;
