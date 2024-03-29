import { Dispatch, SetStateAction, useEffect } from 'react';

import BigNumber from 'bignumber.js';
import { BytesLike } from 'ethers';
import { is } from 'immer/dist/internal';

import { getNetworkByBase } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import { useDi } from '@@hooks/useDi';
import useInterval from '@@hooks/useInterval';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { tagLogger } from '@@utils/Logger';
import { etherBNtoBN, BnToEtherBn } from '@@utils/formatBigNumber';

const logger = tagLogger('useEVMEstimate');

const useEVMEstimate = ({
  advanced,
  to,
  value,
  data,
  isValidInput,
  isHoldingGasEstimatePolling,
  setGasLimit,
  setGasPrice,
}: {
  advanced: boolean;
  to?: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  isValidInput: boolean;
  isHoldingGasEstimatePolling?: boolean;
  setGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
  setGasPrice: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasRepository = useDi('GasRepositoryEthers');
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const testIncludeSelectedNetwork = getNetworkByBase(selectedNetwork);

  const fetchGasPrice = async () => {
    const gasPrice = await gasRepository.getGasPrice(testIncludeSelectedNetwork);
    logger.log('get EVM gas price', gasPrice);
    setGasPrice(etherBNtoBN(gasPrice));
  };

  const estimateGas = useDebounce(async ({ to, value, data }: { to: string; value?: BigNumber | null; data?: BytesLike | null }) => {
    logger.log('estimate gas parameter', 'to: ', to, ' value: ', value?.toFixed(), ' data: ', data);

    const gasUsage = await gasRepository.estimateGas(testIncludeSelectedNetwork, selectedWalletIndex[testIncludeSelectedNetwork], {
      to,
      value: BnToEtherBn(value) ?? undefined,
      data: data ?? undefined,
    });
    if (!gasUsage) {
      logger.error('fail to estimate EVM Legacy gas');
      return;
    }
    logger.log('estimate gas result', etherBNtoBN(gasUsage)?.toFixed());
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
    if (isHoldingGasEstimatePolling) return;
    estimateGas({ to, value, data });
  }, 20000);
};
export default useEVMEstimate;
