import { useCallback } from 'react';

import { TransactionRequest } from '@ethersproject/abstract-provider';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { TransferParams } from '@taquito/taquito';

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
  const { total, resetTotal } = gasStore();

  const { setAmount, setAddress } = useSetSendData();
  const { send, isHoldingGasEstimatePolling, setIsHoldingGasEstimatePolling } = useSetSendFunction();
  useFocusEffect(
    useCallback(() => {
      return () => {
        resetBody();
        resetTotal();
      };
    }, [])
  );

  const amount = params.tokenDto.contractAddress ? tokenValue : value;
  const address = params.tokenDto.contractAddress ? tokenTo : to;

  const confirm = async (sendParam: TransactionRequest | TransferParams) => {
    if (!total) return;
    setIsHoldingGasEstimatePolling(true);
    openModal(MODAL_TYPES.CONFIRM_SEND, {
      tokenDto,
      onConfirm: () => {
        send(sendParam);
      },
      onClose: () => {
        setIsHoldingGasEstimatePolling(false);
      },
      to: address!,
      value: amount!,
    });
  };

  return { amount, setAmount, address, setAddress, confirm, isHoldingGasEstimatePolling };
};
export default useTokenSend;
