import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Estimate, TransferParams } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { BytesLike } from 'ethers';

import { getNetworkByBase } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import { useDi } from '@@hooks/useDi';
import useInterval from '@@hooks/useInterval';
import { TEZOS_TOKEN_LIST } from '@@store/token/tokenPersistStore.constant';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { tagLogger } from '@@utils/Logger';
import { etherBNtoBN, BnToEtherBn, formatBigNumber } from '@@utils/formatBigNumber';

const useTezosEstimate = ({
  advanced,
  to,
  value,
  transferParam,
  tokenDto,
  isValidInput,
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
  tokenDto?: TokenDto;
  setGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
  setBaseFee: Dispatch<SetStateAction<BigNumber | null>>;
  setStorageLimit: Dispatch<SetStateAction<BigNumber | null>>;
  setStorageFee: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasLogger = tagLogger('Gas');
  const gasRepository = useDi('GasRepositoryTezos');

  const estimateGas = useDebounce(
    async ({
      to,
      value,
      transferParam,
      tokenDto,
    }: {
      to: string;
      value?: BigNumber | null;
      transferParam?: TransferParams | null;
      tokenDto?: TokenDto;
    }) => {
      gasLogger.log('estimate gas parameter', 'to: ', to, ' value: ', value?.toString(10), ' transferParam: ', transferParam);
      if (!value) return;
      let estimation: Estimate | undefined;
      if (tokenDto?.contractAddress) {
        if (!transferParam) return;
        estimation = await gasRepository.estimateGas(transferParam);
      } else {
        const amount = +formatBigNumber(value, TEZOS_TOKEN_LIST[0].decimals).toString(10);
        estimation = await gasRepository.estimateGas({ to, amount });
      }

      if (!estimation) {
        gasLogger.error('fail to estimate tezos gas');
        return;
      }
      gasLogger.log(
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
    estimateGas({ to, value, transferParam });
  }, 20000);
};
export default useTezosEstimate;
