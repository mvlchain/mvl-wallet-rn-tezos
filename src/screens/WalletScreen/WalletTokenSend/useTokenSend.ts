import { useCallback } from 'react';

import { useFocusEffect, useRoute } from '@react-navigation/native';

import { TGasConfirmButtonFunctionParam } from '@@components/BasicComponents/GasFeeBoard/GasFeeBoard.type';
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
  const { to, value, resetBody, tokenValue, tokenTo } = transactionRequestStore();
  const { total, resetState: resetGasStore } = gasStore();

  const { setAmount, setAddress } = useSetSendData();
  const { send } = useSetSendFunction();
  useFocusEffect(
    useCallback(() => {
      return () => {
        resetBody();
        resetGasStore();
      };
    }, [])
  );

  const amount = params.tokenDto.contractAddress ? tokenValue : value;
  const address = params.tokenDto.contractAddress ? tokenTo : to;

  const confirm = async (param: TGasConfirmButtonFunctionParam) => {
    if (!total) return;
    openModal(MODAL_TYPES.CONFIRM_SEND, {
      tokenDto,
      onConfirm: () => {
        send(param);
      },
      to: address!,
      value: amount!,
    });
  };

  return { amount, setAmount, address, setAddress, confirm };
};
export default useTokenSend;
