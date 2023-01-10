import { useEffect, useMemo } from 'react';

import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
// import { BigNumberSchema } from '@@utils/yup/BigNumberSchema';

const useTradeButtonValidation = (isEnoughAllowance: boolean, isReadyTrade: boolean, onPressTrade: Function, onPressApprove: Function) => {
  const { t } = useTranslation();
  const { value } = transactionRequestStore();
  // const bigNumberSchema = new BigNumberSchema();

  // yup.setLocale({
  //   boolean: {},
  // });

  // const valueValidation = bigNumberSchema.required(t('enter_amount')).min(0, t('enter_amount'));
  // const allowanceValidation = yup.boolean();
  // const

  // const schema = yup.object({
  //   value :bigNumberSchema.required(t('enter_amount')).min(0, t('enter_amount'));
  //   isEnoughAllowance: yup.boolean().when(
  //     'value',
  //     {
  //       is:true,
  //       then:(schema)=>schema.boolean(),
  //     }),
  //   isReadyTrade: yup.boolean(),
  // });
  // return;

  const validation = useMemo(() => {
    if (!value) {
      return [false, 'enter_amount', () => {}];
    } else if (!isEnoughAllowance) {
      return [false, 'approve', onPressApprove];
    } else if (!isReadyTrade) {
      return [false, 'trade', () => {}];
    } else {
      return [true, 'trade', onPressTrade];
    }
  }, [value, isEnoughAllowance, isReadyTrade]);

  return validation;
};

export default useTradeButtonValidation;
