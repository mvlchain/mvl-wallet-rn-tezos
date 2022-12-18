import { useRoute } from '@react-navigation/native';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import gasStore from '@@store/gas/gasStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { TTokenSendRouteProps } from './WalletTokenSend.type';
import useSetSendData from './useSetSendData';
import useSetSendFunction from './useSetSendFunction';

const useTokenSend = () => {
  const { params } = useRoute<TTokenSendRouteProps>();
  const tokenDto = params.tokenDto;

  const { openModal } = globalModalStore();
  const { to, value } = transactionRequestStore();
  const { total } = gasStore();

  const { setAmount, setAddress } = useSetSendData();
  const { send } = useSetSendFunction();

  const confirm = async () => {
    if (!to || !value || !total) return;
    openModal(MODAL_TYPES.CONFIRM_SEND, {
      recipientAddress: to,
      amount: value,
      fee: formatBigNumber(total, tokenDto.decimals).toString(10),
      tokenDto,
      onConfirm: send,
    });
  };

  return { amount: value, setAmount, address: to, setAddress, confirm };
};
export default useTokenSend;
