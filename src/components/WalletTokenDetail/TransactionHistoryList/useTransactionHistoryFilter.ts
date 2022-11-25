import { useState } from 'react';

import { IBottomSelectMenuProps } from '@@components/BasicComponents/Modals/BottomSelectModal/BottomSelectMenu/BottomSelectMenu.type';
import { TRANSACTION_HISTORY_FILTER_CRITERIA } from '@@constants/transaction.constant';

import { TTransactionHistroryFilter } from './useTransactionHistoryFilter.type';

const useTransactionHistoryFilter = () => {
  const [currentCriteria, setCurrentCriteria] = useState<TTransactionHistroryFilter>(TRANSACTION_HISTORY_FILTER_CRITERIA.ALL);
  const { ALL, SENT_ONLY, RECEIVED_ONLY } = TRANSACTION_HISTORY_FILTER_CRITERIA;

  const filterCriteria: IBottomSelectMenuProps[] = [
    {
      title: ALL,
      isSelected: currentCriteria === ALL,
      onPress: () => {
        setCurrentCriteria(ALL);
      },
    },
    {
      title: SENT_ONLY,
      isSelected: currentCriteria === SENT_ONLY,
      onPress: () => {
        setCurrentCriteria(SENT_ONLY);
      },
    },
    {
      title: RECEIVED_ONLY,
      isSelected: currentCriteria === RECEIVED_ONLY,
      onPress: () => {
        setCurrentCriteria(RECEIVED_ONLY);
      },
    },
  ];
  return {
    currentCriteria,
    filterCriteria,
  };
};

export default useTransactionHistoryFilter;
