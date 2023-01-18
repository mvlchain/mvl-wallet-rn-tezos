import { Dispatch, SetStateAction, useEffect } from 'react';

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

const useEIP1559Estimate = ({
  advanced,
  to,
  value,
  data,
  isValidInput,
  setGasLimit,
  setMaxFeePerGas,
}: {
  advanced: boolean;
  to?: string | null;
  value?: BigNumber | null;
  data?: BytesLike | null;
  isValidInput: boolean;
  tokenDto?: TokenDto;
  setGasLimit: Dispatch<SetStateAction<BigNumber | null>>;
  setMaxFeePerGas: Dispatch<SetStateAction<BigNumber | null>>;
}) => {
  const gasLogger = tagLogger('Gas');
  //EVMLegacy와 동일한 Repository사용하지만 리턴되어 오는 값에 차이 존재함
  const gasRepository = useDi('GasRepositoryEVMLegacy');
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const testIncludeSelectedNetwork = getNetworkByBase(selectedNetwork);

  const fetchMaxFeePerGas = async () => {
    const feeData = await gasRepository.getFeeData();
    gasLogger.log(
      'get EIP1559 gas price: ',
      'maxFeePerGas',
      etherBNtoBN(feeData.maxFeePerGas)?.toString(10),
      'maxPriorityFeePerGas',
      etherBNtoBN(feeData.maxPriorityFeePerGas)?.toString(10),
      'lastBaseFeePerGas',
      etherBNtoBN(feeData.lastBaseFeePerGas)?.toString(10)
    );
    //고민 뭘 골라 쓸지
    setMaxFeePerGas(etherBNtoBN(feeData.maxFeePerGas));
  };

  const estimateGas = useDebounce(async ({ to, value, data }: { to: string; value?: BigNumber | null; data?: BytesLike | null }) => {
    gasLogger.log('estimate gas parameter', 'to: ', to, ' value: ', value?.toString(10), ' data: ', data);
    const gasUsage = await gasRepository.estimateGas({
      selectedNetwork: testIncludeSelectedNetwork,
      selectedWalletIndex: selectedWalletIndex[testIncludeSelectedNetwork],
      to,
      value: BnToEtherBn(value),
      data,
    });
    if (!gasUsage) {
      gasLogger.error('fail to estimate EIP1559 gas');
      return;
    }
    gasLogger.log('estimate gas result', etherBNtoBN(gasUsage)?.toString(10));
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
