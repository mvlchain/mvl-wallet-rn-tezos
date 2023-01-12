import { useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { TGasConfirmButtonFunctionParam } from '@@components/BasicComponents/GasFeeBoard/GasFeeBoard.type';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkByBase } from '@@constants/network.constant';
import TOAST_DEFAULT_OPTION from '@@constants/toastConfig.constant';
import { ISwapDto } from '@@domain/trade/repositories/tradeRepository.type';
import { BroadcastTransactionDto, CreateNativeSwapTransactionResponseDto, FetchPriceResponseDto } from '@@generated/generated-scheme-clutch';
import useSwapDataQuery from '@@hooks/queries/useSwapDataQuery';
import { useDi } from '@@hooks/useDi';
import gasStore from '@@store/gas/gasStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useTrade = (fromToken: TokenDto | undefined, quoteData: FetchPriceResponseDto | undefined, isEnoughAllowance: boolean) => {
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const { openModal, closeModal } = globalModalStore();
  const TransactionService = useDi('TransactionService');
  const WalletService = useDi('WalletService');
  const TradeRepository = useDi('TradeRepository');

  const { t } = useTranslation();
  const { to: spender, value, setState } = transactionRequestStore();
  const { setState: setGasStore, resetState: resetGasStore } = gasStore();
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
      setGasStore({ isDataRequired: true });
      setServerSentSwapData(res.tx);
    },
  });

  useEffect(() => {
    if (isEnoughAllowance && serverSentSwapData) {
      setState({ data: serverSentSwapData.data });
      //useTradeApprove에서 approveData를 사용하고나서야 data를 할당해야함
    }
  }, [isEnoughAllowance, serverSentSwapData]);

  const broadCastToServer = (param: BroadcastTransactionDto) => {
    TradeRepository.broadcast(selectedNetwork, param);
  };

  const sendTradeTransaction = async (param: TGasConfirmButtonFunctionParam) => {
    if (!spender || !param || !serverSentSwapData || !value) return;
    const hash = await TransactionService.sendTransaction({
      ...param,
      selectedNetwork: getNetworkByBase(selectedNetwork),
      selectedWalletIndex: selectedWalletIndex[getNetworkByBase(selectedNetwork)],
    });
    if (!hash) {
      Toast.show({
        ...TOAST_DEFAULT_OPTION,
        type: 'basic',
        text1: t('fail send trade transaction'),
      });
      return;
    }
    const nonce = (await TransactionService.getNonce(getNetworkByBase(selectedNetwork), hash)) ?? 0;
    broadCastToServer({ ...serverSentSwapData, hash, nonce });
    closeModal();
    Toast.show({
      ...TOAST_DEFAULT_OPTION,
      type: 'basic',
      text1: t('trade_success'),
    });
    setState({ value: null, valueValid: false });
    resetTradeScreen();
  };

  const onPressTrade = async () => {
    if (!fromToken) return;
    openModal(MODAL_TYPES.GAS_FEE, { tokenDto: fromToken, onConfirm: sendTradeTransaction, onConfirmTitle: t('trade') });
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
