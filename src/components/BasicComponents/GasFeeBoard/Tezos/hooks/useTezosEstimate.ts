import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Estimate, TransferParams } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { BytesLike } from 'ethers';

import { getNetworkByBase } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import { useDi } from '@@hooks/useDi';
import useInterval from '@@hooks/useInterval';
import { TEZOS_TOKEN_LIST } from '@@store/token/tokenPersistStore.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { tagLogger } from '@@utils/Logger';
import { etherBNtoBN, BnToEtherBn, formatBigNumber } from '@@utils/formatBigNumber';

const useTezosEstimate = ({
  advanced,
  to,
  value,
  transferParam,
  isValidInput,
  isHoldingGasEstimatePolling,
  setGasLimit,
  setBaseFee,
  setStorageFee,
  setStorageLimit,
}: {
  advanced: boolean;
  to?: string | null;
  value?: BigNumber | null;
  transferParam?: TransferParams | null;
  isValidInput: boolean;
  isHoldingGasEstimatePolling?: boolean;
  setGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
  setBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setStorageLimit: Dispatch<SetStateAction<BigNumber | null>>;
  setStorageFee: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasLogger = tagLogger('Gas');
  const gasRepository = useDi('GasRepositoryTezos');
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const testIncludeSelectedNetwork = getNetworkByBase(selectedNetwork);

  const estimateGas = useDebounce(
    async ({ to, value, transferParam }: { to: string; value?: BigNumber | null; transferParam?: TransferParams | null }) => {
      console.log('estimate gas parameter', 'to: ', to, ' value: ', value?.toFixed(), ' transferParam: ', transferParam);
      let estimation: Estimate | undefined;
      if (transferParam) {
        estimation = await gasRepository.estimateGas(testIncludeSelectedNetwork, selectedWalletIndex[testIncludeSelectedNetwork], transferParam);
      } else {
        if (!value) return;
        const amount = +formatBigNumber(value, TEZOS_TOKEN_LIST[0].decimals).toFixed();
        estimation = await gasRepository.estimateGas(testIncludeSelectedNetwork, selectedWalletIndex[testIncludeSelectedNetwork], { to, amount });
      }

      if (!estimation) {
        console.error('fail to estimate tezos gas');
        return;
      }
      console.log(
        'estimate result',
        'baseFee(estimtate.totalcost)',
        estimation.totalCost,
        'storageFee(estimate.burnFeeMutez)',
        estimation.burnFeeMutez,
        'storageLimit',
        estimation.storageLimit,
        'gasLimit',
        estimation.gasLimit
      );
      setBaseFee(new BigNumber(estimation.totalCost));
      setStorageFee(new BigNumber(estimation.burnFeeMutez));
      setStorageLimit(new BigNumber(estimation.storageLimit));
      setGasLimit(new BigNumber(estimation.gasLimit));
    },
    1000
  );

  useEffect(() => {
    if (!isValidInput) return;
    estimateGas({ to, value, transferParam });
  }, [to, value, transferParam]);

  useInterval(() => {
    if (!isValidInput) return;
    //유저가 직접 입력하는 동안에는 주기적으로 가스를 조회하지 않는다.
    if (advanced) return;
    if (isHoldingGasEstimatePolling) return;
    estimateGas({ to, value, transferParam });
  }, 20000);
};
export default useTezosEstimate;
