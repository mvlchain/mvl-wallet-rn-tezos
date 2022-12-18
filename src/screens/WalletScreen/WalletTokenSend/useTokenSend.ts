import { useRoute } from '@react-navigation/native';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import gasStore from '@@store/gas/gasStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { TTokenSendRouteProps } from './WalletTokenSend.type';
import useSetSendData from './useSetSendData';

const useTokenSend = () => {
  const { params } = useRoute<TTokenSendRouteProps>();
  const tokenDto = params.tokenDto;

  const { openModal } = globalModalStore();
  const { to, data, value, resetBody } = transactionRequestStore();
  const { total } = gasStore();

  const { setAmount, setAddress } = useSetSendData();
  const { send } = useSetSendData();

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

  const isValid = () => {
    return tokenDto.contractAddress ? !!to || !!value || !!data : !!to || !!value;
  };

  return { amount: value, setAmount, address: to, setAddress, confirm, isValid };
};
export default useTokenSend;
