import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';

const useTradeButtonValidation = (
  isEnoughAllowance: boolean,
  isReadyTrade: boolean,
  onPressTrade: Function,
  onPressApprove: Function,
  connectable: boolean
): [boolean, string, Function] => {
  const { t } = useTranslation();
  const { value, valueValid, tokenValue } = transactionRequestStore();

  const validation: [boolean, string, Function] = useMemo(() => {
    if (!(value || tokenValue) || !valueValid || !connectable) {
      return [false, t('enter_amount'), () => {}];
    } else if (!isEnoughAllowance) {
      return [true, t('approve'), onPressApprove];
    } else if (!isReadyTrade) {
      return [false, t('trade'), () => {}];
    } else {
      return [true, t('trade'), onPressTrade];
    }
  }, [value, valueValid, isEnoughAllowance, isReadyTrade]);

  return validation;
};

export default useTradeButtonValidation;
