import { useState, useEffect, useMemo } from 'react';

import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { TGasConfirmButtonFunctionParam } from '@@components/BasicComponents/GasFeeBoard/GasFeeBoard.type';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkByBase } from '@@constants/network.constant';
import useSpenderQuery from '@@hooks/queries/useSpenderQuery';
import { useDi } from '@@hooks/useDi';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import tradeStore from '@@store/trade/tradeStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useTradeApprove = (fromToken: TokenDto | undefined) => {
  const TokenRepository = useDi('TokenRepository');
  const TransactionService = useDi('TransactionService');
  const [allowance, setAllowance] = useState<BigNumber | null>(null);

  const { openModal, closeModal } = globalModalStore();
  const { t } = useTranslation();
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const { selectedToken } = tradeStore();
  const { to: spender, value, valueValid, data: approveData, setState } = transactionRequestStore();
  const [sentApprove, setSentApprove] = useState(false);

  useSpenderQuery(selectedNetwork, {
    onSuccess: (data) => {
      setState({ to: data.address, toValid: true });
    },
  });

  useEffect(() => {
    getAllowance();
  }, [spender, selectedToken.from]);

  const getAllowance = async () => {
    if (!spender || !selectedToken.from || !fromToken?.contractAddress) return;
    const allowance = await TokenRepository.getAllowance(
      getNetworkByBase(selectedNetwork),
      selectedWalletIndex[getNetworkByBase(selectedNetwork)],
      spender,
      fromToken.contractAddress
    );
    setAllowance(allowance);
  };

  const sendApproveTransaction = async (param: TGasConfirmButtonFunctionParam) => {
    if (!spender || !approveData || !fromToken?.contractAddress) return;
    await TransactionService.sendTransaction({
      selectedNetwork: getNetworkByBase(selectedNetwork),
      selectedWalletIndex: selectedWalletIndex[getNetworkByBase(selectedNetwork)],
      ...param,
    });
    closeModal();
    setSentApprove(true);
    setState({ data: null });
  };

  const onPressApprove = async () => {
    if (!spender || !value || !fromToken) return;
    openModal(MODAL_TYPES.TEXT_MODAL, {
      label: t('approve_wallet_content'),
      title: t('approve_wallet'),
      onConfirm: async () => {
        closeModal();
        const approveData = await TransactionService.getApproveData(spender);
        setState({ data: approveData });
        openModal(MODAL_TYPES.GAS_FEE, { tokenDto: fromToken, onConfirm: sendApproveTransaction, onConfirmTitle: t('approve') });
      },
    });
  };

  const isEnoughAllowance = useMemo(() => {
    if (!fromToken?.contractAddress) return true;

    if (sentApprove || (allowance && value && allowance.gt(value))) {
      return true;
    } else {
      return false;
    }
  }, [allowance, value, !!fromToken?.contractAddress, sentApprove, valueValid]);

  return { isEnoughAllowance, onPressApprove };
};

export default useTradeApprove;
