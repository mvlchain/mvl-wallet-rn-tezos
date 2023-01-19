import { Dispatch, SetStateAction, useEffect } from 'react';

import { TransactionRequest } from '@ethersproject/abstract-provider';
import BigNumber from 'bignumber.js';
import { BytesLike } from 'ethers';

import { getNetworkByBase } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import { useDi } from '@@hooks/useDi';
import useInterval from '@@hooks/useInterval';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { tagLogger } from '@@utils/Logger';
import { etherBNtoBN, BnToEtherBn } from '@@utils/formatBigNumber';

const useEVMEstimate = ({
  advanced,
  to,
  value,
  data,
  isValidInput,
  setGasLimit,
  setGasPrice,
}: {
  advanced: boolean;
  to?: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  isValidInput: boolean;
  setGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
  setGasPrice: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasLogger = tagLogger('Gas');
  const gasRepository = useDi('GasRepositoryEthers');
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const testIncludeSelectedNetwork = getNetworkByBase(selectedNetwork);

  const fetchGasPrice = async () => {
    const gasPrice = await gasRepository.getGasPrice(testIncludeSelectedNetwork);
    console.log('get EVM gas price', gasPrice);
    setGasPrice(etherBNtoBN(gasPrice));
  };

  const estimateGas = useDebounce(async ({ to, value, data }: { to: string; value?: BigNumber | null; data?: BytesLike | null }) => {
    console.log('estimate gas parameter', 'to: ', to, ' value: ', value?.toString(10), ' data: ', data);

    const gasUsage = await gasRepository.estimateGas(testIncludeSelectedNetwork, selectedWalletIndex[testIncludeSelectedNetwork], {
      to,
      value: BnToEtherBn(value) ?? undefined,
      data: data ?? undefined,
    });
    if (!gasUsage) {
      console.error('fail to estimate EVM Legacy gas');
      return;
    }
    console.log('estimate gas result', etherBNtoBN(gasUsage)?.toString(10));
    setGasLimit(etherBNtoBN(gasUsage));
  }, 1000);

  useEffect(() => {
    fetchGasPrice();
  }, []);

  useEffect(() => {
    if (!isValidInput) return;
    estimateGas({ to, value, data });
  }, [to, value, data]);

  useInterval(() => {
    if (!isValidInput) return;
    //유저가 직접 입력하는 동안에는 주기적으로 가스를 조회하지 않는다.
    if (advanced) return;
    estimateGas({ to, value, data });
  }, 20000);
};
export default useEVMEstimate;
