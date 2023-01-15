import { useCallback } from 'react';

import { useFocusEffect, useRoute } from '@react-navigation/native';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import gasStore from '@@store/gas/gasStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';

import { TTokenSendRouteProps } from './WalletTokenSend.type';
import useSetSendData from './useSetSendData';
import useSetSendFunction from './useSetSendFunction';

const useTokenSend = () => {
  const { params } = useRoute<TTokenSendRouteProps>();
  const tokenDto = params.tokenDto;

  const { openModal } = globalModalStore();
  const { to, value, resetBody } = transactionRequestStore();
  const { total, resetState: resetGasStore } = gasStore();

  const { setAmount, setAddress } = useSetSendData();
  const { send } = useSetSendFunction();

  const confirm = async () => {
    if (!to || !value || !total) return;
    openModal(MODAL_TYPES.CONFIRM_SEND, {
      tokenDto,
      onConfirm: send,
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetBody();
        resetGasStore();
      };
    }, [])
  );

  return { amount: value, setAmount, address: to, setAddress, confirm };
};
export default useTokenSend;
