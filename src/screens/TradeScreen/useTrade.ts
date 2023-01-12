import { useEffect, useMemo, useState } from 'react';

import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { TGasConfirmButtonFunctionParam } from '@@components/BasicComponents/GasFeeBoard/GasFeeBoard.type';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkByBase, getNetworkConfig } from '@@constants/network.constant';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { ISwapDto } from '@@domain/trade/repositories/tradeRepository.type';
import { FetchPriceResponseDto } from '@@generated/generated-scheme-clutch';
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

  const { t } = useTranslation();
  const { to: spender, value, data: swapData, setState } = transactionRequestStore();
  const { setState: setGasStore } = gasStore();
  const [swapDto, setSwapDto] = useState<ISwapDto | null>(null);
  const [serverSentSwapData, setServerSentSwapData] = useState<string | null>(null);

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
      const { from, to, value, data } = res.tx;

      const bnValue = new BigNumber(value);

      setGasStore({ isDataRequired: true });
      setServerSentSwapData(data); //useTradeApprove에서 approveData를 사용하고나서야 data를 할당해야함
      setState({ from, to, value: bnValue, toValid: true, valueValid: true }); //내가 보낸 value가 오는것 같은데 바꿔서 할당하는게 맞나? 비교 컨펌필요
    },
  });

  useEffect(() => {
    if (isEnoughAllowance && serverSentSwapData) {
      setState({ data: serverSentSwapData });
    }
  }, [isEnoughAllowance, serverSentSwapData]);

  const sendTradeTransaction = async (param: TGasConfirmButtonFunctionParam) => {
    if (!spender || !param) return;
    if (!value) return;
    await TransactionService.sendTransaction({
      ...param,
      selectedNetwork: getNetworkByBase(selectedNetwork),
      selectedWalletIndex: selectedWalletIndex[getNetworkByBase(selectedNetwork)],
    });
    closeModal();
    setGasStore({ isDataRequired: false });
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
