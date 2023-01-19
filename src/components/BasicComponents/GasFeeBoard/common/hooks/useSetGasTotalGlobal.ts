import { useEffect } from 'react';

import BigNumber from 'bignumber.js';

import useDebounce from '@@hooks/useDebounce';
import gasStore from '@@store/gas/gasStore';

const useSetGasTotalGlobal = (total: BigNumber | null, otherTrigger: BigNumber | null) => {
  const { setTotal } = gasStore();
  const debounceSetTotal = useDebounce((total: BigNumber | null) => setTotal(total), 300);
  useEffect(() => {
    debounceSetTotal(total);
  }, [total, otherTrigger]);
};

export default useSetGasTotalGlobal;
