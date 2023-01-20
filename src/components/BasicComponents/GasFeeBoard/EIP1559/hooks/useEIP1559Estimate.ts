import { Dispatch, SetStateAction, useEffect } from 'react';

import BigNumber from 'bignumber.js';
import { BytesLike, BigNumber as BigNumberEther } from 'ethers';

import { getNetworkByBase, getNetworkConfig } from '@@constants/network.constant';
import useDebounce from '@@hooks/useDebounce';
import { useDi } from '@@hooks/useDi';
import useInterval from '@@hooks/useInterval';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { tagLogger } from '@@utils/Logger';
import { etherBNtoBN, BnToEtherBn } from '@@utils/formatBigNumber';

const logger = tagLogger('useEIP1559Estimate');

const useEIP1559Estimate = ({
  advanced,
  to,
  value,
  data,
  isValidInput,
  setGasLimit,
  setLastBaseFeePerGas,
}: {
  advanced: boolean;
  to?: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  isValidInput: boolean;
  setGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
  setLastBaseFeePerGas: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  //EVMLegacy와 동일한 Repository사용하지만 리턴되어 오는 값에 차이 존재함
  const gasRepository = useDi('GasRepositoryEthers');

  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const testIncludeSelectedNetwork = getNetworkByBase(selectedNetwork);

  const fetchMaxFeePerGas = async () => {
    const feeData = await gasRepository.getFeeData(testIncludeSelectedNetwork);
    logger.log(
      'get EIP1559 gas price: ',
      'maxFeePerGas',
      etherBNtoBN(feeData.maxFeePerGas)?.toFixed(),
      'maxPriorityFeePerGas',
      etherBNtoBN(feeData.maxPriorityFeePerGas)?.toFixed(),
      'lastBaseFeePerGas',
      etherBNtoBN(feeData.lastBaseFeePerGas)?.toFixed()
    );
    setLastBaseFeePerGas(etherBNtoBN(feeData.lastBaseFeePerGas));
  };

  const estimateGas = useDebounce(async ({ to, value, data }: { to: string; value?: BigNumber | null; data?: BytesLike | null }) => {
    logger.log('estimate gas parameter', 'to: ', to, ' value: ', value?.toFixed(), ' data: ', data);

    const gasUsage = await gasRepository.estimateGas(testIncludeSelectedNetwork, selectedWalletIndex[testIncludeSelectedNetwork], {
      to,
      value: BnToEtherBn(value) ?? undefined,
      data: data ?? undefined,
    });

    if (!gasUsage) {
      logger.error('fail to estimate EIP1559 gas');
      return;
    }
    logger.log('EIP1559 estimate gas result', etherBNtoBN(gasUsage)?.toFixed());
    setGasLimit(etherBNtoBN(gasUsage));
  }, 1000);

  useEffect(() => {
    fetchMaxFeePerGas();
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
export default useEIP1559Estimate;
