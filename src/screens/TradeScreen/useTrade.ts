import { useEffect, useMemo, useState } from 'react';

import { TransactionRequest } from '@ethersproject/abstract-provider';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkByBase } from '@@constants/network.constant';
import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { ISwapDto } from '@@domain/trade/repositories/tradeRepository.type';
import { TransactionServiceEthers } from '@@domain/transaction/transactionServiceEthers/TransactionServiceEthers';
import { BroadcastTransactionDto, CreateNativeSwapTransactionResponseDto, FetchPriceResponseDto } from '@@generated/generated-scheme-clutch';
import useSwapDataQuery from '@@hooks/queries/useSwapDataQuery';
import { useDi } from '@@hooks/useDi';
import gasStore from '@@store/gas/gasStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useTrade = (fromToken: TokenDto | undefined, quoteData: FetchPriceResponseDto | undefined, resetTradeScreen: () => void) => {
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const { openModal, closeModal } = globalModalStore();

  const transactionServiceEthers = useDi('TransactionServiceEthers');
  const WalletService = useDi('WalletService');
  const TradeRepository = useDi('TradeRepository');

  const { t } = useTranslation();
  const { to: spender, value, toValid, valueValid, setState } = transactionRequestStore();
  const { resetTotal } = gasStore();
  const [swapDto, setSwapDto] = useState<ISwapDto | null>(null);
  const [serverSentSwapData, setServerSentSwapData] = useState<CreateNativeSwapTransactionResponseDto['tx'] | null>(null);

  useEffect(() => {
    getSwapDto();
  }, [quoteData]);

  const getSwapDto = async () => {
    if (!quoteData || !quoteData.fromToken?.address || !quoteData.toToken?.address) return;
    const wallet = await WalletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], network: selectedNetwork });

    setSwapDto({
      fromTokenAddress: quoteData.fromToken.address,
      toTokenAddress: quoteData.toToken?.address,
      amount: quoteData.fromTokenAmount,
      fromAddress: wallet.address,
      protocols: JSON.stringify(quoteData.protocols),
    });
  };

  useSwapDataQuery(selectedNetwork, swapDto, {
    onSuccess: (res) => {
      if (!res) return;
      setServerSentSwapData(res.tx);
    },
  });

  const broadCastToServer = (param: BroadcastTransactionDto) => {
    TradeRepository.broadcast(selectedNetwork, param);
  };

  const sendTradeTransaction = async (params: TransactionRequest) => {
    if (!spender || !params || !serverSentSwapData) return;

    const transaction = await transactionServiceEthers.sendTransaction(
      getNetworkByBase(selectedNetwork),
      selectedWalletIndex[getNetworkByBase(selectedNetwork)],
      params
    );
    if (!transaction) {
      Toast.show({
        ...TOAST_DEFAULT_OPTION,
        type: 'basic',
        text1: t('msg_fail_send_trade_transaction'),
      });
      return;
    }
    broadCastToServer({ ...serverSentSwapData, hash: transaction.hash, nonce: transaction.nonce });
    closeModal();
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('msg_trade_success'),
    });
    resetTotal();
    setState({ value: null, valueValid: false, tokenValue: null });
    resetTradeScreen();
  };

  const onPressTrade = async () => {
    if (!fromToken || !spender) return;
    openModal(MODAL_TYPES.GAS_FEE, {
      tokenDto: fromToken,
      onConfirm: sendTradeTransaction,
      onConfirmTitle: t('trade'),
      to: spender,
      value,
      data: serverSentSwapData?.data,
      isValidInput: toValid && valueValid,
    });
  };

  const isReadyTrade = useMemo(() => {
    return !!serverSentSwapData && !!fromToken;
  }, [!fromToken, !serverSentSwapData]);

  return {
    isReadyTrade,
    onPressTrade,
  };
};

export default useTrade;
