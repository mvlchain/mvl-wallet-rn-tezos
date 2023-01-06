import { useState } from 'react';

import { getNetworkConfig } from '@@constants/network.constant';
import useSpender from '@@hooks/queries/useSpender';
import walletPersistStore from '@@store/wallet/walletPersistStore';
const useTradeApprove = () => {
  //spender 물어보기 쿼리 만들기
  //allowance확인
  //allowance비교
  //gasfeesetting
  //approve요청
  const [spenders, setSpenders] = useState<string[]>();
  const { selectedNetwork } = walletPersistStore();
  const { data } = useSpender(getNetworkConfig(selectedNetwork).networkId, {
    onSuccess: (data) => {
      setSpenders(data.map((spender) => spender.address));
    },
  });

  const approve = () => {};

  return { approve };
};

export default useTradeApprove;
