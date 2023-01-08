import { useState, useEffect } from 'react';

import BigNumber from 'bignumber.js';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig } from '@@constants/network.constant';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import useSpender from '@@hooks/queries/useSpender';
import { useDi } from '@@hooks/useDi';
import globalModalStore from '@@store/globalModal/globalModalStore';
import tradeStore from '@@store/trade/tradeStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

//spender 물어보기
//allowance확인
//allowance비교
//gasfeesetting
//approve요청
const useTradeApprove = (fromToken: TokenDto) => {
  const TokenRepository = useDi('TokenRepository');
  const TransactionService = useDi('TransactionService');
  const [spender, setSpender] = useState<string>();
  const [allowance, setAllowance] = useState<BigNumber | null>(null);
  const { openModal, closeModal } = globalModalStore();
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const { selectedToken, selectToken } = tradeStore();
  const { to, value, data: approveData, setState } = transactionRequestStore();
  const WBNB_ADDRESS = '';

  const { data } = useSpender(getNetworkConfig(selectedNetwork).networkId, {
    onSuccess: (data) => {
      setSpender(data[0].address);
    },
  });

  useEffect(() => {
    getAllowance();
  }, [spender, selectedToken.from]);

  const getAllowance = async () => {
    if (!spender || !selectedToken.from) return;

    const contractAddress = selectedToken.from === 'BNB' ? WBNB_ADDRESS : (fromToken.contractAddress as string);
    const allowance = await TokenRepository.getAllowance(selectedNetwork, selectedWalletIndex[selectedNetwork], spender, contractAddress);
    setAllowance(allowance);
  };

  const sendApproveTransaction = async (gasFeeInfo: IGasFeeInfo) => {
    if (!to || !approveData) return;
    const contractAddress = selectedToken.from === 'BNB' ? WBNB_ADDRESS : (fromToken.contractAddress as string);
    await TransactionService.sendTransaction({
      selectedNetwork,
      selectedWalletIndex: selectedWalletIndex[selectedNetwork],
      to: contractAddress,
      data: approveData,
      gasFeeInfo,
    });
    closeModal();
  };

  const onPressApprove = async () => {
    if (!spender || !value) return;
    const approveData = await TransactionService.getApproveData(spender, value);
    setState({ data: approveData });
    openModal(MODAL_TYPES.GAS_FEE, { tokenDto: fromToken, onConfirm: sendApproveTransaction });
  };

  return { allowance, onPressApprove };
};

export default useTradeApprove;
