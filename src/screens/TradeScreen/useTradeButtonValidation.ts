import { useEffect, useMemo } from 'react';

import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
// import { BigNumberSchema } from '@@utils/yup/BigNumberSchema';

const useTradeButtonValidation = (isEnoughAllowance: boolean, isReadyTrade: boolean, onPressTrade: Function, onPressApprove: Function) => {
  const { t } = useTranslation();
  const { value, valueValid } = transactionRequestStore();

  const validation = useMemo(() => {
    if (!value || !valueValid) {
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
