import { useState } from 'react';

import BigNumber from 'bignumber.js';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig } from '@@constants/network.constant';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { ISwapDto } from '@@domain/trade/repositories/tradeRepository.type';
import useSwapDataQuery from '@@hooks/queries/useSwapDataQuery';
import { useDi } from '@@hooks/useDi';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useTrade = (fromToken: TokenDto, swapDto: ISwapDto) => {
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const { openModal, closeModal } = globalModalStore();
  const TransactionService = useDi('TransactionService');

  const { to, value, data, setState } = transactionRequestStore();

  const { data: swapData } = useSwapDataQuery(getNetworkConfig(selectedNetwork).networkId, swapDto, {
    onSuccess: (res) => {
      const { from, to, value, data } = res.tx;
      const bnValue = new BigNumber(value);
      setState({ from, to, value: bnValue, data }); //내가 보낸 value가 오는것 같은데 바꿔서 할당하는게 맞나? 비교 컨펌필요
    },
  });

  const sendTradeTransaction = async (gasFeeInfo: IGasFeeInfo) => {
    if (!to) return;
    await TransactionService.sendTransaction({
      to,
      value: value ?? undefined,
      data: data ?? undefined,
      gasFeeInfo,
      selectedNetwork,
      selectedWalletIndex: selectedWalletIndex[selectedNetwork],
    });
    closeModal();
  };

  const onPressTrade = async () => {
    openModal(MODAL_TYPES.GAS_FEE, { tokenDto: fromToken, onConfirm: sendTradeTransaction });
  };

  return {
    readyTrade: !!swapData,
    onPressTrade,
  };
};

export default useTrade;
