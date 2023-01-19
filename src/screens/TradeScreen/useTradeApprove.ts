import { useState, useEffect, useMemo, useCallback } from 'react';

import { TransactionRequest } from '@ethersproject/abstract-provider';
import { useFocusEffect } from '@react-navigation/native';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkByBase } from '@@constants/network.constant';
import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import useSpenderQuery from '@@hooks/queries/useSpenderQuery';
import { useDi } from '@@hooks/useDi';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import tradeStore from '@@store/trade/tradeStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useTradeApprove = (fromToken: TokenDto | undefined) => {
  const TokenRepository = useDi('TokenRepository');
  const transactionServiceEthers = useDi('TransactionServiceEthers');
  const [allowance, setAllowance] = useState<BigNumber | null>(null);
  const [spender, setSpender] = useState('');

  const { openModal, closeModal } = globalModalStore();
  const { t } = useTranslation();
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const { selectedToken } = tradeStore();
  const { to, tokenTo, tokenValue, value, toValid, valueValid, data, setState } = transactionRequestStore();
  const [sentApprove, setSentApprove] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setState({ to: spender, toValid: true });
    }, [spender])
  );

  useSpenderQuery(selectedNetwork, {
    onSuccess: (data) => {
      setSpender(data.address);
    },
  });

  useEffect(() => {
    getAllowance();
  }, [to, fromToken]);

  useEffect(() => {
    setSentApprove(false);
  }, [fromToken]);

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

  const sendApproveTransaction = async (params: TransactionRequest) => {
    if (!params || !fromToken?.contractAddress) return;
    await transactionServiceEthers.sendTransaction(getNetworkByBase(selectedNetwork), selectedWalletIndex[getNetworkByBase(selectedNetwork)], {
      ...params,
      to: fromToken.contractAddress,
    });
    closeModal();
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('approve_success'),
    });
    setSentApprove(true);
    setState({ data: null });
  };

  const onPressApprove = async () => {
    if (!spender || !fromToken) return;
    if (fromToken.contractAddress && !tokenValue) return;
    if (!fromToken.contractAddress && !value) return;
    openModal(MODAL_TYPES.TEXT_MODAL, {
      label: t('approve_wallet_content'),
      title: t('approve_wallet'),
      onConfirm: async () => {
        closeModal();
        const maxValue = value ? value.toString(10) : ethers.constants.MaxUint256.toString();
        const approveData = await transactionServiceEthers.encodeFunctionData('approve', [spender, maxValue]);
        openModal(MODAL_TYPES.GAS_FEE, {
          tokenDto: fromToken,
          onConfirm: sendApproveTransaction,
          onConfirmTitle: t('approve'),
          to: fromToken.contractAddress,
          value,
          data: approveData,
          isValidInput: toValid && valueValid,
        });
      },
    });
  };

  const isEnoughAllowance = useMemo(() => {
    if (!fromToken?.contractAddress) return true;

    if (sentApprove || (allowance && tokenValue && allowance.gt(tokenValue))) {
      return true;
    } else {
      return false;
    }
  }, [allowance, tokenValue, !!fromToken?.contractAddress, sentApprove, valueValid]);

  return { isEnoughAllowance, onPressApprove };
};

export default useTradeApprove;
